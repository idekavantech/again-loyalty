import Axios from "axios";
import { VITRIN_TOKEN } from "./constants";
import Cookies from "js-cookie";

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
      response.data = res?.data?.data;
      response.meta = res?.data?.meta;
      response.pagination = res?.data?.pagination;
      status = res?.status;
    })
    .catch((e) => {
      response.meta = e?.response?.data?.meta || {};
      response.meta.status_code = e?.response?.status;
      status = e?.response?.status;
    });
  if (status === 401) {
    Cookies.remove(VITRIN_TOKEN);
    delete Axios.defaults.headers.common.Authorization;
  }
  return { response, status };
}
