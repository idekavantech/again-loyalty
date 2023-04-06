import { BUSINESS_REDIRECTS_MAP_API } from "../api";
import request from "../request";

export const getBusinessRedirectsMapFunc = async (site_domain) => {
  try {
    const { response: { data, meta: { status_code } } = {} } = await request(
      BUSINESS_REDIRECTS_MAP_API(site_domain)
    );
    if (status_code === 200) {
      return data.redirects_map;
    }
  } catch (e) {
    console.log(e);
  }
};
