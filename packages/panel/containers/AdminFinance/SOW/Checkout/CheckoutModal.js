import React, { memo, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { cement, jungleI, pollution } from "@saas/utils/colors";
import Divider from "@material-ui/core/Divider";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import Input from "@saas/components/Input";

function CheckoutModal({
  isOpen,
  onClose,
  selectedBranchTitle,
  finalCheckoutPrice,
  checkoutObject,
  submit,
}) {
  const [description, setDescription] = useState("");

  return (
    <Dialog open={isOpen} onClose={onClose} PaperProps={{ className: "w-100" }}>
      <DialogContent>
        <div className="d-flex align-items-center">
          <CheckCircleRoundedIcon
            style={{ color: jungleI }}
            className="ml-2"
            fontSize="small"
          />
          <div style={{ lineHeight: "initial" }} className="u-fontWeightBold">
            تاییده تسویه حساب
          </div>
        </div>
        <Divider style={{ backgroundColor: cement }} className="my-4" />
        <div className="d-flex align-items-center">
          <div className="ml-2">مبلغ تسویه:</div>
          {finalCheckoutPrice !== 0 && (
            <div className="d-flex justify-content-center ml-2">
              <div style={{ direction: "ltr" }} className="ml-1">
                {priceFormatter(finalCheckoutPrice)}
              </div>
              <div>تومان</div>
            </div>
          )}
          <div
            className={checkoutObject.className}
            style={{ color: checkoutObject?.color }}
          >
            {checkoutObject?.text}
          </div>
        </div>
        <div className="d-flex align-items-center mt-4">
          <div className="ml-2">شعبه:</div>
          <div className="ml-2 u-fontWeightBold">{selectedBranchTitle}</div>
        </div>
        <div className="mt-5">توضیحات</div>
        <Input
          className="mt-2 bg-white"
          color="primary"
          onChange={setDescription}
          value={description}
          placeholder="متن توضیحات"
          multiline
        />
        <div className="mt-1 u-font-semi-small" style={{ color: pollution }}>
          در این قسمت می‌توانید توضیحات مربوط به پرداخت را وارد نمایید.
        </div>
        <Divider style={{ backgroundColor: cement }} className="my-4" />
        <div className="mb-3 d-flex flex-column flex-md-row align-items-center justify-content-between">
          <div className="u-fontWeightBold">
            آیا از اطلاعات واردشده اطمینان دارید؟
          </div>
          <div className="mt-md-0 mt-3">
            <Button
              onClick={onClose}
              variant="contained"
              className="u-box-shadow-none u-fontMedium ml-2"
              size="medium"
            >
              لغو
            </Button>
            <Button
              onClick={() => {
                onClose();
                submit(description, setDescription);
              }}
              variant="contained"
              color="primary"
              className="u-box-shadow-none u-fontMedium"
              size="medium"
              disabled={finalCheckoutPrice === 0}
            >
              تایید
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default memo(CheckoutModal);
