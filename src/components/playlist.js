import React, { useEffect, useState } from 'react';
import { redirectToAuthCodeFlow, getAccessToken, fetchProfile, populateUI } from './authService';

const App = ({ clientId }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const handleAuthFlow = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (!code) {
          redirectToAuthCodeFlow(clientId);
        } else {
          const token = await getAccessToken(clientId, code);
          const userProfile = await fetchProfile(token);
          
          setAccessToken(token);
          setProfile(userProfile);
        }
      } catch (error) {
        console.error('Error in authentication flow:', error);
        // Handle error state or redirect to an error page
      }
    };

    handleAuthFlow();
  }, [clientId]);

  return (
    <div>
      {profile ? (
        <div>
          <h1>Welcome, {profile.name}</h1>
          {/* Render more profile information as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
