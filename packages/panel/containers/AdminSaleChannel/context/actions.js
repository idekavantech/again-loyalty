import {
    getSaleChannels,
    createSaleChannels,
    patchSaleChannels
} from "../api";
import {
    set,
    loading,
} from "./saleChannels";

export const get_sale_channels = businessSlug => async dispatch => {

    /** Start showing loading progress */
    dispatch(loading(true));

    const response = await getSaleChannels(businessSlug);

    if (response) {
        dispatch(set(response));
        /** End showing loading progress */
        dispatch(loading(false));
    } else {
        /** End showing loading progress */
        dispatch(loading(false));
    }
};

export const patch_sale_channels = (businessSlug, data) => async dispatch => {

    /** Start showing loading progress */
    dispatch(loading(true));

    const status = await patchSaleChannels(businessSlug, data);

    if (status) {
        dispatch(get_sale_channels(businessSlug));
        /** End showing loading progress */
        dispatch(loading(false));
    } else {
        /** End showing loading progress */
        dispatch(loading(false));
    }
};


export const create_sale_channels = (businessSlug, channel) => async dispatch => {

    /** Start showing loading progress */
    dispatch(loading(true));

    const response = await createSaleChannels(businessSlug, channel);

    if (response) {
        /** End showing loading progress */
        dispatch(get_sale_channels(businessSlug));
    } else {
        /** End showing loading progress */
        dispatch(loading(false));
    }
};
