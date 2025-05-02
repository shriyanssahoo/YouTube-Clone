import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

interface SearchResult {
  id: string
  title: string
  thumbnail: string
  channel: string
  views: string
  timestamp: string
  description: string
  channelAvatar: string
}

const Search = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')
  const [results, setResults] = useState<SearchResult[]>([])

  useEffect(() => {
    // In a real app, this would fetch from an API
    const mockResults: SearchResult[] = Array(10).fill(null).map((_, index) => ({
      id: `video-${index}`,
      title: `${query} - Result ${index + 1}`,
      thumbnail: `https://picsum.photos/seed/search-${index}/320/180`,
      channel: `Channel ${index + 1}`,
      views: `${Math.floor(Math.random() * 1000)}K views`,
      timestamp: `${Math.floor(Math.random() * 24)} hours ago`,
      description: `This is a detailed description of the search result ${index + 1} for "${query}"...`,
      channelAvatar: `https://picsum.photos/seed/channel-${index}/40/40`,
    }))

    setResults(mockResults)
  }, [query])

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-xl font-bold mb-4">Search Results for "{query}"</h1>
      <div className="space-y-4">
        {results.map((result) => (
          <Link
            key={result.id}
            to={`/video/${result.id}`}
            className="flex space-x-4 hover:bg-youtube-gray p-2 rounded-lg"
          >
            <div className="w-64 flex-shrink-0">
              <img
                src={result.thumbnail}
                alt={result.title}
                className="w-full aspect-video object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-medium">{result.title}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-sm text-gray-400">{result.views}</span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-400">{result.timestamp}</span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <img
                  src={result.channelAvatar}
                  alt={result.channel}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-sm text-gray-400">{result.channel}</span>
              </div>
              <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                {result.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Search 