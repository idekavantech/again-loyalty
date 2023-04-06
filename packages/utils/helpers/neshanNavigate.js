export function neshanNavigate(latitude, longitude) {
  window.location = `https://neshan.org/maps/@${latitude},${longitude},15.0z,0.0p/places/`;
}
