import React, { createContext, useState, useContext, useEffect } from "react";
import api, { setAccessToken } from "../lib/axios";

const AuthContext = createContext();

export const UseAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (!token) {
      setLoading(false);
      return;
    }

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse saved user:", error);
      }
    }

    try {
      const response = await api.get("/auth/me");
      if (response.data.success) {
        const user = response.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        setUser(response.data.user);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Auth check failed: ", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      if (response.data.success) {
        const { user, accessToken } = response.data;
        // localStorage.setItem("token", token);
        setAccessToken(accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        return { success: true };
      }
      return { success: false, message: response.data.message };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Login failed" };
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await api.post("/auth/register", { username, email, password });
      if (response.data.success) {
        const { user, accessToken } = response.data;
        // localStorage.setItem("token", token);
        setAccessToken(accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        return { success: true };
      }
      return { success: false, message: response.data.message };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Registration failed" };
    }
  };

  const logout = async () => {
    try {
      const response = await api.post("/auth/logout");
      if (response.data.success) {
        setUser(null);
        setAccessToken(null);
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Logout Failed:", error);
      return { success: false, message: error.response?.data?.message || "Registration failed" };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
