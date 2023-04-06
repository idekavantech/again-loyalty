export function devideArraysIntoGroups(arr = [], devideTo) {
  const rowsNumber = Math.ceil(arr.length / devideTo);
  const arrayRows = [];

  for (let i = 0; i < rowsNumber; i += 1) {
    const row = [];
    for (let j = 0; j < devideTo; j += 1) {
      if (arr[devideTo * i + j]) {
        row.push(arr[devideTo * i + j]);
      } else {
        row.push(null);
      }
    }

    arrayRows.push({ id: i, group: row });
  }

  return arrayRows;
}
