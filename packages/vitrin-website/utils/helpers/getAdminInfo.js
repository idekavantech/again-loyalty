import axios from "axios";
import { USER_API } from "../apis";
import request from "../request";

export const getAdminInfo = async ({ token }) => {
  try {
    if (token) {
      axios.defaults.headers.common.Authorization = token.startsWith("eyJ")
        ? `Bearer ${token}`
        : `Token ${token}`;
      const { response: { data, meta: { status_code } } = {} } = await request(
        USER_API,
        {},
        "GET"
      );
      if (status_code === 200) {
        return {
          ...data,
          token,
        };
      } else {
        delete axios.defaults.headers.common.Authorization;
      }
    }
  } catch (e) {
    console.log(e);
  }
  return null;
};
