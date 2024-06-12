import React, { useEffect, useState } from 'react';
import { redirectToAuthCodeFlow, getAccessToken, fetchProfile, populateUI } from './authService';

const App = ({ clientId }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    const handleAuthFlow = async () => {
      if (!code) {
        redirectToAuthCodeFlow(clientId);
      } else {
        const accessToken = await getAccessToken(clientId, code);
        setAccessToken(accessToken);
        const profile = await fetchProfile(accessToken);
        populateUI(profile, setProfile);
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
