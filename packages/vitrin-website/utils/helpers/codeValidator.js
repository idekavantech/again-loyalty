export function codeValidator(code) {
  const regex = new RegExp("^[^s]{4}$");
  let codeError = "";
  if (!code) {
    codeError = "لطفا کد تایید را وارد کنید.";
  } else {
    if (isNaN(code)) {
      codeError = "کد تایید را به درستی وارد نمایید";
    } else {
      if (code.toString().length < 4) {
        codeError = "کد تایید باید  ۴ رقم باشد";
      }
    }
  }
  return { valid: regex.test(code), error: codeError };
}
