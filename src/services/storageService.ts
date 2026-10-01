import { UserProgress, Flashcard, Deck } from '../types';
import { SrsService } from './srsService';

const PROGRESS_KEY = 'hanziflow_user_progress_v1';
const DECKS_KEY = 'hanziflow_decks_v1';
const CARDS_KEY = 'hanziflow_cards_v1';

export class StorageService {
  public static loadProgress(): UserProgress {
    try {
      const stored = localStorage.getItem(PROGRESS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as UserProgress;
        return this.verifyAndUpdateStreak(parsed);
      }
    } catch (e) {
      console.error('Failed to load user progress', e);
    }

    const defaultProgress: UserProgress = {
      xp: 0,
      streak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      completedLessons: [],
      starredCharacters: [],
      starredSentences: [],
      settings: {
        showPinyin: true,
        toneColors: true,
        speechSpeed: 1.0,
        autoPlayAudio: true,
        darkMode: false,
      }
    };

    this.saveProgress(defaultProgress);
    return defaultProgress;
  }

  public static saveProgress(progress: UserProgress): void {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save user progress', e);
    }
  }

  private static verifyAndUpdateStreak(progress: UserProgress): UserProgress {
    const today = new Date().toISOString().split('T')[0];
    if (progress.lastActiveDate === today) {
      return progress;
    }

    const last = new Date(progress.lastActiveDate);
    const curr = new Date(today);
    const diffDays = Math.round((curr.getTime() - last.getTime()) / (1000 * 3600 * 24));

    if (diffDays === 1) {
      // Continued streak yesterday
      progress.streak += 1;
      progress.lastActiveDate = today;
    } else if (diffDays > 1) {
      // Streak broken
      progress.streak = 1;
      progress.lastActiveDate = today;
    }
    this.saveProgress(progress);
    return progress;
  }

  public static addXP(amount: number): UserProgress {
    const progress = this.loadProgress();
    progress.xp += amount;
    this.saveProgress(progress);
    return progress;
  }

  public static completeLesson(lessonId: string, xpReward: number): UserProgress {
    const progress = this.loadProgress();
    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
    }
    progress.xp += xpReward;
    this.saveProgress(progress);
    return progress;
  }

  public static toggleStarCharacter(char: string): UserProgress {
    const progress = this.loadProgress();
    if (progress.starredCharacters.includes(char)) {
      progress.starredCharacters = progress.starredCharacters.filter(c => c !== char);
    } else {
      progress.starredCharacters.push(char);
    }
    this.saveProgress(progress);
    return progress;
  }

  public static loadDecksAndCards(): { decks: Deck[]; cards: Flashcard[] } {
    try {
      const storedDecks = localStorage.getItem(DECKS_KEY);
      const storedCards = localStorage.getItem(CARDS_KEY);

      if (storedDecks && storedCards) {
        return {
          decks: JSON.parse(storedDecks),
          cards: JSON.parse(storedCards)
        };
      }
    } catch (e) {
      console.error('Failed to load decks and cards', e);
    }

    // Seed defaults
    const initial = SrsService.generateInitialDecksAndCards();
    this.saveDecks(initial.decks);
    this.saveCards(initial.cards);
    return initial;
  }

  public static saveDecks(decks: Deck[]): void {
    try {
      localStorage.setItem(DECKS_KEY, JSON.stringify(decks));
    } catch (e) {
      console.error('Failed to save decks', e);
    }
  }

  public static saveCards(cards: Flashcard[]): void {
    try {
      localStorage.setItem(CARDS_KEY, JSON.stringify(cards));
    } catch (e) {
      console.error('Failed to save cards', e);
    }
  }

  public static updateCardSRS(cardId: string, updatedCard: Flashcard): Flashcard[] {
    const { cards } = this.loadDecksAndCards();
    const updated = cards.map(c => c.id === cardId ? updatedCard : c);
    this.saveCards(updated);
    return updated;
  }
}
