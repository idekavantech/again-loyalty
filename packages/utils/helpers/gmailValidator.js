export function gmailValidator(gmail) {
  let regex = /^([A-Za-z0-9_\-\.])+\@([gmail|GMAIL])+\.(com)$/;
  return regex.test(gmail);
}
