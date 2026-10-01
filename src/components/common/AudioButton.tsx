import React, { useState } from 'react';
import { Volume2, Snail } from 'lucide-react';
import { audioService } from '../../services/audioService';

interface AudioButtonProps {
  text: string;
  size?: 'sm' | 'md' | 'lg';
  includeSlow?: boolean;
  className?: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  size = 'md',
  includeSlow = true,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayingSlow, setIsPlayingSlow] = useState(false);

  const handlePlay = async (e: React.MouseEvent, slow: boolean = false) => {
    e.stopPropagation();
    if (isPlaying || isPlayingSlow) return;

    if (slow) {
      setIsPlayingSlow(true);
      await audioService.speakSlow(text);
      setIsPlayingSlow(false);
    } else {
      setIsPlaying(true);
      await audioService.speak(text, 1.0);
      setIsPlaying(false);
    }
  };

  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'p-3 text-base'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <button
        type="button"
        onClick={(e) => handlePlay(e, false)}
        disabled={isPlaying || isPlayingSlow}
        title="Listen to native pronunciation (1.0x)"
        className={`flex items-center justify-center rounded-full bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/40 dark:hover:bg-red-900/60 dark:text-red-400 border border-red-200 dark:border-red-800/60 transition-transform active:scale-95 shadow-sm ${
          sizeClasses[size]
        } ${isPlaying ? 'ring-2 ring-red-400 animate-pulse' : ''}`}
      >
        <Volume2 size={iconSizes[size]} className={isPlaying ? 'animate-bounce' : ''} />
      </button>

      {includeSlow && (
        <button
          type="button"
          onClick={(e) => handlePlay(e, true)}
          disabled={isPlaying || isPlayingSlow}
          title="Slow pronunciation (0.7x speed 🐢)"
          className={`flex items-center justify-center rounded-full bg-amber-50 hover:bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:hover:bg-amber-900/60 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60 transition-transform active:scale-95 shadow-sm ${
            sizeClasses[size]
          } ${isPlayingSlow ? 'ring-2 ring-amber-400 animate-pulse' : ''}`}
        >
          <Snail size={iconSizes[size] - 2} />
        </button>
      )}
    </div>
  );
};
