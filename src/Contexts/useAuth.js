import { useState, useEffect } from "react";
import { server } from "../utils/api";

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [symbolRelation, setSymbolRelation] = useState(["stock", "AAPL", "D"]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      server.defaults.headers.Authorization = `Bearer ${token}`;
      setAuthenticated(true);
    } else {
      server.defaults.headers.Authorization = undefined;
      setAuthenticated(false);
    }
    setLoading(false);
  });

  const handleLogin = async (username, password) => {
    try {
      const response = await server.post("/login", {
        username: username,
        password: password,
      });
      if (response.status == 200) {
        setAuthenticated(true);
        localStorage.setItem("token", response.data);
        return { status: "success", message: response.message };
      }
    } catch (error) {
      console.log(error.response);
      return { status: "failed", message: error.response.data };
    }
  };
  const handleSignup = async (username, email, password) => {
    try {
      const response = await server.post("/api/v1/registration", {
        userName: username,
        email: email,
        password: password,
      });
      if (response.status == 200) {
        return { status: "success", message: response.message };
      } else {
        return { status: "failed", message: response.message };
      }
    } catch (error) {
      console.log(error.response);
      return {
        status: "failed",
        message: error.response.data,
      };
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
    server.defaults.headers.Authorization = undefined;
  };
  return {
    symbolRelation,
    setSymbolRelation,
    loading,
    authenticated,
    handleLogin,
    handleSignup,
    handleLogout,
  };
}
