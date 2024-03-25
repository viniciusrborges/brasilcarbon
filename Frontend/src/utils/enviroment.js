export function getEnviroment() {
  if (window.location.host.match("localhost")) {
    return "LOCAL";
    // return "PRODUCTION";
  } else if (window.location.host.match("ovvo")) {
    return "PRODUCTION";
  }
}
