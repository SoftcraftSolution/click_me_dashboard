import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 // Adjust the import path as needed
// Adjust the import path as needed
import DashboardPage from './Component/UserList/UserList';
//import LoginPage from './Component/login/login';
import Login from './Component/Login/login';
import OtpPage from './Component/EnterOTP/enterotp';
import VerifyUsers from './Component/VerifyUsers/verifyuser';
import CompanyList from './Component/companylist/companylist';
import ExpiredTrial from './Component/ExpiredTrail/expiredtrial';
import RejectedUser from './Component/RejectedUser/rejecteduser';
import SelfNews from './Component/SelfNews/selfnews';
import AddCircular from './Component/AddCircular/addcircular';
import SpotPrice from './Component/SpotPrice/spotprice';
import Dashboard from './Component/Dashboard/dashboard';
import ForgotPassword from './Component/ForgotPassword/forgotpassword';
import NewPassword from './Component/NewPassword/newpassword';
import SuccessPage from './Component/SucessPopup/sucess';
import AdminDashboard from './Component/AddAdmin/addadmin';
import MainDashboard from './Component/DashboardMain/maindashboard';
import Notification from './Component/Notification/notification'
import UserList from './Component/FreeUser/freeuser';
import AddSpotPrice from './Component/AddSpot/AddSpot';

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
