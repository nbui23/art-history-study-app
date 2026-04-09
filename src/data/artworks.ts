type ImageExtension = 'jpg' | 'png';

export const EXAM_CATEGORIES = [
  'Enlightenment',
  'Romanticism',
  'Early Photography',
  'Realism',
  'Impressionism',
  'Post-Impressionism',
  'Fauvism',
  'Proto-Cubism / Early Cubism',
  'Abstract Art / Expressionist Abstraction',
  'Dada / Readymade',
  'Art Deco',
  'Mexican Muralism / Social Realism',
  'Abstract Expressionism',
  'Post-Painterly Abstraction',
  'Pop Art',
  'Conceptual Art',
  'Feminist Art',
  'Video Art / Installation Art',
  'Postmodern / Photoconceptual Art',
] as const;

export type Artwork = {
  id: string;
  artist: string;
  title: string;
  year: string;
  examCategory: string;
  image: string;
  movementStyle: string;
  typeOfWork: string;
  importanceToMovement: string;
  importanceToArtHistory: string;
  mainReasonsImportant: string[];
  visualClues?: string[];
  themes?: string[];
  memoryHook?: string;
};

type ArtworkSource = Omit<Artwork, 'image'> & {
  aliases?: string[];
  imageSlug: string;
  imageExtension: ImageExtension;
};

const BASE_ASSET_URL = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

/**
 * Canonical study data for the artworks from the user's exam slide deck.
 *
 * Recommended OMX workflow:
 * 1. Rename files in public/images to `${imageSlug}.${ext}` while preserving each file's real extension.
 * 2. Populate the `image` field with `/images/${imageSlug}.${ext}`.
 * 3. Keep `imageSlug` as the stable source of truth for future imports.
 */
const artworkSources: ArtworkSource[] = [
  {
    id: "wright-air-pump-1768",
    artist: "Joseph Wright of Derby",
    title: "An Experiment on a Bird in the Air Pump",
    year: "1768",
    examCategory: "Enlightenment",
    movementStyle: "Enlightenment",
    typeOfWork: "Scientific subject painting / conversation piece treated with the seriousness of history painting",
    importanceToMovement:
      "This work reflects Enlightenment interest in science, reason, experiment, and observation, while also pointing toward Romanticism through its theatrical lighting and emotional reactions.",
    importanceToArtHistory:
      "It treats a modern scientific demonstration as a major artistic subject, elevating science into high art and bridging rational inquiry with human feeling.",
    mainReasonsImportant: [
      "Makes science a serious subject for painting",
      "Captures the spirit of the Enlightenment",
      "Mixes reason with emotion",
      "Uses dramatic lighting to heighten meaning",
      "Bridges Enlightenment and Romanticism"
    ],
    visualClues: ["dramatic light and shadow", "scientific demonstration", "strong emotional reactions", "theatrical composition"],
    themes: ["reason", "experiment", "emotion", "modern knowledge"],
    memoryHook: "Science becomes high drama.",
    imageSlug: "joseph-wright-of-derby-an-experiment-on-a-bird-in-the-air-pump",
    imageExtension: "jpg"
  },
  {
    id: "goya-third-of-may-1808",
    artist: "Francisco Goya",
    title: "The Third of May 1808",
    year: "1814",
    examCategory: "Romanticism",
    movementStyle: "Romanticism",
    typeOfWork: "History painting / war painting / political painting",
    importanceToMovement:
      "It is a major Romantic work because it emphasizes terror, suffering, emotion, and the human cost of violence rather than calm order or ideal beauty.",
    importanceToArtHistory:
      "It is one of the most important anti-war paintings in Western art and transforms recent political violence into a modern subject worthy of monumental painting.",
    mainReasonsImportant: [
      "Shows war as cruel rather than glorious",
      "Centers ordinary victims instead of heroic leaders",
      "Uses dramatic light for emotional intensity",
      "Rejects Neoclassical idealization",
      "Influenced later political and anti-war art"
    ],
    visualClues: ["man in white with arms outstretched", "firing squad", "lantern light", "dead bodies in foreground", "nighttime execution"],
    themes: ["war", "suffering", "martyrdom", "political violence"],
    memoryHook: "Anti-war Romanticism lit by a lantern.",
    aliases: ["The Third of May, 1808"],
    imageSlug: "francisco-goya-the-third-of-may-1808",
    imageExtension: "jpg"
  },
  {
    id: "turner-snow-storm-hannibal-1812",
    artist: "J. M. W. Turner",
    title: "Snow Storm: Hannibal and His Army Crossing the Alps",
    year: "1812",
    examCategory: "Romanticism",
    movementStyle: "Romanticism",
    typeOfWork: "Landscape painting / history painting hybrid / sublime landscape",
    importanceToMovement:
      "It is a major Romantic image of the sublime, emphasizing awe, terror, instability, and the overwhelming power of nature over humanity.",
    importanceToArtHistory:
      "It subordinates heroic history to landscape and atmosphere, helping make landscape painting ambitious enough to rival traditional history painting.",
    mainReasonsImportant: [
      "Shows nature overpowering human ambition",
      "Makes the storm the true main character",
      "Great example of the sublime",
      "Blends history painting with landscape",
      "Anticipates later atmospheric, near-abstract painting"
    ],
    visualClues: ["huge swirling storm", "tiny army below", "dark storm cloud", "glow breaking through the sky", "chaotic diagonal movement"],
    themes: ["the sublime", "nature's power", "human vulnerability", "history and conquest"],
    memoryHook: "History painting swallowed by a storm.",
    imageSlug: "jmw-turner-snow-storm-hannibal-and-his-army-crossing-the-alps",
    imageExtension: "jpg"
  },
  {
    id: "church-twilight-in-the-wilderness-1860",
    artist: "Frederic Edwin Church",
    title: "Twilight in the Wilderness",
    year: "1860",
    examCategory: "Romanticism",
    movementStyle: "Hudson River School / American Romantic landscape",
    typeOfWork: "Landscape painting / wilderness landscape / sublime landscape",
    importanceToMovement:
      "It is a classic Hudson River School work because it presents the American wilderness as grand, meaningful, and almost spiritual through dramatic light and atmosphere.",
    importanceToArtHistory:
      "It helped define 19th-century American landscape painting as emotionally ambitious and culturally important, turning wilderness into a major national subject.",
    mainReasonsImportant: [
      "Strong example of the Hudson River School",
      "Turns the American landscape into something epic",
      "Uses dramatic light to create the sublime",
      "Can suggest Civil War tension symbolically",
      "Helps define American Romantic landscape painting"
    ],
    visualClues: ["fiery red-orange sky", "dark silhouetted trees", "water leading into the distance", "vast wilderness", "glowing sunset"],
    themes: ["wilderness", "the sublime", "national identity", "nature as revelation"],
    memoryHook: "American wilderness set on fire by twilight.",
    imageSlug: "frederic-edwin-church-twilight-in-the-wilderness",
    imageExtension: "jpg"
  },
  {
    id: "gericault-raft-of-the-medusa-1818-1819",
    artist: "Théodore Géricault",
    title: "The Raft of the Medusa",
    year: "1818-1819",
    examCategory: "Romanticism",
    movementStyle: "Romanticism",
    typeOfWork: "History painting / disaster painting / political painting",
    importanceToMovement:
      "It is deeply Romantic because it emphasizes catastrophe, extreme emotion, human suffering, and fragile hope instead of controlled heroic order.",
    importanceToArtHistory:
      "It transforms a recent political disaster into a monumental modern history painting, expanding what subjects could be treated on a grand scale.",
    mainReasonsImportant: [
      "Makes a recent disaster worthy of monumental painting",
      "Shows Romanticism through terror and desperation",
      "Centers survivors rather than ideal heroes",
      "Blends political criticism with emotional drama",
      "Pushes history painting toward modern reality"
    ],
    visualClues: ["raft crowded with bodies", "pyramid composition", "stormy sea", "tiny rescue ship in distance", "figures waving cloth at top"],
    themes: ["shipwreck", "survival", "hope and despair", "political scandal"],
    memoryHook: "Romantic disaster on a raft between hope and death.",
    imageSlug: "theodore-gericault-the-raft-of-the-medusa",
    imageExtension: "jpg"
  },
  {
    id: "constable-hay-wain-1821",
    artist: "John Constable",
    title: "The Hay Wain",
    year: "1821",
    examCategory: "Romanticism",
    movementStyle: "Romanticism / English landscape painting",
    typeOfWork: "Landscape painting / rural landscape",
    importanceToMovement:
      "It shows a quieter Romanticism rooted in atmosphere, observation, and emotional attachment to nature rather than sublime terror.",
    importanceToArtHistory:
      "It helped elevate landscape painting to the seriousness of high art and influenced later French painters through its attention to light, weather, and natural effects.",
    mainReasonsImportant: [
      "Makes ordinary rural landscape feel monumental",
      "Shows Romanticism without storm or catastrophe",
      "Elevates landscape painting",
      "Captures rural England as lived-in nature",
      "Influenced later landscape painters"
    ],
    visualClues: ["wagon in shallow water", "cottage on left", "broad sky with clouds", "lush greenery", "calm river scene"],
    themes: ["nature", "rural life", "memory", "atmosphere"],
    memoryHook: "Romanticism without the storm.",
    aliases: ["The Haywain"],
    imageSlug: "john-constable-the-hay-wain",
    imageExtension: "jpg"
  },
  {
    id: "daguerre-still-life-in-studio-1837",
    artist: "Louis-Jacques-Mandé Daguerre",
    title: "Still Life in Studio",
    year: "1837",
    examCategory: "Early Photography",
    movementStyle: "Early photography / daguerreotype",
    typeOfWork: "Early photograph / still life / studio arrangement",
    importanceToMovement:
      "It demonstrates the earliest possibilities of photography, showing how the new medium could record detail, texture, light, and surfaces with remarkable precision.",
    importanceToArtHistory:
      "It belongs to the invention of photography itself, a new visual medium that changed how reality could be recorded and challenged painting's documentary role.",
    mainReasonsImportant: [
      "One of the earliest surviving photographs",
      "Shows what the daguerreotype could do",
      "Explains why still objects suited early photography",
      "Marks photography's emergence as a serious medium",
      "Changes the history of image-making"
    ],
    visualClues: ["silvery monochrome image", "arranged studio objects", "sharp detail", "ghostly stillness", "plaster casts and framed works"],
    themes: ["new technology", "representation", "detail", "mechanical image-making"],
    memoryHook: "Photography proving itself with a quiet studio scene.",
    aliases: ["The Artist's Studio", "Still Life with Plaster Casts"],
    imageSlug: "louis-jacques-mande-daguerre-still-life-in-studio",
    imageExtension: "jpg"
  },
  {
    id: "bonheur-plowing-in-the-nivernais-1849",
    artist: "Rosa Bonheur",
    title: "Plowing in the Nivernais",
    year: "1849",
    examCategory: "Realism",
    movementStyle: "Realism / naturalism",
    typeOfWork: "Rural labor painting / animal painting / agricultural landscape",
    importanceToMovement:
      "It fits Realism because it treats ordinary agricultural labor and working animals as worthy of serious art rather than idealized heroic subjects.",
    importanceToArtHistory:
      "It made rural labor monumental and helped establish Bonheur as a major 19th-century artist, showing that everyday work could be painted on a grand scale.",
    mainReasonsImportant: [
      "Makes farm labor a major subject",
      "Shows Realism through close observation",
      "Gives dignity to working animals",
      "Helped establish Bonheur's reputation",
      "Blends realism with monumental composition"
    ],
    visualClues: ["teams of oxen", "freshly turned soil", "ploughs cutting diagonally", "rolling countryside", "farmers secondary to animals"],
    themes: ["labor", "rural life", "animals", "everyday reality"],
    memoryHook: "Realism powered by oxen and soil.",
    imageSlug: "rosa-bonheur-plowing-in-the-nivernais",
    imageExtension: "jpg"
  },
  {
    id: "caillebotte-paris-street-rainy-day-1877",
    artist: "Gustave Caillebotte",
    title: "Paris Street; Rainy Day",
    year: "1877",
    examCategory: "Impressionism",
    movementStyle: "Impressionism with a realist, sharply structured style",
    typeOfWork: "Modern life painting / urban street scene",
    importanceToMovement:
      "It belongs with Impressionism because of its modern Paris subject, weather effects, and public urban experience, even though its finish is more precise than Monet's.",
    importanceToArtHistory:
      "It became one of the defining images of modern Paris, combining Impressionist subject matter with striking structure, perspective, and urban psychology.",
    mainReasonsImportant: [
      "Captures modern Paris as a major subject",
      "Shows Impressionism through weather and city life",
      "Uses a more structured look than many Impressionists",
      "Suggests urban distance and anonymity",
      "Feels modern through cropping and viewpoint"
    ],
    visualClues: ["wet boulevard", "umbrellas", "fashionable couple in foreground", "broad Haussmann buildings", "strong perspective lines"],
    themes: ["modern life", "urban anonymity", "weather", "public space"],
    memoryHook: "Impressionist subject, realist finish.",
    aliases: ["Paris: A Rainy Day", "Paris Street, Rainy Day"],
    imageSlug: "gustave-caillebotte-paris-street-rainy-day",
    imageExtension: "jpg"
  },
  {
    id: "manet-bar-at-the-folies-bergere-1881-1882",
    artist: "Édouard Manet",
    title: "A Bar at the Folies-Bergère",
    year: "1881-1882",
    examCategory: "Realism",
    movementStyle: "Realism / early modernism / painting of modern life",
    typeOfWork: "Modern life painting / genre scene / portrait-like café-concert scene",
    importanceToMovement:
      "It is central to modern-life painting because it presents leisure, commerce, crowds, and psychological distance without idealizing urban entertainment.",
    importanceToArtHistory:
      "It helped make contemporary Paris a serious artistic subject and used the mirror to create one of modern painting's most famous puzzles about seeing and representation.",
    mainReasonsImportant: [
      "Makes modern city life a major subject",
      "Mixes realism with visual ambiguity",
      "Captures both spectacle and isolation",
      "Shows Manet as a bridge to modernism",
      "Uses an everyday scene to raise deeper questions"
    ],
    visualClues: ["barmaid facing viewer", "mirror behind her", "bottles and fruit on counter", "crowded entertainment hall", "trapeze legs in upper corner"],
    themes: ["modern life", "alienation", "spectacle", "seeing and reflection"],
    memoryHook: "Glamorous Paris with a lonely barmaid and a puzzling mirror.",
    aliases: ["A Bar at the Folies Bergere"],
    imageSlug: "edouard-manet-a-bar-at-the-folies-bergere",
    imageExtension: "jpg"
  },
  {
    id: "monet-boulevard-des-capucines-1873-1874",
    artist: "Claude Monet",
    title: "Boulevard des Capucines",
    year: "1873-1874",
    examCategory: "Impressionism",
    movementStyle: "Impressionism",
    typeOfWork: "Modern life painting / urban boulevard scene / cityscape",
    importanceToMovement:
      "It is a clear Impressionist work because it captures a fleeting visual impression of modern Paris through broken brushwork, atmosphere, and the movement of crowds.",
    importanceToArtHistory:
      "It helped define the look of early Impressionism by showing contemporary city life as a passing moment rather than as a polished, stable academic scene.",
    mainReasonsImportant: [
      "Captures modern Paris as a major subject",
      "Uses broken brushwork to suggest a passing impression",
      "Shows crowds and movement rather than detailed individuals",
      "Helped define early Impressionism",
      "Rejects polished academic finish"
    ],
    visualClues: ["busy boulevard from high viewpoint", "bare trees", "crowds as dashes", "carriages", "hazy atmosphere"],
    themes: ["modern life", "movement", "light and atmosphere", "passing moment"],
    memoryHook: "Paris seen as a flicker of crowds and light.",
    aliases: ["Boulevard des Capucines, Paris"],
    imageSlug: "claude-monet-boulevard-des-capucines",
    imageExtension: "jpg"
  },
  {
    id: "cassatt-woman-in-a-loge-1879",
    artist: "Mary Cassatt",
    title: "Woman in a Loge",
    year: "1879",
    examCategory: "Impressionism",
    movementStyle: "Impressionism",
    typeOfWork: "Modern life painting / theater scene / portrait-like social observation",
    importanceToMovement:
      "It reflects Impressionism through its focus on contemporary leisure, social spectatorship, and modern urban experience rather than academic or historical subjects.",
    importanceToArtHistory:
      "It is important for showing how Impressionism could treat gendered looking, public entertainment, and the experience of modern spectatorship.",
    mainReasonsImportant: [
      "Shows modern leisure and spectacle",
      "Explores looking and being looked at",
      "Brings women into the modern city subject",
      "Fits Impressionism's interest in contemporary life",
      "Combines social observation with stylish immediacy"
    ],
    visualClues: ["woman in theater box", "opera glasses", "dark dress against pale skin", "viewer positioned like another observer", "man in background watching"],
    themes: ["spectatorship", "modern leisure", "gender", "public life"],
    memoryHook: "At the theater, everyone is watching someone.",
    imageSlug: "mary-cassatt-woman-in-a-loge",
    imageExtension: "jpg"
  },
  {
    id: "vangogh-bedroom-in-arles-1888",
    artist: "Vincent van Gogh",
    title: "The Bedroom",
    year: "1888",
    examCategory: "Post-Impressionism",
    movementStyle: "Post-Impressionism",
    typeOfWork: "Interior painting / domestic scene",
    importanceToMovement:
      "It goes beyond Impressionism by using simplified forms, bold outlines, and expressive color to convey mood rather than just the look of a passing moment.",
    importanceToArtHistory:
      "It is one of Van Gogh's most famous interiors and shows how Post-Impressionism turned color and distortion into emotional expression.",
    mainReasonsImportant: [
      "Shows Post-Impressionism through expressive color",
      "Turns an ordinary room into a psychological space",
      "Uses simplification rather than naturalism",
      "Reveals Van Gogh's personal vision",
      "Makes emotion central to representation"
    ],
    visualClues: ["tilted room", "bright contrasting colors", "simple furniture", "bold outlines", "flattened space"],
    themes: ["emotion", "personal space", "color as feeling", "interior life"],
    memoryHook: "A bedroom painted like a state of mind.",
    aliases: ["Vincent's Bedroom in Arles", "The Bedroom in Arles"],
    imageSlug: "vincent-van-gogh-the-bedroom",
    imageExtension: "jpg"
  },
  {
    id: "matisse-joy-of-life-1905-1906",
    artist: "Henri Matisse",
    title: "Le Bonheur de Vivre (The Joy of Life)",
    year: "1905-1906",
    examCategory: "Fauvism",
    movementStyle: "Fauvism",
    typeOfWork: "Pastoral scene / figure painting / decorative modern painting",
    importanceToMovement:
      "It is a major Fauvist work because it frees color from natural description and uses bold, simplified shapes to create a decorative, emotional vision.",
    importanceToArtHistory:
      "It helped define Fauvism and modern painting's move away from naturalistic color and space toward expressive, decorative freedom.",
    mainReasonsImportant: [
      "Uses wild, non-natural color",
      "Flattens space and simplifies form",
      "Makes color the main emotional tool",
      "Defines Fauvist experimentation",
      "Influenced later modernists"
    ],
    visualClues: ["bright unnatural colors", "nude figures in landscape", "flattened space", "decorative curves", "dance circle in background"],
    themes: ["pleasure", "pastoral fantasy", "decorative color", "freedom"],
    memoryHook: "Fauvism turns paradise into pure color.",
    imageSlug: "henri-matisse-le-bonheur-de-vivre-the-joy-of-life",
    imageExtension: "jpg"
  },
  {
    id: "picasso-les-demoiselles-1907",
    artist: "Pablo Picasso",
    title: "Les Demoiselles d'Avignon",
    year: "1907",
    examCategory: "Proto-Cubism / Early Cubism",
    movementStyle: "Proto-Cubism / early modernism",
    typeOfWork: "Figure painting / brothel scene / radical modern painting",
    importanceToMovement:
      "It marks the break toward Cubism by flattening space, fracturing bodies, and rejecting traditional ideals of beauty and naturalistic representation.",
    importanceToArtHistory:
      "It is one of the foundational works of modern art because it attacks Renaissance illusionism and opens the way to Cubism and other forms of abstraction.",
    mainReasonsImportant: [
      "Fragments form and space",
      "Rejects idealized beauty",
      "Uses mask-like faces and angular bodies",
      "Breaks with Renaissance perspective",
      "Helps launch Cubism"
    ],
    visualClues: ["five angular nude figures", "mask-like faces", "broken planes", "sharp edges", "flattened space"],
    themes: ["modernity", "fragmentation", "the body", "challenging tradition"],
    memoryHook: "Bodies shattered into modern painting.",
    aliases: ["Les Demoiselles d'Avignon (The Young Ladies of Avignon)"],
    imageSlug: "pablo-picasso-les-demoiselles-davignon",
    imageExtension: "jpg"
  },
  {
    id: "kandinsky-composition-vii-sketch-1913",
    artist: "Vasily Kandinsky",
    title: "Sketch for Composition VII",
    year: "1913",
    examCategory: "Abstract Art / Expressionist Abstraction",
    movementStyle: "Abstract art / Expressionist abstraction",
    typeOfWork: "Abstract painting / preparatory sketch for non-representational composition",
    importanceToMovement:
      "It represents abstraction's break from representing visible objects, using color, line, and rhythm to convey emotion and spiritual energy.",
    importanceToArtHistory:
      "It is important because it belongs to the early development of abstraction, helping establish that painting could exist without a recognizable subject.",
    mainReasonsImportant: [
      "Rejects representational subject matter",
      "Uses line and color as expressive forces",
      "Links abstraction with spirituality",
      "Helps define early abstract painting",
      "Shifts attention from objects to visual energy"
    ],
    visualClues: ["swirling abstract forms", "energetic color contrasts", "no single stable subject", "dynamic lines", "musical rhythm"],
    themes: ["abstraction", "spirituality", "emotion", "visual rhythm"],
    memoryHook: "Painting without objects, driven by energy.",
    imageSlug: "vasily-kandinsky-sketch-for-composition-vii",
    imageExtension: "jpg"
  },
  {
    id: "duchamp-bicycle-wheel-1913-1951",
    artist: "Marcel Duchamp",
    title: "Bicycle Wheel",
    year: "1913 / 1951 version",
    examCategory: "Dada / Readymade",
    movementStyle: "Dada / readymade",
    typeOfWork: "Assemblage / readymade sculpture",
    importanceToMovement:
      "It embodies Dada's anti-art spirit by taking ordinary objects out of everyday use and presenting them as art through choice and context rather than craftsmanship.",
    importanceToArtHistory:
      "It changed modern art by shifting attention from making an object beautifully to deciding that an object could count as art at all.",
    mainReasonsImportant: [
      "Questions what art is",
      "Makes idea more important than craftsmanship",
      "Uses ordinary objects as art",
      "Embodies Dada's anti-art stance",
      "Influenced Conceptual art"
    ],
    visualClues: ["bicycle wheel mounted on stool", "ordinary manufactured object", "simple assemblage", "no traditional sculptural modeling"],
    themes: ["anti-art", "irony", "concept", "everyday objects"],
    memoryHook: "A bicycle wheel becomes art because Duchamp says so.",
    aliases: ["Bicycle Wheel (Third version, after lost original of 1913)"],
    imageSlug: "marcel-duchamp-bicycle-wheel",
    imageExtension: "jpg"
  },
  {
    id: "de-lempicka-self-portrait-green-bugatti-1925",
    artist: "Tamara de Lempicka",
    title: "Self-Portrait in Green Bugatti",
    year: "1925",
    examCategory: "Art Deco",
    movementStyle: "Art Deco",
    typeOfWork: "Self-portrait / modern glamour portrait",
    importanceToMovement:
      "It exemplifies Art Deco through its sleek geometry, polished surfaces, fashionable modernity, and sense of speed and luxury.",
    importanceToArtHistory:
      "It became an iconic image of the interwar modern woman, combining self-fashioning, style, and machine-age glamour.",
    mainReasonsImportant: [
      "Embodies Art Deco elegance",
      "Links identity with speed and luxury",
      "Presents a modern, independent female persona",
      "Uses crisp geometry and polish",
      "Captures the interwar cult of style"
    ],
    visualClues: ["woman in green car", "sleek metallic surfaces", "stylized geometry", "fashionable pose", "cool glamour"],
    themes: ["modernity", "luxury", "self-fashioning", "speed"],
    memoryHook: "Art Deco glamour behind the wheel.",
    imageSlug: "tamara-de-lempicka-self-portrait-in-green-bugatti",
    imageExtension: "png"
  },
  {
    id: "rivera-detroit-industry-1931-1933",
    artist: "Diego Rivera",
    title: "Detroit Industry",
    year: "1931-1933",
    examCategory: "Mexican Muralism / Social Realism",
    movementStyle: "Mexican Muralism / Social Realism",
    typeOfWork: "Mural cycle / industrial labor painting",
    importanceToMovement:
      "It reflects muralism's public, social purpose by presenting labor, industry, and collective human effort on a monumental civic scale.",
    importanceToArtHistory:
      "It helped define 20th-century mural painting as politically and socially meaningful public art rather than private decoration.",
    mainReasonsImportant: [
      "Celebrates workers and industry",
      "Makes public art politically meaningful",
      "Uses mural scale for social ideas",
      "Links machine production with human labor",
      "Defines Rivera's public art vision"
    ],
    visualClues: ["factory workers", "machines and conveyor systems", "wall-sized composition", "repeating industrial forms", "crowded labor scene"],
    themes: ["labor", "industry", "collective effort", "public art"],
    memoryHook: "Industry painted as a monumental human system.",
    imageSlug: "diego-rivera-detroit-industry",
    imageExtension: "jpg"
  },
  {
    id: "rothko-no-61-1953",
    artist: "Mark Rothko",
    title: "No. 61 (Rust and Blue)",
    year: "1953",
    examCategory: "Abstract Expressionism",
    movementStyle: "Abstract Expressionism / Color Field painting",
    typeOfWork: "Abstract painting / color field painting",
    importanceToMovement:
      "It reflects Color Field painting by using large zones of color to create an immersive, emotional, and meditative experience rather than depicting objects.",
    importanceToArtHistory:
      "It helped establish abstraction as a powerful mode of feeling and contemplation, showing that color alone could carry serious emotional weight.",
    mainReasonsImportant: [
      "Uses color as the main source of feeling",
      "Creates a meditative viewing experience",
      "Represents Color Field abstraction",
      "Removes recognizable subject matter",
      "Makes scale and atmosphere emotionally powerful"
    ],
    visualClues: ["large floating rectangles", "soft edges", "broad color fields", "minimal composition", "immersive scale"],
    themes: ["emotion", "contemplation", "abstraction", "spiritual intensity"],
    memoryHook: "Large color fields meant to be felt, not decoded.",
    aliases: ["No. 61 (Rust and Blue) (also known as Brown, Blue, Brown on Blue)"],
    imageSlug: "mark-rothko-no-61-rust-and-blue",
    imageExtension: "jpg"
  },
  {
    id: "krasner-the-seasons-1957",
    artist: "Lee Krasner",
    title: "The Seasons",
    year: "1957",
    examCategory: "Abstract Expressionism",
    movementStyle: "Abstract Expressionism",
    typeOfWork: "Abstract painting / gestural large-scale canvas",
    importanceToMovement:
      "It reflects Abstract Expressionism through its large scale, energetic gesture, dense surface activity, and emphasis on personal expression through paint.",
    importanceToArtHistory:
      "It is important as a major work by Krasner, showing the range and ambition of Abstract Expressionism beyond its most famous male figures.",
    mainReasonsImportant: [
      "Uses gesture and scale expressively",
      "Shows Abstract Expressionism beyond a single style",
      "Highlights Krasner's major contribution",
      "Creates a dense all-over composition",
      "Connects abstraction to personal energy"
    ],
    visualClues: ["large canvas", "energetic brushwork", "dense interlocking forms", "no central focal point", "layered paint surface"],
    themes: ["gesture", "energy", "abstraction", "personal expression"],
    memoryHook: "Abstract Expressionism bursting across the whole canvas.",
    imageSlug: "lee-krasner-the-seasons",
    imageExtension: "jpg"
  },
  {
    id: "kelly-red-blue-green-1963",
    artist: "Ellsworth Kelly",
    title: "Red Blue Green",
    year: "1963",
    examCategory: "Post-Painterly Abstraction",
    movementStyle: "Post-Painterly Abstraction",
    typeOfWork: "Hard-edge abstract painting",
    importanceToMovement:
      "It reflects Post-Painterly Abstraction by rejecting gestural brushwork in favor of crisp edges, flat color, and cool visual clarity.",
    importanceToArtHistory:
      "It helped define a cleaner, more impersonal mode of abstraction that reacted against the emotional intensity of Abstract Expressionism.",
    mainReasonsImportant: [
      "Uses crisp hard-edge abstraction",
      "Rejects gestural expressiveness",
      "Makes flat color central",
      "Represents postwar cool abstraction",
      "Clarifies the shift after Abstract Expressionism"
    ],
    visualClues: ["large flat areas of color", "clean edges", "simple geometric organization", "no visible gestural drama"],
    themes: ["clarity", "color", "reduction", "cool abstraction"],
    memoryHook: "Abstraction without the drama.",
    imageSlug: "ellsworth-kelly-red-blue-green",
    imageExtension: "jpg"
  },
  {
    id: "hamilton-just-what-is-it-1956",
    artist: "Richard Hamilton",
    title: "Just What Is It That Makes Today's Homes So Different, So Appealing?",
    year: "1956",
    examCategory: "Pop Art",
    movementStyle: "Pop Art",
    typeOfWork: "Collage / consumer culture image",
    importanceToMovement:
      "It anticipates and defines Pop Art by using advertising imagery, consumer goods, and mass culture as the substance of art.",
    importanceToArtHistory:
      "It is often treated as an early landmark of Pop Art because it collapses the line between high art and popular media.",
    mainReasonsImportant: [
      "Uses mass media imagery as art",
      "Critiques and celebrates consumer culture",
      "Helps launch Pop Art",
      "Blurs high and low culture",
      "Makes collage a sharp cultural tool"
    ],
    visualClues: ["crowded modern interior", "bodybuilder and pin-up", "consumer products", "collaged magazine images", "comic, ad-like look"],
    themes: ["consumer culture", "mass media", "desire", "postwar modern life"],
    memoryHook: "Pop Art starts in a room full of ads and appliances.",
    aliases: ["Just What Is It That Makes Today's Home So Different, So Appealing?"],
    imageSlug: "richard-hamilton-just-what-is-it-that-makes-todays-homes-so-different-so-appealing",
    imageExtension: "jpg"
  },
  {
    id: "kosuth-one-and-three-chairs-1965",
    artist: "Joseph Kosuth",
    title: "One and Three Chairs",
    year: "1965",
    examCategory: "Conceptual Art",
    movementStyle: "Conceptual Art",
    typeOfWork: "Conceptual installation / object-text-photograph work",
    importanceToMovement:
      "It is a defining Conceptual artwork because the idea matters more than craft, asking how objects, images, and language produce meaning.",
    importanceToArtHistory:
      "It helped establish that art could primarily be a philosophical question or proposition instead of a traditional handmade object.",
    mainReasonsImportant: [
      "Makes the idea central",
      "Questions representation and meaning",
      "Uses object, photo, and text together",
      "Defines Conceptual art",
      "Shifts art toward language and analysis"
    ],
    visualClues: ["actual chair", "photograph of chair", "dictionary definition of chair", "plain gallery display"],
    themes: ["language", "representation", "meaning", "concept over object"],
    memoryHook: "A chair becomes a philosophy problem.",
    imageSlug: "joseph-kosuth-one-and-three-chairs",
    imageExtension: "jpg"
  },
  {
    id: "chicago-the-dinner-party-1979",
    artist: "Judy Chicago",
    title: "The Dinner Party",
    year: "1979",
    examCategory: "Feminist Art",
    movementStyle: "Feminist Art",
    typeOfWork: "Installation / mixed media work",
    importanceToMovement:
      "It is a landmark of Feminist art because it centers women's history, collaboration, and forms traditionally dismissed as craft.",
    importanceToArtHistory:
      "It challenged the male-centered art canon by giving monumental visibility to women excluded from mainstream historical narratives.",
    mainReasonsImportant: [
      "Centers women's history",
      "Defines Feminist art as revision and critique",
      "Uses installation rather than traditional painting",
      "Values collaborative and craft-based practices",
      "Challenges exclusion in art history"
    ],
    visualClues: ["triangular banquet table", "place settings", "decorated plates", "names of women inscribed on floor", "large-scale installation"],
    themes: ["women's history", "exclusion", "collaboration", "feminist revision"],
    memoryHook: "A dinner table becomes a monument to women left out of history.",
    imageSlug: "judy-chicago-the-dinner-party",
    imageExtension: "jpg"
  },
  {
    id: "viola-the-crossing-1996",
    artist: "Bill Viola",
    title: "The Crossing",
    year: "1996",
    examCategory: "Video Art / Installation Art",
    movementStyle: "Video Art / installation art",
    typeOfWork: "Video and sound installation",
    importanceToMovement:
      "It reflects video installation art by making time, projection, sound, and bodily experience central to the work rather than treating art as a static object.",
    importanceToArtHistory:
      "It helped establish installation and moving image work as major forms of contemporary art capable of producing immersive and spiritual experiences.",
    mainReasonsImportant: [
      "Uses time and motion as artistic material",
      "Creates an immersive installation experience",
      "Moves beyond traditional painting and sculpture",
      "Uses video for spiritual and emotional intensity",
      "Represents contemporary media art"
    ],
    visualClues: ["projected moving image", "human figure", "water and fire transformation", "darkened viewing space", "sound environment"],
    themes: ["transformation", "mortality", "spiritual experience", "immersion"],
    memoryHook: "A human figure transformed through fire and water.",
    imageSlug: "bill-viola-the-crossing",
    imageExtension: "jpg"
  },
  {
    id: "wall-the-storyteller-1986",
    artist: "Jeff Wall",
    title: "The Storyteller",
    year: "1986",
    examCategory: "Postmodern / Photoconceptual Art",
    movementStyle: "Photoconceptual / postmodern photography",
    typeOfWork: "Large-scale staged photograph / lightbox work",
    importanceToMovement:
      "It reflects photoconceptual art by using photography as a carefully constructed, cinematic, idea-driven medium rather than a casual snapshot.",
    importanceToArtHistory:
      "It helped show that large-format photography could function with the scale, ambition, and interpretive richness of painting and installation.",
    mainReasonsImportant: [
      "Treats photography as staged and intellectual",
      "Uses large scale like a painting",
      "Questions documentary truth",
      "Embodies postmodern self-awareness",
      "Expands photography's place in contemporary art"
    ],
    visualClues: ["large photographic scene", "staged composition", "lightbox presentation", "figures gathered in urban landscape", "cinematic feel"],
    themes: ["storytelling", "constructed reality", "postmodernism", "urban life"],
    memoryHook: "A photograph staged like a movie still.",
    imageSlug: "jeff-wall-the-storyteller",
    imageExtension: "png"
  }
];

export const artworks: Artwork[] = artworkSources.map(({
  aliases: _aliases,
  imageSlug,
  imageExtension,
  ...artwork
}) => ({
  ...artwork,
  image: `${BASE_ASSET_URL}images/${imageSlug}.${imageExtension}`,
}));

export const EXAM_CATEGORY_OPTIONS = [
  'All categories',
  ...EXAM_CATEGORIES,
  ...Array.from(
    new Set(artworks.map((artwork) => artwork.examCategory).filter((category) => !EXAM_CATEGORIES.includes(category as (typeof EXAM_CATEGORIES)[number]))),
  ),
] as const;

export default artworks;
