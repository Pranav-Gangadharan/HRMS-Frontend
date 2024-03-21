import { Link } from "react-router-dom";
import Logo from "../../assets/blackStone.png";
import "./sidebar.css";
import { useSelector } from "react-redux";

// icons
import { MdSpaceDashboard } from "react-icons/md";
import { MdWork } from "react-icons/md";
import { MdGroups } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";
import { LuRocket } from "react-icons/lu";
import { FaChartPie } from "react-icons/fa6";
import { FaMoneyBillWave } from "react-icons/fa";

const Sidebar = () => {
  const user = useSelector((state) => state.user?.user?.user);

  const menuItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: <MdSpaceDashboard className="icon" />,
    },
    { path: "/employee", label: "Employee", icon: <MdWork className="icon" /> },
    { path: "/client", label: "Client", icon: <MdGroups className="icon" /> },
    {
      path: "/attendance",
      label: "Attendance",
      icon: <GiNotebook className="icon" />,
    },
    {
      path: "/projects",
      label: "Projects",
      icon: <LuRocket className="icon" />,
    },
    {
      path: "/reports",
      label: "Reports",
      icon: <FaChartPie className="icon" />,
    },
    {
      path: "/payroll",
      label: "Payroll",
      icon: <FaMoneyBillWave className="icon" />,
    },
  ];

  const renderMenuItems = () => {
    if (user.role === "employee") {
      // Render only employee, attendance, and payroll for employees
      return menuItems
        .filter((item) =>
          ["Employee", "Attendance", "Projects", "Payroll"].includes(item.label)
        )
        .map((item, index) => (
          <li className="listItem" key={index}>
            <Link to={item.path} className="menuLink flex">
              {item.icon}
              <span className="smallText">{item.label}</span>
            </Link>
          </li>
        ));
    } else {
      // Render all menu items for other roles
      return menuItems.map((item, index) => (
        <li className="listItem" key={index}>
          <Link to={item.path} className="menuLink flex">
            {item.icon}
            <span className="smallText">{item.label}</span>
          </Link>
        </li>
      ));
    }
  };

  return (
    <div className="sideBar grid">
      <div className="logoDiv flex">
        <img src={Logo} alt="BlackStone" />
      </div>

      <div className="menuDiv">
        <ul className="menuLists grid">{renderMenuItems()}</ul>
      </div>
    </div>
  );
};

export default Sidebar;
