import React, { memo, useEffect, useState } from "react";
import { createStructuredSelector } from "reselect";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { makeSelectBranches } from "@saas/stores/business/selector";
import { connect } from "react-redux";
import { compose } from "redux";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { dust, surface, borderColor } from "@saas/utils/colors";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Skeleton from "@material-ui/lab/Skeleton";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import { units } from "store/constants";
import Button from "@material-ui/core/Button";
import {
  acceptSubmittedPurchase,
  applySubmittedPurchase,
  getPurchase,
} from "store/actions";
import useTheme from "@material-ui/core/styles/useTheme";
import { useRouter } from "next/router";
import { makeSelectPurchase } from "store/selectors";
import Popover from "@material-ui/core/Popover";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Divider from "@material-ui/core/Divider";
import moment from "moment-jalaali";
import ModalHeader from "@saas/components/Modal/ModalHeader";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import MaterialModal from "@material-ui/core/Modal";
import Input from "@saas/components/Input";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import ItemNoteModal from "containers/AdminShopping/containers/AdminPurchase/components/ItemNoteModal";
import PurchaseOrderExcelExport from "containers/AdminShopping/containers/AdminPurchase/components/PurchaseOrderExcelExport";
import CancelPurchaseOrder from "containers/AdminShopping/containers/AdminPurchase/components/CancelPurchaseOrder";
import PurchaseOrderCosts from "containers/AdminShopping/containers/AdminPurchase/components/PurchaseOrderCosts";

const headCells = [
  {
    id: "name",
    align: "right",
    label: "Product Name",
    minWidth: 200,
  },
  {
    id: "invoice",
    align: "right",
    label: "Request",
  },
  {
    id: "supplied",
    align: "right",
    label: "Supply",
  },
  {
    id: "submitted",
    align: "right",
    label: "Final",
    minWidth: 140,
  },
  {
    id: "description",
    align: "right",
    label: "Note",
  },
  {
    id: "cost",
    align: "right",
    label: "Unit price",
  },
  {
    id: "total",
    align: "right",
    label: "Total price",
  },
  {
    id: "total",
    align: "right",
    label: "Determine the status",
    onlyPending: true,
  },
];

function AdminPendingCustomerPurchase({
  loading,
  _getPurchase,
  purchase,
  _applySubmittedOrder,
  _acceptSubmittedPurchase,
  isSuper,
}) {
  const [editable, setEditable] = useState(false);
  const router = useRouter();
  const [purchaseList, setPurchaseList] = useState({});
  const [tempPurchaseList, setTempPurchaseList] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState({});
  const [modal, setModal] = useState(null);
  const [noteModal, setNoteModal] = useState(null);
  const theme = useTheme();
  const purchaseId = router.query.id;
  useEffect(() => {
    setTimeout(() => {
      _getPurchase(purchaseId);
    }, 0);
  }, [purchaseId]);
  if (!purchase) return <LoadingIndicator />;
  const expectedDate = new Date(purchase?.expected_date_to_receive);
  const createdDate = new Date(purchase?.created_at);
  const expectedTime = moment(
    `${expectedDate.getFullYear()}-${
      expectedDate.getMonth() + 1
    }-${expectedDate.getDate()}`,
    "YYYY-MM-DD"
  );
  const createdTime = moment(
    `${createdDate.getFullYear()}-${
      createdDate.getMonth() + 1
    }-${createdDate.getDate()}  ${createdDate.getHours()}:${createdDate.getMinutes()}`,
    "YYYY-MM-DD HH:mm"
  );
  const isPendingReview = purchase.status === 3;
  const shouldEditPurchaseOrder = purchase.items.some(
    (item) =>
      purchaseList[item.id] &&
      parseInt(purchaseList[item.id].amount) !== parseInt(item.supplied_amount)
  );
  const submit = () => {
    if (shouldEditPurchaseOrder)
      _applySubmittedOrder(purchaseId, {
        order_items: purchase.items.map((item) => ({
          id: item.id,
          content_type_class: item.content_type_class,
          object_id: item.object_id,
          price: item.price,
          invoice_amount: purchaseList[item.id]
            ? parseInt(purchaseList[item.id].amount)
            : item.supplied_amount,
          description: item.description || "",
        })),
      });
    else _acceptSubmittedPurchase(purchaseId);
  };
  const save = () => {
    setEditable(false);
    setPurchaseList({ ...purchaseList, ...tempPurchaseList });
    setTempPurchaseList({});
  };
  return (
    <>
      <div className="container">
        <AdminBreadCrumb
          isLoading={loading}
          responsive={false}
          submitAction={editable ? save : submit}
          submitButtonText={
            isPendingReview
              ? editable
                ? "Store"
                : shouldEditPurchaseOrder
                ? "Correction of the purchase document"
                : "Verify and start receiving"
              : ""
          }
          buttons={
            editable ? (
              <Button
                style={{
                  color: theme.palette.error.main,
                  borderColor: theme.palette.error.main,
                }}
                onClick={() => {
                  setTempPurchaseList({});
                  setEditable(false);
                }}
                variant="outlined"
                className="mr-2"
              >
                never mind
              </Button>
            ) : null
          }
        />
        <Paper
          style={{ background: "#eaeaea" }}
          elevation={1}
          className="mt-3 p-4"
        >
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="u-fontLarge u-fontWeightBold mb-3">
              Purchase Document{englishNumberToPersianNumber(purchase.order_id)}
            </div>
            <div className="d-flex align-items-center mb-3">
              {isPendingReview && !editable ? (
                <Button
                  onClick={() => {
                    setEditable(true);
                  }}
                  style={{ background: theme.palette.background.default }}
                  color="primary"
                  size="large"
                >
                  Edit the order
                </Button>
              ) : null}
              <>
                <Button
                  style={{
                    background: theme.palette.background.default,
                    minWidth: 55,
                  }}
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  color="primary"
                  size="large"
                  className="mr-2 px-0"
                >
                  <MoreHorizIcon />
                </Button>
                <Popover
                  open={Boolean(anchorEl)}
                  keepMounted
                  anchorEl={anchorEl}
                  onClose={() => setAnchorEl(null)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <Paper elevation={0}>
                    <PurchaseOrderExcelExport purchase={purchase} />
                    <Divider />
                    {isSuper && (
                      <CancelPurchaseOrder
                        onClose={() => setAnchorEl(null)}
                        purchaseId={purchaseId}
                      />
                    )}
                  </Paper>
                </Popover>
              </>
            </div>
          </div>
          <div className="d-flex flex-wrap">
            <div className="ml-5" style={{ width: 300 }}>
              <div className="mt-2">
                <span className="u-fontWeightBold">Send to: </span>
                <span>{purchase.submitter_business?.title}</span>
              </div>
              <div className="mt-2">
                <span className="u-fontWeightBold">Delivery time: </span>
                <span>
                  {englishNumberToPersianNumber(
                    expectedTime.format("jYYYY/jMM/jDD")
                  )}
                </span>
              </div>
              <div className="mt-2">
                <span className="u-fontWeightBold">Register time: </span>
                <span>
                  {englishNumberToPersianNumber(
                    createdTime.format("jYYYY/jMM/jDD HH:mm")
                  )}
                </span>
              </div>
              <div className="mt-2">
                <span className="u-fontWeightBold">Ordered by: </span>
                <span>{purchase.submitter_business?.assignee?.name}</span>
              </div>
              <div className="mt-2">
                <span className="u-fontWeightBold">notes: </span>
                <span>{purchase.description}</span>
              </div>
            </div>
            <div style={{ width: 300 }}>
              <div className="mt-2">
                <span className="u-fontWeightBold">Supplier: </span>
                <span>{purchase.vendor?.name}</span>
              </div>
              <div className="mt-2">
                <span className="u-fontWeightBold">Address: </span>
                <span>{purchase.vendor?.address}</span>
              </div>
              <div className="mt-2">
                <span className="u-fontWeightBold">The relevant responsible: </span>
                <span>{purchase.supplier_business?.assignee?.name}</span>
              </div>
              <div className="mt-2">
                <span className="u-fontWeightBold">
                  Supplier contact number:{" "}
                </span>
                <span>{purchase.vendor?.phone}</span>
              </div>
              <div className="mt-2">
                <span className="u-fontWeightBold">email: </span>
                <span>{purchase.vendor?.email}</span>
              </div>
              <div className="mt-2">
                <span className="u-fontWeightBold">Total number of items: </span>
                <span>
                  {englishNumberToPersianNumber(purchase?.items?.length)}
                </span>
              </div>
            </div>
          </div>
        </Paper>
        <div className="d-flex w-100 justify-content-between align-items-center mt-2">
          <div className="u-fontWeightBold">Product Information</div>
        </div>
        <Paper elevation={1} className="mt-2">
          <TableContainer>
            <Table
              style={{ borderCollapse: "separate", borderSpacing: 1 }}
              className="h-100"
              aria-labelledby="tableTitle"
              size="small"
              aria-label="enhanced table"
            >
              <TableHead>
                <TableRow
                  style={{ borderBottom: `1px solid ${dust}` }}
                  className={loading ? "u-pointer-events-none" : ""}
                >
                  {headCells
                    .filter(
                      (headCell) => !headCell.onlyPending || isPendingReview
                    )
                    .map((headCell) => (
                      <TableCell
                        style={{
                          minWidth: headCell.minWidth,
                          maxWidth: headCell.maxWidth,
                          width: headCell.width,
                          backgroundColor: surface.inactive.default,
                          borderLeft: `1px solid ${borderColor}`,
                          borderBottom: `1px solid ${borderColor}`,
                        }}
                        className="text-nowrap u-fontWeightBold"
                        key={headCell.id}
                        align={headCell.align}
                        color="text.primary"
                      >
                        {headCell.label}
                      </TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {purchase.items.map((purchaseItem) => {
                  const {
                    id,
                    title,
                    unit,
                    invoice_amount,
                    supplied_amount,
                    price,
                    description,
                  } = purchaseItem;
                  const isMock = !id;
                  const unitText = (
                    units.find((u) => u.english === unit) || units[0]
                  )?.persian;
                  return (
                    <TableRow
                      key={purchaseItem.id}
                      style={{ height: 40 }}
                      className={loading ? "u-pointer-events-none" : ""}
                    >
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
                          <div className="text-right w-100 p-2">{title}</div>
                        )}
                      </TableCell>
                      <TableCell
                        style={{
                          borderLeft: `1px solid ${borderColor}`,
                          borderBottom: `1px solid ${borderColor}`,
                          backgroundImage:
                            "repeating-linear-gradient(45deg,transparent,transparent 1px,#fff 1px,#fff 5px,transparent 5px,transparent 6px,#fff 6px,#fff 10px)",
                          backgroundColor: dust,
                        }}
                        className="h-100 p-0"
                        align="right"
                      >
                        {isMock ? (
                          <div className="d-flex align-items-center p-2">
                            <Skeleton className="w-100" />
                          </div>
                        ) : (
                          <div className="d-flex justify-content-between align-items-center w-100 p-2">
                            <div>
                              {englishNumberToPersianNumber(invoice_amount)}
                            </div>
                            <div
                              className="text-nowrap mr-2"
                              color="text.quaternary"
                            >
                              {unitText}
                            </div>
                          </div>
                        )}
                      </TableCell>
                      <TableCell
                        style={{
                          borderLeft: `1px solid ${borderColor}`,
                          borderBottom: `1px solid ${borderColor}`,
                          backgroundImage:
                            "repeating-linear-gradient(45deg,transparent,transparent 1px,#fff 1px,#fff 5px,transparent 5px,transparent 6px,#fff 6px,#fff 10px)",
                          backgroundColor: dust,
                        }}
                        className="h-100 p-0"
                        align="right"
                      >
                        {isMock ? (
                          <div className="d-flex align-items-center p-2">
                            <Skeleton className="w-100" />
                          </div>
                        ) : (
                          <div className="d-flex justify-content-between align-items-center w-100 p-2">
                            <div>
                              {englishNumberToPersianNumber(supplied_amount)}
                            </div>
                            <div
                              className="text-nowrap mr-2"
                              color="text.quaternary"
                            >
                              {unitText}
                            </div>
                          </div>
                        )}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 130,
                          borderLeft: `1px solid ${borderColor}`,
                          borderBottom: `1px solid ${borderColor}`,
                          backgroundImage: editable
                            ? ""
                            : "repeating-linear-gradient(45deg,transparent,transparent 1px,#fff 1px,#fff 5px,transparent 5px,transparent 6px,#fff 6px,#fff 10px)",
                          backgroundColor: editable ? "" : dust,
                        }}
                        className="h-100 p-0 position-relative"
                        align="right"
                      >
                        {isMock ? (
                          <div className="d-flex align-items-center p-2">
                            <Skeleton className="w-100" />
                          </div>
                        ) : (
                          <>
                            <div
                              style={{ color: theme.palette.text.quaternary }}
                              className="position-absolute u-top-0 bottom-0 my-auto left-0 text-nowrap mx-2 d-flex align-items-center"
                            >
                              {unitText}
                            </div>
                            {editable ? (
                              <Input
                                tableInput
                                selectOnFocus
                                numberOnly
                                margin="dense"
                                className="h-100 pr-3 w-100"
                                style={{ paddingLeft: 60 }}
                                inputProps={{
                                  className: "px-0",
                                }}
                                value={englishNumberToPersianNumber(
                                  tempPurchaseList[id]?.amount ??
                                    supplied_amount,
                                  ""
                                )}
                                onChange={(value) => {
                                  setTempPurchaseList({
                                    ...tempPurchaseList,
                                    [id]: { amount: value },
                                  });
                                }}
                              />
                            ) : (
                              <div
                                className="h-100 pr-3 w-100 d-flex align-items-center"
                                style={{ width: 130, paddingLeft: 60 }}
                              >
                                {englishNumberToPersianNumber(
                                  purchaseList[purchaseItem.id]?.amount ??
                                    supplied_amount,
                                  ""
                                )}
                              </div>
                            )}
                          </>
                        )}
                      </TableCell>
                      <TableCell
                        style={{
                          borderLeft: `1px solid ${borderColor}`,
                          borderBottom: `1px solid ${borderColor}`,
                          verticalAlign: isMock ? "middle" : "top",
                          maxWidth: 110,
                          backgroundImage:
                            "repeating-linear-gradient(45deg,transparent,transparent 1px,#fff 1px,#fff 5px,transparent 5px,transparent 6px,#fff 6px,#fff 10px)",
                          backgroundColor: dust,
                        }}
                        className="h-100 p-0 position-relative"
                        align="right"
                      >
                        {isMock ? (
                          <div className="d-flex align-items-center p-2">
                            <Skeleton className="w-100" />
                          </div>
                        ) : (
                          <Button
                            style={{ textTransform: "none" }}
                            className="justify-content-start u-fontNormal text-nowrap u-text-ellipse w-100"
                            onClick={() => setNoteModal(purchaseItem)}
                          >
                            {description || "does not have"}
                          </Button>
                        )}
                      </TableCell>
                      <TableCell
                        style={{
                          borderLeft: `1px solid ${borderColor}`,
                          borderBottom: `1px solid ${borderColor}`,
                          backgroundImage:
                            "repeating-linear-gradient(45deg,transparent,transparent 1px,#fff 1px,#fff 5px,transparent 5px,transparent 6px,#fff 6px,#fff 10px)",
                          backgroundColor: dust,
                        }}
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
                          backgroundImage:
                            "repeating-linear-gradient(45deg,transparent,transparent 1px,#fff 1px,#fff 5px,transparent 5px,transparent 6px,#fff 6px,#fff 10px)",
                          backgroundColor: dust,
                        }}
                        className="h-100 p-0"
                        align="right"
                      >
                        {isMock ? (
                          <div className="d-flex align-items-center p-2">
                            <Skeleton className="w-100" />
                          </div>
                        ) : (
                          <div className="d-flex justify-content-between align-items-center w-100 p-2">
                            <div>
                              {priceFormatter(
                                price *
                                  (purchaseList[purchaseItem.id]?.amount ??
                                    supplied_amount) || 0
                              )}
                            </div>
                            <div
                              className="text-nowrap mr-2"
                              style={{ color: theme.palette.text.quaternary }}
                            >
                              $
                            </div>
                          </div>
                        )}
                      </TableCell>
                      {isPendingReview ? (
                        <TableCell
                          style={{
                            borderLeft: `1px solid ${borderColor}`,
                            borderBottom: `1px solid ${borderColor}`,
                            maxWidth: 110,
                          }}
                          className="h-100 p-0"
                          align="center"
                        >
                          {isMock ? (
                            <div className="d-flex align-items-center p-2">
                              <Skeleton className="w-100" />
                            </div>
                          ) : (
                            <Button
                              color="primary"
                              onClick={() => {
                                setSelectedItem(purchaseItem);
                                setModal(true);
                              }}
                            >
                              Correction
                            </Button>
                          )}
                        </TableCell>
                      ) : null}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
      <PurchaseOrderCosts
        purchaseList={Object.fromEntries(
          purchase.items.map((item) => [
            item.id,
            {
              price: item.price,
              amount:
                purchaseList[item.id]?.amount ??
                (item.supplied_amount || item.invoice_amount),
            },
          ])
        )}
        extraCosts={purchase.extra_costs}
        taxingPrice={purchase.taxing_price}
      />
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
            style={{ height: 300, width: "100%", maxWidth: 600 }}
          >
            <ModalHeader onRightClick={() => setModal(null)} />
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
                    {selectedItem?.title}
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
                      selectedItem.error
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
                        setSelectedItem({ ...selectedItem, error: "" });
                      }}
                      value={englishNumberToPersianNumber(
                        selectedItem.amount,
                        ""
                      )}
                      onChange={(amount) => {
                        setSelectedItem({
                          ...selectedItem,
                          amount: persianToEnglishNumber(amount),
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-2" style={{ color: theme.palette.error.main }}>
                {selectedItem.error}
              </div>
            </Paper>
            <Paper
              elevation={2}
              style={{ borderRadius: 0 }}
              className="sticky-bottom p-3 d-flex flex-row-reverse"
            >
              <Button
                onClick={() => {
                  if (!selectedItem.amount)
                    setSelectedItem({
                      ...selectedItem,
                      error: "The requested amount is not valid..",
                    });
                  if (selectedItem.amount) {
                    setPurchaseList({
                      ...purchaseList,
                      [selectedItem.id]: { amount: selectedItem.amount },
                    });
                    setModal(null);
                  }
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
      <ItemNoteModal
        modal={noteModal}
        setModal={setNoteModal}
        defaultNote={noteModal ? noteModal?.description || "" : ""}
        disabled
      />
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  branches: makeSelectBranches(),
  purchase: makeSelectPurchase(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getPurchase: (id) => dispatch(getPurchase(id)),
    _applySubmittedOrder: (id, data) =>
      dispatch(applySubmittedPurchase(id, data)),
    _acceptSubmittedPurchase: (id) => dispatch(acceptSubmittedPurchase(id)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminPendingCustomerPurchase);
