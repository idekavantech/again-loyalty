export function getCookie(cookiename, cookie) {
  // Get name followed by anything except a semicolon
  const cookiestring = RegExp(cookiename + "=[^;]+").exec(cookie);
  return decodeURIComponent(
    !!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : ""
  );
}
