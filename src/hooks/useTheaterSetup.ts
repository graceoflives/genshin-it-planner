import { useState } from 'react'
import type { ImaginariumDataType } from '../types'

const useTheaterSetup = () => {
  const [isUsePresetData, setIsUsePresetData] = useState(true)
  const [presetName, setPresetName] = useState<string>()
  const [customData, setCustomData] = useState<ImaginariumDataType>()
  return {
    isUsePresetData,
    presetName,
    setIsUsePresetData,
    setPresetName,
    customData,
    setCustomData
  }
}

export default useTheaterSetup
