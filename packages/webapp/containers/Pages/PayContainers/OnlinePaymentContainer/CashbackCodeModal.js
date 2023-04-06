import React, { useEffect, useRef, useState } from "react";
import ModalHeader from "@saas/components/Modal/ModalHeader";
import Modal from "@saas/components/Modal";
import Paper from "@material-ui/core/Paper";
import Input from "@saas/components/Input";
import Button from "@material-ui/core/Button";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

export default function CashbackCodeModal({
  open,
  onClose,
  setCode,
  _validateCashbackCode,
}) {
  const {minWidth768  } = useResponsive();
  const [tempCode, setTempCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const inputRef = useRef();
  useEffect(() => {
    if (open)
      setTimeout(() => {
        inputRef.current?.click();
        inputRef.current?.focus();
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
      }, 500);
    else {
      setTimeout(() => {
        setTempCode("");
      }, 100);
    }
  }, [open]);
  return (
    <Modal
      onClose={onClose}
      isOpen={open}
      style={minWidth768 ? {} : { height: 270, margin: "initial" }}
      header={<ModalHeader onRightClick={onClose} />}
      className={`d-flex ${
        minWidth768 ? "align-items-center" : "align-items-end"
      }`}
      body={
        <Paper className="h-100 px-4 py-5 w-100">
          <div className="mb-2">کد پرداخت</div>
          <Input
            color="secondary"
            size="small"
            value={tempCode}
            onChange={(value) => {
              setCodeError("");
              setTempCode(value);
            }}
            inputRef={inputRef}
            autoFocus
            error={Boolean(codeError)}
            helperText={codeError}
          />
        </Paper>
      }
      cta={
        <Button
          onClick={() => {
            _validateCashbackCode(tempCode, (verified) => {
              if (verified) {
                setCode(tempCode);
                onClose();
              } else setCodeError("کد وارد شده نادرست است.");
            });
          }}
          variant="contained"
          color="secondary"
          fullWidth
        >
          اعمال کد
        </Button>
      }
    />
  );
}
