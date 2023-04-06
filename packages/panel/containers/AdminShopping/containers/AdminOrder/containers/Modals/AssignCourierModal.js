import React, { memo, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import Input from "@saas/components/Input";

import InputAdornment from "@material-ui/core/InputAdornment";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";

import { night } from "@saas/utils/colors";
import useTheme from "@material-ui/core/styles/useTheme";
import MenuItem from "@material-ui/core/MenuItem";
import { hexToRGBA } from "@saas/utils/helpers/hexToRGBA";
function AssignCourierModal({ isOpen, onClose, submit, isLoading, couriers }) {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCourier, selectCourier] = useState(null);
  const theme = useTheme();
  return (
    <Dialog open={isOpen} onClose={onClose} PaperProps={{ className: "w-100" }}>
      <DialogContent className="p-0">
        <div
          className="d-flex justify-content-between align-items-center p-4"
          style={{ borderBottom: "1px solid #EDEDED" }}
        >
          <div style={{ color: night, fontWeight: "bold", fontSize: 16 }}>
            Courier Selection
          </div>
          <div>
            <IconButton
              className="p-0"
              onClick={onClose}
              style={{ color: night }}
            >
              <CloseRoundedIcon />
            </IconButton>
          </div>
        </div>
        <div className="p-4">
          <Input
            size="small"
            value={searchValue}
            fullWidth={false}
            onChange={(value) => setSearchValue(value)}
            placeholder="Search"
            inputProps={{
              className: "pr-5 mr-2",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  style={{ position: "absolute", right: 0 }}
                  className={`u-cursor-pointer u-pointer-events-none`}
                  position="start"
                >
                  <SearchRoundedIcon
                    className="ml-1"
                    style={{ color: theme.palette.text.disabled }}
                    fontSize="small"
                  />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="mt-2 mb-2">
          {couriers &&
            Object.entries(couriers)
              ?.filter(
                ([, value]) =>
                  value.name.search(searchValue) > -1 ||
                  value.phone.search(searchValue) > -1
              )
              .map(([courier_id, courier], index) => (
                <MenuItem
                  key={courier_id}
                  className="p-4"
                  style={{
                    borderTop: index === 0 ? "" : "1px solid #EDEDED",
                    background:
                      selectedCourier === courier_id
                        ? hexToRGBA(theme.palette.primary.main, 0.08)
                        : "",
                  }}
                  onClick={() => selectCourier(courier_id)}
                >
                  {courier.name}
                </MenuItem>
              ))}
        </div>
      </DialogContent>
      <DialogActions className="d-flex align-items-center justify-content-center px-4">
        <Button
          onClick={() => {
            submit(selectedCourier);
            onClose();
          }}
          variant="contained"
          color="primary"
          className="w-100 mb-2 u-box-shadow-none u-fontMedium"
          size="large"
          disabled={isLoading}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default memo(AssignCourierModal);
