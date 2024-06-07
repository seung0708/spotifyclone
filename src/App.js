import { Buffer } from 'buffer';
import Searchbar from './components/searchbar';
import './App.css';

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

  const getAccessToken = async () => {
    const response = await fetch(authOptions, {method: 'POST'});
    console.log(response)
    // const jsonResponse = await response.json();
    // console.log(jsonResponse)
    
  }

  getAccessToken()

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
