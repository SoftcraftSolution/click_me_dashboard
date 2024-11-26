import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 // Adjust the import path as needed
// Adjust the import path as needed

//import LoginPage from './Component/login/login';
import Login from './Component/Login/login';
import Dashboard from './Component/Dashboard/dashboard';
function App() {
  return (
    <Router>

          <Routes>
            {/* <Route path="/userlist" element={<DashboardPage />} /> */}
            <Route path="/" element={<Login />} />
            <Route path="/dash" element={<Dashboard />} />
           
     
          </Routes>

    </Router>
  );
}

export default App;
