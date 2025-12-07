// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/html/LoginPage';
import AdminDashboard from './components/html/AdminDashboard';
import RolePage from './components/html/RolePage'; 
import HomePage from './components/html/HomePage'; 
import DonorPage from './components/html/DonorPage';
import NgoPage from './components/html/NgoPage';

function App() {
  return (
  
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/home" element={<RolePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/donor" element={<DonorPage />} />
        <Route path="/ngo" element={<NgoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
