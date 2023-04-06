import Cookies from "js-cookie";
import Axios from "axios";
import { IS_ADMIN_BY_SITE_DOMAIN_API, SELF_MEMBERSHIP_API } from "../api";
import request from "../request";
import { setCookie } from "nookies";
import { getCookie } from "../helpers/getCookie";
import { VITRIN_TOKEN } from "../constants";
import { removeParamsFromUrl } from "../helpers/removeParamsFromUrl";

export const getUserInfo = async (ctx, siteDomain, isServer) => {
  let token = null;
  if (isServer) {
    const {
      req: {
        headers: { cookie },
      },
    } = ctx;
    token = ctx.query.token || getCookie(VITRIN_TOKEN, cookie);
  } else {
    token = Cookies.get(VITRIN_TOKEN);
  }

  try {
    if (token) {
      Axios.defaults.headers.common.Authorization = token.startsWith("eyJ")
        ? `Bearer ${token}`
        : `Token ${token}`;

      const [
        { response: { data, meta: { status_code } } = {} },
        { response: { data: { is_admin } = {} } = {} },
      ] = await Promise.all([
        request(
          SELF_MEMBERSHIP_API,
          { business_site_domain: siteDomain, labels: [] },
          "POST"
        ),
        request(IS_ADMIN_BY_SITE_DOMAIN_API(siteDomain)),
      ]);

      if (status_code === 201) {
        if (ctx.query.token) {
          setCookie(ctx, VITRIN_TOKEN, token, {
            maxAge: 365 * 24 * 60 * 60 * 1000,
            path: "/",
          });
          removeParamsFromUrl("token", ctx);
        }

        return {
          walletCredit: data.wallet_credit,
          giftCredit: data.gift_credit,
          inviteCode: data.invite_link_id,
          ...data.user,
          token,
          isAdmin: is_admin,
          crm_membership_id: data.id,
        };
      } else {
        delete Axios.defaults.headers.common.Authorization;
      }
    }
  } catch (e) {
    console.log(e);
  }
  return null;
};
