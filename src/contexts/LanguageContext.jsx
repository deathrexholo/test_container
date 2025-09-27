import React, { createContext, useContext, useState, useEffect } from 'react';

// Indian languages with their native names
const LANGUAGES = {
  en: { code: 'en', name: 'English', nativeName: 'English' },
  hi: { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  bn: { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  ta: { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  te: { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  mr: { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  gu: { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  kn: { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  ml: { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  pa: { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  or: { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  as: { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
  sa: { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्' },
};

const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Load saved language preference or use browser language
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && LANGUAGES[savedLanguage]) {
      setLanguage(savedLanguage);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (LANGUAGES[browserLang]) {
        setLanguage(browserLang);
      }
    }
  }, []);

  const changeLanguage = (langCode) => {
    if (LANGUAGES[langCode]) {
      setLanguage(langCode);
      localStorage.setItem('language', langCode);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, languages: LANGUAGES, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LANGUAGES };
export default LanguageContext;
