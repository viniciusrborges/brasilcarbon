import React, { useEffect, useState, useCallback } from "react";

// Functions
import { cpfCnpjFormater } from "../../utils/Utils";
import { alertaErro } from "../../functions/functions";

// Componentes
import ModalAuth from "./ModalAuth";
import Loader from "../../components/Loader";

//Chamada da api
import { LerCertificateSafeId } from "../../utils/RequestOvvoSafeIdAPI/ControllerLerCertificate";

// Styles
import UserLogo from "../../assets/img/UserLogo.svg";
import "./styles.scss";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const [pfpj, setPfpj] = useState("");
  const [name, setName] = useState("");

  const renderLerCertificateSafeId = useCallback(async (objCertificate) => {
    let cpfCnpj = cpfCnpjFormater(objCertificate.CpfCnpj);
    let nomeRazaoSocial = objCertificate.NomeRazaoSocial;
    if (cpfCnpj && nomeRazaoSocial) {
      setPfpj(cpfCnpj);
      const _names = objCertificate.NomeRazaoSocial.split(" ");
      if (_names.length > 2) {
        let _name = _names[0];
        for (var i = 1; i < _names.length; i++) {
          if (i === _names.length - 1) _name = _name + " " + _names[i];
          else _name = _name + " " + _names[i].charAt(0);
        }
        setName(_name);
      } else {
        setName(objCertificate.NomeRazaoSocial);
      }
    }
    setIsLoading(false);
  }, []);

  const lerCertificateSafeId = useCallback(
    async (accessToken) => {
      LerCertificateSafeId(accessToken)
        .then((res) => {
          if (res.data.status !== "Erro") {
            (async () => await renderLerCertificateSafeId(res.data))();
          } else {
            alertaErro({
              status: "Erro",
              message: "Erro na autenticação com o SafeID.",
            });
            setIsLoading(false);
          }
        })
        .catch((err) => {
          setIsLoading(false);
        });
    },
    [renderLerCertificateSafeId]
  );

  useEffect(() => {
    window.addEventListener("message", (ev) => {
      if (typeof ev.data !== "object") return;
      if (!ev.data.type) return;
      if (ev.data.type !== "iframe") return;
      if (!ev.data.access_token) return;
      (async () => await lerCertificateSafeId(ev.data.access_token))();
      window.$("#modalAuth").modal("hide");
      setIsLoading(true);
    });
  }, [lerCertificateSafeId]);

  return (
    <div id="brasilcarbon">
      <div className="container-fluid">
        {name !== "" && pfpj !== "" ? (
          <div className="row bg-light shadow">
            <div className="col-12" id="Secao-titular">
              <div className="row secao-titular">
                <div className="col-3 col-md-3 col-lg-2 titular-logo">
                  <img src={UserLogo} alt="Imagem de um boneco" />
                </div>

                <div className="col-9 col-md-9 col-lg-6 titular-dados">
                  <h5>{name ? name : "NOME"}</h5>
                  <p>{pfpj ? pfpj : "CPF"}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-sm secao-container-home">
              <button
                title="SafeID authentication"
                className="btn btn-login"
                onClick={() => {
                  window.$("#modalAuth").modal("show");
                }}
              >
                <b>LOGIN SAFEID</b>
              </button>
            </div>
          </div>
        )}
      </div>

      <div
        className="modal fade"
        id="modalAuth"
        data-bs-backdrop="static"
        role="dialog"
      >
        <ModalAuth />
      </div>

      {isLoading ? (
        <div className="container">
          <div className="row">
            <div className="d-flex justify-content-center">
              <Loader />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <footer className="footer-copyright footer-copyright-home">
        <p> Ovvo Microssoluções © Copyright 2024 </p>
      </footer>
    </div>
  );
}
