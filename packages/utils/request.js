import Axios from "axios";
import Cookies from "js-cookie";
import { VITRIN_TOKEN } from "./constants";
import qs from "qs";

export default async function request(
  url,
  data,
  method = "GET",
  headers,
  config = null
) {
  let params = {
    url,
    method,
    data: method !== "GET" ? data : undefined,
    params: method === "GET" ? data : undefined,
    paramsSerializer: (params) => {
      return qs.stringify(params, { indices: false });
    },
    ...config,
  };
  if (headers) {
    params = {
      ...params,
      headers,
    };
  }
  let response = {};
  let status = null;
  await Axios(params)
    .then((res) => {
      const meta = res?.data?.meta || {}
      const status_code = res?.status
      response.data = res?.data?.data || res?.data;
      response.meta = {...meta , status_code}
      response.pagination = res?.data?.pagination;
      status = res?.status;
    })
    .catch((e) => {
      response.meta = e?.response?.data?.meta || {};
      response.meta.status_code = e?.response?.status;
      status = e?.response?.status;
    });

  if (status === 401) {
    delete Axios.defaults.headers.common.Authorization;

    if (typeof localStorage !== "undefined") {
      const isALoggedInUser = !!(
        localStorage.getItem(VITRIN_TOKEN) || Cookies.get(VITRIN_TOKEN)
      );
      if (isALoggedInUser) {
        Cookies.remove(VITRIN_TOKEN);
        localStorage.removeItem(VITRIN_TOKEN);
      }
      const { pathname } = window.location;
      const pathnameParts = pathname.split("/");
      const lastPathnamePart = pathnameParts[pathnameParts.length - 1];

      const shouldRedirect =
        lastPathnamePart !== "s" && lastPathnamePart !== "menu";
      if (shouldRedirect && isALoggedInUser) {
        window.location.replace("/login");
      }
    }
  }
  return {
    response,
    status,
  };
}
