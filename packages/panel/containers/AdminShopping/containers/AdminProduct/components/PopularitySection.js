import React, { useState } from "react";
import Collapse from "@material-ui/core/Collapse";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import Input from "@saas/components/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import IconButton from "@material-ui/core/IconButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import AdminProductInBoxWrapper from "./AdminProductInBoxWrapper";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
export default function PopularitySection({
  product,
  setProduct,
  onProductPopularityChange,
}) {
  const { priority } = product;
  const [collapse, setCollapse] = useState(parseInt(priority, 10) !== 100);
  const { minWidth768 } = useResponsive();

  const togglePopularityCollapse = (e) => {
    setCollapse(e.target.checked);
    if (!e.target.checked) {
      setProduct({
        ...product,
        priority: 100,
      });
    }
  };

  return (
    <AdminProductInBoxWrapper smallPadding>
      <div className={"col-12"}>
        <div className="d-flex justify-content-between flex-1 py-2">
          <div>
            <div className="u-fontLarge u-fontWeightBold">Priority(Popularity)</div>
            {minWidth768 ? (
              <div className="mt-2" style={{ color: "rgba(0, 0, 0, 0.6)" }}>
                By increasing or decreasing priority, the status of this product at the time of displaying in
                Change the lists. The default number is intended.
              </div>
            ) : null}
          </div>
          <div
            className={
              "w-100 d-flex justify-content-between align-items-center"
            }
            style={{ width: 80 }}
          >
            <FormControlLabel
              className="ml-0"
              control={
                <Switch
                  size="small"
                  checked={collapse}
                  onChange={togglePopularityCollapse}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  color="primary"
                />
              }
              labelPlacement="start"
              label=""
            />
            {collapse ? "active" : "Inactive"}
          </div>
        </div>
        <Collapse in={collapse}>
          <div className="position-relative col-12 p-4">
            <Input
              size="medium"
              numberOnly
              value={englishNumberToPersianNumber(parseInt(priority, 10))}
              onChange={onProductPopularityChange}
              label="Priority"
              labelPlacement="top"
              placeholder="Priority Number(Default)"
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    style={{ position: "absolute", left: 3 }}
                    position="start"
                  >
                    <div
                      className="d-flex flex-column align-items-center justify-content-center"
                      style={{ width: 18, height: 18 }}
                    >
                      <IconButton
                        className="p-1"
                        onClick={() => {
                          const number = parseInt(priority, 10) + 1;
                          setProduct({ ...product, priority: number });
                        }}
                      >
                        <KeyboardArrowUpIcon
                          className="u-cursor-pointer"
                          style={{ fontSize: 12 }}
                        />
                      </IconButton>
                      <IconButton
                        className="p-1"
                        onClick={() => {
                          const number = parseInt(priority, 10) - 1;
                          if (number >= 0)
                            setProduct({ ...product, priority: number });
                        }}
                      >
                        <KeyboardArrowDownIcon
                          className="u-cursor-pointer"
                          style={{ fontSize: 12 }}
                        />
                      </IconButton>
                    </div>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </Collapse>
      </div>
    </AdminProductInBoxWrapper>
  );
}
