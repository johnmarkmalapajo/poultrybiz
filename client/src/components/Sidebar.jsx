import { useState } from "react"
import "./Sidebar.css"
import { Link, useLocation, useNavigate } from "react-router-dom"
import sidelogo from "../assets/sidelogo.jpg"
import dashboardIcon from "../assets/dashboard.svg"
import recordsIcon from "../assets/records.svg"
import inventoryIcon from "../assets/inventory.svg"
import salesTransactionsIcon from "../assets/sales-transactions.svg"
import todoIcon from "../assets/todo.svg"
import notificationsIcon from "../assets/notifications.svg"
import settingsIcon from "../assets/settings.svg"
import logoutIcon from "../assets/logout.svg"
import userIcon from "../assets/donlogo.png"
import { useUser } from "../hooks/useUser"

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, canSeeFinancials } = useUser();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <div className="sidebar">
        <p className="company">Egginear Agri-Poultry Solutions</p>
        <div className="logo-title">
          <img src={sidelogo} alt="Poultrybriz Logo" className="sidelogo" />
          <h2>POULTRYBIZ</h2>
        </div>
        <p className="location">Poras, Boac, Marinduque</p>

        <ul>
          <li className={isActive("/dashboard") ? "active" : "secondary"}>
            <Link to="/dashboard" className="nav-link">
              <img src={dashboardIcon} alt="Dashboard" className="menu-icon" />
              Dashboard
            </Link>
          </li>

          <li className={isActive("/records") ? "active" : "secondary"}>
            <Link to="/records" className="nav-link">
              <img src={recordsIcon} alt="Records" className="menu-icon" />
              Records
            </Link>
          </li>

          <li className={isActive("/inventory") ? "active" : "secondary"}>
            <Link to="/inventory" className="nav-link">
              <img src={inventoryIcon} alt="Inventory" className="menu-icon" />
              Inventory
            </Link>
          </li>

          {canSeeFinancials && (
            <li className={isActive("/sales-transactions") ? "active" : "secondary"}>
              <Link to="/sales-transactions" className="nav-link">
                <img src={salesTransactionsIcon} alt="Sales and Transactions" className="menu-icon" />
                Sales & Transactions
              </Link>
            </li>
          )}

          <li className="secondary">
            <img src={todoIcon} alt="To Do" className="menu-icon" />
            To Do
          </li>

          <li className="secondary">
            <img src={notificationsIcon} alt="Notifications" className="menu-icon" />
            Notifications
          </li>

          <li className="divider"></li>

          <li className="secondary">
            <img src={settingsIcon} alt="Settings" className="menu-icon" />
            Settings
          </li>

          {/* ── Logout: opens confirm modal ── */}
          <li className="secondary" onClick={() => setShowLogoutModal(true)} style={{ cursor: "pointer" }}>
            <img src={logoutIcon} alt="Logout" className="menu-icon" />
            Logout
          </li>
        </ul>

        {/* ── User Info — click to go to Profile ── */}
        <div
          className="user"
          onClick={() => navigate("/profile")}
          style={{ cursor: "pointer" }}
          title="View Profile"
        >
          <div className="user-info">
            <img src={userIcon} alt="User" className="user-icon" />
            <div className="user-details">
              <p><strong>{user.name || "Don Mark Dela Cruz"}</strong></p>
              <span>{user.role || "Egginear Poultry Solutions"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Logout Confirmation Modal ── */}
      {showLogoutModal && (
        <div className="logout-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="logout-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="logout-title">Log Out</h3>
            <p className="logout-message">Are you sure you want to log out of your account?</p>
            <div className="logout-actions">
              <button
                className="logout-btn-cancel"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button
                className="logout-btn-confirm"
                onClick={handleLogoutConfirm}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Sidebar