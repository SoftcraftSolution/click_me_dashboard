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
  const [isEmployeeListOpen, setIsEmployeeListOpen] = useState(false);
  const [isItemOpen, setIsItemOpen] = useState(false);  // New state for Future Price

  const toggleUserList = () => {
    setIsUserListOpen(!isUserListOpen);
  };

  const toggleNewsList = () => {
    setIsNewsOpen(!isNewsOpen);
  };

  return (
    <div className="sidebar">
      <div className='sidebar-parent-logo' ><div className="sider-logo"></div></div>

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
{/* company list */}
        <li>
          <button
            className={`menu-item ${(activeIndex === 11 || activeIndex ===12) ? 'active' : 'inactive'}`}
            onClick={() => {
              toggleUserList();
              onTabClick(11);
            }}
          >
            <img src={userimg} alt="User List Icon" className="icon" />
            <div>Company</div>
            
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
                  Company List
                </Link>
              </li>
              <li>
                <Link
                  className={`submenu-item ${activeIndex === 12 ? 'active' : 'inactive'}`}
                  onClick={() => onTabClick(12)}
                >
                  Add New Company
                </Link>
              </li>
              
            </ul>
        </li>
{/* employee list */}
        <li>
          <button
            className={`menu-item ${activeIndex === 3 ? 'active' : 'inactive'}`}
            onClick={() => {
              setIsEmployeeListOpen(!isEmployeeListOpen);
              onTabClick(3);
            }}
          >
            <img src={verimg} alt="Verify Icon" className="icon" />
            Employee 
            <img
              src={isEmployeeListOpen? upArrow : downArrow}
              alt="Toggle"
              className="news-icon"
            />
          </button>
          <ul className={`submenu ${isEmployeeListOpen ? 'submenu-open' : ''}`}>
              <li>
                <Link
                  className={`submenu-item ${activeIndex === 3 ? 'active' : 'inactive'}`}
                  onClick={() => onTabClick(3)}
                >
                 Employee List
                </Link>
              </li>
            </ul>
        </li>
{/* item secttionn */}
        <li>
          <button
            className={`menu-item ${(activeIndex === 4 || activeIndex === 5) ? 'active' : 'inactive'}`}
            onClick={() => {
              setIsItemOpen(!isItemOpen); // Toggle future state
              onTabClick(4);
            }}
          >
            <img src={updateslogo} alt="Future Price Icon" className="icon" />
            Item
            <img
              src={isItemOpen? upArrow : downArrow}
              alt="Toggle"
              className="news-icon"
            />
          </button>
          <ul className={`submenu ${isItemOpen ? 'submenu-open' : ''}`}>
              <li>
                <Link
                  className={`submenu-item ${activeIndex === 4 ? 'active' : 'inactive'}`}
                  onClick={() => onTabClick(4)}
                >
                  Item List
                </Link>
              </li>
              <li>
                <Link
                  className={`submenu-item ${activeIndex === 5 ? 'active' : 'inactive'}`}
                  onClick={() => onTabClick(5)}
                >
                  Add New Item
                </Link>
              </li>
              
            </ul>
        </li>

        {/* <li>
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
        </li> */}

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
