import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import ThemeToggle from './components/ThemeToggle';
import LanguageSelector from './components/LanguageSelector';
import WelcomePage from './components/WelcomePage';
import RoleSelectionPage from './components/RoleSelectionPage';
import AboutPage from './components/AboutPage';
import LoginPage from './components/LoginPage';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="App">
            <ThemeToggle />
            <LanguageSelector />
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/role-selection" element={<RoleSelectionPage />} />
              <Route path="/about/:role" element={<AboutPage />} />
              <Route path="/login/:role" element={<LoginPage />} />
            </Routes>
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App
