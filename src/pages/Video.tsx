import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useLikedVideosStore } from '../store/likedVideosStore'
import { useStudyModeStore } from '../store/studyModeStore'
import StudyModeToggle from '../components/StudyModeToggle'
import StudyModePanel from '../components/StudyModePanel'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ShareIcon from '@mui/icons-material/Share'
import SaveIcon from '@mui/icons-material/Save'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

const Video = () => {
  const { id } = useParams()
  const [videoData, setVideoData] = useState({
    id: '',
    title: '',
    channel: '',
    views: '',
    timestamp: '',
    description: '',
    thumbnail: ''
  })
  const { addLikedVideo, removeLikedVideo, isLiked: isVideoLiked } = useLikedVideosStore()
  const { isActive: isStudyModeActive } = useStudyModeStore()

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
      <div className={`flex-1 ${isStudyModeActive ? 'lg:w-2/3' : 'lg:w-full'}`}>
        <div className="aspect-video bg-black rounded-lg overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
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
              <button className="text-gray-400 hover:text-white">
                <MoreHorizIcon />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-youtube-gray rounded-lg">
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
        <div className="lg:w-1/3 h-[calc(100vh-8rem)]">
          <StudyModePanel />
        </div>
      )}
    </div>
  )
}

export default Video 