import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import MicIcon from '@mui/icons-material/Mic'
import VideoCallIcon from '@mui/icons-material/VideoCall'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-youtube-black px-4 py-2 flex items-center justify-between">
      <div className="flex items-center">
        <button className="p-2 hover:bg-youtube-gray rounded-full">
          <MenuIcon className="text-white" />
        </button>
        <div className="flex items-center ml-4">
          <img src="/youtube-logo.png" alt="YouTube" className="h-6" />
        </div>
      </div>

      <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
        <div className="flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full px-4 py-2 bg-youtube-black border border-youtube-gray rounded-l-full focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-youtube-gray border border-youtube-gray rounded-r-full hover:bg-opacity-80"
          >
            <SearchIcon className="text-white" />
          </button>
        </div>
      </form>

      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-youtube-gray rounded-full">
          <MicIcon className="text-white" />
        </button>
        <button className="p-2 hover:bg-youtube-gray rounded-full">
          <VideoCallIcon className="text-white" />
        </button>
        <button className="p-2 hover:bg-youtube-gray rounded-full">
          <NotificationsIcon className="text-white" />
        </button>
        <button className="p-2 hover:bg-youtube-gray rounded-full">
          <AccountCircleIcon className="text-white" />
        </button>
      </div>
    </header>
  )
}

export default Header 