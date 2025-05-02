import { useState } from 'react'
import { Link } from 'react-router-dom'

const Explore = () => {
  const [categories] = useState([
    { id: 'trending', name: 'Trending', icon: '🔥' },
    { id: 'music', name: 'Music', icon: '🎵' },
    { id: 'gaming', name: 'Gaming', icon: '🎮' },
    { id: 'sports', name: 'Sports', icon: '⚽' },
    { id: 'news', name: 'News', icon: '📰' },
    { id: 'education', name: 'Education', icon: '📚' },
    { id: 'tech', name: 'Technology', icon: '💻' },
    { id: 'cooking', name: 'Cooking', icon: '👨‍🍳' },
  ])

  const [trendingVideos] = useState([
    {
      id: 'trending-1',
      title: 'Trending Video 1',
      channel: 'Popular Channel',
      views: '5.2M',
      timestamp: '1 day ago',
      thumbnail: 'https://picsum.photos/seed/trending1/320/180',
    },
    {
      id: 'trending-2',
      title: 'Trending Video 2',
      channel: 'Trending Creator',
      views: '3.8M',
      timestamp: '2 days ago',
      thumbnail: 'https://picsum.photos/seed/trending2/320/180',
    },
    {
      id: 'trending-3',
      title: 'Trending Video 3',
      channel: 'Viral Channel',
      views: '2.1M',
      timestamp: '3 days ago',
      thumbnail: 'https://picsum.photos/seed/trending3/320/180',
    },
  ])

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/explore/${category.id}`}
            className="flex items-center justify-center p-4 bg-youtube-gray rounded-lg hover:bg-youtube-gray-hover transition-colors"
          >
            <span className="text-2xl mr-2">{category.icon}</span>
            <span className="text-white">{category.name}</span>
          </Link>
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Trending Now</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {trendingVideos.map((video) => (
            <Link key={video.id} to={`/video/${video.id}`} className="group">
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full aspect-video object-cover rounded-lg"
                />
                <div className="mt-2">
                  <h3 className="text-white font-medium group-hover:text-blue-400">
                    {video.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{video.channel}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span>{video.views} views</span>
                    <span>•</span>
                    <span>{video.timestamp}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Explore 