import React, { useEffect, useState, useCallback, useContext } from "react";

import { LerAccessTokenSafeId } from "../../utils/RequestOvvoSafeIdAPI/ControllerLerAccessTokenSafeId";
import { alertaErro } from "../../functions/functions";
import Loader from "../../components/Loader";

import { AuthContext } from "../../globals/AuthContext";

export default function Authentication() {
  const { queryResponseAuthentication, setQueryResponseAuthentication } =
    useContext(AuthContext);

  const [isLoadingAccessToken, setIsLoadingAccessToken] = useState(false);
  const [objResponseAuth, setObjResponseAuth] = useState("");

  const lerAccessTokenSafeId = useCallback(async () => {
    let _objResponseAuth = JSON.stringify(
      btoa(JSON.stringify(objResponseAuth))
    );
    LerAccessTokenSafeId(_objResponseAuth)
      .then((res) => {
        if (res.data.status !== "Erro") {
          window.parent.postMessage(
            { type: "iframe", access_token: res.data.access_token },
            "*"
          );
        } else {
          alertaErro(res.data);
        }
      })
      .catch((err) => {});
  }, [objResponseAuth]);

  useEffect(() => {
    let _queryResponseAuth = [];
    if (queryResponseAuthentication && queryResponseAuthentication !== "") {
      _queryResponseAuth = queryResponseAuthentication.split("?");
      if (_queryResponseAuth.length > 1) {
        let _query = _queryResponseAuth[1]
          .replace("code=", "")
          .replace("state=", "")
          .split("&");
        let _objResponseAuth = {
          code: _query[0],
          state: _query[1],
          nomeApp: "brasilcarbon",
        };

        setObjResponseAuth(_objResponseAuth);
        setQueryResponseAuthentication(undefined);
      }
    }
  }, [queryResponseAuthentication, setQueryResponseAuthentication]);

  useEffect(() => {
    if (objResponseAuth && objResponseAuth !== "") {
      if (!isLoadingAccessToken) {
        setIsLoadingAccessToken(true);
        (async () => await lerAccessTokenSafeId())();
      }
    }
  }, [isLoadingAccessToken, lerAccessTokenSafeId, objResponseAuth]);

  return (
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-center">
          <Loader />
        </div>
      </div>
    </div>
  );
}
