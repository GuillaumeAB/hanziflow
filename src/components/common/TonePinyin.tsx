import React from 'react';

interface TonePinyinProps {
  pinyin: string;
  toneColors?: boolean;
  className?: string;
}

// Tone vowel character mapping
const TONE_1_VOWELS = ['ā', 'ē', 'ī', 'ō', 'ū', 'ǖ', 'Ā', 'Ē', 'Ī', 'Ō', 'Ū', 'Ǖ'];
const TONE_2_VOWELS = ['á', 'é', 'í', 'ó', 'ú', 'ǘ', 'Á', 'É', 'Í', 'Ó', 'Ú', 'Ǘ'];
const TONE_3_VOWELS = ['ǎ', 'ě', 'ǐ', 'ǒ', 'ǔ', 'ǚ', 'Ǎ', 'Ě', 'Ǐ', 'Ǒ', 'Ǔ', 'Ǚ'];
const TONE_4_VOWELS = ['à', 'è', 'ì', 'ò', 'ù', 'ǜ', 'À', 'È', 'Ì', 'Ò', 'Ù', 'Ǜ'];

export const TonePinyin: React.FC<TonePinyinProps> = ({ pinyin, toneColors = true, className = '' }) => {
  if (!pinyin) return null;

  // Split into syllables/words while preserving spaces and punctuation
  const words = pinyin.split(/(\s+|[.,!?:;，。！？])/g);

  return (
    <span className={`inline-flex flex-wrap items-center gap-1 font-sans ${className}`}>
      {words.map((word, idx) => {
        if (!word.trim() || /^[.,!?:;，。！？]$/.test(word)) {
          return <span key={idx} className="text-slate-400">{word}</span>;
        }

        let toneColorClass = 'text-slate-600 dark:text-slate-300';
        if (toneColors) {
          if (TONE_1_VOWELS.some(v => word.includes(v))) {
            toneColorClass = 'text-blue-500 dark:text-blue-400 font-medium';
          } else if (TONE_2_VOWELS.some(v => word.includes(v))) {
            toneColorClass = 'text-emerald-500 dark:text-emerald-400 font-medium';
          } else if (TONE_3_VOWELS.some(v => word.includes(v))) {
            toneColorClass = 'text-amber-500 dark:text-amber-400 font-medium';
          } else if (TONE_4_VOWELS.some(v => word.includes(v))) {
            toneColorClass = 'text-red-500 dark:text-red-400 font-medium';
          } else {
            toneColorClass = 'text-slate-500 dark:text-slate-400';
          }
        }

        return (
          <span key={idx} className={toneColorClass}>
            {word}
          </span>
        );
      })}
    </span>
  );
};
