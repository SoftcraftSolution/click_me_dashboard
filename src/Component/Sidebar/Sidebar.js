import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import Cookies from 'js-cookie';
import company from '../../assets/company.png';
import banner from '../../assets/banner.png';
import homeimg from '../../assets/home.png';
import userimg from '../../assets/user.png';
import gamification from '../../assets/gamification.png';
import promotion from '../../assets/promotion.png';
import payment from '../../assets/payment.png';
import downArrow from '../../assets/downarrow.png';
import upArrow from '../../assets/uparrow.png';
import cash from '../../assets/cash.png';
import item from '../../assets/itemms.png';
import order from '../../assets/order.png';
import feed from '../../assets/feed.png';
import logoutadmin from '../../assets/logoutadmin.png';
import futurelogo from '../../assets/futurelogo.png';

import { Feedback } from '@mui/icons-material';

const Sidebar = ({ activeIndex, onTabClick }) => {
  const navigate = useNavigate();
  const [isUserListOpen, setIsUserListOpen] = useState(false);
  const [isExtraItemOpen, setIsExtraItemOpen] = useState(false);
  const [isCustmizeItemOpen, setIsCustomizeItemOpen] = useState(false);
  const [isPromotionOpen, setIsPromotionOpen] = useState(false);
  const [isEmployeeListOpen, setIsEmployeeListOpen] = useState(false);
  const [isGamificationOpen, setIsGamificationOpen] = useState(false);
  const [isOrderListOpen, setIsOrderListOpen] = useState(false);
  const [isItemOpen, setIsItemOpen] = useState(false);  // New state for Future Price

  const toggleUserList = () => {
    setIsUserListOpen(!isUserListOpen);
  };

  const toggleCustomizeItem = () => {
    setIsCustomizeItemOpen(!isCustmizeItemOpen);
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
            <img src={company} alt="User List Icon" className="icon" />
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
            <img src={userimg} alt="Verify Icon" className="icon" />
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
            <img src={item} alt="Future Price Icon" className="icon" />
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
        {/* extra item secttion */}
        <li>
          <button
            className={`menu-item ${(activeIndex === 19 || activeIndex === 20 ) ? 'active' : 'inactive'}`}
            onClick={() => {
              setIsExtraItemOpen(!isExtraItemOpen); // Toggle future state
              onTabClick(19);
            }}
          >
            <img src={item} alt="Future Price Icon" className="icon" />
            Extra Item
            <img
              src={isExtraItemOpen? upArrow : downArrow}
              alt="Toggle"
              className="news-icon"
            />
          </button>
          <ul className={`submenu ${isExtraItemOpen ? 'submenu-open' : ''}`}>
              <li>
                <Link
                  className={`submenu-item ${activeIndex === 19 ? 'active' : 'inactive'}`}
                  onClick={() => onTabClick(19)}
                >
                  Extra Item List
                </Link>
              </li>
              <li>
                <Link
                  className={`submenu-item ${activeIndex === 20 ? 'active' : 'inactive'}`}
                  onClick={() => onTabClick(20)}
                >
                  Add New Extra Item
                </Link>
              </li>
              
            </ul>
        </li>
 {/* Order list */}
        <li>
          <button
            className={`menu-item ${(activeIndex === 18 ||activeIndex === 8 )? 'active' : 'inactive'}`}
            onClick={() => {
              setIsOrderListOpen(!isOrderListOpen)
              onTabClick(18);
            }}>
            <img src={order} alt="News Icon" className="icon" />
            Order List
            <img
              src={isOrderListOpen ? upArrow : downArrow}
              alt="Toggle"
              className="news-icon"
            />
          </button>
          <ul className={`submenu ${isOrderListOpen ? 'submenu-open' : ''}`}>
              <li>
                <Link
                  className={`submenu-item ${activeIndex === 18 ? 'active' : 'inactive'}`}
                  onClick={() => onTabClick(18)}
                >
                  Current Order List
                </Link>
              </li>
              {/* <li>
                <Link
                  className={`submenu-item ${activeIndex === 8? 'active' : 'inactive'}`}
                  onClick={() => onTabClick(8)}
                >
                  Order History
                </Link>
              </li> */}
            </ul>
        </li>
   {/* Customize item */}

        <li>
          <button
            className={`menu-item ${(activeIndex === 7 ||activeIndex === 8 )? 'active' : 'inactive'}`}
            onClick={() => {
              toggleCustomizeItem();
              onTabClick(7);
            }}
          >
            <img src={order} alt="News Icon" className="icon" />
            Customize Item
            <img
              src={isCustmizeItemOpen ? upArrow : downArrow}
              alt="Toggle"
              className="news-icon"
            />
          </button>
          <ul className={`submenu ${isCustmizeItemOpen ? 'submenu-open' : ''}`}>
              <li>
                <Link
                  className={`submenu-item ${activeIndex === 7 ? 'active' : 'inactive'}`}
                  onClick={() => onTabClick(7)}
                >
                  Add Customize Item
                </Link>
              </li>
              <li>
                <Link
                  className={`submenu-item ${activeIndex === 8? 'active' : 'inactive'}`}
                  onClick={() => onTabClick(8)}
                >
                  Customize Item List
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
            <img src={payment} alt="Logout Icon" className="icon" />
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
            <img src={promotion} alt="News Icon" className="icon" />
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
            <img src={gamification} alt="News Icon" className="icon" />
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
            <img src={banner} alt="Subscription Icon" className="icon" />
            Banner
          </Link>
        </li>
{/* logout */}
        <li>
          <button
            className={`menu-item ${activeIndex === 18 ? 'active' : 'inactive'}`}
            onClick={() => {
              if (window.confirm("Are you sure you want to log out?")) {
                Cookies.remove('email'); // Clear the email cookie
                navigate('/'); // Navigate to the login page
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
