import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSidebarStore } from '../store/sidebarStore'
import MenuIcon from '@mui/icons-material/Menu'
import VideoCallIcon from '@mui/icons-material/VideoCall'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const Navbar = () => {
  const { toggleSidebar } = useSidebarStore()

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-youtube-black flex items-center justify-between px-4 z-50 border-b border-youtube-gray">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-white"
        >
          <MenuIcon />
        </button>
        <Link to="/" className="flex items-center">
          <img
            src="/youtube-logo.svg"
            alt="YouTube"
            className="h-6"
          />
          <span className="text-white text-xl font-semibold -ml-1">YouTube</span>
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <button className="text-gray-400 hover:text-white">
          <VideoCallIcon />
        </button>
        <button className="text-gray-400 hover:text-white">
          <NotificationsIcon />
        </button>
        <button className="text-gray-400 hover:text-white">
          <AccountCircleIcon />
        </button>
      </div>
    </div>
  )
}

export default Navbar 