import React from "react";
import { border, surface, text, white } from "@saas/utils/colors";
import Button from "@material-ui/core/Button";
import LockOpenRoundedIcon from "@material-ui/icons/LockOpenRounded";
import LockRoundedIcon from "@material-ui/icons/LockRounded";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import {
  ACTIVATION_ITEM_ACTIVE,
  ACTIVATION_ITEM_DONE,
  ACTIVATION_ITEM_LOCKED,
} from "store/constants";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
const uiStateConfig = {
  [ACTIVATION_ITEM_ACTIVE]: {
    hasButtons: true,
    icon: <LockOpenRoundedIcon fontSize="small" />,
    color: text.default,
    backgroundColor: surface.highlight.subdued,
  },
  [ACTIVATION_ITEM_LOCKED]: {
    hasButtons: false,
    icon: <LockRoundedIcon fontSize="small" />,
    color: text.subdued,
    backgroundColor: white,
  },
  [ACTIVATION_ITEM_DONE]: {
    hasButtons: false,
    icon: <CheckRoundedIcon fontSize="small" />,
    color: text.disabled,
    backgroundColor: white,
  },
};
export default function DashboardActivationItem({
  dashboardState,
  itemKey,
  item,
  onSkip,
  onSubmit,
  index,
}) {
  let state = ACTIVATION_ITEM_ACTIVE;
  if (item.prerequisite?.some((prerequisite) => !dashboardState[prerequisite]))
    state = ACTIVATION_ITEM_LOCKED;
  if (dashboardState[itemKey] || item.defaultChecked)
    state = ACTIVATION_ITEM_DONE;
  const {maxWidth768} = useResponsive()

  return (
    <div
      style={{
        height: maxWidth768 ? 120 : 48,
        background: uiStateConfig[state].backgroundColor,
        border: `1px solid ${border.subdued}`,
        color: uiStateConfig[state].color,
        marginRight: maxWidth768 && index ? 16 : 0,
        width: maxWidth768 ? 272 : "auto",
        flexShrink: 0,
      }}
      className="px-3 py-2 d-flex flex-column flex-md-row justify-content-between u-border-radius-4 mt-2 align-items-start align-items-md-center"
    >
      <div className="d-flex align-items-center">
        {uiStateConfig[state].icon}

        <div className="flex-1 mr-2">
          <span>{item.title}</span>
          <span className="u-font-semi-small mr-1">{item.time}</span>
        </div>
      </div>
      {uiStateConfig[state].hasButtons ? (
        <div className="d-flex align-items-center">
          {item.hasSkip ? (
            <Button onClick={onSkip} color="primary" className="ml-2">
              رد کردن
            </Button>
          ) : null}
          <Button
            onClick={onSubmit}
            variant="outlined"
            color="primary"
            className="u-border-radius-8 u-height-32"
            style={{ borderColor: border.subdued }}
          >
            {item.submitText || "افزودن"}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
