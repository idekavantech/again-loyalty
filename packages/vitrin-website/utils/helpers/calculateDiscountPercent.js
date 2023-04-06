export function calculateDiscountPercent(initialPrice, discountedPrice) {
  const discountPercent =
    ((initialPrice - discountedPrice) / initialPrice) * 100;
  return discountPercent % 1 > 0 && discountPercent < 1
    ? discountPercent.toFixed(1)
    : Math.round(discountPercent);
}
