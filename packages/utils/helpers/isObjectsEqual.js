export function isObjectsEqual(array1, array2) {
  return (
    array1.length === array2.length &&
    array1.every((item) => array2.find((_item) => _item.id === item.id))
  );
}
