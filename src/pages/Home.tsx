import { useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [videos] = useState([
    {
      id: 'dQw4w9WgXcQ',
      title: 'Rick Astley - Never Gonna Give You Up',
      channel: 'Rick Astley',
      views: '1.2B',
      timestamp: '14 years ago',
      thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
    },
    {
      id: 'jNQXAC9IVRw',
      title: 'Me at the zoo',
      channel: 'jawed',
      views: '303M',
      timestamp: '18 years ago',
      thumbnail: 'https://i.ytimg.com/vi/jNQXAC9IVRw/maxresdefault.jpg'
    },
    {
      id: 'kJQP7kiw5Fk',
      title: 'Luis Fonsi - Despacito ft. Daddy Yankee',
      channel: 'Luis Fonsi',
      views: '8.3B',
      timestamp: '6 years ago',
      thumbnail: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/maxresdefault.jpg'
    },
    {
      id: '9bZkp7q19f0',
      title: 'PSY - Gangnam Style',
      channel: 'PSY',
      views: '4.5B',
      timestamp: '11 years ago',
      thumbnail: 'https://i.ytimg.com/vi/9bZkp7q19f0/maxresdefault.jpg'
    },
    {
      id: 'OPf0YbXqDm0',
      title: 'Mark Ronson - Uptown Funk ft. Bruno Mars',
      channel: 'Mark Ronson',
      views: '4.7B',
      timestamp: '8 years ago',
      thumbnail: 'https://i.ytimg.com/vi/OPf0YbXqDm0/maxresdefault.jpg'
    },
    {
      id: 'hT_nvWreIhg',
      title: 'OneRepublic - Counting Stars',
      channel: 'OneRepublic',
      views: '3.9B',
      timestamp: '10 years ago',
      thumbnail: 'https://i.ytimg.com/vi/hT_nvWreIhg/maxresdefault.jpg'
    },
    {
      id: 'JGwWNGJdvx8',
      title: 'Ed Sheeran - Shape of You',
      channel: 'Ed Sheeran',
      views: '5.8B',
      timestamp: '6 years ago',
      thumbnail: 'https://i.ytimg.com/vi/JGwWNGJdvx8/maxresdefault.jpg'
    },
    {
      id: '09R8_2nJtjg',
      title: 'Maroon 5 - Sugar',
      channel: 'Maroon 5',
      views: '3.9B',
      timestamp: '8 years ago',
      thumbnail: 'https://i.ytimg.com/vi/09R8_2nJtjg/maxresdefault.jpg'
    },
    {
      id: 'RgKAFK5djSk',
      title: 'Wiz Khalifa - See You Again ft. Charlie Puth',
      channel: 'Wiz Khalifa',
      views: '5.1B',
      timestamp: '8 years ago',
      thumbnail: 'https://i.ytimg.com/vi/RgKAFK5djSk/maxresdefault.jpg'
    },
    {
      id: 'YqeW9_5kURI',
      title: 'Major Lazer & DJ Snake - Lean On',
      channel: 'Major Lazer',
      views: '3.5B',
      timestamp: '8 years ago',
      thumbnail: 'https://i.ytimg.com/vi/YqeW9_5kURI/maxresdefault.jpg'
    },
    {
      id: 'pRpeEdMmmQ0',
      title: 'Imagine Dragons - Believer',
      channel: 'ImagineDragons',
      views: '2.1B',
      timestamp: '6 years ago',
      thumbnail: 'https://i.ytimg.com/vi/pRpeEdMmmQ0/maxresdefault.jpg'
    },
    {
      id: 'FM7MFYoylVs',
      title: 'The Chainsmokers & Coldplay - Something Just Like This',
      channel: 'The Chainsmokers',
      views: '2.1B',
      timestamp: '6 years ago',
      thumbnail: 'https://i.ytimg.com/vi/FM7MFYoylVs/maxresdefault.jpg'
    },
    {
      id: 'fJ9rUzIMcZQ',
      title: 'Queen - Bohemian Rhapsody (Official Video)',
      channel: 'Queen Official',
      views: '1.6B',
      timestamp: '13 years ago',
      thumbnail: 'https://i.ytimg.com/vi/fJ9rUzIMcZQ/maxresdefault.jpg'
    },
    {
      id: 'CevxZvSJLk8',
      title: 'Katy Perry - Roar',
      channel: 'Katy Perry',
      views: '3.5B',
      timestamp: '10 years ago',
      thumbnail: 'https://i.ytimg.com/vi/CevxZvSJLk8/maxresdefault.jpg'
    },
    {
      id: 'YBHQbu5rbdQ',
      title: 'Taylor Swift - Shake It Off',
      channel: 'Taylor Swift',
      views: '3.4B',
      timestamp: '9 years ago',
      thumbnail: 'https://i.ytimg.com/vi/YBHQbu5rbdQ/maxresdefault.jpg'
    },
    {
      id: 'JRfuAukYTKg',
      title: 'Charlie Puth - We Don\'t Talk Anymore',
      channel: 'Charlie Puth',
      views: '3.1B',
      timestamp: '7 years ago',
      thumbnail: 'https://i.ytimg.com/vi/JRfuAukYTKg/maxresdefault.jpg'
    },
    {
      id: 'YQHsXMglC9A',
      title: 'Adele - Hello',
      channel: 'Adele',
      views: '3.1B',
      timestamp: '8 years ago',
      thumbnail: 'https://i.ytimg.com/vi/YQHsXMglC9A/maxresdefault.jpg'
    },
    {
      id: 'JZjAg6fK-BQ',
      title: 'Justin Bieber - Baby ft. Ludacris',
      channel: 'Justin Bieber',
      views: '2.8B',
      timestamp: '13 years ago',
      thumbnail: 'https://i.ytimg.com/vi/JZjAg6fK-BQ/maxresdefault.jpg'
    },
    {
      id: 'KnL2RJZTdA4',
      title: 'The Weeknd - Blinding Lights',
      channel: 'The Weeknd',
      views: '3.5B',
      timestamp: '3 years ago',
      thumbnail: 'https://i.ytimg.com/vi/KnL2RJZTdA4/maxresdefault.jpg'
    },
    {
      id: 'RBumgq5yVrA',
      title: 'Passenger - Let Her Go',
      channel: 'Passenger',
      views: '3.3B',
      timestamp: '11 years ago',
      thumbnail: 'https://i.ytimg.com/vi/RBumgq5yVrA/maxresdefault.jpg'
    },
    {
      id: 'lp-EO5I60KA',
      title: 'Ed Sheeran - Thinking Out Loud',
      channel: 'Ed Sheeran',
      views: '3.6B',
      timestamp: '8 years ago',
      thumbnail: 'https://i.ytimg.com/vi/lp-EO5I60KA/maxresdefault.jpg'
    },
    {
      id: 'PT2_F-1esPk',
      title: 'The Weeknd - Starboy ft. Daft Punk',
      channel: 'The Weeknd',
      views: '2.4B',
      timestamp: '6 years ago',
      thumbnail: 'https://i.ytimg.com/vi/PT2_F-1esPk/maxresdefault.jpg'
    },
    {
      id: 'JcdXKXY_qK4',
      title: 'Justin Bieber - Sorry',
      channel: 'Justin Bieber',
      views: '3.8B',
      timestamp: '7 years ago',
      thumbnail: 'https://i.ytimg.com/vi/JcdXKXY_qK4/maxresdefault.jpg'
    },
    {
      id: 'papuvlVeZg8',
      title: 'The Weeknd - Save Your Tears',
      channel: 'The Weeknd',
      views: '1.2B',
      timestamp: '2 years ago',
      thumbnail: 'https://i.ytimg.com/vi/papuvlVeZg8/maxresdefault.jpg'
    },
    {
      id: 'aJOTlE1K90k',
      title: 'Maroon 5 - Girls Like You ft. Cardi B',
      channel: 'Maroon 5',
      views: '3.3B',
      timestamp: '5 years ago',
      thumbnail: 'https://i.ytimg.com/vi/aJOTlE1K90k/maxresdefault.jpg'
    },
    {
      id: 'fLexgOxsZu0',
      title: 'Bruno Mars - The Lazy Song',
      channel: 'Bruno Mars',
      views: '2.2B',
      timestamp: '12 years ago',
      thumbnail: 'https://i.ytimg.com/vi/fLexgOxsZu0/maxresdefault.jpg'
    },
    {
      id: 'YykjpeuMNEk',
      title: 'Coldplay - Hymn For The Weekend',
      channel: 'Coldplay',
      views: '1.8B',
      timestamp: '7 years ago',
      thumbnail: 'https://i.ytimg.com/vi/YykjpeuMNEk/maxresdefault.jpg'
    },
    {
      id: 'nfWlot6h_JM',
      title: 'Taylor Swift - Blank Space',
      channel: 'Taylor Swift',
      views: '3.1B',
      timestamp: '8 years ago',
      thumbnail: 'https://i.ytimg.com/vi/nfWlot6h_JM/maxresdefault.jpg'
    },
    {
      id: 'JQbjS0_ZfJ0',
      title: 'Katy Perry - Chained To The Rhythm',
      channel: 'Katy Perry',
      views: '780M',
      timestamp: '6 years ago',
      thumbnail: 'https://i.ytimg.com/vi/JQbjS0_ZfJ0/maxresdefault.jpg'
    },
    {
      id: 'QYh6mYIJG2Y',
      title: 'Sean Paul - Get Busy',
      channel: 'Sean Paul',
      views: '154M',
      timestamp: '13 years ago',
      thumbnail: 'https://i.ytimg.com/vi/QYh6mYIJG2Y/maxresdefault.jpg'
    },
    {
      id: 'foE1mO2yM04',
      title: 'The Weeknd - Die For You',
      channel: 'The Weeknd',
      views: '1.1B',
      timestamp: '6 years ago',
      thumbnail: 'https://i.ytimg.com/vi/foE1mO2yM04/maxresdefault.jpg'
    },
    {
      id: 'VbfpW0pbvaU',
      title: 'Coldplay - Adventure Of A Lifetime',
      channel: 'Coldplay',
      views: '1.2B',
      timestamp: '7 years ago',
      thumbnail: 'https://i.ytimg.com/vi/VbfpW0pbvaU/maxresdefault.jpg'
    }
  ])

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((video) => (
          <a
            key={video.id}
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
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
          </a>
        ))}
      </div>
    </div>
  )
}

export default Home 