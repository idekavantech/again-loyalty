import React, { useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import { borderColor, dust } from "@saas/utils/colors";
import Skeleton from "@material-ui/lab/Skeleton";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import Button from "@material-ui/core/Button";
import TableRow from "@material-ui/core/TableRow";
import {
  ITEM_RECEIVE_REASON_RECEIVED,
  purchaseLogStatusOptions,
  units,
} from "store/constants";
import Paper from "@material-ui/core/Paper";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ModalHeader from "@saas/components/Modal/ModalHeader";
import Input from "@saas/components/Input";
import MaterialModal from "@material-ui/core/Modal";
import useTheme from "@material-ui/core/styles/useTheme";
export default function ReceivedItemRow({
  item,
  loading,
  type,
  onDelete,
  addReception,
  disabled,
}) {
  const theme = useTheme();
  const { id, title, unit, amount, price, reason } = item;
  const isMock = !id;
  const unitText = (units.find((u) => u.english === unit) || units[0])?.persian;
  const [modal, setModal] = useState(null);
  const [error, setError] = useState("");
  const [receptionAmount, setReceptionAmount] = useState("");
  return (
    <>
      <TableRow className={loading ? "u-pointer-events-none" : ""}>
        <TableCell
          style={{
            borderLeft: `1px solid ${borderColor}`,
            borderBottom: `1px solid ${borderColor}`,
            verticalAlign: isMock ? "middle" : "top",
          }}
          scope="row"
          className="h-100 p-0"
          align="right"
        >
          {isMock ? (
            <div className="d-flex align-items-center p-2">
              <Skeleton className="w-100" />
            </div>
          ) : (
            <div className="text-right w-100 p-2"></div>
          )}
        </TableCell>
        <TableCell
          style={{
            borderLeft: `1px solid ${borderColor}`,
            borderBottom: `1px solid ${borderColor}`,
            verticalAlign: isMock ? "middle" : "top",
          }}
          scope="row"
          className="h-100 p-0"
          align="right"
        >
          {isMock ? (
            <div className="d-flex align-items-center p-2">
              <Skeleton className="w-100" />
            </div>
          ) : (
            <div className="text-right w-100 p-2"></div>
          )}
        </TableCell>
        <TableCell
          style={{
            borderLeft: `1px solid ${borderColor}`,
            borderBottom: `1px solid ${borderColor}`,
          }}
          scope="row"
          className="h-100 p-0"
          align="right"
        >
          {isMock ? (
            <div className="d-flex align-items-center p-2">
              <Skeleton className="w-100" />
            </div>
          ) : (
            <div className="d-flex justify-content-between align-items-center w-100 p-2"></div>
          )}
        </TableCell>
        <TableCell
          style={{
            borderLeft: `1px solid ${borderColor}`,
            borderBottom: `1px solid ${borderColor}`,
          }}
          scope="row"
          className="h-100 p-0"
          align="right"
        >
          {isMock ? (
            <div className="d-flex align-items-center p-2">
              <Skeleton className="w-100" />
            </div>
          ) : (
            <div className="d-flex justify-content-between align-items-center w-100 p-2">
              <div>{englishNumberToPersianNumber(amount)}</div>
              <div className="text-nowrap mr-2" color="text.quaternary">
                {unitText}
              </div>
            </div>
          )}
        </TableCell>
        <TableCell
          style={{
            borderLeft: `1px solid ${borderColor}`,
            borderBottom: `1px solid ${borderColor}`,
          }}
          scope="row"
          className="h-100 p-0"
          align="right"
        >
          {isMock ? (
            <div className="d-flex align-items-center p-2">
              <Skeleton className="w-100" />
            </div>
          ) : (
            <div className="d-flex justify-content-between align-items-center w-100 p-2">
              <div>{priceFormatter(price)}</div>
              <div
                className="text-nowrap mr-2"
                style={{ color: theme.palette.text.quaternary }}
              >
                $/{unitText}
              </div>
            </div>
          )}
        </TableCell>
        <TableCell
          style={{
            borderLeft: `1px solid ${borderColor}`,
            borderBottom: `1px solid ${borderColor}`,
          }}
          scope="row"
          className="h-100 p-0"
          align="right"
        >
          {isMock ? (
            <div className="d-flex align-items-center p-2">
              <Skeleton className="w-100" />
            </div>
          ) : (
            <div className="d-flex justify-content-between align-items-center w-100 p-2">
              <div>{priceFormatter(price * amount || 0)}</div>
              <div
                className="text-nowrap mr-2"
                style={{ color: theme.palette.text.quaternary }}
              >
                $/{unitText}
              </div>
            </div>
          )}
        </TableCell>
        <TableCell
          style={{
            borderLeft: `1px solid ${borderColor}`,
            borderBottom: `1px solid ${borderColor}`,
            width: 140,
          }}
          scope="row"
          className="h-100 p-0"
          align="right"
        >
          {isMock ? (
            <div className="d-flex align-items-center p-2">
              <Skeleton className="w-100" />
            </div>
          ) : (
            <div className="d-flex align-items-center justify-content-between w-100 p-2">
              {type === "current" ? (
                <>
                  <Button
                    color="primary"
                    onClick={() => {
                      setModal(ITEM_RECEIVE_REASON_RECEIVED);
                    }}
                    disabled={disabled}
                  >
                    I received
                  </Button>
                </>
              ) : type === "history" ? (
                <div
                  style={{
                    color: purchaseLogStatusOptions.find(
                      (o) => o.status === reason
                    )?.color,
                  }}
                >
                  {
                    purchaseLogStatusOptions.find((o) => o.status === reason)
                      ?.text
                  }
                </div>
              ) : type === "reception" ? (
                <>
                  <div style={{ color: theme.palette.text.disabled }}>
                    {
                      purchaseLogStatusOptions.find((o) => o.status === reason)
                        ?.text
                    }
                  </div>
                  <Button
                    variant="text"
                    style={{ minWidth: 0 }}
                    className="u-fontWeightNormal py-1 px-2"
                    color="primary"
                    onClick={onDelete}
                    disabled={disabled}
                  >
                    Delete
                  </Button>
                </>
              ) : null}
            </div>
          )}
        </TableCell>
      </TableRow>
      <MaterialModal
        disableEnforceFocus
        open={modal !== null}
        onClose={() => setModal(null)}
        closeAfterTransition
        className={`d-flex align-items-center justify-content-center`}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
        }}
      >
        <Fade in={modal !== null}>
          <Paper
            elevation={3}
            className="d-flex flex-column overflow-hidden"
            style={{ height: 300, width: "100%", maxWidth: 600 }}
          >
            <ModalHeader
              onRightClick={() => setModal(null)}
              title={
                purchaseLogStatusOptions.find((o) => o.status === modal)
                  ?.modalText
              }
            />
            <Paper className="flex-1 p-5">
              <div style={{ border: `1px solid ${dust}`, borderBottom: 0 }}>
                <div
                  style={{ borderBottom: `1px solid ${dust}` }}
                  className="d-flex col-12 px-0 align-items-center"
                >
                  <div
                    style={{
                      height: 40,
                      backgroundColor: theme.palette.background.paper,
                    }}
                    className="d-flex align-items-center u-text-ellipse px-3 col-5"
                  >
                    The name of the item
                  </div>
                  <div
                    style={{
                      borderRight: `1px solid ${dust}`,
                      height: 40,
                      backgroundImage:
                        "repeating-linear-gradient(45deg,transparent,transparent 1px,#fff 1px,#fff 5px,transparent 5px,transparent 6px,#fff 6px,#fff 10px)",
                      backgroundColor: dust,
                    }}
                    className="u-text-ellipse px-3 col-7 d-flex align-items-center direction-ltr justify-content-end"
                  >
                    {title}
                  </div>
                </div>
                <div
                  style={{ borderBottom: `1px solid ${dust}` }}
                  className="d-flex col-12 px-0 align-items-center"
                >
                  <div
                    style={{
                      height: 40,
                      backgroundColor: theme.palette.background.paper,
                    }}
                    className="d-flex align-items-center u-text-ellipse px-3 col-5"
                  >
                    the amount of
                  </div>
                  <div
                    style={
                      error
                        ? {
                            height: 40,
                            border: `1px solid ${theme.palette.error.main}`,
                          }
                        : {
                            borderRight: `1px solid ${dust}`,
                            height: 40,
                          }
                    }
                    className="u-text-ellipse col-7 p-0"
                  >
                    <Input
                      margin="dense"
                      tableInput
                      numberOnly
                      className="h-100 px-3 w-100"
                      inputProps={{ className: "px-0" }}
                      onFocus={() => {
                        setError("");
                      }}
                      value={englishNumberToPersianNumber(receptionAmount, "")}
                      onChange={(amount) => {
                        setReceptionAmount(persianToEnglishNumber(amount));
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-2" style={{ color: theme.palette.error.main }}>
                {error}
              </div>
            </Paper>
            <Paper
              elevation={2}
              style={{ borderRadius: 0 }}
              className="sticky-bottom p-3 d-flex flex-row-reverse"
            >
              <Button
                onClick={() => {
                  if (!receptionAmount)
                    setError(
                      `${
                        purchaseLogStatusOptions.find((o) => o.status === modal)
                          ?.modalText
                      }
                      Not valid.`
                    );
                  addReception(parseInt(receptionAmount), modal);
                  setModal(null);
                }}
                color="primary"
                variant="contained"
              >
                Store
              </Button>
            </Paper>
          </Paper>
        </Fade>
      </MaterialModal>
    </>
  );
}
