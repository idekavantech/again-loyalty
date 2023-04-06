import isEqual from "lodash/isEqual";
import { useLayoutEffect, useRef, useState } from "react";

const useSyncedStateWithLocalstorage = (localstoragekey, initialState) => {
  const [state, setState] = useState(initialState);
  const isFirstMount = useRef(true);

  let localStorageValue;
  if (typeof window !== "undefined") {
    localStorageValue = JSON.parse(localStorage.getItem(localstoragekey));
  }

  useLayoutEffect(() => {
    if (localStorageValue && Object.keys(localStorageValue)) {
      if (!isEqual(localStorageValue, state)) {
        if (isFirstMount.current) {
          setState(localStorageValue);
          isFirstMount.current = false;
        } else localStorage.setItem(localstoragekey, JSON.stringify(state));
      }
      if (isFirstMount.current) isFirstMount.current = false;
    } else {
      if (isFirstMount.current) isFirstMount.current = false;
      localStorage.setItem(localstoragekey, JSON.stringify(state));
    }
  }, [state, localStorageValue]);

  return [state, setState];
};

export default useSyncedStateWithLocalstorage;
