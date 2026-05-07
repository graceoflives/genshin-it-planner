import { TextField } from '@mui/material'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import useCharacterData from '../../hooks/useCharacterData'
import EndAdornment from './EndAdornment'
import StartAdornment from './StartAdornment'

const UserDataInput = () => {
  const { t } = useTranslation()
  const { inputState, inputMsg, rawCharacterData, setRawCharacterData } = useCharacterData()
  const fieldColor = useMemo(() => {
    if (inputState === 'success') return 'success'
    if (inputState === 'default') return 'primary'
    return 'error'
  }, [inputState])
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
      helperText={inputMsg}
      color={fieldColor}
      size='small'
    />
  )
}

export default UserDataInput
