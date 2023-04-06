export function phoneValidator(phone) {
  const regex = new RegExp("^(\\+98|0)9\\d{9}$");
  let phoneError = "";
  if (!phone) {
    phoneError = "Please enter the phone number..";
  } else if (phone && isNaN(phone)) {
    phoneError = "Please enter the phone number correctly..";
  } else if (
    phone &&
    !isNaN(phone) &&
    phone.toString().length > 2 &&
    phone.toString().slice(0, 2) !== "09"
  ) {
    phoneError = "Mobile number should start with 1.";
  } else if (
    phone &&
    !isNaN(phone) &&
    !(phone.toString().length > 2 && phone.toString().slice(0, 2) !== "09") &&
    phone.toString().length < 11
  ) {
    phoneError = " The entered mobile number is less than 2 digits.";
  }
  return { valid: regex.test(phone), error: phoneError };
}
