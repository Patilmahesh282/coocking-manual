import React from 'react';
import {
  BookOpen,
  Flame,
  Calculator,
  Thermometer,
  RefreshCw,
  Sparkles,
  Bookmark,
  Search,
  UtensilsCrossed,
  Volume2
} from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  bookmarkCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  bookmarkCount,
}) => {
  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'manuals', label: 'Cooking Manuals', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'techniques', label: 'Techniques & Science', icon: <Flame className="w-4 h-4" /> },
    { id: 'ratios', label: 'Ratio Calculators', icon: <Calculator className="w-4 h-4" /> },
    { id: 'temperatures', label: 'Temps & Safety', icon: <Thermometer className="w-4 h-4" /> },
    { id: 'substitutions', label: 'Substitutions', icon: <RefreshCw className="w-4 h-4" /> },
    { id: 'assistant', label: 'Hands-Free Cooking', icon: <Volume2 className="w-4 h-4" /> },
    { id: 'ai-chef', label: 'Ask Chef AI', icon: <Sparkles className="w-4 h-4 text-amber-400" /> },
    {
      id: 'bookmarks',
      label: 'Saved & Notes',
      icon: <Bookmark className="w-4 h-4" />,
      badge: bookmarkCount > 0 ? `${bookmarkCount}` : undefined,
    },
  ];

  return (
    <header className="bg-stone-900 text-stone-100 border-b border-stone-800 sticky top-0 z-40 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-amber-100 shadow-inner border border-amber-500/30">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-serif font-bold tracking-tight text-stone-100">
                  Cooking<span className="text-amber-500">Manual</span>
                </h1>
                <span className="text-[10px] font-sans uppercase tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-semibold">
                  Pro Guide
                </span>
              </div>
              <p className="text-xs text-stone-400 font-sans">
                Culinary Science, Ratio Mechanics & Kitchen Assistant
              </p>
            </div>
          </div>

          {/* Quick Search Input Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              id="global-cooking-search-input"
              type="text"
              placeholder="Search techniques, ratios, temps, fixes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-950 border border-stone-700/80 rounded-xl pl-9 pr-8 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex items-center gap-1.5 overflow-x-auto pt-4 pb-1 scrollbar-none border-t border-stone-800/80 mt-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-amber-600/20 text-amber-300 border-amber-500/50 font-semibold shadow-sm'
                    : 'bg-stone-950/40 text-stone-300 border-stone-800/80 hover:bg-stone-800 hover:text-stone-100'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="bg-amber-500 text-stone-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
