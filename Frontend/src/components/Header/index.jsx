import React, { useEffect, useState } from "react";

// Styles
import OvvoLogo from "../../assets/img/LogoOvvo.png";

import "./styles.scss";

export default function Header() {
  const [pageName, setPageName] = useState("authentication");

  useEffect(() => {
    let url = window.location.pathname.toString();
    if (url.includes("brasilcarbon/authentication")) {
      setPageName("authentication");
    } else {
      setPageName("home");
    }
  }, [setPageName]);

  return (
    <div className="container-fluid bg-success">
      {pageName === "home" ? (
        <>
          <div className="row">
            <div className="col-12 container-header_logo">
              <header className="container-logo">
                <img src={OvvoLogo} alt="Logo da aplicação OVVO" />
              </header>
            </div>
          </div>

          {/* Subtítulo */}
          <div className="row container-subtitulo">
            <div className="col-12 text-center my-2">
              <h1>BRASILCARBON</h1>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
