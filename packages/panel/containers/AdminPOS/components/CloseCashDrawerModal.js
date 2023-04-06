import React, { useEffect, useState } from "react";
import ModalHeader from "@saas/components/Modal/ModalHeader";
import Button from "@material-ui/core/Button";
import Modal from "@saas/components/Modal";
import Input from "@saas/components/Input";
import Divider from "@material-ui/core/Divider";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import { text } from "@saas/utils/colors";
import moment from "moment-jalaali";
import { useRouter } from "next/router";
import ConfirmFinishCashDrawer from "containers/AdminPOS/components/ConfirmFinishCashDrawer";

export default function CloseCashDrawerModal({
  onClose,
  isOpen,
  device,
  loading,
  description,
  setDescription,
  _closeCashDrawer,
}) {
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);
  const [remaining, setRemaining] = useState("");
  const [dialog, setDialog] = useState(false);
  useEffect(() => {
    if (isOpen === false) {
      setConfirm(false);
      setRemaining("");
    }
  }, [isOpen]);
  if (!device?.active_drawer) return null;
  const {
    active_drawer: {
      balance,
      initial_money,
      opened_at,
      total_paid_in,
      total_paid_out,
      total_sales,
      total_refunds,
      initializer,
    },
  } = device;
  const submit = () => {
    _closeCashDrawer(
      router.query.id,
      { final_money: parseInt(remaining) || null, description },
      () => {
        setConfirm(false);
        setRemaining("");
        setDescription("");
        onClose();
      }
    );
  };
  return (
    <>
      <ConfirmFinishCashDrawer
        isOpen={dialog}
        onClose={() => setDialog(false)}
        submit={submit}
      />
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isBig
        header={<ModalHeader onRightClick={onClose} title="بستن صندوق" />}
        body={
          <div className="flex-1 d-flex flex-column p-4">
            <Divider />
            <div className="d-flex align-items-center justify-content-between mt-4">
              <div>مبلغ مورد انتظار در صندوق</div>
              <div className="d-flex align-items-center u-fontLarge u-fontWeightHeavy">
                <div className="direction-ltr">{priceFormatter(balance)}</div>
                <div className="mr-1">تومان</div>
              </div>
            </div>
            <div className="d-flex flex-wrap mt-2">
              <div className="mt-2 pt-2" style={{ width: 140 }}>
                مبلغ واقعی در صندوق:
              </div>
              <div style={{ minWidth: 250 }} className="flex-1 mt-2">
                <Input
                  priceInput
                  placeholder="مبلغ واقعی"
                  size="small"
                  value={remaining}
                  onChange={setRemaining}
                />
              </div>
            </div>
            <div className="d-flex mt-2 flex-wrap">
              <div className="mt-2 pt-2" style={{ width: 140 }}>
                توضیحات صندوق:
              </div>
              <div style={{ minWidth: 250 }} className="flex-1 mt-2">
                <Input
                  value={description}
                  onChange={setDescription}
                  placeholder="توضیحات صندوق"
                  size="small"
                />
              </div>
            </div>
            {remaining ? (
              <div className="u-height-24 d-flex align-items-center justify-content-between mt-5">
                <div>اختلاف</div>
                <div className="d-flex align-items-center u-fontLarge u-fontWeightHeavy">
                  <div className="direction-ltr">
                    {priceFormatter(balance - parseInt(remaining))}
                  </div>
                  <div className="mr-1">تومان</div>
                </div>
              </div>
            ) : (
              <div
                style={{ color: text.subdued }}
                className="u-height-24 text-center mt-5 u-font-semi-small"
              >
                همچنین می توانید مبلغ واقعی صندوق را در سابقه کشو وارد کنید.
              </div>
            )}
            <Button
              disabled={loading}
              onClick={() => {
                if (!confirm) setConfirm(true);
                else {
                  if (remaining) submit();
                  else setDialog(true);
                }
              }}
              fullWidth
              variant={confirm ? "contained" : "outlined"}
              color="primary"
              className="mt-4 mb-5"
            >
              {confirm ? "تایید بستن صندوق" : "بستن صندوق"}
            </Button>
            <Divider />
            <div className="u-fontWeightHeavy u-fontLarge mt-5 mb-3">
              صندوق جاری
            </div>
            <div className="d-flex justify-content-between my-3">
              <div>زمان آغاز</div>
              <div>
                {englishNumberToPersianNumber(
                  moment(opened_at).format("jYYYY/jMM/jDD")
                )}
              </div>
            </div>
            <div className="d-flex justify-content-between my-3">
              <div>آغازکننده</div>
              <div>{initializer?.name}</div>
            </div>
            <div className="d-flex justify-content-between my-3">
              <div>مجموع تراکنش‌ها</div>
              <div>
                {priceFormatter(Math.abs(total_paid_in - total_paid_out))}
                {total_paid_out > total_paid_in ? "-" : ""} تومان{" "}
              </div>
            </div>
            <div className="d-flex justify-content-between my-3">
              <div>مجموع تراکنش‌های دریافت شده</div>
              <div>{priceFormatter(total_paid_in)} تومان</div>
            </div>
            <div className="d-flex justify-content-between my-3">
              <div>مجموع تراکنش‌های پرداخت شده</div>
              <div>
                {priceFormatter(total_paid_out)}
                {total_paid_out ? "-" : ""} تومان
              </div>
            </div>
            <div className="d-flex justify-content-between my-3">
              <div>فروش نقدی</div>
              <div>{priceFormatter(total_sales)} تومان</div>
            </div>
            <div className="d-flex justify-content-between my-3">
              <div>عودت نقدی</div>
              <div>
                {priceFormatter(total_refunds)}
                {total_refunds ? "-" : ""} تومان
              </div>
            </div>
            <div className="d-flex justify-content-between my-3">
              <div>مبلغ مورد انتظار در صندوق</div>
              <div>{priceFormatter(balance)} تومان</div>
            </div>
            <div className="d-flex justify-content-between my-3">
              <div>مبلغ اولیه صندوق</div>
              <div>{priceFormatter(initial_money)} تومان</div>
            </div>
          </div>
        }
      />
    </>
  );
}
