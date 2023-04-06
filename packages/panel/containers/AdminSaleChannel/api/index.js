import request from "@saas/utils/request";
import { getBaseUrl } from "@saas/utils/helpers/getBaseUrl";
export const BASE_URL = getBaseUrl();

// Api to get channels
export const getSaleChannels = async (slug) => {
  const {
    response: { data },
  } = await request(
    `${BASE_URL}businesses/${slug}/sales_channels/`,
    null,
    "GET"
  );
  if (data) {
    return data;
  }
};

// Api to patch
export const patchSaleChannels = async (slug, dt) => {
  await request(
    `${BASE_URL}businesses/${slug}/sales_channels/${dt}/`,
    {
      status: "inactive",
    },
    "PATCH"
  );
  if (status) {
    return status;
  }
};

// Api to create channel
export const createSaleChannels = async (slug, channel) => {
  const {
    response: { data },
  } = await request(
    `${BASE_URL}businesses/${slug}/sales_channels/`,
    channel,
    "POST"
  );
  if (data) {
    return data;
  }
};
