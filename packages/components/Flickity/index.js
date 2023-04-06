/* eslint-disable no-param-reassign */

import React, { memo, useCallback, useEffect, useRef } from "react";
import F from "react-flickity-component";

function Flickity({ dragging, flickityRef, ...props }) {
  const flkty = useRef(null);
  const isNextBtnClicked = useRef(false);

  const setFlickityRef = useCallback((c) => {
    flkty.current = c;
    if (flickityRef) flickityRef.current = c;
  }, []);

  useEffect(() => {
    if (flkty.current && dragging) {
      flkty.current.on("dragStart", () => {
        dragging.current = true;
        flkty.current.slider.childNodes.forEach(
          (slide) => (slide.style.pointerEvents = "none")
        );
      });
      flkty.current.on("dragEnd", () => {
        setTimeout(() => {
          dragging.current = false;
          flkty.current.slider.childNodes.forEach(
            (slide) => (slide.style.pointerEvents = "all")
          );
        }, 0);
      });
    }
    if (
      flkty.current &&
      props.options.wrapAround &&
      !isNextBtnClicked.current
    ) {
      flkty.current.on("ready", () => {
        flkty.current.nextButton.element.click();
        isNextBtnClicked.current = true;
      });
    }
  }, []);

  return <F flickityRef={setFlickityRef} {...props} />;
}

export default memo(Flickity);
