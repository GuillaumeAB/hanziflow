import React, { useState, useEffect } from 'react';
import { Exercise } from '../../types';
import { audioService } from '../../services/audioService';
import { AudioButton } from '../common/AudioButton';
import { InteractiveHanzi } from '../common/InteractiveHanzi';
import { TonePinyin } from '../common/TonePinyin';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface SentenceReorderDrillProps {
  exercise: Exercise;
  onCorrect: () => void;
  onSelectCharacter: (char: string) => void;
  showPinyinPreference?: boolean;
}

export const SentenceReorderDrill: React.FC<SentenceReorderDrillProps> = ({
  exercise,
  onCorrect,
  onSelectCharacter,
  showPinyinPreference = true
}) => {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    // Reset state for new exercise
    setSelectedWords([]);
    setIsAnswered(false);
    setIsCorrect(false);

    if (exercise.scrambledWords) {
      setAvailableWords([...exercise.scrambledWords]);
    }

    // Auto-play spoken audio at the start of exercise
    const timer = setTimeout(() => {
      audioService.speak(exercise.audioText, 1.0);
    }, 300);

    return () => clearTimeout(timer);
  }, [exercise]);

  const handleSelectWord = (word: string, index: number) => {
    if (isAnswered) return;
    audioService.playClickSound();
    setSelectedWords(prev => [...prev, word]);
    setAvailableWords(prev => prev.filter((_, i) => i !== index));
  };

  const handleDeselectWord = (word: string, index: number) => {
    if (isAnswered) return;
    audioService.playClickSound();
    setAvailableWords(prev => [...prev, word]);
    setSelectedWords(prev => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    if (isAnswered) return;
    if (exercise.scrambledWords) {
      setAvailableWords([...exercise.scrambledWords]);
      setSelectedWords([]);
    }
  };

  const handleCheck = () => {
    const fullSelected = selectedWords.join('');
    const fullTarget = (exercise.correctOrder || []).join('');

    const correct = fullSelected === fullTarget;
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
      {/* Audio Play Centerpiece */}
      <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 w-full space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
          Listen to Native Audio
        </span>

        <div className="flex items-center gap-3">
          <AudioButton text={exercise.audioText} size="lg" includeSlow={true} />
        </div>

        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 text-center pt-1">
          {exercise.promptQuestion}
        </p>

        {exercise.english && (
          <p className="text-xs text-slate-500 dark:text-slate-400 italic">
            "{exercise.english}"
          </p>
        )}
      </div>

      {/* Target Construction Area */}
      <div className="w-full min-h-[72px] p-3 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 flex flex-wrap items-center gap-2">
        {selectedWords.length === 0 ? (
          <span className="text-sm text-slate-400 dark:text-slate-500 mx-auto select-none">
            Tap the word tiles below in the spoken order
          </span>
        ) : (
          selectedWords.map((word, idx) => (
            <button
              key={idx}
              type="button"
              disabled={isAnswered}
              onClick={() => handleDeselectWord(word, idx)}
              className={`px-4 py-2.5 rounded-xl font-chinese font-bold text-lg shadow-sm border transition-all duration-150 animate-in zoom-in-95 ${
                isAnswered
                  ? isCorrect
                    ? 'bg-emerald-500 text-white border-emerald-600'
                    : 'bg-red-500 text-white border-red-600'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-300 dark:border-slate-700 hover:border-red-400 active:scale-95'
              }`}
            >
              {word}
            </button>
          ))
        )}
      </div>

      {/* Scrambled Word Tile Bank */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 w-full min-h-[60px]">
        {availableWords.map((word, idx) => (
          <button
            key={idx}
            type="button"
            disabled={isAnswered}
            onClick={() => handleSelectWord(word, idx)}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-chinese font-bold text-lg border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-150 active:scale-95"
          >
            {word}
          </button>
        ))}
      </div>

      {/* Actions & Result Banner */}
      {!isAnswered ? (
        <div className="flex items-center gap-3 w-full">
          <button
            type="button"
            onClick={handleReset}
            disabled={selectedWords.length === 0}
            className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 transition-colors disabled:opacity-40"
            title="Reset tiles"
          >
            <RotateCcw size={18} />
          </button>

          <button
            type="button"
            onClick={handleCheck}
            disabled={selectedWords.length === 0}
            className="flex-1 py-3 px-6 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-base shadow-md hover:shadow-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Check Spoken Order
          </button>
        </div>
      ) : (
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
                {isCorrect ? 'Excellent! Perfect oral reconstruction.' : 'Not quite right. Correct order:'}
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
