import { FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material'
import useCustomDataStore from '../../stores/useCustomDataStore'
import type { ImaginariumDataType, PresetDataType } from '../../types'
import CustomData from './CustomData'
import PresetData from './PresetData'

interface Props {
  isUsePresetData: boolean
  setIsUsePresetData: (isUsePresetData: boolean) => void
  presetName?: string
  setPresetName: (presetName: string) => void
  selectedPresetData?: PresetDataType
  onApplyCustomData?: (data: ImaginariumDataType) => void
}
const SeasonData = ({
  isUsePresetData,
  setIsUsePresetData,
  presetName,
  setPresetName,
  selectedPresetData,
  onApplyCustomData
}: Props) => {
  const { elements, characters, specialGuests } = useCustomDataStore()

  const applyCustomData = () => {
    const customData: ImaginariumDataType = {
      elements,
      starting_characters: characters,
      special_characters: specialGuests
    }
    onApplyCustomData?.(customData)
  }
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <RadioGroup
          row
          value={isUsePresetData ? 'preset' : 'custom'}
          onChange={(e) => {
            if (e.target.value === 'preset') {
              setIsUsePresetData(true)
            } else {
              setIsUsePresetData(false)
            }
          }}
        >
          <FormControlLabel value='preset' control={<Radio />} label='Preset data' />
          <FormControlLabel value='custom' control={<Radio />} label='Custom data' />
        </RadioGroup>
      </Grid>
      <Grid size={12}>
        {isUsePresetData ? (
          <PresetData presetName={presetName} setPresetName={setPresetName} selectedPresetData={selectedPresetData} />
        ) : (
          <CustomData applyCustomData={applyCustomData} />
        )}
      </Grid>
    </Grid>
  )
}

export default SeasonData
