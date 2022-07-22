import { useState, useEffect } from "react";
import api from "../utils/api";

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [symbolRelation, setSymbolRelation] = useState(["stock", "AAPL", "D"]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setAuthenticated(true);
    } else {
      api.defaults.headers.Authorization = undefined;
      setAuthenticated(false);
    }
    setLoading(false);
  });

  const handleLogin = async (username, password) => {
    try {
      const response = await api.post("/login", {
        username: username,
        password: password,
      });
      if (response.status == 200) {
        setAuthenticated(true);
        localStorage.setItem("token", response.data);
        return "success";
      }
    } catch (error) {
      console.log(error.response);
      return "failed";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
    api.defaults.headers.Authorization = undefined;
  };
  return {
    symbolRelation,
    setSymbolRelation,
    loading,
    authenticated,
    handleLogin,
    handleLogout,
  };
}
