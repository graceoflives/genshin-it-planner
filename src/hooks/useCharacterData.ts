import { useEffect, useState } from 'react'
import useCharacterStore from '../stores/useCharacterStore'
import defaultList from '../assets/character_details.json'
import type { CharacterName, CharacterProps } from '../types'

const useCharacterData = () => {
  const [rawCharacterData, setRawCharacterData] = useState('')
  const { saveData } = useCharacterStore()
  const [inputState, setInputState] = useState('default')
  const [inputMsg, setInputMsg] = useState('')
  useEffect(() => {
    try {
      if (!rawCharacterData) {
        setInputState('default')
        setInputMsg('')
        return
      }
      const data = JSON.parse(rawCharacterData)
      setInputState('success')
      setInputMsg('')
      const listWithNameSwitchedToEnglish = (data.data.list as CharacterProps[]).map((character) => {
        const englishName = defaultList.find((item) => item.id === character.id)!.name as CharacterName
        return {
          ...character,
          name: englishName
        }
      })
      saveData(listWithNameSwitchedToEnglish)
    } catch (error: unknown) {
      setInputState('error')
      setInputMsg((error as Error).message)
    }
  }, [rawCharacterData, saveData])
  return {
    inputState,
    inputMsg,
    rawCharacterData,
    setRawCharacterData
  }
}

export default useCharacterData
