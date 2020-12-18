import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_BASEURL;
const authContext = createContext();

const config = {
  baseURL: `${API}`,
  withCredentials: true,
};

// This hook provides the state to the child components.
function useProvideAuth() {
  const [user, setUser] = useState(false);

  const logout = async () => {
    let response = await axios.get(`/auth/logout`, config);
    if (response.status === 200) {
      setUser(false);
    }
  };

  // Check auth on mount and also cleanup on unmount.
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // We send our request with our credentials.
        let response = await axios.get(`/auth/status`, config);
        // We check for an OK status to tell our app that we are, indeed, authorized.
        // Since the server returns 304 when our session hasn't expired or we haven't logged out,
        // we can't use a plain else. We have to check for the specific 401 unauthorized status.
        // IMPORTANT: Someone could very easily spoof this by setting user to true from the client!
        // But, then again, they could spoof it anyhow by modifying the code conditions in components.
        // More importantly, it wouldn't work for them as they still need authentication.
        if (response.status === 200) {
          setUser(true);
        } else if (response.status === 401) {
          setUser(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkAuth();

    return () => checkAuth();
  }, []);

  // Return the user state and auth methods
  return {
    user,
    logout,
  };
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};
