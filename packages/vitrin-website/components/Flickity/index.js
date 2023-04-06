/* eslint-disable no-param-reassign */

import React, { memo, useCallback, useEffect, useRef } from "react";
import F from "react-flickity-component";

function Flickity({ dragging, flickityRef, ...props }) {
  const flkty = useRef(null);
  const setFlickityRef = useCallback(
    (c) => {
      flkty.current = c;
      if (flickityRef) flickityRef.current = c;
    },
    [flickityRef]
  );

  useEffect(() => {
    if (flkty.current && dragging) {
      flkty.current.on("dragStart", () => {
        dragging.current = true;
      });
      flkty.current.on("dragEnd", () => {
        setTimeout(() => {
          dragging.current = false;
        }, 0);
      });
    }
  }, [flkty, dragging]);
  return <F flickityRef={setFlickityRef} {...props} />;
}

export default memo(Flickity);
