export function handleKeyDown(ev, onClick) {
  if (ev.keyCode === 13) {
    onClick(ev);
  }
}
