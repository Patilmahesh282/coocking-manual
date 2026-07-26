import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Plus, Trash2, Clock, Volume2 } from 'lucide-react';
import { KitchenTimer } from '../types';

interface TimerDrawerProps {
  timers: KitchenTimer[];
  onAddTimer: (label: string, seconds: number) => void;
  onToggleTimer: (id: string) => void;
  onResetTimer: (id: string) => void;
  onDeleteTimer: (id: string) => void;
}

// Sound synthesizer using Web Audio API for timer alarm
export const playAlarmSound = () => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    
    // Play 3 pleasant double-beeps
    const playBeep = (time: number, freq: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(0.15, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + 0.15);
    };

    const now = ctx.currentTime;
    playBeep(now, 880);
    playBeep(now + 0.2, 880);
    playBeep(now + 0.6, 1046.5);
    playBeep(now + 0.8, 1046.5);
    playBeep(now + 1.2, 1318.5);
  } catch (e) {
    console.warn('AudioContext not supported or blocked', e);
  }
};

export const formatTime = (totalSec: number) => {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

export const TimerDrawer: React.FC<TimerDrawerProps> = ({
  timers,
  onAddTimer,
  onToggleTimer,
  onResetTimer,
  onDeleteTimer,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customLabel, setCustomLabel] = useState('');
  const [customMinutes, setCustomMinutes] = useState(5);

  const activeCount = timers.filter((t) => t.isRunning).length;

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (customMinutes <= 0) return;
    onAddTimer(customLabel.trim() || `Timer (${customMinutes}m)`, customMinutes * 60);
    setCustomLabel('');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating Toggle Button */}
      <button
        id="timer-toggle-button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-lg font-medium text-sm transition-all border ${
          activeCount > 0
            ? 'bg-amber-600 hover:bg-amber-700 text-white border-amber-500 animate-pulse'
            : 'bg-stone-900 hover:bg-stone-800 text-amber-100 border-stone-700'
        }`}
      >
        <Clock className="w-4 h-4 text-amber-400" />
        <span>
          {activeCount > 0
            ? `${activeCount} Active ${activeCount === 1 ? 'Timer' : 'Timers'}`
            : 'Kitchen Timers'}
        </span>
        {timers.length > 0 && (
          <span className="bg-amber-500/30 text-amber-200 text-xs px-2 py-0.5 rounded-full font-mono">
            {timers.length}
          </span>
        )}
      </button>

      {/* Expanded Timer Panel */}
      {isOpen && (
        <div className="absolute bottom-14 right-0 w-80 sm:w-96 bg-stone-900/95 backdrop-blur-md text-stone-100 rounded-2xl shadow-2xl border border-stone-800 p-4 space-y-4 max-h-[80vh] flex flex-col">
          <div className="flex items-center justify-between border-b border-stone-800 pb-2">
            <div className="flex items-center gap-2 text-amber-400 font-serif font-semibold text-base">
              <Clock className="w-5 h-5" />
              <span>Multi-Timer Deck</span>
            </div>
            <button
              onClick={() => playAlarmSound()}
              title="Test Alarm Sound"
              className="p-1 text-stone-400 hover:text-amber-400 transition-colors"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Preset Buttons */}
          <div className="grid grid-cols-4 gap-1.5 text-xs">
            {[1, 3, 5, 10].map((mins) => (
              <button
                key={mins}
                onClick={() => onAddTimer(`${mins} min timer`, mins * 60)}
                className="bg-stone-800 hover:bg-stone-700 text-stone-300 py-1.5 rounded-lg border border-stone-700/60 font-mono transition-colors"
              >
                +{mins}m
              </button>
            ))}
          </div>

          {/* Custom Timer Input Form */}
          <form onSubmit={handleAddCustom} className="flex gap-2">
            <input
              type="text"
              placeholder="Timer name..."
              value={customLabel}
              onChange={(e) => setCustomLabel(e.target.value)}
              className="flex-1 bg-stone-950/80 border border-stone-700/80 rounded-lg px-2.5 py-1.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
            <input
              type="number"
              min="1"
              max="180"
              value={customMinutes}
              onChange={(e) => setCustomMinutes(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 bg-stone-950/80 border border-stone-700/80 rounded-lg px-2 py-1.5 text-xs text-center text-amber-300 font-mono focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs px-3 rounded-lg flex items-center justify-center transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </form>

          {/* Active Timers List */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {timers.length === 0 ? (
              <p className="text-stone-500 text-xs text-center py-6 italic">
                No active kitchen timers. Use quick presets above or start step timers from any cooking manual guide.
              </p>
            ) : (
              timers.map((timer) => {
                const isFinished = timer.remainingSeconds === 0;
                const progressPct =
                  ((timer.totalSeconds - timer.remainingSeconds) / timer.totalSeconds) * 100;

                return (
                  <div
                    key={timer.id}
                    className={`p-3 rounded-xl border transition-all ${
                      isFinished
                        ? 'bg-rose-950/40 border-rose-500/80 animate-pulse'
                        : timer.isRunning
                        ? 'bg-stone-800/90 border-amber-500/50'
                        : 'bg-stone-850 border-stone-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-stone-300 truncate max-w-[180px]">
                        {timer.label}
                      </span>
                      <span
                        className={`font-mono font-bold text-sm ${
                          isFinished ? 'text-rose-400' : 'text-amber-400'
                        }`}
                      >
                        {formatTime(timer.remainingSeconds)}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-stone-950 h-1.5 rounded-full overflow-hidden mb-2">
                      <div
                        className={`h-full transition-all duration-300 ${
                          isFinished ? 'bg-rose-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${Math.min(100, Math.max(0, progressPct))}%` }}
                      />
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onToggleTimer(timer.id)}
                          className={`p-1.5 rounded-md font-medium transition-colors flex items-center gap-1 ${
                            timer.isRunning
                              ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
                              : 'bg-stone-700 text-stone-200 hover:bg-stone-600'
                          }`}
                        >
                          {timer.isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          <span>{timer.isRunning ? 'Pause' : 'Start'}</span>
                        </button>

                        <button
                          onClick={() => onResetTimer(timer.id)}
                          className="p-1.5 rounded-md text-stone-400 hover:text-stone-200 hover:bg-stone-700/60 transition-colors"
                          title="Reset"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => onDeleteTimer(timer.id)}
                        className="p-1.5 text-stone-500 hover:text-rose-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
