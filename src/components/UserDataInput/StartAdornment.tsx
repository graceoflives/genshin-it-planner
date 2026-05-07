import { ChevronRight as ChevronRightIcon, Help as HelpIcon } from '@mui/icons-material'
import {
  Box,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Typography
} from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const GUIDE_STEP = 5

const boxStyle = {
  bgcolor: 'background.paper',
  borderRadius: 2,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  width: '75%',
  maxWidth: '500px',
  p: 2,
  boxShadow: 24
}
const StartAdornment = () => {
  const { t } = useTranslation()
  const [openModal, setOpenModal] = useState(false)
  const toggleGuide = () => {
    setOpenModal((value) => !value)
  }
  return (
    <>
      <InputAdornment position='start'>
        <IconButton onClick={() => toggleGuide()}>
          <HelpIcon />
        </IconButton>
      </InputAdornment>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={boxStyle}>
          <Typography variant='h6' align='center'>
            {t('guide.title')}
          </Typography>
          <List>
            {Array.from({ length: GUIDE_STEP }, (_, index) => 1 + index).map((value) => (
              <ListItem disableGutters disablePadding key={`guide-${value}`}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <ChevronRightIcon />
                </ListItemIcon>
                <ListItemText primary={t(`guide.step.${value}`)} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>
    </>
  )
}

export default StartAdornment
