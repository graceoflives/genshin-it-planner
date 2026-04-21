import { Check as CheckIcon, Clear as ClearIcon } from '@mui/icons-material'
import { InputAdornment } from '@mui/material'

interface EndAdornmentProps {
  inputState: string
}

const EndAdornment = ({ inputState }: EndAdornmentProps) => {
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

export default EndAdornment
