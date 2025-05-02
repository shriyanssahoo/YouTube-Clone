import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLikedVideosStore } from '../store/likedVideosStore'
import DeleteIcon from '@mui/icons-material/Delete'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

const LikedVideos = () => {
  const { likedVideos, removeLikedVideo } = useLikedVideosStore()
  const [videos] = useState([
    {
      id: 'video-1',
      title: 'Amazing Video Title',
      channel: 'Channel Name',
      views: '1.2M',
      timestamp: '2 days ago',
      likedAt: '2 hours ago',
      thumbnail: 'https://picsum.photos/seed/video1/320/180',
    },
    {
      id: 'video-2',
      title: 'Another Great Video',
      channel: 'Another Channel',
      views: '800K',
      timestamp: '1 week ago',
      likedAt: '5 hours ago',
      thumbnail: 'https://picsum.photos/seed/video2/320/180',
    },
    {
      id: 'video-3',
      title: 'Interesting Content',
      channel: 'Content Creator',
      views: '500K',
      timestamp: '3 days ago',
      likedAt: '1 day ago',
      thumbnail: 'https://picsum.photos/seed/video3/320/180',
    },
  ])

  const handleUnlike = (videoId: string) => {
    removeLikedVideo(videoId)
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <ThumbUpIcon className="text-red-500" />
          <h1 className="text-2xl font-bold text-white">Liked Videos</h1>
        </div>
        <button className="text-blue-400 hover:text-blue-300">
          Clear all liked videos
        </button>
      </div>

      {/* Videos List */}
      <div className="space-y-8">
        {videos.map((video) => (
          <div
            key={video.id}
            className="flex items-start space-x-4 p-4 bg-youtube-gray rounded-lg group"
          >
            <Link to={`/video/${video.id}`} className="flex-shrink-0">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-48 aspect-video object-cover rounded-lg"
              />
            </Link>

            <div className="flex-grow">
              <Link to={`/video/${video.id}`}>
                <h3 className="text-white font-medium group-hover:text-blue-400">
                  {video.title}
                </h3>
              </Link>
              <p className="text-gray-400 text-sm">{video.channel}</p>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>{video.views} views</span>
                <span>•</span>
                <span>{video.timestamp}</span>
                <span>•</span>
                <span>Liked {video.likedAt}</span>
              </div>
            </div>

            <button
              onClick={() => handleUnlike(video.id)}
              className="flex-shrink-0 text-gray-400 hover:text-white"
            >
              <DeleteIcon />
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {likedVideos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No liked videos yet</p>
          <p className="text-gray-500 text-sm mt-2">
            Videos you like will appear here
          </p>
        </div>
      )}
    </div>
  )
}

export default LikedVideos 