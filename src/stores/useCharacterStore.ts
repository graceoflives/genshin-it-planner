import { create } from 'zustand'
import type { CharacterProps } from '../types'

interface CharacterState {
  characters: CharacterProps[]
  saveData: (data: CharacterProps[]) => void
}
const useCharacterStore = create<CharacterState>()((set) => ({
  characters: [],
  saveData: (data) => set(() => ({ characters: data }))
}))

export default useCharacterStore
