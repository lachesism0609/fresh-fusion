import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/HomePage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<div>Menu Page (Coming Soon)</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
