/**
 * Gets the repositories of the user from Github
 */
import Axios from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { startLoading, stopLoading } from "../global/actions";
import request from "@saas/utils/request";
import {
  ADDRESS_API,
  ADDRESS_ID_API,
  GET_MEMBERSHIP_BY_INVITE_ID_API,
  IS_ADMIN_API,
  LOGIN_API,
  LOGIN_BY_PHONE_API,
  MEMBERSHIP_TRANSACTIONS_API,
  MEMBERSHIPS_ITEM_API,
  SELF_MEMBERSHIP_API,
  USER_ADDRESS_API_AND_DEFAULT,
  USER_ADDRESS_WITH_AVAILABILITY_INFO_API,
  VERIFY_API,
} from "@saas/utils/api";
import {
  CREATE_ADDRESS,
  DELETE_ADDRESS,
  EDIT_ADDRESS,
  GET_ADDRESSES,
  GET_ADDRESSES_WITH_AVAILABILITY_INFO,
  GET_MEMBERSHIP_BY_INVITE_SLUG,
  GET_SELF_MEMBERSHIP,
  LOGIN,
  SEND_VIA_PHONE,
  UPDATE_PROFILE,
  VERIFICATION,
} from "./constants";
import { setSnackBarMessage } from "../ui/actions";
import {
  addressCreated,
  getAddressesWithAvailabilityInfo,
  setAddresses,
  setAuthorization,
  setInvitationData,
  setInviter,
  setMembershipTransactions,
  setUser,
} from "./actions";
import { makeSelectAddresses, makeSelectDefaultAddressID, makeSelectLoginCallBack, makeSelectUser } from "./selector";
import { makeSelectBusiness, makeSelectBusinessId, makeSelectBusinessSlug } from "../business/selector";
import Cookies from "js-cookie";
import { makeSelectPlugin, makeSelectUrlPrefix } from "../plugins/selector";
import { setPluginWidgetItemAmounts } from "../plugins/actions";
import { MENU_LINKS_WIDGET } from "../plugins/constants";
import { BASE_PLUGIN, BRANCHES_PLUGIN, SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";

import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { UTM_DATA_SESSION_STORAGE, VITRIN_REFRESH_TOKEN, VITRIN_TOKEN } from "@saas/utils/constants";

export function* login(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const urlPrefix = yield select(makeSelectUrlPrefix());
    delete Axios.defaults.headers.common.Authorization;
    const { data } = action;
    const dto = {
      phone: data,
    };
    const {
      response: {
        data: { key },
      },
    } = yield call(request, LOGIN_API(slug), dto, "POST");

    if (key) {
      sessionStorage.setItem("JWT_KEY", key);
      sessionStorage.setItem("phone", data);
      window.location.href = `${urlPrefix}/verify?phone=${data}${
        action.callback && action.callback !== "undefined" ? `&callback=${action.callback}` : `&callback=/login`
      }`;
    }

    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* loginByPhone(action) {
  try {
    yield put(startLoading());
    const { data } = action;
    const dto = {
      phone: data,
    };
    const {
      response: {
        data: { key },
      },
    } = yield call(request, LOGIN_BY_PHONE_API, dto, "POST");
    if (key) {
      sessionStorage.setItem("JWT_KEY", key);
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}
export function* verify(action) {
  try {
    yield put(startLoading());
    const name = sessionStorage.getItem("name");
    const phone = sessionStorage.getItem("phone");
    const businessId = yield select(makeSelectBusinessId());
    const business = yield select(makeSelectBusiness());
    const UTMData = localStorage.getItem(UTM_DATA_SESSION_STORAGE)
      ? JSON.parse(localStorage.getItem(UTM_DATA_SESSION_STORAGE))
      : {};

    console.log(localStorage.getItem({UTM_DATA_SESSION_STORAGE}));

    const {
      data: { username, password },
    } = action;

    const dto = {
      username,
      password,
      business_id: businessId,
      key: sessionStorage.getItem("JWT_KEY"),
    };
    if (localStorage.getItem("invite_link_id")) dto.invite_link_id = localStorage.getItem("invite_link_id");
    localStorage.removeItem("invite_link_id");

    const {
      response: { meta, data: verifyData },
    } = yield call(request, VERIFY_API, dto, "POST");
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setSnackBarMessage("با موفقیت وارد حساب کاربری خود شدید.", "success"));
      const { access, refresh, invite_result: inviteResult } = verifyData;
      if (inviteResult === "OK") localStorage.setItem("giftReceived", "true");
      localStorage.setItem(VITRIN_TOKEN, access);
      Cookies.set(VITRIN_TOKEN, access, { expires: 365 });
      localStorage.setItem(VITRIN_REFRESH_TOKEN, refresh);
      Cookies.set(VITRIN_REFRESH_TOKEN, refresh, { expires: 365 });
      Axios.defaults.headers.common.Authorization = `Bearer ${access}`;

      const obj = {
        business: businessId,
        labels: [],
        ...(name && { name }),
        utm_data: UTMData,
        user: { phone },
      };

      if (!UTMData.source && !UTMData.referrer) {
        delete obj?.extra_data;
      }
      if (!UTMData.source) {
        delete obj?.utm_data?.source;
      }
      if (!UTMData.referrer) {
        delete obj?.utm_data?.referrer;
      }

      if (!UTMData.source && !UTMData.referrer) delete obj?.extra_data;
      if (!UTMData.source) delete obj?.extra_data?.utm_data?.source;
      if (!UTMData.referrer) delete obj?.extra_data?.utm_data?.referrer;


      const {
        response: { data: _user },
      } = yield call(request, SELF_MEMBERSHIP_API, obj, "POST");
      const {
        response: { data },
      } = yield call(request, IS_ADMIN_API(business.slug), {}, "GET");
      if (_user) {
        yield put(
          setUser({
            ..._user.user,
            token: access,
            giftCredit: _user.gift_credit,
            inviteCode: _user.invite_link_id,
            isAdmin: data?.is_admin,
          })
        );
        yield put(
          setPluginWidgetItemAmounts(
            BRANCHES_PLUGIN,
            MENU_LINKS_WIDGET,
            `${priceFormatter(_user.gift_credit)} تومان `,
            business
          )
        );
        yield put(
          setPluginWidgetItemAmounts(
            SHOPPING_PLUGIN,
            MENU_LINKS_WIDGET,
            `${priceFormatter(_user.gift_credit)} تومان `,
            business
          )
        );
      }
      yield call(fetchAddresses);
      yield put(setAuthorization(""));
      const loginCallback = yield select(makeSelectLoginCallBack());
      if (loginCallback && loginCallback !== "undefined") yield call(loginCallback);
      if (action.callback && action.callback !== "undefined")
        yield call(() => (window.location.href = action.callback));
    } else yield put(setSnackBarMessage("کد تایید نادرست است", "fail"));
    yield put(stopLoading());
  } catch (err) {
    console.log("err", err);
    yield put(stopLoading());
  }
}

export function* updateProfile(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());

    const {
      response: { data, meta },
    } = yield call(request, MEMBERSHIPS_ITEM_API(action.id, slug), action.data, "PATCH");
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setSnackBarMessage("ویرایش اطلاعات با موفقیت انجام شد", "success"));
      yield put(setUser({ user: data }));
      if (action.callback) action.callback(data);
    } else yield put(setSnackBarMessage("ویرایش اطلاعات ناموفق بود", "fail"));
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}
// Address
export function* fetchAddresses() {
  const user = yield select(makeSelectUser());
  if (user && user.id) {
    try {
      yield put(startLoading());
      const {
        response: { data },
      } = yield call(request, USER_ADDRESS_API_AND_DEFAULT, {}, "GET");
      if (data) {
        yield put(setAddresses(data.addresses, data.default_address));
      }
      yield put(stopLoading());
    } catch (err) {
      yield put(stopLoading());
    }
  }
}
export function* fetchAddressesWithAvailabilityInfo(action) {
  const user = yield select(makeSelectUser());
  if (user && user.id) {
    try {
      yield put(startLoading());
      const {
        response: { data },
      } = yield call(request, USER_ADDRESS_WITH_AVAILABILITY_INFO_API(action.data.order_id), {}, "GET");
      if (data) {
        const newAddressesArray = [...data.addresses];
        const inRangeAddresses = newAddressesArray.filter((address) => address.is_available);
        const notInRangeAddresses = newAddressesArray.filter((address) => !address.is_available);
        const _addresses = [...inRangeAddresses, ...notInRangeAddresses];
        yield put(setAddresses(_addresses, data.default_address));
      }
      yield put(stopLoading());
    } catch (err) {
      yield put(stopLoading());
    }
  }
}
export function* createAddress(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(request, ADDRESS_API, action.data, "POST");
    if (data) {
      yield put(addressCreated(data));
      yield call(fetchAddresses);
      if (action.callback) yield call(action.callback(data));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}
export function* editAddress(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(request, ADDRESS_ID_API(action.data.id), action.data, "PATCH");
    if (data) {
      const addresses = yield select(makeSelectAddresses());
      const defaultUserAddressId = yield select(makeSelectDefaultAddressID());
      yield put(
        setAddresses(
          addresses.map((address) => (address.id === data.id ? { ...address, ...data } : address)),
          defaultUserAddressId
        )
      );
      if (action.callback) yield call(action.callback(data));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}
export function* deleteAddress(action) {
  try {
    yield put(startLoading());
    const { status } = yield call(request, ADDRESS_ID_API(action.data.addressId), {}, "DELETE");
    if (status >= 200 && status <= 300) {
      if (action.data.orderId) {
        yield put(getAddressesWithAvailabilityInfo(action.data.orderId));
      } else {
        yield call(fetchAddresses);
      }
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}
export function* selfMembership() {
  try {
    yield put(startLoading());
    const pluginData = yield select(makeSelectPlugin(BASE_PLUGIN));
    const business = yield select(makeSelectBusinessId());
    let user = {};
    yield pluginData?.data?.login_required_fields?.forEach((item) => (user[item] = sessionStorage.getItem(item)));

    const phone = sessionStorage.getItem("phone");
    user.phone = phone;
    delete user.name;
    const UTMData = localStorage.getItem(UTM_DATA_SESSION_STORAGE)
      ? JSON.parse(localStorage.getItem(UTM_DATA_SESSION_STORAGE))
      : {};

    const name = sessionStorage.getItem("name");
    let obj = {
      business,
      labels: [],
      user,
      name,
      utm_data:UTMData,
    };
    if (!pluginData?.data?.login_required_fields?.length && !phone) {
      delete obj.user;
    }
    if (!UTMData.source && !UTMData.referer) {
      delete obj?.extra_data;
    }
    if (!UTMData.source) {
      delete obj?.utm_data?.source;
    }
    if (!UTMData.referer) {
      delete obj?.utm_data?.referrer;
    }
    const {
      response: { meta, data },
    } = yield call(request, SELF_MEMBERSHIP_API, obj, "POST");
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setInvitationData(data));
      const {
        response: { data: transactions },
      } = yield call(request, MEMBERSHIP_TRANSACTIONS_API(data.id));
      yield put(setMembershipTransactions(transactions));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getMembershipNameByInviteId(action) {
  try {
    yield put(startLoading());
    const { response, status } = yield call(request, GET_MEMBERSHIP_BY_INVITE_ID_API(action.data));
    if (status >= 200 && status <= 300) yield put(setInviter(response.data));
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

const sagaFunctions = [
  takeLatest(LOGIN, login),
  takeLatest(SEND_VIA_PHONE, loginByPhone),
  takeLatest(VERIFICATION, verify),
  takeLatest(UPDATE_PROFILE, updateProfile),
  takeLatest(GET_ADDRESSES, fetchAddresses),
  takeLatest(GET_ADDRESSES_WITH_AVAILABILITY_INFO, fetchAddressesWithAvailabilityInfo),
  takeLatest(CREATE_ADDRESS, createAddress),
  takeLatest(EDIT_ADDRESS, editAddress),
  takeLatest(DELETE_ADDRESS, deleteAddress),
  takeLatest(GET_SELF_MEMBERSHIP, selfMembership),
  takeLatest(GET_MEMBERSHIP_BY_INVITE_SLUG, getMembershipNameByInviteId),
];
export default sagaFunctions;
