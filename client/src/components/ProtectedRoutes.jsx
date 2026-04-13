// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Show loading while checking token
  if (loading) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(145deg, #f5c842, #e8a020)",
        flexDirection: "column",
        gap: "16px",
        fontFamily: "Segoe UI, sans-serif",
      }}>
        <div style={{
          width: "48px", height: "48px",
          border: "5px solid rgba(255,255,255,0.4)",
          borderTop: "5px solid #fff",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }} />
        <p style={{ color: "#fff", fontSize: "16px", fontWeight: "600", margin: 0 }}>
          🐔 Loading PoultryBriz...
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Not logged in → go to login
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
