import React, { useState } from 'react';
import { ORAL_SENTENCES_DATA } from '../../data/sentences';
import { OralSentence, HSKLevel } from '../../types';
import { TonePinyin } from '../common/TonePinyin';
import { AudioButton } from '../common/AudioButton';
import { InteractiveHanzi } from '../common/InteractiveHanzi';
import { audioService } from '../../services/audioService';
import { Headphones, Search, Sparkles, Play, Pause, Bookmark, Info, Volume2 } from 'lucide-react';

interface OralSentencesViewProps {
  onSelectCharacter: (char: string) => void;
  showPinyin: boolean;
  toneColors: boolean;
}

export const OralSentencesView: React.FC<OralSentencesViewProps> = ({
  onSelectCharacter,
  showPinyin,
  toneColors
}) => {
  const [selectedHsk, setSelectedHsk] = useState<HSKLevel | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(null);

  const filteredSentences = ORAL_SENTENCES_DATA.filter(s => {
    const matchesHsk = selectedHsk === 'all' || s.hsk === selectedHsk;
    const matchesSearch =
      !searchQuery ||
      s.cn.includes(searchQuery) ||
      s.pinyin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesHsk && matchesSearch;
  });

  // Continuous auto-play loop for listening immersion
  const handlePlayAll = async () => {
    if (isPlayingAll) {
      setIsPlayingAll(false);
      audioService.stop();
      setCurrentPlayingIndex(null);
      return;
    }

    setIsPlayingAll(true);
    for (let i = 0; i < filteredSentences.length; i++) {
      if (!isPlayingAll && i > 0) break;
      setCurrentPlayingIndex(i);
      await audioService.speak(filteredSentences[i].cn, 1.0);
      // Brief pause between sentences
      await new Promise(r => setTimeout(r, 1200));
    }
    setIsPlayingAll(false);
    setCurrentPlayingIndex(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-lg">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold tracking-wider uppercase">
              <Headphones size={14} />
              <span>Oral Conversational Chinese</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Spoken Sentences Audio Hub
            </h2>
            <p className="text-sm text-emerald-100 leading-relaxed">
              Listen to authentic, everyday spoken Chinese across HSK 1–5. Click any character to inspect its radicals and components, or use Continuous Play for immersive listening.
            </p>
          </div>

          <button
            type="button"
            onClick={handlePlayAll}
            className={`px-5 py-3 rounded-2xl font-bold text-sm shadow-lg flex items-center gap-2 transition-transform active:scale-95 shrink-0 ${
              isPlayingAll
                ? 'bg-amber-400 text-slate-900 animate-pulse'
                : 'bg-white text-emerald-800 hover:bg-emerald-50'
            }`}
          >
            {isPlayingAll ? <Pause size={18} /> : <Play size={18} className="fill-current" />}
            <span>{isPlayingAll ? 'Stop Immersion' : 'Listen to All'}</span>
          </button>
        </div>

        <div className="absolute right-4 -bottom-6 text-9xl font-chinese font-bold text-white/10 select-none pointer-events-none">
          说
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sentences by Chinese, Pinyin, English, or topic..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          />
        </div>

        {/* HSK filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedHsk('all')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedHsk === 'all'
                ? 'bg-emerald-600 text-white'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
            }`}
          >
            All HSK
          </button>
          {([1, 2, 3, 4, 5] as HSKLevel[]).map(lvl => (
            <button
              key={lvl}
              type="button"
              onClick={() => setSelectedHsk(lvl)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedHsk === lvl
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
              }`}
            >
              HSK {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Sentences List */}
      <div className="space-y-4">
        {filteredSentences.map((sentence, idx) => {
          const isCurrentlyPlaying = currentPlayingIndex === idx;

          return (
            <div
              key={sentence.id}
              className={`p-5 rounded-3xl bg-white dark:bg-slate-900 border transition-all duration-200 space-y-3 ${
                isCurrentlyPlaying
                  ? 'ring-2 ring-emerald-500 border-transparent shadow-lg bg-emerald-50/20 dark:bg-emerald-950/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-800 shadow-sm'
              }`}
            >
              {/* Header row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    HSK {sentence.hsk}
                  </span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {sentence.topic}
                  </span>
                </div>

                <AudioButton text={sentence.cn} size="sm" includeSlow={true} />
              </div>

              {/* Chinese sentence with clickable character inspector */}
              <div className="text-xl sm:text-2xl font-chinese font-bold text-slate-900 dark:text-slate-100 tracking-wide leading-relaxed">
                <InteractiveHanzi
                  text={sentence.cn}
                  onSelectCharacter={onSelectCharacter}
                  showClickHint={true}
                />
              </div>

              {/* Pinyin */}
              {showPinyin && (
                <TonePinyin
                  pinyin={sentence.pinyin}
                  toneColors={toneColors}
                  className="text-sm font-semibold"
                />
              )}

              {/* English Meaning */}
              <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                {sentence.en}
              </p>

              {/* Word Breakdown Badges */}
              {sentence.words && sentence.words.length > 0 && (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1.5 items-center">
                  <span className="text-[11px] font-semibold text-slate-400 mr-1">
                    Words:
                  </span>
                  {sentence.words.filter(w => w.word.trim() && !/^[，。！？、]$/.test(w.word)).map((w, wIdx) => (
                    <button
                      key={wIdx}
                      type="button"
                      onClick={() => audioService.speak(w.word, 1.0)}
                      title={`"${w.word}" (${w.pinyin}): ${w.en} - Click to listen`}
                      className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 dark:bg-slate-800 dark:hover:bg-emerald-950/60 dark:text-slate-300 dark:hover:text-emerald-300 text-xs font-chinese font-medium border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1"
                    >
                      <span>{w.word}</span>
                      <span className="text-[10px] text-slate-400 font-sans">{w.pinyin}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Spoken Grammar Note */}
              {sentence.grammarNote && (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                  <Info size={14} className="shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                  <span>{sentence.grammarNote}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
