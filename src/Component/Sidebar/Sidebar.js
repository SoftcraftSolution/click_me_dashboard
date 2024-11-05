import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import logo from '../../assets/logo.png';
import homeimg from '../../assets/home.png';
import userimg from '../../assets/user.png';
import verimg from '../../assets/verify.png';
import newsimg from '../../assets/news.png';
import add from '../../assets/addadmin.png';
import downArrow from '../../assets/downarrow.png';
import upArrow from '../../assets/uparrow.png';
import cash from '../../assets/cash.png';
import spot from '../../assets/spot.png';
import updateslogo from '../../assets/updateslogo.png';
import feed from '../../assets/feed.png';
import logoutadmin from '../../assets/logoutadmin.png';
import futurelogo from '../../assets/futurelogo.png';

const Sidebar = ({ activeIndex, onTabClick }) => {
  const navigate = useNavigate();
  const [isUserListOpen, setIsUserListOpen] = useState(false);
  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const [isSpotOpen, setIsSpotOpen] = useState(false);
  const [isUpdatesOpen, setIsUpdatesOpen] = useState(false);
  const [isFutureOpen, setIsFutureOpen] = useState(false);  // New state for Future Price

  const toggleUserList = () => {
    setIsUserListOpen(!isUserListOpen);
  };

  const toggleNewsList = () => {
    setIsNewsOpen(!isNewsOpen);
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      <ul className="sidebar-menu">
        <li>
          <a
            className={`menu-item ${activeIndex === 0 ? 'active' : 'inactive'}`}
            onClick={() => onTabClick(0)}
          >
            <img src={homeimg} alt="Dashboard Icon" className="icon" />
            Dashboard
          </a>
        </li>

        <li>
          <button
            className={`menu-item ${activeIndex === 1 ? 'active' : 'inactive'}`}
            onClick={() => {
              toggleUserList();
              onTabClick(1);
            }}
          >
            <img src={userimg} alt="User List Icon" className="icon" />
            <div>User List</div>
            
            <img
              src={isUserListOpen ? upArrow : downArrow}
              alt="Toggle"
              className="arrow-icon"
            />
          </button>
          
          <ul className={`submenu ${isUserListOpen ? 'submenu-open' : ''}`}>
              <li>
                <Link
                  className={`submenu-item ${activeIndex === 11 ? 'active' : 'inactive'}`}
                  onClick={() => onTabClick(11)}
                >
                  Free Trial
                </Link>
              </li>
              <li>
                <Link
                  className={`submenu-item ${activeIndex === 12 ? 'active' : 'inactive'}`}
                  onClick={() => onTabClick(12)}
                >
                  Expired Trial
                </Link>
              </li>
              <li>
                <Link
                  className={`submenu-item ${activeIndex === 13 ? 'active' : 'inactive'}`}
                  onClick={() => onTabClick(13)}
                >
                  Rejected Users
                </Link>
              </li>
              <li>
                <Link
                  className={`submenu-item ${activeIndex === 14 ? 'active' : 'inactive'}`}
                  onClick={() => onTabClick(14)}
                >
                  Free Users
                </Link>
              </li>
            </ul>
        </li>

        <li>
          <Link
            className={`menu-item ${activeIndex === 3 ? 'active' : 'inactive'}`}
            onClick={() => onTabClick(3)}
          >
            <img src={verimg} alt="Verify Icon" className="icon" />
            Verify User
          </Link>
        </li>

        <li>
          <button
            className={`menu-item ${activeIndex === 16 ? 'active' : 'inactive'}`}
            onClick={() => {
              setIsUpdatesOpen(!isUpdatesOpen);
              onTabClick(16);
            }}
          >
            <img src={updateslogo} alt="Updates Icon" className="icon" />
            Updates
          </button>
          <ul className={`submenu ${isUpdatesOpen ? 'submenu-open' : ''}`}>
              <li>
                <Link
                  className={`submenu-item ${activeIndex === 18 ? 'active' : 'inactive'}`}
                  onClick={() => onTabClick(18)}
                >
                  Add Update
                </Link>
              </li>
            </ul>
        </li>
        
        <li>
          <button
            className={`menu-item ${activeIndex === 44 ? 'active' : 'inactive'}`}
            onClick={() => {
              setIsFutureOpen(!isFutureOpen); // Toggle future state
              onTabClick(16);
            }}
          >
            <img src={futurelogo} alt="Future Price Icon" className="icon" />
            Future Price
          </button>
          <ul className={`submenu ${isFutureOpen ? 'submenu-open' : ''}`}>
              <li>
                <Link
                  className={`submenu-item ${activeIndex === 19 ? 'active' : 'inactive'}`}
                  onClick={() => onTabClick(19)}
                >
                  Add Reference Rate (SBI)
                </Link>
              </li>
              <li>
                <Link
                  className={`submenu-item ${activeIndex === 20 ? 'active' : 'inactive'}`}
                  onClick={() => onTabClick(20)}
                >
                  Add Warehouse Stock
                </Link>
              </li>
              <li>
                <Link
                  className={`submenu-item ${activeIndex === 18 ? 'active' : 'inactive'}`}
                  onClick={() => onTabClick(18)}
                >
                  Add Settlement
                </Link>
              </li>
            </ul>
        </li>

        <li>
          <button
            className={`menu-item ${activeIndex === 4 ? 'active' : 'inactive'}`}
            onClick={() => {
              setIsSpotOpen(!isSpotOpen);
              onTabClick(4);
            }}
          >
            <img src={spot} alt="Spot Price Icon" className="icon" />
            Spot Price
          </button>
          <ul className={`submenu ${isSpotOpen ? 'submenu-open' : ''}`}>
              <li>
                <Link
                  className={`submenu-item ${activeIndex === 5 ? 'active' : 'inactive'}`}
                  onClick={() => onTabClick(5)}
                >
                  Add Spot Price
                </Link>
              </li>
              <li>
                <Link
                  className={`submenu-item ${activeIndex === 8 ? 'active' : 'inactive'}`}
                  onClick={() => onTabClick(8)}
                >
                  Add Location
                </Link>
              </li>
            </ul>
        </li>

        <li>
          <button
            className={`menu-item ${activeIndex === 6 ? 'active' : 'inactive'}`}
            onClick={() => {
              toggleNewsList();
              onTabClick(6);
            }}
          >
            <img src={newsimg} alt="News Icon" className="icon" />
            News
            <img
              src={isNewsOpen ? upArrow : downArrow}
              alt="Toggle"
              className="news-icon"
            />
          </button>
          <ul className={`submenu ${isNewsOpen ? 'submenu-open' : ''}`}>
              <li>
                <Link
                  className={`submenu-item ${activeIndex === 10 ? 'active' : 'inactive'}`}
                  onClick={() => onTabClick(7)}
                >
                  Add Self News
                </Link>
              </li>
              <li>
                <Link
                  className={`submenu-item ${activeIndex === 11 ? 'active' : 'inactive'}`}
                  onClick={() => onTabClick(10)}
                >
                  Add Circular
                </Link>
              </li>
            </ul>
        </li>

        <li>
          <Link
            className={`menu-item ${activeIndex === 17 ? 'active' : 'inactive'}`}
            onClick={() => onTabClick(17)}
          >
            <img src={feed} alt="Feedback Icon" className="icon" />
            Feedback
          </Link>
        </li>             

        <li>
          <Link
            className={`menu-item ${activeIndex === 9 ? 'active' : 'inactive'}`}
            onClick={() => onTabClick(9)}
          >
            <img src={add} alt="Add Admin Icon" className="icon" />
            Add Admin
          </Link>
        </li>
        
        <li>
          <Link
            className={`menu-item ${activeIndex === 14 ? 'active' : 'inactive'}`}
            onClick={() => onTabClick(14)}
          >
            <img src={cash} alt="Subscription Icon" className="icon" />
            Subscription
          </Link>
        </li>

        <li>
          <button
            className={`menu-item ${activeIndex === 15 ? 'active' : 'inactive'}`}
            onClick={() => {
              if (window.confirm("Are you sure you want to log out?")) {
                navigate('/LoginAdmin');
              }
            }}
          >
            <img src={logoutadmin} alt="Logout Icon" className="icon" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
