export function landlineValidator(landline) {
  let regex = /^(\+98|0)?\d{10}$/g;
  return regex.test(landline);
}
