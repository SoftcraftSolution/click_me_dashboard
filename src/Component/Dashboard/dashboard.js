import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import MainDashboard from '../DashboardMain/maindashboard.js';
import SpotPrice from '../SpotPrice/spotprice.js';
import VerifyUsers from '../VerifyUsers/verifyuser.js';
import CompanyList from '../companylist/companylist.js';
import NewsPage from '../News/news.js';
import ExpiredTrial from '../ExpiredTrail/expiredtrial.js';
import RejectedUserTrial from '../RejectedUser/rejecteduser.js';
import Updates from '../Updates/Updates.js';
import Sidebar from '../Sidebar/Sidebar.js';
import Topbar from '../TopBar/topbar.js'; // Import the Topbar component
import "./dashboard.css"; // Your CSS file for styling

import AddNews from '../SelfNews/selfnews.js';

import AddLocation from '../AddLocation/AddLocation.js';
import Feedback from '../Feedback/Feedback.js';
import AddSBI from '../AddSBIREFERENCE/AddSbi.js';
import WarehouseStockEditor from '../AddWarehouse/addwarehouse.js';
import AddCompany from '../addCompany/addCompany.jsx';
import EmployeeList from '../employee/employeelist.jsx';
import ItemList from '../itemList/itemList.jsx';
import AddItem from '../addItem/addItem.jsx';
import AddSubcategory from '../addSubcategory/addSubcategory.jsx';
import AddBanner from '../addBanner/addBanner.jsx';
import PaymentList from '../payment/paymentList.jsx';
import RewardList from '../rewardList/rewardList.jsx';
import AddReward from '../addReward/addReward.jsx';
import CouponList from '../couponList/couponList.jsx';
import CouponForm from '../couponForm/couponForm.jsx';
import AnalyticsPage from '../analyticsPage/analytics.jsx';
import EnhancedAnalyticsPage from '../analyticsPage/analytics.jsx';

const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's an email in cookies
    const email = Cookies.get('email');
    if (!email) {
      // If no email found, navigate to login page
      navigate('/')
    }
  }, [navigate]);

  const handleTabClick = (index) => {
    setActiveIndex(index);
  };

  const renderContent = () => {
    switch (activeIndex) {
      case 0:
        return <AnalyticsPage />;
      case 3:
        return <EmployeeList />;
      case 4:
        return <ItemList />;
      case 5:
        return <AddItem />;
      case 6:
        return <AddSubcategory />;
      case 7:
        return <AddNews />;
      case 8:
        return <AddLocation />;
      case 9:
        return <PaymentList />;
      case 10:
        return <CouponList />;
      case 11:
        return <CompanyList />;
      case 12:
        return <AddCompany />;
      case 13:
        return <CouponForm />;
      case 14:
        return <RewardList />;
      case 15:
        return <AddReward />;
      case 16:
        return <Feedback />;
      case 17:
        return <AddBanner />;
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
