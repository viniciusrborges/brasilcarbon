import React, { useContext, useState, useEffect } from "react";

import { AuthContext } from "../globals/AuthContext";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Páginas
import Home from "../pages/Home";
import Authentication from "../pages/Authentication";

// Componentes
import Header from "../components/Header";

export default function Router() {
  const { setQueryResponseAuthentication } = useContext(AuthContext);
  const [queryAuth, setQueryAuth] = useState(
    window.location.href.split("brasilcarbon/")[1]
  );

  useEffect(() => {
    if (queryAuth) {
      if (queryAuth.includes("authentication?")) {
        setQueryResponseAuthentication(queryAuth);
      }
    }
  }, [queryAuth, setQueryResponseAuthentication]);

  return (
    <main>
      <div id="raiz"></div>
      <Header />

      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Navigate to="/brasilcarbon" replace />} />
            <Route path="/brasilcarbon" element={<Home />} />
            <Route
              path="/brasilcarbon/authentication"
              element={<Authentication />}
            />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </main>
  );
}
