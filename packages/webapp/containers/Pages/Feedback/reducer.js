/*
 *
 * Feedback reducer
 *
 */
import produce from "immer";
import { DEFAULT_ACTION  , SET_RESPONSE} from "./constants";

export const initialState = {response :{}};

/* eslint-disable default-case, no-param-reassign */
const feedbackReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case SET_RESPONSE :
        draft.response = action.data;
        break;

    }
  });

export default feedbackReducer;
