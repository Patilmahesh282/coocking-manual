import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  Users,
  Flame,
  Bookmark,
  ChevronRight,
  Play,
  Sparkles,
  AlertTriangle,
  Plus
} from 'lucide-react';
import { CookingManual, SavedBookmark } from '../types';

interface ManualsListProps {
  manuals: CookingManual[];
  onSelectManualForCooking: (manual: CookingManual) => void;
  bookmarks: SavedBookmark[];
  onToggleBookmark: (title: string, category: string, type: 'manual', targetId: string) => void;
  onOpenAIGenerator: () => void;
  searchQuery: string;
}

export const ManualsList: React.FC<ManualsListProps> = ({
  manuals,
  onSelectManualForCooking,
  bookmarks,
  onToggleBookmark,
  onOpenAIGenerator,
  searchQuery,
}) => {
  const [selectedManual, setSelectedManual] = useState<CookingManual | null>(manuals[0] || null);
  const [servingScale, setServingScale] = useState<number>(selectedManual?.servings || 4);

  const filteredManuals = manuals.filter((m) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      m.title.toLowerCase().includes(q) ||
      m.summary.toLowerCase().includes(q) ||
      m.cuisine.toLowerCase().includes(q) ||
      m.keyTechniques.some((t) => t.toLowerCase().includes(q))
    );
  });

  const handleSelect = (m: CookingManual) => {
    setSelectedManual(m);
    setServingScale(m.servings);
  };

  const isBookmarked = (id: string) => bookmarks.some((b) => b.targetId === id);

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick AI Creator */}
      <div className="bg-gradient-to-r from-amber-950/80 via-stone-900 to-amber-900/60 p-6 rounded-2xl border border-amber-800/40 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-serif font-bold text-lg mb-1">
            <BookOpen className="w-5 h-5 text-amber-500" />
            <span>Master Cooking Manuals</span>
          </div>
          <p className="text-stone-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Step-by-step master guides with strict time controls, equipment specs, ratio logic, and science-backed culinary steps.
          </p>
        </div>

        <button
          onClick={onOpenAIGenerator}
          className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 whitespace-nowrap transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate Custom Manual with AI</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Manuals Sidebar List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs uppercase font-bold tracking-wider text-stone-400">
              Manual Directory ({filteredManuals.length})
            </h3>
          </div>

          <div className="space-y-2.5 max-h-[700px] overflow-y-auto pr-1">
            {filteredManuals.map((m) => {
              const isSelected = selectedManual?.id === m.id;
              const bookmarked = isBookmarked(m.id);

              return (
                <div
                  key={m.id}
                  onClick={() => handleSelect(m)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-amber-950/40 border-amber-500/80 shadow-md ring-1 ring-amber-500/50'
                      : 'bg-stone-900/90 hover:bg-stone-850 border-stone-800 text-stone-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                      {m.cuisine}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(m.title, m.cuisine, 'manual', m.id);
                      }}
                      className={`p-1 rounded-md transition-colors ${
                        bookmarked
                          ? 'text-amber-400 bg-amber-500/20'
                          : 'text-stone-500 hover:text-stone-300'
                      }`}
                      title={bookmarked ? 'Remove Bookmark' : 'Save Bookmark'}
                    >
                      <Bookmark className="w-3.5 h-3.5" fill={bookmarked ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  <h4 className="font-serif font-bold text-stone-100 text-sm mb-1 line-clamp-1">
                    {m.title}
                  </h4>
                  <p className="text-xs text-stone-400 line-clamp-2 mb-3 leading-relaxed">
                    {m.summary}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-stone-400 border-t border-stone-800/80 pt-2 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-500" />
                      {m.prepTimeMinutes + m.cookTimeMinutes} min
                    </span>
                    <span className="bg-stone-800 text-stone-300 px-2 py-0.5 rounded text-[10px]">
                      {m.difficulty}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Manual Detailed View */}
        <div className="lg:col-span-8 bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-xl text-stone-200">
          {selectedManual ? (
            <div className="space-y-6">
              {/* Header Info */}
              <div className="border-b border-stone-800 pb-5">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-md">
                    {selectedManual.cuisine} • {selectedManual.difficulty}
                  </span>

                  <button
                    onClick={() => onSelectManualForCooking(selectedManual)}
                    className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs sm:text-sm px-4 py-2 rounded-xl flex items-center gap-2 shadow-md transition-all"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Start Hands-Free Cooking Mode</span>
                  </button>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100 mb-2">
                  {selectedManual.title}
                </h2>
                <p className="text-sm text-stone-300 leading-relaxed">
                  {selectedManual.summary}
                </p>

                {/* Meta Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-stone-800/80 text-xs font-mono">
                  <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-800">
                    <span className="text-stone-500 block text-[10px] uppercase">Prep Time</span>
                    <span className="text-amber-300 font-semibold">{selectedManual.prepTimeMinutes} mins</span>
                  </div>
                  <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-800">
                    <span className="text-stone-500 block text-[10px] uppercase">Cook Time</span>
                    <span className="text-amber-300 font-semibold">{selectedManual.cookTimeMinutes} mins</span>
                  </div>
                  <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-800">
                    <span className="text-stone-500 block text-[10px] uppercase">Target Servings</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <button
                        onClick={() => setServingScale(Math.max(1, servingScale - 1))}
                        className="text-amber-400 hover:bg-stone-800 px-1.5 rounded font-bold"
                      >
                        -
                      </button>
                      <span className="text-amber-300 font-semibold">{servingScale}</span>
                      <button
                        onClick={() => setServingScale(servingScale + 1)}
                        className="text-amber-400 hover:bg-stone-800 px-1.5 rounded font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-800">
                    <span className="text-stone-500 block text-[10px] uppercase">Total Steps</span>
                    <span className="text-amber-300 font-semibold">{selectedManual.steps.length} Steps</span>
                  </div>
                </div>
              </div>

              {/* Key Techniques & Equipment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-stone-950/80 p-4 rounded-xl border border-stone-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2.5 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5" />
                    Key Culinary Techniques
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedManual.keyTechniques.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-stone-850 text-stone-300 text-xs px-2.5 py-1 rounded-lg border border-stone-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-stone-950/80 p-4 rounded-xl border border-stone-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    Required Kitchen Equipment
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedManual.equipmentNeeded.map((eq, idx) => (
                      <span
                        key={idx}
                        className="bg-stone-850 text-stone-300 text-xs px-2.5 py-1 rounded-lg border border-stone-700/60"
                      >
                        {eq}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Scaled Ingredients List */}
              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Ingredients ({servingScale} Servings Scaled)
                  </h4>
                  {servingScale !== selectedManual.servings && (
                    <span className="text-[10px] text-amber-400/80 font-mono">
                      (Scaled from original {selectedManual.servings} servings)
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
                  {selectedManual.ingredients.map((ing, idx) => {
                    const ratio = servingScale / selectedManual.servings;
                    const scaledAmount = Math.round(ing.amount * ratio * 10) / 10;

                    return (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-stone-900 p-2.5 rounded-lg border border-stone-800/80"
                      >
                        <span className="text-stone-200 font-medium">{ing.name}</span>
                        <div className="text-right">
                          <span className="font-mono text-amber-300 font-bold">
                            {scaledAmount} {ing.unit}
                          </span>
                          {ing.notes && (
                            <span className="block text-[10px] text-stone-500 truncate max-w-[140px]">
                              {ing.notes}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step-by-step Instructions */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Step-By-Step Culinary Manual
                </h4>

                <div className="space-y-3">
                  {selectedManual.steps.map((step) => (
                    <div
                      key={step.stepNumber}
                      className="bg-stone-950/90 p-4 rounded-xl border border-stone-800/90 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center">
                            {step.stepNumber}
                          </span>
                          <h5 className="font-serif font-bold text-stone-100 text-sm">
                            {step.title}
                          </h5>
                        </div>
                        {step.timerSeconds && (
                          <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {Math.round(step.timerSeconds / 60)} min timer
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-stone-300 leading-relaxed pl-8">
                        {step.instruction}
                      </p>

                      {step.proTip && (
                        <div className="ml-8 mt-2 p-2.5 bg-amber-950/30 border-l-2 border-amber-500 text-[11px] text-amber-200/90 rounded-r-lg">
                          <strong className="text-amber-400">Chef Pro Tip: </strong>
                          {step.proTip}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Troubleshooting Table */}
              {selectedManual.troubleshooting && selectedManual.troubleshooting.length > 0 && (
                <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    Kitchen Manual Troubleshooting
                  </h4>

                  <div className="space-y-2 text-xs">
                    {selectedManual.troubleshooting.map((t, idx) => (
                      <div
                        key={idx}
                        className="bg-stone-900/80 p-3 rounded-lg border border-stone-800 grid grid-cols-1 sm:grid-cols-2 gap-2"
                      >
                        <div>
                          <span className="text-[10px] text-rose-400 uppercase font-bold block mb-0.5">
                            Issue
                          </span>
                          <p className="text-stone-300 font-medium">{t.issue}</p>
                        </div>
                        <div>
                          <span className="text-[10px] text-emerald-400 uppercase font-bold block mb-0.5">
                            Solution / Prevention
                          </span>
                          <p className="text-stone-300">{t.solution}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-stone-500 text-sm italic">
              Select a manual from the left directory to view full cooking instructions.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
