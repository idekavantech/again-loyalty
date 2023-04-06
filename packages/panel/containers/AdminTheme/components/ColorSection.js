import React, { memo, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Icon from "@saas/components/Icon";
import { TICK } from "@saas/icons";
import ColorPicker from "@saas/builder/SectionRenderer/components/ColorPicker";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { spectrums } from "./constants";
import { night } from "@saas/utils/colors";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

function ColorSection({ _themeColorConfig, changeThemeColorConfig }) {
  const {minWidth576} = useResponsive()
  const [color, setColor] = useState(_themeColorConfig);
  const [open, setOpen] = useState(false);
  changeThemeColorConfig(color);
  return (
    <Paper
      elevation={1}
      className="d-flex mt-3 py-3 flex-wrap"
      style={{ marginBottom: minWidth576 ? "" : 75 }}
    >
      <div className="col-12">
        <div className="u-fontLarge mb-3" style={{ color: night }}>
          Color selection
        </div>
        <div className="d-flex flex-wrap">
          {spectrums.map((eachSpectrum, index) => (
            <div
              className="d-flex flex-sm-column flex-row"
              key={index}
              style={{ width: minWidth576 ? "" : "100%" }}
            >
              {eachSpectrum.map((eachColor) => (
                <div
                  className="mt-1 mr-0 mb-1 ml-sm-1 mx-auto"
                  key={`color-option-${eachColor}`}
                >
                  <div
                    onKeyDown={() => {}}
                    role="button"
                    tabIndex="0"
                    className="u-rectangle d-flex justify-content-center align-items-center"
                    onClick={() => setColor(eachColor)}
                    style={{ backgroundColor: eachColor }}
                  >
                    {color === eachColor && (
                      <Icon width={19} height={15} icon={TICK} color="white" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="u-fontMedium mt-4">
          <div className="u-fontLarge mb-3" style={{ color: night }}>
            Color selection
          </div>
          <span style={{ color: night }}>Didn't find your desired color?</span>
          <span
            className="mr-1 u-cursor-pointer"
            style={{ color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR }}
            onClick={() => setOpen(!open)}
          >
            Choosing the desired color
          </span>
          <span
            className="u-rectangle d-flex justify-content-center align-items-center ml-3 mt-2"
            style={{ backgroundColor: color, cursor: "default" }}
          ></span>
        </div>
        {open ? (
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <div>
              <ColorPicker
                color={color}
                withoutTextField
                setColor={(themeColor) => setColor(themeColor)}
              />
            </div>
          </ClickAwayListener>
        ) : null}
      </div>
    </Paper>
  );
}

export default memo(ColorSection);
