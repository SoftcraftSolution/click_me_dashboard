import React, { useState } from 'react';
import MainDashboard from '../DashboardMain/maindashboard.js';
import SpotPrice from '../SpotPrice/spotprice.js';
import VerifyUsers from '../VerifyUsers/verifyuser.js';
import FreeTrial from '../FreeTrial/freetrial.js';
import NewsPage from '../News/news.js';
import ExpiredTrial from '../ExpiredTrail/expiredtrial.js';
import RejectedUserTrial from '../RejectedUser/rejecteduser.js';
import Updates from '../Updates/Updates.js';
import Sidebar from '../Sidebar/Sidebar.js';
import Topbar from '../TopBar/topbar.js'; // Import the Topbar component
import "./dashboard.css"; // Your CSS file for styling
import UserList from '../UserList/UserList.js';
import SelfNews from '../SelfNews/selfnews.js';
import CashManagement from '../CashManagement/cashmanagement.js';
import AdminDashboard from '../AddAdmin/addadmin.js';
import CircularNews from '../AddCircular/addcircular.js';
import FreeUser from '../FreeUser/freeuser.js';
import UserListPage from '../UserList/UserList.js';
import AddNews from '../SelfNews/selfnews.js';
import AddCircularNews from '../AddCircular/addcircular.js';
import AddSpotPrice from '../AddSpot/AddSpot.js';
import AddUpdate from '../AddUpdate/AddUpdate.js';
import AddLocation from '../AddLocation/AddLocation.js';
import Feedback from '../Feedback/Feedback.js';
import AddSBI from '../AddSBIREFERENCE/AddSbi.js';
import WarehouseStockEditor from '../AddWarehouse/addwarehouse.js';


const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClick = (index) => {
    setActiveIndex(index);
  };

  const renderContent = () => {
    switch (activeIndex) {
      case 0:
        return <MainDashboard />;
      case 1:
        return <UserListPage />;
      case 2:
        return <FreeTrial />;
      case 3:
        return <VerifyUsers />;
      case 4:
        return <SpotPrice />;
      case 5:
          return <AddSpotPrice />;  
      case 6:
        return <NewsPage />;
      case 7:
        return <AddNews />;
      case 8:
        return <AddLocation/>;
      case 9:
        return <AdminDashboard/>;
      case 10:
        return <AddCircularNews/>;
      case 11:
        return <FreeTrial />;
      case 12:
        return <ExpiredTrial />;
      case 13:
        return <RejectedUserTrial />;
      case 14:
        return <FreeUser />;
       case 16:
            return <Updates />;
           case 17:
              return <Feedback />;  
              case 18:
                return <AddUpdate />;   
                case 19:
                  return <AddSBI />;
                case 20:
                  return <WarehouseStockEditor/>  
      default:
        return null;
    }
  };

  return (
    <div className="dashboarddd-container">
      <Sidebar activeIndex={activeIndex} onTabClick={handleTabClick} />
      <div className="main-content">
        <Topbar /> {/* Add the Topbar below the Sidebar */}
        <div className="home-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
