import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import ThemeToggle from './components/ThemeToggle';
import LanguageSelector from './components/LanguageSelector';
import WelcomePage from './components/WelcomePage';
import RoleSelectionPage from './components/RoleSelectionPage';
import AboutPage from './components/AboutPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ProfilePage from './components/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <div className="App">
              <ThemeToggle />
              <LanguageSelector />
              <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/role-selection" element={<RoleSelectionPage />} />
                <Route path="/about/:role" element={<AboutPage />} />
                <Route path="/login/:role" element={<LoginPage />} />
                <Route path="/signup/:role" element={<SignupPage />} />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </div>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App
