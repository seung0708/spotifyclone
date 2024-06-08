import {getToken} from './api/apiToken';
import Searchbar from './components/searchbar';
import './App.css';

function App() {

  const accessToken = getToken;

  return (
    <div className="App">
      <header className="App-header">
        <Searchbar />
      </header>
    </div>
  );
}

export default App;
