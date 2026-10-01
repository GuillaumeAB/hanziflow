import React, { useState, useEffect, useCallback } from 'react';
import { Deck, Flashcard, SRSRating } from '../../types';
import { SrsService } from '../../services/srsService';
import { audioService } from '../../services/audioService';
import { TonePinyin } from '../common/TonePinyin';
import { AudioButton } from '../common/AudioButton';
import { InteractiveHanzi } from '../common/InteractiveHanzi';
import { X, RotateCcw, Volume2, Sparkles, CheckCircle2, ChevronRight, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AnkiReviewSessionProps {
  deck: Deck;
  allDeckCards: Flashcard[];
  onClose: () => void;
  onUpdateCardSRS: (cardId: string, updatedCard: Flashcard) => void;
  onSelectCharacter: (char: string) => void;
}

export const AnkiReviewSession: React.FC<AnkiReviewSessionProps> = ({
  deck,
  allDeckCards,
  onClose,
  onUpdateCardSRS,
  onSelectCharacter
}) => {
  // Filter due cards first, or review all cards if none due
  const [reviewQueue, setReviewQueue] = useState<Flashcard[]>(() => {
    const due = allDeckCards.filter(c => SrsService.isDue(c));
    return due.length > 0 ? due : allDeckCards;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);

  const currentCard = reviewQueue[currentIndex];

  // Auto-play audio when a new card appears
  useEffect(() => {
    if (!currentCard || sessionCompleted) return;
    setIsFlipped(false);

    const timer = setTimeout(() => {
      audioService.speak(currentCard.front, 1.0);
    }, 250);

    return () => clearTimeout(timer);
  }, [currentIndex, currentCard, sessionCompleted]);

  const handleFlip = useCallback(() => {
    if (isFlipped) return;
    audioService.playClickSound();
    setIsFlipped(true);
  }, [isFlipped]);

  const handleRate = useCallback((rating: SRSRating) => {
    if (!currentCard || !isFlipped) return;

    if (rating === 1) {
      audioService.playWrongSound();
    } else {
      audioService.playSuccessSound();
    }

    const nextSRS = SrsService.calculateNextReview(currentCard.srs, rating);
    const updatedCard: Flashcard = {
      ...currentCard,
      srs: nextSRS
    };

    onUpdateCardSRS(currentCard.id, updatedCard);
    setReviewedCount(prev => prev + 1);

    // If "Again", re-insert into current queue at end
    if (rating === 1) {
      setReviewQueue(prev => [...prev, updatedCard]);
    }

    if (currentIndex + 1 < reviewQueue.length) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      setSessionCompleted(true);
      audioService.playCompleteFanfare();
      confetti({ particleCount: 70, spread: 60 });
    }
  }, [currentCard, isFlipped, currentIndex, reviewQueue.length, onUpdateCardSRS]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (sessionCompleted) return;

      if (e.code === 'Space') {
        e.preventDefault();
        if (!isFlipped) {
          handleFlip();
        }
      } else if (e.key === 'r' || e.key === 'R') {
        if (currentCard) audioService.speak(currentCard.front, 1.0);
      } else if (e.key === 's' || e.key === 'S') {
        if (currentCard) audioService.speakSlow(currentCard.front);
      } else if (isFlipped) {
        if (e.key === '1') handleRate(1);
        if (e.key === '2') handleRate(2);
        if (e.key === '3') handleRate(3);
        if (e.key === '4') handleRate(4);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, sessionCompleted, currentCard, handleFlip, handleRate]);

  if (sessionCompleted || !currentCard) {
    return (
      <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 text-center space-y-5">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-indigo-100 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <CheckCircle2 size={44} />
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Deck Completed!
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Reviewed <strong className="text-slate-800 dark:text-slate-200">{reviewedCount}</strong> cards in "{deck.title}".
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-600 dark:text-slate-400 space-y-1">
            <p>Cards have been rescheduled based on the SuperMemo SM-2 algorithm.</p>
            <p className="font-semibold text-indigo-600 dark:text-indigo-400">
              Come back tomorrow for your next memory retention review!
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-md transition-transform active:scale-95"
          >
            Back to Decks
          </button>
        </div>
      </div>
    );
  }

  const intervalPreviews = SrsService.previewIntervals(currentCard.srs);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col">
        {/* Top Header */}
        <div className="sticky top-0 z-20 px-6 py-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X size={20} />
            </button>
            <span className="font-bold text-sm text-slate-800 dark:text-slate-200 truncate max-w-[180px]">
              {deck.title}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span>Card {currentIndex + 1} of {reviewQueue.length}</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              Rep {currentCard.srs.repetitions}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
          {/* Card Presentation Container */}
          <div
            onClick={!isFlipped ? handleFlip : undefined}
            className={`min-h-[260px] sm:min-h-[300px] p-6 sm:p-8 rounded-3xl border-2 transition-all duration-200 flex flex-col items-center justify-center text-center cursor-pointer select-none ${
              isFlipped
                ? 'bg-slate-50/80 dark:bg-slate-800/40 border-indigo-200 dark:border-indigo-900/50 shadow-inner'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300 shadow-md hover:shadow-lg'
            }`}
          >
            {/* Front: Hanzi & Audio */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <AudioButton text={currentCard.front} size="lg" includeSlow={true} />
              </div>

              <div className="text-3xl sm:text-4xl font-chinese font-bold text-slate-900 dark:text-slate-100 tracking-wide">
                <InteractiveHanzi
                  text={currentCard.front}
                  onSelectCharacter={onSelectCharacter}
                  showClickHint={isFlipped}
                />
              </div>

              {!isFlipped && (
                <div className="pt-6 flex flex-col items-center text-xs text-slate-400 gap-1">
                  <span className="font-medium">Tap card or press Space to show answer</span>
                  <span className="text-[11px] text-slate-400/80">Keys: [R] Audio • [S] Slow</span>
                </div>
              )}
            </div>

            {/* Back (Revealed Answer) */}
            {isFlipped && (
              <div className="mt-6 pt-6 border-t border-slate-200/80 dark:border-slate-700/80 w-full space-y-3 animate-in fade-in duration-200">
                <TonePinyin
                  pinyin={currentCard.pinyin}
                  toneColors={true}
                  className="text-lg sm:text-xl font-bold justify-center"
                />

                <div className="text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-200">
                  {currentCard.english}
                </div>

                <div className="pt-1 text-xs text-slate-400">
                  💡 Tip: Click any Chinese character above to inspect its radical & anatomy
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          {!isFlipped ? (
            <button
              type="button"
              onClick={handleFlip}
              className="w-full py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              <Eye size={18} />
              <span>Show Answer (Space)</span>
            </button>
          ) : (
            <div className="space-y-2">
              <div className="text-center text-xs text-slate-400 font-medium">
                Rate your recall (Keys 1 - 4):
              </div>

              <div className="grid grid-cols-4 gap-2">
                {/* 1: Again */}
                <button
                  type="button"
                  onClick={() => handleRate(1)}
                  className="p-3 rounded-2xl bg-red-50 hover:bg-red-100 text-red-700 dark:bg-red-950/50 dark:hover:bg-red-900/60 dark:text-red-300 border border-red-200 dark:border-red-900 font-bold flex flex-col items-center justify-center transition-transform active:scale-95 shadow-sm"
                >
                  <span className="text-xs font-bold text-red-500">Again [1]</span>
                  <span className="text-sm font-extrabold">{intervalPreviews.again}</span>
                </button>

                {/* 2: Hard */}
                <button
                  type="button"
                  onClick={() => handleRate(2)}
                  className="p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:hover:bg-amber-900/60 dark:text-amber-300 border border-amber-200 dark:border-amber-900 font-bold flex flex-col items-center justify-center transition-transform active:scale-95 shadow-sm"
                >
                  <span className="text-xs font-bold text-amber-500">Hard [2]</span>
                  <span className="text-sm font-extrabold">{intervalPreviews.hard}</span>
                </button>

                {/* 3: Good */}
                <button
                  type="button"
                  onClick={() => handleRate(3)}
                  className="p-3 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:hover:bg-blue-900/60 dark:text-blue-300 border border-blue-200 dark:border-blue-900 font-bold flex flex-col items-center justify-center transition-transform active:scale-95 shadow-sm"
                >
                  <span className="text-xs font-bold text-blue-500">Good [3]</span>
                  <span className="text-sm font-extrabold">{intervalPreviews.good}</span>
                </button>

                {/* 4: Easy */}
                <button
                  type="button"
                  onClick={() => handleRate(4)}
                  className="p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:hover:bg-emerald-900/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 font-bold flex flex-col items-center justify-center transition-transform active:scale-95 shadow-sm"
                >
                  <span className="text-xs font-bold text-emerald-500">Easy [4]</span>
                  <span className="text-sm font-extrabold">{intervalPreviews.easy}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
