import React from 'react';
import { Compass, BookOpen, Headphones, Atom, Timer, Puzzle, Activity, Sparkles } from 'lucide-react';

export type NavTab = 'lessons' | 'anki' | 'sprint' | 'builder' | 'tones' | 'radicals' | 'sentences';

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  dueCardsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, dueCardsCount }) => {
  const navSections = [
    {
      title: 'Study Paths',
      items: [
        {
          id: 'lessons' as NavTab,
          label: 'Lessons Path',
          sublabel: 'HelloChinese Oral Drills',
          icon: Compass,
          badge: 'HSK 1-5'
        },
        {
          id: 'anki' as NavTab,
          label: 'Anki SRS Decks',
          sublabel: 'Spaced Repetition & Browser',
          icon: BookOpen,
          badge: dueCardsCount > 0 ? `${dueCardsCount} Due` : undefined,
          badgeColor: 'bg-red-500 text-white animate-pulse'
        },
        {
          id: 'sentences' as NavTab,
          label: 'Oral Sentences',
          sublabel: 'Listening Audio Player',
          icon: Headphones,
          badge: 'Immersion'
        }
      ]
    },
    {
      title: 'Interactive Games & Audio',
      items: [
        {
          id: 'sprint' as NavTab,
          label: 'Audio Sprint',
          sublabel: '45s Listening Blitz',
          icon: Timer,
          badge: '⚡ Blitz',
          badgeColor: 'bg-orange-500 text-white'
        },
        {
          id: 'builder' as NavTab,
          label: 'Radical Builder',
          sublabel: 'Hanzi Anatomy Puzzle',
          icon: Puzzle,
          badge: '🧩 Puzzle',
          badgeColor: 'bg-violet-600 text-white'
        },
        {
          id: 'tones' as NavTab,
          label: 'Tone Trainer',
          sublabel: 'Pitch Curves & Ear Training',
          icon: Activity,
          badge: '🎵 Tones',
          badgeColor: 'bg-teal-600 text-white'
        },
        {
          id: 'radicals' as NavTab,
          label: 'Radicals Matrix',
          sublabel: 'Kangxi 214 Building Blocks',
          icon: Atom,
          badge: '214 Roots'
        }
      ]
    }
  ];

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md p-4 hidden md:flex flex-col justify-between shrink-0 min-h-[calc(100vh-61px)]">
      <div className="space-y-4">
        {navSections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {section.title}
            </div>

            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-2xl transition-all duration-150 text-left ${
                    isActive
                      ? 'bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100/80 dark:hover:bg-slate-900/60 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`p-2 rounded-xl transition-colors ${
                        isActive
                          ? 'bg-red-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm">{item.label}</div>
                      <div className="text-[10px] text-slate-400 font-normal leading-tight">
                        {item.sublabel}
                      </div>
                    </div>
                  </div>

                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        item.badgeColor || 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Radical Explanations Callout */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent border border-blue-500/20 text-xs space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-blue-700 dark:text-blue-400 text-xs">
          <Sparkles size={14} />
          <span>Radical Spotlight</span>
        </div>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
          Click any Hanzi to see its <strong className="text-slate-900 dark:text-slate-200">"Why this radical?"</strong> explanation, strokes, and building formula!
        </p>
      </div>
    </aside>
  );
};
