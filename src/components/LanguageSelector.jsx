import React, { useEffect, useRef } from 'react';
import { useLanguage, LANGUAGES } from '../contexts/LanguageContext';
import '../styles/LanguageSelector.css';

const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageSelect = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get the language code for the flag emoji
  const getFlagEmoji = (langCode) => {
    const flagMap = {
      en: '🇬🇧', // English (UK flag)
      hi: '🇮🇳', // Hindi (India flag)
      bn: '🇧🇩', // Bengali (Bangladesh flag)
      ta: '🇮🇳', // Tamil (India flag)
      te: '🇮🇳', // Telugu (India flag)
      // Add more language codes and their corresponding flag emojis
    };
    return flagMap[langCode] || '🌐';
  };

  return (
    <div className="language-selector" ref={dropdownRef}>
      <button 
        className="language-toggle"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {getFlagEmoji(language)}
      </button>
      
      {isOpen && (
        <div className="language-dropdown">
          {Object.values(LANGUAGES).map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${language === lang.code ? 'active' : ''}`}
              onClick={() => handleLanguageSelect(lang.code)}
            >
              <span className="language-flag">{getFlagEmoji(lang.code)}</span>
              <span className="language-native">{lang.nativeName}</span>
              <span className="language-name">({lang.name})</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
