import React, { memo, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { night } from "@saas/utils/colors";
import IconButton from "@material-ui/core/IconButton";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import Radio from "@material-ui/core/Radio";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

let timeoutId = null;

export function AssignCustomerModal({
  isOpen,
  onClose,
  submit,
  isLoading,
  searchMembership,
  searchedMembership,
}) {
  const [phone, setPhone] = useState("");
  const [selectedUser, selectUser] = useState(null);
  useEffect(() => {
    if (phone !== null && phone !== "") {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        searchMembership({ phone: +phone });
      }, 500);
    }
  }, [phone]);
  return (
    <Dialog open={isOpen} onClose={onClose} PaperProps={{ className: "w-100" }}>
      <DialogContent>
        <div
          className="d-flex justify-content-between align-items-center p-4"
          style={{ borderBottom: "1px solid #EDEDED" }}
        >
          <div style={{ color: night, fontWeight: "bold", fontSize: 16 }}>
            Customer Selection
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
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          className="w-100 mt-5"
          value={englishNumberToPersianNumber(phone, "")}
          onChange={(event) =>
            setPhone(persianToEnglishNumber(event.target.value))
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" style={{ color: night }}>
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          }}
        />
        <div className="mt-5" style={{ borderTop: "1px solid #EDEDED" }}>
          {searchedMembership?.length ? (
            searchedMembership?.map((member) => {
              return (
                <div
                  key={member.id}
                  className="d-flex align-items-center py-3"
                  style={{ borderBottom: "1px solid #EDEDED" }}
                >
                  <Radio
                    checked={+selectedUser === member.user.id}
                    onChange={(event) => selectUser(event.target.value)}
                    value={member.user.id}
                    color="primary"
                  />
                  <div className="d-flex flex-column">
                    <div>{englishNumberToPersianNumber(member.user.name)}</div>
                    <div className="mt-2">
                      {englishNumberToPersianNumber(
                        member.user.phone.replace("+", "").substring(2)
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-3 d-flex align-items-center justify-content-center u-fontVeryLarge u-fontWeightBold">
              There was no result!
            </div>
          )}
        </div>
      </DialogContent>
      <DialogActions
        className="d-flex align-items-center justify-content-between p-4"
        style={{ borderTop: "1px solid #EDEDED" }}
      >
        <Button
          onClick={() => {
            submit(selectedUser);
            onClose();
          }}
          variant="contained"
          color="primary"
          className="u-box-shadow-none u-fontMedium"
          size="medium"
          disabled={isLoading}
        >
          Confirm
        </Button>
        <Button
          onClick={onClose}
          variant="outlined"
          color="primary"
          className="u-box-shadow-none u-fontMedium"
          size="medium"
          style={{
            marginLeft: 0,
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default memo(AssignCustomerModal);
