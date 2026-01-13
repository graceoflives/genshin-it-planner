import type { CharacterProps } from '../types'
import list from '../assets/character_details.json'
import { Avatar, Box, Typography } from '@mui/material'

interface Props {
  char: Partial<CharacterProps>
  isTrial?: boolean
  width?: number
}
const CharDisplay = ({ char, isTrial = false, width = 100 }: Props) => {
  const detail = list.find((c) => c.name === char.name)

  if (!detail) return null

  return (
    <Box
      sx={{
        width,
        borderRadius: 1
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: width,
          backgroundImage: `url("images/rarity/rarity_${detail.rarity}.png")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          borderRadius: 1
        }}
      >
        <Avatar src={`images/character/${char?.name}.png`} style={{ width: '100%', height: '100%' }} variant='square'>
          {char?.name}
        </Avatar>
        <img
          src={`images/element/${char.element ?? detail.element}.png`}
          style={{ position: 'absolute', top: 0, left: 0, width: width / 4, height: width / 4 }}
        />
        {isTrial && (
          <Box
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
              backgroundColor: '#D36D84',
              fontSize: '0.6rem',
              fontWeight: 'bold',
              padding: '4px 6px',
              borderRadius: 1,
              color: '#FFF'
            }}
          >
            Trial
          </Box>
        )}
      </Box>
      {(isTrial || char?.level) && (
        <Typography variant='subtitle1' sx={{ fontSize: '0.75rem', width: '100%', textAlign: 'center' }}>
          Level {isTrial ? 90 : char?.level}
        </Typography>
      )}
    </Box>
  )
}

export default CharDisplay
