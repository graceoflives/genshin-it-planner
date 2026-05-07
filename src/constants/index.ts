import type { ElementType } from '../types'

export const LANGUAGE_OPTIONS = [
  { value: 'zh-CN', label: '🇨🇳 简体中文' },
  { value: 'zh-TW', label: '🇨🇳 傳統中文' },
  { value: 'en-US', label: '🇺🇸 English' },
  { value: 'ko-KR', label: '🇰🇷 한국어' },
  { value: 'ja-JP', label: '🇯🇵 日本語' },
  { value: 'es-ES', label: '🇪🇸 Español' },
  { value: 'fr-FR', label: '🇫🇷 Français' },
  { value: 'ru-RU', label: '🇷🇺 Русский язык' },
  { value: 'th-TH', label: '🇹🇭 ภาษาไทย' },
  { value: 'vi-VN', label: '🇻🇳 Tiếng Việt' },
  { value: 'de-DE', label: '🇩🇪 Deutsch' },
  { value: 'id-ID', label: '🇮🇩 Bahasa Indonesia' },
  { value: 'pt-BR', label: '🇧🇷 Português' },
  { value: 'tr-TR', label: '🇹🇷 Türkçe' },
  { value: 'it-IT', label: '🇮🇹 Italiano' }
]

export const ACCEPTANCE_LEVEL = 70
export const ALL_ELEMENTS: ElementType[] = ['Anemo', 'Geo', 'Electro', 'Dendro', 'Hydro', 'Pyro', 'Cryo']
export const CONVERTIBLE_ELEMENTS: ElementType[] = ['Anemo', 'Geo', 'Electro', 'Dendro', 'Hydro', 'Pyro']
export const CUSTOM_DATA_MAX_ELEMENTS = 3
export const CUSTOM_DATA_MAX_STARTING_CHARACTERS = 6
export const CUSTOM_DATA_MAX_STARTING_CHARACTERS_PER_ELEMENT = 2
export const CUSTOM_DATA_MAX_SPECIAL_GUESTS = 4
