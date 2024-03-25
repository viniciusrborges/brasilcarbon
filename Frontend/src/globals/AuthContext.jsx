import React, { createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = (props) => {
  const [accesses, setAccesses] = useState([]);
  const [holder, setHolder] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [autenticated, setAutenticated] = useState(false);
  const [configApp, setConfigApp] = useState(undefined);
  const [queryResponseAuthentication, setQueryResponseAuthentication] =
    useState("");
  const [closeModalAuth, setCloseModalAuth] = useState(false);
  const oidRoot = "1.3.6.1.4.1.12129.9";

  return (
    <AuthContext.Provider
      value={{
        accesses,
        setAccesses,
        oidRoot,
        holder,
        setHolder,
        accessToken,
        setAccessToken,
        autenticated,
        setAutenticated,
        configApp,
        setConfigApp,
        queryResponseAuthentication,
        setQueryResponseAuthentication,
        closeModalAuth,
        setCloseModalAuth,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
