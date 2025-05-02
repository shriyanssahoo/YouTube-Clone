import { useStudyModeStore } from '../store/studyModeStore'
import SchoolIcon from '@mui/icons-material/School'

const StudyModeToggle = () => {
  const { isActive, toggleStudyMode } = useStudyModeStore()

  return (
    <button
      onClick={toggleStudyMode}
      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
        isActive
          ? 'bg-youtube-red text-white'
          : 'bg-youtube-gray text-gray-400 hover:text-white'
      }`}
    >
      <SchoolIcon />
      <span>{isActive ? 'Exit Study Mode' : 'Enter Study Mode'}</span>
    </button>
  )
}

export default StudyModeToggle 