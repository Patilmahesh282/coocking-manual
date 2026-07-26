import React, { useState } from 'react';
import { Bookmark, FileText, Plus, Trash2, Edit3, Save, ExternalLink } from 'lucide-react';
import { SavedBookmark, SavedNote, ActiveTab } from '../types';

interface BookmarksNotesProps {
  bookmarks: SavedBookmark[];
  onRemoveBookmark: (targetId: string) => void;
  notes: SavedNote[];
  onSaveNote: (note: SavedNote) => void;
  onDeleteNote: (id: string) => void;
  onNavigateTab: (tab: ActiveTab) => void;
}

export const BookmarksNotes: React.FC<BookmarksNotesProps> = ({
  bookmarks,
  onRemoveBookmark,
  notes,
  onSaveNote,
  onDeleteNote,
  onNavigateTab,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'bookmarks' | 'notes'>('bookmarks');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  const handleCreateOrUpdateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteContent.trim()) return;

    const updatedNote: SavedNote = {
      id: editingNoteId || `note-${Date.now()}`,
      title: noteTitle.trim(),
      content: noteContent.trim(),
      updatedAt: new Date().toLocaleDateString(),
      tags: ['Kitchen Note'],
    };

    onSaveNote(updatedNote);
    setNoteTitle('');
    setNoteContent('');
    setEditingNoteId(null);
  };

  const startEditNote = (n: SavedNote) => {
    setEditingNoteId(n.id);
    setNoteTitle(n.title);
    setNoteContent(n.content);
    setActiveSubTab('notes');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950/60 to-stone-900 p-6 rounded-2xl border border-stone-800 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-serif font-bold text-lg mb-1">
            <Bookmark className="w-5 h-5 text-amber-500" />
            <span>Saved Bookmarks & Chef Kitchen Notes</span>
          </div>
          <p className="text-stone-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Keep your favorite cooking manuals, techniques, and personal recipe tweaks saved locally for instant access during prep.
          </p>
        </div>

        {/* Subtab Selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('bookmarks')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
              activeSubTab === 'bookmarks'
                ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md'
                : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-800'
            }`}
          >
            Saved Bookmarks ({bookmarks.length})
          </button>
          <button
            onClick={() => setActiveSubTab('notes')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
              activeSubTab === 'notes'
                ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md'
                : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-800'
            }`}
          >
            Kitchen Notes ({notes.length})
          </button>
        </div>
      </div>

      {/* View 1: Bookmarks List */}
      {activeSubTab === 'bookmarks' && (
        <div className="space-y-4">
          {bookmarks.length === 0 ? (
            <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-12 text-center text-stone-400 space-y-3">
              <Bookmark className="w-8 h-8 text-stone-600 mx-auto" />
              <p className="text-sm italic">
                No saved bookmarks yet. Bookmark any manual or technique from the directory to build your quick reference list!
              </p>
              <button
                onClick={() => onNavigateTab('manuals')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow transition-all"
              >
                <span>Browse Manuals</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookmarks.map((bm) => (
                <div
                  key={bm.id}
                  className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 shadow-xl space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono uppercase text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                        {bm.type} • {bm.category}
                      </span>
                      <button
                        onClick={() => onRemoveBookmark(bm.targetId)}
                        className="text-stone-500 hover:text-rose-400 transition-colors p-1"
                        title="Remove Bookmark"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 className="font-serif font-bold text-stone-100 text-base mb-1">
                      {bm.title}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between border-t border-stone-800 pt-3 text-xs">
                    <span className="text-[10px] font-mono text-stone-500">
                      Saved {bm.savedAt}
                    </span>

                    <button
                      onClick={() => onNavigateTab(bm.type === 'manual' ? 'manuals' : 'techniques')}
                      className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
                    >
                      <span>Open</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* View 2: Notes Editor */}
      {activeSubTab === 'notes' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Note Form */}
          <div className="lg:col-span-5 bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-4 text-stone-200">
            <h4 className="font-serif font-bold text-stone-100 text-base flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-500" />
              <span>{editingNoteId ? 'Edit Kitchen Note' : 'Add New Kitchen Note'}</span>
            </h4>

            <form onSubmit={handleCreateOrUpdateNote} className="space-y-3">
              <div>
                <label className="text-[10px] uppercase font-bold text-amber-400 block mb-1">
                  Note Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. My Oven Temp Offset, Sourdough Hydration Tweak..."
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl p-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-amber-400 block mb-1">
                  Note Content & Chef Observations
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Write down personal cooking notes, salt adjustments, baking timing tweaks..."
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl p-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow flex items-center justify-center gap-1.5 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingNoteId ? 'Update Note' : 'Save Note'}</span>
                </button>

                {editingNoteId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingNoteId(null);
                      setNoteTitle('');
                      setNoteContent('');
                    }}
                    className="px-3 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold text-xs rounded-xl"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Notes Directory */}
          <div className="lg:col-span-7 space-y-3">
            {notes.length === 0 ? (
              <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-12 text-center text-stone-400 italic text-sm">
                No personal kitchen notes saved yet. Use the form on the left to write your custom cooking notes.
              </div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 shadow-xl space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                      <h4 className="font-serif font-bold text-stone-100 text-base">
                        {note.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => startEditNote(note)}
                          className="text-stone-400 hover:text-amber-400 transition-colors p-1"
                          title="Edit Note"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteNote(note.id)}
                          className="text-stone-500 hover:text-rose-400 transition-colors p-1"
                          title="Delete Note"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-stone-300 leading-relaxed font-sans whitespace-pre-line">
                      {note.content}
                    </p>

                    <div className="text-[10px] font-mono text-stone-500 pt-2 border-t border-stone-800/80">
                      Last Updated: {note.updatedAt}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
