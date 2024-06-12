import React, {useState} from 'react'
import { redirectToAuthCodeFlow, code, clientId, getAccessToken, fetchProfile } from './api/apiToken';
import './App.css';

function App() {
  const [token, setToken] = useState(null);
 

  const handleAuthFlow = async () => {
    try {
        const token = await getAccessToken(clientId, code);
        console.log(token)
        const profile = await fetchProfile(token);
        setToken(token)
    
    } catch(error) {
      console.error(error)
    }
  }
  
  return (
    
    <div className='App'>
  
      
    </div>
  )
}

export default App;
