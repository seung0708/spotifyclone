import React, {useState, useEffect} from 'react'
import {code, redirectToAuthCodeFlow, getAccessToken, fetchProfile, clientId} from './api/apiToken';
import {} from './api/apiToken';
import Searchbar from './components/searchbar';
import './App.css';

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
  const accessToken = await getAccessToken(clientId, code);
  const profile = await fetchProfile(accessToken);
  console.log(profile)
}

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <Searchbar />
      </header>
    </div>
  );
}

export default App;
