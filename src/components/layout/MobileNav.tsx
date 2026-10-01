import React from 'react';
import { Compass, BookOpen, Headphones, Timer, Puzzle, Atom } from 'lucide-react';
import { NavTab } from './Sidebar';

interface MobileNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  dueCardsCount: number;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, onTabChange, dueCardsCount }) => {
  const items = [
    { id: 'lessons' as NavTab, label: 'Lessons', icon: Compass },
    { id: 'anki' as NavTab, label: 'Anki SRS', icon: BookOpen, badge: dueCardsCount > 0 ? dueCardsCount : undefined },
    { id: 'sprint' as NavTab, label: 'Sprint', icon: Timer },
    { id: 'builder' as NavTab, label: 'Radicals', icon: Puzzle },
    { id: 'sentences' as NavTab, label: 'Audio', icon: Headphones },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around safe-area-bottom shadow-lg">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center justify-center p-1 rounded-xl transition-all relative ${
              isActive
                ? 'text-red-600 dark:text-red-400 font-bold scale-105'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
          >
            <div className="relative">
              <Icon size={20} />
              {item.badge && (
                <span className="absolute -top-1 -right-2 px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-red-600 text-white">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
