import { useEffect, useState } from "react";

export function useWindowWidthSize() {
  const [windowWidthSize, setWindowWidthSize] = useState(null);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidthSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowWidthSize;
}
