import { Check as CheckIcon, Clear as ClearIcon } from '@mui/icons-material'
import { Box, Grid, InputAdornment, TextField } from '@mui/material'
import { useMemo } from 'react'
import './App.css'
import presetDataAsset from './assets/preset_data.json'
import EligibilityDisplay from './components/EligibilityDisplay'
import GetCharacterGuide from './components/GetCharacterGuide'
import { SeasonData } from './components/SeasonData'
import useCharacterData from './hooks/useCharacterData'
import useTheaterSetup from './hooks/useTheaterSetup'
import useCharacterStore from './stores/useCharacterStore'
import type { ImaginariumDataType, PresetDataType } from './types'

const renderEndAdornment = (inputState: string) => {
  if (inputState === 'error') {
    return (
      <InputAdornment position='end'>
        <ClearIcon color='error' />
      </InputAdornment>
    )
  }
  if (inputState === 'success') {
    return (
      <InputAdornment position='end'>
        <CheckIcon color='success' />
      </InputAdornment>
    )
  }
  return null
}
function App() {
  const { inputState, inputMsg, rawCharacterData, setRawCharacterData } = useCharacterData()
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
          <Grid size={8}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <GetCharacterGuide />
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  variant='outlined'
                  label='Character data'
                  multiline
                  rows={4}
                  placeholder='Character data'
                  value={rawCharacterData}
                  onChange={(e) => setRawCharacterData(e.target.value)}
                  slotProps={{
                    input: {
                      endAdornment: renderEndAdornment(inputState)
                    }
                  }}
                  helperText={inputMsg ? inputMsg : null}
                  color={inputState === 'success' ? 'success' : inputState === 'default' ? 'primary' : 'error'}
                />
              </Grid>
              <Grid size={12}>
                <EligibilityDisplay seasonData={selectedData} characters={characters} />
              </Grid>
            </Grid>
          </Grid>
          <Grid size={4}>
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
