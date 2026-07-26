import React, { useState } from 'react';
import { Thermometer, Flame, ShieldAlert, CheckCircle2, Search, Info } from 'lucide-react';
import { DonenessItem, OilSmokePoint } from '../types';

interface TemperatureSafetyProps {
  donenessData: DonenessItem[];
  smokePointsData: OilSmokePoint[];
}

export const TemperatureSafety: React.FC<TemperatureSafetyProps> = ({
  donenessData,
  smokePointsData,
}) => {
  const [activeTab, setActiveTab] = useState<'meat' | 'oils' | 'safety'>('meat');
  const [unit, setUnit] = useState<'F' | 'C'>('F');
  const [oilSearch, setOilSearch] = useState('');

  const filteredOils = smokePointsData.filter((oil) => {
    if (!oilSearch) return true;
    const q = oilSearch.toLowerCase();
    return (
      oil.oilName.toLowerCase().includes(q) ||
      oil.flavorProfile.toLowerCase().includes(q) ||
      oil.bestUses.some((use) => use.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950/60 to-stone-900 p-6 rounded-2xl border border-stone-800 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-serif font-bold text-lg mb-1">
            <Thermometer className="w-5 h-5 text-amber-500" />
            <span>Thermal Targets & Food Safety Index</span>
          </div>
          <p className="text-stone-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Temperature accuracy is the single greatest factor in food safety, protein juiciness, and prevent oil burning.
          </p>
        </div>

        {/* F/C Toggle & Tab Selector */}
        <div className="flex items-center gap-2">
          <div className="bg-stone-950 border border-stone-800 rounded-xl p-1 flex items-center text-xs font-mono">
            <button
              onClick={() => setUnit('F')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                unit === 'F' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              °F
            </button>
            <button
              onClick={() => setUnit('C')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                unit === 'C' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              °C
            </button>
          </div>
        </div>
      </div>

      {/* View Switcher Bar */}
      <div className="flex items-center gap-2 border-b border-stone-800 pb-3">
        <button
          onClick={() => setActiveTab('meat')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
            activeTab === 'meat'
              ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md'
              : 'bg-stone-900 text-stone-300 border-stone-800 hover:bg-stone-800'
          }`}
        >
          Meat Doneness & Pull Temps
        </button>
        <button
          onClick={() => setActiveTab('oils')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
            activeTab === 'oils'
              ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md'
              : 'bg-stone-900 text-stone-300 border-stone-800 hover:bg-stone-800'
          }`}
        >
          Oil Smoke Points Table
        </button>
        <button
          onClick={() => setActiveTab('safety')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
            activeTab === 'safety'
              ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md'
              : 'bg-stone-900 text-stone-300 border-stone-800 hover:bg-stone-800'
          }`}
        >
          Danger Zone & Pasteurization
        </button>
      </div>

      {/* Tab 1: Meat Doneness */}
      {activeTab === 'meat' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {donenessData.map((item) => (
            <div
              key={item.id}
              className="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 shadow-xl space-y-4 hover:border-amber-500/50 transition-all"
            >
              <div className="flex items-start justify-between gap-2 border-b border-stone-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-amber-400 block">
                    {item.meatType}
                  </span>
                  <h4 className="font-serif font-bold text-stone-100 text-base">
                    {item.doneness}
                  </h4>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    item.safetyRating === 'USDA Recommended'
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                      : 'bg-amber-950 text-amber-300 border-amber-800'
                  }`}
                >
                  {item.safetyRating}
                </span>
              </div>

              {/* Temperature Targets */}
              <div className="grid grid-cols-2 gap-2 text-center font-mono">
                <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-800">
                  <span className="text-[10px] text-stone-500 uppercase block">Pull Off Heat</span>
                  <span className="text-amber-400 font-bold text-sm">
                    {unit === 'F' ? `${item.pullTempF}°F` : `${item.pullTempC}°C`}
                  </span>
                </div>
                <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-800">
                  <span className="text-[10px] text-stone-500 uppercase block">Final Rest Target</span>
                  <span className="text-rose-400 font-bold text-sm">
                    {unit === 'F' ? `${item.finalTempF}°F` : `${item.finalTempC}°C`}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-stone-300">
                <p className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Visual: </strong>
                    {item.visualCues}
                  </span>
                </p>
                <p className="text-stone-400 text-[11px] bg-stone-950/60 p-2 rounded-lg border border-stone-800/80">
                  <strong>Resting: </strong>
                  Rest for {item.restTimeMinutes} mins. {item.notes}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Oil Smoke Points */}
      {activeTab === 'oils' && (
        <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
            <div>
              <h3 className="font-serif font-bold text-stone-100 text-lg">
                Cooking Oil Smoke Point Matrix
              </h3>
              <p className="text-xs text-stone-400">
                Exceeding an oil's smoke point breaks triglycerides down into carcinogenic acrolein and bitter off-flavors.
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Filter oils (e.g., Avocado, Ghee)..."
                value={oilSearch}
                onChange={(e) => setOilSearch(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans border-collapse">
              <thead>
                <tr className="border-b border-stone-800 text-amber-400 font-mono text-[11px] uppercase tracking-wider bg-stone-950/60">
                  <th className="p-3">Cooking Fat / Oil</th>
                  <th className="p-3">Smoke Point ({unit})</th>
                  <th className="p-3">Flavor Profile</th>
                  <th className="p-3">Ideal Cooking Uses</th>
                  <th className="p-3">Unsuitable For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/80">
                {filteredOils.map((oil) => {
                  const tempDisplay = unit === 'F' ? `${oil.smokePointF}°F` : `${oil.smokePointC}°C`;
                  const isHighHeat = oil.smokePointF >= 450;

                  return (
                    <tr key={oil.id} className="hover:bg-stone-850/60 transition-colors">
                      <td className="p-3 font-serif font-bold text-stone-100 whitespace-nowrap">
                        {oil.oilName}
                      </td>
                      <td className="p-3 font-mono font-bold whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            isHighHeat
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : 'bg-amber-950 text-amber-400 border border-amber-800'
                          }`}
                        >
                          {tempDisplay}
                        </span>
                      </td>
                      <td className="p-3 text-stone-300">{oil.flavorProfile}</td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {oil.bestUses.map((use, idx) => (
                            <span key={idx} className="bg-stone-800 text-stone-200 text-[10px] px-2 py-0.5 rounded">
                              {use}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-3 text-rose-300/80 text-[11px]">
                        {oil.unsuitableFor.join(', ')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Danger Zone & Safety */}
      {activeTab === 'safety' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-serif font-bold text-lg border-b border-stone-800 pb-3">
              <ShieldAlert className="w-5 h-5" />
              <span>The Food Danger Zone Rule</span>
            </div>

            <div className="bg-rose-950/30 border border-rose-900/50 p-4 rounded-xl text-xs space-y-2 text-rose-200">
              <p className="font-semibold text-sm">
                40°F to 140°F (4°C to 60°C)
              </p>
              <p className="leading-relaxed">
                Bacteria multiply rapidly in this temperature range, doubling in volume as quickly as every 20 minutes.
              </p>
              <div className="font-mono bg-stone-950/80 p-2.5 rounded-lg border border-rose-900/60 text-[11px]">
                <strong>Maximum Safe Limit: </strong>
                Never leave perishable foods in the Danger Zone for more than 2 hours total (1 hour if ambient temp &gt; 90°F / 32°C).
              </div>
            </div>

            <div className="space-y-2 text-xs text-stone-300">
              <h5 className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">
                Essential Cooling & Thawing Protocols
              </h5>
              <ul className="space-y-1.5 list-disc list-inside text-stone-400">
                <li>Never thaw frozen meat on the kitchen counter at room temp. Always thaw in the refrigerator or under cold running water.</li>
                <li>Divide large pots of hot soup into shallow containers before chilling to bring core temp below 40°F within 2 hours.</li>
              </ul>
            </div>
          </div>

          <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-serif font-bold text-lg border-b border-stone-800 pb-3">
              <Info className="w-5 h-5" />
              <span>Thermal Pasteurization Time vs Temp</span>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              Pasteurization (killing 99.9999% of bacteria) is a function of both <strong>temperature AND time</strong>.
            </p>

            <div className="space-y-2 text-xs font-mono">
              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800 flex justify-between items-center">
                <span className="text-stone-300">Chicken at 165°F (74°C)</span>
                <span className="text-emerald-400 font-bold">Instant (0 seconds)</span>
              </div>
              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800 flex justify-between items-center">
                <span className="text-stone-300">Chicken at 155°F (68°C)</span>
                <span className="text-amber-400 font-bold">45 seconds rest</span>
              </div>
              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800 flex justify-between items-center">
                <span className="text-stone-300">Chicken at 150°F (65°C)</span>
                <span className="text-amber-400 font-bold">3.0 minutes rest</span>
              </div>
            </div>

            <p className="text-[11px] text-stone-400 italic">
              *Poultry pulled at 155°F with a 5-minute rested cover achieves full safety while remaining significantly juicier than overcooked 165°F dry meat.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
