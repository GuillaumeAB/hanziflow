import React from 'react';
import { Flame, Zap, Moon, Sun, Type, Palette } from 'lucide-react';
import { UserProgress } from '../../types';

interface HeaderProps {
  progress: UserProgress;
  onUpdateSettings: (newSettings: Partial<UserProgress['settings']>) => void;
}

export const Header: React.FC<HeaderProps> = ({ progress, onUpdateSettings }) => {
  const { settings } = progress;

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-3 flex items-center justify-between">
      {/* Brand Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-red-500/20">
          <span className="font-chinese font-black text-xl">字</span>
        </div>
        <div>
          <h1 className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
            <span>HanziFlow</span>
            <span className="font-chinese text-red-600 dark:text-red-400 font-bold text-base">汉流</span>
          </h1>
          <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
            HelloChinese + Anki SRS • HSK 1–5
          </p>
        </div>
      </div>

      {/* Gamification Counters & Quick Controls */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Streak Counter */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 font-extrabold text-xs sm:text-sm shadow-xs">
          <Flame size={16} className="fill-amber-500 text-amber-500" />
          <span>{progress.streak} <span className="hidden sm:inline font-semibold">Days</span></span>
        </div>

        {/* XP Counter */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 font-extrabold text-xs sm:text-sm shadow-xs">
          <Zap size={16} className="fill-rose-500 text-rose-500" />
          <span>{progress.xp} <span className="hidden sm:inline font-semibold">XP</span></span>
        </div>

        {/* Settings divider */}
        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />

        {/* Pinyin toggle */}
        <button
          type="button"
          onClick={() => onUpdateSettings({ showPinyin: !settings.showPinyin })}
          title={settings.showPinyin ? 'Hide Pinyin' : 'Show Pinyin'}
          className={`p-2 rounded-xl border transition-colors ${
            settings.showPinyin
              ? 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100'
              : 'bg-transparent border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Type size={18} />
        </button>

        {/* Tone Colors toggle */}
        <button
          type="button"
          onClick={() => onUpdateSettings({ toneColors: !settings.toneColors })}
          title={settings.toneColors ? 'Disable Tone Colors' : 'Enable Tone Colors'}
          className={`p-2 rounded-xl border transition-colors ${
            settings.toneColors
              ? 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-red-500'
              : 'bg-transparent border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Palette size={18} />
        </button>

        {/* Dark Mode toggle */}
        <button
          type="button"
          onClick={() => onUpdateSettings({ darkMode: !settings.darkMode })}
          title={settings.darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {settings.darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
};
