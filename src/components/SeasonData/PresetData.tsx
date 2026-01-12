import { Grid, MenuItem, TextField, Typography } from '@mui/material'
import presetDataAsset from '../../assets/preset_data.json'
import type { PresetDataType } from '../../types'
import CharDisplay from '../CharDisplay'
import ElementDisplay from '../ElementDisplay'

interface Props {
  presetName?: string
  setPresetName: (name: string) => void
  selectedPresetData?: PresetDataType
}
const PresetData = ({ presetName, setPresetName, selectedPresetData }: Props) => {
  return (
    <>
      <TextField
        select
        fullWidth
        variant='outlined'
        label='Select Preset data'
        multiline
        rows={4}
        placeholder='Preset data'
        value={presetName}
        onChange={(e) => setPresetName(e.target.value)}
      >
        {presetDataAsset.map((itData) => (
          <MenuItem key={itData.name} value={itData.name}>
            {itData.name}
          </MenuItem>
        ))}
      </TextField>
      {selectedPresetData && (
        <>
          <Typography variant='overline' gutterBottom>
            Elements
          </Typography>
          <Typography variant='body1' gutterBottom>
            <Grid container spacing={1}>
              {selectedPresetData.elements.map((e) => (
                <Grid key={e}>
                  <ElementDisplay element={e} />
                </Grid>
              ))}
            </Grid>
          </Typography>
          <Typography variant='overline' gutterBottom>
            Starting Characters
          </Typography>
          <Typography variant='body1' gutterBottom>
            <Grid container spacing={1}>
              {selectedPresetData.starting_characters.map((c) => (
                <Grid key={c}>
                  <CharDisplay char={{ name: c }} />
                </Grid>
              ))}
            </Grid>
          </Typography>
          <Typography variant='overline' gutterBottom>
            Special Guests
          </Typography>
          <Typography variant='body1' gutterBottom>
            <Grid container spacing={1}>
              {selectedPresetData.special_characters.map((c) => (
                <Grid key={c}>
                  <CharDisplay char={{ name: c }} />
                </Grid>
              ))}
            </Grid>
          </Typography>
        </>
      )}
    </>
  )
}

export default PresetData
