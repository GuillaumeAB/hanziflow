import { SRSData, SRSRating, Flashcard, Deck, HSKLevel } from '../types';
import { CHARACTERS_DATA } from '../data/characters';
import { ORAL_SENTENCES_DATA } from '../data/sentences';
import { RADICALS_DATA } from '../data/radicals';

const ONE_MINUTE_MS = 60 * 1000;
const TWELVE_HOURS_MS = 12 * 60 * 60 * 1000;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

/**
 * SuperMemo SM-2 Spaced Repetition Algorithm Implementation
 */
export class SrsService {
  /**
   * Calculate updated SRS values based on user's rating:
   * 1: Again (< 1 min)
   * 2: Hard (12 hours or 1.2x)
   * 3: Good (standard SM-2 interval)
   * 4: Easy (bonus interval + higher EF)
   */
  public static calculateNextReview(current: SRSData, rating: SRSRating): SRSData {
    const now = Date.now();
    let { interval, repetitions, easeFactor, lapses } = current;

    // Map 1-4 rating to SM-2 quality (0 to 5)
    // 1 (Again) -> 1, 2 (Hard) -> 3, 3 (Good) -> 4, 4 (Easy) -> 5
    const qualityMap: Record<SRSRating, number> = {
      1: 1,
      2: 3,
      3: 4,
      4: 5
    };
    const q = qualityMap[rating];

    // Calculate updated ease factor: EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    easeFactor = easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
    if (easeFactor < 1.3) easeFactor = 1.3;

    let nextReviewDate = now;

    if (rating === 1) {
      // Again: reset repetition counter and lapse
      repetitions = 0;
      interval = 0;
      lapses += 1;
      nextReviewDate = now + ONE_MINUTE_MS;
    } else if (rating === 2) {
      // Hard: slight progression
      repetitions += 1;
      if (interval === 0) {
        interval = 0.5; // 12 hours
        nextReviewDate = now + TWELVE_HOURS_MS;
      } else {
        interval = Math.max(1, Math.round(interval * 1.2));
        nextReviewDate = now + Math.round(interval * ONE_DAY_MS);
      }
    } else if (rating === 3) {
      // Good: standard SM-2 progression
      if (repetitions === 0) {
        interval = 1;
      } else if (repetitions === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }
      repetitions += 1;
      nextReviewDate = now + Math.round(interval * ONE_DAY_MS);
    } else {
      // Easy: accelerated progression with 1.3x bonus
      if (repetitions === 0) {
        interval = 4;
      } else if (repetitions === 1) {
        interval = 10;
      } else {
        interval = Math.round(interval * easeFactor * 1.3);
      }
      repetitions += 1;
      nextReviewDate = now + Math.round(interval * ONE_DAY_MS);
    }

    return {
      interval,
      repetitions,
      easeFactor,
      nextReviewDate,
      lastReviewedDate: now,
      lapses
    };
  }

  /**
   * Preview human-readable intervals for the 4 grading buttons
   */
  public static previewIntervals(current: SRSData): { again: string; hard: string; good: string; easy: string } {
    return {
      again: '< 1 min',
      hard: current.repetitions === 0 ? '12 hrs' : `${Math.max(1, Math.round(current.interval * 1.2))}d`,
      good: current.repetitions === 0 ? '1 day' : current.repetitions === 1 ? '6 days' : `${Math.round(current.interval * current.easeFactor)}d`,
      easy: current.repetitions === 0 ? '4 days' : current.repetitions === 1 ? '10 days' : `${Math.round(current.interval * current.easeFactor * 1.3)}d`
    };
  }

  public static isDue(card: Flashcard): boolean {
    return Date.now() >= card.srs.nextReviewDate;
  }

  public static createDefaultSRS(): SRSData {
    return {
      interval: 0,
      repetitions: 0,
      easeFactor: 2.5,
      nextReviewDate: Date.now(),
      lapses: 0
    };
  }

  /**
   * Generate default pre-built decks and populate cards from our rich datasets
   */
  public static generateInitialDecksAndCards(): { decks: Deck[]; cards: Flashcard[] } {
    const decks: Deck[] = [
      {
        id: 'deck-hsk1',
        title: 'HSK 1 Mastery',
        description: 'Core characters, tones and essential greetings',
        hsk: 1,
        icon: 'Sparkles',
        color: 'from-blue-500 to-cyan-500'
      },
      {
        id: 'deck-hsk2',
        title: 'HSK 2 Daily Life',
        description: 'Directions, shopping, bargaining, and routines',
        hsk: 2,
        icon: 'Compass',
        color: 'from-emerald-500 to-teal-500'
      },
      {
        id: 'deck-hsk3',
        title: 'HSK 3 Conversations',
        description: 'Socializing, nuanced grammar, and opinions',
        hsk: 3,
        icon: 'MessageSquare',
        color: 'from-amber-500 to-yellow-500'
      },
      {
        id: 'deck-hsk4',
        title: 'HSK 4 Advanced Fluency',
        description: 'Complex environments, interviews, culture',
        hsk: 4,
        icon: 'Flame',
        color: 'from-orange-500 to-red-500'
      },
      {
        id: 'deck-hsk5',
        title: 'HSK 5 Professional',
        description: 'Formal agreements, discussions, abstract concepts',
        hsk: 5,
        icon: 'Crown',
        color: 'from-purple-500 to-indigo-500'
      },
      {
        id: 'deck-sentences',
        title: 'Oral Sentences Audio Deck',
        description: 'Spoken Chinese listening comprehension for all HSK levels',
        hsk: 'all',
        icon: 'Headphones',
        color: 'from-rose-500 to-pink-500'
      },
      {
        id: 'deck-radicals',
        title: '214 Kangxi Radicals Lab',
        description: 'The core building blocks and anatomical radicals of Hanzi',
        hsk: 'all',
        icon: 'Atom',
        color: 'from-violet-500 to-purple-600'
      }
    ];

    const cards: Flashcard[] = [];

    // 1. Character cards for HSK 1-5
    Object.values(CHARACTERS_DATA).forEach((charDetail) => {
      const deckId = `deck-hsk${charDetail.hsk}`;
      cards.push({
        id: `card-char-${charDetail.char}`,
        deckId,
        type: 'character',
        char: charDetail.char,
        front: charDetail.char,
        back: `${charDetail.pinyin} - ${charDetail.english}`,
        pinyin: charDetail.pinyin,
        english: charDetail.english,
        hsk: charDetail.hsk,
        srs: SrsService.createDefaultSRS()
      });
    });

    // 2. Oral Sentences cards
    ORAL_SENTENCES_DATA.forEach((s) => {
      cards.push({
        id: `card-sent-${s.id}`,
        deckId: 'deck-sentences',
        type: 'sentence',
        sentenceId: s.id,
        front: s.cn,
        back: `${s.pinyin}\n${s.en}`,
        pinyin: s.pinyin,
        english: s.en,
        hsk: s.hsk,
        srs: SrsService.createDefaultSRS()
      });
    });

    // 3. Radicals cards
    RADICALS_DATA.forEach((r) => {
      cards.push({
        id: `card-rad-${r.id}`,
        deckId: 'deck-radicals',
        type: 'radical',
        char: r.char,
        front: r.char,
        back: `${r.pinyin} - ${r.meaning} (${r.name})`,
        pinyin: r.pinyin,
        english: r.meaning,
        hsk: 1,
        srs: SrsService.createDefaultSRS()
      });
    });

    return { decks, cards };
  }
}
