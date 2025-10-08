import CodeCheck from './components/CodeCheck';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './components/LoginPage';
import Admin from './components/Admin';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CodeCheck />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="*" element={<Navigate to="/admin/login" />} />
      </Routes>
    </Router>
  );
}

export default App;