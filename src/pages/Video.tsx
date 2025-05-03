import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useLikedVideosStore } from '../store/likedVideosStore'
import { useStudyModeStore } from '../store/studyModeStore'
import StudyModeToggle from '../components/StudyModeToggle'
import StudyModePanel from '../components/StudyModePanel'
import MiniPlayer from '../components/MiniPlayer'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ShareIcon from '@mui/icons-material/Share'
import SaveIcon from '@mui/icons-material/Save'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'

const Video = () => {
  const { id } = useParams()
  const videoRef = useRef<HTMLIFrameElement>(null)
  const [videoData, setVideoData] = useState({
    id: '',
    title: '',
    channel: '',
    views: '',
    timestamp: '',
    description: '',
    thumbnail: ''
  })
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const { addLikedVideo, removeLikedVideo, isLiked: isVideoLiked } = useLikedVideosStore()
  const { isActive: isStudyModeActive, activeTab, setActiveTab } = useStudyModeStore()

  useEffect(() => {
    // In a real app, this would fetch from an API
    setVideoData({
      id: id || 'video-0',
      title: 'Amazing Video Title',
      views: '1.2M views',
      timestamp: '2 days ago',
      channel: 'Channel Name',
      description: 'This is a detailed description of the video...',
      thumbnail: 'https://picsum.photos/seed/video/320/180'
    })
  }, [id])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault()
          setIsPlaying(prev => !prev)
          // In a real app, this would control the video player
          break
        case 'n':
          e.preventDefault()
          setActiveTab(activeTab === 'notes' ? 'todos' : 'notes')
          break
        case 'ArrowRight':
          e.preventDefault()
          // Skip forward 5 seconds
          break
        case 'ArrowLeft':
          e.preventDefault()
          // Skip backward 5 seconds
          break
        case 'm':
          e.preventDefault()
          setIsMuted(prev => !prev)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeTab, setActiveTab])

  const handleLike = () => {
    if (isVideoLiked(videoData.id)) {
      removeLikedVideo(videoData.id)
    } else {
      addLikedVideo(videoData)
    }
  }

  const handleDislike = () => {
    // Remove unused declarations
    // const [isDisliked, setIsDisliked] = useState(false)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4">
      {/* Main Content */}
      <div className={`flex-1 ${isStudyModeActive ? 'lg:w-[70vw]' : 'lg:w-full'}`}>
        <div className="aspect-video bg-black rounded-lg overflow-hidden video-player relative w-[70vw] max-w-[800px] mx-auto">
          <iframe
            ref={videoRef}
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsPlaying(prev => !prev)}
                className="text-white hover:text-gray-300"
              >
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              </button>
              <button
                onClick={() => setIsMuted(prev => !prev)}
                className="text-white hover:text-gray-300"
              >
                {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
              </button>
              <button className="text-white hover:text-gray-300">
                <SkipPreviousIcon />
              </button>
              <button className="text-white hover:text-gray-300">
                <SkipNextIcon />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h1 className="text-xl font-bold text-white">{videoData.title}</h1>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">{videoData.views}</span>
              <span className="text-gray-400">{videoData.timestamp}</span>
            </div>
            <div className="flex items-center space-x-4">
              <StudyModeToggle />
              <button
                onClick={handleLike}
                className={`flex items-center space-x-1 ${
                  isVideoLiked(videoData.id) ? 'text-blue-500' : 'text-gray-400 hover:text-white'
                }`}
              >
                <ThumbUpIcon />
                <span>Like</span>
              </button>
              <button
                onClick={handleDislike}
                className={`flex items-center space-x-1 ${
                  'text-gray-400 hover:text-white'
                }`}
              >
                <ThumbDownIcon />
                <span>Dislike</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-400 hover:text-white">
                <ShareIcon />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-400 hover:text-white">
                <SaveIcon />
                <span>Save</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-400 hover:text-white">
                <MoreHorizIcon />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
            <div>
              <h3 className="font-semibold text-white">{videoData.channel}</h3>
              <p className="text-sm text-gray-400">1.2M subscribers</p>
            </div>
            <button className="ml-auto bg-red-600 text-white px-4 py-2 rounded-full">
              Subscribe
            </button>
          </div>
          <p className="mt-4 text-white whitespace-pre-line">
            {videoData.description}
          </p>
        </div>
      </div>

      {/* Study Mode Panel */}
      {isStudyModeActive && (
        <div className="lg:flex-1">
          <StudyModePanel />
        </div>
      )}

      {/* Mini Player */}
      <MiniPlayer />
    </div>
  )
}

export default Video 