import { useLanguage } from '../contexts/LanguageContext';
import translations from '../translations';

const useTranslation = () => {
  const { language } = useLanguage();
  
  const t = (key) => {
    // Split the key by dots to handle nested objects (e.g., 'home.welcome')
    const keys = key.split('.');
    let value = translations[language];
    
    // Traverse the translations object to get the correct value
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if translation not found
        const enValue = keys.reduce((obj, k) => (obj && obj[k] !== 'undefined' ? obj[k] : ''), translations.en);
        return enValue || key; // Return the key as last resort
      }
    }
    
    return value || key; // Return the key if no translation found
  };
  
  return { t, language };
};

export default useTranslation;
