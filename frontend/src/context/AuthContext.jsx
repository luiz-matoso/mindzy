import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    user: null,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const sessionDataString = localStorage.getItem("userSession");

      if (sessionDataString) {
        const sessionData = JSON.parse(sessionDataString);
        setAuthState({
          token: sessionData.token,
          user: sessionData.user,
        });
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${sessionData.token}`;
      }
    } catch (error) {
      console.error("Falha ao carregar a sessão do usuário:", error);
      setAuthState({ token: null, user: null });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (apiResponseData) => {
    const sessionData = {
      token: apiResponseData.token,
      user: {
        username: apiResponseData.username,
        email: apiResponseData.email,
      },
    };

    localStorage.setItem("userSession", JSON.stringify(sessionData));

    setAuthState(sessionData);

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionData.token}`;
  };

  const logout = () => {
    localStorage.removeItem("userSession");
    setAuthState({ token: null, user: null });
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ authState, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
