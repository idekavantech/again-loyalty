export function emailValidator(email) {
  let regex = /^[A-Za-z0-9_\-\.]+\@([a-zA-Z0-9])+\.[A-Za-z]+$/;
  return regex.test(email);
}
