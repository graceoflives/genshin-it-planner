import { Grid, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
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
    <Grid container rowSpacing={2}>
      <Grid size={12}>
        <ToggleButtonGroup
          color='primary'
          value={isUsePresetData ? 'preset' : 'custom'}
          onChange={(_e, newValue) => {
            if (newValue === 'preset') {
              setIsUsePresetData(true)
            } else {
              setIsUsePresetData(false)
            }
          }}
          exclusive
          fullWidth
          size='small'
        >
          <ToggleButton value='preset' aria-label='Preset'>
            {t('input.theaterSetupType.preset')}
          </ToggleButton>
          <ToggleButton value='custom' aria-label='Custom'>
            {t('input.theaterSetupType.custom')}
          </ToggleButton>
        </ToggleButtonGroup>
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
