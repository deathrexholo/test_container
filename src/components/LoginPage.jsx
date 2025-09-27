import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useTranslation from '../hooks/useTranslation';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { role } = useParams();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const roleInfo = {
    athlete: { 
      title: 'athlete', 
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    coach: { 
      title: 'coach', 
      image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    organization: { 
      title: 'organization', 
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    spouse: { 
      title: 'spouse', 
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    parent: { 
      title: 'parent', 
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { role, ...formData });
    // For now, just navigate to a success page or dashboard
    alert(`${t('welcome')} ${t(roleInfo[role]?.title)}! ${t('loginFunctionalityComingSoon')}`);
  };

  const currentRole = roleInfo[role];

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="role-image-container">
            <img src={currentRole?.image} alt={currentRole?.title} className="role-image" />
          </div>
          <h1 className="login-title">{t('loginAs')} {t(currentRole?.title)}</h1>
          <p className="login-subtitle">{t('enterCredentials')}</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">{t('email')}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder={t('enterYourEmail')}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">{t('password')}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder={t('enterYourPassword')}
            />
          </div>

          <button type="submit" className="login-submit-btn">
            {t('login')}
          </button>
        </form>

        <div className="login-footer">
          <p>{t('dontHaveAccount')} <span className="register-link">{t('signUp')}</span></p>
          <button 
            className="back-to-roles-btn"
            onClick={() => navigate('/role-selection')}
          >
            ← {t('chooseDifferentRole')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
