import { Link, useLocation } from 'react-router-dom'
import { useSidebarStore } from '../store/sidebarStore'
import HomeIcon from '@mui/icons-material/Home'
import ExploreIcon from '@mui/icons-material/Explore'
import SubscriptionsIcon from '@mui/icons-material/Subscriptions'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import HistoryIcon from '@mui/icons-material/History'
import WatchLaterIcon from '@mui/icons-material/WatchLater'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import SchoolIcon from '@mui/icons-material/School'

const Sidebar = () => {
  const { isOpen } = useSidebarStore()
  const location = useLocation()

  const menuItems = [
    { icon: <HomeIcon />, label: 'Home', path: '/' },
    { icon: <ExploreIcon />, label: 'Explore', path: '/explore' },
    { icon: <SubscriptionsIcon />, label: 'Subscriptions', path: '/subscriptions' },
    { icon: <VideoLibraryIcon />, label: 'Library', path: '/library' },
    { icon: <HistoryIcon />, label: 'History', path: '/history' },
    { icon: <WatchLaterIcon />, label: 'Watch Later', path: '/watch-later' },
    { icon: <ThumbUpIcon />, label: 'Liked Videos', path: '/liked-videos' },
    { 
      icon: <SchoolIcon />, 
      label: 'YouTube Classroom', 
      path: '/classroom',
      isNew: true 
    },
  ]

  return (
    <div
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-youtube-black border-r border-youtube-gray transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="p-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-4 p-2 rounded-lg hover:bg-youtube-gray-hover mb-1 ${
              location.pathname === item.path ? 'bg-youtube-gray' : ''
            }`}
          >
            <span className="text-gray-400">{item.icon}</span>
            {isOpen && (
              <div className="flex items-center">
                <span className="text-white">{item.label}</span>
                {item.isNew && (
                  <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-youtube-red text-white rounded-full animate-blink-new">
                    NEW
                  </span>
                )}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Sidebar 