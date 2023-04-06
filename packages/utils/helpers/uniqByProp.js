export const uniqByProp = (prop) => (arr) =>
  Object.values(
    arr.reduce(
      (acc, item) => (item && item[prop] && (acc[item[prop]] = item), acc), // using object mutation (faster)
      {}
    )
  );
