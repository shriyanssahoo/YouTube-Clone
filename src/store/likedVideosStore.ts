import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LikedVideo {
  id: string
  title: string
  thumbnail: string
}

interface LikedVideosState {
  likedVideos: LikedVideo[]
  addLikedVideo: (video: LikedVideo) => void
  removeLikedVideo: (videoId: string) => void
  isLiked: (videoId: string) => boolean
}

export const useLikedVideosStore = create<LikedVideosState>()(
  persist(
    (set, get) => ({
      likedVideos: [],

      addLikedVideo: (video) =>
        set((state) => ({
          likedVideos: [...state.likedVideos, video],
        })),

      removeLikedVideo: (videoId) =>
        set((state) => ({
          likedVideos: state.likedVideos.filter((video) => video.id !== videoId),
        })),

      isLiked: (videoId) =>
        get().likedVideos.some((video) => video.id === videoId),
    }),
    {
      name: 'liked-videos-storage',
    }
  )
) 