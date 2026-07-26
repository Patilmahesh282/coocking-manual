import React, { useState } from 'react';
import { Sparkles, Send, Loader2, Bot, HelpCircle, BookPlus, AlertCircle } from 'lucide-react';
import { CookingManual } from '../types';

interface ChefAIAssistantProps {
  onManualGenerated: (manual: CookingManual) => void;
}

export const ChefAIAssistant: React.FC<ChefAIAssistantProps> = ({ onManualGenerated }) => {
  const [activeTab, setActiveTab] = useState<'ask' | 'generator'>('ask');

  // Q&A State
  const [question, setQuestion] = useState('');
  const [contextDish, setContextDish] = useState('');
  const [loadingQA, setLoadingQA] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [errorQA, setErrorQA] = useState<string | null>(null);

  // Generator State
  const [genDishName, setGenDishName] = useState('');
  const [genDietary, setGenDietary] = useState('');
  const [genServings, setGenServings] = useState<number>(4);
  const [loadingGen, setLoadingGen] = useState(false);
  const [errorGen, setErrorGen] = useState<string | null>(null);

  // Preset Questions
  const presetQuestions = [
    { title: 'Fix Split Sauce', query: 'My mayonnaise/hollandaise split and separated into oil. How do I rescue it step by step?' },
    { title: 'Tough Steak Fix', query: 'Why did my steak turn out tough and gray instead of juicy with a brown crust?' },
    { title: 'Salt Adjustment', query: 'I accidentally over-salted my soup or sauce. How do I rebalance the flavor without watering it down?' },
    { title: 'Caramel Burning', query: 'My sugar caramel went dark and bitter. How do I control temperature for golden caramel?' }
  ];

  const handleAsk = async (qText?: string) => {
    const queryToSubmit = qText || question;
    if (!queryToSubmit.trim()) return;

    setLoadingQA(true);
    setErrorQA(null);
    setAnswer(null);

    try {
      const res = await fetch('/api/chef/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: queryToSubmit, contextDish }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to get answer from Chef AI');
      }

      setAnswer(data.answer);
    } catch (err: any) {
      setErrorQA(err?.message || 'An error occurred while asking Chef AI.');
    } finally {
      setLoadingQA(false);
    }
  };

  const handleGenerateManual = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!genDishName.trim()) return;

    setLoadingGen(true);
    setErrorGen(null);

    try {
      const res = await fetch('/api/chef/generate-manual', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dishName: genDishName.trim(),
          dietaryPrefs: genDietary.trim(),
          servingSize: genServings,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate custom manual.');
      }

      const generatedManual: CookingManual = {
        ...data.manual,
        id: `custom-${Date.now()}`,
        isCustomGenerated: true,
      };

      onManualGenerated(generatedManual);
    } catch (err: any) {
      setErrorGen(err?.message || 'An error occurred while generating the manual.');
    } finally {
      setLoadingGen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/80 via-stone-900 to-amber-900/60 p-6 rounded-2xl border border-amber-800/40 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-serif font-bold text-lg mb-1">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Ask Executive Chef AI & Custom Manual Generator</span>
          </div>
          <p className="text-stone-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Powered by Gemini AI. Get instant culinary troubleshooting, kitchen chemistry explanations, or create tailored step-by-step cooking manuals for any dish.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('ask')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
              activeTab === 'ask'
                ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md'
                : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-800'
            }`}
          >
            Kitchen Q&A Troubleshooter
          </button>
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
              activeTab === 'generator'
                ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md'
                : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-800'
            }`}
          >
            Create Custom Dish Manual
          </button>
        </div>
      </div>

      {/* Tab 1: Kitchen Q&A */}
      {activeTab === 'ask' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Quick Presets */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 px-1">
              Popular Kitchen Emergencies
            </h4>

            <div className="space-y-2">
              {presetQuestions.map((pq, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuestion(pq.query);
                    handleAsk(pq.query);
                  }}
                  className="w-full text-left p-3 rounded-xl bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-amber-500/50 transition-all text-xs space-y-1 group"
                >
                  <span className="font-serif font-bold text-amber-400 block group-hover:text-amber-300">
                    {pq.title}
                  </span>
                  <p className="text-stone-400 line-clamp-2 text-[11px] leading-relaxed">
                    {pq.query}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Ask Input & Response Box */}
          <div className="lg:col-span-8 bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-6 text-stone-200">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Bot className="w-4 h-4" />
                  Ask Executive Chef AI
                </label>
                <input
                  type="text"
                  placeholder="Context dish (e.g., Sourdough, Carbonara)..."
                  value={contextDish}
                  onChange={(e) => setContextDish(e.target.value)}
                  className="bg-stone-950 border border-stone-800 rounded-lg px-2.5 py-1 text-xs text-amber-300 placeholder-stone-600 focus:outline-none"
                />
              </div>

              <div className="flex gap-2">
                <textarea
                  rows={3}
                  placeholder="Ask anything (e.g., 'Why did my custard curdle?', 'How do I fix a salty tomato sauce?', 'What can I substitute for cream of tartar?')..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="flex-1 bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 resize-none"
                />
                <button
                  onClick={() => handleAsk()}
                  disabled={loadingQA || !question.trim()}
                  className={`px-5 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${
                    loadingQA || !question.trim()
                      ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
                      : 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md'
                  }`}
                >
                  {loadingQA ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorQA && (
              <div className="p-4 bg-rose-950/40 border border-rose-900/60 rounded-xl text-xs text-rose-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                <span>{errorQA}</span>
              </div>
            )}

            {/* Response Answer Box */}
            {answer && (
              <div className="bg-stone-950 p-5 rounded-xl border border-amber-500/40 space-y-3">
                <div className="flex items-center gap-2 border-b border-stone-800 pb-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="font-serif font-bold text-amber-400 text-sm">
                    Executive Chef Guidance
                  </span>
                </div>
                <div className="text-xs text-stone-200 leading-relaxed font-sans whitespace-pre-line space-y-2">
                  {answer}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Custom Cooking Manual Generator */}
      {activeTab === 'generator' && (
        <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-xl max-w-2xl mx-auto space-y-6 text-stone-200">
          <div className="border-b border-stone-800 pb-4">
            <h3 className="font-serif font-bold text-xl text-stone-100 flex items-center gap-2">
              <BookPlus className="w-5 h-5 text-amber-500" />
              Generate Custom Cooking Manual
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              Enter any dish name and preferences. Gemini AI will write a complete, professional cooking manual with timed steps, equipment, and science tips.
            </p>
          </div>

          <form onSubmit={handleGenerateManual} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase text-amber-400 block mb-1">
                Dish Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Beef Wellington, Pad Thai, Chocolate Souffle, Vegan Ramen..."
                value={genDishName}
                onChange={(e) => setGenDishName(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase text-amber-400 block mb-1">
                  Dietary Preferences / Constraints
                </label>
                <input
                  type="text"
                  placeholder="e.g. Gluten-free, Dairy-free, Low-sodium, Keto..."
                  value={genDietary}
                  onChange={(e) => setGenDietary(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-amber-400 block mb-1">
                  Serving Size
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={genServings}
                  onChange={(e) => setGenServings(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-amber-300 font-mono font-bold focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {errorGen && (
              <div className="p-3 bg-rose-950/40 border border-rose-900/60 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorGen}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loadingGen || !genDishName.trim()}
              className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                loadingGen || !genDishName.trim()
                  ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
                  : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
              }`}
            >
              {loadingGen ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating Detailed Cooking Manual...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Complete Manual & Steps</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
