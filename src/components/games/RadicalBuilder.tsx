import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { RadicalPuzzleItem } from '../../types';
import { audioService } from '../../services/audioService';
import { AudioButton } from '../common/AudioButton';
import { TonePinyin } from '../common/TonePinyin';
import { Sparkles, ArrowRight, RotateCcw, CheckCircle2, Award, Zap, Puzzle } from 'lucide-react';

const PUZZLE_LEVELS: RadicalPuzzleItem[] = [
  {
    id: 'puz-1',
    targetChar: '语',
    pinyin: 'yǔ',
    english: 'spoken language / words',
    hsk: 1,
    radical: '讠',
    radicalMeaning: 'Speech & Spoken Words',
    phoneticOrBody: '吾',
    phoneticMeaning: 'wú (Self / Five Mouths)',
    distractorRadicals: ['氵', '忄', '扌'],
    distractorBodies: ['子', '相', '反'],
    explanation: 'Speech radical 讠 denotes spoken language, while 吾 (wú) gives sound structure.'
  },
  {
    id: 'puz-2',
    targetChar: '好',
    pinyin: 'hǎo',
    english: 'good / well / harmonious',
    hsk: 1,
    radical: '女',
    radicalMeaning: 'Woman / Mother',
    phoneticOrBody: '子',
    phoneticMeaning: 'Child / Newborn',
    distractorRadicals: ['讠', '氵', '门'],
    distractorBodies: ['口', '吾', '斤'],
    explanation: 'Mother 女 holding her child 子 represents ultimate goodness and harmony.'
  },
  {
    id: 'puz-3',
    targetChar: '想',
    pinyin: 'xiǎng',
    english: 'to think / to miss / to want',
    hsk: 1,
    radical: '心',
    radicalMeaning: 'Heart / Mind / Yearning',
    phoneticOrBody: '相',
    phoneticMeaning: 'xiāng (Appearance / Tree + Eye)',
    distractorRadicals: ['扌', '讠', '氵'],
    distractorBodies: ['董', '吾', '子'],
    explanation: 'Holding the image 相 in your emotional heart 心 means to contemplate and miss someone.'
  },
  {
    id: 'puz-4',
    targetChar: '懂',
    pinyin: 'dǒng',
    english: 'to understand / comprehend',
    hsk: 2,
    radical: '忄',
    radicalMeaning: 'Vertical Heart (Mental Insight)',
    phoneticOrBody: '董',
    phoneticMeaning: 'dǒng (Supervise / Heavy)',
    distractorRadicals: ['氵', '女', '扌'],
    distractorBodies: ['相', '反', '乞'],
    explanation: 'Understanding occurs when the mental heart 忄 grasps the concept.'
  },
  {
    id: 'puz-5',
    targetChar: '问',
    pinyin: 'wèn',
    english: 'to ask / to inquire',
    hsk: 2,
    radical: '门',
    radicalMeaning: 'Door / Gate Enclosure',
    phoneticOrBody: '口',
    phoneticMeaning: 'kǒu (Mouth)',
    distractorRadicals: ['女', '心', '讠'],
    distractorBodies: ['子', '吾', '斤'],
    explanation: 'Putting your mouth 口 at the door 门 to inquire who is inside.'
  },
  {
    id: 'puz-6',
    targetChar: '钱',
    pinyin: 'qián',
    english: 'money / currency / coins',
    hsk: 2,
    radical: '钅',
    radicalMeaning: 'Metal / Gold / Coins',
    phoneticOrBody: '戋',
    phoneticMeaning: 'jiān (Small / Stacked)',
    distractorRadicals: ['氵', '忄', '讠'],
    distractorBodies: ['反', '相', '吾'],
    explanation: 'Metallic 钅 discs stacked together form traditional Chinese coins.'
  },
  {
    id: 'puz-7',
    targetChar: '渴',
    pinyin: 'kě',
    english: 'thirsty / yearning for water',
    hsk: 3,
    radical: '氵',
    radicalMeaning: 'Three Dots of Water',
    phoneticOrBody: '曷',
    phoneticMeaning: 'hé (Intense Desire / Sound base)',
    distractorRadicals: ['讠', '忄', '女'],
    distractorBodies: ['董', '子', '相'],
    explanation: 'Thirst is the physiological craving for water 氵.'
  }
];

interface RadicalBuilderProps {
  onAddXP: (xp: number) => void;
  onSelectCharacter: (char: string) => void;
}

export const RadicalBuilder: React.FC<RadicalBuilderProps> = ({ onAddXP, onSelectCharacter }) => {
  const [levelIndex, setLevelIndex] = useState(0);
  const [selectedRadical, setSelectedRadical] = useState<string | null>(null);
  const [selectedBody, setSelectedBody] = useState<string | null>(null);
  const [isAssembled, setIsAssembled] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [allFinished, setAllFinished] = useState(false);

  const currentLevel = PUZZLE_LEVELS[levelIndex];

  // Combine and shuffle available options
  const radicalOptions = [currentLevel.radical, ...currentLevel.distractorRadicals].sort();
  const bodyOptions = [currentLevel.phoneticOrBody, ...currentLevel.distractorBodies].sort();

  const handleSelectRadical = (rad: string) => {
    if (isAssembled) return;
    audioService.playClickSound();
    setSelectedRadical(rad);
    checkAssembly(rad, selectedBody);
  };

  const handleSelectBody = (body: string) => {
    if (isAssembled) return;
    audioService.playClickSound();
    setSelectedBody(body);
    checkAssembly(selectedRadical, body);
  };

  const checkAssembly = (rad: string | null, body: string | null) => {
    if (!rad || !body) return;

    if (rad === currentLevel.radical && body === currentLevel.phoneticOrBody) {
      setIsSuccess(true);
      setIsAssembled(true);
      audioService.playSuccessSound();
      onAddXP(20);
    } else {
      setIsSuccess(false);
      setIsAssembled(true);
      audioService.playWrongSound();
    }
  };

  const handleNextLevel = () => {
    if (levelIndex + 1 < PUZZLE_LEVELS.length) {
      setLevelIndex(prev => prev + 1);
      setSelectedRadical(null);
      setSelectedBody(null);
      setIsAssembled(false);
      setIsSuccess(false);
    } else {
      setAllFinished(true);
      audioService.playCompleteFanfare();
      confetti({ particleCount: 90, spread: 80 });
    }
  };

  const handleRetry = () => {
    setSelectedRadical(null);
    setSelectedBody(null);
    setIsAssembled(false);
    setIsSuccess(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold tracking-wider uppercase">
            <Puzzle size={14} />
            <span>Hanzi Anatomy Puzzle Game</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Radical Builder Lab
          </h2>
          <p className="text-sm text-purple-100 max-w-lg leading-relaxed">
            Construct Chinese characters like lego! Combine the correct semantic radical with the phonetic body to understand how Hanzi are born.
          </p>
        </div>

        <div className="absolute right-4 -bottom-6 text-9xl font-chinese font-bold text-white/10 select-none pointer-events-none">
          构
        </div>
      </div>

      {!allFinished ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-md">
          {/* Header & Target Cue */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Puzzle {levelIndex + 1} of {PUZZLE_LEVELS.length} • HSK {currentLevel.hsk}
            </span>
            <span className="text-xs font-bold text-amber-500 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-800 flex items-center gap-1">
              <Zap size={14} className="fill-amber-500" />
              <span>+20 XP</span>
            </span>
          </div>

          {/* Goal prompt */}
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
              Forge This Character
            </span>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 capitalize">
              "{currentLevel.english}"
            </div>
            <div className="flex items-center justify-center gap-2">
              <TonePinyin pinyin={currentLevel.pinyin} toneColors={true} className="text-lg font-bold" />
              <AudioButton text={currentLevel.targetChar} size="sm" includeSlow={false} />
            </div>
          </div>

          {/* Assembly Workspace */}
          <div className="flex items-center justify-center gap-3 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border-2 border-dashed border-slate-300 dark:border-slate-700 min-h-[120px]">
            {/* Radical Slot */}
            <div className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center border-2 transition-all ${
              selectedRadical
                ? 'bg-blue-500 text-white border-blue-600 shadow-md scale-105'
                : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400'
            }`}>
              {selectedRadical ? (
                <span className="text-3xl font-chinese font-bold">{selectedRadical}</span>
              ) : (
                <span className="text-[11px] font-semibold">Radical</span>
              )}
            </div>

            <span className="text-2xl font-bold text-slate-400">+</span>

            {/* Phonetic/Body Slot */}
            <div className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center border-2 transition-all ${
              selectedBody
                ? 'bg-amber-500 text-white border-amber-600 shadow-md scale-105'
                : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400'
            }`}>
              {selectedBody ? (
                <span className="text-3xl font-chinese font-bold">{selectedBody}</span>
              ) : (
                <span className="text-[11px] font-semibold">Body</span>
              )}
            </div>

            <span className="text-2xl font-bold text-slate-400">=</span>

            {/* Result Slot */}
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center border-2 ${
              isAssembled && isSuccess
                ? 'bg-emerald-500 text-white border-emerald-600 shadow-lg scale-110 animate-bounce'
                : isAssembled && !isSuccess
                ? 'bg-red-500 text-white border-red-600'
                : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400'
            }`}>
              {isAssembled && isSuccess ? (
                <span className="text-4xl font-chinese font-bold">{currentLevel.targetChar}</span>
              ) : isAssembled && !isSuccess ? (
                <span className="text-2xl font-bold">?</span>
              ) : (
                <span className="text-[11px] font-semibold">Result</span>
              )}
            </div>
          </div>

          {/* Options Palette */}
          {!isAssembled && (
            <div className="space-y-4">
              {/* Radicals row */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                  1. Choose the Semantic Radical:
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {radicalOptions.map((rad, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectRadical(rad)}
                      className={`p-3 rounded-2xl border-2 font-chinese font-bold text-2xl transition-all active:scale-95 shadow-xs ${
                        selectedRadical === rad
                          ? 'bg-blue-600 text-white border-blue-700'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-400 text-slate-800 dark:text-slate-100'
                      }`}
                    >
                      {rad}
                    </button>
                  ))}
                </div>
              </div>

              {/* Body row */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                  2. Choose the Phonetic / Base Component:
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {bodyOptions.map((body, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectBody(body)}
                      className={`p-3 rounded-2xl border-2 font-chinese font-bold text-2xl transition-all active:scale-95 shadow-xs ${
                        selectedBody === body
                          ? 'bg-amber-600 text-white border-amber-700'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-amber-400 text-slate-800 dark:text-slate-100'
                      }`}
                    >
                      {body}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Feedback & Result Card */}
          {isAssembled && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {isSuccess ? (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300 text-sm">
                    <CheckCircle2 size={20} className="text-emerald-600" />
                    <span>Character Successfully Forged: {currentLevel.targetChar} ({currentLevel.pinyin})</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    💡 <strong>How it works: </strong>{currentLevel.explanation}
                  </p>
                  <button
                    type="button"
                    onClick={() => onSelectCharacter(currentLevel.targetChar)}
                    className="text-xs text-emerald-700 dark:text-emerald-400 font-bold hover:underline"
                  >
                    Inspect stroke animation & deep etymology →
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-300 dark:border-red-800 space-y-1">
                  <div className="font-bold text-red-800 dark:text-red-300 text-sm">
                    Mismatch!
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Those two components do not combine into "{currentLevel.english}". Try again!
                  </p>
                </div>
              )}

              <div className="flex items-center gap-3">
                {!isSuccess ? (
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="w-full py-3 px-6 rounded-2xl bg-slate-900 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={16} />
                    <span>Try Different Components</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNextLevel}
                    className="w-full py-3.5 px-6 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
                  >
                    <span>Next Puzzle</span>
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-6 shadow-xl animate-in zoom-in-95">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-violet-100 dark:bg-violet-950/60 flex items-center justify-center text-violet-600 dark:text-violet-400">
            <Award size={44} />
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Master Hanzi Blacksmith!
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              You assembled every single radical and phonetic building block correctly.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setAllFinished(false);
              setLevelIndex(0);
              setSelectedRadical(null);
              setSelectedBody(null);
              setIsAssembled(false);
              setIsSuccess(false);
            }}
            className="py-3 px-8 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm shadow-md inline-flex items-center gap-2"
          >
            <RotateCcw size={16} />
            <span>Play Lab Again</span>
          </button>
        </div>
      )}
    </div>
  );
};
