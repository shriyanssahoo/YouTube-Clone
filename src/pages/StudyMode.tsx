import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
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
  const [showPlaylist, setShowPlaylist] = useState(true);
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
          className="flex items-center space-x-2 bg-youtube-gray bg-opacity-20 px-4 py-2 rounded-full -ml-1"
        >
          <AccessTimeIcon className="text-youtube-red" />
          <span className="text-2xl font-mono font-bold tracking-wider">{currentTime}</span>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="pt-28 flex h-[calc(100vh-5rem)]">
        {/* Video and Left Panel */}
        <div className="flex-1 p-6">
          {/* Video Player */}
          <div className="relative">
            <YouTube
              videoId={videoId}
              onReady={onPlayerReady}
              opts={{
                width: '100%',
                height: '600',
                playerVars: {
                  autoplay: 1,
                  modestbranding: 1,
                  rel: 0
                }
              }}
              className="rounded-lg overflow-hidden"
            />
          </div>

          {/* Video Title */}
          <div className="mt-4 px-2">
            <h1 className="text-2xl font-semibold text-white">{videoTitle}</h1>
          </div>

          {/* Bookmark Button */}
          <div className="mt-4 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addBookmark}
              className="bg-youtube-red text-white px-4 py-2 rounded-full flex items-center space-x-2"
            >
              <BookmarkIcon />
              <span>Bookmark</span>
            </motion.button>
          </div>

          {/* Bookmarks Panel */}
          {bookmarks.length > 0 && (
            <div className="mt-4 p-4 bg-youtube-gray rounded-lg">
              <h3 className="text-lg font-medium mb-3">Bookmarks</h3>
              <div className="space-y-2">
                {bookmarks.map(bookmark => (
                  <motion.button
                    key={bookmark.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => playerRef.current?.seekTo(bookmark.timestamp)}
                    className="w-full text-left p-2 hover:bg-gray-700 rounded flex items-center space-x-2"
                  >
                    <BookmarkIcon className="text-youtube-red" />
                    <span>{bookmark.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="w-96 border-l border-gray-800 flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-gray-800">
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 py-4 flex items-center justify-center space-x-2 ${
                activeTab === 'notes' ? 'text-white border-b-2 border-youtube-red' : 'text-gray-400'
              }`}
            >
              <NoteIcon />
              <span>Notes</span>
            </button>
            <button
              onClick={() => setActiveTab('todo')}
              className={`flex-1 py-4 flex items-center justify-center space-x-2 ${
                activeTab === 'todo' ? 'text-white border-b-2 border-youtube-red' : 'text-gray-400'
              }`}
            >
              <ChecklistIcon />
              <span>To-Do List</span>
            </button>
          </div>

          {/* Notes Tab Content */}
          {activeTab === 'notes' && (
            <div className="flex-1 flex flex-col min-h-0">
              <div className="p-4 border-b border-gray-800">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Notes</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-youtube-red text-white px-3 py-1 rounded-full flex items-center space-x-1"
                  >
                    <AddIcon />
                    <span>Add Clip</span>
                  </motion.button>
                </div>
                
                {/* Note Input */}
                <div className="mb-4">
                  {/* Formatting Toolbar */}
                  <div className="flex space-x-2 mb-2 p-2 bg-youtube-gray rounded-t-lg border-b border-gray-700">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => applyFormat('bold')}
                      className={`p-2 rounded hover:bg-gray-700 ${isBold ? 'bg-gray-700' : ''}`}
                    >
                      <FormatBoldIcon className="text-white" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => applyFormat('italic')}
                      className={`p-2 rounded hover:bg-gray-700 ${isItalic ? 'bg-gray-700' : ''}`}
                    >
                      <FormatItalicIcon className="text-white" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => applyFormat('underline')}
                      className={`p-2 rounded hover:bg-gray-700 ${isUnderline ? 'bg-gray-700' : ''}`}
                    >
                      <FormatUnderlinedIcon className="text-white" />
                    </motion.button>
                  </div>
                  <textarea
                    ref={textareaRef}
                    value={currentNote}
                    onChange={(e) => setCurrentNote(e.target.value)}
                    placeholder="Type your notes here..."
                    className="w-full h-[20rem] p-3 bg-youtube-gray rounded-b-lg text-white resize-none focus:outline-none focus:ring-2 focus:ring-youtube-red"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={saveNote}
                    className="mt-2 bg-youtube-red text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                  >
                    <SaveIcon />
                    <span>Save Note</span>
                  </motion.button>
                </div>
              </div>
              
              {/* Saved Notes - Scrollable Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {notes.map(note => (
                  <div key={note.id} className="bg-youtube-gray p-4 rounded-lg">
                    <div className="prose prose-invert max-w-none">
                      {note.content}
                    </div>
                    {note.timestamp && (
                      <div className="mt-2 text-sm text-gray-400">
                        Timestamp: {formatTime(note.timestamp)}
                      </div>
                    )}
                    {note.clips && note.clips.length > 0 && (
                      <div className="mt-2 flex space-x-2">
                        {note.clips.map(clip => (
                          <img
                            key={clip.id}
                            src={clip.thumbnail}
                            alt="Video clip"
                            className="w-20 h-12 object-cover rounded"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* To-Do List Tab Content */}
          {activeTab === 'todo' && (
            <div className="flex-1 flex flex-col min-h-0">
              <div className="p-4 border-b border-gray-800">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">To-Do List</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addTodo}
                    className="bg-youtube-red text-white px-3 py-1 rounded-full flex items-center space-x-1"
                  >
                    <AddIcon />
                    <span>Add Task</span>
                  </motion.button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {todos.map(todo => (
                  <motion.div
                    key={todo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-3 p-3 bg-youtube-gray rounded-lg"
                  >
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="w-5 h-5 rounded border-gray-400 text-youtube-red focus:ring-youtube-red"
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
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Playlist Panel */}
        <AnimatePresence>
          {showPlaylist && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 300 }}
              exit={{ width: 0 }}
              className="border-l border-gray-800 overflow-hidden"
            >
              <div className="p-4">
                <h3 className="text-lg font-medium mb-4">Study Resources</h3>
                <div className="space-y-4">
                  {[
                    {
                      id: '3PHXvlpOkf4',
                      title: 'Complete Machine Learning Course - Andrew Ng',
                      thumbnail: 'https://i.ytimg.com/vi/3PHXvlpOkf4/mqdefault.jpg',
                      duration: '11:52:09',
                      views: '4.2M'
                    },
                    {
                      id: '8hly31xKli0',
                      title: 'Harvard CS50 - Introduction to Computer Science',
                      thumbnail: 'https://i.ytimg.com/vi/8hly31xKli0/mqdefault.jpg',
                      duration: '24:03:31',
                      views: '3.8M'
                    },
                    {
                      id: 'rfscVS0vtbw',
                      title: 'Learn Python - Full Course for Beginners',
                      thumbnail: 'https://i.ytimg.com/vi/rfscVS0vtbw/mqdefault.jpg',
                      duration: '4:26:52',
                      views: '18M'
                    },
                    {
                      id: 'pTFZFxd4hOI',
                      title: 'Data Structures and Algorithms in Python',
                      thumbnail: 'https://i.ytimg.com/vi/pTFZFxd4hOI/mqdefault.jpg',
                      duration: '12:30:31',
                      views: '2.1M'
                    },
                    {
                      id: 'Vz3gj1T_2Ek',
                      title: 'Deep Learning Specialization - Neural Networks',
                      thumbnail: 'https://i.ytimg.com/vi/Vz3gj1T_2Ek/mqdefault.jpg',
                      duration: '8:37:51',
                      views: '1.5M'
                    },
                    {
                      id: 'Oe421EPjeBE',
                      title: 'Statistics for Data Science',
                      thumbnail: 'https://i.ytimg.com/vi/Oe421EPjeBE/mqdefault.jpg',
                      duration: '11:53:38',
                      views: '1.2M'
                    },
                    {
                      id: 'aircAruvnKk',
                      title: '3Blue1Brown - Neural Networks',
                      thumbnail: 'https://i.ytimg.com/vi/aircAruvnKk/mqdefault.jpg',
                      duration: '19:13',
                      views: '5.6M'
                    }
                  ].map((video) => (
                    <motion.div
                      key={video.id}
                      whileHover={{ scale: 1.02 }}
                      className="flex space-x-3 cursor-pointer"
                      onClick={() => navigate(`/study-mode/${video.id}`)}
                    >
                      <div className="relative w-40 h-24 flex-shrink-0">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 px-1 rounded text-xs">
                          {video.duration}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium line-clamp-2">{video.title}</h4>
                        <p className="text-xs text-gray-400 mt-1">{video.views} views</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StudyMode; 