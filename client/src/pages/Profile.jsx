import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { authAPI } from "../services/api";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await authAPI.getMe();
        // getMe returns { success: true, user: {...} }
        if (res?.success && res?.user) {
          setUser(res.user);
        } else {
          setError("Failed to load profile.");
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError("Cannot connect to server.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-PH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="profile-page">
      <Sidebar />
      <div className="profile-main">

        <div className="profile-breadcrumb">
        
          <span className="profile-bread-current">PROFILE</span>
        </div>

        <div className="profile-content">
          {loading ? (
            <div className="profile-loading">Loading profile...</div>
          ) : error ? (
            <div className="profile-error">{error}</div>
          ) : (
            <>
              {/* Avatar + Name Header */}
              <div className="profile-header">
                <div className="profile-avatar">
                  {user?.name?.charAt(0).toUpperCase() || "?"}
                </div>
                <div className="profile-header-info">
                  <h1 className="profile-name">{user?.name || "—"}</h1>
                  <span className={`profile-role-badge ${user?.role?.toLowerCase() || ""}`}>
                    {user?.role || "—"}
                  </span>
                </div>
              </div>

              {/* Info Cards */}
              <div className="profile-cards">
                <div className="profile-card">
                  <div className="profile-card-body">
                    <span className="profile-card-label">Email Address</span>
                    <span className="profile-card-value">{user?.email || "—"}</span>
                  </div>
                </div>

                <div className="profile-card">
                  <div className="profile-card-body">
                    <span className="profile-card-label">Role</span>
                    <span className="profile-card-value">{user?.role || "—"}</span>
                  </div>
                </div>

                <div className="profile-card">
                  <div className="profile-card-body">
                    <span className="profile-card-label">Farm</span>
                    <span className="profile-card-value">{user?.farm || "—"}</span>
                  </div>
                </div>

                <div className="profile-card">
                  <div className="profile-card-body">
                    <span className="profile-card-label">Member Since</span>
                    <span className="profile-card-value">{formatDate(user?.createdAt)}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}