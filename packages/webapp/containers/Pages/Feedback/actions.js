/*
 *
 * Feedback actions
 *
 */

import {
  DEFAULT_ACTION,
  SUBMIT_REVIEW,
  CREATE_RESPONSE,
  GET_RESPONSE,
  SET_RESPONSE,
  UPDATE_RESPONSE,
} from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function submitReview(data) {
  return {
    type: SUBMIT_REVIEW,
    data,
  };
}

export function createResponse(data) {
  return {
    type: CREATE_RESPONSE,
    data,
  };
}

export function getResponse(data) {
  return {
    type: GET_RESPONSE,
    data: data,
  };
}

export function setResponse(data) {
  return {
    type: SET_RESPONSE,
    data,
  };
}

export function updateResponse(data) {
  return {
    type: UPDATE_RESPONSE,
    data,
  };
}
