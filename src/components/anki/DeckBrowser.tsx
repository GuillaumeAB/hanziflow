import React, { useState } from 'react';
import { Deck, Flashcard, HSKLevel } from '../../types';
import { SrsService } from '../../services/srsService';
import { AudioButton } from '../common/AudioButton';
import { TonePinyin } from '../common/TonePinyin';
import { InteractiveHanzi } from '../common/InteractiveHanzi';
import { Search, Filter, BookOpen, Clock, Star, RotateCcw, CheckCircle2, ChevronRight, Layers } from 'lucide-react';

interface DeckBrowserProps {
  decks: Deck[];
  cards: Flashcard[];
  onSelectCharacter: (char: string) => void;
  onUpdateCardSRS: (cardId: string, updatedCard: Flashcard) => void;
  onBackToDecks: () => void;
}

export const DeckBrowser: React.FC<DeckBrowserProps> = ({
  decks,
  cards,
  onSelectCharacter,
  onUpdateCardSRS,
  onBackToDecks
}) => {
  const [selectedDeckId, setSelectedDeckId] = useState<string | 'all'>('all');
  const [selectedHsk, setSelectedHsk] = useState<HSKLevel | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'due' | 'new' | 'learning' | 'mastered'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCards = cards.filter((c) => {
    const matchesDeck = selectedDeckId === 'all' || c.deckId === selectedDeckId;
    const matchesHsk = selectedHsk === 'all' || c.hsk === selectedHsk;

    let matchesStatus = true;
    const isDue = SrsService.isDue(c);
    if (statusFilter === 'due') matchesStatus = isDue;
    else if (statusFilter === 'new') matchesStatus = c.srs.repetitions === 0;
    else if (statusFilter === 'learning') matchesStatus = c.srs.repetitions > 0 && c.srs.interval < 21;
    else if (statusFilter === 'mastered') matchesStatus = c.srs.interval >= 21;

    const matchesSearch =
      !searchQuery ||
      c.front.includes(searchQuery) ||
      c.pinyin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.english.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDeck && matchesHsk && matchesStatus && matchesSearch;
  });

  const handleResetCard = (card: Flashcard) => {
    const resetSRS = SrsService.createDefaultSRS();
    onUpdateCardSRS(card.id, { ...card, srs: resetSRS });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={onBackToDecks}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline mb-1 inline-flex items-center gap-1"
          >
            ← Return to SRS Decks
          </button>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <BookOpen size={24} className="text-indigo-600 dark:text-indigo-400" />
            <span>Anki Card Browser & Inspector</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Browse all {cards.length} spaced repetition cards across HSK levels, inspect SM-2 intervals, or practice pronunciation.
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-bold text-indigo-700 dark:text-indigo-300 self-start sm:self-auto">
          Showing {filteredCards.length} cards
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3">
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cards by Chinese characters, pinyin, or English translation..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Deck filter */}
          <select
            value={selectedDeckId}
            onChange={(e) => setSelectedDeckId(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="all">All Decks</option>
            {decks.map(d => (
              <option key={d.id} value={d.id}>{d.title}</option>
            ))}
          </select>

          {/* HSK filter */}
          <select
            value={selectedHsk}
            onChange={(e) => setSelectedHsk(e.target.value === 'all' ? 'all' : Number(e.target.value) as HSKLevel)}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="all">All HSK</option>
            <option value="1">HSK 1</option>
            <option value="2">HSK 2</option>
            <option value="3">HSK 3</option>
            <option value="4">HSK 4</option>
            <option value="5">HSK 5</option>
          </select>

          {/* Status filter */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {(['all', 'due', 'new', 'learning', 'mastered'] as const).map(status => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                  statusFilter === status
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards Table / Grid */}
      <div className="space-y-3">
        {filteredCards.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-400 text-sm">
            No cards found matching your filter criteria.
          </div>
        ) : (
          filteredCards.map((card) => {
            const isDue = SrsService.isDue(card);

            return (
              <div
                key={card.id}
                className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-800 shadow-sm transition-all duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Front & Details */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      HSK {card.hsk}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400 capitalize">
                      {card.type} Card
                    </span>
                    {isDue && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">
                        Due Now
                      </span>
                    )}
                  </div>

                  {/* Hanzi with click to inspect */}
                  <div className="text-xl sm:text-2xl font-chinese font-bold text-slate-900 dark:text-slate-100">
                    <InteractiveHanzi
                      text={card.front}
                      onSelectCharacter={onSelectCharacter}
                      showClickHint={true}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <TonePinyin pinyin={card.pinyin} toneColors={true} className="text-xs font-semibold" />
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                      {card.english}
                    </span>
                  </div>
                </div>

                {/* SM-2 Metadata & Controls */}
                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800 shrink-0">
                  {/* SRS Stats pill */}
                  <div className="text-right text-xs text-slate-400">
                    <div className="font-bold text-slate-700 dark:text-slate-300">
                      {card.srs.interval === 0 ? '0d' : `${card.srs.interval}d`} interval
                    </div>
                    <div className="text-[10px]">
                      {card.srs.repetitions} reps • EF {card.srs.easeFactor.toFixed(1)}
                    </div>
                  </div>

                  {/* Audio button */}
                  <AudioButton text={card.front} size="sm" includeSlow={true} />

                  {/* Reset card button */}
                  <button
                    type="button"
                    onClick={() => handleResetCard(card)}
                    title="Reset card review interval to 0"
                    className="p-2 rounded-xl text-slate-400 hover:text-amber-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <RotateCcw size={16} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
