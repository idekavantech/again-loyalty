export const findoutMissedNumbersFromArrays = (listOfNums) => {
  if (listOfNums.length === 1) {
    // it's only a number
    // so plus it if its 1
    // minus if it's under 9
    if (listOfNums?.[0] === 10) {
      return 9;
    }
    if (listOfNums?.[0] === 1) {
      return 2;
    } else {
      return listOfNums[0] + 1;
    }
  } else {
    let l = false;
    let a = [...new Set([...listOfNums, 11])];
    return Array.from(Array(Math.max(...a)).keys())
      .map((n, i) =>
        a.indexOf(i) < 0 && (!l || i > Math.min(...a)) ? i : null
      )
      .filter((f) => f)?.[0];
  }
};
