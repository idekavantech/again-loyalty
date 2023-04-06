import React, { memo } from "react";

import { hexToRGBA } from "@saas/utils/helpers/hexToRGBA";

function Styles({ themeColor }) {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
                    .error-address-details-invalid {
                      background-color: white;
                      animation-name: address-details-invalid-animation;
                      animation-duration: 1s;
                      animation-iteration-count : infinite ;
                    }
                    @keyframes address-details-invalid-animation {
                      0% {background-color: white}
                      50% {background-color: ${hexToRGBA(themeColor, 0.1)}}
                      100% {background-color: white}
                    }
                    `,
      }}
    />
  );
}

export default memo(Styles);
