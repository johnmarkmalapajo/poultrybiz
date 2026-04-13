// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const BASE_URL = "https://poultrybriz-server.onrender.com/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // ── On app load, check if token exists ──
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${BASE_URL}/auth/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((r) => r.json())
        .then((res) => {
          if (res.success) setUser(res.user);
          else localStorage.removeItem("token");
        })
        .catch(() => localStorage.removeItem("token"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // ── Login ──
  const login = async (email, password) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((r) => r.json());

    if (res.success) {
      localStorage.setItem("token", res.token);
      setUser(res.user);
    }
    return res;
  };

  // ── Signup ──
  const signup = async (formData) => {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((r) => r.json());

    if (res.success) {
      localStorage.setItem("token", res.token);
      setUser(res.user);
    }
    return res;
  };

  // ── Logout ──
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
