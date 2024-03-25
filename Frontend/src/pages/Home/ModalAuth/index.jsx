import React from "react";

// Styles
import "./styles.scss";

export default function ModalAuth() {
  const uriQrCode =
    "https://pscsafeweb.safewebpss.com.br/Service/Microservice/OAuth/api/v0/oauth/authorize?response_type=code&client_id=ovvo-brasilcarbon-cjpjvsra&redirect_uri=https%3a%2f%2fwww.ovvo.com.br%2fbrasilcarbon%2fauthentication%2f&state=7O50MVFL-JB9R162KN04QY3HW62AX-5UDC2ET004A1P85ZM1IS232&lifetime=3600&scope=signature_session&code_challenge=vgTjAnjNyLHluZJVzKCHnQ0Mm7hux627yrVd4mLAWVE&code_challenge_method=S256";

  return (
    <>
      <div className="modal-dialog modal-dialog-scrollable modal-lg">
        <div className="modal-content">
          <div className="modal-header shadow">
            <h3 className="mt-2">SafeID authentication</h3>
          </div>

          <div className="modal-body">
            <div style={{ padding: 20 }}>
              <div className="section-iframe">
                <iframe
                  className="custom-iframe-style"
                  src={uriQrCode}
                  title="SafeIdAuth"
                />
              </div>

              {/* Botões */}
              <div className="row">
                <div className=" btn-close-auth">
                  <button
                    title="Close"
                    className="btn btn-secondary"
                    type="reset"
                    data-bs-dismiss="modal"
                  >
                    <b>CLOSE</b>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
