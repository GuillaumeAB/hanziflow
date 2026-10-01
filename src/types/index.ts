export type ToneNumber = 1 | 2 | 3 | 4 | 5;

export type HSKLevel = 1 | 2 | 3 | 4 | 5;

export interface Radical {
  id: string;
  char: string;
  name: string;
  originalChar?: string;
  pinyin: string;
  meaning: string;
  strokeCount: number;
  position?: 'left' | 'right' | 'top' | 'bottom' | 'enclosure' | 'general';
  category: 'nature' | 'people' | 'animals' | 'food' | 'tools' | 'mind' | 'action';
  commonCharacters: string[];
}

export interface CharacterComponent {
  char: string;
  meaning: string;
  pinyin?: string;
  role?: 'semantic' | 'phonetic' | 'structural';
}

export interface CharacterDetail {
  char: string;
  pinyin: string;
  tone: ToneNumber;
  english: string;
  hsk: HSKLevel;
  strokeCount: number;
  radical: string;
  radicalMeaning: string;
  radicalName?: string;
  whyRadical?: string; // Clear explanation of why this radical is used
  formula?: {
    radical: string;
    radicalRole: string;
    phoneticOrOther: string;
    phoneticRole: string;
  };
  components: CharacterComponent[];
  etymology: string;
  mnemonic?: string;
  exampleWords: {
    word: string;
    pinyin: string;
    english: string;
  }[];
  exampleSentences: {
    cn: string;
    pinyin: string;
    en: string;
  }[];
}

export interface SentenceWord {
  word: string;
  pinyin: string;
  en: string;
}

export interface OralSentence {
  id: string;
  hsk: HSKLevel;
  topic: string;
  cn: string;
  pinyin: string;
  en: string;
  words: SentenceWord[];
  grammarNote?: string;
}

export type SRSRating = 1 | 2 | 3 | 4; // 1: Again, 2: Hard, 3: Good, 4: Easy

export interface SRSData {
  interval: number; // in days
  repetitions: number;
  easeFactor: number; // default 2.5
  nextReviewDate: number; // timestamp ms
  lastReviewedDate?: number;
  lapses: number;
}

export interface Flashcard {
  id: string;
  deckId: string;
  type: 'character' | 'sentence' | 'radical';
  char?: string;
  sentenceId?: string;
  front: string;
  back: string;
  pinyin: string;
  english: string;
  hsk: HSKLevel;
  srs: SRSData;
  isStarred?: boolean;
}

export interface Deck {
  id: string;
  title: string;
  description: string;
  hsk: HSKLevel | 'all' | 'custom';
  icon: string;
  color: string;
  isCustom?: boolean;
}

export type ExerciseType = 'sentence_reorder' | 'audio_cloze' | 'listening_match' | 'dictation';

export interface Exercise {
  id: string;
  type: ExerciseType;
  audioText: string;
  pinyin?: string;
  english?: string;
  promptQuestion: string;
  scrambledWords?: string[];
  correctOrder?: string[];
  options?: string[];
  correctAnswer?: string;
  missingWordPinyin?: string;
  explanation?: string;
}

export interface LessonUnit {
  id: string;
  hsk: HSKLevel;
  title: string;
  unitNumber: number;
  description: string;
  icon: string;
  category: string;
  exercises: Exercise[];
  charactersIntroduced: string[];
  xp: number;
}

export interface UserProgress {
  xp: number;
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  completedLessons: string[]; // lesson ids
  starredCharacters: string[];
  starredSentences: string[];
  settings: {
    showPinyin: boolean;
    toneColors: boolean;
    speechSpeed: number; // 0.7 or 1.0
    autoPlayAudio: boolean;
    darkMode: boolean;
  };
}

export interface RadicalPuzzleItem {
  id: string;
  targetChar: string;
  pinyin: string;
  english: string;
  hsk: HSKLevel;
  radical: string;
  radicalMeaning: string;
  phoneticOrBody: string;
  phoneticMeaning: string;
  distractorRadicals: string[];
  distractorBodies: string[];
  explanation: string;
}
