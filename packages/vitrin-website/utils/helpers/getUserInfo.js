import axios from "axios";
import request from "../request";
import Cookies from "js-cookie";
import { VITRIN_TOKEN } from "../constants";
import { USER_API } from "../apis";

export const getUserInfo = async (token) => {
  try {
    if (token) {
      axios.defaults.headers.common.Authorization = token.startsWith("eyJ")
        ? `Bearer ${token}`
        : `Token ${token}`;
      const {
        response: {
          data,
          meta: { status_code },
        },
      } = await request(USER_API);
      if (status_code === 200) {
        Cookies.set(VITRIN_TOKEN, token, { expires: 365 });

        return { ...data, token };
      } else {
        delete axios.defaults.headers.common.Authorization;
      }
    }
  } catch (e) {
    console.log(e);
  }
};
