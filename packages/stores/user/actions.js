import {
  SET_USER,
  LOGIN,
  VERIFICATION,
  SET_TOKEN,
  UPDATE_PROFILE,
  SET_LOGIN_CALLBACK,
  ADDRESS_CREATED,
  CREATE_ADDRESS,
  DELETE_ADDRESS,
  EDIT_ADDRESS,
  GET_ADDRESSES,
  SELECT_ADDRESS,
  SET_ADDRESS_INFO,
  SET_ADDRESSES,
  SET_CREDIT,
  SEND_VIA_PHONE,
  GET_SELF_MEMBERSHIP,
  SET_INVITER,
  SET_INVITATION_DATA,
  GET_MEMBERSHIP_BY_INVITE_SLUG,
  SET_MEMBERSHIP_TRANSACTIONS,
  GET_ADDRESSES_WITH_AVAILABILITY_INFO,
  SET_AUTHORIZATION,
} from "./constants";

export function setUser(user) {
  return {
    type: SET_USER,
    data: { user },
  };
}

export function setInviter(user) {
  return {
    type: SET_INVITER,
    data: user,
  };
}

export function setToken(data) {
  return {
    type: SET_TOKEN,
    data,
  };
}

export function login(phone, resend, callback) {
  return {
    type: LOGIN,
    data: phone,
    resend,
    callback,
  };
}

export function verify(phone, code, callback) {
  return {
    type: VERIFICATION,
    data: { username: phone, password: code },
    callback,
  };
}

export function sendViaPhone(phone) {
  return {
    type: SEND_VIA_PHONE,
    data: phone,
  };
}
export function updateProfile(id, data, callback) {
  return {
    type: UPDATE_PROFILE,
    id,
    data,
    callback,
  };
}

export function setLoginCallBack(data) {
  return {
    type: SET_LOGIN_CALLBACK,
    data,
  };
}

// Address
export function getAddresses() {
  return {
    type: GET_ADDRESSES,
    data: {},
  };
}
export function getAddressesWithAvailabilityInfo(order_id) {
  return {
    type: GET_ADDRESSES_WITH_AVAILABILITY_INFO,
    data: {
      order_id,
    },
  };
}
export function setAddresses(addresses, defaultAddressId) {
  return {
    type: SET_ADDRESSES,
    data: { addresses, defaultAddressId },
  };
}
export function setSelectedAddress(address) {
  return {
    type: SELECT_ADDRESS,
    data: address,
  };
}
export function setAddressInfo(info) {
  return {
    type: SET_ADDRESS_INFO,
    data: info,
  };
}
export function createAddress(data, callback) {
  return {
    type: CREATE_ADDRESS,
    data,
    callback,
  };
}
export function editAddress(data, callback) {
  return {
    type: EDIT_ADDRESS,
    data,
    callback,
  };
}
export function addressCreated(info) {
  return {
    type: ADDRESS_CREATED,
    data: info,
  };
}
export function deleteAddress(addressId, orderId) {
  return {
    type: DELETE_ADDRESS,
    data: { addressId, orderId },
  };
}

export function setUserWallet(data) {
  return {
    type: SET_CREDIT,
    data,
  };
}

export function setInvitationData(data) {
  return {
    type: SET_INVITATION_DATA,
    data,
  };
}
export function getSelfMembership() {
  return {
    type: GET_SELF_MEMBERSHIP,
  };
}

export function getMembershipByInviteSlug(data) {
  return {
    type: GET_MEMBERSHIP_BY_INVITE_SLUG,
    data,
  };
}
export function setMembershipTransactions(data) {
  return {
    type: SET_MEMBERSHIP_TRANSACTIONS,
    data,
  };
}

export function getMembershipReport(data) {
  return {
    type: SET_MEMBERSHIP_TRANSACTIONS,
    data,
  };
}

export function setAuthorization(data) {
  return {
    type: SET_AUTHORIZATION,
    data,
  };
}
