import { Box, Grid } from '@mui/material'
import { useMemo } from 'react'
import './App.css'
import presetDataAsset from './assets/preset_data.json'
import EligibilityDisplay from './components/EligibilityDisplay'
import { SeasonData } from './components/SeasonData'
import SelectLanguage from './components/SelectLanguage'
import UserDataInput from './components/UserDataInput'
import useTheaterSetup from './hooks/useTheaterSetup'
import useCharacterStore from './stores/useCharacterStore'
import type { ImaginariumDataType, PresetDataType } from './types'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

function App() {
  const { isUsePresetData, setIsUsePresetData, presetName, setPresetName, customData, setCustomData } =
    useTheaterSetup()
  const onApplyCustomData = (data: ImaginariumDataType) => {
    setCustomData(data)
  }
  const { characters } = useCharacterStore()
  const selectedPresetData = useMemo(() => {
    if (!presetName) return undefined
    return (presetDataAsset as PresetDataType[]).find((itData) => itData.name === presetName)
  }, [presetName])

  const selectedData = useMemo(() => {
    if (isUsePresetData) {
      return selectedPresetData
    }
    return customData ?? undefined
  }, [isUsePresetData, selectedPresetData, customData])

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={{ sm: 12, md: 8, lg: 9 }}>
            <Grid container spacing={1} size={12}>
              <Grid container alignItems='center' size={12} spacing={1}>
                <Grid size='auto'>
                  <SelectLanguage />
                </Grid>
                <Grid size='grow'>
                  <UserDataInput />
                </Grid>
              </Grid>
              <Grid size={12}>
                <EligibilityDisplay seasonData={selectedData} characters={characters} />
              </Grid>
            </Grid>
          </Grid>
          <Grid size={{ sm: 12, md: 4, lg: 3 }}>
            <SeasonData
              isUsePresetData={isUsePresetData}
              setIsUsePresetData={setIsUsePresetData}
              presetName={presetName}
              setPresetName={setPresetName}
              selectedPresetData={selectedPresetData}
              onApplyCustomData={onApplyCustomData}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default App
