import React, { useState } from 'react';
import { Calculator, Sparkles, Scale, Info, Check } from 'lucide-react';
import { RatioItem } from '../types';

interface RatioCalculatorProps {
  ratios: RatioItem[];
}

export const RatioCalculator: React.FC<RatioCalculatorProps> = ({ ratios }) => {
  const [selectedRatio, setSelectedRatio] = useState<RatioItem>(ratios[0]);
  const [baseAmount, setBaseAmount] = useState<number>(ratios[0].defaultBaseAmount);

  const handleSelectRatio = (item: RatioItem) => {
    setSelectedRatio(item);
    setBaseAmount(item.defaultBaseAmount);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950/60 to-stone-900 p-6 rounded-2xl border border-stone-800 shadow-lg">
        <div className="flex items-center gap-2 text-amber-400 font-serif font-bold text-lg mb-1">
          <Calculator className="w-5 h-5 text-amber-500" />
          <span>Interactive Culinary Ratio Mechanics</span>
        </div>
        <p className="text-stone-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Master chef baking and sauce mechanics operate on strict ratios rather than static recipes. Scale any base ingredient to calculate mathematically flawless quantities.
        </p>

        {/* Ratio Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 scrollbar-none">
          {ratios.map((r) => (
            <button
              key={r.id}
              onClick={() => handleSelectRatio(r)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                selectedRatio.id === r.id
                  ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold shadow-md'
                  : 'bg-stone-950/60 text-stone-300 border-stone-800 hover:bg-stone-800'
              }`}
            >
              {r.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Slider & Base Quantity Input */}
        <div className="lg:col-span-5 bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="border-b border-stone-800 pb-4">
            <span className="text-[10px] font-mono uppercase text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
              {selectedRatio.category}
            </span>
            <h3 className="text-xl font-serif font-bold text-stone-100 mt-2 mb-1">
              {selectedRatio.name}
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              {selectedRatio.description}
            </p>
          </div>

          {/* Interactive Base Slider Control */}
          <div className="space-y-3 bg-stone-950 p-4 rounded-xl border border-stone-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" />
                Base: {selectedRatio.baseIngredientName}
              </label>
              <span className="font-mono text-sm font-bold text-amber-400">
                {baseAmount} {selectedRatio.baseUnit}
              </span>
            </div>

            <input
              type="range"
              min={Math.max(10, Math.floor(selectedRatio.defaultBaseAmount * 0.1))}
              max={selectedRatio.defaultBaseAmount * 5}
              step={selectedRatio.baseUnit === 'ml' || selectedRatio.baseUnit === 'g' ? 5 : 0.5}
              value={baseAmount}
              onChange={(e) => setBaseAmount(parseFloat(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />

            <div className="flex items-center justify-between text-[11px] font-mono text-stone-500">
              <span>Min ({Math.max(10, Math.floor(selectedRatio.defaultBaseAmount * 0.1))})</span>
              <input
                type="number"
                value={baseAmount}
                onChange={(e) => setBaseAmount(Math.max(1, parseFloat(e.target.value) || 1))}
                className="w-20 bg-stone-900 border border-stone-700 text-amber-300 font-bold px-2 py-0.5 rounded text-center"
              />
              <span>Max ({selectedRatio.defaultBaseAmount * 5})</span>
            </div>
          </div>

          {/* Chef Advice Box */}
          <div className="bg-amber-950/30 border border-amber-500/30 p-4 rounded-xl space-y-1.5">
            <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Chef Ratio Principle
            </h5>
            <p className="text-xs text-amber-100/90 leading-relaxed">
              {selectedRatio.chefTip}
            </p>
          </div>
        </div>

        {/* Right Output Recipe Cards */}
        <div className="lg:col-span-7 bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-4 text-stone-200">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Calculated Component Breakdown
            </h4>
            <span className="text-[11px] font-mono text-stone-400">
              Base = {baseAmount} {selectedRatio.baseUnit}
            </span>
          </div>

          {/* Base Ingredient Display */}
          <div className="bg-amber-950/40 border border-amber-500/60 p-4 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400 block">
                Primary Base (1.0 Ratio Part)
              </span>
              <span className="font-serif font-bold text-stone-100 text-base">
                {selectedRatio.baseIngredientName}
              </span>
            </div>
            <span className="font-mono text-xl font-bold text-amber-300">
              {baseAmount} {selectedRatio.baseUnit}
            </span>
          </div>

          {/* Components Cards */}
          <div className="space-y-2.5">
            {selectedRatio.components.map((comp, idx) => {
              const calculatedQty = Math.round(baseAmount * comp.ratioMultiplier * 100) / 100;

              return (
                <div
                  key={idx}
                  className="bg-stone-950 p-4 rounded-xl border border-stone-800 flex items-center justify-between hover:border-stone-700 transition-all"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-500" />
                      <span className="font-serif font-bold text-stone-200 text-sm">
                        {comp.name}
                      </span>
                    </div>
                    {comp.notes && (
                      <p className="text-[11px] text-stone-400 pl-5">
                        {comp.notes}
                      </p>
                    )}
                  </div>

                  <div className="text-right font-mono">
                    <span className="text-base font-bold text-amber-400 block">
                      {calculatedQty} {comp.unit}
                    </span>
                    <span className="text-[10px] text-stone-500">
                      ({comp.ratioMultiplier}x multiplier)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-stone-950/50 rounded-xl border border-stone-800 text-[11px] text-stone-400 flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              All ratios use baker percentages and volume-to-mass conversions where 1ml water/milk ≈ 1g mass.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
