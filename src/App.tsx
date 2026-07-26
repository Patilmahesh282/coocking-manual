import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ManualsList } from './components/ManualsList';
import { TechniquesGuide } from './components/TechniquesGuide';
import { RatioCalculator } from './components/RatioCalculator';
import { TemperatureSafety } from './components/TemperatureSafety';
import { SubstitutionsConverter } from './components/SubstitutionsConverter';
import { CookingAssistantMode } from './components/CookingAssistantMode';
import { ChefAIAssistant } from './components/ChefAIAssistant';
import { BookmarksNotes } from './components/BookmarksNotes';
import { TimerDrawer, playAlarmSound } from './components/TimerDrawer';

import {
  ActiveTab,
  CookingManual,
  KitchenTimer,
  SavedBookmark,
  SavedNote,
} from './types';

import {
  PRELOADED_MANUALS,
  TECHNIQUES_DATA,
  RATIOS_DATA,
  DONENESS_DATA,
  OIL_SMOKE_POINTS,
  SUBSTITUTIONS_DATA,
} from './data/manualData';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('manuals');
  const [searchQuery, setSearchQuery] = useState('');

  // State: Manuals (Preloaded + Custom Generated)
  const [manuals, setManuals] = useState<CookingManual[]>(() => {
    try {
      const saved = localStorage.getItem('cooking_manuals_custom');
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...PRELOADED_MANUALS, ...parsed];
      }
    } catch (e) {
      console.warn('Failed to load saved custom manuals', e);
    }
    return PRELOADED_MANUALS;
  });

  // State: Hands-Free Active Cooking Manual
  const [cookingManual, setCookingManual] = useState<CookingManual | null>(null);

  // State: Timers Deck
  const [timers, setTimers] = useState<KitchenTimer[]>([]);

  // State: Bookmarks
  const [bookmarks, setBookmarks] = useState<SavedBookmark[]>(() => {
    try {
      const saved = localStorage.getItem('cooking_bookmarks');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load bookmarks', e);
    }
    return [
      {
        id: 'bm-1',
        title: 'Pan-Seared Ribeye Steak & Garlic Butter Reduction',
        category: 'Modern Bistro',
        type: 'manual',
        targetId: 'master-ribeye-steak',
        savedAt: new Date().toLocaleDateString(),
      },
    ];
  });

  // State: Saved Notes
  const [notes, setNotes] = useState<SavedNote[]>(() => {
    try {
      const saved = localStorage.getItem('cooking_notes');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load notes', e);
    }
    return [
      {
        id: 'note-default-1',
        title: 'Cast Iron Preheat Rule',
        content: 'Preheat cast iron empty for 4-5 mins over high heat before adding high-smoke point avocado oil for maximum steak crusting.',
        updatedAt: new Date().toLocaleDateString(),
        tags: ['Searing', 'Steak'],
      },
    ];
  });

  // Save Bookmarks & Notes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cooking_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.warn('Failed to save bookmarks', e);
    }
  }, [bookmarks]);

  useEffect(() => {
    try {
      localStorage.setItem('cooking_notes', JSON.stringify(notes));
    } catch (e) {
      console.warn('Failed to save notes', e);
    }
  }, [notes]);

  // Global Timer Tick Interval Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) => {
        let hasJustFinished = false;
        const updated = prevTimers.map((t) => {
          if (t.isRunning && t.remainingSeconds > 0) {
            const nextRemaining = t.remainingSeconds - 1;
            if (nextRemaining === 0) {
              hasJustFinished = true;
            }
            return {
              ...t,
              remainingSeconds: nextRemaining,
              isRunning: nextRemaining > 0,
            };
          }
          return t;
        });

        if (hasJustFinished) {
          playAlarmSound();
        }
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Timer Deck Handlers
  const handleAddTimer = (label: string, seconds: number) => {
    const newTimer: KitchenTimer = {
      id: `timer-${Date.now()}`,
      label,
      totalSeconds: seconds,
      remainingSeconds: seconds,
      isRunning: true,
    };
    setTimers((prev) => [newTimer, ...prev]);
  };

  const handleToggleTimer = (id: string) => {
    setTimers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isRunning: !t.isRunning } : t))
    );
  };

  const handleResetTimer = (id: string) => {
    setTimers((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, remainingSeconds: t.totalSeconds, isRunning: false } : t
      )
    );
  };

  const handleDeleteTimer = (id: string) => {
    setTimers((prev) => prev.filter((t) => t.id !== id));
  };

  // Bookmark Handlers
  const handleToggleBookmark = (
    title: string,
    category: string,
    type: 'manual' | 'technique',
    targetId: string
  ) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.targetId === targetId);
      if (exists) {
        return prev.filter((b) => b.targetId !== targetId);
      } else {
        return [
          {
            id: `bm-${Date.now()}`,
            title,
            category,
            type,
            targetId,
            savedAt: new Date().toLocaleDateString(),
          },
          ...prev,
        ];
      }
    });
  };

  const handleRemoveBookmark = (targetId: string) => {
    setBookmarks((prev) => prev.filter((b) => b.targetId !== targetId));
  };

  // Note Handlers
  const handleSaveNote = (note: SavedNote) => {
    setNotes((prev) => {
      const index = prev.findIndex((n) => n.id === note.id);
      if (index >= 0) {
        const next = [...prev];
        next[index] = note;
        return next;
      }
      return [note, ...prev];
    });
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  // AI Generated Manual Handler
  const handleManualGenerated = (newManual: CookingManual) => {
    setManuals((prev) => [newManual, ...prev]);
    try {
      const savedCustoms = JSON.parse(
        localStorage.getItem('cooking_manuals_custom') || '[]'
      );
      localStorage.setItem(
        'cooking_manuals_custom',
        JSON.stringify([newManual, ...savedCustoms])
      );
    } catch (e) {
      console.warn('Failed to save custom manual', e);
    }
    setActiveTab('manuals');
  };

  // Handle Mode Switch to Cooking Assistant
  const handleStartCookingAssistant = (manual: CookingManual) => {
    setCookingManual(manual);
    setActiveTab('assistant');
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans antialiased pb-24 selection:bg-amber-500 selection:text-stone-950">
      {/* Top Sticky Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        bookmarkCount={bookmarks.length}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'manuals' && (
          <ManualsList
            manuals={manuals}
            onSelectManualForCooking={handleStartCookingAssistant}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            onOpenAIGenerator={() => setActiveTab('ai-chef')}
            searchQuery={searchQuery}
          />
        )}

        {activeTab === 'techniques' && (
          <TechniquesGuide
            techniques={TECHNIQUES_DATA}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            searchQuery={searchQuery}
          />
        )}

        {activeTab === 'ratios' && <RatioCalculator ratios={RATIOS_DATA} />}

        {activeTab === 'temperatures' && (
          <TemperatureSafety
            donenessData={DONENESS_DATA}
            smokePointsData={OIL_SMOKE_POINTS}
          />
        )}

        {activeTab === 'substitutions' && (
          <SubstitutionsConverter substitutions={SUBSTITUTIONS_DATA} />
        )}

        {activeTab === 'assistant' && (
          <CookingAssistantMode
            manual={cookingManual || manuals[0]}
            onExitAssistant={() => setActiveTab('manuals')}
            onAddTimer={handleAddTimer}
            timers={timers}
            onToggleTimer={handleToggleTimer}
          />
        )}

        {activeTab === 'ai-chef' && (
          <ChefAIAssistant onManualGenerated={handleManualGenerated} />
        )}

        {activeTab === 'bookmarks' && (
          <BookmarksNotes
            bookmarks={bookmarks}
            onRemoveBookmark={handleRemoveBookmark}
            notes={notes}
            onSaveNote={handleSaveNote}
            onDeleteNote={handleDeleteNote}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}
      </main>

      {/* Persistent Multi-Timer Drawer Deck */}
      <TimerDrawer
        timers={timers}
        onAddTimer={handleAddTimer}
        onToggleTimer={handleToggleTimer}
        onResetTimer={handleResetTimer}
        onDeleteTimer={handleDeleteTimer}
      />
    </div>
  );
}
