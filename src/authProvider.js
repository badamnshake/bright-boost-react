import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
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
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setAuthData({
      token: null,
      role: null,
    });
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
