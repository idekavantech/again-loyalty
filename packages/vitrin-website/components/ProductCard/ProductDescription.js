/* eslint-disable react/no-danger */
/**
 *
 * AddNewItemSection
 *
 */

import React, { memo } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import useTheme from "@material-ui/core/styles/useTheme";
import { englishNumberToPersianNumber } from "utils/helpers/englishNumberToPersianNumber";
import { ellipseText } from "utils/helpers/ellipseText";

function ProductDescription({ title, description, isEditMode }) {
  const theme = useTheme();
  return (
    <div className="overflow-hidden">
      <Tooltip
        title={title}
        placement="top"
        PopperProps={{
          className: "container-shadow z-index-1000",
        }}
        TransitionProps={{
          className: `p-2 u-text-black u-fontVerySmall ${
            !isEditMode && "d-none"
          }`,
          style: { background: theme.palette.background.paper },
        }}
      >
        <div
          className="u-fontNormal text-right u-fontWeightBold overflow-hidden title"
          style={{
            height: 35,
            color: theme.palette.text.secondary,
            marginBottom: description?.length ? "" : 39,
          }}
        >
          {ellipseText(englishNumberToPersianNumber(title), 100)}
        </div>
      </Tooltip>

      {description ? (
        <div
          className="mt-1 u-font-semi-small text-right overflow-hidden description"
          style={{
            height: 35,
            color: theme.palette.text.secondary,
          }}
          dangerouslySetInnerHTML={{
            __html: `
      ${englishNumberToPersianNumber(description)}
      `,
          }}
        />
      ) : null}
    </div>
  );
}

export default memo(ProductDescription);
