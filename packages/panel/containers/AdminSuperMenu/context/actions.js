import { startLoading, stopLoading } from "@saas/stores/global/actions";
import {
  getPosLabels,
  getProductsBusiness,
  createPosLabels,
  deletePosLabel,
  patchPosLabels,
  deleteDealInLabel,
  fetchDevices,
} from "../api";
import {
  set,
  setProducts,
  loading,
  removeMenu,
  loadingSmall,
  setPickModal,
  selectDeal,
  selectMenu,
  setDevices,
  removeDeal,
  editMenu,
  editDeal,
} from "./superMenu";

export const get_pos_labels =
  (businessSlug, selectedDevice) => async (dispatch) => {
    /** showing loading progress */
    dispatch(startLoading());
    const response = await getPosLabels(businessSlug, selectedDevice);

    if (response) {
      dispatch(set(response));
      /** End showing loading progress */
      dispatch(stopLoading());
    }
  };

export const get_deals_by_business = (businessSlug) => async (dispatch) => {
  /** Show loading progress */
  dispatch(loading(true));

  const response = await getProductsBusiness(businessSlug.slug);

  if (response) {
    dispatch(setProducts(response));
    /** End showing loading progress */
    dispatch(loading(false));
  }
};

export const post_created_deal = (label, slug, pos) => async (dispatch) => {
  /** Show loading progress */
  dispatch(loading(true));

  const response = await createPosLabels(label);

  // check that we have id in data
  // so we are getting the success response
  if (response?.id) {
    dispatch(get_pos_labels(slug, pos));
  }
};

export const delete_label = (id, slug, posId) => async (dispatch) => {
  /** Show loading progress */
  dispatch(loadingSmall(true));

  const status = await deletePosLabel(id);

  // check that we have id in data
  // so we are getting the success response
  if (status == 204) {
    dispatch(get_pos_labels(slug, posId));
    // hide remove menu modal
    dispatch(removeMenu(false));
    // delete selected menu
    dispatch(selectMenu(-1));
    // remove small loading
    dispatch(loadingSmall());
    // remove selected deal container
    dispatch(selectDeal(null));
  }
};

export const patch_label = (label, slug, posId) => async (dispatch) => {
  /** Show loading progress */
  dispatch(loadingSmall(true));

  const status = await patchPosLabels(label);

  // check that we have id in data
  // so we are getting the success response
  if (status == 200) {
    dispatch(get_pos_labels(slug, posId));
    // remove small loading
    dispatch(loadingSmall(false));
    // close pick deal modal
    dispatch(setPickModal(false));
    // close edit menu modal
    dispatch(editMenu(false));
    // close remove deal if exist
    dispatch(removeDeal(null));
    // close edit deal if exist
    dispatch(editDeal(null));
    // remove selected deal container
    dispatch(selectDeal(null));
  }
};

export const delete_deal = (id, slug, posId) => async (dispatch) => {
  /** Show loading progress */
  dispatch(loadingSmall(true));

  const status = await deleteDealInLabel(id);

  // check that we have id in data
  // so we are getting the success response
  if (status == 204) {
    dispatch(get_pos_labels(slug, posId));
    // remove small loading
    dispatch(loadingSmall(false));
    // close delete deal modal
    dispatch(selectDeal(null));
  }
};

export const get_pos_devices = (businessSlug) => async (dispatch) => {
  /** Show loading progress */
  dispatch(startLoading());

  const response = await fetchDevices(businessSlug);

  if (response) {
    dispatch(setDevices(response?.data));
    /** End showing loading progress */
    dispatch(stopLoading());
  }
};
