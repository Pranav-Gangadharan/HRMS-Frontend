import "./navbar.css";

import { BiSearchAlt } from "react-icons/bi";
import { TbMessageCircle } from "react-icons/tb";
import { MdOutlineNotifications } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Logout } from "../../redux/userSlice";
//Get Image ==>

const Navbar = () => {
  const user = useSelector((state) => state.user?.user?.user);
  const dispatch = useDispatch();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Add logout functionality here
    dispatch(Logout());
  };

  const handleProfile = () => {};

  return (
    <div className="topSection">
      <div className="headerSection flex">
        <div className="title">
          <h1>Dashboard</h1>
          <p>Hello {user.username}, Welcome back!</p>
        </div>

        <div className="searchBar flex">
          <input type="text" placeholder="Search Dashboard" />
          <BiSearchAlt className="icon" />
        </div>

        <div className="adminDiv flex">
          <TbMessageCircle className="icon" />
          <MdOutlineNotifications className="icon" />
          <div className="dropdown">
            <div className="adminImage" onClick={toggleDropdown}>
              <img src="DP" alt="DP" />
            </div>
            {isDropdownOpen && (
              <div className="dropdownContent">
                <button onClick={handleProfile}>Profile</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
