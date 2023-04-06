export function removeSecondsFromDateString(date) {
  if (date) {
    const secondColonInDateStringIndex = date.lastIndexOf(":");
    let newDateString = null;
    if (secondColonInDateStringIndex) {
      newDateString = date.substr(0, secondColonInDateStringIndex);
    }
    return newDateString;
  }
  return null;
}
