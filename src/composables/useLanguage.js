import { ref, computed } from 'vue'
import { translations } from '../i18n/translations.js'

const STORAGE_KEY = 'site-lang'
const supported = ['ENG', 'ESP']

// Singleton reactive ref shared across all composable calls
const langRef = ref(
  typeof window !== 'undefined'
    ? (localStorage.getItem(STORAGE_KEY) || 'ENG')
    : 'ENG'
)

export function useLanguage() {
  const language = langRef

  const toggleLanguage = () => {
    language.value = language.value === 'ENG' ? 'ESP' : 'ENG'
    try {
      localStorage.setItem(STORAGE_KEY, language.value)
    } catch (_) {
      // ignore storage errors
    }
  }

  const isENG = computed(() => language.value === 'ENG')
  const isESP = computed(() => language.value === 'ESP')

  // t(section) returns the translation object for the current language
  // e.g. t('home').label, t('nav').about, t('career').experience
  const t = (section) => {
    return translations[language.value]?.[section] ?? translations['ENG'][section]
  }

  return {
    language,
    toggleLanguage,
    isENG,
    isESP,
    supported,
    t,
  }
}
