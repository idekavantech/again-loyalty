import { BACKEND_API_URL } from "../constants";

export function getBaseUrl(version = 1 /* For custom version */) {
  // replace default v1 with new version
  return BACKEND_API_URL.replace(1, version);
}
