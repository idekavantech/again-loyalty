import React, { memo, useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { graphite, night } from "@saas/utils/colors";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { fonts } from "@saas/utils/themeConfig/constants";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

function FontSection({ _themeConfigFont, changeThemeConfigFont }) {
  const {minWidth576} = useResponsive()
  const { name: _font } = _themeConfigFont;

  const [font, setFont] = useState(null);

  let selectedTempFont = fonts().filter((fontt) => fontt.name === font)[0];

  const handleFontChange = (value) => {
    setFont(value);
    changeThemeConfigFont({
      name: value,
      url: fonts().filter((fontt) => fontt.name === value)[0].url,
    });
  };
  useEffect(() => {
    setFont(_font);
  }, [_font]);

  return (
    <Paper elevation={1} className="d-flex mt-3 py-3 flex-wrap">
      <div className="col-12">
        <div className="u-fontLarge" style={{ color: night }}>
          انتخاب فونت
        </div>
        <div className="my-2">
          <FormControl
            variant="outlined"
            style={{ minWidth: minWidth576 ? "50%" : "100%" }}
          >
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={font}
              onChange={(event) => handleFontChange(event.target.value)}
              inputProps={{ "aria-label": "Without label" }}
              style={{
                fontFamily: selectedTempFont ? selectedTempFont.url : "inherit",
              }}
              className="medium"
            >
              {fonts().map((fontGenerated) => (
                <MenuItem
                  key={fontGenerated.id}
                  value={fontGenerated.name}
                  style={{ fontFamily: fontGenerated.url }}
                >
                  {fontGenerated.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div
          className="u-fontMedium"
          style={{
            color: graphite,
            fontFamily: selectedTempFont ? selectedTempFont.url : "inherit",
          }}
        >
          نمونه فونت: ویترین، نرم‌افزار جامع فروش و بازاریابی
        </div>
      </div>
    </Paper>
  );
}

export default memo(FontSection);
