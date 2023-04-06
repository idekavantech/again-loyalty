export function wazeNavigate(latitude, longitude) {
  window.location = `waze://?ll=${latitude},${longitude}&navigate=yes`;
}
