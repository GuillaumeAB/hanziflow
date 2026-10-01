import React, { useState } from 'react';
import { audioService } from '../../services/audioService';
import { AudioButton } from '../common/AudioButton';
import { TonePinyin } from '../common/TonePinyin';
import { Volume2, Sparkles, CheckCircle2, XCircle, RotateCcw, Zap } from 'lucide-react';

interface ToneDrillItem {
  char: string;
  pinyin: string;
  tone: 1 | 2 | 3 | 4;
  meaning: string;
  contrastGroup: { char: string; pinyin: string; tone: 1 | 2 | 3 | 4; meaning: string }[];
}

const TONE_DATA: ToneDrillItem[] = [
  {
    char: '妈', pinyin: 'mā', tone: 1, meaning: 'mother',
    contrastGroup: [
      { char: '妈', pinyin: 'mā', tone: 1, meaning: 'mother' },
      { char: '麻', pinyin: 'má', tone: 2, meaning: 'hemp / numb' },
      { char: '马', pinyin: 'mǎ', tone: 3, meaning: 'horse' },
      { char: '骂', pinyin: 'mà', tone: 4, meaning: 'to scold' }
    ]
  },
  {
    char: '汤', pinyin: 'tāng', tone: 1, meaning: 'soup',
    contrastGroup: [
      { char: '汤', pinyin: 'tāng', tone: 1, meaning: 'soup' },
      { char: '糖', pinyin: 'táng', tone: 2, meaning: 'candy / sugar' },
      { char: '躺', pinyin: 'tǎng', tone: 3, meaning: 'to lie down' },
      { char: '烫', pinyin: 'tàng', tone: 4, meaning: 'scalding hot' }
    ]
  },
  {
    char: '诗', pinyin: 'shī', tone: 1, meaning: 'poetry',
    contrastGroup: [
      { char: '诗', pinyin: 'shī', tone: 1, meaning: 'poetry' },
      { char: '十', pinyin: 'shí', tone: 2, meaning: 'ten' },
      { char: '史', pinyin: 'shǐ', tone: 3, meaning: 'history' },
      { char: '是', pinyin: 'shì', tone: 4, meaning: 'to be (is/are)' }
    ]
  },
  {
    char: '包', pinyin: 'bāo', tone: 1, meaning: 'bag / bun',
    contrastGroup: [
      { char: '包', pinyin: 'bāo', tone: 1, meaning: 'bag / bun' },
      { char: '雹', pinyin: 'báo', tone: 2, meaning: 'hail' },
      { char: '饱', pinyin: 'bǎo', tone: 3, meaning: 'full (eaten)' },
      { char: '报', pinyin: 'bào', tone: 4, meaning: 'report / newspaper' }
    ]
  }
];

export const ToneTrainer: React.FC = () => {
  const [currentGroupIdx, setCurrentGroupIdx] = useState(0);
  const [targetItem, setTargetItem] = useState<{ char: string; pinyin: string; tone: 1 | 2 | 3 | 4; meaning: string }>(
    TONE_DATA[0].contrastGroup[0]
  );
  const [selectedTone, setSelectedTone] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);

  const group = TONE_DATA[currentGroupIdx];

  const pickNewTarget = (groupIdx = currentGroupIdx) => {
    const activeGroup = TONE_DATA[groupIdx];
    const randomItem = activeGroup.contrastGroup[Math.floor(Math.random() * activeGroup.contrastGroup.length)];
    setTargetItem(randomItem);
    setSelectedTone(null);
    setFeedback(null);
    // Play audio
    setTimeout(() => {
      audioService.speak(randomItem.char, 1.0);
    }, 200);
  };

  const handleSelectTone = (tone: 1 | 2 | 3 | 4) => {
    if (feedback !== null) return;
    setSelectedTone(tone);

    if (tone === targetItem.tone) {
      audioService.playSuccessSound();
      setFeedback('correct');
      setScore(prev => prev + 10);
    } else {
      audioService.playWrongSound();
      setFeedback('wrong');
    }
  };

  const nextChallenge = () => {
    const nextGroup = (currentGroupIdx + 1) % TONE_DATA.length;
    setCurrentGroupIdx(nextGroup);
    pickNewTarget(nextGroup);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-700 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold tracking-wider uppercase">
            <Sparkles size={14} />
            <span>Tone Pitch Contour Ear Trainer</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Chinese Tones & Pitch Curves
          </h2>
          <p className="text-sm text-teal-100 max-w-xl leading-relaxed">
            The same syllable spoken with a different tone changes meaning completely! Master the 4 pitch contours through interactive listening contrast drills.
          </p>
        </div>

        <div className="absolute right-4 -bottom-6 text-9xl font-chinese font-bold text-white/10 select-none pointer-events-none">
          调
        </div>
      </div>

      {/* Tone Pitch Curves Reference Guide */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Tone 1 */}
        <div className="p-3.5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-blue-700 dark:text-blue-300">
            <span>1st Tone (55)</span>
            <span className="text-blue-500 font-sans">mā</span>
          </div>
          <svg className="w-full h-8" viewBox="0 0 100 40">
            <line x1="10" y1="10" x2="90" y2="10" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">High, level, sustained</div>
        </div>

        {/* Tone 2 */}
        <div className="p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-300">
            <span>2nd Tone (35)</span>
            <span className="text-emerald-500 font-sans">má</span>
          </div>
          <svg className="w-full h-8" viewBox="0 0 100 40">
            <line x1="15" y1="30" x2="85" y2="10" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">Rising (like asking "What?!")</div>
        </div>

        {/* Tone 3 */}
        <div className="p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-amber-700 dark:text-amber-300">
            <span>3rd Tone (214)</span>
            <span className="text-amber-500 font-sans">mǎ</span>
          </div>
          <svg className="w-full h-8" viewBox="0 0 100 40">
            <path d="M 15 20 Q 50 38 85 10" fill="none" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">Dipping down, then rising</div>
        </div>

        {/* Tone 4 */}
        <div className="p-3.5 rounded-2xl bg-red-50/80 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-red-700 dark:text-red-300">
            <span>4th Tone (51)</span>
            <span className="text-red-500 font-sans">mà</span>
          </div>
          <svg className="w-full h-8" viewBox="0 0 100 40">
            <line x1="15" y1="10" x2="85" y2="35" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">Sharp, decisive fall</div>
        </div>
      </div>

      {/* Ear-Training Interactive Drill Arena */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-md text-center">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Contrast Set: [{group.contrastGroup.map(g => g.char).join(' • ')}]
          </span>
          <span className="text-xs font-extrabold text-teal-600 dark:text-teal-400 flex items-center gap-1">
            <Zap size={14} className="fill-teal-500" />
            <span>{score} Score</span>
          </span>
        </div>

        {/* Audio Centerpiece */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest block">
            Listen Closely to the Tone Pitch
          </span>
          <div className="flex items-center justify-center gap-3">
            <AudioButton text={targetItem.char} size="lg" includeSlow={true} />
          </div>
          <p className="text-xs text-slate-400">
            Tap the speaker to replay. Which tone contour did you hear?
          </p>
        </div>

        {/* 4 Tone Select Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
          {([1, 2, 3, 4] as const).map((t) => {
            const isSelected = selectedTone === t;
            const isCorrect = t === targetItem.tone;

            let btnClass = 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700';

            if (feedback !== null) {
              if (isCorrect) {
                btnClass = 'bg-emerald-500 text-white border-emerald-600 shadow-md';
              } else if (isSelected && !isCorrect) {
                btnClass = 'bg-red-500 text-white border-red-600';
              } else {
                btnClass = 'opacity-40 bg-slate-100 dark:bg-slate-800 border-transparent text-slate-400';
              }
            }

            return (
              <button
                key={t}
                type="button"
                onClick={() => handleSelectTone(t)}
                disabled={feedback !== null}
                className={`p-4 rounded-2xl border-2 font-bold text-base transition-all active:scale-95 shadow-sm ${btnClass}`}
              >
                <div>Tone {t}</div>
                <div className="text-xs font-normal opacity-80 mt-0.5">
                  {t === 1 ? '55 (High)' : t === 2 ? '35 (Rising)' : t === 3 ? '214 (Dipping)' : '51 (Falling)'}
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback Banner */}
        {feedback !== null && (
          <div className="space-y-4 animate-in fade-in">
            <div className={`p-4 rounded-2xl border text-left flex items-start gap-3 ${
              feedback === 'correct'
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                : 'bg-red-50 dark:bg-red-950/30 border-red-300 dark:border-red-800'
            }`}>
              {feedback === 'correct' ? (
                <CheckCircle2 size={24} className="text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle size={24} className="text-red-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <div className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  {feedback === 'correct' ? 'Perfect ear!' : 'Tone breakdown:'}
                </div>
                <div className="text-lg font-chinese font-bold text-slate-900 dark:text-slate-100">
                  {targetItem.char} ({targetItem.pinyin}) — {targetItem.meaning}
                </div>
                <div className="text-xs text-slate-500">
                  Tone {targetItem.tone}: {targetItem.tone === 1 ? 'High flat' : targetItem.tone === 2 ? 'Rising' : targetItem.tone === 3 ? 'Low dipping' : 'Sharp falling'}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={nextChallenge}
              className="py-3 px-6 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-transform active:scale-95 inline-flex items-center gap-2"
            >
              <span>Next Tone Contrast</span>
            </button>
          </div>
        )}

        {/* Minimal Contrast Pairs Reference */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Compare all 4 tones in this family:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {group.contrastGroup.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => audioService.speak(item.char, 1.0)}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-teal-50 text-slate-800 hover:text-teal-700 dark:bg-slate-800 dark:hover:bg-teal-950/60 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-chinese font-bold text-base mr-1.5">{item.char}</span>
                  <span className="font-sans font-medium text-slate-500">{item.pinyin}</span>
                </div>
                <Volume2 size={14} className="text-slate-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
