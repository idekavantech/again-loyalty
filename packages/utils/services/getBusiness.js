import { BUSINESS_LIGHT_BY_SITE_DOMAIN_API_V2 } from "../api";
import request from "../request";

export const getBusiness = async (subDomain) => {
  try {
    const {
      response: {
        data,
        meta: { status_code },
      },
    } = await request(BUSINESS_LIGHT_BY_SITE_DOMAIN_API_V2(subDomain));
    if (status_code === 200) {
      return data;
    }
  } catch (e) {
    console.log(e);
  }
  return null;
};
