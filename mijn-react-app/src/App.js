import logo from './logo.svg';
import './App.css';
import MusicPlayer from './components/MusicPlayer';


function App() {

  const songs = [
    { title: 'Ed sheeran - Shape of You', url: '/music/Ed Sheeran - Shape of You (Official Music Video).mp3' },
  ];
  return (
    <div className="App">
      <h1>React Music Player</h1>
      <MusicPlayer songs={songs} />
    </div>
  );
}

export default App;
