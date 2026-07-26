import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  Circle,
  RotateCcw,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { CookingManual, KitchenTimer } from '../types';

interface CookingAssistantModeProps {
  manual: CookingManual;
  onExitAssistant: () => void;
  onAddTimer: (label: string, seconds: number) => void;
  timers: KitchenTimer[];
  onToggleTimer: (id: string) => void;
}

export const CookingAssistantMode: React.FC<CookingAssistantModeProps> = ({
  manual,
  onExitAssistant,
  onAddTimer,
  timers,
  onToggleTimer,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoVoice, setAutoVoice] = useState(true);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});

  const currentStep = manual.steps[currentStepIndex] || manual.steps[0];
  const totalSteps = manual.steps.length;

  // Web Speech API Voice Readout
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95; // slightly slower for cooking clarity
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Speak automatically when step changes if autoVoice is enabled
  useEffect(() => {
    if (autoVoice && currentStep) {
      speakText(`Step ${currentStep.stepNumber}. ${currentStep.title}. ${currentStep.instruction}`);
    }
    return () => {
      stopSpeaking();
    };
  }, [currentStepIndex, autoVoice]);

  const toggleCheckIngredient = (idx: number) => {
    setCheckedIngredients((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Check if a timer for this step is already running
  const stepTimerLabel = `Step ${currentStep.stepNumber}: ${currentStep.title}`;
  const existingTimer = timers.find((t) => t.label.includes(`Step ${currentStep.stepNumber}`));

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-stone-100">
      {/* Top Controls Bar */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onExitAssistant}
            className="p-2 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-300 transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Exit Assistant</span>
          </button>
          <div>
            <h2 className="font-serif font-bold text-lg sm:text-xl text-stone-100">
              {manual.title}
            </h2>
            <p className="text-xs text-stone-400">
              Step {currentStepIndex + 1} of {totalSteps} • Hands-Free Cooking Mode
            </p>
          </div>
        </div>

        {/* Voice Readout Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (isSpeaking) {
                stopSpeaking();
              } else {
                speakText(`Step ${currentStep.stepNumber}. ${currentStep.title}. ${currentStep.instruction}`);
              }
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
              isSpeaking
                ? 'bg-amber-500 text-stone-950 border-amber-400 animate-pulse'
                : 'bg-stone-950 text-stone-200 border-stone-800 hover:bg-stone-800'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            <span>{isSpeaking ? 'Stop Speaking' : 'Read Step Out Loud'}</span>
          </button>

          <label className="flex items-center gap-2 text-xs text-stone-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={autoVoice}
              onChange={(e) => setAutoVoice(e.target.checked)}
              className="accent-amber-500 rounded"
            />
            <span>Auto Voice</span>
          </label>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-stone-900 h-2 rounded-full overflow-hidden border border-stone-800">
        <div
          className="bg-amber-500 h-full transition-all duration-300"
          style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
        />
      </div>

      {/* Main Focus Step Card */}
      <div className="bg-stone-900/95 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-amber-500 text-stone-950 font-bold text-lg flex items-center justify-center shadow-lg">
              {currentStep.stepNumber}
            </span>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-stone-100">
              {currentStep.title}
            </h3>
          </div>

          {/* Step Timer Quick Trigger */}
          {currentStep.timerSeconds && (
            <div>
              {existingTimer ? (
                <button
                  onClick={() => onToggleTimer(existingTimer.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 border ${
                    existingTimer.isRunning
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 animate-pulse'
                      : 'bg-stone-800 text-stone-300 border-stone-700'
                  }`}
                >
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>
                    {existingTimer.isRunning ? 'Timer Running' : 'Timer Paused'}
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => onAddTimer(stepTimerLabel, currentStep.timerSeconds!)}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all font-mono"
                >
                  <Clock className="w-4 h-4" />
                  <span>Start {Math.round(currentStep.timerSeconds / 60)}m Timer</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Big Instruction Text */}
        <p className="text-lg sm:text-xl text-stone-200 leading-relaxed font-sans font-medium tracking-wide">
          {currentStep.instruction}
        </p>

        {/* Chef Pro Tip */}
        {currentStep.proTip && (
          <div className="bg-amber-950/40 border border-amber-500/40 rounded-2xl p-4 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-amber-200 leading-relaxed">
              <strong className="text-amber-400 font-bold uppercase tracking-wider block mb-0.5">
                Chef Pro Tip
              </strong>
              {currentStep.proTip}
            </div>
          </div>
        )}
      </div>

      {/* Big Touch Control Buttons for Dirty Hands */}
      <div className="grid grid-cols-2 gap-4">
        <button
          disabled={currentStepIndex === 0}
          onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
          className={`py-5 rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 transition-all shadow-xl border ${
            currentStepIndex === 0
              ? 'bg-stone-950/40 text-stone-600 border-stone-900 cursor-not-allowed'
              : 'bg-stone-900 hover:bg-stone-800 text-stone-200 border-stone-700 active:scale-[0.98]'
          }`}
        >
          <ChevronLeft className="w-6 h-6" />
          <span>Previous Step</span>
        </button>

        <button
          disabled={currentStepIndex === totalSteps - 1}
          onClick={() => setCurrentStepIndex((prev) => Math.min(totalSteps - 1, prev + 1))}
          className={`py-5 rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 transition-all shadow-xl border ${
            currentStepIndex === totalSteps - 1
              ? 'bg-stone-950/40 text-stone-600 border-stone-900 cursor-not-allowed'
              : 'bg-amber-500 hover:bg-amber-400 text-stone-950 border-amber-400 active:scale-[0.98]'
          }`}
        >
          <span>Next Step</span>
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Ingredient Checklist Drawer */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-3">
        <div className="flex items-center justify-between border-b border-stone-800 pb-2">
          <h4 className="font-serif font-bold text-stone-100 text-base flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-500" />
            <span>Recipe Ingredient Checklist</span>
          </h4>
          <span className="text-xs text-stone-400 font-mono">
            {Object.values(checkedIngredients).filter(Boolean).length} / {manual.ingredients.length} Prepped
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {manual.ingredients.map((ing, idx) => {
            const isChecked = !!checkedIngredients[idx];
            return (
              <div
                key={idx}
                onClick={() => toggleCheckIngredient(idx)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  isChecked
                    ? 'bg-stone-950/60 border-stone-800 text-stone-500 line-through'
                    : 'bg-stone-950 border-stone-800 text-stone-200 hover:border-amber-500/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {isChecked ? (
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-stone-500 shrink-0" />
                  )}
                  <span>{ing.name}</span>
                </div>
                <span className="font-mono text-amber-400 font-semibold">
                  {ing.amount} {ing.unit}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
