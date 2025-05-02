import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

interface Video {
  id: string
  title: string
  thumbnail: string
  views: string
  timestamp: string
}

interface Channel {
  name: string
  avatar: string
  subscribers: string
  description: string
  banner: string
}

const Channel = () => {
  const { id } = useParams()
  const [channel, setChannel] = useState<Channel>({
    name: 'Channel Name',
    avatar: 'https://picsum.photos/seed/channel/100/100',
    subscribers: '1.2M subscribers',
    description: 'This is a detailed description of the channel...',
    banner: 'https://picsum.photos/seed/banner/1200/200',
  })

  const [videos, setVideos] = useState<Video[]>([])

  useEffect(() => {
    // In a real app, this would fetch from an API
    const mockVideos: Video[] = Array(12).fill(null).map((_, index) => ({
      id: `video-${index}`,
      title: `Channel Video ${index + 1}`,
      thumbnail: `https://picsum.photos/seed/video-${index}/320/180`,
      views: `${Math.floor(Math.random() * 1000)}K views`,
      timestamp: `${Math.floor(Math.random() * 24)} hours ago`,
    }))

    setVideos(mockVideos)
  }, [])

  return (
    <div>
      <div className="relative">
        <img
          src={channel.banner}
          alt={channel.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-24" />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-4 -mt-16 mb-8">
          <img
            src={channel.avatar}
            alt={channel.name}
            className="w-32 h-32 rounded-full border-4 border-youtube-black"
          />
          <div>
            <h1 className="text-2xl font-bold">{channel.name}</h1>
            <p className="text-gray-400">{channel.subscribers}</p>
          </div>
          <button className="ml-auto bg-red-600 text-white px-6 py-2 rounded-full">
            Subscribe
          </button>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">About</h2>
          <p className="text-gray-400">{channel.description}</p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {videos.map((video) => (
              <Link key={video.id} to={`/video/${video.id}`} className="block">
                <div className="bg-youtube-gray rounded-lg overflow-hidden">
                  <div className="relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full aspect-video object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium line-clamp-2">{video.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {video.views} • {video.timestamp}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channel 