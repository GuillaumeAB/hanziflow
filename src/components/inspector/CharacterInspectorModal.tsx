import React from 'react';
import { X, Star, Sparkles, Volume2, Info, BookOpen, Layers, ArrowRight } from 'lucide-react';
import { getCharacterDetail } from '../../data/characters';
import { RADICALS_DATA } from '../../data/radicals';
import { TonePinyin } from '../common/TonePinyin';
import { AudioButton } from '../common/AudioButton';
import { StrokeOrderPlayer } from './StrokeOrderPlayer';

interface CharacterInspectorModalProps {
  char: string | null;
  onClose: () => void;
  isStarred?: boolean;
  onToggleStar?: (char: string) => void;
  onSelectComponent?: (char: string) => void;
}

export const CharacterInspectorModal: React.FC<CharacterInspectorModalProps> = ({
  char,
  onClose,
  isStarred = false,
  onToggleStar,
  onSelectComponent
}) => {
  if (!char) return null;

  // Use the universal resolver that guarantees full radical explanation
  const detail = getCharacterDetail(char);

  // Find radical details from Kangxi dataset if available
  const radicalDetail = RADICALS_DATA.find(r => r.char === detail.radical || r.id === detail.radical);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wider uppercase bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">
              HSK {detail.hsk}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Radical & Anatomy Breakdown
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {onToggleStar && (
              <button
                type="button"
                onClick={() => onToggleStar(char)}
                title={isStarred ? 'Starred' : 'Star character'}
                className={`p-2 rounded-full transition-colors ${
                  isStarred
                    ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Star size={18} className={isStarred ? 'fill-amber-400' : ''} />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Top Banner: Stroke Player & Main Pronunciation */}
          <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-4 sm:p-5 border border-slate-100 dark:border-slate-800">
            {/* Interactive Calligraphy Stroke Writer */}
            <StrokeOrderPlayer char={detail.char} radical={detail.radical} size={150} />

            {/* Pronunciation & Definition */}
            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <TonePinyin pinyin={detail.pinyin} toneColors={true} className="text-3xl font-bold tracking-tight" />
                <AudioButton text={detail.char} size="sm" includeSlow={true} />
              </div>

              <div className="text-lg font-semibold text-slate-800 dark:text-slate-100 capitalize">
                {detail.english}
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-xs text-slate-500 dark:text-slate-400">
                <span className="px-2 py-1 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
                  {detail.strokeCount} strokes
                </span>
                <span className="px-2 py-1 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
                  Tone {detail.tone}
                </span>
                <span className="px-2 py-1 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 rounded-md border border-blue-200 dark:border-blue-900 font-semibold">
                  Radical: <strong className="font-chinese text-base ml-1">{detail.radical}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* ===================================================== */}
          {/* CROWN JEWEL: THE RADICAL SPOTLIGHT & ANATOMY FORMULA */}
          {/* ===================================================== */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              <Sparkles size={16} className="text-blue-500" />
              <span>Radical Spotlight & "Why This Radical?"</span>
            </div>

            {/* Visual Radical Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-blue-950/40 dark:to-indigo-950/20 border-2 border-blue-200 dark:border-blue-800 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border border-blue-300 dark:border-blue-700 flex items-center justify-center text-3xl font-chinese font-bold text-blue-600 dark:text-blue-400 shadow-sm">
                    {detail.radical}
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-blue-950 dark:text-blue-200">
                      {detail.radicalName || radicalDetail?.name || 'Primary Kangxi Radical'}
                    </h4>
                    <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">
                      Theme: {detail.radicalMeaning}
                    </p>
                    {radicalDetail?.originalChar && (
                      <span className="text-[11px] text-blue-600 dark:text-blue-400">
                        Derived from root: <strong className="font-chinese">{radicalDetail.originalChar}</strong>
                      </span>
                    )}
                  </div>
                </div>

                {radicalDetail?.position && (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-blue-200 dark:bg-blue-900 text-blue-900 dark:text-blue-200 font-bold capitalize">
                    {radicalDetail.position}
                  </span>
                )}
              </div>

              {/* The "Why This Radical?" Pedagogical Explanation */}
              {detail.whyRadical && (
                <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-blue-200/60 dark:border-blue-800/60 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-blue-800 dark:text-blue-300 uppercase tracking-wide">
                    <Info size={14} />
                    <span>Why is this radical used?</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {detail.whyRadical}
                  </p>
                </div>
              )}

              {/* Visual Formula Equation */}
              {detail.formula && (
                <div className="pt-2 border-t border-blue-200/60 dark:border-blue-800/60">
                  <span className="text-[11px] font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider block mb-2">
                    Character Assembly Formula:
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Radical Part */}
                    <div className="p-2 px-3 rounded-xl bg-blue-100 dark:bg-blue-900/60 border border-blue-300 dark:border-blue-700 text-center">
                      <div className="text-lg font-chinese font-bold text-blue-700 dark:text-blue-300">
                        {detail.formula.radical}
                      </div>
                      <div className="text-[10px] text-blue-800 dark:text-blue-300 font-semibold max-w-[100px] truncate">
                        {detail.formula.radicalRole}
                      </div>
                    </div>

                    <span className="text-base font-bold text-slate-400">+</span>

                    {/* Other Part */}
                    <div className="p-2 px-3 rounded-xl bg-amber-100 dark:bg-amber-900/60 border border-amber-300 dark:border-amber-700 text-center">
                      <div className="text-lg font-chinese font-bold text-amber-700 dark:text-amber-300">
                        {detail.formula.phoneticOrOther}
                      </div>
                      <div className="text-[10px] text-amber-800 dark:text-amber-300 font-semibold max-w-[100px] truncate">
                        {detail.formula.phoneticRole}
                      </div>
                    </div>

                    <ArrowRight size={16} className="text-slate-400" />

                    {/* Result */}
                    <div className="p-2 px-3.5 rounded-xl bg-red-100 dark:bg-red-950 border border-red-300 dark:border-red-800 text-center">
                      <div className="text-xl font-chinese font-extrabold text-red-600 dark:text-red-400">
                        {detail.char}
                      </div>
                      <div className="text-[10px] text-red-700 dark:text-red-300 font-bold">
                        {detail.pinyin}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Clickable Sub-components Matrix */}
            {detail.components && detail.components.length > 0 && (
              <div className="space-y-2 pt-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Clickable Sub-Components (Tap to inspect):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {detail.components.map((comp, idx) => (
                    <div
                      key={idx}
                      onClick={() => onSelectComponent && onSelectComponent(comp.char)}
                      className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-red-400 dark:hover:border-red-500 cursor-pointer transition-all duration-150 group shadow-sm"
                    >
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="text-2xl font-chinese font-bold text-slate-800 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                          {comp.char}
                        </span>
                        {comp.role && (
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                            comp.role === 'semantic'
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                              : comp.role === 'phonetic'
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                              : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                          }`}>
                            {comp.role}
                          </span>
                        )}
                      </div>
                      {comp.pinyin && (
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                          {comp.pinyin}
                        </div>
                      )}
                      <div className="text-xs font-medium text-slate-700 dark:text-slate-300 capitalize truncate">
                        {comp.meaning}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section: Etymology & Mnemonic Story */}
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
              <Info size={14} />
              <span>Etymology & Memory Hook</span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {detail.etymology}
            </p>
            {detail.mnemonic && (
              <p className="text-xs font-medium text-amber-800 dark:text-amber-400 italic pt-1 border-t border-amber-200/60 dark:border-amber-900/40">
                💡 Mnemonic: {detail.mnemonic}
              </p>
            )}
          </div>

          {/* Section: Common Vocabulary */}
          {detail.exampleWords && detail.exampleWords.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                <BookOpen size={16} className="text-red-500" />
                <span>Common Words with "{detail.char}"</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {detail.exampleWords.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700"
                  >
                    <div>
                      <div className="text-lg font-chinese font-bold text-slate-900 dark:text-slate-100">
                        {item.word}
                      </div>
                      <div className="text-xs text-slate-500 font-sans">
                        {item.pinyin}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400 truncate max-w-[120px]">
                        {item.english}
                      </div>
                    </div>
                    <AudioButton text={item.word} size="sm" includeSlow={false} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Spoken Sentences */}
          {detail.exampleSentences && detail.exampleSentences.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                <Volume2 size={16} className="text-red-500" />
                <span>Spoken Examples in Context</span>
              </div>
              <div className="space-y-2">
                {detail.exampleSentences.map((sent, idx) => (
                  <div
                    key={idx}
                    className="flex items-start justify-between gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700"
                  >
                    <div className="space-y-1">
                      <div className="text-base font-chinese font-semibold text-slate-900 dark:text-slate-100">
                        {sent.cn}
                      </div>
                      <TonePinyin pinyin={sent.pinyin} toneColors={true} className="text-xs font-sans text-slate-500" />
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        {sent.en}
                      </div>
                    </div>
                    <AudioButton text={sent.cn} size="sm" includeSlow={true} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
