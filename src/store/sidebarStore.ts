import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SidebarState {
  isOpen: boolean
  toggleSidebar: () => void
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isOpen: true,

      toggleSidebar: () =>
        set((state) => ({
          isOpen: !state.isOpen,
        })),
    }),
    {
      name: 'sidebar-storage',
    }
  )
) 