import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashbord from './Admin/Dashbord';
import Login from './Admin/login';
import AdminData from './Admin/AdminData';


  function App() {
    return (
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashbord />} />
        <Route path="/adminData" element={<AdminData />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
    
    );
  }
  
  export default App;