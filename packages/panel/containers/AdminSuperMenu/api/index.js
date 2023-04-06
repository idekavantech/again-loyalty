import request from "@saas/utils/request";
import { getBaseUrl } from "@saas/utils/helpers/getBaseUrl";
import { BASE_URL_V2 } from "@saas/utils/api";
export const BASE_URL = getBaseUrl();

// Api to get products
export const getPosLabels = async (slug, pos) => {
  const {
    response: { data },
  } = await request(
    `${BASE_URL_V2}pos-labels/light-by-business/?business_slug=${slug}&pos_device=${pos}`,
    null,
    "GET"
  );
  if (data) {
    return data;
  }
};

// Api to get deals
export const getProductsBusiness = async (slug) => {
  const {
    response: { data },
  } = await request(
    `${BASE_URL}deals/by_business/?business_slug=${slug}&page_size=1000`,
    null,
    "GET"
  );
  if (data) {
    return data;
  }
};

// Api to post created labels
export const createPosLabels = async (label) => {
  const {
    response: { data },
  } = await request(`${BASE_URL_V2}pos-labels/`, label, "POST");
  if (data) {
    return data;
  }
};

// Api to delete a label by id
export const deletePosLabel = async (id) => {
  const { status } = await request(
    `${BASE_URL_V2}pos-labels/${id}`,
    null,
    "DELETE"
  );
  if (status) {
    return status;
  }
};

// Api to patch a label cell deal list
export const patchPosLabels = async (label) => {
  const { status } = await request(
    `${BASE_URL_V2}pos-labels/${label?.id}`,
    label,
    "PATCH"
  );
  if (status) {
    return status;
  }
};

// Api to delete a deal in label
export const deleteDealInLabel = async (id) => {
  const { status } = await request(
    `${BASE_URL}resources/${id}`,
    null,
    "DELETE"
  );
  if (status) {
    return status;
  }
};

// Api to get devices
export const fetchDevices = async (slug) => {
  const { response } = await request(
    `${BASE_URL}pos_devices/by_business/?business_slug=${slug}`,
    null,
    "GET"
  );
  if (response) {
    return response;
  }
};
