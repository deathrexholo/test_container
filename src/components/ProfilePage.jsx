import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabaseClient';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [athleteDetails, setAthleteDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;

      setLoading(true);
      try {
        // 1. Fetch Basic Profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);

        // 2. If Athlete, Fetch Athlete Details
        if (profileData?.role === 'athlete') {
          const { data: athleteData, error: athleteError } = await supabase
            .from('athlete_details')
            .select('*')
            .eq('id', user.id)
            .single();

          if (!athleteError) {
            setAthleteDetails(athleteData);
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (loading) return <div className="profile-container loading">Loading Profile...</div>;
  if (!user) return <div className="profile-container">Please log in to view this page.</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {profile?.full_name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <h1>{profile?.full_name || 'User Profile'}</h1>
          <span className="role-badge">{profile?.role || 'User'}</span>
          <p className="email-text">{profile?.email}</p>
        </div>

        <div className="profile-content">
          {athleteDetails && (
            <div className="athlete-stats">
              <h2>Athlete Stats</h2>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-label">Height</span>
                  <span className="stat-value">{athleteDetails.height || 'N/A'} cm</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Weight</span>
                  <span className="stat-value">{athleteDetails.weight || 'N/A'} kg</span>
                </div>
              </div>

              <div className="detail-section">
                <h3>Academy</h3>
                <p>{athleteDetails.academy || 'Not listed'}</p>
              </div>

              <div className="detail-section">
                <h3>Coaches</h3>
                <p>{athleteDetails.coaches || 'Not listed'}</p>
              </div>

              <div className="detail-section">
                <h3>Certificates</h3>
                <p className="long-text">{athleteDetails.certificates || 'None'}</p>
              </div>

              <div className="detail-section">
                <h3>Achievements</h3>
                <p className="long-text">{athleteDetails.achievements || 'None'}</p>
              </div>
            </div>
          )}
        </div>

        <div className="profile-actions">
          <button className="logout-btn" onClick={handleLogout}>Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
