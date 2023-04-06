import { useCallback, useReducer } from "react";
import { replaceEnglishSmsKeywordsWithPersian, replacePersinaSmsKeywordWithEnglish } from "./smsKeywords";

const initialState = {
  content: "",
  selectedStart: null,
  selectedEnd: null,
};

const actionTypes = {
  write: "write",
  setDefault: "setDefault",
  insertKeyword: "insertKeyword",
  setSelectedRange: "setSelectedRange",
  convertPersian: "convertToPersian",
  convertEnglish: "convertEnglish",
};

let selectRangeTimeout = null;

const reducerFn = (state, action) => {
  switch (action.type) {
    case actionTypes.write: {
      return { ...state, content: action.data };
    }
    case actionTypes.setSelectedRange: {
      return { ...state, selectedStart: action.data.from, selectedEnd: action.data.to };
    }
    case actionTypes.convertEnglish: {
      return { ...state, content: replacePersinaSmsKeywordWithEnglish(state.content) };
    }
    case actionTypes.convertPersian: {
      return { ...state, content: replaceEnglishSmsKeywordsWithPersian(state.content) };
    }
    case actionTypes.setDefault: {
      return { ...state, content: defaultSmsContent() };
    }
    case actionTypes.insertKeyword: {
      const { selectedStart: from, selectedEnd: to, content } = state;
      const { keyword } = action.data;

      const sms = replaceEnglishSmsKeywordsWithPersian(content);
      const sentenceBeforeKeyword = sms.slice(0, from);
      const sentenceAfterKeywordHasPadding = sentenceBeforeKeyword.trimEnd().length !== sentenceBeforeKeyword.length;
      const sentenceAfterKeyword = sms.slice(to, sms.length);
      const sentenceBeforeKeywordHasPadding = sentenceAfterKeyword.trimStart().length !== sentenceAfterKeyword.length;
      const newExpiryReminderSms = `${sentenceBeforeKeyword}${sentenceAfterKeywordHasPadding ? "" : " "}[${keyword}]${
        sentenceBeforeKeywordHasPadding || !sentenceAfterKeyword.trim.length === 0 ? "" : " "
      }${sentenceAfterKeyword}`;
      return { ...state, content: newExpiryReminderSms };
    }
    default:
      throw new Error(`unknown action type : ${action.type}`);
  }
};


function useTextfieldCursor(initState) {
  const [state, dispatch] = useReducer(reducerFn, { initialState, ...initState });

  const write = (input) => dispatch({ type: actionTypes.write, data: input });

  const insert = (keyword) => dispatch({ type: actionTypes.insertKeyword, data: { keyword } });

  const convertEnglish = () => dispatch({ type: actionTypes.convertEnglish });

  const convertPersian = () => dispatch({ type: actionTypes.convertPersian });

  const selectionRangeChange = useCallback((e) => {
    const { selectionStart, selectionEnd } = e.target ?? {};
    if (selectRangeTimeout) {
      clearTimeout(selectRangeTimeout);
      selectRangeTimeout = null;
    }

    selectRangeTimeout = setTimeout(() => {
      dispatch({
        type: actionTypes.setSelectedRange,
        data: { from: selectionStart ?? null, to: selectionEnd ?? null },
      });
    }, 500);
  }, []);

  return {
    state,
    write,
    insert,
    convertEnglish,
    convertPersian,
    selectionRangeChange
  };
}

export { useTextfieldCursor };
