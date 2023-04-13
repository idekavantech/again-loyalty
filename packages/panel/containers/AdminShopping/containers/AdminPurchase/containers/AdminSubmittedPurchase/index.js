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
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import Button from "@material-ui/core/Button";
import { getPurchase, receiveSubmittedPurchase } from "store/actions";
import useTheme from "@material-ui/core/styles/useTheme";
import { useRouter } from "next/router";
import { makeSelectPurchase } from "store/selectors";
import Popover from "@material-ui/core/Popover";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import moment from "moment";
import { ITEM_RECEIVE_REASON_RECEIVED } from "store/constants";
import PurchaseOrderExcelExport from "containers/AdminShopping/containers/AdminPurchase/components/PurchaseOrderExcelExport";
import PurchaseItemRow from "containers/AdminShopping/containers/AdminPurchase/containers/AdminSubmittedPurchase/PurchaseItemRow";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import CancelPurchaseOrder from "containers/AdminShopping/containers/AdminPurchase/components/CancelPurchaseOrder";
import PurchaseOrderCosts from "containers/AdminShopping/containers/AdminPurchase/components/PurchaseOrderCosts";
import ReceivedItemRow from "./ReceivedItemRow";

const headCells = [
  {
    id: "row",
    align: "right",
    label: "Row",
    minWidth: 50,
  },
  {
    id: "name",
    align: "right",
    label: "Product Name",
    minWidth: 200,
  },
  {
    id: "supplied",
    align: "right",
    label: "Supply",
  },
  {
    id: "received",
    align: "right",
    label: "received",
  },
  {
    id: "cost",
    align: "right",
    label: "Unit price($)",
  },
  {
    id: "total",
    align: "right",
    label: "Total price($)",
  },
  {
    id: "total",
    align: "right",
    label: "Determine the status",
    minWidth: 150,
  },
];

function AdminSubmittedPurchase({
  loading,
  _receiveSubmittedPurchase,
  _getPurchase,
  purchase,
  isSuper,
  businessId,
}) {
  const expectedDateToReceive = new Date(purchase?.expected_date_to_receive);
  const expectedDateToReceiveFormatted = moment(
    `${expectedDateToReceive?.getFullYear()}-${
      expectedDateToReceive?.getMonth() + 1
    }-${expectedDateToReceive?.getDate()}  23:59}`,
    "YYYY-MM-DD HH:mm"
  );
  const now = new Date();
  const nowDateFormatted = moment(
    `${now?.getFullYear()}-${
      now?.getMonth() + 1
    }-${now?.getDate()}} ${now?.getHours()}:${now?.getMinutes()}}`,
    "YYYY-MM-DD HH:mm"
  );
  const areButtonsDisabled =
    !isSuper && expectedDateToReceiveFormatted < nowDateFormatted;
  const router = useRouter();
  const [reception, setReception] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const purchaseId = router.query.id;
  const [extraCosts, setExtraCosts] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      _getPurchase(purchaseId);
    }, 0);
  }, [purchaseId]);
  useEffect(() => {
    setTimeout(() => {
      if (purchase) {
        setExtraCosts(purchase.extra_cost_items);
        setReception(
          Object.fromEntries(
            purchase?.items.map((item) => [item.id, item?.received_amount])
          )
        );
      }
    }, 0);
  }, [purchase]);
  const submit = () => {
    const dto = {
      received_items: Object.entries(reception)
        .map(([key, value]) => {
          return value.map((r) => ({ ...r, id: key }));
        })
        .reduce((acc, item) => [...acc, ...item], [])
        .filter((item) => !item?._created_at),
      extra_costs: extraCosts,
    };
    if (isSuper) {
      dto.submitter_business_id = businessId;
    }
    _receiveSubmittedPurchase(purchaseId, dto);
  };
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
  return (
    <>
      <div className="container">
        <AdminBreadCrumb
          isLoading={loading || areButtonsDisabled}
          responsive={false}
          submitButtonText="Store"
          submitAction={submit}
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
              {isSuper && !areButtonsDisabled && (
                <Button
                  style={{ background: theme.palette.background.default }}
                  color="primary"
                  size="large"
                >
                  Edit the order
                </Button>
              )}
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
                  <ListItem button>
                    <ListItemText
                      style={{ color: theme.palette.primary.main }}
                      className="text-right"
                    >
                      Copy
                    </ListItemText>
                  </ListItem>
                  <Divider />
                  <PurchaseOrderExcelExport purchase={purchase} />
                  {isSuper && (
                    <CancelPurchaseOrder
                      onClose={() => setAnchorEl(null)}
                      purchaseId={purchaseId}
                    />
                  )}
                </Paper>
              </Popover>
            </div>
          </div>
          <div className="d-flex flex-wrap">
            <div className="ml-5" style={{ width: 300 }}>
              <div className="mt-2">
                <span className="u-fontWeightBold">Supplier: </span>
                <span>{purchase.vendor.name}</span>
              </div>
              <div className="mt-2">
                <span className="u-fontWeightBold">Address: </span>
                <span>{purchase.vendor.address}</span>
              </div>
              <div className="mt-2">
                <span className="u-fontWeightBold">The relevant responsible: </span>
                <span>{purchase.supplier_business?.assignee?.name}</span>
              </div>
              <div className="mt-2">
                <span className="u-fontWeightBold">
                  Supplier contact number:{" "}
                </span>
                <span>{purchase.vendor.phone}</span>
              </div>
              <div className="mt-2">
                <span className="u-fontWeightBold">email: </span>
                <span>{purchase.vendor.email}</span>
              </div>
              <div className="mt-2">
                <span className="u-fontWeightBold">Total number of items: </span>
                <span>
                  {englishNumberToPersianNumber(purchase?.items?.length)}
                </span>
              </div>
            </div>
            <div style={{ width: 300 }}>
              <div className="mt-2">
                <span className="u-fontWeightBold">Send to: </span>
                <span>{purchase.submitter_business.title}</span>
              </div>
              <div className="mt-2">
                <span className="u-fontWeightBold">Delivery time: </span>
                <span>
                  {englishNumberToPersianNumber(
                    expectedTime.format("YYYY/MM/DD")
                  )}
                </span>
              </div>
              <div className="mt-2">
                <span className="u-fontWeightBold">Register time: </span>
                <span>
                  {englishNumberToPersianNumber(
                    createdTime.format("YYYY/MM/DD HH:mm")
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
          </div>
        </Paper>
        <div className="d-flex w-100 justify-content-between align-items-center mt-2">
          <div className="u-fontWeightBold">Product Information</div>
          <div className="d-flex">
            <Button
              onClick={() => {
                setReception(
                  Object.fromEntries(
                    purchase.items.map((item) => {
                      const newReceptions = reception[item.id] || [];
                      const remaining =
                        parseInt(item.supplied_amount) -
                        (reception[item.id]?.reduce(
                          (sum, item) => sum + parseInt(item.amount),
                          0
                        ) || 0);
                      if (remaining)
                        newReceptions.unshift({
                          amount: remaining,
                          reason: ITEM_RECEIVE_REASON_RECEIVED,
                        });
                      return [item.id, newReceptions];
                    })
                  )
                );
              }}
              variant="text"
              color="primary"
              disabled={areButtonsDisabled}
            >
              Get all
            </Button>
            <Button
              onClick={() => setReception({})}
              variant="text"
              color="primary"
              className="mr-2"
              disabled={areButtonsDisabled}
            >
              Do not receive any
            </Button>
          </div>
        </div>
        <Paper elevation={1} className="mt-2">
          <TableContainer>
            <Table
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
                  {headCells.map((headCell) => (
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
                {purchase.items.map((purchaseItem, index) => {
                  const remainingAmount =
                    parseInt(purchaseItem.invoice_amount) -
                    ((reception[purchaseItem.id]?.reduce(
                      (sum, item) => sum + parseInt(item.amount),
                      0
                    ) || 0) +
                      (purchaseItem.received_amount.reduce(
                        (sum, receivedAmountItem) =>
                          sum + receivedAmountItem.amount,
                        0
                      ) || 0));

                  return (
                    <>
                      <PurchaseItemRow
                        index={index}
                        disabled={areButtonsDisabled}
                        item={{
                          ...purchaseItem,
                          amount: remainingAmount,
                        }}
                        loading={loading}
                        reception={reception}
                        setReception={setReception}
                        type="current"
                        addReception={(amount, reason) =>
                          setReception({
                            ...reception,
                            [purchaseItem.id]: [
                              { amount, reason },
                              ...(reception[purchaseItem.id] || []),
                            ],
                          })
                        }
                      />
                      {reception[purchaseItem.id]?.map((item, index) => (
                        <ReceivedItemRow
                          disabled={areButtonsDisabled}
                          key={item.id}
                          type={item._created_at ? "history" : "reception"}
                          item={{ ...purchaseItem, ...item }}
                          onDelete={() => {
                            reception[purchaseItem.id].splice(index, 1);
                            setReception({ ...reception });
                          }}
                        />
                      ))}
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
      <PurchaseOrderCosts
        purchaseList={Object.fromEntries(
          purchase.items.map((item) => {
            const totalreceivedItemsAmount = reception[item.id]?.reduce(
              (a, _item) => a + (_item.amount || 0),
              0
            );
            return [
              item.id,
              {
                ...item,
                amount: totalreceivedItemsAmount,
              },
            ];
          })
        )}
        extraCosts={extraCosts}
        setExtraCosts={setExtraCosts}
        taxingPrice={purchase.taxing_price}
        canEditExtraCosts
        isShownAllItemsPrice={false}
      />
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  branches: makeSelectBranches(),
  purchase: makeSelectPurchase(),
  businessId: makeSelectBusinessId(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getPurchase: (id) => dispatch(getPurchase(id)),
    _receiveSubmittedPurchase: (id, data) =>
      dispatch(receiveSubmittedPurchase(id, data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminSubmittedPurchase);
