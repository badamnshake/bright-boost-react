import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./api/axios";

export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authData, setAuthData] = useState({
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
  });
  const [loading, setLoading] = useState(true);

  const setAuth = (newToken, newRole) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("role", newRole);
    setAuthData({
      token: newToken,
      role: newRole,
    });
  };

  const logout = () => {
    setLoading(true);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    // Set the state asynchronously after a brief delay
    setTimeout(() => {
      setAuthData({
        token: null,
        role: null,
      });
      setLoading(false);
      navigate("/login");
    }, 0);
  };

  useEffect(() => {
    const { token, role } = authData;

    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      setLoading(false);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      setLoading(false);
    }
  }, [authData]);

  const contextValue = useMemo(
    () => ({
      token: authData.token,
      role: authData.role,
      setAuth,
      logout,
      loading,
    }),
    [authData, loading]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
