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
import { useCallback, useMemo } from 'react'
import list from '../../assets/character_details.json'
import {
  ALL_ELEMENTS,
  CUSTOM_DATA_MAX_ELEMENTS,
  CUSTOM_DATA_MAX_SPECIAL_GUESTS,
  CUSTOM_DATA_MAX_STARTING_CHARACTERS,
  CUSTOM_DATA_MAX_STARTING_CHARACTERS_PER_ELEMENT
} from '../../constants'
import useCustomDataStore from '../../stores/useCustomDataStore'
import type { CharacterBasicInfoProps, CharacterName, ElementType } from '../../types'
import CharDisplay from '../CharDisplay'
import ElementDisplay from '../ElementDisplay'
import { Trans, useTranslation } from 'react-i18next'

interface Props {
  applyCustomData: () => void
}
const CustomData = ({ applyCustomData }: Props) => {
  const { t } = useTranslation()
  const { elements, characters, specialGuests, setElements, setCharacters, setSpecialGuests, isApplied, setIsApplied } =
    useCustomDataStore()

  const isEnoughCharacterForElement = useCallback(
    (element: ElementType) =>
      (list as CharacterBasicInfoProps[]).filter((info) => characters.includes(info.name) && info.element === element)
        .length >= CUSTOM_DATA_MAX_STARTING_CHARACTERS_PER_ELEMENT,
    [characters]
  )

  const handleSelectElements = (event: SelectChangeEvent<typeof elements>) => {
    const {
      target: { value }
    } = event

    const toBeElements = typeof value === 'string' ? (value.split(',') as ElementType[]) : value
    setElements(toBeElements)
    const areCharactersFitElements = toBeElements.every((element) => isEnoughCharacterForElement(element))
    if (!areCharactersFitElements && toBeElements.length === CUSTOM_DATA_MAX_ELEMENTS) {
      setCharacters([])
      setSpecialGuests([])
      setIsApplied(false)
    }
  }
  const handleSelectCharacters = (event: SelectChangeEvent<typeof characters>) => {
    const {
      target: { value }
    } = event
    setCharacters(typeof value === 'string' ? (value.split(',') as CharacterName[]) : value)
    setIsApplied(false)
  }
  const handleSelectSpecialGuests = (event: SelectChangeEvent<typeof specialGuests>) => {
    const {
      target: { value }
    } = event
    setSpecialGuests(typeof value === 'string' ? (value.split(',') as CharacterName[]) : value)
    setIsApplied(false)
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

  const handleApplyCustomData = () => {
    setIsApplied(true)
    applyCustomData()
  }

  return (
    <>
      <FormControl fullWidth size='small'>
        <InputLabel id='select-elements'>{t('input.setup.selectElements.placeholder')}</InputLabel>
        <Select
          value={elements}
          onChange={handleSelectElements}
          multiple
          labelId='select-elements'
          label={t('input.setup.selectElements.placeholder')}
          renderValue={(value) => {
            return (
              <Grid container columnSpacing={1}>
                {value.map((element) => (
                  <ElementDisplay key={element} element={element} />
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
          <Trans t={t} count={elements.length} i18nKey={'input.setup.selectElements.helper'}>
            <b>3</b>
          </Trans>
        </FormHelperText>
      </FormControl>
      {elements.length === CUSTOM_DATA_MAX_ELEMENTS && (
        <>
          <FormControl fullWidth sx={{ marginTop: 2 }} size='small'>
            <InputLabel id='select-characters'>{t('input.setup.selectStartingCharacters.placeholder')}</InputLabel>
            <Select
              value={characters}
              onChange={handleSelectCharacters}
              multiple
              labelId='select-characters'
              label={t('input.setup.selectStartingCharacters.placeholder')}
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
              <Trans t={t} count={characters.length} i18nKey={'input.setup.selectStartingCharacters.helper'}>
                <b></b>
                <b></b>
              </Trans>
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth sx={{ marginTop: 2 }} size='small'>
            <InputLabel id='select-guests'>{t('input.setup.selectSpecialGuests.placeholder')}</InputLabel>
            <Select
              value={specialGuests}
              onChange={handleSelectSpecialGuests}
              multiple
              labelId='select-guests'
              label={t('input.setup.selectSpecialGuests.placeholder')}
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
              <Trans t={t} count={specialGuests.length} i18nKey={'input.setup.selectSpecialGuests.helper'}>
                <b></b>
              </Trans>
            </FormHelperText>
          </FormControl>
        </>
      )}
      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <Grid>
          <Button
            variant='contained'
            disabled={
              characters.length !== CUSTOM_DATA_MAX_STARTING_CHARACTERS ||
              specialGuests.length !== CUSTOM_DATA_MAX_SPECIAL_GUESTS ||
              isApplied
            }
            onClick={handleApplyCustomData}
          >
            {t(isApplied ? 'input.setup.applyBtn.applied' : 'input.setup.applyBtn.normal')}
          </Button>
        </Grid>
      </FormControl>
    </>
  )
}

export default CustomData
