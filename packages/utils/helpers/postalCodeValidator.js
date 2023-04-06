export function postalCodeValidator(postalCode) {
  let regex = /\b(?!(d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/g;
  return regex.test(postalCode);
}
