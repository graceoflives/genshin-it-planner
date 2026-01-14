import { create } from 'zustand'
import type { CharacterName, ElementType } from '../types'

interface CustomDataState {
  elements: ElementType[]
  setElements: (elements: ElementType[]) => void
  characters: CharacterName[]
  setCharacters: (characters: CharacterName[]) => void
  specialGuests: CharacterName[]
  setSpecialGuests: (guests: CharacterName[]) => void
  isApplied: boolean
  setIsApplied: (isApplied: boolean) => void
}
const useCustomDataStore = create<CustomDataState>()((set) => ({
  elements: [],
  characters: [],
  specialGuests: [],
  isApplied: false,
  setElements: (elements) => set(() => ({ elements })),
  setCharacters: (characters) => set(() => ({ characters })),
  setSpecialGuests: (specialGuests) => set(() => ({ specialGuests })),
  setIsApplied: (isApplied) => set(() => ({ isApplied }))
}))

export default useCustomDataStore
