import React from "react";
import "../styles/LayoutStyle.css";
import { adminMenu, userMenu } from "../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) return null; // guard in case user not loaded yet

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-calendar-check",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user._id}`,
      icon: "fa-solid fa-user",
    },
  ];

  const SidebarMenu = user.isAdmin
    ? adminMenu
    : user.isDoctor
    ? doctorMenu
    : userMenu;

  return (
    <div className="main">
      <div className="layout">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="logo">
            <h1>DOC APP</h1>
          </div>
          <hr />
          <div className="menu">
            {SidebarMenu.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <Link
                  to={menu.path}
                  className={`menu-item ${isActive ? "active" : ""}`}
                  key={menu.path}
                >
                  <i className={menu.icon}></i>
                  <span>{menu.name}</span>
                </Link>
              );
            })}
            <div className="menu-item" onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <span>Logout</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="content">
          <div className="header">
            <div
              className="header-content clickable"
              onClick={() => navigate("/notification")}
            >
              <Badge count={user.notification?.length || 0}>
                <i className="fa-solid fa-bell"></i>
              </Badge>
              <Link to="/profile" style={{ marginLeft: "10px" }}>
                {user.name}
              </Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
