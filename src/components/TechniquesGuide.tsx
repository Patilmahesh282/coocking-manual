import React, { useState } from 'react';
import { Flame, Bookmark, ShieldAlert, CheckCircle2, Thermometer, Wrench, Lightbulb } from 'lucide-react';
import { CulinaryTechnique, SavedBookmark } from '../types';

interface TechniquesGuideProps {
  techniques: CulinaryTechnique[];
  bookmarks: SavedBookmark[];
  onToggleBookmark: (title: string, category: string, type: 'technique', targetId: string) => void;
  searchQuery: string;
}

export const TechniquesGuide: React.FC<TechniquesGuideProps> = ({
  techniques,
  bookmarks,
  onToggleBookmark,
  searchQuery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTechnique, setActiveTechnique] = useState<CulinaryTechnique | null>(techniques[0] || null);

  const categories = ['All', 'Knife Skills', 'Heat & Searing', 'Emulsifications', 'Moist-Heat', 'Flavor Building'];

  const filtered = techniques.filter((t) => {
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    if (!searchQuery) return matchesCategory;
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      t.title.toLowerCase().includes(q) ||
      t.shortDesc.toLowerCase().includes(q) ||
      t.scienceExplanation.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });

  const isBookmarked = (id: string) => bookmarks.some((b) => b.targetId === id);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950/60 to-stone-900 p-6 rounded-2xl border border-stone-800 shadow-lg">
        <div className="flex items-center gap-2 text-amber-400 font-serif font-bold text-lg mb-1">
          <Flame className="w-5 h-5 text-amber-500" />
          <span>Culinary Science & Core Techniques</span>
        </div>
        <p className="text-stone-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Master the foundational physics & chemical reactions of cooking: protein denaturing, fat emulsification, Maillard crusts, and cellular moisture control.
        </p>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold'
                  : 'bg-stone-950/60 text-stone-300 border-stone-800 hover:bg-stone-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Techniques Directory */}
        <div className="lg:col-span-4 space-y-2.5 max-h-[650px] overflow-y-auto pr-1">
          {filtered.map((tech) => {
            const isSelected = activeTechnique?.id === tech.id;
            const bookmarked = isBookmarked(tech.id);

            return (
              <div
                key={tech.id}
                onClick={() => setActiveTechnique(tech)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-amber-950/40 border-amber-500/80 shadow-md ring-1 ring-amber-500/50'
                    : 'bg-stone-900/90 hover:bg-stone-850 border-stone-800 text-stone-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                    {tech.category}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(tech.title, tech.category, 'technique', tech.id);
                    }}
                    className={`p-1 rounded-md transition-colors ${
                      bookmarked ? 'text-amber-400 bg-amber-500/20' : 'text-stone-500 hover:text-stone-300'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" fill={bookmarked ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <h4 className="font-serif font-bold text-stone-100 text-sm mb-1">
                  {tech.title}
                </h4>
                <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                  {tech.shortDesc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Selected Technique Details */}
        <div className="lg:col-span-8 bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-xl text-stone-200">
          {activeTechnique ? (
            <div className="space-y-6">
              {/* Header */}
              <div className="border-b border-stone-800 pb-4">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {activeTechnique.category} • {activeTechnique.difficulty}
                  </span>
                  <button
                    onClick={() =>
                      onToggleBookmark(activeTechnique.title, activeTechnique.category, 'technique', activeTechnique.id)
                    }
                    className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium"
                  >
                    <Bookmark className="w-4 h-4" fill={isBookmarked(activeTechnique.id) ? 'currentColor' : 'none'} />
                    <span>{isBookmarked(activeTechnique.id) ? 'Bookmarked' : 'Bookmark Technique'}</span>
                  </button>
                </div>

                <h2 className="text-2xl font-serif font-bold text-stone-100 mb-2">
                  {activeTechnique.title}
                </h2>
                <p className="text-sm text-stone-300 leading-relaxed">
                  {activeTechnique.shortDesc}
                </p>
              </div>

              {/* The Science Explanation Box */}
              <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-4 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  The Culinary Science Behind It
                </h4>
                <p className="text-xs text-amber-100/90 leading-relaxed font-sans">
                  {activeTechnique.scienceExplanation}
                </p>
              </div>

              {/* Temperature & Equipment Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeTechnique.idealTemperatures && (
                  <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1.5">
                      <Thermometer className="w-3.5 h-3.5" />
                      Thermal Targets
                    </h5>
                    <p className="text-xs text-stone-300 font-mono">
                      {activeTechnique.idealTemperatures}
                    </p>
                  </div>
                )}

                <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5" />
                    Essential Equipment
                  </h5>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {activeTechnique.keyEquipment.map((eq, idx) => (
                      <span key={idx} className="bg-stone-800 text-stone-300 text-[11px] px-2 py-0.5 rounded">
                        {eq}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step-by-Step Execution */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Step-by-Step Execution
                </h4>
                <div className="space-y-2 text-xs">
                  {activeTechnique.stepByStep.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-stone-950 p-3 rounded-xl border border-stone-800">
                      <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 font-bold text-[11px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-stone-300 leading-relaxed pt-0.5">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mistakes & Pro Tips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-rose-950/20 border border-rose-900/40 p-4 rounded-xl space-y-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Common Mistakes to Avoid
                  </h5>
                  <ul className="space-y-1.5 text-xs text-rose-200/90 list-disc list-inside">
                    {activeTechnique.commonMistakes.map((m, idx) => (
                      <li key={idx} className="leading-relaxed">{m}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-emerald-950/20 border border-emerald-900/40 p-4 rounded-xl space-y-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Chef Pro Tips
                  </h5>
                  <ul className="space-y-1.5 text-xs text-emerald-200/90 list-disc list-inside">
                    {activeTechnique.proTips.map((tip, idx) => (
                      <li key={idx} className="leading-relaxed">{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-stone-500 text-sm italic">
              Select a technique from the list to view the complete culinary guide.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
