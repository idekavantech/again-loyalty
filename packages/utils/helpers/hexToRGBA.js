export function hexToRGBA(hex = "#ffffff", opacity) {
  const _hex = hex.replace("#", "");
  if (hex.startsWith("rgb")) return hex;
  return `rgba(${_hex
    .match(new RegExp(`(.{${_hex.length / 3}})`, "g"))
    .map((l) => parseInt(_hex.length % 2 ? l + l : l, 16))
    .concat(typeof opacity !== "undefined" ? opacity : 1)
    .join(",")})`;
}
