import React, {useEffect, useState, useRef} from 'react'
import { redirectToAuthCodeFlow, code, clientId, getAccessToken, fetchProfile } from './api/apiToken';
import { searchTrackApi } from './api/searchApi';
import Searchbar from './components/searchbar';
import Searchresults from './components/searchresults'
import './App.css';

function App() {
  const [term, setTerm] = useState('');
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [songs, setSongs] = useState([]);
  const hasFetchedData = useRef(false);

  const handleChange = (e) => {
    setTerm(e.target.value)
  }

  const handleSearch = async(e) => {
    e.preventDefault();
    const tracks = await searchTrackApi(token, term);
    setSongs([...tracks])
  }
  
  useEffect(() => {
    if (hasFetchedData.current) return
    let ignore = false;
    const handleAccessToken = async () => {
        console.log("Fetching access token");
        const access_token = await getAccessToken(clientId, code);
        const profile = await fetchProfile(access_token)
        if(!ignore) {
          setToken(access_token)
          setProfile(profile)
        }
    }
    handleAccessToken()

    hasFetchedData.current = true; // Set ref to true after fetching

    return () => {
      ignore = true;
    }

  },[])
 
  return (
    !code ? redirectToAuthCodeFlow(clientId) :
    (
      <div className='App'>
        {profile ? (
          <>
          <h1>Welcome, {profile.display_name}</h1>
          <Searchbar 
            onChange={handleChange}
            onSearch={handleSearch}
          />
          <Searchresults songs={songs} />
          </>
        ): 
        (
          <p>Loading...</p>
        )}
      </div>
    )
  )

}

export default App;
