import logo from './logo.svg';
import './App.css';
import {apiKey} from './Components/Constants'
console.log(apiKey);
var api_key = '1cc89089ee4169641fac7a0703ae9e9a';
var complete_api_link = 'https://api.openweathermap.org/data/2.5/weather?q=coimbatore&appid='+''+apiKey;

function App() {
  return (
    <div className="App">
      <h1>hello</h1>
    </div>
  );
}

export default App;
