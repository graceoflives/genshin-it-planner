import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  type SelectChangeEvent
} from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import list from '../assets/character_details.json'
import presetDataAsset from '../assets/preset_data.json'
import {
  ALL_ELEMENTS,
  CUSTOM_DATA_MAX_ELEMENTS,
  CUSTOM_DATA_MAX_SPECIAL_GUESTS,
  CUSTOM_DATA_MAX_STARTING_CHARACTERS,
  CUSTOM_DATA_MAX_STARTING_CHARACTERS_PER_ELEMENT
} from '../constants'
import type { CharacterBasicInfoProps, CharacterName, ElementType, ImaginariumDataType, PresetDataType } from '../types'
import CharDisplay from './CharDisplay'
import ElementDisplay from './ElementDisplay'

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
  const [elements, setElements] = useState<ElementType[]>([])
  const handleSelectElements = (event: SelectChangeEvent<typeof elements>) => {
    const {
      target: { value }
    } = event
    setElements(typeof value === 'string' ? (value.split(',') as ElementType[]) : value)
  }
  const [characters, setCharacters] = useState<CharacterName[]>([])
  const handleSelectCharacters = (event: SelectChangeEvent<typeof characters>) => {
    const {
      target: { value }
    } = event
    setCharacters(typeof value === 'string' ? (value.split(',') as CharacterName[]) : value)
  }
  const [specialGuests, setSpecialGuests] = useState<CharacterName[]>([])
  const handleSelectSpecialGuests = (event: SelectChangeEvent<typeof specialGuests>) => {
    const {
      target: { value }
    } = event
    setSpecialGuests(typeof value === 'string' ? (value.split(',') as CharacterName[]) : value)
  }
  const possibleStartingCharacters = useMemo(
    () =>
      (list as CharacterBasicInfoProps[]).filter(
        (character) =>
          elements.includes(character.element as ElementType) &&
          !['Traveler', 'Manekin', 'Manekina', 'Aloy'].includes(character.name)
      ),
    [elements]
  )

  const possibleSpecialGuests = useMemo(
    () =>
      (list as CharacterBasicInfoProps[]).filter(
        (character) =>
          !elements.includes(character.element as ElementType) &&
          !['Traveler', 'Manekin', 'Manekina', 'Aloy'].includes(character.name)
      ),
    [elements]
  )
  const isEnoughCharacterForElement = useCallback(
    (element: ElementType) =>
      (list as CharacterBasicInfoProps[]).filter((info) => characters.includes(info.name) && info.element === element)
        .length >= CUSTOM_DATA_MAX_STARTING_CHARACTERS_PER_ELEMENT,
    [characters]
  )

  const applyCustomData = () => {
    const customData: ImaginariumDataType = {
      elements,
      starting_characters: characters,
      special_characters: specialGuests
    }
    onApplyCustomData?.(customData)
  }
  useEffect(() => {
    if (elements.length === 3) {
      setCharacters([])
      setSpecialGuests([])
    }
  }, [elements])
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
        {isUsePresetData && (
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
        )}
        {!isUsePresetData && (
          <>
            <FormControl fullWidth>
              <InputLabel id='select-elements'>Select elements</InputLabel>
              <Select
                value={elements}
                onChange={handleSelectElements}
                multiple
                labelId='select-elements'
                label='Select elements'
                renderValue={(value) => {
                  return (
                    <Grid container spacing={1}>
                      {value.map((element) => (
                        <Grid key={element}>
                          <ElementDisplay element={element} />
                        </Grid>
                      ))}
                    </Grid>
                  )
                }}
              >
                {ALL_ELEMENTS.map((element) => (
                  <MenuItem
                    key={element}
                    value={element}
                    disabled={elements.length >= CUSTOM_DATA_MAX_ELEMENTS && !elements.includes(element)}
                  >
                    <Grid
                      container
                      spacing={1}
                      sx={{
                        alignItems: 'center'
                      }}
                    >
                      <ElementDisplay element={element} />
                      <Typography variant='body1'>{element}</Typography>
                    </Grid>
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                Please select <b>3</b> elements (current: {elements.length})
              </FormHelperText>
            </FormControl>
            {elements.length === CUSTOM_DATA_MAX_ELEMENTS && (
              <>
                <FormControl fullWidth sx={{ marginTop: 2 }}>
                  <InputLabel id='select-characters'>Select starting characters</InputLabel>
                  <Select
                    value={characters}
                    onChange={handleSelectCharacters}
                    multiple
                    labelId='select-characters'
                    label='Select starting characters'
                    renderValue={(value) => {
                      return (
                        <Grid container spacing={1}>
                          {value.map((name) => (
                            <CharDisplay key={name} char={{ name }} width={40} />
                          ))}
                        </Grid>
                      )
                    }}
                  >
                    {possibleStartingCharacters.map((character) => (
                      <MenuItem
                        key={character.name}
                        value={character.name}
                        disabled={
                          (characters.length >= CUSTOM_DATA_MAX_STARTING_CHARACTERS &&
                            !characters.includes(character.name)) ||
                          isEnoughCharacterForElement(character.element)
                        }
                      >
                        <Grid container spacing={1} sx={{ alignItems: 'center' }}>
                          <CharDisplay char={{ name: character.name }} width={20} />
                          <Typography variant='body1'>{character.name}</Typography>
                        </Grid>
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    Please select <b>6</b> characters in total, <b>2</b> for each element (current: {characters.length})
                  </FormHelperText>
                </FormControl>
                <FormControl fullWidth sx={{ marginTop: 2 }}>
                  <InputLabel id='select-guests'>Select special guests</InputLabel>
                  <Select
                    value={specialGuests}
                    onChange={handleSelectSpecialGuests}
                    multiple
                    labelId='select-guests'
                    label='Select special guests'
                    renderValue={(value) => {
                      return (
                        <Grid container spacing={1}>
                          {value.map((name) => (
                            <CharDisplay key={name} char={{ name }} width={40} />
                          ))}
                        </Grid>
                      )
                    }}
                  >
                    {possibleSpecialGuests.map((character) => (
                      <MenuItem
                        key={character.name}
                        value={character.name}
                        disabled={
                          specialGuests.length >= CUSTOM_DATA_MAX_SPECIAL_GUESTS &&
                          !specialGuests.includes(character.name)
                        }
                      >
                        <Grid container spacing={1} sx={{ alignItems: 'center' }}>
                          <CharDisplay char={{ name: character.name }} width={20} />
                          <Typography variant='body1'>{character.name}</Typography>
                        </Grid>
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    Please select <b>4</b> special guests (current: {specialGuests.length})
                  </FormHelperText>
                </FormControl>
              </>
            )}
            <FormControl fullWidth sx={{ marginTop: 2 }}>
              <Grid container sx={{ justifyContent: 'flex-end' }}>
                <Button
                  variant='contained'
                  disabled={
                    characters.length !== CUSTOM_DATA_MAX_STARTING_CHARACTERS ||
                    specialGuests.length !== CUSTOM_DATA_MAX_SPECIAL_GUESTS
                  }
                  onClick={applyCustomData}
                >
                  Apply custom data
                </Button>
              </Grid>
            </FormControl>
          </>
        )}
      </Grid>
    </Grid>
  )
}

export default SeasonData
