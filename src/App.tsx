import { useEffect, useMemo, useState } from "react";
import { ArtworkFlashcard } from "./components/ArtworkFlashcard";
import { CategoryStudyView } from "./components/CategoryStudyView";
import { CompareView } from "./components/CompareView";
import { CramSheet } from "./components/CramSheet";
import { MovementFilter } from "./components/MovementFilter";
import { QuizPanel } from "./components/QuizPanel";
import { CategoryProgressStat, StudyHeader } from "./components/StudyHeader";
import { EXAM_CATEGORY_OPTIONS, artworks } from "./data/artworks";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { QuizNotes, QuizRating, ReviewStatus, StudyMode } from "./types";
import { clampIndex, getRandomIndex, isTextInput } from "./utils/study";

const EMPTY_NOTES: QuizNotes = {
  category: "",
  movement: "",
  type: "",
  visualClues: "",
  theme: "",
  importance: "",
};

const CATEGORY_BUCKETS = EXAM_CATEGORY_OPTIONS.filter((category) => category !== "All categories");

function App() {
  const [mode, setMode] = useLocalStorage<StudyMode>("art-history-mode", "flashcards");
  const [selectedCategory, setSelectedCategory] = useLocalStorage<string>("art-history-exam-category", "All categories");
  const [categoryBrowser, setCategoryBrowser] = useLocalStorage<string>(
    "art-history-category-browser",
    CATEGORY_BUCKETS[0] ?? "All categories",
  );
  const [searchQuery, setSearchQuery] = useLocalStorage<string>("art-history-search", "");
  const [reviewMap, setReviewMap] = useLocalStorage<Record<string, ReviewStatus>>("art-history-review-map", {});
  const [reviewOnlyMissed, setReviewOnlyMissed] = useLocalStorage<boolean>("art-history-review-only", false);
  const [flashcardsReviewOnly, setFlashcardsReviewOnly] = useLocalStorage<boolean>("art-history-flashcards-review-only", false);

  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);
  const [quizRevealed, setQuizRevealed] = useState(false);
  const [compareIds, setCompareIds] = useState<[string, string]>([artworks[0].id, artworks[1].id]);
  const [quizNotes, setQuizNotes] = useState<Record<string, QuizNotes>>({});
  const [sessionRatings, setSessionRatings] = useState<Record<string, QuizRating>>({});

  const searchScopedArtworks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return artworks.filter((artwork) => {
      if (!query) {
        return true;
      }

      return [artwork.title, artwork.artist, artwork.examCategory, artwork.movementStyle]
        .join(" ")
        .toLowerCase()
        .includes(query);
    });
  }, [searchQuery]);

  const filteredArtworks = useMemo(() => {
    return searchScopedArtworks.filter(
      (artwork) => selectedCategory === "All categories" || artwork.examCategory === selectedCategory,
    );
  }, [searchScopedArtworks, selectedCategory]);

  const activeBrowserCategory = useMemo(() => {
    if (CATEGORY_BUCKETS.includes(categoryBrowser)) {
      return categoryBrowser;
    }

    return CATEGORY_BUCKETS[0] ?? "All categories";
  }, [categoryBrowser]);

  const categoryBrowserArtworks = useMemo(
    () => searchScopedArtworks.filter((artwork) => artwork.examCategory === activeBrowserCategory),
    [activeBrowserCategory, searchScopedArtworks],
  );

  const categoryCounts = useMemo(() => {
    return Object.fromEntries(
      CATEGORY_BUCKETS.map((category) => [
        category,
        searchScopedArtworks.filter((artwork) => artwork.examCategory === category).length,
      ]),
    ) as Record<string, number>;
  }, [searchScopedArtworks]);

  const flashcardArtworks = useMemo(() => {
    if (!flashcardsReviewOnly) {
      return filteredArtworks;
    }

    return filteredArtworks.filter((artwork) => reviewMap[artwork.id] === "need-review");
  }, [filteredArtworks, flashcardsReviewOnly, reviewMap]);

  const quizArtworks = useMemo(() => {
    if (!reviewOnlyMissed) {
      return filteredArtworks;
    }

    return filteredArtworks.filter(
      (artwork) => sessionRatings[artwork.id] === "missed" || reviewMap[artwork.id] === "need-review",
    );
  }, [filteredArtworks, reviewMap, reviewOnlyMissed, sessionRatings]);

  const currentFlashcard = flashcardArtworks[flashcardIndex];
  const currentQuizArtwork = quizArtworks[quizIndex];
  const currentQuizNotes = currentQuizArtwork ? quizNotes[currentQuizArtwork.id] ?? EMPTY_NOTES : EMPTY_NOTES;

  const reviewCounts = useMemo(() => {
    const values = Object.values(reviewMap);
    return {
      needReview: values.filter((value) => value === "need-review").length,
      confident: values.filter((value) => value === "confident").length,
    };
  }, [reviewMap]);

  const ratingCounts = useMemo<Record<QuizRating, number>>(
    () => ({
      "got-it": Object.values(sessionRatings).filter((value) => value === "got-it").length,
      partial: Object.values(sessionRatings).filter((value) => value === "partial").length,
      missed: Object.values(sessionRatings).filter((value) => value === "missed").length,
    }),
    [sessionRatings],
  );

  const categoryStats = useMemo<CategoryProgressStat[]>(() => {
    const grouped = new Map<string, CategoryProgressStat>();

    for (const category of CATEGORY_BUCKETS) {
      grouped.set(category, {
        category,
        total: 0,
        reviewed: 0,
        needReview: 0,
      });
    }

    for (const artwork of artworks) {
      const current = grouped.get(artwork.examCategory) ?? {
        category: artwork.examCategory,
        total: 0,
        reviewed: 0,
        needReview: 0,
      };

      current.total += 1;
      if (reviewMap[artwork.id]) {
        current.reviewed += 1;
      }
      if (reviewMap[artwork.id] === "need-review") {
        current.needReview += 1;
      }

      grouped.set(artwork.examCategory, current);
    }

    return Array.from(grouped.values()).filter((stat) => stat.total > 0);
  }, [reviewMap]);

  const sessionScore = ratingCounts["got-it"] * 2 + ratingCounts.partial;

  useEffect(() => {
    setFlashcardIndex((current) => clampIndex(current, flashcardArtworks.length));
  }, [flashcardArtworks.length]);

  useEffect(() => {
    setQuizIndex((current) => clampIndex(current, quizArtworks.length));
  }, [quizArtworks.length]);

  useEffect(() => {
    setFlashcardFlipped(false);
  }, [currentFlashcard?.id]);

  useEffect(() => {
    setQuizRevealed(false);
  }, [currentQuizArtwork?.id]);

  useEffect(() => {
    if (selectedCategory !== "All categories" && selectedCategory !== categoryBrowser) {
      setCategoryBrowser(selectedCategory);
    }
  }, [categoryBrowser, selectedCategory, setCategoryBrowser]);

  useEffect(() => {
    if (filteredArtworks.length < 2) {
      return;
    }

    setCompareIds((previous) => {
      const ids = filteredArtworks.map((artwork) => artwork.id);
      const left = ids.includes(previous[0]) ? previous[0] : ids[0];
      const right = ids.includes(previous[1]) && previous[1] !== left ? previous[1] : ids.find((id) => id !== left) ?? left;
      return [left, right];
    });
  }, [filteredArtworks]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isTextInput(event.target)) {
        return;
      }

      if (event.key === " " && (mode === "flashcards" || mode === "quiz")) {
        event.preventDefault();
        if (mode === "flashcards" && currentFlashcard) {
          setFlashcardFlipped((value) => !value);
        }
        if (mode === "quiz" && currentQuizArtwork) {
          setQuizRevealed((value) => !value);
        }
      }

      if (event.key === "ArrowRight") {
        if (mode === "flashcards" && flashcardArtworks.length) {
          setFlashcardIndex((current) => clampIndex(current + 1, flashcardArtworks.length));
        }
        if (mode === "quiz" && quizArtworks.length) {
          setQuizIndex((current) => clampIndex(current + 1, quizArtworks.length));
        }
      }

      if (event.key === "ArrowLeft") {
        if (mode === "flashcards" && flashcardArtworks.length) {
          setFlashcardIndex((current) => clampIndex(current - 1, flashcardArtworks.length));
        }
        if (mode === "quiz" && quizArtworks.length) {
          setQuizIndex((current) => clampIndex(current - 1, quizArtworks.length));
        }
      }

      if (event.key.toLowerCase() === "s") {
        if (mode === "flashcards" && flashcardArtworks.length) {
          setFlashcardIndex((current) => getRandomIndex(flashcardArtworks.length, current));
        }
        if (mode === "quiz" && quizArtworks.length) {
          setQuizIndex((current) => getRandomIndex(quizArtworks.length, current));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentFlashcard, currentQuizArtwork, flashcardArtworks.length, mode, quizArtworks.length]);

  const handleReviewStatusChange = (artworkId: string, status: ReviewStatus) => {
    setReviewMap((current) => {
      const next = { ...current };
      if (next[artworkId] === status) {
        delete next[artworkId];
      } else {
        next[artworkId] = status;
      }
      return next;
    });
  };

  const handleQuizNotesChange = (artworkId: string, field: keyof QuizNotes, value: string) => {
    setQuizNotes((current) => ({
      ...current,
      [artworkId]: {
        ...(current[artworkId] ?? EMPTY_NOTES),
        [field]: value,
      },
    }));
  };

  const handleQuizRating = (artworkId: string, rating: QuizRating) => {
    setSessionRatings((current) => ({ ...current, [artworkId]: rating }));
  };

  const handleCategoryFilterChange = (category: string) => {
    setSelectedCategory(category);
    if (category !== "All categories") {
      setCategoryBrowser(category);
    }
  };

  const emptyFilteredMessage =
    selectedCategory !== "All categories"
      ? "No artworks match the current exam category or search. Try clearing the category filter or search."
      : "No artworks match the current search. Try clearing the search query.";

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(186,230,253,0.24),_transparent_36%),linear-gradient(180deg,_#fafaf9_0%,_#f5f5f4_100%)]">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <StudyHeader
          mode={mode}
          onModeChange={setMode}
          totalCount={artworks.length}
          filteredCount={filteredArtworks.length}
          needReviewCount={reviewCounts.needReview}
          confidentCount={reviewCounts.confident}
          categoryStats={categoryStats}
        />

        <MovementFilter
          categories={EXAM_CATEGORY_OPTIONS}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          onCategoryChange={handleCategoryFilterChange}
          onSearchChange={setSearchQuery}
          resultCount={filteredArtworks.length}
        />

        {mode === "flashcards" &&
          (currentFlashcard ? (
            <ArtworkFlashcard
              artwork={currentFlashcard}
              flipped={flashcardFlipped}
              reviewStatus={reviewMap[currentFlashcard.id]}
              reviewOnlyFlagged={flashcardsReviewOnly}
              index={flashcardIndex}
              total={flashcardArtworks.length}
              onFlip={() => setFlashcardFlipped((value) => !value)}
              onPrevious={() => setFlashcardIndex((current) => clampIndex(current - 1, flashcardArtworks.length))}
              onNext={() => setFlashcardIndex((current) => clampIndex(current + 1, flashcardArtworks.length))}
              onShuffle={() => setFlashcardIndex((current) => getRandomIndex(flashcardArtworks.length, current))}
              onToggleReviewOnly={setFlashcardsReviewOnly}
              onReviewStatusChange={(status) => handleReviewStatusChange(currentFlashcard.id, status)}
            />
          ) : (
            <EmptyState
              message={
                flashcardsReviewOnly
                  ? "No need-review cards match the current filters yet. Turn off the toggle or mark a few works for review first."
                  : emptyFilteredMessage
              }
            />
          ))}

        {mode === "quiz" &&
          (currentQuizArtwork ? (
            <QuizPanel
              artwork={currentQuizArtwork}
              notes={currentQuizNotes}
              revealed={quizRevealed}
              currentRating={sessionRatings[currentQuizArtwork.id]}
              reviewOnlyMissed={reviewOnlyMissed}
              index={quizIndex}
              total={quizArtworks.length}
              score={sessionScore}
              ratingCounts={ratingCounts}
              onNotesChange={(field, value) => handleQuizNotesChange(currentQuizArtwork.id, field, value)}
              onReveal={() => setQuizRevealed((value) => !value)}
              onRate={(rating) => handleQuizRating(currentQuizArtwork.id, rating)}
              onToggleReviewOnly={setReviewOnlyMissed}
              onPrevious={() => setQuizIndex((current) => clampIndex(current - 1, quizArtworks.length))}
              onNext={() => setQuizIndex((current) => clampIndex(current + 1, quizArtworks.length))}
              onShuffle={() => setQuizIndex((current) => getRandomIndex(quizArtworks.length, current))}
            />
          ) : (
            <EmptyState
              message={
                reviewOnlyMissed
                  ? "No missed or review-flagged cards match the current filters yet. Turn off the toggle or flag a few works first."
                  : emptyFilteredMessage
              }
            />
          ))}

        {mode === "categories" && (
          <CategoryStudyView
            categories={CATEGORY_BUCKETS}
            selectedCategory={activeBrowserCategory}
            categoryCounts={categoryCounts}
            artworks={categoryBrowserArtworks}
            onSelectCategory={setCategoryBrowser}
            onStudyCategoryOnly={() => {
              setSelectedCategory(activeBrowserCategory);
              setFlashcardIndex(0);
              setFlashcardFlipped(false);
              setMode("flashcards");
            }}
          />
        )}

        {mode === "compare" && (
          <CompareView
            artworks={filteredArtworks}
            leftId={compareIds[0]}
            rightId={compareIds[1]}
            onSelectLeft={(id) => setCompareIds((current) => [id, current[1] === id ? current[0] : current[1]])}
            onSelectRight={(id) => setCompareIds((current) => [current[0] === id ? current[1] : current[0], id])}
          />
        )}

        {mode === "cram" && <CramSheet artworks={filteredArtworks} />}

        <footer className="panel flex flex-col gap-3 px-5 py-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            Canonical artwork metadata, image paths, and <code className="rounded bg-stone-100 px-1.5 py-0.5">examCategory</code> now come from{" "}
            <code className="rounded bg-stone-100 px-1.5 py-0.5">src/data/artworks.ts</code>.
          </p>
          <div className="pill">Image directory: /public/images</div>
        </footer>
      </main>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return <div className="panel px-6 py-12 text-center text-sm text-slate-600">{message}</div>;
}

export default App;
