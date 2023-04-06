export const findKey = (object, key) => {
  let result = null;
  if (object instanceof Array) {
    for (let i = 0; i < object.length; i += 1) {
      result = findKey(object[i], key);
      if (result) break;
    }
  } else if (object.id === +key) result = object;
  else result = findKey(object.children || [], key);
  return result;
};
