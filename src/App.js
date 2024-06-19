import React, {useEffect, useState, useCallback, useRef} from 'react'
import { redirectToAuthCodeFlow, code, clientId, getAccessToken, fetchProfile } from './utils/apiToken';
import {saveToSpotify} from './utils/saveToSpotify'
import { searchTrackApi } from './utils/searchApi';
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
      setPlaylist(prevPlaylist => [...prevPlaylist, song]);
    },
    []
  );

  const removeTrack = useCallback(song => {
    setPlaylist(prevSongs => prevSongs.filter(currentSong => currentSong.id !== song.id))
  },[])

  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name);
    console.log(playlistName)
  }, []);


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

  const savePlaylist = useCallback(() => {
    const trackUris = playlist.map((song) => song.uri);
    saveToSpotify(token, playlistName, trackUris).then(() => {
      setPlaylistName("New Playlist");
      setPlaylist([]);
    });
  }, [playlistName, playlist]);
 
  return (
    !code ? redirectToAuthCodeFlow(clientId) :
    (
      <div className='App'>
        {profile ? (
          <>
            <header>
              <h1>Welcome, {profile.display_name}</h1>
              <Searchbar 
                onChange={handleChange}
                onSearch={handleSearch}
              />
            </header>
            <main style={{display: 'flex', justifyContent: 'center', gap: '5rem'}}>
              <Searchresults songs={songs} onAdd={addTrack} />
              <Playlist 
                playlistName={playlistName}
                playlist={playlist}
                onRemove={removeTrack}
                onNameChange={updatePlaylistName}
                onSave={savePlaylist}
              />
            </main>
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
