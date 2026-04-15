import { Check as CheckIcon, Clear as ClearIcon } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'
import { useMemo } from 'react'
import { ACCEPTANCE_LEVEL, CONVERTIBLE_ELEMENTS } from '../constants'
import type { CharacterProps, ImaginariumDataType } from '../types'
import CharDisplay from './CharDisplay'
import { useTranslation } from 'react-i18next'

const notTravelerOrManekinFilter = (character: CharacterProps) =>
  !['Traveler', 'Manekin', 'Manekina'].includes(character.name)

interface Props {
  seasonData?: ImaginariumDataType
  characters: CharacterProps[]
}
const EligibilityDisplay = ({ seasonData, characters }: Props) => {
  const { t } = useTranslation()
  const { traveler, starters, eligibles, upgradables, totalEligible } = useMemo(() => {
    if (!seasonData || characters.length === 0)
      return {
        traveler: undefined,
        starters: [],
        eligibles: [],
        upgradables: [],
        totalEligible: undefined
      }

    const convertible = characters.find((c) => c.name === 'Traveler')!
    const starters = characters.filter((c) => seasonData.starting_characters.includes(c.name))
    const notStarterFilter = (character: CharacterProps) => !seasonData.starting_characters.includes(character.name)
    const eligibles = characters
      .filter(notTravelerOrManekinFilter)
      .filter(notStarterFilter)
      .filter(
        (c) =>
          c.level >= ACCEPTANCE_LEVEL &&
          (seasonData.elements.includes(c.element) || seasonData.special_characters.includes(c.name))
      )
    const upgradables = characters
      .filter(notTravelerOrManekinFilter)
      .filter(notStarterFilter)
      .filter(
        (c) =>
          c.level < ACCEPTANCE_LEVEL &&
          (seasonData.elements.includes(c.element) || seasonData.special_characters.includes(c.name))
      )
    const totalEligible =
      seasonData?.starting_characters.length + eligibles.length + (convertible.level >= ACCEPTANCE_LEVEL ? 1 : 0)
    return {
      traveler: {
        info: convertible,
        eligible: convertible.level >= ACCEPTANCE_LEVEL,
        shouldResonate: !seasonData.elements.includes(convertible.element),
        resonatableElements: CONVERTIBLE_ELEMENTS.filter((element) => seasonData.elements.includes(element))
      },
      starters,
      eligibles,
      upgradables,
      totalEligible
    }
  }, [seasonData, characters])

  if (!totalEligible) return null

  return (
    <>
      <Typography variant='overline' component='p' sx={{ fontSize: '1rem' }}>
        {t('output.selectable.title')}{' '}
        <Typography variant='h5' component='span'>
          {totalEligible}
        </Typography>
      </Typography>
      <Typography variant='overline'>
        {t('output.traveler.title')}{' '}
        <Typography variant='h5' component='span'>
          {traveler.eligible ? 1 : 0}
        </Typography>
      </Typography>
      <Grid container spacing={1} alignItems='center'>
        <CharDisplay char={{ name: 'Traveler', level: traveler?.info.level, element: traveler?.info.element }} />
        {traveler.eligible ? <CheckIcon color='success' /> : <ClearIcon color='error' />}
        {traveler.shouldResonate && (
          <>
            <Typography component='span' color='warning'>
              {t('output.needResonate')}{' '}
            </Typography>
            <Grid container spacing={1} alignItems='center'>
              {traveler.resonatableElements.map((element) => (
                <CharDisplay char={{ name: 'Traveler', level: traveler?.info.level, element: element }} key={element} />
              ))}
            </Grid>
          </>
        )}
      </Grid>
      <Typography variant='overline'>
        {t('output.starters.title')}{' '}
        <Typography variant='h5' component='span'>
          {seasonData?.starting_characters.length}
        </Typography>
      </Typography>
      <Grid container spacing={1}>
        {seasonData?.starting_characters.map((c) => (
          <Grid key={c}>
            <CharDisplay
              char={starters.find((ss) => ss.name === c) ?? { name: c }}
              isTrial={starters.every((ss) => ss.name !== c || ss?.level < ACCEPTANCE_LEVEL)}
            />
          </Grid>
        ))}
      </Grid>
      <Typography variant='overline'>
        {t('output.eligible.title')}{' '}
        <Typography variant='h5' component='span'>
          {eligibles.length}
        </Typography>
      </Typography>
      <Grid container spacing={1}>
        {eligibles.map((c) => (
          <Grid key={c.name}>
            <CharDisplay char={c} isTrial={false} />
          </Grid>
        ))}
      </Grid>
      <Typography variant='overline' component='p' sx={{ fontSize: '1rem' }} color='error'>
        {t('output.notSelectable.title')}{' '}
        <Typography variant='h5' component='span'>
          {upgradables.length}
        </Typography>
      </Typography>
      <Grid container spacing={1}>
        {upgradables.map((c) => (
          <Grid key={c.name}>
            <CharDisplay char={c} isTrial={false} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default EligibilityDisplay
