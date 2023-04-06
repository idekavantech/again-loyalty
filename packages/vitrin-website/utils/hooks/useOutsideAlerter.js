export function useOutsideAlerter(ref, closeControls) {
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      closeControls();
    }
  }

  // Bind the event listener
  document.addEventListener("mousedown", handleClickOutside);
  document.addEventListener("touchstart", handleClickOutside);
  return () => {
    // Unbind the event listener on clean up
    document.removeEventListener("mousedown", handleClickOutside);
    document.removeEventListener("touchstart", handleClickOutside);
  };
}
