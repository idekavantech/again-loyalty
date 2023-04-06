import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import DeleteIcon from "@material-ui/icons/Delete";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import PopUp from "@saas/components/PopUp";
import Input from "@saas/components/Input";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Tooltip from "@material-ui/core/Tooltip";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

export default function PosUserItem({
  _updatePosUser,
  _createPosUser,
  user,
  _deletePosUser,
  deviceId,
  clearNewUsers,
}) {
  const [phone, setPhone] = useState(user?.user?.phone_zero_starts);
  const [phoneError, setPhoneError] = useState("");
  const { minWidth992 } = useResponsive();
  const [name, setName] = useState(user?.user_name);
  const [nameError, setNameError] = useState("");
  const [pin, setPin] = useState(user?.code);
  const [pinError, setPinError] = useState("");
  const [enabled, setEnabled] = useState(!user.id);
  const [loading, setLoading] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  const submit = () => {
    let hasError = false;
    if (
      !phone ||
      phone.toString().length !== 11 ||
      phone.toString().substr(0, 2) !== "09"
    ) {
      if (!phone) setPhoneError("Entering the contact number is required..");
      else setPhoneError("The contact number entered is incorrect..");
      hasError = true;
    }
    if (!name) {
      setNameError("Entering user name is required.");
      hasError = true;
    }
    if (pin && pin.length < 4) {
      setPinError("The pin should be exactly 2 digits.");
      hasError = true;
    }

    if (!hasError) {
      setPinError("")
      setPhoneError("")
      setNameError("")
      setLoading(true);
      if (user.id) {
        _updatePosUser(
          deviceId,
          user.id,
          { user_name: name, phone: user?.user?.phone_zero_starts, code: pin },
          () => {
            setLoading(false);
            setEnabled(false);
          }
        );
      } else {
        _createPosUser(
          deviceId,
          { user_name: name, phone , code: pin },
          () => {
            setLoading(false);
            setEnabled(false);
            clearNewUsers();
          }
        );
      }
    }
  };
  const [userDialog, openUserDialog] = useState(null);
  const isNewUser = !Boolean(Object.keys(user).length === 0)
  return (
    <>
      <PopUp
        open={Boolean(userDialog)}
        onClose={() => openUserDialog(null)}
        text="Are you willing to delete the user?"
        submitText="Remove the user"
        closeText="Candifying"
        onSubmit={() => {
          setLoading(true);
          openUserDialog(null);
          _deletePosUser(deviceId, userDialog, () => setLoading(false));
        }}
      />
      <div className="mt-2 px-3 d-flex flex-column flex-lg-row justify-content-between align-items-start">
        <div
          className={`d-flex flex-column flex-lg-row mb-2 ${
            minWidth992 ? "" : "w-100"
          }`}
        >
          <div className="mb-2 flex-shrink-0 mx-lg-2 mt-lg-2">
            User phone number
          </div>
          <Input
            className="mb-2"
            numberOnly
            disabled={isNewUser}
            type="tel"
            value={englishNumberToPersianNumber(phone,"")}
            error={Boolean(phoneError)}
            helperText={phoneError}
            onChange={(value) => {
              setPhoneError("");
              setPhone(persianToEnglishNumber(value));
            }}
            size="medium"
          />
        </div>
        <div
          className={`d-flex flex-column flex-lg-row mb-2 ${
            minWidth992 ? "" : "w-100"
          }`}
        >
          <div className="mb-2 flex-shrink-0 mx-lg-2 mt-lg-2">user name</div>
          <Input
            error={Boolean(nameError)}
            helperText={nameError}
            fullWidth
            className="mb-2"
            value={name}
            onChange={setName}
            size="medium"
            disabled={!enabled}
          />
        </div>
        <div
          className={`d-flex flex-column flex-lg-row mb-2 ${
            minWidth992 ? "" : "w-100"
          }`}
        >
          <div className="mb-2 flex-shrink-0 mx-lg-2 mt-lg-2">Impressive</div>
          <Input
            className="mb-2"
            numberOnly
            type="tel"
            disabled={!enabled}
            helperText={pinError}
            error={Boolean(pinError)}
            value={englishNumberToPersianNumber(pin, "")}
            onChange={(value) => {
              setPinError("");
              if (value.length > 4)
                setPinError("The pin should be exactly 2 digits.");
              else setPin(persianToEnglishNumber(value));
            }}
            size="medium"
            InputProps={{
              endAdornment: (
                <ClickAwayListener onClickAway={() => setTooltip(false)}>
                  <Tooltip
                    PopperProps={{
                      disablePortal: true,
                    }}
                    onClose={() => setTooltip(false)}
                    open={tooltip}
                    placement="top"
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title="Copied!"
                  >
                    <CopyToClipboard
                      className="u-cursor-pointer ml-2"
                      text={pin}
                    >
                      <FileCopyIcon
                        onClick={() => setTooltip(true)}
                        fontSize="small"
                      />
                    </CopyToClipboard>
                  </Tooltip>
                </ClickAwayListener>
              ),
            }}
          />
        </div>

        <div
          className={`d-flex mb-2 align-items-center ${
            minWidth992 ? "mr-2" : "w-100"
          }`}
        >
          <Button
            className={minWidth992 ? "" : "flex-1"}
            variant={enabled ? "contained" : "outlined"}
            style={{ width: 40, height: 40, minWidth: 0 }}
            size="small"
            disabled={loading}
            color="primary"
            onClick={() => {
              if (enabled) submit();
              else setEnabled(true);
            }}
          >
            {enabled ? (
              <CheckRoundedIcon className="mx-2" />
            ) : (
              <EditRoundedIcon className="mx-2" />
            )}
            {!minWidth992 ? (enabled ? "Confirm" : "Edit") : ""}
          </Button>
          <Button
            className="mr-2"
            disabled={loading}
            variant="outlined"
            style={{ width: 40, height: 40, minWidth: 0 }}
            size="small"
            color="primary"
          >
            <DeleteIcon
              onClick={() => {
                if (user.id) openUserDialog(user.id);
                else clearNewUsers();
              }}
              color="inherit"
            />
          </Button>
        </div>
      </div>
    </>
  );
}
