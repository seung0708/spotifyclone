import React, {useEffect, useState, useCallback, useRef} from 'react'
import { redirectToAuthCodeFlow, code, clientId, getAccessToken, fetchProfile } from './api/apiToken';
import { searchTrackApi } from './api/searchApi';
import Searchbar from './components/searchbar';
import Searchresults from './components/searchresults'
import Playlist from './components/playlist';
import './App.css';

function App() {
  const [term, setTerm] = useState('');
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [songs, setSongs] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist')
  const hasFetchedData = useRef(false);

  const handleChange = (e) => {
    setTerm(e.target.value)
  }

  const addTrack = useCallback(
    (song) => {
      if (playlist.some(prevSong => prevSong.id === song.id)) {
        return;
      }
      setPlaylist([...songs, song]);
    },
    [playlist]
  );


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
          <div>
            <div>
              <h1>Welcome, {profile.display_name}</h1>
              <Searchbar 
                onChange={handleChange}
                onSearch={handleSearch}
              />
            </div>
            <div style={{display: 'flex', justifyContent: 'center', gap: '5rem'}}>
              <Searchresults songs={songs} onAdd={addTrack} />
              <Playlist 
                playlistName={playlistName}
                playlist={playlist}
              />
            </div>
          </div>
        ): 
        (
          <p>Loading...</p>
        )}
      </div>
    )
  )

}

export default App;
