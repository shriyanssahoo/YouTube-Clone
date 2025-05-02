import { useState } from 'react'
import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'

const WatchLater = () => {
  const [videos] = useState([
    {
      id: 'video-1',
      title: 'Amazing Video Title',
      channel: 'Channel Name',
      views: '1.2M',
      timestamp: '2 days ago',
      addedAt: '2 hours ago',
      thumbnail: 'https://picsum.photos/seed/video1/320/180',
    },
    {
      id: 'video-2',
      title: 'Another Great Video',
      channel: 'Another Channel',
      views: '800K',
      timestamp: '1 week ago',
      addedAt: '5 hours ago',
      thumbnail: 'https://picsum.photos/seed/video2/320/180',
    },
    {
      id: 'video-3',
      title: 'Interesting Content',
      channel: 'Content Creator',
      views: '500K',
      timestamp: '3 days ago',
      addedAt: '1 day ago',
      thumbnail: 'https://picsum.photos/seed/video3/320/180',
    },
  ])

  const handleRemoveFromWatchLater = (videoId: string) => {
    // TODO: Implement remove from watch later functionality
    console.log('Remove from watch later:', videoId)
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Watch Later</h1>
        <button className="text-youtube-red hover:text-red-600">
          Clear all watch later videos
        </button>
      </div>

      <div className="space-y-4">
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
                <span>Added {video.addedAt}</span>
              </div>
            </div>

            <button
              onClick={() => handleRemoveFromWatchLater(video.id)}
              className="flex-shrink-0 text-gray-400 hover:text-white"
            >
              <DeleteIcon />
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {videos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No videos in Watch Later</p>
          <p className="text-gray-500 text-sm mt-2">
            Videos you save to watch later will appear here
          </p>
        </div>
      )}
    </div>
  )
}

export default WatchLater 