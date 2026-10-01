import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { audioService } from '../../services/audioService';
import { TonePinyin } from '../common/TonePinyin';
import { InteractiveHanzi } from '../common/InteractiveHanzi';
import { AudioButton } from '../common/AudioButton';
import { Timer, Zap, Flame, RotateCcw, Volume2, Award, CheckCircle2, XCircle } from 'lucide-react';

interface SprintItem {
  audioText: string;
  pinyin: string;
  prompt: string;
  correctAnswer: string;
  options: string[];
  hsk: number;
}

const SPRINT_POOL: SprintItem[] = [
  { audioText: '你好', pinyin: 'nǐ hǎo', prompt: 'What did you hear?', correctAnswer: 'Hello / Hi', options: ['Hello / Hi', 'Thank you', 'Goodbye', 'Sorry'], hsk: 1 },
  { audioText: '我想喝茶', pinyin: 'wǒ xiǎng hē chá', prompt: 'What did you hear?', correctAnswer: 'I want to drink tea', options: ['I want to drink tea', 'I want to eat rice', 'Do you want water?', 'I like coffee'], hsk: 1 },
  { audioText: '很高兴认识你', pinyin: 'hěn gāoxìng rènshi nǐ', prompt: 'What did you hear?', correctAnswer: 'Nice to meet you', options: ['Nice to meet you', 'How have you been?', 'Where are you going?', 'Have you eaten?'], hsk: 1 },
  { audioText: '请问去地铁站怎么走', pinyin: 'qǐngwèn qù dìtiě zhàn zěnme zǒu', prompt: 'What did you hear?', correctAnswer: 'How do I get to the subway station?', options: ['How do I get to the subway station?', 'Where can I buy a ticket?', 'Is the bus coming?', 'I lost my luggage'], hsk: 2 },
  { audioText: '有点太贵了', pinyin: 'yǒudiǎn tài guì le', prompt: 'What did you hear?', correctAnswer: 'A bit too expensive', options: ['A bit too expensive', 'It is very delicious', 'Can you deliver this?', 'This is too cheap'], hsk: 2 },
  { audioText: '我听不懂', pinyin: 'wǒ tīng bù dǒng', prompt: 'What did you hear?', correctAnswer: 'I do not understand', options: ['I do not understand', 'I cannot speak', 'Please talk faster', 'I know this character'], hsk: 2 },
  { audioText: '学汉字虽然难但是很有意思', pinyin: 'xué hànzì suīrán nán dànshì hěn yǒu yìsi', prompt: 'What did you hear?', correctAnswer: 'Learning Hanzi is hard but interesting', options: ['Learning Hanzi is hard but interesting', 'Chinese grammar is very simple', 'I don\'t want to study tonight', 'Hanzi has too many tones'], hsk: 3 },
  { audioText: '我下午去机场接你', pinyin: 'wǒ xiàwǔ qù jīchǎng jiē nǐ', prompt: 'What did you hear?', correctAnswer: 'I\'ll pick you up at the airport this afternoon', options: ['I\'ll pick you up at the airport this afternoon', 'I booked a flight ticket', 'The flight has been delayed', 'Let\'s take a taxi together'], hsk: 3 },
  { audioText: '最好提前预订位置', pinyin: 'zuì hǎo tíqián yùdìng wèizhì', prompt: 'What did you hear?', correctAnswer: 'Better reserve a table in advance', options: ['Better reserve a table in advance', 'The restaurant is fully booked', 'We should leave right now', 'Can we sit outside?'], hsk: 4 },
  { audioText: '保护生态环境', pinyin: 'bǎohù shēngtài huánjìng', prompt: 'What did you hear?', correctAnswer: 'Protect ecological environment', options: ['Protect ecological environment', 'Adapt to a new workplace', 'Travel around the world', 'Discuss business contracts'], hsk: 4 },
  { audioText: '经济日益繁荣', pinyin: 'jīngjì rìyì fánróng', prompt: 'What did you hear?', correctAnswer: 'Economy prospers day by day', options: ['Economy prospers day by day', 'The weather is cooling down', 'Sign a strategic agreement', 'Comprehensive report'], hsk: 5 }
];

interface AudioSpeedSprintProps {
  onAddXP: (xp: number) => void;
  onSelectCharacter: (char: string) => void;
}

export const AudioSpeedSprint: React.FC<AudioSpeedSprintProps> = ({ onAddXP, onSelectCharacter }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<SprintItem[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const currentQ = shuffledQuestions[currentIndex];

  // Start game session
  const startGame = () => {
    const shuffled = [...SPRINT_POOL].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setTimeLeft(45);
    setGameOver(false);
    setIsPlaying(true);
    setFeedback(null);
  };

  // Timer loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    if (timeLeft <= 0) {
      setGameOver(true);
      setIsPlaying(false);
      audioService.playCompleteFanfare();
      confetti({ particleCount: 80, spread: 70 });
      onAddXP(Math.round(score / 5));
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, gameOver, score, onAddXP]);

  // Play audio on each new question
  useEffect(() => {
    if (!isPlaying || !currentQ || gameOver) return;
    const timeout = setTimeout(() => {
      audioService.speak(currentQ.audioText, 1.0);
    }, 200);
    return () => clearTimeout(timeout);
  }, [currentIndex, isPlaying, currentQ, gameOver]);

  const handleSelectOption = (option: string) => {
    if (!isPlaying || feedback !== null || !currentQ) return;

    if (option === currentQ.correctAnswer) {
      audioService.playSuccessSound();
      setFeedback('correct');
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      const multiplier = newStreak >= 5 ? 3 : newStreak >= 3 ? 2 : 1;
      setScore(prev => prev + 100 * multiplier);

      setTimeout(() => {
        setFeedback(null);
        if (currentIndex + 1 < shuffledQuestions.length) {
          setCurrentIndex(prev => prev + 1);
        } else {
          // Reshuffle and continue
          setShuffledQuestions(prev => [...prev].sort(() => Math.random() - 0.5));
          setCurrentIndex(0);
        }
      }, 400);
    } else {
      audioService.playWrongSound();
      setFeedback('wrong');
      setStreak(0);

      setTimeout(() => {
        setFeedback(null);
        if (currentIndex + 1 < shuffledQuestions.length) {
          setCurrentIndex(prev => prev + 1);
        }
      }, 600);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold tracking-wider uppercase">
            <Timer size={14} />
            <span>Speed Listening Blitz</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Audio Speed Sprint
          </h2>
          <p className="text-sm text-amber-100 max-w-lg leading-relaxed">
            Test your Chinese listening reflexes! Hear the spoken audio, tap the right translation before the clock runs out, and rack up combo multipliers.
          </p>
        </div>

        <div className="absolute right-4 -bottom-6 text-9xl font-chinese font-bold text-white/10 select-none pointer-events-none">
          速
        </div>
      </div>

      {!isPlaying && !gameOver && (
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-6 shadow-md">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-orange-100 dark:bg-orange-950/60 flex items-center justify-center text-orange-600 dark:text-orange-400">
            <Timer size={44} />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Ready for the 45-Second Sprint?
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Native-speed spoken audio will play automatically. Answer consecutive questions correctly to unlock 2x and 3x score multipliers!
            </p>
          </div>

          <button
            type="button"
            onClick={startGame}
            className="py-4 px-8 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-lg shadow-lg hover:shadow-xl transition-transform active:scale-95 inline-flex items-center gap-2"
          >
            <Zap size={20} className="fill-current" />
            <span>Start Sprint Blitz</span>
          </button>
        </div>
      )}

      {isPlaying && currentQ && (
        <div className="space-y-5 animate-in fade-in">
          {/* Status Bar: Timer & Combo */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            {/* Countdown */}
            <div className="flex items-center gap-2 font-bold text-base text-slate-800 dark:text-slate-200">
              <Timer size={20} className="text-orange-500 animate-spin" />
              <span>{timeLeft}s</span>
            </div>

            {/* Streak Combo Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 font-extrabold text-xs">
              <Flame size={16} className="fill-amber-500 text-amber-500" />
              <span>{streak} Streak {streak >= 3 ? `(${streak >= 5 ? '3x' : '2x'} Combo!)` : ''}</span>
            </div>

            {/* Score */}
            <div className="flex items-center gap-1.5 font-extrabold text-base text-orange-600 dark:text-orange-400">
              <Zap size={18} className="fill-orange-500" />
              <span>{score} pts</span>
            </div>
          </div>

          {/* Audio & Question Card */}
          <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center space-y-4 shadow-inner">
            <AudioButton text={currentQ.audioText} size="lg" includeSlow={true} />

            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Listen & Select Meaning (HSK {currentQ.hsk})
              </span>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                "{currentQ.prompt}"
              </p>
            </div>
          </div>

          {/* 4 Speed Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((opt, idx) => {
              let btnClass = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-orange-400 text-slate-800 dark:text-slate-100';

              if (feedback === 'correct' && opt === currentQ.correctAnswer) {
                btnClass = 'bg-emerald-500 text-white border-emerald-600';
              } else if (feedback === 'wrong' && opt !== currentQ.correctAnswer) {
                btnClass = 'opacity-40 bg-slate-100 dark:bg-slate-800 border-transparent text-slate-400';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(opt)}
                  disabled={feedback !== null}
                  className={`p-4 rounded-2xl border-2 font-medium text-sm sm:text-base text-left shadow-sm transition-all duration-100 active:scale-95 flex items-center justify-between ${btnClass}`}
                >
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {gameOver && (
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-6 shadow-xl animate-in zoom-in-95">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-md">
            <Award size={44} />
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Sprint Complete!
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Great oral listening reflexes under time pressure!
            </p>
          </div>

          {/* Results summary stats */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-400 font-semibold">Final Score</div>
              <div className="text-xl font-extrabold text-orange-600 dark:text-orange-400 mt-1">{score}</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-400 font-semibold">Max Combo</div>
              <div className="text-xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">{maxStreak}x</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-400 font-semibold">XP Earned</div>
              <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">+{Math.round(score / 5)}</div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={startGame}
              className="py-3 px-6 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md transition-transform active:scale-95 flex items-center gap-2"
            >
              <RotateCcw size={16} />
              <span>Sprint Again</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
