import React, { memo, useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { useRouter } from "next/router";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import Button from "@material-ui/core/Button";
import Input from "@saas/components/Input";
import Divider from "@material-ui/core/Divider";
import CloseCashDrawerModal from "containers/AdminPOS/components/CloseCashDrawerModal";
import CreateTransactionModal from "containers/AdminPOS/components/CreateTransactionModal";
import Dialog from "@material-ui/core/Dialog";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import { border, text } from "@saas/utils/colors";
import {
  CASH_DRAWER_TYPE_CLOSED,
  CASH_DRAWER_TYPE_FINISHED,
  CASH_DRAWER_TYPE_OPEN,
} from "containers/AdminPOS/constants";
import moment from "moment-jalaali";
import DrawerHistoryModal from "containers/AdminPOS/components/DrawerHistoryModal";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

function CashDrawer({
  loading,
  device,
  _createCashDrawer,
  _createCashTransaction,
  _getDevice,
  _closeCashDrawer,
  _finishCashDrawer,
  cashDrawers,
  getCashDrawers,
}) {
  const router = useRouter();
  const { minWidth992 } = useResponsive();
  const [endDrawerModal, setEndDrawerModal] = useState(false);
  const [transactionModal, setTransactionModal] = useState(false);
  const [startingCash, setStartingCash] = useState("");
  const [description, setDescription] = useState(
    device?.active_drawer?.description || ""
  );
  const [dialog, setDialog] = useState("");
  const [error, setError] = useState("");
  const [historyModal, setHistoryModal] = useState(false);
  useEffect(() => {
    getCashDrawers({
      status: `${CASH_DRAWER_TYPE_FINISHED},${CASH_DRAWER_TYPE_CLOSED}`,
      device: device.id,
    });
  }, [device.id]);
  return (
    <div className="mb-4" style={{ borderTop: `1px solid ${border.subdued}` }}>
      <DrawerHistoryModal
        isOpen={historyModal}
        onClose={() => setHistoryModal(false)}
        isLoading={loading}
        cashDrawers={cashDrawers}
        _finishCashDrawer={(posId, drawerId, data, callback) =>
          _finishCashDrawer(posId, drawerId, data, () => {
            callback();
            getCashDrawers({
              status: `${CASH_DRAWER_TYPE_FINISHED},${CASH_DRAWER_TYPE_CLOSED}`,
              device: device.id,
            });
          })
        }
      />
      <Dialog
        PaperProps={{
          style: { width: 200, height: 200 },
          className: "p-3",
        }}
        onClose={() => setDialog("")}
        open={Boolean(dialog)}
      >
        <div className="d-flex flex-1 align-items-center justify-content-center">
          <CheckCircleOutlineRoundedIcon
            color="primary"
            style={{ fontSize: 100 }}
          />
        </div>
        <div className="text-center">{dialog}</div>
      </Dialog>
      <CloseCashDrawerModal
        loading={loading}
        isOpen={endDrawerModal}
        onClose={() => setEndDrawerModal(false)}
        device={device}
        _closeCashDrawer={_closeCashDrawer}
        description={description}
        setDescription={setDescription}
      />
      <CreateTransactionModal
        loading={loading}
        isOpen={transactionModal}
        onClose={() => setTransactionModal(false)}
        _createCashTransaction={_createCashTransaction}
        device={device}
      />

      {!loading ? (
        parseInt(device?.drawer_status) === parseInt(CASH_DRAWER_TYPE_OPEN) ? (
          <>
            <Paper elevation={1} className="py-4 mt-4">
              <div className="px-4">
                <div className="d-flex flex-lg-row flex-column mt-2">
                  <div className="mt-2 pt-2" style={{ width: 140 }}>
                    توضیحات صندوق:
                  </div>
                  <div className="flex-1 mt-2">
                    <Input
                      value={description}
                      placeholder="توضیحات صندوق"
                      size="small"
                      onChange={setDescription}
                    />
                  </div>
                </div>
                <div className="d-flex flex-wrap justify-content-between mb-4">
                  <div className="d-flex flex-wrap">
                    <Button
                      onClick={() => setHistoryModal(true)}
                      className="mt-4 ml-4"
                      color="primary"
                    >
                      تاریخچه صندوق‌ها
                    </Button>
                  </div>
                  <div className="d-flex flex-wrap">
                    <Button
                      onClick={() => {
                        setEndDrawerModal(true);
                      }}
                      className="ml-4 mt-4"
                      variant="contained"
                      color="primary"
                    >
                      بستن صندوق
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className="mt-4"
                      onClick={() => setTransactionModal(true)}
                    >
                      ایجاد تراکنش
                    </Button>
                  </div>
                </div>
              </div>
            </Paper>
            <Paper elevation={1} className="py-4 mt-4 p-5">
              <div className="mb-4 u-fontLarge u-fontWeightHeavy">
                صندوق جاری
              </div>
              <Divider />
              <div className="d-flex justify-content-between my-4">
                <div>زمان آغاز</div>
                <div>
                  {englishNumberToPersianNumber(
                    moment(device?.active_drawer?.opened_at).format(
                      "jYYYY/jMM/jDD"
                    )
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-between my-4">
                <div>آغازکننده</div>
                <div>{device?.active_drawer?.initializer?.name}</div>
              </div>
              <div className="d-flex justify-content-between my-4">
                <div>مجموع تراکنش‌ها</div>
                <div>
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
              <div className="d-flex justify-content-between my-4">
                <div>مجموع تراکنش‌های دریافت شده</div>
                <div>
                  {priceFormatter(device?.active_drawer?.total_paid_in)} تومان
                </div>
              </div>
              <div className="d-flex justify-content-between my-4">
                <div>مجموع تراکنش‌های پرداخت شده</div>
                <div>
                  {priceFormatter(device?.active_drawer?.total_paid_out)}
                  {device?.active_drawer?.total_paid_out ? "-" : ""} تومان
                </div>
              </div>
              <div className="d-flex justify-content-between my-4">
                <div>فروش نقدی</div>
                <div>
                  {priceFormatter(device?.active_drawer?.total_sales)} تومان
                </div>
              </div>
              <div className="d-flex justify-content-between my-4">
                <div>عودت نقدی</div>
                <div>
                  {priceFormatter(device?.active_drawer?.total_refunds)}
                  {device?.active_drawer?.total_refunds ? "-" : ""} تومان
                </div>
              </div>
              <div className="d-flex justify-content-between my-4">
                <div>مبلغ مورد انتظار در صندوق</div>
                <div>
                  {priceFormatter(device?.active_drawer?.balance)} تومان
                </div>
              </div>
              <div className="d-flex justify-content-between my-4">
                <div>مبلغ اولیه صندوق</div>
                <div>
                  {priceFormatter(device?.active_drawer?.initial_money)} تومان
                </div>
              </div>
            </Paper>
          </>
        ) : (
          <Paper elevation={1} className="py-4 mt-4 p-5">
            <div className="mb-2 u-fontLarge u-fontWeightHeavy d-flex align-items-center justify-content-between">
              صندوق پول
              <Button onClick={() => setHistoryModal(true)} color="primary">
                تاریخچه صندوق‌ها
              </Button>
            </div>
            <div className="mb-4">
              با فعال‌سازی صندوق پول، می‌توانید برای دستگاه خود یک صندوق نیز
              تعریف کنید. همچنین می‌توانید صندوق خود را از همین قسمت مدیریت
              کنید.
            </div>
            <Divider />
            <div className="d-lg-flex pt-1 justify-content-between">
              <div
                style={{ marginTop: 20 }}
                className="flex-shrink-0 u-fontLarge u-fontWeightHeavy"
              >
                باز کردن صندوق جدید
              </div>
              <div className="mt-3 flex-1 mx-lg-5 d-lg-flex flex-shrink-0 position-relative">
                <div
                  className={`${
                    minWidth992 ? "ml-2" : "mb-1"
                  } flex-shrink-0 mt-2`}
                >
                  مبلغ اولیه صندوق
                </div>
                <Input
                  value={startingCash}
                  onChange={(value) => {
                    setError("");
                    setStartingCash(value);
                  }}
                  size="small"
                  priceInput
                  error={Boolean(error)}
                  helperText={error}
                />
                <div
                  style={{
                    height: 20,
                    color: text.subdued,
                    marginTop: minWidth992 ? 8 : 32,
                  }}
                  className="position-absolute left-0 u-top-0 ml-2"
                >
                  تومان
                </div>
              </div>
              <Button
                className="mt-3 u-height-36"
                fullWidth={!minWidth992}
                color="primary"
                variant="contained"
                onClick={() => {
                  if (startingCash)
                    _createCashDrawer(
                      router.query.id,
                      { initial_money: startingCash },
                      () => {
                        setDialog("صندوق ایجاد شد.");
                        setTimeout(() => {
                          setDialog("");
                        }, 1500);
                        _getDevice(router.query.id);
                      }
                    );
                  else setError("مبلغ اولیه صندوق را وارد کنید.");
                }}
              >
                باز کردن صندوق
              </Button>
            </div>
          </Paper>
        )
      ) : (
        <LoadingIndicator />
      )}
    </div>
  );
}

export default memo(CashDrawer);
