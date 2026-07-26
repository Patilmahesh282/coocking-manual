import React, { useState } from 'react';
import { RefreshCw, Search, ArrowRightLeft, Scale, Sparkles } from 'lucide-react';
import { SubstitutionItem } from '../types';

interface SubstitutionsConverterProps {
  substitutions: SubstitutionItem[];
}

export const SubstitutionsConverter: React.FC<SubstitutionsConverterProps> = ({
  substitutions,
}) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'converter'>('matrix');
  const [searchQuery, setSearchQuery] = useState('');

  // Unit Converter State
  const [convType, setConvType] = useState<'volume' | 'mass' | 'temp'>('volume');
  const [inputValue, setInputValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState('cups');
  const [toUnit, setToUnit] = useState('ml');

  const filteredSubs = substitutions.filter((sub) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      sub.ingredient.toLowerCase().includes(q) ||
      sub.bestSubstitute.toLowerCase().includes(q) ||
      sub.category.toLowerCase().includes(q)
    );
  });

  // Calculate Unit Conversion
  const calculateConversion = (): number => {
    const val = Number(inputValue) || 0;
    if (convType === 'temp') {
      if (fromUnit === 'F' && toUnit === 'C') return Math.round(((val - 32) * 5) / 9 * 10) / 10;
      if (fromUnit === 'C' && toUnit === 'F') return Math.round(((val * 9) / 5 + 32) * 10) / 10;
      return val;
    }

    if (convType === 'volume') {
      // Base unit: ml
      const toMl: Record<string, number> = {
        cups: 236.588,
        ml: 1,
        tbsp: 14.7868,
        tsp: 4.92892,
        floz: 29.5735,
        liters: 1000,
      };
      const mlVal = val * (toMl[fromUnit] || 1);
      const converted = mlVal / (toMl[toUnit] || 1);
      return Math.round(converted * 100) / 100;
    }

    if (convType === 'mass') {
      // Base unit: grams
      const toGrams: Record<string, number> = {
        g: 1,
        oz: 28.3495,
        lbs: 453.592,
        kg: 1000,
      };
      const gVal = val * (toGrams[fromUnit] || 1);
      const converted = gVal / (toGrams[toUnit] || 1);
      return Math.round(converted * 100) / 100;
    }

    return val;
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950/60 to-stone-900 p-6 rounded-2xl border border-stone-800 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-serif font-bold text-lg mb-1">
            <RefreshCw className="w-5 h-5 text-amber-500" />
            <span>Emergency Substitutions & Measurement Converter</span>
          </div>
          <p className="text-stone-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Missing a key ingredient? Convert exact volumetric measurements or find functional culinary replacements without ruining taste or texture.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
              activeTab === 'matrix'
                ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md'
                : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-800'
            }`}
          >
            Substitutions Matrix
          </button>
          <button
            onClick={() => setActiveTab('converter')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
              activeTab === 'converter'
                ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md'
                : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-800'
            }`}
          >
            Unit Converter Calculator
          </button>
        </div>
      </div>

      {/* View 1: Substitutions Matrix */}
      {activeTab === 'matrix' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 bg-stone-900 p-4 rounded-xl border border-stone-800">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search missing ingredient (e.g. Buttermilk, Heavy Cream, Wine)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSubs.map((item) => (
              <div
                key={item.id}
                className="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 shadow-xl space-y-3 hover:border-amber-500/50 transition-all"
              >
                <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                  <span className="text-[10px] font-mono uppercase text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono text-stone-400 bg-stone-800 px-2 py-0.5 rounded">
                    Ratio: {item.ratioFormula}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-stone-500 uppercase font-bold block">Original Needed</span>
                  <h4 className="font-serif font-bold text-stone-100 text-base">
                    {item.ingredient}
                  </h4>
                </div>

                <div className="bg-amber-950/30 border border-amber-500/30 p-3 rounded-xl">
                  <span className="text-[10px] text-amber-400 font-bold uppercase block mb-1">
                    Best Culinary Replacement
                  </span>
                  <p className="text-sm font-semibold text-amber-200">
                    {item.bestSubstitute}
                  </p>
                </div>

                <div className="space-y-1.5 text-xs text-stone-300 pt-1">
                  <p>
                    <strong className="text-stone-400">Preparation & Adjustment: </strong>
                    {item.howToAdjust}
                  </p>
                  <p className="text-[11px] text-stone-400 italic">
                    <strong className="text-amber-500 font-normal">Taste/Texture Impact: </strong>
                    {item.impactOnDish}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View 2: Unit Converter Calculator */}
      {activeTab === 'converter' && (
        <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-xl max-w-2xl mx-auto space-y-6 text-stone-200">
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <h3 className="font-serif font-bold text-lg text-stone-100 flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-500" />
              Kitchen Measurement Converter
            </h3>

            {/* Type selector */}
            <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800 text-xs font-mono">
              {(['volume', 'mass', 'temp'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setConvType(t);
                    if (t === 'volume') {
                      setFromUnit('cups');
                      setToUnit('ml');
                    } else if (t === 'mass') {
                      setFromUnit('g');
                      setToUnit('oz');
                    } else {
                      setFromUnit('F');
                      setToUnit('C');
                    }
                  }}
                  className={`px-3 py-1 rounded-lg capitalize font-bold transition-all ${
                    convType === t ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            {/* Input Value & Unit */}
            <div className="sm:col-span-5 bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-2">
              <label className="text-[10px] uppercase font-bold text-stone-400 block">From Value</label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
                className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-amber-300 font-mono font-bold text-lg focus:outline-none focus:border-amber-500"
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-1.5 text-xs text-stone-200 focus:outline-none"
              >
                {convType === 'volume' && (
                  <>
                    <option value="cups">Cups</option>
                    <option value="ml">Milliliters (ml)</option>
                    <option value="tbsp">Tablespoons (tbsp)</option>
                    <option value="tsp">Teaspoons (tsp)</option>
                    <option value="floz">Fluid Ounces (fl oz)</option>
                    <option value="liters">Liters (L)</option>
                  </>
                )}
                {convType === 'mass' && (
                  <>
                    <option value="g">Grams (g)</option>
                    <option value="oz">Ounces (oz)</option>
                    <option value="lbs">Pounds (lbs)</option>
                    <option value="kg">Kilograms (kg)</option>
                  </>
                )}
                {convType === 'temp' && (
                  <>
                    <option value="F">Fahrenheit (°F)</option>
                    <option value="C">Celsius (°C)</option>
                  </>
                )}
              </select>
            </div>

            {/* Equals Icon */}
            <div className="sm:col-span-2 flex justify-center py-2 sm:py-0">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                <ArrowRightLeft className="w-4 h-4" />
              </div>
            </div>

            {/* Converted Result & Unit */}
            <div className="sm:col-span-5 bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-2">
              <label className="text-[10px] uppercase font-bold text-stone-400 block">Converted Result</label>
              <div className="w-full bg-stone-900 border border-amber-500/50 rounded-lg px-3 py-2 text-amber-400 font-mono font-bold text-lg">
                {calculateConversion()}
              </div>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-1.5 text-xs text-stone-200 focus:outline-none"
              >
                {convType === 'volume' && (
                  <>
                    <option value="ml">Milliliters (ml)</option>
                    <option value="cups">Cups</option>
                    <option value="tbsp">Tablespoons (tbsp)</option>
                    <option value="tsp">Teaspoons (tsp)</option>
                    <option value="floz">Fluid Ounces (fl oz)</option>
                    <option value="liters">Liters (L)</option>
                  </>
                )}
                {convType === 'mass' && (
                  <>
                    <option value="oz">Ounces (oz)</option>
                    <option value="g">Grams (g)</option>
                    <option value="lbs">Pounds (lbs)</option>
                    <option value="kg">Kilograms (kg)</option>
                  </>
                )}
                {convType === 'temp' && (
                  <>
                    <option value="C">Celsius (°C)</option>
                    <option value="F">Fahrenheit (°F)</option>
                  </>
                )}
              </select>
            </div>
          </div>

          <div className="p-4 bg-amber-950/30 border border-amber-500/30 rounded-xl text-xs text-amber-200 space-y-1">
            <span className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Pro Chef Tip on Volume vs Mass:
            </span>
            <p className="text-stone-300 leading-relaxed text-[11px]">
              Measuring flour and sugar by volume (cups) varies up to 25% depending on how tightly packed the flour is. Professional bakers always use mass (grams) for consistent flour hydration and gluten structure.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
