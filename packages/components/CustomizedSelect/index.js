/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import { night, pollution } from "@saas/utils/colors";
import LazyImage from "../LazyImage";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

function CustomizedSelect({ options, value, onChangeMethod }) {
  const { minWidth768 } = useResponsive();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelect = (index) => {
    setAnchorEl(null);
    setSelectOption(options[index]);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [selectedOption, setSelectOption] = useState(value);

  useEffect(() => {
    onChangeMethod(selectedOption);
  }, [selectedOption]);

  const [componentWidth, setComponentWidth] = useState(null);
  const hasWindow = typeof window !== "undefined";
  useEffect(() => {
    if (hasWindow) {
      const width = document.getElementById("main-container").offsetWidth;
      setComponentWidth(width);
    }
  }, [hasWindow]);
  return (
    <div>
      <div
        className="d-flex align-items-center justify-content-between p-3 w-100 u-cursor-pointer"
        onClick={handleClick}
        style={{ border: "1px solid #CCD4D7", borderRadius: 4 }}
        id="main-container"
      >
        <div className="d-flex align-items-center">
          <div className="d-flex justify-content-center align-items-center ml-2">
            <LazyImage src={selectedOption.Icon} width={32} height={32} />
          </div>
          <div>
            <div style={{ color: night }} className="u-fontMedium mb-2">
              {selectedOption.title}
            </div>
            <div style={{ color: pollution }} className="u-fontSmall">
              {selectedOption.description}
            </div>
          </div>
        </div>
        <ArrowDropDownRoundedIcon />
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map(({ Icon, title, description }, index) => (
          <MenuItem
            key={`menu-${title}`}
            onClick={() => handleSelect(index)}
            style={{ width: minWidth768 ? componentWidth : "" }}
          >
            <div
              className="d-flex align-items-center p-3 w-100"
              onClick={handleClick}
              style={{ border: "1px solid #CCD4D7", borderRadius: 4 }}
            >
              <div className="d-flex justify-content-center align-items-center ml-2">
                <LazyImage src={Icon} width={32} height={32} />
              </div>
              <div>
                <div
                  style={{ color: night }}
                  className="u-fontMedium text-right mb-2"
                >
                  {title}
                </div>
                <div
                  style={{ color: pollution }}
                  className="u-fontSmall text-right"
                >
                  {description}
                </div>
              </div>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default CustomizedSelect;
