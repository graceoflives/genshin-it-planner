import { Grid, MenuItem, TextField, Typography } from '@mui/material'
import presetDataAsset from '../../assets/preset_data.json'
import type { PresetDataType } from '../../types'
import CharDisplay from '../CharDisplay'
import ElementDisplay from '../ElementDisplay'
import { useTranslation } from 'react-i18next'

interface Props {
  presetName?: string
  setPresetName: (name: string) => void
  selectedPresetData?: PresetDataType
}
const PresetData = ({ presetName, setPresetName, selectedPresetData }: Props) => {
  const { t } = useTranslation()
  return (
    <>
      <TextField
        select
        fullWidth
        variant='outlined'
        label={t('input.presetSelect.placeholder')}
        multiline
        rows={4}
        value={presetName}
        onChange={(e) => setPresetName(e.target.value)}
        size='small'
      >
        {presetDataAsset.map((itData) => (
          <MenuItem key={itData.name} value={itData.name}>
            {itData.name}
          </MenuItem>
        ))}
      </TextField>
      {selectedPresetData && (
        <>
          <Typography variant='overline'>{t('input.setup.elements')}</Typography>
          <Grid container spacing={1}>
            {selectedPresetData.elements.map((e) => (
              <Grid key={e}>
                <ElementDisplay element={e} />
              </Grid>
            ))}
          </Grid>
          <Typography variant='overline'>{t('input.setup.starters')}</Typography>
          <Grid container spacing={1}>
            {selectedPresetData.starting_characters.map((c) => (
              <Grid key={c}>
                <CharDisplay char={{ name: c }} />
              </Grid>
            ))}
          </Grid>
          <Typography variant='overline'>{t('input.setup.specialGuests')}</Typography>
          <Grid container spacing={1}>
            {selectedPresetData.special_characters.map((c) => (
              <Grid key={c}>
                <CharDisplay char={{ name: c }} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  )
}

export default PresetData
