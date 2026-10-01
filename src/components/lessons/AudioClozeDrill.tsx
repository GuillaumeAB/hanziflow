import React, { useState, useEffect } from 'react';
import { Exercise } from '../../types';
import { audioService } from '../../services/audioService';
import { AudioButton } from '../common/AudioButton';
import { InteractiveHanzi } from '../common/InteractiveHanzi';
import { TonePinyin } from '../common/TonePinyin';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

interface AudioClozeDrillProps {
  exercise: Exercise;
  onCorrect: () => void;
  onSelectCharacter: (char: string) => void;
}

export const AudioClozeDrill: React.FC<AudioClozeDrillProps> = ({
  exercise,
  onCorrect,
  onSelectCharacter
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);

    // Auto-play audio
    const timer = setTimeout(() => {
      audioService.speak(exercise.audioText, 1.0);
    }, 300);

    return () => clearTimeout(timer);
  }, [exercise]);

  const handleSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    audioService.playClickSound();

    const correct = option === exercise.correctAnswer;
    setIsCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      audioService.playSuccessSound();
    } else {
      audioService.playWrongSound();
    }
  };

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto space-y-6">
      {/* Audio & Prompt Card */}
      <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 w-full space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
          Listening Cloze Challenge
        </span>

        <AudioButton text={exercise.audioText} size="lg" includeSlow={true} />

        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 text-center">
          {exercise.promptQuestion}
        </p>

        {exercise.missingWordPinyin && (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <span>Sound cue:</span>
            <TonePinyin pinyin={exercise.missingWordPinyin} toneColors={true} />
          </div>
        )}
      </div>

      {/* Multiple Choice Options */}
      <div className="grid grid-cols-2 gap-3 w-full">
        {(exercise.options || []).map((opt, idx) => {
          const isSelected = selectedOption === opt;
          const isTargetAnswer = opt === exercise.correctAnswer;

          let btnClass = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-red-400 text-slate-800 dark:text-slate-100';

          if (isAnswered) {
            if (isTargetAnswer) {
              btnClass = 'bg-emerald-500 text-white border-emerald-600 shadow-md';
            } else if (isSelected && !isCorrect) {
              btnClass = 'bg-red-500 text-white border-red-600';
            } else {
              btnClass = 'opacity-40 bg-slate-100 dark:bg-slate-800 border-transparent text-slate-400';
            }
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={isAnswered}
              onClick={() => handleSelect(opt)}
              className={`p-5 rounded-2xl border-2 font-chinese font-bold text-2xl shadow-sm transition-all duration-150 flex items-center justify-center active:scale-95 ${btnClass}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* Answer feedback banner */}
      {isAnswered && (
        <div className="w-full space-y-4 animate-in fade-in duration-200">
          <div
            className={`p-4 rounded-2xl border flex items-start gap-3 ${
              isCorrect
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                : 'bg-red-50 dark:bg-red-950/30 border-red-300 dark:border-red-800'
            }`}
          >
            {isCorrect ? (
              <CheckCircle2 size={24} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <XCircle size={24} className="text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <div
                className={`font-bold text-sm ${
                  isCorrect ? 'text-emerald-800 dark:text-emerald-300' : 'text-red-800 dark:text-red-300'
                }`}
              >
                {isCorrect ? 'Well heard!' : 'Review the complete sentence:'}
              </div>

              <div className="text-lg font-chinese font-bold text-slate-900 dark:text-slate-100">
                <InteractiveHanzi
                  text={exercise.audioText}
                  onSelectCharacter={onSelectCharacter}
                  showClickHint={true}
                />
              </div>

              {exercise.pinyin && (
                <TonePinyin pinyin={exercise.pinyin} toneColors={true} className="text-xs text-slate-600" />
              )}

              {exercise.explanation && (
                <p className="text-xs text-slate-600 dark:text-slate-400 pt-1">
                  💡 {exercise.explanation}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onCorrect}
            className="w-full py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 font-bold text-base shadow-md flex items-center justify-center gap-2 transition-transform active:scale-[0.99]"
          >
            <span>Continue</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};
