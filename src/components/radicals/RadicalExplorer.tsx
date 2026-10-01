import React, { useState } from 'react';
import { RADICALS_DATA, RADICAL_CATEGORIES } from '../../data/radicals';
import { Radical } from '../../types';
import { AudioButton } from '../common/AudioButton';
import { Sparkles, Layers, Search, Filter } from 'lucide-react';

interface RadicalExplorerProps {
  onSelectCharacter: (char: string) => void;
}

export const RadicalExplorer: React.FC<RadicalExplorerProps> = ({ onSelectCharacter }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStroke, setSelectedStroke] = useState<number | 'all'>('all');

  const filteredRadicals = RADICALS_DATA.filter((r) => {
    const matchesCat = selectedCategory === 'all' || r.category === selectedCategory;
    const matchesStroke = selectedStroke === 'all' || r.strokeCount === selectedStroke;
    const matchesSearch =
      !searchQuery ||
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.char.includes(searchQuery) ||
      r.pinyin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.commonCharacters.some(ch => ch.includes(searchQuery));
    return matchesCat && matchesStroke && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold tracking-wider uppercase">
            <Sparkles size={14} />
            <span>214 Kangxi Radical Anatomy</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Radical & Component Matrix
          </h2>
          <p className="text-sm text-blue-100 leading-relaxed">
            Every Chinese character is constructed from fundamental semantic roots called radicals. Learn these core building blocks to instantly recognize character meanings and decompose complex Hanzi.
          </p>
        </div>

        <div className="absolute right-4 -bottom-8 text-9xl font-chinese font-bold text-white/10 select-none pointer-events-none">
          部
        </div>
      </div>

      {/* Search & Filters */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search box */}
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search radicals (e.g., water, person, 氵, kǒu, mind)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>

          {/* Stroke count filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedStroke('all')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedStroke === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
              }`}
            >
              All Strokes
            </button>
            {[2, 3, 4, 5, 7].map(s => (
              <button
                key={s}
                type="button"
                onClick={() => setSelectedStroke(s)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedStroke === s
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {s} strokes
              </button>
            ))}
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {RADICAL_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Radicals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRadicals.map((rad) => (
          <div
            key={rad.id}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow space-y-4"
          >
            {/* Top row */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 flex items-center justify-center text-3xl font-chinese font-bold text-blue-600 dark:text-blue-400 shadow-inner">
                  {rad.char}
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                    {rad.name}
                  </h3>
                  <div className="text-xs text-slate-500 font-sans">
                    {rad.pinyin}
                  </div>
                  {rad.originalChar && (
                    <div className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                      Variation of: <strong className="font-chinese text-sm">{rad.originalChar}</strong>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {rad.strokeCount} strokes
                </span>
                {rad.position && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    {rad.position}
                  </span>
                )}
              </div>
            </div>

            {/* Meaning */}
            <p className="text-xs text-slate-600 dark:text-slate-300">
              <strong className="text-slate-800 dark:text-slate-200">Semantic meaning: </strong>
              {rad.meaning}
            </p>

            {/* Common Characters Constructed with this Radical (Click to inspect!) */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                Common characters using "{rad.char}" (click to inspect):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {rad.commonCharacters.map((ch, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSelectCharacter(ch)}
                    title={`Inspect radical & anatomy of "${ch}"`}
                    className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-red-50 text-slate-800 hover:text-red-600 dark:bg-slate-800 dark:hover:bg-red-950/60 dark:text-slate-200 dark:hover:text-red-300 font-chinese font-bold text-base border border-slate-200 dark:border-slate-700 transition-colors shadow-xs"
                  >
                    {ch}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
