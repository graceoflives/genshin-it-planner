import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from '@mui/material'
import { useTranslation } from 'react-i18next'

const languageOptions = [
  {
    value: 'zh-CN',
    label: '🇨🇳 简体中文'
  },
  {
    value: 'zh-TW',
    label: '🇨🇳 傳統中文'
  },
  {
    value: 'en-US',
    label: '🇺🇸 English'
  },
  {
    value: 'ko-KR',
    label: '🇰🇷 한국어'
  },
  {
    value: 'ja-JP',
    label: '🇯🇵 日本語'
  },
  {
    value: 'es-ES',
    label: '🇪🇸 Español'
  },
  {
    value: 'fr-FR',
    label: '🇫🇷 Français'
  },
  {
    value: 'ru-RU',
    label: '🇷🇺 Русский язык'
  },
  {
    value: 'th-TH',
    label: '🇹🇭 ภาษาไทย'
  },
  {
    value: 'vi-VN',
    label: '🇻🇳 Tiếng Việt'
  },
  {
    value: 'de-DE',
    label: '🇩🇪 Deutsch'
  },
  {
    value: 'id-ID',
    label: '🇮🇩 Bahasa Indonesia'
  },
  {
    value: 'pt-BR',
    label: '🇧🇷 Português'
  },
  {
    value: 'tr-TR',
    label: '🇹🇷 Türkçe'
  },
  {
    value: 'it-IT',
    label: '🇮🇹 Italiano'
  }
]
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
