import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Bookmark {
  id: string
  videoId: string
  timestamp: number
  note: string
  createdAt: Date
}

interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

interface Note {
  id: string
  content: string
  timestamp: number
  screenshot?: string
  createdAt: Date
}

interface StudySession {
  id: string
  videoId: string
  startTime: Date
  endTime?: Date
  duration: number
  bookmarks: Bookmark[]
  notes: Note[]
  todos: Todo[]
}

interface StudyModeState {
  isActive: boolean
  currentSession: StudySession | null
  sessions: StudySession[]
  todos: string[]
  notes: string[]
  bookmarks: Bookmark[]
  activeTab: 'notes' | 'todos'
  toggleStudyMode: () => void
  setActiveTab: (tab: 'notes' | 'todos') => void
  addTodo: (todo: string) => void
  removeTodo: (index: number) => void
  addNote: (note: string) => void
  removeNote: (index: number) => void
  addBookmark: (videoId: string, timestamp: number, note: string) => void
  startSession: (videoId: string) => void
  endSession: () => void
}

export const useStudyModeStore = create<StudyModeState>()(
  persist(
    (set, get) => ({
      isActive: false,
      currentSession: null,
      sessions: [],
      todos: [],
      notes: [],
      bookmarks: [],
      activeTab: 'notes',

      toggleStudyMode: () => set((state) => ({ isActive: !state.isActive })),

      setActiveTab: (tab) => set({ activeTab: tab }),

      addTodo: (todo) => set((state) => ({
        todos: [...state.todos, todo],
      })),

      removeTodo: (index) => set((state) => ({
        todos: state.todos.filter((_, i) => i !== index),
      })),

      addNote: (note) => set((state) => ({
        notes: [...state.notes, note],
      })),

      removeNote: (index) => set((state) => ({
        notes: state.notes.filter((_, i) => i !== index),
      })),

      addBookmark: (videoId, timestamp, note) => set((state) => ({
        bookmarks: [...state.bookmarks, {
          id: Date.now().toString(),
          videoId,
          timestamp,
          note,
          createdAt: new Date()
        }]
      })),

      startSession: (videoId) => set({
        currentSession: {
          id: Date.now().toString(),
          videoId,
          startTime: new Date(),
          duration: 0,
          bookmarks: [],
          notes: [],
          todos: []
        }
      }),

      endSession: () => set((state) => {
        if (!state.currentSession) return state

        const endTime = new Date()
        const duration = (endTime.getTime() - state.currentSession.startTime.getTime()) / 1000

        const completedSession = {
          ...state.currentSession,
          endTime,
          duration
        }

        return {
          currentSession: null,
          sessions: [...state.sessions, completedSession]
        }
      })
    }),
    {
      name: 'study-mode-storage'
    }
  )
) 