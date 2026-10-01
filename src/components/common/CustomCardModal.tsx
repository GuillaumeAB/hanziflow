import React, { useState } from 'react';
import { X, Plus, Volume2, Sparkles } from 'lucide-react';
import { Flashcard, Deck, HSKLevel } from '../../types';
import { SrsService } from '../../services/srsService';
import { audioService } from '../../services/audioService';

interface CustomCardModalProps {
  decks: Deck[];
  onClose: () => void;
  onAddCard: (card: Flashcard) => void;
}

export const CustomCardModal: React.FC<CustomCardModalProps> = ({
  decks,
  onClose,
  onAddCard
}) => {
  const [chineseText, setChineseText] = useState('');
  const [pinyin, setPinyin] = useState('');
  const [english, setEnglish] = useState('');
  const [selectedDeckId, setSelectedDeckId] = useState(decks[0]?.id || 'deck-hsk1');
  const [hsk, setHsk] = useState<HSKLevel>(1);
  const [type, setType] = useState<'character' | 'sentence'>('sentence');

  const handleTestAudio = () => {
    if (chineseText.trim()) {
      audioService.speak(chineseText.trim(), 1.0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chineseText.trim() || !english.trim()) return;

    const newCard: Flashcard = {
      id: `custom-card-${Date.now()}`,
      deckId: selectedDeckId,
      type,
      front: chineseText.trim(),
      back: `${pinyin.trim()}\n${english.trim()}`,
      pinyin: pinyin.trim() || '—',
      english: english.trim(),
      hsk,
      srs: SrsService.createDefaultSRS(),
      isStarred: true
    };

    onAddCard(newCard);
    audioService.playSuccessSound();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400">
              <Plus size={18} />
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Create Custom Anki Card
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          {/* Target Deck & Type */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-600 dark:text-slate-400 block mb-1">
                Target Deck:
              </label>
              <select
                value={selectedDeckId}
                onChange={(e) => setSelectedDeckId(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
              >
                {decks.map(d => (
                  <option key={d.id} value={d.id}>{d.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-600 dark:text-slate-400 block mb-1">
                HSK Level:
              </label>
              <select
                value={hsk}
                onChange={(e) => setHsk(Number(e.target.value) as HSKLevel)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
              >
                <option value={1}>HSK 1</option>
                <option value={2}>HSK 2</option>
                <option value={3}>HSK 3</option>
                <option value={4}>HSK 4</option>
                <option value={5}>HSK 5</option>
              </select>
            </div>
          </div>

          {/* Chinese text */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-slate-600 dark:text-slate-400">
                Chinese Hanzi:
              </label>
              {chineseText && (
                <button
                  type="button"
                  onClick={handleTestAudio}
                  className="text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <Volume2 size={13} />
                  <span>Listen</span>
                </button>
              )}
            </div>
            <input
              type="text"
              required
              value={chineseText}
              onChange={(e) => setChineseText(e.target.value)}
              placeholder="e.g. 我想喝一杯奶茶。"
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-chinese text-base focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Pinyin */}
          <div>
            <label className="font-bold text-slate-600 dark:text-slate-400 block mb-1">
              Pinyin (with tone marks):
            </label>
            <input
              type="text"
              value={pinyin}
              onChange={(e) => setPinyin(e.target.value)}
              placeholder="e.g. Wǒ xiǎng hē yī bēi nǎichá."
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-sans focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* English translation */}
          <div>
            <label className="font-bold text-slate-600 dark:text-slate-400 block mb-1">
              English Translation:
            </label>
            <input
              type="text"
              required
              value={english}
              onChange={(e) => setEnglish(e.target.value)}
              placeholder="e.g. I want to drink a cup of milk tea."
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition-transform active:scale-95"
            >
              Add to Spaced Repetition Deck
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
