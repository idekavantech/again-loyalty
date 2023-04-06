import React, { useEffect, useState } from "react";
import ModalHeader from "@saas/components/Modal/ModalHeader";
import Button from "@material-ui/core/Button";
import Modal from "@saas/components/Modal";
import Input from "@saas/components/Input";
import Divider from "@material-ui/core/Divider";
import { useRouter } from "next/router";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";

export default function CreateTransactionModal({
  onClose,
  isOpen,
  _createCashTransaction,
  loading,
  device,
}) {
  const [confirmIn, setConfirmIn] = useState(false);
  const [confirmOut, setConfirmOut] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (isOpen === false) {
      setConfirmIn(false);
      setConfirmOut(false);
      setAmount("");
      setDescription("");
    }
  }, [isOpen]);
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isBig
      header={<ModalHeader onRightClick={onClose} title="ایجاد تراکنش" />}
      body={
        <div className="flex-1 d-flex flex-column p-4">
          <div className="d-flex flex-wrap mt-2">
            <div className="mt-2 pt-2" style={{ width: 140 }}>
              مقدار تراکنش (تومان):
            </div>
            <div style={{ minWidth: 250 }} className="flex-1 mt-2">
              <Input
                placeholder="مقدار تراکنش"
                size="small"
                value={amount}
                priceInput
                onChange={setAmount}
              />
            </div>
          </div>
          <div className="d-flex flex-wrap mt-2">
            <div className="mt-2 pt-2" style={{ width: 140 }}>
              توضیحات تراکنش:
            </div>
            <div style={{ minWidth: 250 }} className="flex-1 mt-2">
              <Input
                value={description}
                onChange={setDescription}
                placeholder="توضیحات تراکنش"
                size="small"
              />
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <Button
              disabled={!amount || !description || loading}
              style={{ width: "calc(50% - 20px)" }}
              onClick={() => {
                if (!confirmIn) {
                  setConfirmOut(false);
                  setConfirmIn(true);
                } else
                  _createCashTransaction(
                    router.query.id,
                    { amount: parseInt(amount), description },
                    () => {
                      setConfirmIn(false);
                      setAmount("");
                      setDescription("");
                      onClose();
                    }
                  );
              }}
              fullWidth
              variant={confirmIn ? "contained" : "outlined"}
              color="primary"
              className="my-4"
            >
              {confirmIn ? "تایید دریافت" : "دریافت شده"}
            </Button>
            <Button
              disabled={!amount || !description || loading}
              style={{ width: "calc(50% - 20px)" }}
              onClick={() => {
                if (!confirmOut) {
                  setConfirmIn(false);
                  setConfirmOut(true);
                } else
                  _createCashTransaction(
                    router.query.id,
                    { amount: -1 * parseInt(amount), description },
                    () => {
                      setConfirmOut(false);
                      setAmount("");
                      setDescription("");
                      onClose();
                    }
                  );
              }}
              fullWidth
              variant={confirmOut ? "contained" : "outlined"}
              color="primary"
              className="my-4"
            >
              {confirmOut ? "تایید پرداخت" : "پرداخت شده"}
            </Button>
          </div>
          <Divider />
          <div className="u-fontWeightHeavy u-fontLarge mt-5">تراکنش‌ها</div>
          {device ? (
            <div className="d-flex justify-content-between mt-5">
              <div>مجموع تراکنش‌ها</div>
              <div>
                {" "}
                {priceFormatter(
                  Math.abs(
                    device?.active_drawer?.total_paid_in -
                      device?.active_drawer?.total_paid_out
                  )
                )}
                {device?.active_drawer?.total_paid_out >
                device?.active_drawer?.total_paid_in
                  ? "-"
                  : ""}{" "}
                تومان{" "}
              </div>
            </div>
          ) : null}
        </div>
      }
    />
  );
}
