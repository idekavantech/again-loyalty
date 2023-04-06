export const calcPagesByIndex = (itemIndex, pagePosition) => {
  // 28 is our cells count
  // page position is the current page user in
  // Item index is the index of the cell
  return itemIndex + pagePosition * 28;
};
