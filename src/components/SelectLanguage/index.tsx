import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from '@mui/material'
import { useTranslation } from 'react-i18next'

const languageOptions = [
  {
    value: 'en-US',
    label: 'English'
  },
  {
    value: 'zh-CN',
    label: '中文（简体）'
  },
  {
    value: 'ja-JP',
    label: '日本語'
  },
  {
    value: 'es-ES',
    label: 'Español'
  },
  {
    value: 'fr-FR',
    label: 'Français'
  },
  {
    value: 'ru-RU',
    label: 'Русский'
  },
  {
    value: 'vi-VN',
    label: 'Tiếng Việt'
  }
]
const SelectLanguage = () => {
  const { t, i18n } = useTranslation()
  const handleChangeLanguage = (e: SelectChangeEvent) => {
    i18n.changeLanguage(e.target.value)
  }
  return (
    <FormControl fullWidth>
      <InputLabel id='select-language'>{t('language.select.placeholder')}</InputLabel>
      <Select
        value={i18n.language}
        onChange={handleChangeLanguage}
        labelId='select-language'
        label={t('language.select.placeholder')}
      >
        {languageOptions.map((language) => (
          <MenuItem key={language.value} value={language.value}>
            {language.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SelectLanguage
