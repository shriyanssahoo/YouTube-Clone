import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import NoteIcon from '@mui/icons-material/Note';
import ChecklistIcon from '@mui/icons-material/Checklist';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import YouTube from 'react-youtube';
import { useSidebarStore } from '../store/sidebarStore';

interface Bookmark {
  id: string;
  timestamp: number;
  label: string;
  videoId: string;
}

interface Note {
  id: string;
  content: string;
  timestamp?: number;
  clips: Array<{
    id: string;
    timestamp: number;
    thumbnail: string;
  }>;
  videoTitle?: string;
}

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  timestamp?: number;
  videoTitle?: string;
}

const StudyMode = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const { isOpen, toggleSidebar } = useSidebarStore();
  const [activeTab, setActiveTab] = useState<'notes' | 'todo'>('notes');
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [currentNote, setCurrentNote] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const playerRef = useRef<any>(null);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load saved data when component mounts
  useEffect(() => {
    if (videoId) {
      // Load notes
      const savedNotes = localStorage.getItem(`notes_${videoId}`);
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }

      // Load todos
      const savedTodos = localStorage.getItem(`todos_${videoId}`);
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }

      // Load bookmarks
      const savedBookmarks = localStorage.getItem(`bookmarks_${videoId}`);
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks));
      }
    }
  }, [videoId]);

  // Save data whenever it changes
  useEffect(() => {
    if (videoId) {
      localStorage.setItem(`notes_${videoId}`, JSON.stringify(notes));
      localStorage.setItem(`todos_${videoId}`, JSON.stringify(todos));
      localStorage.setItem(`bookmarks_${videoId}`, JSON.stringify(bookmarks));
    }
  }, [notes, todos, bookmarks, videoId]);

  // Collapse sidebar when Study Mode is active
  useEffect(() => {
    if (isOpen) {
      toggleSidebar();
    }
    return () => {
      if (!isOpen) {
        toggleSidebar();
      }
    };
  }, [isOpen, toggleSidebar]);

  // Update current time
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const onPlayerReady = (event: any) => {
    playerRef.current = event.target;
    // Get video title when player is ready
    const title = event.target.getVideoData().title;
    setVideoTitle(title);
  };

  const addBookmark = () => {
    if (!playerRef.current) return;
    
    const currentTime = playerRef.current.getCurrentTime();
    const newBookmark: Bookmark = {
      id: Date.now().toString(),
      timestamp: currentTime,
      label: `Bookmark at ${formatTime(currentTime)}`,
      videoId: videoId || ''
    };
    
    setBookmarks([...bookmarks, newBookmark]);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const addTodo = () => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: '',
      completed: false,
      timestamp: playerRef.current?.getCurrentTime(),
      videoTitle: videoTitle
    };
    setTodos([...todos, newTodo]);

    // Update todos in YouTubeClassroom
    const allTodos = JSON.parse(localStorage.getItem('all_todos') || '[]');
    allTodos.push({
      ...newTodo,
      videoId,
      videoTitle
    });
    localStorage.setItem('all_todos', JSON.stringify(allTodos));
  };

  const updateTodoText = (id: string, text: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text } : todo
    ));
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const saveNote = () => {
    if (!currentNote.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      content: currentNote,
      timestamp: playerRef.current?.getCurrentTime(),
      clips: [],
      videoTitle: videoTitle
    };

    setNotes([...notes, newNote]);
    setCurrentNote('');

    // Update notes in YouTubeClassroom
    const allNotes = JSON.parse(localStorage.getItem('all_notes') || '[]');
    allNotes.push({
      ...newNote,
      videoId,
      videoTitle
    });
    localStorage.setItem('all_notes', JSON.stringify(allNotes));
  };

  const applyFormat = (format: 'bold' | 'italic' | 'underline') => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = currentNote;
    const selectedText = text.substring(start, end);

    let newText = text;
    switch (format) {
      case 'bold':
        newText = text.substring(0, start) + `**${selectedText}**` + text.substring(end);
        setIsBold(!isBold);
        break;
      case 'italic':
        newText = text.substring(0, start) + `*${selectedText}*` + text.substring(end);
        setIsItalic(!isItalic);
        break;
      case 'underline':
        newText = text.substring(0, start) + `__${selectedText}__` + text.substring(end);
        setIsUnderline(!isUnderline);
        break;
    }

    setCurrentNote(newText);
    // Restore cursor position
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.selectionStart = start + 2;
        textareaRef.current.selectionEnd = end + 2;
        textareaRef.current.focus();
      }
    }, 0);
  };

  return (
    <div className="min-h-screen bg-youtube-black text-white">
      {/* Study Mode Indicator and Time Display */}
      <div className="fixed top-16 left-0 right-0 z-50 flex items-center justify-end px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center space-x-2 bg-youtube-red bg-opacity-20 px-3 py-1.5 rounded-full"
        >
          <div className="w-2 h-2 bg-youtube-red rounded-full animate-pulse" />
          <span className="text-youtube-red text-sm font-medium">STUDY MODE ON</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="ml-4 flex items-center space-x-2"
        >
          <AccessTimeIcon className="text-gray-400" />
          <span className="text-gray-400">{currentTime}</span>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Video Player */}
          <div className="aspect-video bg-black rounded-lg overflow-hidden mb-8">
            <YouTube
              videoId={videoId}
              onReady={onPlayerReady}
              opts={{
                height: '100%',
                width: '100%',
                playerVars: {
                  autoplay: 1,
                  modestbranding: 1,
                  rel: 0
                }
              }}
            />
          </div>

          {/* Study Tools */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Notes and Todo List */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tabs */}
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                    activeTab === 'notes'
                      ? 'bg-youtube-red text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <NoteIcon />
                  <span>Notes</span>
                </button>
                <button
                  onClick={() => setActiveTab('todo')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                    activeTab === 'todo'
                      ? 'bg-youtube-red text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <ChecklistIcon />
                  <span>To-Do List</span>
                </button>
              </div>

              {/* Notes Tab Content */}
              {activeTab === 'notes' && (
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <textarea
                      ref={textareaRef}
                      value={currentNote}
                      onChange={(e) => setCurrentNote(e.target.value)}
                      placeholder="Take notes..."
                      className="flex-grow bg-youtube-gray text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-youtube-red min-h-[100px]"
                    />
                    <button
                      onClick={saveNote}
                      className="bg-youtube-red text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                      <SaveIcon />
                    </button>
                  </div>

                  <div className="space-y-2">
                    {notes.map((note) => (
                      <div
                        key={note.id}
                        className="bg-youtube-gray p-4 rounded-lg"
                      >
                        <p className="text-white whitespace-pre-wrap">{note.content}</p>
                        {note.timestamp && (
                          <div className="mt-2 text-sm text-gray-400">
                            Timestamp: {formatTime(note.timestamp)}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Todo List Tab Content */}
              {activeTab === 'todo' && (
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Add a new task..."
                      className="flex-grow bg-youtube-gray text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-youtube-red"
                    />
                    <button
                      onClick={addTodo}
                      className="bg-youtube-red text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                      <AddIcon />
                    </button>
                  </div>

                  <div className="space-y-2">
                    {todos.map((todo) => (
                      <div
                        key={todo.id}
                        className="flex items-center space-x-3 p-3 bg-youtube-gray rounded-lg"
                      >
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleTodo(todo.id)}
                          className="w-5 h-5 rounded border-gray-600 text-youtube-red focus:ring-youtube-red"
                        />
                        <input
                          type="text"
                          value={todo.text}
                          onChange={(e) => updateTodoText(todo.id, e.target.value)}
                          placeholder="Enter task..."
                          className="flex-1 bg-transparent border-none focus:outline-none text-white placeholder-gray-500"
                        />
                        {todo.timestamp && (
                          <button
                            onClick={() => playerRef.current?.seekTo(todo.timestamp)}
                            className="text-gray-400 hover:text-white"
                          >
                            {formatTime(todo.timestamp)}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Bookmarks */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Bookmarks</h3>
                <button
                  onClick={addBookmark}
                  className="bg-youtube-red text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  <BookmarkIcon />
                </button>
              </div>

              <div className="space-y-2">
                {bookmarks.map((bookmark) => (
                  <div
                    key={bookmark.id}
                    className="flex items-center justify-between p-3 bg-youtube-gray rounded-lg"
                  >
                    <span className="text-white">{bookmark.label}</span>
                    <button
                      onClick={() => playerRef.current?.seekTo(bookmark.timestamp)}
                      className="text-gray-400 hover:text-white"
                    >
                      {formatTime(bookmark.timestamp)}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyMode;