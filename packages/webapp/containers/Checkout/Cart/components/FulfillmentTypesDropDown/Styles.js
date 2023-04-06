import React, { memo } from "react";

import { hexToRGBA } from "@saas/utils/helpers/hexToRGBA";

function Styles({ rgbThemeColor, themeColor }) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `

      .checkout-collapse:hover {
        background-color : rgba(${rgbThemeColor?.r}, ${rgbThemeColor?.g}, ${rgbThemeColor?.b}, 0.05) ;
      }
    `,
        }}
      />
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
    </>
  );
}
export default memo(Styles);
