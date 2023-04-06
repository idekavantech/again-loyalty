export function phoneValidator(phone) {
  const regex = new RegExp("^(\\+98|0)9\\d{9}$");
  let phoneError = "";
  if (!phone) {
    phoneError = "لطفا شماره تلفن را وارد کنید.";
  } else if (phone && isNaN(phone)) {
    phoneError = "شماره خود را مانند نمونه وارد کنید :‌۰۹۱۲۱۲۳۴۵۶۷.";
  } else if (
    phone &&
    !isNaN(phone) &&
    phone.toString().length > 2 &&
    phone.toString().slice(0, 2) !== "09"
  ) {
    phoneError = "شماره موبایل باید با ۰۹ شروع شود.";
  } else if (
    phone &&
    !isNaN(phone) &&
    !(phone.toString().length > 2 && phone.toString().slice(0, 2) !== "09") &&
    phone.toString().length < 11
  ) {
    phoneError = " شماره موبایل وارد شده کمتر از ۱۱ رقم است.";
  }
  return { valid: regex.test(phone), error: phoneError };
}
