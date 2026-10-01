import React from 'react';

interface InteractiveHanziProps {
  text: string;
  onSelectCharacter?: (char: string) => void;
  className?: string;
  charClassName?: string;
  showClickHint?: boolean;
}

// Regex to check if character is a CJK ideograph
const CJK_REGEX = /[\u4e00-\u9fa5]/;

export const InteractiveHanzi: React.FC<InteractiveHanziProps> = ({
  text,
  onSelectCharacter,
  className = '',
  charClassName = '',
  showClickHint = false
}) => {
  if (!text) return null;

  const characters = Array.from(text);

  return (
    <span className={`inline-flex flex-wrap items-center font-chinese tracking-wide select-none ${className}`}>
      {characters.map((ch, idx) => {
        const isHanzi = CJK_REGEX.test(ch);

        if (!isHanzi) {
          return (
            <span key={idx} className="text-slate-500 font-sans mx-0.5">
              {ch}
            </span>
          );
        }

        return (
          <span
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              if (onSelectCharacter) {
                onSelectCharacter(ch);
              }
            }}
            title={onSelectCharacter ? `Inspect "${ch}" (radical & components)` : undefined}
            className={`cursor-pointer rounded transition-all duration-150 inline-block px-0.5 py-0.5 hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 active:scale-95 ${
              showClickHint ? 'border-b border-dashed border-red-300 dark:border-red-800' : ''
            } ${charClassName}`}
          >
            {ch}
          </span>
        );
      })}
    </span>
  );
};
