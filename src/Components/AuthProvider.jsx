import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log("User:", user);
  
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      try {
        const userData = JSON.parse(atob(jwt.split(".")[1]));
        setUser(userData);
      } catch (error) {
        console.error("Invalid jwt", error);
        localStorage.removeItem("jwt");
        setUser(null);
      }
    }
  }, []);

  const loginUser = (jwt) => {
    localStorage.setItem("jwt", jwt);
    try {
      const userData = JSON.parse(atob(jwt.split(".")[1]));
      console.log("User data:", userData);
      
      setUser(userData);
      navigate("/");
    } catch (error) {
      console.error("Invalid jwt", error);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("jwt");
    setUser(null);
    navigate("/login");
  };

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("jwt");
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const httpLink = new HttpLink({
    uri: import.meta.env.VITE_APP_SERVER_GRAPHQL_URL,
  });

  const client = new ApolloClient({
    link: from([authLink, httpLink]),
    cache: new InMemoryCache(),
  });

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </AuthContext.Provider>
  );
};
