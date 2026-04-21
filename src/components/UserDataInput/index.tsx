import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import useCharacterData from '../../hooks/useCharacterData'
import EndAdornment from './EndAdornment'
import StartAdornment from './StartAdornment'

const UserDataInput = () => {
  const { t } = useTranslation()
  const { inputState, inputMsg, rawCharacterData, setRawCharacterData } = useCharacterData()
  return (
    <TextField
      fullWidth
      variant='outlined'
      label={t('input.characterData.placeholder')}
      value={rawCharacterData}
      onChange={(e) => setRawCharacterData(e.target.value)}
      slotProps={{
        input: {
          startAdornment: <StartAdornment />,
          endAdornment: <EndAdornment inputState={inputState} />
        }
      }}
      helperText={inputMsg ? inputMsg : null}
      color={inputState === 'success' ? 'success' : inputState === 'default' ? 'primary' : 'error'}
    />
  )
}

export default UserDataInput
