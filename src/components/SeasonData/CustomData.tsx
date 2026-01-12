import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  type SelectChangeEvent
} from '@mui/material'
import { useCallback, useEffect, useMemo } from 'react'
import list from '../../assets/character_details.json'
import {
  ALL_ELEMENTS,
  CUSTOM_DATA_MAX_ELEMENTS,
  CUSTOM_DATA_MAX_SPECIAL_GUESTS,
  CUSTOM_DATA_MAX_STARTING_CHARACTERS,
  CUSTOM_DATA_MAX_STARTING_CHARACTERS_PER_ELEMENT
} from '../../constants'
import type { CharacterBasicInfoProps, CharacterName, ElementType } from '../../types'
import CharDisplay from '../CharDisplay'
import ElementDisplay from '../ElementDisplay'

interface Props {
  elements: ElementType[]
  setElements: (elements: ElementType[]) => void
  characters: CharacterName[]
  setCharacters: (characters: CharacterName[]) => void
  specialGuests: CharacterName[]
  setSpecialGuests: (guests: CharacterName[]) => void
  applyCustomData: () => void
}
const CustomData = ({
  elements,
  setElements,
  characters,
  setCharacters,
  specialGuests,
  setSpecialGuests,
  applyCustomData
}: Props) => {
  const handleSelectElements = (event: SelectChangeEvent<typeof elements>) => {
    const {
      target: { value }
    } = event
    setElements(typeof value === 'string' ? (value.split(',') as ElementType[]) : value)
  }
  const handleSelectCharacters = (event: SelectChangeEvent<typeof characters>) => {
    const {
      target: { value }
    } = event
    setCharacters(typeof value === 'string' ? (value.split(',') as CharacterName[]) : value)
  }
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

  useEffect(() => {
    if (elements.length === 3) {
      setCharacters([])
      setSpecialGuests([])
    }
  }, [elements])
  return (
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
                    specialGuests.length >= CUSTOM_DATA_MAX_SPECIAL_GUESTS && !specialGuests.includes(character.name)
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
  )
}

export default CustomData
