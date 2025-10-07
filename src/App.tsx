import './App.css'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControlLabel,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material'
import {
  Check as CheckIcon,
  ChevronRight as ChevronRightIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material'
import useCharacterData from './hooks/useCharacterData'
import useTheaterSetup from './hooks/useTheaterSetup'
import presetDataAsset from './assets/preset_data.json'
import { useMemo } from 'react'
import useCharacterStore from './stores/useCharacterStore'
import { ACCEPTANCE_LEVEL, CONVERTIBLE_ELEMENTS } from './constants'
import type { CharacterProps, PresetDataType } from './types'
import CharDisplay from './components/CharDisplay'
import ElementDisplay from './components/ElementDisplay'

const howToGetCharacters = [
  'Open Battle Chronicle from Hoyolab',
  'Open the Developer Tools on your browser',
  'Scroll to "My Characters" section, click on "All characters"',
  'On Developer Tools, go to Network tab and find the request "POST https://sg-public-api.hoyolab.com/event/game_record/genshin/api/character/list"',
  'Copy the response of that request into the input below'
]

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
  const { isUsePresetData, setIsUsePresetData, presetName, setPresetName } = useTheaterSetup()
  const { characters } = useCharacterStore()
  const selectedPresetData = useMemo(() => {
    if (!presetName) return undefined
    return (presetDataAsset as PresetDataType[]).find((itData) => itData.name === presetName)
  }, [presetName])

  const { traveler, starters, eligibles, upgradables, totalEligible } = useMemo(() => {
    if (!selectedPresetData || characters.length === 0)
      return {
        traveler: undefined,
        starters: [],
        eligibles: [],
        upgradables: [],
        totalEligible: undefined
      }

    const convertible = characters.find((c) => c.name === 'Traveler')!
    const starters = characters.filter((c) => selectedPresetData.starting_characters.includes(c.name))
    const notTravelerFilter = (character: CharacterProps) => character.name !== 'Traveler'
    const notStarterFilter = (character: CharacterProps) =>
      !selectedPresetData.starting_characters.includes(character.name)
    const eligibles = characters
      .filter(notTravelerFilter)
      .filter(notStarterFilter)
      .filter(
        (c) =>
          c.level >= ACCEPTANCE_LEVEL &&
          (selectedPresetData.elements.includes(c.element) || selectedPresetData.special_characters.includes(c.name))
      )
    const upgradables = characters
      .filter(notTravelerFilter)
      .filter(notStarterFilter)
      .filter(
        (c) =>
          c.level < ACCEPTANCE_LEVEL &&
          (selectedPresetData.elements.includes(c.element) || selectedPresetData.special_characters.includes(c.name))
      )
    const totalEligible = starters.length + eligibles.length + (convertible.level >= ACCEPTANCE_LEVEL ? 1 : 0)
    return {
      traveler: {
        info: convertible,
        eligible: convertible.level >= ACCEPTANCE_LEVEL,
        shouldResonate: !selectedPresetData.elements.includes(convertible.element),
        resonatableElements: CONVERTIBLE_ELEMENTS.filter((element) => selectedPresetData.elements.includes(element))
      },
      starters,
      eligibles,
      upgradables,
      totalEligible
    }
  }, [selectedPresetData, characters])
  console.log(traveler)

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={8}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1-content' id='panel1-header'>
                    <Typography component='span'>How to get character data (browser only)</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {howToGetCharacters.map((text) => (
                        <ListItem disablePadding key={text}>
                          <ListItemIcon>
                            <ChevronRightIcon />
                          </ListItemIcon>
                          <ListItemText primary={text} />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
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
                {totalEligible !== undefined && (
                  <>
                    <Typography variant='overline' gutterBottom>
                      Total Selectable
                    </Typography>
                    <Typography variant='body1' gutterBottom>
                      {totalEligible}
                    </Typography>
                    <Typography variant='overline' gutterBottom>
                      Traveler ({traveler.eligible ? 1 : 0})
                    </Typography>
                    <Typography variant='body1' gutterBottom>
                      <Grid container spacing={1} alignItems='center'>
                        <CharDisplay
                          char={{ name: 'Traveler', level: traveler?.info.level, element: traveler?.info.element }}
                        />
                        {traveler.eligible ? (
                          <Typography component='span' color='success'>
                            <CheckIcon color='success' />
                          </Typography>
                        ) : (
                          <Typography component='span' color='error'>
                            <ClearIcon color='error' />
                          </Typography>
                        )}
                        {traveler.shouldResonate && (
                          <>
                            <Typography component='span' color='warning'>
                              resonate towards{' '}
                            </Typography>
                            <Grid container spacing={1} alignItems='center'>
                              {traveler.resonatableElements.map((element) => (
                                <CharDisplay
                                  char={{ name: 'Traveler', level: traveler?.info.level, element: element }}
                                  key={element}
                                />
                              ))}
                            </Grid>
                          </>
                        )}
                      </Grid>
                    </Typography>
                    <Typography variant='overline' gutterBottom>
                      Starters ({selectedPresetData?.starting_characters.length})
                    </Typography>
                    <Typography variant='body1' gutterBottom>
                      <Grid container spacing={1}>
                        {selectedPresetData?.starting_characters.map((c) => (
                          <Grid key={c}>
                            <CharDisplay
                              char={starters.find((ss) => ss.name === c) ?? { name: c }}
                              isTrial={starters.every((ss) => ss.name !== c || ss?.level < ACCEPTANCE_LEVEL)}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Typography>
                    <Typography variant='overline' gutterBottom>
                      Eligible ({eligibles.length})
                    </Typography>
                    <Typography variant='body1' gutterBottom>
                      <Grid container spacing={1}>
                        {eligibles.map((c) => (
                          <Grid key={c.name}>
                            <CharDisplay char={c} isTrial={false} />
                          </Grid>
                        ))}
                      </Grid>
                    </Typography>
                    <Typography variant='overline' gutterBottom>
                      Upgradable ({upgradables.length})
                    </Typography>
                    <Typography variant='body1' gutterBottom>
                      <Grid container spacing={1}>
                        {upgradables.map((c) => (
                          <Grid key={c.name}>
                            <CharDisplay char={c} isTrial={false} />
                          </Grid>
                        ))}
                      </Grid>
                    </Typography>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid size={4}>
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
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default App
