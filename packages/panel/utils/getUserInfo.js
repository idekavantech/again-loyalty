import Cookies from "js-cookie";
import Axios from "axios";
import {
  IS_ADMIN_BY_SITE_DOMAIN_API,
  SELF_MEMBERSHIP_API,
} from "@saas/utils/api";
import request from "@saas/utils/request";
import { VITRIN_TOKEN } from "@saas/utils/constants";

export const getUserInfo = async (siteDomain, token) => {
  try {
    if (token) {
      Axios.defaults.headers.common.Authorization = token.startsWith("eyJ")
        ? `Bearer ${token}`
        : `Token ${token}`;
      const [
        { response: { data, meta: { status_code } } = {} },
        { response: { data: { is_admin, is_staff } = {} } = {} },
      ] = await Promise.all([
        request(
          SELF_MEMBERSHIP_API,
          { business_site_domain: siteDomain, labels: [] },
          "POST"
        ),
        request(IS_ADMIN_BY_SITE_DOMAIN_API(siteDomain)),
      ]);

      if (status_code === 201) {
        if (token) {
          Cookies.set(VITRIN_TOKEN, token, { expires: 365 });
        }

        return {
          walletCredit: data.wallet_credit,
          giftCredit: data.gift_credit,
          inviteCode: data.invite_link_id,
          ...data.user,
          token,
          isAdmin: is_admin,
          crm_membership_id: data.id,
          isStaff : is_staff,
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
