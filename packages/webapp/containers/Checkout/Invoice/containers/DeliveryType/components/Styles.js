import React, { memo } from "react";

import { hexToRgb } from "@saas/utils/helpers/hexToRgb";
import { hexToRGBA } from "@saas/utils/helpers/hexToRGBA";

function Styles({ themeColor }) {
  const rgbThemeColor = hexToRgb(themeColor);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `

            .checkout-collapse:hover {
              background-color : rgba(${rgbThemeColor.r}, ${rgbThemeColor.g}, ${rgbThemeColor.b}, 0.05) ;
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
      <style
        dangerouslySetInnerHTML={{
          __html: `
                        .error-preorder-time-animation {
                          background-color: white;
                          animation-name: preorder-animation;
                          animation-duration: 1s;
                          animation-iteration-count : infinite ;
                        }
                        @keyframes preorder-animation {
                          0% {background-color: white}
                          50% {background-color: ${hexToRGBA(themeColor, 0.1)}}
                          100% {background-color: white}
                        }
                        `,
        }}
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
              .flickity-button {
                color  : ${themeColor}
              }
              .flickity-prev-next-button.previous {
                background-color: white;
                box-shadow : 0px 0px 4px rgba(0, 0, 0, 0.1);
                border-radius : 8px 0px 0px 8px ;
                width  : 34px;
                height : 62px;
                right : -16px !important;
                top : 66px !important;
              }
              .flickity-prev-next-button.next {
                background-color: white;
                box-shadow : 0px 0px 4px rgba(0, 0, 0, 0.1);
                border-radius : 0px 8px 8px 0px ;
                width  : 34px;
                height : 62px;
                left : -16px !important;
                top : 66px !important;
              }
            `,
        }}
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
                  .error-scheduled-time-animation {
                    background-color: white;
                    animation-name: scheduled-animation;
                    animation-duration: 1s;
                    animation-iteration-count : infinite ;
                  }
                  @keyframes scheduled-animation {
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
