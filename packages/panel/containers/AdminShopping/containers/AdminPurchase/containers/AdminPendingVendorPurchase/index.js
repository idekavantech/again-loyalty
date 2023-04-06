import React, { memo, useEffect, useState } from "react";
import { createStructuredSelector } from "reselect";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import {
  makeSelectBranches,
  makeSelectBusinessId,
} from "@saas/stores/business/selector";
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
  applyReceivedPurchase,
  getPurchase,
  getVendorItemsByVendor,
  updateSubmittedPurchase,
} from "store/actions";
import useTheme from "@material-ui/core/styles/useTheme";
import { useRouter } from "next/router";
import {
  makeSelectPurchase,
  makeSelectAdminVendorItems,
} from "store/selectors";
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
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import { PURCHASE_ORDER_PLUGIN_URL } from "@saas/utils/constants/plugins";

const headCells = [
  {
    id: "name",
    align: "right",
    label: "Product Name",
    minWidth: 200,
  },
  {
    id: "submitted",
    align: "right",
    label: "Required",
  },
  {
    id: "supplied",
    align: "right",
    label: "Supply",
  },
  {
    id: "received",
    align: "right",
    label: "Supply",
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
const reducer = (accumulator, currentValue) =>
  accumulator + currentValue.amount;

function AdminPendingVendorPurchase({
  loading,
  _getPurchase,
  purchase,
  _applyReceivedPurchase,
  _getAdminVendorItems,
  vendorItems,
  urlPrefix,
  _updatePurchase,
  business_id,
}) {
  const [editable, setEditable] = useState(false);
  const router = useRouter();
  const [purchaseList, setPurchaseList] = useState({});
  const [tempPurchaseList, setTempPurchaseList] = useState({});
  const [errors, setErrors] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState({});
  const [modal, setModal] = useState(null);
  const [noteModal, setNoteModal] = useState(null);
  const [tax, setTax] = useState("");
  const [search, setSearch] = useState("");
  const theme = useTheme();
  const purchaseId = router.query.id;
  const submitterBusiness = purchase?.submitter_business?.site_domain;
  useEffect(() => {
    setErrors([]);
  }, [purchaseList, tempPurchaseList, editable]);
  useEffect(() => {
    setTimeout(() => {
      _getAdminVendorItems({ vendor: purchase?.vendor?.id }, 1, 200);
    }, 0);
  }, [purchase?.vendor?.id]);
  useEffect(() => {
    setTimeout(() => {
      _getPurchase(purchaseId);
    }, 0);
  }, [purchaseId]);
  useEffect(() => {
    if (purchase?.items) {
      setPurchaseList(
        Object.fromEntries(
          purchase.items.map((item) => [
            item.id,
            { amount: item.supplied_amount },
          ])
        )
      );
    }
  }, [purchase?.items]);
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
    }-${createdDate.getDate()} ${createdDate.getHours()}:${createdDate.getMinutes()}`,
    "YYYY-MM-DD HH:mm"
  );
  const submit = () => {
    const e = purchase.items
      .filter((purchaseItem) => !purchaseList[purchaseItem.id])
      .map((purchaseItem) => purchaseItem.id);
    setErrors(e);
    if (!e.length) {
      if (purchase?.status === 3) {
        _updatePurchase(purchaseId, {
          order_items: purchase.items.map((purchaseItem) => ({
            id: purchaseItem.id,
            supplied_amount: parseFloat(purchaseList[purchaseItem.id].amount),
          })),
          submitter_business_id: business_id,
        });
      } else {
        _applyReceivedPurchase(purchaseId, {
          supply_items: purchase.items.map((purchaseItem) => ({
            id: purchaseItem.id,
            supply_amount: parseFloat(purchaseList[purchaseItem.id].amount),
            invoice_amount: parseInt(
              purchaseList[purchaseItem.id].invoice_amount
            ),
            description: purchaseList[purchaseItem.id].description,
          })),
          taxing_price: parseInt(tax || 0),
        });
      }
    }
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
          submitButtonText={editable ? "Store" : "Finalize"}
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
              {!editable ? (
                <Button
                  onClick={() => {
                    // setEditable(true);
                    router.push(
                      `${urlPrefix}${PURCHASE_ORDER_PLUGIN_URL}/out/${purchaseId}/edit?businessTitle=${submitterBusiness}`
                    );
                  }}
                  style={{ background: theme.palette.background.default }}
                  color="primary"
                  size="large"
                >
                  Edit the purchase document
                </Button>
              ) : null}
              {!editable ? (
                <Button
                  onClick={() => {
                    router.push(
                      `${urlPrefix}${PURCHASE_ORDER_PLUGIN_URL}/out/${purchaseId}/receive`
                    );
                  }}
                  style={{ background: theme.palette.background.default }}
                  color="primary"
                  size="large"
                  className="mr-2"
                >
                  Edit the received items
                </Button>
              ) : null}
              {!editable && (
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
              )}
              <Popover
                keepMounted
                open={Boolean(anchorEl)}
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
                  <CancelPurchaseOrder
                    onClose={() => setAnchorEl(null)}
                    purchaseId={purchaseId}
                  />
                </Paper>
              </Popover>
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
        {editable ? (
          <Autocomplete
            size="small"
            className="w-100 mt-4"
            noOptionsText="The result was not found.."
            disabled={!vendorItems?.length}
            style={{ height: 40 }}
            options={vendorItems}
            inputValue={search}
            onInputChange={(event, newInputValue, reason) => {
              if (reason === "input") setSearch(newInputValue);
            }}
            getOptionLabel={(i) => i.variation?.title || ""}
            onChange={(e, option) => {
              setSearch("");
              if (option?.variation) {
                const _item = option.variation;
                setTempPurchaseList({
                  ...tempPurchaseList,
                  [`${_item.resource}_${_item.id}`]: {
                    ..._item,
                    price: option.price,
                    amount:
                      _item.inventory_count > (_item.expected_value || 0)
                        ? 0
                        : _item.expected_value - _item.inventory_count,
                    variation_id: _item.id,
                  },
                  ...purchaseList,
                });
              }
            }}
            renderInput={(params) => (
              <Input
                {...params}
                inputProps={{
                  ...params.inputProps,
                  style: { paddingTop: 0 },
                }}
                InputProps={{
                  ...params.InputProps,
                  className: `${params.InputProps.className} pr-2`,
                  endAdornment: null,
                }}
                placeholder="Enter the name of the goods."
                size="medium"
                className="medium"
                variant="outlined"
                themeColor={theme.palette.primary.main}
              />
            )}
          />
        ) : null}
        <div className="d-flex w-100 justify-content-between align-items-center mt-2">
          <div className="u-fontWeightBold">Product Information</div>
          {!editable && (
            <div className="d-flex">
              <Button
                onClick={() => {
                  setPurchaseList(
                    Object.fromEntries(
                      purchase.items.map((item) => [
                        item.id,
                        { amount: item.invoice_amount },
                      ])
                    )
                  );
                }}
                variant="text"
                color="primary"
              >
                Supply everyone
              </Button>
              <Button
                onClick={() =>
                  setPurchaseList(
                    Object.fromEntries(
                      purchase.items.map((item) => [item.id, { amount: 0 }])
                    )
                  )
                }
                variant="text"
                color="primary"
                className="mr-2"
              >
                Do not supply any
              </Button>
            </div>
          )}
        </div>
        {errors.length ? (
          <div className="mt-2" style={{ color: theme.palette.error.main }}>
            Please specify the supply amount of all items.
          </div>
        ) : null}
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
                    .filter((headCell) => !headCell.onlyPending)
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
                    received_amount,
                    price,
                    description,
                  } = purchaseItem;
                  const isMock = !id;
                  const unitText = (
                    units.find((u) => u.english === unit) || units[0]
                  )?.persian;
                  const totalReceivedAmount = received_amount?.length
                    ? received_amount.reduce(reducer, 0)
                    : null;
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
                                  tempPurchaseList[id]?.invoice_amount ??
                                    purchaseList[id]?.invoice_amount,
                                  ""
                                )}
                                onChange={(value) => {
                                  setTempPurchaseList({
                                    ...tempPurchaseList,
                                    [id]: {
                                      ...tempPurchaseList[id],
                                      invoice_amount: value,
                                    },
                                  });
                                }}
                              />
                            ) : (
                              <div
                                className="h-100 pr-3 w-100 d-flex align-items-center"
                                style={{ width: 130, paddingLeft: 60 }}
                              >
                                {englishNumberToPersianNumber(
                                  purchaseList[purchaseItem.id]
                                    ?.invoice_amount ?? invoice_amount,
                                  ""
                                )}
                              </div>
                            )}
                          </>
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
                                    purchaseList[id]?.amount,
                                  ""
                                )}
                                onChange={(value) => {
                                  setTempPurchaseList({
                                    ...tempPurchaseList,
                                    [id]: {
                                      ...tempPurchaseList[id],
                                      amount: value,
                                    },
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
                                    purchaseList[id]?.amount,
                                  ""
                                )}
                                onChange={(value) => {
                                  setTempPurchaseList({
                                    ...tempPurchaseList,
                                    [id]: {
                                      ...tempPurchaseList[id],
                                      amount: value,
                                    },
                                  });
                                }}
                              />
                            ) : (
                              <div
                                className="h-100 pr-3 w-100 d-flex align-items-center"
                                style={{ width: 130, paddingLeft: 60 }}
                              >
                                {englishNumberToPersianNumber(
                                  totalReceivedAmount,
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
                            {tempPurchaseList[purchaseItem.id]?.description ||
                              purchaseList[purchaseItem.id]?.description ||
                              description ||
                              "does not have"}
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
                              {priceFormatter(price * totalReceivedAmount || 0)}
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
                      {!editable && (
                        <TableCell
                          style={
                            !errors.includes(id)
                              ? {
                                  borderLeft: `1px solid ${borderColor}`,
                                  borderBottom: `1px solid ${borderColor}`,
                                  maxWidth: 110,
                                }
                              : {
                                  border: `1px solid ${theme.palette.error.main}`,
                                  maxWidth: 110,
                                }
                          }
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
                                setSelectedItem({
                                  ...purchaseItem,
                                  amount: purchaseItem.invoice_amount,
                                });
                                setModal(true);
                              }}
                            >
                              I supply
                            </Button>
                          )}
                        </TableCell>
                      )}
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
              amount: item.received_amount.reduce(
                (accumulator, currentValue) =>
                  accumulator + currentValue.amount,
                0
              ),
            },
          ])
        )}
        extraCosts={purchase.extra_costs}
        taxingPrice={tax}
        setTax={setTax}
        canEditTax
        totalInvoiceAmountPrice={purchase.items?.reduce(
          (previousValue, currentValue) =>
            previousValue + currentValue?.invoice_amount * currentValue?.price,
          0
        )}
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
                      isFloat={true}
                      className="h-100 px-3 w-100"
                      inputProps={{
                        className: "px-0",
                      }}
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
                      error: "The amount is not valid..",
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
        defaultNote={noteModal?.description || ""}
        disabled={!editable}
        onChange={(id, value) =>
          setTempPurchaseList({
            ...tempPurchaseList,
            [id]: {
              ...tempPurchaseList[id],
              description: value,
            },
          })
        }
      />
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  branches: makeSelectBranches(),
  purchase: makeSelectPurchase(),
  vendorItems: makeSelectAdminVendorItems(),
  urlPrefix: makeSelectAdminUrlPrefix(),
  business_id: makeSelectBusinessId(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getPurchase: (id) => dispatch(getPurchase(id)),
    _applyReceivedPurchase: (id, data) =>
      dispatch(applyReceivedPurchase(id, data)),
    _getAdminVendorItems: (data, page, pageSize) =>
      dispatch(getVendorItemsByVendor(data, page, pageSize)),
    _updatePurchase: (id, data) => dispatch(updateSubmittedPurchase(id, data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminPendingVendorPurchase);
