export type StudyMode = 'flashcards' | 'quiz' | 'categories' | 'compare' | 'cram';
export type ReviewStatus = 'need-review' | 'confident';
export type QuizRating = 'got-it' | 'partial' | 'missed';

export type { Artwork } from './data/artworks';

export interface QuizNotes {
  category: string;
  movement: string;
  type: string;
  visualClues: string;
  theme: string;
  importance: string;
}
