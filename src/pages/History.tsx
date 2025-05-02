import { useState } from 'react'
import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'

const History = () => {
  const [videos] = useState([
    {
      id: 'video-1',
      title: 'Amazing Video Title',
      channel: 'Channel Name',
      views: '1.2M',
      timestamp: '2 days ago',
      watchedAt: '2 hours ago',
      thumbnail: 'https://picsum.photos/seed/video1/320/180',
    },
    {
      id: 'video-2',
      title: 'Another Great Video',
      channel: 'Another Channel',
      views: '800K',
      timestamp: '1 week ago',
      watchedAt: '5 hours ago',
      thumbnail: 'https://picsum.photos/seed/video2/320/180',
    },
    {
      id: 'video-3',
      title: 'Interesting Content',
      channel: 'Content Creator',
      views: '500K',
      timestamp: '3 days ago',
      watchedAt: '1 day ago',
      thumbnail: 'https://picsum.photos/seed/video3/320/180',
    },
  ])

  const handleRemoveFromHistory = (videoId: string) => {
    // TODO: Implement remove from history functionality
    console.log('Remove from history:', videoId)
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Watch History</h1>
        <button className="text-youtube-red hover:text-red-600">
          Clear all watch history
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
                <span>Watched {video.watchedAt}</span>
              </div>
            </div>

            <button
              onClick={() => handleRemoveFromHistory(video.id)}
              className="flex-shrink-0 text-gray-400 hover:text-white"
            >
              <DeleteIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default History 