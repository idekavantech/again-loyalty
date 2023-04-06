export function googleMapsNavigate(latitude, longitude) {
  if (
    navigator.platform.indexOf("iPhone") !== -1 ||
    navigator.platform.indexOf("iPad") !== -1 ||
    navigator.platform.indexOf("iPod") !== -1
  ) {
    // if we're on iOS, open in Apple Maps
    window.location = `maps://maps.google.com/maps?daddr=${latitude},${longitude}&amp;ll=`;
  } else {
    // else use Google
    window.location = `https://maps.google.com/maps?daddr=${latitude},${longitude}&amp;ll=`;
  }
}
