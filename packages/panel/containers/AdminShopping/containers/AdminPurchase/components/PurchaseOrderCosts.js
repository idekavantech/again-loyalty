import React, { useEffect, useState } from "react";
import { border, dust } from "@saas/utils/colors";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import TomanIcon from "@saas/icons/TomanIcon";
import useTheme from "@material-ui/core/styles/useTheme";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import ModalHeader from "@saas/components/Modal/ModalHeader";
import Input from "@saas/components/Input";
import Button from "@material-ui/core/Button";
import MaterialModal from "@material-ui/core/Modal";

export default function PurchaseOrderCosts({
  purchaseList,
  taxingPrice,
  extraCosts,
  setTax,
  setExtraCosts,
  canEditTax,
  canEditExtraCosts,
  width = 425,
  isShownAllItemsPrice,
  totalInvoiceAmountPrice,
}) {
  const theme = useTheme();
  const allItemsPrice = Object.entries(purchaseList).reduce(
    (a, [, item]) => a + (item.amount || 0) * (item.price || 0),
    0
  );
  const hasTax = taxingPrice !== null && taxingPrice !== undefined;
  const hasExtraCosts = extraCosts !== null && extraCosts !== undefined;
  const [cost, setCost] = useState("");
  const [costError, setCostError] = useState("");
  const [modal, setModal] = useState(null);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  useEffect(() => {
    if (!modal) {
      setCost("");
      setTitle("");
      setTitleError("");
      setCostError("");
    }
  }, [modal]);
  return (
    <div
      style={{ backgroundColor: "#F6F6F7" }}
      className="container bottom-0 w-100 d-flex justify-content-end"
    >
      <div
        style={{
          width,
          maxWidth: "100%",
        }}
      >
        {hasTax || hasExtraCosts ? (
          <div
            className="p-4"
            style={{
              backgroundColor: theme.palette.background.default,
              border: border.subdued,
              width,
            }}
          >
            {totalInvoiceAmountPrice ? (
              <div className="d-flex justify-content-between align-items-center">
                <span className="u-fontWeightHeavy">The sum required</span>
                <div className="u-fontWeightHeavy d-flex">
                  {priceFormatter(totalInvoiceAmountPrice)}
                  <TomanIcon className="mr-1" />
                </div>
              </div>
            ) : null}
            <div className="d-flex justify-content-between align-items-center">
              <span className="u-fontWeightHeavy">
                {isShownAllItemsPrice ? "total" : "The sum of the sums received"}
              </span>
              <div className="u-fontWeightHeavy d-flex">
                {priceFormatter(allItemsPrice)}
                <TomanIcon className="mr-1" />
              </div>
            </div>
            {hasTax ? (
              <div className="d-flex mt-2 justify-content-between align-items-center">
                <span
                  style={
                    canEditTax ? { color: theme.palette.primary.main } : {}
                  }
                  className="u-cursor-pointer u-fontWeightHeavy"
                  onClick={() => {
                    if (!canEditTax) return;
                    setModal({
                      type: "tax",
                      header: "Add tax",
                      title: "Value added tax",
                      hasDelete: Boolean(taxingPrice),
                    });
                    setCost(taxingPrice);
                  }}
                >
                  {taxingPrice || !canEditTax ? "Tax" : "Add tax"}
                </span>
                {taxingPrice ? (
                  <div className="u-fontWeightHeavy d-flex">
                    {priceFormatter(taxingPrice)}
                    <TomanIcon className="mr-1" />
                  </div>
                ) : (
                  <div />
                )}
              </div>
            ) : null}
            {hasExtraCosts ? (
              <div>
                {(extraCosts || []).map((extraCost, index) => (
                  <div
                    key={extraCost.id}
                    className="d-flex mt-2 justify-content-between align-items-center"
                  >
                    <div
                      style={
                        canEditExtraCosts
                          ? { color: theme.palette.primary.main }
                          : {}
                      }
                      className="u-cursor-pointer u-fontWeightHeavy"
                      onClick={() => {
                        if (!canEditExtraCosts) return;
                        setModal({
                          type: "extra_cost",
                          header: "Add an additional cost",
                          title: extraCost.title,
                          index,
                          hasDelete: true,
                        });
                        setCost(extraCost.cost);
                      }}
                    >
                      {extraCost.title}
                    </div>
                    <div className="u-fontWeightHeavy d-flex">
                      {priceFormatter(extraCost.cost)}
                      <TomanIcon className="mr-1" />
                    </div>
                  </div>
                ))}
                {canEditExtraCosts ? (
                  <div
                    style={{ color: theme.palette.primary.main }}
                    className="u-fontWeightHeavy u-cursor-pointer mt-2"
                    onClick={() =>
                      setModal({
                        type: "extra_cost",
                        header: "Add an additional cost",
                      })
                    }
                  >
                    Add an additional cost
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}
        <div
          style={{
            backgroundColor: "#E0E0E0",
            border: border.subdued,
            borderBottomRightRadius: 4,
            borderBottomLeftRadius: 4,
          }}
          className="d-flex p-4 justify-content-between"
        >
          <div>
            <span className="u-fontWeightBold u-fontLarge">Payable</span>
            <span className="u-font-semi-small u-fontWeightBold">
              {" "}
              ($){" "}
            </span>
          </div>
          <div className="u-fontWeightHeavy u-fontLarge d-flex">
            {priceFormatter(
              allItemsPrice +
                (taxingPrice || 0) +
                (extraCosts || []).reduce(
                  (sum, extraCost) => sum + extraCost.cost,
                  0
                ) || 0
            )}
            <TomanIcon className="mr-1" />
          </div>
        </div>
      </div>
      <MaterialModal
        disableEnforceFocus
        open={Boolean(modal)}
        onClose={() => setModal(null)}
        closeAfterTransition
        className={`d-flex align-items-center justify-content-center`}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
        }}
      >
        <Fade in={Boolean(modal)}>
          <Paper
            elevation={3}
            className="d-flex flex-column overflow-hidden"
            style={{ minHeight: 233, width: "100%", maxWidth: 600 }}
          >
            <ModalHeader
              onRightClick={() => setModal(null)}
              title={modal?.header}
            />
            <Paper className="flex-1 p-5">
              <div style={{ border: `1px solid ${dust}`, borderBottom: 0 }}>
                <div
                  style={{ borderBottom: `1px solid ${dust}` }}
                  className="d-flex px-0 align-items-center"
                >
                  <div
                    style={{
                      height: 40,
                      width: 175,
                      backgroundColor: border.subdued,
                    }}
                    className="d-flex align-items-center u-text-ellipse px-3 flex-shrink-0"
                  >
                    Title
                  </div>
                  <div
                    style={{
                      height: 40,
                      border: titleError
                        ? `1px solid ${theme.palette.error.main}`
                        : "none",
                    }}
                    className="u-text-ellipse w-100 p-0"
                  >
                    <Input
                      margin="dense"
                      tableInput
                      disabled={modal?.title}
                      className="h-100 px-3 w-100"
                      inputProps={{ className: "px-0" }}
                      onFocus={() => {
                        setTitleError("");
                      }}
                      value={title || modal?.title}
                      onChange={setTitle}
                    />
                  </div>
                </div>
                <div
                  style={{ borderBottom: `1px solid ${dust}` }}
                  className="d-flex px-0 align-items-center"
                >
                  <div
                    style={{
                      height: 40,
                      width: 175,
                      backgroundColor: border.subdued,
                    }}
                    className="d-flex align-items-center u-text-ellipse px-3 flex-shrink-0"
                  >
                    Amount
                  </div>
                  <div
                    style={{
                      height: 40,
                      border: costError
                        ? `1px solid ${theme.palette.error.main}`
                        : "none",
                    }}
                    className="u-text-ellipse w-100 p-0"
                  >
                    <Input
                      margin="dense"
                      tableInput
                      numberOnly
                      className="h-100 px-3 w-100"
                      inputProps={{ className: "px-0" }}
                      onFocus={() => {
                        setCostError("");
                      }}
                      value={englishNumberToPersianNumber(cost, "")}
                      onChange={(amount) => {
                        setCost(parseInt(persianToEnglishNumber(amount)));
                      }}
                    />
                  </div>
                </div>
              </div>
              {costError ? (
                <div
                  className="mt-2"
                  style={{ color: theme.palette.error.main }}
                >
                  {costError}
                </div>
              ) : null}
              {titleError ? (
                <div
                  className="mt-2"
                  style={{ color: theme.palette.error.main }}
                >
                  {titleError}
                </div>
              ) : null}
            </Paper>
            <Paper className="sticky-bottom u-border-none py-3 px-5 d-flex flex-row-reverse">
              <Button
                onClick={() => {
                  if (!cost) setCostError("Entering the amount is required..");
                  if (!title && !modal.title)
                    setTitleError("Entering the cost of the cost is required.");
                  if (!cost || (!title && !modal.title)) return;
                  if (modal.type === "tax") setTax(cost);
                  else {
                    if (modal.index || modal.index === 0) {
                      const newExtraCosts = [...extraCosts];
                      newExtraCosts[modal.index] = { title: modal.title, cost };
                      setExtraCosts(newExtraCosts);
                    } else setExtraCosts([...extraCosts, { title, cost }]);
                  }
                  setModal(null);
                }}
                color="primary"
                variant="contained"
              >
                Store
              </Button>
              {modal?.hasDelete ? (
                <Button
                  style={{
                    color: theme.palette.error.main,
                    borderColor: theme.palette.error.main,
                  }}
                  className="ml-2"
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    if (modal.type === "extra_cost")
                      setExtraCosts(
                        extraCosts.filter(
                          (extraCost, index) => index !== modal.index
                        )
                      );
                    else setTax(0);
                    setModal(null);
                  }}
                >
                  Delete
                </Button>
              ) : null}
            </Paper>
          </Paper>
        </Fade>
      </MaterialModal>
    </div>
  );
}
