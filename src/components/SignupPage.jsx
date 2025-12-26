import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useTranslation from '../hooks/useTranslation';
import { useAuth } from '../contexts/AuthContext';
import './SignupPage.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const { role } = useParams();
  const { t } = useTranslation();
  const { signup } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Athlete specific fields
    weight: '',
    height: '',
    academy: '',
    coaches: '',
    certificates: '',
    achievements: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

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

  const currentRole = roleInfo[role] || roleInfo.athlete; // Fallback to athlete if undefined

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    // Prepare metadata
    const metadata = {
      full_name: formData.fullName,
      role: role
    };

    if (role === 'athlete') {
      Object.assign(metadata, {
        weight: formData.weight,
        height: formData.height,
        academy: formData.academy,
        coaches: formData.coaches,
        certificates: formData.certificates,
        achievements: formData.achievements
      });
    }

    // Sign up with all data in metadata
    const { data, error } = await signup(formData.email, formData.password, metadata);

    if (error) {
      console.error('Signup error:', error);
      setError(error.message || 'Failed to sign up');
    } else {
      console.log('Signup successful:', data);
      setSuccessMessage('Registration successful! Please check your email for verification.');
      
      // Optional: Navigate to login after a delay
      setTimeout(() => {
         navigate(`/login/${role}`);
      }, 3000);
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="role-image-container">
            <img src={currentRole?.image} alt={currentRole?.title} className="role-image" />
          </div>
          <h1 className="login-title">Sign Up as {t(currentRole?.title)}</h1>
          <p className="login-subtitle">Create your account</p>
        </div>

        {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
        {successMessage && <div className="success-message" style={{ color: '#00ff00', marginBottom: '1rem', textAlign: 'center' }}>{successMessage}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              placeholder="Enter your full name"
            />
          </div>

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

          {/* Athlete Professional Form */}
          {role === 'athlete' && (
            <div className="athlete-form-section">
              <h3 className="section-title">Professional Details</h3>
              
              <div className="form-row">
                <div className="input-group half-width">
                  <label htmlFor="height">Height (cm)</label>
                  <input
                    type="text"
                    id="height"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    placeholder="e.g. 180"
                  />
                </div>
                <div className="input-group half-width">
                  <label htmlFor="weight">Weight (kg)</label>
                  <input
                    type="text"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="e.g. 75"
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="academy">Academy / Gym</label>
                <input
                  type="text"
                  id="academy"
                  name="academy"
                  value={formData.academy}
                  onChange={handleInputChange}
                  placeholder="Where do you train?"
                />
              </div>

              <div className="input-group">
                <label htmlFor="coaches">Coaches</label>
                <input
                  type="text"
                  id="coaches"
                  name="coaches"
                  value={formData.coaches}
                  onChange={handleInputChange}
                  placeholder="Who trains you?"
                />
              </div>

              <div className="input-group">
                <label htmlFor="certificates">Certificates / Rank</label>
                <textarea
                  id="certificates"
                  name="certificates"
                  value={formData.certificates}
                  onChange={handleInputChange}
                  placeholder="List your certifications or belt rank"
                  rows="2"
                />
              </div>

              <div className="input-group">
                <label htmlFor="achievements">Achievements</label>
                <textarea
                  id="achievements"
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleInputChange}
                  placeholder="Major wins, titles, or records"
                  rows="2"
                />
              </div>
            </div>
          )}

          <div className="input-group">
            <label htmlFor="password">{t('password')}</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder={t('enterYourPassword')}
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "👁️‍🗨️" : "👁️"}
              </button>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-input-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                placeholder="Confirm your password"
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? "👁️‍🗨️" : "👁️"}
              </button>
            </div>
          </div>

          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="login-footer">
          <p>Already have an account? <span className="register-link" onClick={() => navigate(`/login/${role}`)}>Login</span></p>
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

export default SignupPage;
