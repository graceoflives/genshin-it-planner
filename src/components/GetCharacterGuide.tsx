import { ChevronRight as ChevronRightIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material'

const howToGetCharacters = [
  'Open Battle Chronicle from Hoyolab',
  'Open the Developer Tools on your browser',
  'Scroll to "My Characters" section, click on "All characters"',
  'On Developer Tools, go to Network tab and find the request "POST https://sg-public-api.hoyolab.com/event/game_record/genshin/api/character/list"',
  'Copy the response of that request into the input below'
]

const GetCharacterGuide = () => {
  return (
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
  )
}

export default GetCharacterGuide
