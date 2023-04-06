const removeNullishKeysFromObject = (obj) => {
  const currentObject = {};
  const objectKeysArray = Object.keys(obj);
  for (let i = 0; i < objectKeysArray.length; i++) {
    if (obj[objectKeysArray[i]] === null) continue;
    if (Array.isArray(obj[objectKeysArray[i]])) {
      currentObject[objectKeysArray[i]] = obj[objectKeysArray[i]];
      continue;
    }
    if (typeof obj[objectKeysArray[i]] === "object") {
      const res = removeNullishKeysFromObject({
        ...obj[objectKeysArray[i]],
      });
      if (Object.keys(res).length === 0) continue;
      currentObject[objectKeysArray[i]] = res;
      continue;
    }
    currentObject[objectKeysArray[i]] = obj[objectKeysArray[i]];
  }
  return currentObject;
};

export default removeNullishKeysFromObject;
