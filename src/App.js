import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import Song from './pages/Song';
import Panel from './pages/Panel';
import Songs from './pages/Songs';
import Register from './pages/Register';
import Footer from './pages/Footer';

import 'bootstrap/dist/css/bootstrap.css';
import * as config from './config';
import './styles/background.css';
function App() {
  window.config = config;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/song/:song" element={<Song />} />
        <Route path="/songs" element={<Songs />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
