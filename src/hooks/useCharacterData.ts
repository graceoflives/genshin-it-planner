import { useEffect, useState } from 'react'
import useCharacterStore from '../stores/useCharacterStore'

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
      saveData(data.data.list)
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
