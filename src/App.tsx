import { Box, CssBaseline, Grid, IconButton, ThemeProvider, Typography } from '@mui/material'
import { useMemo } from 'react'
import './App.css'
import presetDataAsset from './assets/preset_data.json'
import EligibilityDisplay from './components/EligibilityDisplay'
import { SeasonData } from './components/SeasonData'
import SelectLanguage from './components/SelectLanguage'
import UserDataInput from './components/UserDataInput'
import useTheaterSetup from './hooks/useTheaterSetup'
import useTheme from './hooks/useTheme'
import useCharacterStore from './stores/useCharacterStore'
import type { ImaginariumDataType, PresetDataType } from './types'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

function App() {
  const { mode, theme, toggleMode } = useTheme()
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default', padding: 1 }}>
        <Box sx={{ maxWidth: '1440px', margin: '0 auto' }}>
          <Grid container spacing={1}>
            <Grid size={{ sm: 12, md: 4, lg: 3 }}>
              <Grid container spacing={1} size={12}>
                <Grid container alignItems='center' size={12}>
                  <Grid size='auto'>
                    <IconButton onClick={() => toggleMode()}>
                      <Typography>{mode === 'dark' ? '☀️' : '🌙'}</Typography>
                    </IconButton>
                  </Grid>
                  <Grid size='grow'>
                    <SelectLanguage />
                  </Grid>
                </Grid>
                <Grid size={12}>
                  <UserDataInput />
                </Grid>
                <Grid size={12}>
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
            </Grid>
            <Grid size={{ sm: 12, md: 8, lg: 9 }}>
              <EligibilityDisplay seasonData={selectedData} characters={characters} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
