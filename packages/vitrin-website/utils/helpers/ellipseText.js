export const ellipseText = (text, length) =>
  text && text.length > length
    ? `${text.toString().substr(0, length)}...`
    : text;
