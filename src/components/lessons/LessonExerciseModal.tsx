import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { LessonUnit } from '../../types';
import { SentenceReorderDrill } from './SentenceReorderDrill';
import { AudioClozeDrill } from './AudioClozeDrill';
import { ListeningMatchDrill } from './ListeningMatchDrill';
import { audioService } from '../../services/audioService';
import { X, Award, Zap, CheckCircle2 } from 'lucide-react';

interface LessonExerciseModalProps {
  lesson: LessonUnit;
  onClose: () => void;
  onComplete: (xpEarned: number) => void;
  onSelectCharacter: (char: string) => void;
}

export const LessonExerciseModal: React.FC<LessonExerciseModalProps> = ({
  lesson,
  onClose,
  onComplete,
  onSelectCharacter
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const totalExercises = lesson.exercises.length;
  const currentExercise = lesson.exercises[currentIndex];

  const handleNext = () => {
    if (currentIndex + 1 < totalExercises) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Completed all exercises!
      setIsFinished(true);
      audioService.playCompleteFanfare();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      onComplete(lesson.xp);
    }
  };

  const progressPercent = Math.round(((currentIndex) / totalExercises) * 100);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col">
        {/* Header with progress */}
        <div className="sticky top-0 z-20 px-6 py-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>

          {/* Progress Bar */}
          <div className="flex-1 max-w-md">
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200/60 dark:border-slate-700/60">
              <div
                className="bg-gradient-to-r from-red-500 to-amber-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${isFinished ? 100 : progressPercent}%` }}
              />
            </div>
          </div>

          {/* XP Badge */}
          <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold text-xs bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-800">
            <Zap size={14} className="fill-amber-500 text-amber-500" />
            <span>+{lesson.xp} XP</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 flex flex-col justify-center">
          {!isFinished ? (
            <div>
              <div className="text-center mb-6">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Unit {lesson.unitNumber} • HSK {lesson.hsk}
                </span>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-1">
                  {lesson.title}
                </h3>
              </div>

              {currentExercise.type === 'sentence_reorder' && (
                <SentenceReorderDrill
                  exercise={currentExercise}
                  onCorrect={handleNext}
                  onSelectCharacter={onSelectCharacter}
                />
              )}

              {currentExercise.type === 'audio_cloze' && (
                <AudioClozeDrill
                  exercise={currentExercise}
                  onCorrect={handleNext}
                  onSelectCharacter={onSelectCharacter}
                />
              )}

              {currentExercise.type === 'listening_match' && (
                <ListeningMatchDrill
                  exercise={currentExercise}
                  onCorrect={handleNext}
                  onSelectCharacter={onSelectCharacter}
                />
              )}
            </div>
          ) : (
            <div className="text-center py-8 space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 shadow-lg">
                <Award size={44} />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Unit Complete!
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                  You conquered <span className="font-semibold text-slate-900 dark:text-slate-200">"{lesson.title}"</span> oral sentence drills.
                </p>
              </div>

              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 font-bold">
                <Zap size={20} className="fill-amber-500 text-amber-500" />
                <span>Earned +{lesson.xp} XP</span>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full max-w-xs py-3.5 px-6 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-base shadow-lg transition-transform active:scale-95"
                >
                  Return to Path
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
