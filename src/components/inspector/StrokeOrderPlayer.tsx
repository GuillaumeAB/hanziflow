import React, { useEffect, useRef, useState } from 'react';
import HanziWriter from 'hanzi-writer';
import { Play, RotateCcw, Edit3, Eye, Pause, CheckCircle2 } from 'lucide-react';
import { audioService } from '../../services/audioService';

interface StrokeOrderPlayerProps {
  char: string;
  size?: number;
  radical?: string;
  className?: string;
}

export const StrokeOrderPlayer: React.FC<StrokeOrderPlayerProps> = ({
  char,
  size = 180,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<HanziWriter | null>(null);
  const [mode, setMode] = useState<'watch' | 'quiz'>('watch');
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [strokeCount, setStrokeCount] = useState<number | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous writer
    containerRef.current.innerHTML = '';
    setHasError(false);
    setIsAnimating(false);
    setQuizFinished(false);

    try {
      const writer = HanziWriter.create(containerRef.current, char, {
        width: size,
        height: size,
        padding: 10,
        showOutline: true,
        strokeAnimationSpeed: 1.2,
        delayBetweenStrokes: 120,
        strokeColor: '#dc2626', // Chinese cinnabar red
        outlineColor: '#cbd5e1',
        radicalColor: '#2563eb', // Kangxi radical highlighted in blue
        drawingColor: '#10b981', // Drawing ink in green
        showCharacter: mode === 'watch',
        onLoadCharDataSuccess: (data) => {
          if (data && data.strokes) {
            setStrokeCount(data.strokes.length);
          }
        },
        onLoadCharDataError: () => {
          setHasError(true);
        }
      });

      writerRef.current = writer;

      if (mode === 'watch') {
        writer.animateCharacter({
          onComplete: () => setIsAnimating(false)
        });
        setIsAnimating(true);
      } else {
        startQuiz(writer);
      }
    } catch {
      setHasError(true);
    }

    return () => {
      if (writerRef.current) {
        writerRef.current = null;
      }
    };
  }, [char, size, mode]);

  const startQuiz = (writer: HanziWriter) => {
    setQuizFinished(false);
    writer.quiz({
      onCorrectStroke: () => {
        audioService.playClickSound();
      },
      onMistake: () => {
        audioService.playWrongSound();
      },
      onComplete: () => {
        audioService.playSuccessSound();
        setQuizFinished(true);
      }
    });
  };

  const handlePlay = () => {
    if (!writerRef.current) return;
    setIsAnimating(true);
    writerRef.current.animateCharacter({
      onComplete: () => setIsAnimating(false)
    });
  };

  const handleReset = () => {
    if (!writerRef.current) return;
    if (mode === 'quiz') {
      startQuiz(writerRef.current);
    } else {
      writerRef.current.showCharacter();
      setIsAnimating(false);
    }
  };

  const toggleMode = (newMode: 'watch' | 'quiz') => {
    setMode(newMode);
  };

  return (
    <div className="flex flex-col items-center select-none ${className}">
      {/* Mode Switcher Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-2 text-xs font-bold">
        <button
          type="button"
          onClick={() => toggleMode('watch')}
          className={`px-3 py-1 rounded-lg transition-all ${
            mode === 'watch'
              ? 'bg-white dark:bg-slate-900 text-red-600 dark:text-red-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <span className="flex items-center gap-1">
            <Eye size={12} />
            <span>Watch Strokes</span>
          </span>
        </button>
        <button
          type="button"
          onClick={() => toggleMode('quiz')}
          className={`px-3 py-1 rounded-lg transition-all ${
            mode === 'quiz'
              ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <span className="flex items-center gap-1">
            <Edit3 size={12} />
            <span>Practice Writing</span>
          </span>
        </button>
      </div>

      {/* Traditional Calligraphy Grid (米字格) Container */}
      <div className="relative rounded-2xl bg-white dark:bg-slate-900 border-2 border-red-200 dark:border-red-900/50 shadow-inner overflow-hidden p-2">
        {/* Background Grid Lines (Mi-Zi-Ge) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-20 dark:opacity-15"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <line x1="0" y1="0" x2="100" y2="100" stroke="#dc2626" strokeDasharray="3,3" strokeWidth="1" />
          <line x1="100" y1="0" x2="0" y2="100" stroke="#dc2626" strokeDasharray="3,3" strokeWidth="1" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="#dc2626" strokeDasharray="3,3" strokeWidth="1" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="#dc2626" strokeDasharray="3,3" strokeWidth="1" />
          <rect x="0" y="0" width="100" height="100" fill="none" stroke="#dc2626" strokeWidth="2" />
        </svg>

        {/* HanziWriter Canvas mount point */}
        <div
          ref={containerRef}
          style={{ width: size, height: size }}
          className="flex items-center justify-center relative z-10 cursor-crosshair"
        >
          {hasError && (
            <div className="text-7xl font-chinese font-bold text-red-600 dark:text-red-400">
              {char}
            </div>
          )}
        </div>

        {/* Success badge in quiz mode */}
        {quizFinished && (
          <div className="absolute inset-0 z-20 bg-emerald-500/10 backdrop-blur-xs flex flex-col items-center justify-center animate-in fade-in">
            <CheckCircle2 size={36} className="text-emerald-500" />
            <span className="text-xs font-bold text-emerald-600 mt-1">Perfect Strokes!</span>
          </div>
        )}
      </div>

      {/* Stroke count & Control buttons */}
      <div className="flex items-center justify-between w-full max-w-[220px] mt-2 px-1">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {mode === 'quiz' ? 'Draw strokes with mouse or touch' : (strokeCount ? `${strokeCount} strokes` : 'Stroke Order')}
        </span>

        <div className="flex items-center gap-1.5">
          {mode === 'watch' && (
            <button
              type="button"
              onClick={handlePlay}
              disabled={isAnimating || hasError}
              title="Play stroke-by-stroke animation"
              className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-950/60 dark:hover:bg-red-900 dark:text-red-300 transition-colors disabled:opacity-40"
            >
              {isAnimating ? <Pause size={14} /> : <Play size={14} />}
            </button>
          )}
          <button
            type="button"
            onClick={handleReset}
            disabled={hasError}
            title={mode === 'quiz' ? 'Restart writing practice' : 'Show full character'}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 transition-colors"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
