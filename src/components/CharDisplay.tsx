import type { CharacterProps } from '../types'
import list from '../assets/character_details.json'
import { Box, Typography } from '@mui/material'

interface Props {
  char: Partial<CharacterProps>
  isTrial?: boolean
}
const CharDisplay = ({ char, isTrial }: Props) => {
  const detail = list.find((c) => c.name === char.name)

  if (!detail) return null

  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: 1
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: 100,
          backgroundImage: `url("src/assets/images/rarity/rarity_${detail.rarity}.png")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          borderRadius: 1
        }}
      >
        <img
          src={`src/assets/images/character/${char?.name}.png`}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
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
