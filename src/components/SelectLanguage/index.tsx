import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { LANGUAGE_OPTIONS } from '../../constants'

const SelectLanguage = () => {
  const { t, i18n } = useTranslation()
  const handleChangeLanguage = (e: SelectChangeEvent) => {
    i18n.changeLanguage(e.target.value)
  }
  return (
    <FormControl fullWidth size={'small'}>
      <InputLabel id='select-language'>{t('language.select.placeholder')}</InputLabel>
      <Select
        value={i18n.language}
        onChange={handleChangeLanguage}
        labelId='select-language'
        label={t('language.select.placeholder')}
      >
        {LANGUAGE_OPTIONS.map((language) => (
          <MenuItem key={language.value} value={language.value}>
            {language.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SelectLanguage
