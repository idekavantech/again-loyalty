import React, { memo, useState } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@saas/components/Modal";
import Input from "@saas/components/Input";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import ModalHeader from "@saas/components/Modal/ModalHeader";
function RowModal({ onClose, isOpen, accept, loading }) {
  const [duration, setDuration] = useState("");
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      header={<ModalHeader onRightClick={onClose} />}
      body={
        <div className="u-relative flex-1 d-flex flex-column">
          <div className="d-flex flex-column flex-1 u-mt-50 p-3 u-border-top-5">
            <div className="u-text-black">
              Enter the estimated preparation and submission time of this order.
            </div>
            <Input
              className="mt-2"
              noModal
              numberOnly
              label="period of time(Minutes)"
              value={duration ? englishNumberToPersianNumber(duration) : ""}
              onChange={(value) => setDuration(persianToEnglishNumber(value))}
            />
          </div>
        </div>
      }
      cta={
        <Button
          disabled={loading}
          color="primary"
          variant="contained"
          className="c-btnc-btn-primary u-fontSemiLarge d-flex justify-content-center align-items-center px-2"
          onClick={() => {
            accept(parseInt(duration, 10) * 60);
            onClose();
          }}
        >
          Confirm the order
        </Button>
      }
    />
  );
}

export default memo(RowModal);
