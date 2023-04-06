export const getChangedObjectValues = (object, changedObject) => {
  return Object.fromEntries(
    Object.entries(changedObject).filter(
      ([key, value]) => JSON.stringify(value) !== JSON.stringify(object[key])
    )
  );
};
