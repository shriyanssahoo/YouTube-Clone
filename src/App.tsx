import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSidebarStore } from './store/sidebarStore'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Video from './pages/Video'
import Explore from './pages/Explore'
import Subscriptions from './pages/Subscriptions'
import Library from './pages/Library'
import History from './pages/History'
import WatchLater from './pages/WatchLater'
import LikedVideos from './pages/LikedVideos'
import YouTubeClassroom from './pages/YouTubeClassroom'
import StudyMode from './pages/StudyMode'

const WelcomeAnimation = () => {
  return (
    <div className="fixed inset-0 bg-youtube-black flex items-center justify-center z-50">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex justify-center items-center w-full mb-4">
          <svg 
            viewBox="0 0 24 24" 
            fill="red" 
            className="h-16 w-16 animate-bounce"
          >
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
          </svg>
        </div>
        <span className="text-4xl font-bold text-white animate-fade-in">YouTube</span>
        <h1 className="text-2xl text-gray-400 animate-fade-in mt-4">
          Welcome to YouTube
        </h1>
      </div>
    </div>
  )
}

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true)
  const { isOpen } = useSidebarStore()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-youtube-black text-white">
      {showWelcome && <WelcomeAnimation />}
      <div className={`transition-opacity duration-500 ${showWelcome ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        <div className="flex pt-16">
          <Sidebar />
          <main className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
            <div className="p-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/video/:id" element={<Video />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/subscriptions" element={<Subscriptions />} />
                <Route path="/library" element={<Library />} />
                <Route path="/history" element={<History />} />
                <Route path="/watch-later" element={<WatchLater />} />
                <Route path="/liked-videos" element={<LikedVideos />} />
                <Route path="/classroom" element={<YouTubeClassroom />} />
                <Route path="/study-mode/:videoId" element={<StudyMode />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App 