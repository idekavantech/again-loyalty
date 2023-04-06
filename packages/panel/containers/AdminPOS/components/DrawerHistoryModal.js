import React, { useEffect, useState } from "react";
import ModalHeader from "@saas/components/Modal/ModalHeader";
import Modal from "@saas/components/Modal";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import Divider from "@material-ui/core/Divider";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { getMonthName } from "@saas/utils/helpers/getMonthName";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import moment from "moment-jalaali";
import {
  CASH_DRAWER_TYPE_CLOSED,
  CASH_DRAWER_TYPE_FINISHED,
  cashDrawerTypes,
} from "containers/AdminPOS/constants";
import Close from "@material-ui/icons/Close";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import Input from "@saas/components/Input";
import Button from "@material-ui/core/Button";

export default function DrawerHistoryModal({
  onClose,
  isOpen,
  isLoading,
  cashDrawers,
  _finishCashDrawer,
}) {
  const [detailsOpen, setDetailsOpen] = useState(null);
  const cashDrawer = detailsOpen || { pos_device: {}, data: { drawer: {} } };
  const [remaining, setRemaining] = useState("");
  const [confirm, setConfirm] = useState(false);
  const {
    id,
    pos_device: { id: pos_id },
    data: {
      drawer: {
        closed_at,
        opened_at,
        balance,
        total_paid_out,
        total_paid_in,
        total_sales,
        total_refunds,
        initial_money,
        final_money,
        diff,
        finisher,
        initializer,
        status,
        description,
      },
    },
  } = cashDrawer;
  const _diff =
    parseInt(status) === parseInt(CASH_DRAWER_TYPE_CLOSED)
      ? diff
      : balance - (remaining || 0);
  const createdAt = moment(opened_at);
  const finishedAt = moment(closed_at);
  useEffect(() => {
    if (!isOpen) {
      setRemaining("");
      setDetailsOpen(null);
      setConfirm(false);
    }
  }, [isOpen]);
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isBig
      header={
        <ModalHeader
          RightIcon={detailsOpen ? ArrowForwardIosRoundedIcon : Close}
          onRightClick={() => {
            if (detailsOpen) setDetailsOpen(null);
            else onClose();
          }}
          title="Fund history"
        />
      }
      body={
        <div className="flex-1 d-flex flex-column px-4">
          {isLoading ? (
            <LoadingIndicator />
          ) : detailsOpen ? (
            <>
              <div className="px-3 py-5 flex-1">
                <div className="u-fontWeightHeavy mb-2"> Fund report</div>
                <Divider />
                <div className="mb-1 mt-2">Start</div>
                {opened_at ? (
                  <>
                    <div className="mb-1">
                      {englishNumberToPersianNumber(
                        `${createdAt.jDate()} ${getMonthName(
                          createdAt.jMonth() + 1
                        )} ${createdAt.jYear()} - ${createdAt.format("HH:mm")}`
                      )}
                    </div>
                    <div className="mb-1"> By{initializer?.name}</div>
                  </>
                ) : (
                  "-"
                )}
                <div className="mb-1 mt-5">End</div>
                {closed_at ? (
                  <>
                    <div className="mb-1">
                      {englishNumberToPersianNumber(
                        `${finishedAt.jDate()} ${getMonthName(
                          finishedAt.jMonth() + 1
                        )} ${finishedAt.jYear()} - ${finishedAt.format(
                          "HH:mm"
                        )}`
                      )}
                    </div>
                    <div className="mb-1"> By{finisher?.name}</div>
                  </>
                ) : (
                  "-"
                )}

                <div className="d-flex justify-content-between mt-5">
                  <div>The expected amount</div>
                  {balance ? (
                    <div className="mt-1">{priceFormatter(balance)} Toman</div>
                  ) : (
                    <div className="mt-1">-</div>
                  )}
                </div>
                <div className="mt-4 mb-5">
                  <div>Description</div>
                  <div className="mt-1">{description || ""}</div>
                </div>
                <div className="mt-5">
                  <Divider />
                  <div className="u-fontWeightBold my-3">Fund report</div>
                  <Divider />
                  <div className="d-flex justify-content-between my-4">
                    <div>The initial amount of the fund</div>
                    <div>{priceFormatter(initial_money)} Toman</div>
                  </div>
                  <div className="d-flex justify-content-between my-4">
                    <div>Cash sales</div>
                    <div>{priceFormatter(total_sales)} Toman</div>
                  </div>
                  <div className="d-flex justify-content-between my-4">
                    <div>Critical return</div>
                    <div>
                      {priceFormatter(total_refunds)}
                      {total_refunds ? "-" : ""} Toman
                    </div>
                  </div>
                  <div className="d-flex justify-content-between my-4">
                    <div>The sum of the received transactions</div>
                    <div>{priceFormatter(total_paid_in)} Toman</div>
                  </div>
                  <div className="d-flex justify-content-between my-4">
                    <div>The sum of paid transactions</div>
                    <div>
                      {priceFormatter(total_paid_out)}
                      {total_paid_out ? "-" : ""} Toman
                    </div>
                  </div>
                  <div className="d-flex justify-content-between my-4">
                    <div>Total transactions</div>
                    <div>
                      {priceFormatter(total_paid_in - total_paid_out)} Toman{" "}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between my-4">
                    <div>The expected amount in the box</div>
                    <div>{priceFormatter(balance)} Toman</div>
                  </div>
                  {parseInt(status) === parseInt(CASH_DRAWER_TYPE_FINISHED) ? (
                    <div className="d-flex flex-wrap mt-2">
                      <div className="mt-2 pt-2" style={{ width: 140 }}>
                        The actual amount in the box:
                      </div>
                      <div style={{ minWidth: 250 }} className="flex-1 mt-2">
                        <Input
                          priceInput
                          placeholder="The actual amount"
                          size="small"
                          value={remaining}
                          onChange={setRemaining}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-between my-4">
                      <div>The actual amount in the box:</div>
                      <div>{priceFormatter(final_money)} Toman</div>
                    </div>
                  )}
                  <div className="d-flex justify-content-between my-4">
                    <div>Disagreement</div>
                    <div>
                      {`${priceFormatter(Math.abs(_diff))}${
                        _diff < 0 ? "-" : ""
                      } Toman`}
                    </div>
                  </div>
                  {parseInt(status) === parseInt(CASH_DRAWER_TYPE_FINISHED) ? (
                    <Button
                      onClick={() => {
                        if (!confirm) {
                          setConfirm(true);
                        } else
                          _finishCashDrawer(
                            pos_id,
                            id,
                            {
                              final_money: parseInt(remaining),
                            },
                            () => {
                              setConfirm(false);
                              setRemaining("");
                              setDetailsOpen(null);
                              onClose();
                            }
                          );
                      }}
                      fullWidth
                      variant={confirm ? "contained" : "outlined"}
                      color="primary"
                      disabled={!remaining}
                    >
                      Close the box
                    </Button>
                  ) : null}
                </div>
              </div>
            </>
          ) : (
            cashDrawers?.map((drawer) => {
              const {
                data: {
                  drawer: { opened_at, status },
                },
              } = drawer;
              const drawerType = cashDrawerTypes.find(
                (_drawer) => parseInt(_drawer.id) === parseInt(status)
              );
              return (
                <>
                  <div
                    onClick={() => setDetailsOpen(drawer)}
                    className="u-cursor-pointer d-flex p-4 align-items-center justify-content-between"
                  >
                    <div className="d-flex align-items-center">
                      <div
                        style={{ marginTop: 2, width: 140 }}
                        className="u-fontWeightHeavy u-fontLarge"
                      >
                        {englishNumberToPersianNumber(
                          moment(opened_at).format("jYYYY/jMM/jDD")
                        )}{" "}
                        |{" "}
                        {englishNumberToPersianNumber(
                          moment(opened_at).format("HH:mm")
                        )}
                      </div>
                      <div
                        style={{
                          backgroundColor: drawerType.surfaceColor,
                          color: drawerType.color,
                          width: 56,
                          height: 24,
                          borderRadius: 10,
                        }}
                        className="d-flex mr-2 align-items-center justify-content-center u-font-semi-small"
                      >
                        {drawerType.text}
                      </div>
                    </div>
                    <ChevronLeftRoundedIcon />
                  </div>
                  <Divider />
                </>
              );
            })
          )}
        </div>
      }
    />
  );
}
