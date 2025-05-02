import { useState } from 'react'
import { Link } from 'react-router-dom'

const Subscriptions = () => {
  const [channels] = useState([
    {
      id: 'channel-1',
      name: 'Tech Channel',
      avatar: 'https://picsum.photos/seed/channel1/100/100',
      subscribers: '2.5M',
      videos: [
        {
          id: 'video-1',
          title: 'Latest Tech Review',
          thumbnail: 'https://picsum.photos/seed/video1/320/180',
          views: '500K',
          timestamp: '2 days ago',
        },
        {
          id: 'video-2',
          title: 'New Gadget Unboxing',
          thumbnail: 'https://picsum.photos/seed/video2/320/180',
          views: '300K',
          timestamp: '1 week ago',
        },
      ],
    },
    {
      id: 'channel-2',
      name: 'Gaming Channel',
      avatar: 'https://picsum.photos/seed/channel2/100/100',
      subscribers: '1.8M',
      videos: [
        {
          id: 'video-3',
          title: 'Gameplay Highlights',
          thumbnail: 'https://picsum.photos/seed/video3/320/180',
          views: '800K',
          timestamp: '1 day ago',
        },
        {
          id: 'video-4',
          title: 'New Game Review',
          thumbnail: 'https://picsum.photos/seed/video4/320/180',
          views: '600K',
          timestamp: '3 days ago',
        },
      ],
    },
  ])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-white mb-6">Subscriptions</h1>
      
      {channels.map((channel) => (
        <div key={channel.id} className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={channel.avatar}
              alt={channel.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold text-white">{channel.name}</h2>
              <p className="text-gray-400 text-sm">{channel.subscribers} subscribers</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {channel.videos.map((video) => (
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
      ))}
    </div>
  )
}

export default Subscriptions 