export function baladNavigate(latitude, longitude) {
  window.location = `https://balad.ir/location?latitude=${latitude}&longitude=${longitude}&zoom=16.500000#15/${latitude}/${longitude}`;
}
