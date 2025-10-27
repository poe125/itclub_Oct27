import logo from './logo.svg';
import './App.css';
import MicWebSocket from './MicWebSocket';

function App() {
  return (
    <div className="App">
      <h1>マイク入力 + WebSocket デモ</h1>
      <MicWebSocket />
    </div>
  );
}

export default App;
