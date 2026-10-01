import React, { useState } from 'react';
import { LESSONS_DATA } from '../../data/lessons';
import { LessonUnit, HSKLevel } from '../../types';
import { InteractiveHanzi } from '../common/InteractiveHanzi';
import { Play, CheckCircle2, Zap, Sparkles, BookOpen, Layers } from 'lucide-react';

interface LessonListViewProps {
  completedLessonIds: string[];
  onStartLesson: (lesson: LessonUnit) => void;
  onSelectCharacter: (char: string) => void;
}

export const LessonListView: React.FC<LessonListViewProps> = ({
  completedLessonIds,
  onStartLesson,
  onSelectCharacter
}) => {
  const [selectedHsk, setSelectedHsk] = useState<HSKLevel | 'all'>('all');

  const filteredLessons = LESSONS_DATA.filter(lesson =>
    selectedHsk === 'all' ? true : lesson.hsk === selectedHsk
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold tracking-wider uppercase">
            <Sparkles size={14} />
            <span>HelloChinese-Style Skill Tree</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Oral Sentences & Listening Path
          </h2>
          <p className="text-sm text-red-100 leading-relaxed">
            Progressive listening drills without stressful speaking exercises. Tap characters to inspect their radical anatomy and build natural conversational fluency across HSK 1–5.
          </p>
        </div>

        {/* Decorative background Hanzi art */}
        <div className="absolute right-4 -bottom-6 text-9xl font-chinese font-bold text-white/10 select-none pointer-events-none">
          学
        </div>
      </div>

      {/* HSK Level Pill Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          type="button"
          onClick={() => setSelectedHsk('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
            selectedHsk === 'all'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
          }`}
        >
          All HSK Levels
        </button>

        {([1, 2, 3, 4, 5] as HSKLevel[]).map(lvl => (
          <button
            key={lvl}
            type="button"
            onClick={() => setSelectedHsk(lvl)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              selectedHsk === lvl
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            HSK {lvl}
          </button>
        ))}
      </div>

      {/* Lessons List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredLessons.map((lesson) => {
          const isCompleted = completedLessonIds.includes(lesson.id);

          return (
            <div
              key={lesson.id}
              className={`rounded-3xl p-5 border transition-all duration-200 flex flex-col justify-between group ${
                isCompleted
                  ? 'bg-white dark:bg-slate-900 border-emerald-200 dark:border-emerald-900/60 shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-red-300 dark:hover:border-red-900 shadow-md hover:shadow-lg'
              }`}
            >
              <div className="space-y-3">
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">
                      HSK {lesson.hsk}
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      Unit {lesson.unitNumber}
                    </span>
                  </div>

                  {isCompleted ? (
                    <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 size={16} />
                      <span>Completed</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                      <Zap size={14} className="fill-amber-500" />
                      <span>+{lesson.xp} XP</span>
                    </div>
                  )}
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                    {lesson.description}
                  </p>
                </div>

                {/* Characters Introduced in this Unit (Interactive!) */}
                {lesson.charactersIntroduced && lesson.charactersIntroduced.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                      Characters introduced (click to inspect):
                    </span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {lesson.charactersIntroduced.map((ch, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => onSelectCharacter(ch)}
                          title={`Inspect radical & anatomy of "${ch}"`}
                          className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-red-100 text-slate-800 hover:text-red-600 dark:bg-slate-800 dark:hover:bg-red-950 dark:text-slate-200 dark:hover:text-red-300 font-chinese font-bold text-base border border-slate-200 dark:border-slate-700 transition-colors"
                        >
                          {ch}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-5 mt-auto">
                <button
                  type="button"
                  onClick={() => onStartLesson(lesson)}
                  className={`w-full py-2.5 px-4 rounded-2xl font-bold text-sm shadow-sm transition-transform active:scale-95 flex items-center justify-center gap-2 ${
                    isCompleted
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300'
                      : 'bg-red-600 hover:bg-red-700 text-white shadow-md'
                  }`}
                >
                  <Play size={16} className="fill-current" />
                  <span>{isCompleted ? 'Practice Again' : 'Start Lesson'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
