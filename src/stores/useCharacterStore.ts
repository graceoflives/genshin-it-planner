import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { CharacterProps } from '../types'

interface CharacterState {
  characters: CharacterProps[]
  saveData: (data: CharacterProps[]) => void
}
const useCharacterStore = create<CharacterState>()(
  persist(
    (set) => ({
      characters: [],
      saveData: (data) => set(() => ({ characters: data }))
    }),
    {
      name: 'character-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)

export default useCharacterStore
