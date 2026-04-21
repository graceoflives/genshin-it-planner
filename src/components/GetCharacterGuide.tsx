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
import { useTranslation } from 'react-i18next'

const GUIDE_STEP = 5

const GetCharacterGuide = () => {
  const { t } = useTranslation()
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1-content'
        id='panel1-header'
        sx={{
          '& .MuiAccordionSummary-content': {
            overflow: 'hidden'
          }
        }}
      >
        <Typography noWrap>{t('guide.title')}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {Array.from({ length: GUIDE_STEP }).map((_value, index) => (
            <ListItem disablePadding key={`guide-${index}`}>
              <ListItemIcon>
                <ChevronRightIcon />
              </ListItemIcon>
              <ListItemText primary={t(`guide.step.${1 + index}`)} />
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  )
}

export default GetCharacterGuide
