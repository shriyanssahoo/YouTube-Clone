import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'

const MiniPlayer = () => {
  const { id } = useParams()
  const [isVisible, setIsVisible] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: window.innerWidth - 320, y: 100 })

  useEffect(() => {
    const handleScroll = () => {
      const videoElement = document.querySelector('.video-player')
      if (videoElement) {
        const rect = videoElement.getBoundingClientRect()
        setIsVisible(rect.bottom < 0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    const startX = e.clientX - position.x
    const startY = e.clientY - position.y

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: Math.max(0, Math.min(window.innerWidth - 300, e.clientX - startX)),
          y: Math.max(0, Math.min(window.innerHeight - 169, e.clientY - startY))
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  if (!isVisible || !id) return null

  return (
    <div
      className="fixed z-50 bg-black rounded-lg shadow-lg overflow-hidden transition-all duration-300"
      style={{
        width: '300px',
        height: '169px',
        left: position.x,
        top: position.y,
        cursor: isDragging ? 'grabbing' : 'grab',
        transform: isDragging ? 'scale(1.02)' : 'scale(1)'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={() => setIsVisible(false)}
          className="bg-black bg-opacity-50 rounded-full p-1 text-white hover:bg-opacity-75 transition-colors"
        >
          <CloseIcon fontSize="small" />
        </button>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${id}?autoplay=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  )
}

export default MiniPlayer 