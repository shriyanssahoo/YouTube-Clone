import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import SchoolIcon from '@mui/icons-material/School'
import BookIcon from '@mui/icons-material/Book'
import NoteIcon from '@mui/icons-material/Note'
import TimelineIcon from '@mui/icons-material/Timeline'
import SettingsIcon from '@mui/icons-material/Settings'
import ChecklistIcon from '@mui/icons-material/Checklist'
import AddIcon from '@mui/icons-material/Add'
import FilterListIcon from '@mui/icons-material/FilterList'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { motion, AnimatePresence } from 'framer-motion'

interface Todo {
  id: string
  title: string
  course: string
  dueDate: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
}

interface Course {
  id: string
  title: string
  instructor: string
  progress: number
  thumbnail: string
  videoId: string
  description: string
  duration: string
  views: string
  uploadedAt: string
}

const YouTubeClassroom = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showNewNoteModal, setShowNewNoteModal] = useState(false)

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <SchoolIcon /> },
    { id: 'courses', label: 'Courses', icon: <BookIcon /> },
    { id: 'notes', label: 'Notes', icon: <NoteIcon /> },
    { id: 'todo', label: 'To-Do List', icon: <ChecklistIcon /> },
    { id: 'progress', label: 'Progress', icon: <TimelineIcon /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
  ]

  const [courses] = useState<Course[]>([
    {
      id: 'course-1',
      title: 'Web Development Fundamentals',
      instructor: 'Traversy Media',
      progress: 75,
      thumbnail: 'https://i.ytimg.com/vi/hdI2bqOjy3c/maxresdefault.jpg',
      videoId: 'hdI2bqOjy3c',
      description: 'Learn the fundamentals of web development with HTML, CSS, and JavaScript',
      duration: '1:11:00',
      views: '2.1M',
      uploadedAt: '1 year ago'
    },
    {
      id: 'course-2',
      title: 'Data Structures & Algorithms',
      instructor: 'freeCodeCamp',
      progress: 45,
      thumbnail: 'https://i.ytimg.com/vi/8hly31xKli0/maxresdefault.jpg',
      videoId: '8hly31xKli0',
      description: 'Master common data structures and algorithms in Python',
      duration: '5:22:00',
      views: '1.8M',
      uploadedAt: '2 years ago'
    },
    {
      id: 'course-3',
      title: 'Machine Learning Basics',
      instructor: '3Blue1Brown',
      progress: 30,
      thumbnail: 'https://i.ytimg.com/vi/aircAruvnKk/maxresdefault.jpg',
      videoId: 'aircAruvnKk',
      description: 'Neural networks explained in a beautiful way',
      duration: '19:13',
      views: '15M',
      uploadedAt: '3 years ago'
    },
    {
      id: 'course-4',
      title: 'React.js Crash Course',
      instructor: 'Academind',
      progress: 60,
      thumbnail: 'https://i.ytimg.com/vi/Dorf8i6lCuk/maxresdefault.jpg',
      videoId: 'Dorf8i6lCuk',
      description: 'Learn React.js from scratch in this comprehensive crash course',
      duration: '2:25:00',
      views: '1.2M',
      uploadedAt: '6 months ago'
    },
    {
      id: 'course-5',
      title: 'Python for Beginners',
      instructor: 'Programming with Mosh',
      progress: 90,
      thumbnail: 'https://i.ytimg.com/vi/kqtD5dpn9C8/maxresdefault.jpg',
      videoId: 'kqtD5dpn9C8',
      description: 'Complete Python course for absolute beginners',
      duration: '6:14:00',
      views: '3.5M',
      uploadedAt: '1 year ago'
    },
    {
      id: 'course-6',
      title: 'Advanced CSS Techniques',
      instructor: 'Kevin Powell',
      progress: 25,
      thumbnail: 'https://i.ytimg.com/vi/1PnVor36_40/maxresdefault.jpg',
      videoId: '1PnVor36_40',
      description: 'Master modern CSS with advanced techniques and best practices',
      duration: '1:45:00',
      views: '800K',
      uploadedAt: '3 months ago'
    }
  ])

  const [notes] = useState([
    {
      id: 'note-1',
      title: 'HTML/CSS Notes',
      course: 'Web Development Fundamentals',
      lastUpdated: '2 days ago',
    },
    {
      id: 'note-2',
      title: 'Binary Search Notes',
      course: 'Data Structures & Algorithms',
      lastUpdated: '5 days ago',
    },
    {
      id: 'note-3',
      title: 'Linear Regression Notes',
      course: 'Machine Learning Basics',
      lastUpdated: '1 week ago',
    },
  ])

  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 'todo-1',
      title: 'Complete HTML/CSS Project',
      course: 'Web Development Fundamentals',
      dueDate: 'Tomorrow',
      completed: false,
      priority: 'high',
    },
    {
      id: 'todo-2',
      title: 'Review Binary Search Algorithm',
      course: 'Data Structures & Algorithms',
      dueDate: 'In 3 days',
      completed: true,
      priority: 'medium',
    },
    {
      id: 'todo-3',
      title: 'Practice Linear Regression Problems',
      course: 'Machine Learning Basics',
      dueDate: 'Next week',
      completed: false,
      priority: 'low',
    },
  ])

  const [showNewTaskModal, setShowNewTaskModal] = useState(false)
  const [newTask, setNewTask] = useState({
    title: '',
    course: '',
    dueDate: '',
    priority: 'medium' as const,
  })
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
  const [sortBy, setSortBy] = useState<'priority' | 'dueDate'>('priority')
  const [showCompleted, setShowCompleted] = useState(true)
  const [isClearingCompleted, setIsClearingCompleted] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const slidesPerView = 3
  const totalSlides = Math.ceil(courses.length / slidesPerView)

  const handleAddTask = () => {
    if (newTask.title && newTask.course && newTask.dueDate) {
      const task: Todo = {
        id: `todo-${Date.now()}`,
        ...newTask,
        completed: false,
      }
      setTodos([...todos, task])
      setNewTask({
        title: '',
        course: '',
        dueDate: '',
        priority: 'medium',
      })
      setShowNewTaskModal(false)
    }
  }

  const toggleTaskCompletion = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTask = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const filteredAndSortedTodos = todos
    .filter((todo) => {
      if (filter === 'all') return true
      if (filter === 'active') return !todo.completed
      if (filter === 'completed') return todo.completed
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 }
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      }
      return a.dueDate.localeCompare(b.dueDate)
    })

  const activeTasks = filteredAndSortedTodos.filter(todo => !todo.completed)
  const completedTasks = filteredAndSortedTodos.filter(todo => todo.completed)

  const clearCompletedTasks = () => {
    setIsClearingCompleted(true)
    setTimeout(() => {
      setTodos(todos.filter(todo => !todo.completed))
      setIsClearingCompleted(false)
    }, 500)
  }

  const taskVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -100 }
  }

  const completedSectionVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: 'auto', opacity: 1 },
    exit: { height: 0, opacity: 0 }
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const visibleCourses = courses.slice(
    currentSlide * slidesPerView,
    (currentSlide + 1) * slidesPerView
  )

  return (
    <div className="p-6">
      <h1 className="text-5xl font-bold text-white mb-4">
        YouTube Classroom
      </h1>
      <div className="max-w-4xl">
        <p className="text-xl text-gray-300 mb-8">
          Your personalized learning space with enhanced study features and reduced distractions!
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
              activeTab === tab.id
                ? 'bg-youtube-gray text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Dashboard Content */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">
              Your Courses
            </h2>
            <div className="relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 overflow-x-auto">
                {courses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-youtube-gray rounded-lg overflow-hidden hover:bg-gray-800 transition-colors duration-200"
                  >
                    <Link to={`/study-mode/${course.videoId}`} className="block">
                      <div className="relative">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 px-2 py-1 rounded text-sm">
                          {course.duration}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-medium mb-2 line-clamp-2">{course.title}</h3>
                        <p className="text-gray-400 text-sm mb-2">{course.instructor}</p>
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <span>{course.views} views</span>
                          <span>{course.uploadedAt}</span>
                        </div>
                        <div className="mt-4">
                          <div className="h-2.5 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-youtube-red rounded-full"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                          <div className="mt-2 text-sm text-gray-400">
                            {course.progress}% Complete
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4">
              Recent Notes
            </h2>
            <div className="space-y-4">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="flex items-center justify-between p-4 bg-youtube-gray rounded-lg"
                >
                  <div>
                    <h3 className="text-white font-medium">
                      {note.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {note.course}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-400">{note.lastUpdated}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4">
              To-Do List
            </h2>
            <div className="space-y-4">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center justify-between p-4 bg-youtube-gray rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTaskCompletion(todo.id)}
                      className="w-5 h-5 rounded border-gray-400 text-youtube-red focus:ring-youtube-red"
                    />
                    <div>
                      <h3 className={`font-medium ${todo.completed ? 'text-gray-500 line-through' : 'text-white'}`}>
                        {todo.title}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {todo.course}
                      </p>
                    </div>
                  </div>
                  <span className="text-gray-400">{todo.dueDate}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Courses Tab Content */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">Your Courses</h2>
            <div className="flex space-x-4">
              <select
                className="bg-youtube-gray text-white px-3 py-2 rounded-lg focus:outline-none"
                defaultValue="all"
              >
                <option value="all">All Courses</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="not-started">Not Started</option>
              </select>
              <select
                className="bg-youtube-gray text-white px-3 py-2 rounded-lg focus:outline-none"
                defaultValue="recent"
              >
                <option value="recent">Recently Updated</option>
                <option value="progress">Progress</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <motion.div
                key={course.id}
                whileHover={{ scale: 1.02 }}
                className="bg-youtube-gray rounded-lg overflow-hidden"
              >
                <a
                  href={`/study-mode/${course.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative group"
                >
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 bg-youtube-red rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                    {course.duration}
                  </div>
                </a>
                <div className="p-4">
                  <h3 className="text-white font-medium mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">
                    {course.instructor}
                  </p>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                    <span>{course.views} views</span>
                    <span>{course.uploadedAt}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-youtube-red h-2 rounded-full"
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-400 text-sm">
                      {course.progress}% Complete
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-youtube-red hover:text-red-600 text-sm font-medium"
                    >
                      Continue Learning
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* To-Do List Tab Content */}
      {activeTab === 'todo' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">To-Do List</h2>
            <div className="flex space-x-4">
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowNewTaskModal(true)}
                  className="px-4 py-2 bg-youtube-red text-white rounded-full hover:bg-red-700 flex items-center space-x-2"
                >
                  <AddIcon />
                  <span>Add New Task</span>
                </motion.button>
              </div>
              <div className="flex space-x-2">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as any)}
                  className="bg-youtube-gray text-white px-3 py-2 rounded-lg focus:outline-none"
                >
                  <option value="all">All Tasks</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-youtube-gray text-white px-3 py-2 rounded-lg focus:outline-none"
                >
                  <option value="priority">Sort by Priority</option>
                  <option value="dueDate">Sort by Due Date</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Tasks Section */}
          <div className="space-y-4">
            <AnimatePresence>
              {activeTasks.map((todo) => (
                <motion.div
                  key={todo.id}
                  variants={taskVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between p-4 bg-youtube-gray rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <motion.input
                      whileHover={{ scale: 1.1 }}
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTaskCompletion(todo.id)}
                      className="w-5 h-5 rounded border-gray-400 text-youtube-red focus:ring-youtube-red"
                    />
                    <div>
                      <h3 className="font-medium text-white">
                        {todo.title}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {todo.course}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className={`px-2 py-1 rounded text-sm ${
                        todo.priority === 'high' ? 'bg-red-500' :
                        todo.priority === 'medium' ? 'bg-yellow-500' :
                        'bg-green-500'
                      } text-white`}
                    >
                      {todo.priority}
                    </motion.span>
                    <span className="text-gray-400">{todo.dueDate}</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteTask(todo.id)}
                      className="text-gray-400 hover:text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Completed Tasks Section */}
          {completedTasks.length > 0 && (
            <motion.div
              variants={completedSectionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="mt-8"
            >
              <div className="flex items-center justify-between mb-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCompleted(!showCompleted)}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white"
                >
                  <motion.div
                    animate={{ rotate: showCompleted ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ExpandMoreIcon />
                  </motion.div>
                  <h3 className="text-xl font-semibold">
                    Completed Tasks ({completedTasks.length})
                  </h3>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearCompletedTasks}
                  disabled={isClearingCompleted}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white"
                >
                  <DeleteSweepIcon />
                  <span>Clear Completed</span>
                </motion.button>
              </div>
              <AnimatePresence>
                {showCompleted && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {completedTasks.map((todo) => (
                      <motion.div
                        key={todo.id}
                        variants={taskVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="flex items-center justify-between p-4 bg-youtube-gray rounded-lg opacity-75"
                      >
                        <div className="flex items-center space-x-4">
                          <motion.input
                            whileHover={{ scale: 1.1 }}
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTaskCompletion(todo.id)}
                            className="w-5 h-5 rounded border-gray-400 text-youtube-red focus:ring-youtube-red"
                          />
                          <div>
                            <h3 className="font-medium text-gray-500 line-through">
                              {todo.title}
                            </h3>
                            <p className="text-gray-500 text-sm">
                              {todo.course}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            className={`px-2 py-1 rounded text-sm ${
                              todo.priority === 'high' ? 'bg-red-500' :
                              todo.priority === 'medium' ? 'bg-yellow-500' :
                              'bg-green-500'
                            } text-white opacity-75`}
                          >
                            {todo.priority}
                          </motion.span>
                          <span className="text-gray-500">{todo.dueDate}</span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => deleteTask(todo.id)}
                            className="text-gray-500 hover:text-white"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* New Task Modal */}
          {showNewTaskModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-youtube-gray p-6 rounded-lg w-full max-w-md"
              >
                <h3 className="text-xl font-semibold text-white mb-4">Add New Task</h3>
                <div className="space-y-4">
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    placeholder="Task Title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full bg-youtube-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-youtube-red"
                  />
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    placeholder="Course"
                    value={newTask.course}
                    onChange={(e) => setNewTask({ ...newTask, course: e.target.value })}
                    className="w-full bg-youtube-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-youtube-red"
                  />
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    placeholder="Due Date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="w-full bg-youtube-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-youtube-red"
                  />
                  <motion.select
                    whileFocus={{ scale: 1.02 }}
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                    className="w-full bg-youtube-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-youtube-red"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </motion.select>
                  <div className="flex justify-end space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowNewTaskModal(false)}
                      className="px-4 py-2 text-gray-400 hover:text-white"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAddTask}
                      className="px-4 py-2 bg-youtube-red text-white rounded-lg hover:bg-red-700"
                    >
                      Add Task
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      )}

      {/* Notes Tab Content */}
      {activeTab === 'notes' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">Study Notes</h2>
            <div className="flex space-x-4">
              <select
                className="bg-youtube-gray text-white px-3 py-2 rounded-lg focus:outline-none"
                defaultValue="all"
              >
                <option value="all">All Courses</option>
                <option value="recent">Recently Updated</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNewNoteModal(true)}
                className="px-4 py-2 bg-youtube-red text-white rounded-full hover:bg-red-700 flex items-center space-x-2"
              >
                <AddIcon />
                <span>New Note</span>
              </motion.button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                id: 'note-1',
                title: 'Machine Learning Fundamentals',
                course: 'Machine Learning Basics',
                content: '## Key Concepts\n\n1. **Supervised Learning**\n   - Classification\n   - Regression\n\n2. **Unsupervised Learning**\n   - Clustering\n   - Dimensionality Reduction\n\n3. **Neural Networks**\n   - Layers\n   - Activation Functions\n   - Backpropagation',
                lastUpdated: '2 hours ago',
                tags: ['ML', 'AI', 'Neural Networks']
              },
              {
                id: 'note-2',
                title: 'Data Structures in Python',
                course: 'Python Programming',
                content: '## Common Data Structures\n\n1. **Lists**\n   - Dynamic arrays\n   - O(1) indexing\n\n2. **Dictionaries**\n   - Hash maps\n   - Key-value pairs\n\n3. **Sets**\n   - Unique elements\n   - Fast lookups',
                lastUpdated: '1 day ago',
                tags: ['Python', 'Data Structures', 'Algorithms']
              },
              {
                id: 'note-3',
                title: 'React Hooks Deep Dive',
                course: 'React.js Crash Course',
                content: '## Important Hooks\n\n1. **useState**\n   - State management\n   - Re-rendering\n\n2. **useEffect**\n   - Side effects\n   - Cleanup\n\n3. **useContext**\n   - Global state\n   - Prop drilling solution',
                lastUpdated: '3 days ago',
                tags: ['React', 'JavaScript', 'Web Development']
              },
              {
                id: 'note-4',
                title: 'SQL Queries and Joins',
                course: 'Database Design',
                content: '## SQL Operations\n\n1. **SELECT**\n   - Basic queries\n   - Filtering\n\n2. **JOINS**\n   - INNER JOIN\n   - LEFT/RIGHT JOIN\n   - FULL OUTER JOIN\n\n3. **Aggregations**\n   - GROUP BY\n   - HAVING',
                lastUpdated: '1 week ago',
                tags: ['SQL', 'Database', 'Queries']
              }
            ].map((note) => (
              <motion.div
                key={note.id}
                whileHover={{ scale: 1.02 }}
                className="bg-youtube-gray rounded-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-medium text-white mb-2">{note.title}</h3>
                      <p className="text-gray-400">{note.course}</p>
                    </div>
                    <span className="text-sm text-gray-400">{note.lastUpdated}</span>
                  </div>
                  
                  <div className="prose prose-invert max-w-none mb-4">
                    <div className="text-gray-300 whitespace-pre-line">
                      {note.content}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {note.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-youtube-black text-youtube-red text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-end space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-gray-400 hover:text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-gray-400 hover:text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* New Note Modal */}
          {showNewNoteModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-youtube-gray p-6 rounded-lg w-full max-w-4xl"
              >
                <h3 className="text-xl font-semibold text-white mb-4">Create New Note</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="w-full bg-youtube-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-youtube-red"
                  />
                  <select
                    className="w-full bg-youtube-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-youtube-red"
                  >
                    <option value="">Select Course</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                  
                  {/* Rich Text Editor Toolbar */}
                  <div className="bg-youtube-black p-2 rounded-t-lg flex flex-wrap gap-2">
                    <button className="p-2 hover:bg-gray-700 rounded">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                      </svg>
                    </button>
                    <button className="p-2 hover:bg-gray-700 rounded">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8M4 18h16" />
                      </svg>
                    </button>
                    <button className="p-2 hover:bg-gray-700 rounded">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                    </button>
                    <button className="p-2 hover:bg-gray-700 rounded">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                    <button className="p-2 hover:bg-gray-700 rounded">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                    </button>
                    <button className="p-2 hover:bg-gray-700 rounded">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                  
                  <textarea
                    placeholder="Write your note here..."
                    className="w-full h-64 bg-youtube-black text-white px-4 py-2 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-youtube-red resize-none"
                  />
                  
                  <div className="flex justify-end space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowNewNoteModal(false)}
                      className="px-4 py-2 text-gray-400 hover:text-white"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-youtube-red text-white rounded-lg hover:bg-red-700"
                    >
                      Save Note
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      )}

      {/* Progress Tab Content */}
      {activeTab === 'progress' && (
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-youtube-gray p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Total Study Time</h3>
              <p className="text-3xl font-bold">24h 45m</p>
              <p className="text-sm text-gray-400 mt-1">+3h 20m this week</p>
            </div>
            <div className="bg-youtube-gray p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Current Streak</h3>
              <p className="text-3xl font-bold">7 days</p>
              <p className="text-sm text-gray-400 mt-1">Best: 14 days</p>
            </div>
            <div className="bg-youtube-gray p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Videos Watched</h3>
              <p className="text-3xl font-bold">42</p>
              <p className="text-sm text-gray-400 mt-1">12 this week</p>
            </div>
            <div className="bg-youtube-gray p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Notes Taken</h3>
              <p className="text-3xl font-bold">156</p>
              <p className="text-sm text-gray-400 mt-1">23 this week</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">Study Focus Areas</h3>
            <div className="space-y-4">
              <div className="bg-youtube-gray p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg">Machine Learning</span>
                  <span className="text-gray-400">35%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div className="bg-youtube-red h-3 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
              <div className="bg-youtube-gray p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg">Data Science</span>
                  <span className="text-gray-400">25%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div className="bg-youtube-red h-3 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
              <div className="bg-youtube-gray p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg">Python Programming</span>
                  <span className="text-gray-400">20%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div className="bg-youtube-red h-3 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
              <div className="bg-youtube-gray p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg">Computer Science</span>
                  <span className="text-gray-400">20%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div className="bg-youtube-red h-3 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="bg-youtube-gray p-4 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-lg font-medium">Completed Machine Learning Course</p>
                  <p className="text-sm text-gray-400">2 hours ago</p>
                </div>
                <span className="text-youtube-red text-lg font-medium">+2h</span>
              </div>
              <div className="bg-youtube-gray p-4 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-lg font-medium">Added 5 notes to Python Tutorial</p>
                  <p className="text-sm text-gray-400">5 hours ago</p>
                </div>
                <span className="text-youtube-red text-lg font-medium">+5 notes</span>
              </div>
              <div className="bg-youtube-gray p-4 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-lg font-medium">Watched Data Structures Lecture</p>
                  <p className="text-sm text-gray-400">Yesterday</p>
                </div>
                <span className="text-youtube-red text-lg font-medium">+45m</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab Content */}
      {activeTab === 'settings' && (
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Settings</h2>

          {/* Study Preferences */}
          <div className="bg-youtube-gray rounded-lg p-6">
            <h3 className="text-xl font-medium text-white mb-4">Study Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Auto-pause on Note Taking</h4>
                  <p className="text-gray-400 text-sm">Automatically pause video when taking notes</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-youtube-red"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Study Timer</h4>
                  <p className="text-gray-400 text-sm">Show study session timer</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-youtube-red"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Break Reminders</h4>
                  <p className="text-gray-400 text-sm">Get reminded to take breaks every 25 minutes</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-youtube-red"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Auto-save Notes</h4>
                  <p className="text-gray-400 text-sm">Automatically save notes every 30 seconds</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-youtube-red"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-youtube-gray rounded-lg p-6">
            <h3 className="text-xl font-medium text-white mb-4">Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Study Reminders</h4>
                  <p className="text-gray-400 text-sm">Get daily reminders to study</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-youtube-red"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Course Updates</h4>
                  <p className="text-gray-400 text-sm">Notify when new content is added to your courses</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-youtube-red"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Achievement Alerts</h4>
                  <p className="text-gray-400 text-sm">Get notified when you reach study milestones</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-youtube-red"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-youtube-gray rounded-lg p-6">
            <h3 className="text-xl font-medium text-white mb-4">Appearance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Dark Mode</h4>
                  <p className="text-gray-400 text-sm">Use dark theme for better night studying</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-youtube-red"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Compact Mode</h4>
                  <p className="text-gray-400 text-sm">Show more content in less space</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-youtube-red"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Font Size</h4>
                  <p className="text-gray-400 text-sm">Adjust text size for better readability</p>
                </div>
                <select className="bg-youtube-black text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-youtube-red">
                  <option value="small">Small</option>
                  <option value="medium" selected>Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>
          </div>

          {/* Privacy & Data */}
          <div className="bg-youtube-gray rounded-lg p-6">
            <h3 className="text-xl font-medium text-white mb-4">Privacy & Data</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Study History</h4>
                  <p className="text-gray-400 text-sm">Save your study history and progress</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-youtube-red"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Data Sync</h4>
                  <p className="text-gray-400 text-sm">Sync your data across devices</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-youtube-red"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Analytics</h4>
                  <p className="text-gray-400 text-sm">Share anonymous usage data to improve the app</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-youtube-red"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Study Focus */}
          <div className="bg-youtube-gray rounded-lg p-6">
            <h3 className="text-xl font-medium text-white mb-4">Study Focus</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Distraction Blocking</h4>
                  <p className="text-gray-400 text-sm">Block distracting websites during study sessions</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-youtube-red"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Focus Music</h4>
                  <p className="text-gray-400 text-sm">Play ambient music during study sessions</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-youtube-red"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Study Timer Mode</h4>
                  <p className="text-gray-400 text-sm">Choose your preferred study timer method</p>
                </div>
                <select className="bg-youtube-black text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-youtube-red">
                  <option value="pomodoro">Pomodoro (25/5)</option>
                  <option value="custom">Custom</option>
                  <option value="flow">Flow Mode</option>
                </select>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-youtube-red text-white rounded-lg hover:bg-red-700 font-medium"
            >
              Save Changes
            </motion.button>
          </div>
        </div>
      )}

      {/* Other tabs content can be added here */}
    </div>
  )
}

export default YouTubeClassroom 