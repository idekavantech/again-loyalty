export const setQueriesInLocalstorage = (queries) => {
  Object.keys(queries).forEach((key) =>
    localStorage.setItem(key, queries[key])
  );
};
