import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 // Adjust the import path as needed
// Adjust the import path as needed
import DashboardPage from './Component/UserList/UserList';
//import LoginPage from './Component/login/login';
import Login from './Component/Login/login';
import OtpPage from './Component/EnterOTP/enterotp';
import VerifyUsers from './Component/VerifyUsers/verifyuser';
import FreeTrial from './Component/FreeTrial/freetrial';
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
            <Route path="/userlist" element={<DashboardPage />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/enterotp" element={<OtpPage />} />
            <Route path="/verifyuser" element={<VerifyUsers />} />
            <Route path="/freetrial" element={<FreeTrial />} />
            <Route path="/expiredtrial" element={<ExpiredTrial />} />
            <Route path="/rejecteduser" element={<RejectedUser />} />
            <Route path="/selfnews" element={<SelfNews />} />
            <Route path="/addcircular" element={<AddCircular />} />
            <Route path="/spotprice" element={<SpotPrice />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/new" element={<NewPassword />} />
            <Route path="/sucess" element={<SuccessPage />} />
            <Route path="/addadmin" element={<AdminDashboard />} />
            <Route path="/main" element={<MainDashboard />} />
            <Route path="/notification" element={<Notification />} />
            <Route path= "/freeuser" element={<UserList/>} />
            <Route path= "/addspot" element={<AddSpotPrice/>} />
            {/* <Route path= "/test" element={<SidebarExample/>} /> */}
            {/* Add more routes here as needed */}
     
          </Routes>

    </Router>
  );
}

export default App;
