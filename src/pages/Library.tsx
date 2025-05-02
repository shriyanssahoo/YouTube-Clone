import { useState } from 'react'
import { Link } from 'react-router-dom'
import HistoryIcon from '@mui/icons-material/History'
import WatchLaterIcon from '@mui/icons-material/WatchLater'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay'

const Library = () => {
  const [playlists] = useState([
    {
      id: 'playlist-1',
      name: 'Favorite Videos',
      videoCount: 12,
      thumbnail: 'https://picsum.photos/seed/playlist1/320/180',
    },
    {
      id: 'playlist-2',
      name: 'Watch Later',
      videoCount: 8,
      thumbnail: 'https://picsum.photos/seed/playlist2/320/180',
    },
    {
      id: 'playlist-3',
      name: 'Study Materials',
      videoCount: 15,
      thumbnail: 'https://picsum.photos/seed/playlist3/320/180',
    },
  ])

  const sections = [
    {
      id: 'history',
      name: 'History',
      icon: <HistoryIcon />,
      link: '/history',
    },
    {
      id: 'watch-later',
      name: 'Watch Later',
      icon: <WatchLaterIcon />,
      link: '/watch-later',
    },
    {
      id: 'liked-videos',
      name: 'Liked Videos',
      icon: <ThumbUpIcon />,
      link: '/liked-videos',
    },
  ]

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-white mb-6">Library</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {sections.map((section) => (
          <Link
            key={section.id}
            to={section.link}
            className="flex items-center space-x-4 p-4 bg-youtube-gray rounded-lg hover:bg-youtube-gray-hover transition-colors"
          >
            <div className="text-youtube-red">{section.icon}</div>
            <span className="text-white">{section.name}</span>
          </Link>
        ))}
      </div>

      <div>
        <div className="flex items-center space-x-2 mb-4">
          <PlaylistPlayIcon className="text-youtube-red" />
          <h2 className="text-xl font-semibold text-white">Playlists</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {playlists.map((playlist) => (
            <Link
              key={playlist.id}
              to={`/playlist/${playlist.id}`}
              className="group"
            >
              <div className="relative">
                <img
                  src={playlist.thumbnail}
                  alt={playlist.name}
                  className="w-full aspect-video object-cover rounded-lg"
                />
                <div className="mt-2">
                  <h3 className="text-white font-medium group-hover:text-blue-400">
                    {playlist.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {playlist.videoCount} videos
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Library 