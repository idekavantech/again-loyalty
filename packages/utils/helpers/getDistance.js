export const getDistance = (x1, y1, x2, y2) =>
  Math.sqrt(
    (parseFloat(x1) - parseFloat(x2)) ** 2 +
      (parseFloat(y1) - parseFloat(y2)) ** 2
  );
