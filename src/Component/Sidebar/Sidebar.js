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
import { Feedback } from '@mui/icons-material';

const Sidebar = ({ activeIndex, onTabClick }) => {
  const navigate = useNavigate();
  const [isUserListOpen, setIsUserListOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isPromotionOpen, setIsPromotionOpen] = useState(false);
  const [isEmployeeListOpen, setIsEmployeeListOpen] = useState(false);
  const [isGamificationOpen, setIsGamificationOpen] = useState(false);
  const [isItemOpen, setIsItemOpen] = useState(false);  // New state for Future Price

  const toggleUserList = () => {
    setIsUserListOpen(!isUserListOpen);
  };

  const toggleOrderList = () => {
    setIsOrderOpen(!isOrderOpen);
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
{/* item secttion */}
        <li>
          <button
            className={`menu-item ${(activeIndex === 4 || activeIndex === 5 || activeIndex === 6) ? 'active' : 'inactive'}`}
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
              <li>
                <Link
                  className={`submenu-item ${activeIndex === 6 ? 'active' : 'inactive'}`}
                  onClick={() => onTabClick(6)}
                >
                  Add Sub Category
                </Link>
              </li>
            </ul>
        </li>

   {/* order list */}

        <li>
          <button
            className={`menu-item ${(activeIndex === 7 ||activeIndex === 8 )? 'active' : 'inactive'}`}
            onClick={() => {
              toggleOrderList();
              onTabClick(7);
            }}
          >
            <img src={newsimg} alt="News Icon" className="icon" />
            Order
            <img
              src={isOrderOpen ? upArrow : downArrow}
              alt="Toggle"
              className="news-icon"
            />
          </button>
          <ul className={`submenu ${isOrderOpen ? 'submenu-open' : ''}`}>
              <li>
                <Link
                  className={`submenu-item ${activeIndex === 7 ? 'active' : 'inactive'}`}
                  onClick={() => onTabClick(7)}
                >
                  Order List
                </Link>
              </li>
              <li>
                <Link
                  className={`submenu-item ${activeIndex === 8? 'active' : 'inactive'}`}
                  onClick={() => onTabClick(8)}
                >
                  Order history
                </Link>
              </li>
            </ul>
        </li>
{/* payment */}
        <li>
          <button
            className={`menu-item ${activeIndex === 9 ? 'active' : 'inactive'}`}
            onClick={() => {
              // toggleNewsList();
              onTabClick(9);
            }}
          >
            <img src={cash} alt="Logout Icon" className="icon" />
           Payment
          </button>
        </li>

{/* promotion */}

        <li>
          <button
            className={`menu-item ${(activeIndex === 10 ||activeIndex === 13 )? 'active' : 'inactive'}`}
            onClick={() => {
              setIsPromotionOpen(!isPromotionOpen);
              onTabClick(10);
            }}
          >
            <img src={feed} alt="News Icon" className="icon" />
            Promotion
            <img
              src={isPromotionOpen ? upArrow : downArrow}
              alt="Toggle"
              className="news-icon"
            />
          </button>
          <ul className={`submenu ${isPromotionOpen ? 'submenu-open' : ''}`}>
              <li>
                <Link
                  className={`submenu-item ${activeIndex === 10 ? 'active' : 'inactive'}`}
                  onClick={() => onTabClick(10)}
                >
                  Coupon List
                </Link>
              </li>
              <li>
                <Link
                  className={`submenu-item ${activeIndex === 13? 'active' : 'inactive'}`}
                  onClick={() => onTabClick(13)}
                >
                  Generate Coupon
                </Link>
              </li>
            </ul>
        </li>
      
{/* Gamification */}

<li>
          <button
            className={`menu-item ${(activeIndex === 14 ||activeIndex === 15 )? 'active' : 'inactive'}`}
            onClick={() => {
              setIsGamificationOpen(!isGamificationOpen);
              onTabClick(14);
            }}
          >
            <img src={futurelogo} alt="News Icon" className="icon" />
            Gamification
            <img
              src={isGamificationOpen ? upArrow : downArrow}
              alt="Toggle"
              className="news-icon"
            />
          </button>
          <ul className={`submenu ${isGamificationOpen ? 'submenu-open' : ''}`}>
              <li>
                <Link
                  className={`submenu-item ${activeIndex === 14 ? 'active' : 'inactive'}`}
                  onClick={() => onTabClick(14)}
                >
                  Reward List
                </Link>
              </li>
              <li>
                <Link
                  className={`submenu-item ${activeIndex === 15? 'active' : 'inactive'}`}
                  onClick={() => onTabClick(15)}
                >
                 Generate Reward
                </Link>
              </li>
            </ul>
        </li>
{/* feed back */}

        <li>
          <Link
            className={`menu-item ${activeIndex === 16 ? 'active' : 'inactive'}`}
            onClick={() => onTabClick(16)}
          >
            <img src={feed} alt="Add Admin Icon" className="icon" />
            Feedback
          </Link>
        </li>
        {/* Banner */}
        <li>
          <Link
            className={`menu-item ${activeIndex === 17 ? 'active' : 'inactive'}`}
            onClick={() => onTabClick(17)}
          >
            <img src={cash} alt="Subscription Icon" className="icon" />
            Banner
          </Link>
        </li>
{/* logout */}
        <li>
          <button
            className={`menu-item ${activeIndex === 18 ? 'active' : 'inactive'}`}
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
