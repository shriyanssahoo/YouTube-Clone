import { useState } from 'react'
import { useStudyModeStore } from '../store/studyModeStore'
import NoteIcon from '@mui/icons-material/Note'
import AssignmentIcon from '@mui/icons-material/Assignment'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

type TabType = 'notes' | 'todos'

interface Tab {
  id: TabType
  label: string
  icon: React.ReactNode
}

const StudyModePanel = () => {
  const { activeTab, setActiveTab, todos, notes, addTodo, removeTodo, addNote, removeNote } = useStudyModeStore()
  const [newTodo, setNewTodo] = useState('')
  const [newNote, setNewNote] = useState('')

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo)
      setNewTodo('')
    }
  }

  const handleAddNote = () => {
    if (newNote.trim()) {
      addNote(newNote)
      setNewNote('')
    }
  }

  const tabs: Tab[] = [
    { id: 'notes', label: 'Notes', icon: <NoteIcon /> },
    { id: 'todos', label: 'To-Do List', icon: <AssignmentIcon /> },
  ]

  return (
    <div className="bg-youtube-gray rounded-lg p-4">
      {/* Tabs */}
      <div className="flex space-x-4 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
              activeTab === tab.id
                ? 'bg-youtube-red text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Notes Tab */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add a new note..."
              className="flex-grow bg-youtube-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-youtube-red"
            />
            <button
              onClick={handleAddNote}
              className="bg-youtube-red text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              <AddIcon />
            </button>
          </div>

          <div className="space-y-2">
            {notes.map((note, index) => (
              <div
                key={index}
                className="flex items-start justify-between p-3 bg-youtube-black rounded-lg"
              >
                <p className="text-white">{note}</p>
                <button
                  onClick={() => removeNote(index)}
                  className="text-gray-400 hover:text-white"
                >
                  <DeleteIcon />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* To-Do List Tab */}
      {activeTab === 'todos' && (
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task..."
              className="flex-grow bg-youtube-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-youtube-red"
            />
            <button
              onClick={handleAddTodo}
              className="bg-youtube-red text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              <AddIcon />
            </button>
          </div>

          <div className="space-y-2">
            {todos.map((todo, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-youtube-black rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-gray-600 text-youtube-red focus:ring-youtube-red"
                  />
                  <span className="text-white">{todo}</span>
                </div>
                <button
                  onClick={() => removeTodo(index)}
                  className="text-gray-400 hover:text-white"
                >
                  <DeleteIcon />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default StudyModePanel 