import { useState } from 'react'

const useTheaterSetup = () => {
  const [isUsePresetData, setIsUsePresetData] = useState(true)
  const [presetName, setPresetName] = useState<string>()

  return {
    isUsePresetData,
    presetName,
    setIsUsePresetData,
    setPresetName
  }
}

export default useTheaterSetup
