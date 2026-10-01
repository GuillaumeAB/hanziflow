import React from 'react';
import { Deck, Flashcard } from '../../types';
import { SrsService } from '../../services/srsService';
import { Play, Sparkles, BookOpen, Clock, CheckCircle2, Flame, Award, Headphones, Atom, Search, ListFilter } from 'lucide-react';

interface DeckListViewProps {
  decks: Deck[];
  cards: Flashcard[];
  onSelectDeck: (deck: Deck) => void;
  onBrowseCards: () => void;
  onAddCard?: () => void;
  streak: number;
}

export const DeckListView: React.FC<DeckListViewProps> = ({
  decks,
  cards,
  onSelectDeck,
  onBrowseCards,
  onAddCard,
  streak
}) => {
  // Calculate due cards count per deck
  const getDeckStats = (deckId: string) => {
    const deckCards = cards.filter(c => c.deckId === deckId);
    const dueCards = deckCards.filter(c => SrsService.isDue(c));
    const newCards = deckCards.filter(c => c.srs.repetitions === 0);
    return {
      total: deckCards.length,
      due: dueCards.length,
      newCount: newCards.length
    };
  };

  const totalDueAcrossAll = cards.filter(c => SrsService.isDue(c)).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-lg">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold tracking-wider uppercase border border-indigo-500/30">
              <Sparkles size={14} />
              <span>Anki SuperMemo SM-2 Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Spaced Repetition Decks
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Scientifically proven memory intervals for long-term retention. Review your due cards daily or open the Card Browser to inspect your memory progress.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={onBrowseCards}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition-transform active:scale-95 flex items-center gap-1.5"
              >
                <Search size={14} />
                <span>Open Card Browser & Inspector</span>
              </button>

              {onAddCard && (
                <button
                  type="button"
                  onClick={onAddCard}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold shadow-xs transition-transform active:scale-95 flex items-center gap-1.5"
                >
                  <span>+ New Custom Card</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shrink-0">
            <div className="flex items-center gap-2">
              <Flame size={20} className="text-amber-400 fill-amber-400" />
              <span className="text-lg font-extrabold">{streak} Day Streak</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-indigo-300 font-semibold">
              <Clock size={16} />
              <span>{totalDueAcrossAll} cards due today</span>
            </div>
          </div>
        </div>

        {/* Subtle background Hanzi */}
        <div className="absolute right-6 -bottom-6 text-9xl font-chinese font-bold text-white/5 select-none pointer-events-none">
          忆
        </div>
      </div>

      {/* Decks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {decks.map((deck) => {
          const stats = getDeckStats(deck.id);

          return (
            <div
              key={deck.id}
              onClick={() => onSelectDeck(deck)}
              className="rounded-3xl p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-sm font-chinese font-bold text-lg">
                      {deck.hsk === 'all' ? (
                        deck.id.includes('radicals') ? <Atom size={20} /> : <Headphones size={20} />
                      ) : (
                        `H${deck.hsk}`
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {deck.title}
                      </h3>
                      <span className="text-xs text-slate-400 font-medium">
                        {deck.hsk === 'all' ? 'Comprehensive' : `HSK Level ${deck.hsk}`}
                      </span>
                    </div>
                  </div>

                  {stats.due > 0 ? (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 animate-pulse">
                      {stats.due} Due
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 size={15} />
                      <span>Done</span>
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {deck.description}
                </p>
              </div>

              {/* Deck Counts & Review Action */}
              <div className="pt-5 mt-auto flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    {stats.total} cards
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">
                    {stats.newCount} new
                  </span>
                </div>

                <button
                  type="button"
                  className="px-3.5 py-1.5 rounded-xl font-bold text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/60 dark:text-indigo-300 transition-colors flex items-center gap-1.5 group-hover:bg-indigo-600 group-hover:text-white"
                >
                  <Play size={12} className="fill-current" />
                  <span>{stats.due > 0 ? 'Study Due' : 'Review All'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
