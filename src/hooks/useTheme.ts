import { createTheme, useMediaQuery, type PaletteMode } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'

const useTheme = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [mode, setMode] = useState<PaletteMode>(prefersDarkMode ? 'dark' : 'light')

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: mode === 'light' ? '#f5f5f5' : '#121212',
            paper: mode === 'light' ? '#ffffff' : '#1e1e1e'
          }
        }
      }),
    [mode]
  )

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [])
  return { mode, theme, toggleMode }
}

export default useTheme
