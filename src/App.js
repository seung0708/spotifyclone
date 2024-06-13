import React, {useEffect, useState} from 'react'
import { redirectToAuthCodeFlow, code, clientId, getAccessToken, fetchProfile } from './api/apiToken';
import Searchbar from './components/searchbar';
import './App.css';

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  
  useEffect(() => {
    let ignore = false;
    const handleAuthFlow = async () => {
      if(!code) {
        console.log("Redirecting to auth code flow");
        redirectToAuthCodeFlow(clientId)
      } else {
        console.log("Fetching access token");
        const access_token = await getAccessToken(clientId, code);
        console.log(access_token)
        if (!ignore) {
          setToken(access_token)
          const profile = await fetchProfile(token);
          setProfile(profile);
        }
      }
    }
    handleAuthFlow()

    return () => {
      ignore = true
    }

  },[])
 
  return (
    <div className='App'>

    </div>
  )

}

export default App;
