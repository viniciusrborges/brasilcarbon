import { DEFAULT_API_URLS_OVVO_SAFEID } from "../enum";
import * as enviroment from "../enviroment";
import axios from "axios";

const urlApi = DEFAULT_API_URLS_OVVO_SAFEID[enviroment.getEnviroment()];

export function LerAccessTokenSafeId(objResponseAuth) {
  return new Promise((resolve, reject) => {
    axios
      .post(urlApi + "/LerAccessTokenSafeId/", objResponseAuth, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}
