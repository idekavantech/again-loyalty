import React, { memo, useCallback, useState } from "react";
import useTheme from "@material-ui/core/styles/useTheme";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { ellipseText } from "@saas/utils/helpers/ellipseText";
import { deliveryIntervalFormatter } from "@saas/utils/helpers/deliveryIntervalFormatter";

import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import DescriptionIcon from "@material-ui/icons/Description";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import KeyboardArrowUpRoundedIcon from "@material-ui/icons/KeyboardArrowUpRounded";
import PrintRoundedIcon from "@material-ui/icons/PrintRounded";

import { graphite, smoke } from "@saas/utils/colors";
import {
  NEW_ORDER_STATUS_ACCEPTED,
  NEW_ORDER_STATUS_COMP,
  NEW_ORDER_STATUS_VOID,
} from "@saas/plugins/Shopping/constants";
import { PLUGIN_INACTIVE_STATUS } from "@saas/stores/plugins/constants";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";

import {
  ASSIGN_COURIER_MODAL,
  deliverer_companies_dict,
  deliverersClickEvents,
  deliverersIcon,
  LOG_TYPE_COMMENT,
  orderTimeLineComponentsByType,
} from "../AdminOrder/constants";
import AssignCourierModal from "../AdminOrder/containers/Modals/AssignCourierModal";
import { assignDeliveryMan } from "store/actions";
import {
  ADDRESS_HEAD_CELL,
  COL_1_HEAD_CELL,
  COL_2_HEAD_CELL,
  COL_3_HEAD_CELL,
  COMMENT_HEAD_CELL,
  COST_HEAD_CELL,
  DELIVERY_COMPANIES_SELECTED_HEAD_CELL,
  DELIVERY_COMPANIES_TYPE_HEAD_CELL,
  DELIVERY_TYPE_HEAD_CELL,
  deliveryCompaniesType,
  deliveryTypes,
  DESCRIPTION_HEAD_CELL,
  FIRST_SUBMITTED_AT_ORDER,
  headCells,
  HISTORY_HEAD_CELL,
  LAST_SUBMITTED_AT_ORDER,
  NAME_HEAD_CELL,
  orderStatuses,
  orderStatusesBorderRightColor,
  PAYMENT_STATUS_HEAD_CELL,
  PRINT_HEAD_CELL,
  SALES_CHANNEL_HEAD_CELL,
  TIME_HEAD_CELL,
} from "./constants";
import { useRouter } from "next/router";
import { paidPriceTypes } from "@saas/utils/constants/paidPriceTypes";
import { paymentStates } from "@saas/utils/constants/paymentStates";
import Link from "next/link";
import { setSnackBarMessage } from "@saas/stores/ui/actions";

const sortingArr = headCells.map((headCell) => headCell.id);

function AdminOrderCard({
  order,
  link,
  business,
  dispatch,
  _assignDeliveryMan,
  _addNote,
  columns,
  formattedTime,
  actionForShouldUpdateListInAssignDelivery,
  BasePluginData,
}) {
  const sortedColumns = columns.sort(
    (a, b) => sortingArr.indexOf(a) - sortingArr.indexOf(b)
  );
  const salesChannels = BasePluginData?.salesChannels;
  const theme = useTheme();
  const router = useRouter();
  const iframe_from_pos =
    router.query.iframe_from_pos || typeof sessionStorage !== "undefined"
      ? sessionStorage.getItem("iframe_from_pos")
      : false;
  const {
    user_address: userAddress,
    submitted_at: createdAt,
    order_status: orderStatus,
    description,
    payment_status,
    total_price,
    delivery_interval,
    sales_channel_id,
    delivery_companies_data,
    history,
    paid_price_details,
  } = order;

  const isPaidPriceOnLocation =
    paid_price_details &&
    !Object?.values?.(paid_price_details).filter(
      (item) => Boolean(item) === true
    )?.length;

  const orderHistories = history?.map((item) =>
    orderTimeLineComponentsByType[item.log_type]?.(item.pos_user_name)
  );
  const orderComments = history
    ?.filter((item) => item.log_type === LOG_TYPE_COMMENT)
    ?.map((item) => item.comment);

  const [contextMenu, setContextMenu] = React.useState(null);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };
  const _setSnackBarMessage = (message, type) =>
    dispatch(setSnackBarMessage(message, type));

  const orderDate = new Date(createdAt);
  const salesChannel =
    salesChannels &&
    Object.keys(salesChannels).find((id) => id == sales_channel_id);
  const shoppingPluginData =
    business?.plugins_config?.[SHOPPING_PLUGIN]?.status !==
    PLUGIN_INACTIVE_STATUS
      ? business?.plugins_config?.[SHOPPING_PLUGIN]
      : null;
  const _couriers =
    (shoppingPluginData?.data?.couriers &&
      Object.keys(shoppingPluginData?.data?.couriers).map((courier, index) => ({
        id: index + 1,
        text: shoppingPluginData?.data?.couriers[courier].name,
        onClick: () =>
          dispatch(
            assignDeliveryMan(
              order?.id,
              courier,
              true,
              business.site_domain,
              actionForShouldUpdateListInAssignDelivery
            )
          ),
      }))) ||
    [];
  const toggleAssignPeykMenu = (isOpen, e) => {
    if (isOpen) {
      setPeykMenuAnchorEl(e.currentTarget);
    } else {
      setPeykMenuAnchorEl(null);
    }
  };
  const [peykMenuAnchorEl, setPeykMenuAnchorEl] = useState(null);

  const _deliverer_companies =
    (shoppingPluginData?.data?.deliverer_companies &&
      Object.keys(shoppingPluginData?.data?.deliverer_companies).map(
        (deliverer, index) => ({
          id: index + 1,
          text: deliverer_companies_dict[deliverer]?.label,
          value: deliverer_companies_dict[deliverer]?.value,
          onClick: () =>
            dispatch(
              deliverersClickEvents[deliverer_companies_dict[deliverer]?.value](
                order?.id
              )
            ),
        })
      )) ||
    [];
  const [UIModals, toggleUIModals] = useState({
    [ASSIGN_COURIER_MODAL]: false,
  });
  const toggleModal = useCallback(
    (name, open) => {
      toggleUIModals({ ...UIModals, [name]: open });
    },
    [UIModals]
  );
  const couriers = shoppingPluginData?.data?.couriers;
  const deliveryManOptions = [..._couriers, ..._deliverer_companies];
  const cells = {
    [TIME_HEAD_CELL]: (
      <TableCell className="text-nowrap" align="right">
        <div
          style={{
            background: orderStatuses[orderStatus]?.backgroundColor,
            color: orderStatuses[orderStatus]?.color || smoke,
            borderRadius: 100,
            width: "fit-content",
            padding: "3px 8px",
          }}
          className="d-flex mt-1 align-items-center pdf-no-style"
        >
          <div style={{ fontSize: 12 }}>
            {orderStatuses[orderStatus]?.label}
          </div>
        </div>
        <div className="mt-2">
          {!(
            router.query.ordering === LAST_SUBMITTED_AT_ORDER ||
            router.query.ordering === FIRST_SUBMITTED_AT_ORDER ||
            typeof router.query.ordering === "undefined"
          ) && <div>{formattedTime}</div>}
          <div>
            {englishNumberToPersianNumber(
              `${`0${orderDate.getHours()}`.slice(
                -2
              )}:${`0${orderDate.getMinutes()}`.slice(-2)}`
            )}
          </div>
        </div>
      </TableCell>
    ),
    [NAME_HEAD_CELL]: (
      <TableCell align="right">
        <div>{ellipseText(userAddress?.name, 18)}</div>
        <div className="mt-1">
          {userAddress?.phone
            ? englishNumberToPersianNumber(userAddress?.phone)
            : "_"}
        </div>
      </TableCell>
    ),
    [SALES_CHANNEL_HEAD_CELL]: (
      <TableCell align="center">
        <div
          style={{
            background: "rgba(152, 169, 177, 0.16)",
            color: smoke,
            borderRadius: 100,
            width: "fit-content",
            padding: "3px 8px",
          }}
          className="d-flex align-items-center pdf-no-style"
        >
          <div style={{ fontSize: 12 }}>
            {salesChannels ? salesChannels[salesChannel]?.name : "-"}
          </div>
        </div>
      </TableCell>
    ),
    [DESCRIPTION_HEAD_CELL]: (
      <TableCell className="text-nowrap " align="center">
        {description ? (
          <Tooltip title={description} className="pdf-display-none">
            <IconButton
              className="p-1"
              style={{
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: theme.palette.text.quaternary,
              }}
            >
              <DescriptionIcon
                style={{
                  color: theme.palette.text.tertiary,
                }}
              />
            </IconButton>
          </Tooltip>
        ) : (
          "_"
        )}
      </TableCell>
    ),
    [COMMENT_HEAD_CELL]: (
      <TableCell
        align="center"
        style={{ minWidth: 120, width: 130, maxWidth: 140 }}
      >
        {orderComments?.length
          ? orderComments.map((item) => <div key={item.id}>{item}</div>)
          : "_"}
      </TableCell>
    ),
    [COST_HEAD_CELL]: (
      <TableCell className="d-flex flex-column text-nowrap" align="right">
        {isPaidPriceOnLocation || isPaidPriceOnLocation === null ? (
          <div
            style={{
              background: "rgba(152, 169, 177, 0.16)",
              borderRadius: 100,
              width: "fit-content",
              padding: "3px 8px",
            }}
            className="d-flex mt-1 align-items-center pdf-no-style"
          >
            <div style={{ fontSize: 12, color: smoke }}>in place</div>
          </div>
        ) : (
          paid_price_details &&
          Object?.entries?.(paid_price_details)?.map?.(([key, value]) => {
            if (!value) return;
            return (
              <div
                key={key}
                style={{
                  background: paidPriceTypes[key]?.backgroundColor,
                  borderRadius: 100,
                  width: "fit-content",
                  padding: "3px 8px",
                }}
                className="d-flex mt-1 align-items-center pdf-no-style"
              >
                <div style={{ fontSize: 12, color: smoke }}>
                  {paidPriceTypes[key]?.label}
                </div>
              </div>
            );
          })
        )}
        <div className="mt-2">{priceFormatter(total_price)}</div>
      </TableCell>
    ),
    [PAYMENT_STATUS_HEAD_CELL]: (
      <TableCell className="text-nowrap" align="center">
        <div
          style={{
            background: paymentStates[payment_status]?.backgroundColor,
            borderRadius: 100,
            width: "fit-content",
            padding: "3px 8px",
            color: paymentStates[payment_status]?.color,
          }}
          className="d-flex align-items-center mx-auto pdf-no-style"
        >
          <div
            className="ml-1 d-flex justify-content-center align-items-end pdf-display-none"
            style={{
              width: 8,
              height: 8,
              borderRadius: "100%",
              border: `2px solid ${paymentStates[payment_status]?.color}`,
            }}
          >
            <div
              style={{
                width: "100%",
                height: paymentStates[payment_status]?.progress,
                backgroundColor: paymentStates[payment_status]?.color,
              }}
            ></div>
          </div>
          <div style={{ fontSize: 12 }}>
            {paymentStates[payment_status]?.label}
          </div>
        </div>
      </TableCell>
    ),
    [DELIVERY_TYPE_HEAD_CELL]: (
      <TableCell className="text-nowrap" align="right">
        <div
          style={{
            background:
              "linear-gradient(0deg, rgba(152, 169, 177, 0.16), rgba(152, 169, 177, 0.16)), #FFFFFF",
            borderRadius: 100,
            width: "fit-content",
            padding: "3px 8px",
          }}
          className="d-flex align-items-center"
        >
          <img
            alt=""
            style={{ width: "20px" }}
            className="ml-1"
            src={deliveryTypes[order?.delivery_site_type?.toUpperCase()]?.icon}
          />
          <div style={{ fontSize: 12, color: smoke }}>
            {deliveryTypes[order?.delivery_site_type?.toUpperCase()]?.label}
          </div>
        </div>
        <div className="mt-2">
          {delivery_interval && delivery_interval.to_time
            ? deliveryIntervalFormatter(delivery_interval)
            : null}
        </div>
      </TableCell>
    ),
    [ADDRESS_HEAD_CELL]: (
      <TableCell
        align="right"
        style={{ minWidth: 120, width: 130, maxWidth: 140 }}
      >
        {order?.user_address?.address
          ?.split("،")
          .filter((item, index) => index < 2)
          .join()}
      </TableCell>
    ),
    [DELIVERY_COMPANIES_SELECTED_HEAD_CELL]: (
      <TableCell
        className="text-nowrap "
        align="right"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {(order?.order_status !== NEW_ORDER_STATUS_VOID ||
          order?.order_status !== NEW_ORDER_STATUS_COMP) &&
        deliveryManOptions.length ? (
          <>
            {delivery_companies_data?.company_type !== "personal" ? (
              <Button
                variant="contained"
                color="primary"
                size="small"
                className="pdf-display-none"
                style={{ direction: "ltr", width: "100%" }}
                startIcon={<KeyboardArrowUpRoundedIcon />}
                onClick={(e) => toggleAssignPeykMenu(true, e)}
                disabled={
                  order?.order_status !== NEW_ORDER_STATUS_ACCEPTED ||
                  order?.deliverer_phone ||
                  order?.delivery_companies_data?.courier?.phone
                }
              >
                determination
              </Button>
            ) : (
              <Button
                size="small"
                className="pdf-display-none"
                variant="contained"
                color="primary"
                style={{ direction: "ltr" }}
                startIcon={<KeyboardArrowUpRoundedIcon />}
                onClick={(e) => toggleAssignPeykMenu(true, e)}
              >
                Edited
              </Button>
            )}

            <Menu
              elevation={1}
              anchorEl={peykMenuAnchorEl}
              keepMounted
              open={Boolean(peykMenuAnchorEl)}
              onClose={() => toggleAssignPeykMenu(false)}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              style={{ bottom: 10 }}
            >
              {deliveryManOptions.map((deliveryMan) => (
                <MenuItem
                  key={deliveryMan.id}
                  onClick={() => {
                    deliveryMan.onClick(order?.id);
                    toggleAssignPeykMenu(false);
                  }}
                  style={{ maxHeight: "30vh" }}
                >
                  <img
                    alt=""
                    src={deliverersIcon[deliveryMan.value || "personal_peyk"]}
                    style={{ width: 20, height: 20 }}
                    className="ml-5"
                  />

                  {deliveryMan.text}
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : null}
      </TableCell>
    ),
    [DELIVERY_COMPANIES_TYPE_HEAD_CELL]: (
      <TableCell className="text-nowrap" align="right">
        <span>
          {deliveryCompaniesType[delivery_companies_data?.company_type]?.label
            ? deliveryCompaniesType[delivery_companies_data?.company_type]
                ?.label
            : order.courier}
        </span>
      </TableCell>
    ),
    [PRINT_HEAD_CELL]: (
      <TableCell className="text-nowrap" align="right">
        {order && (
          <div
            className="pdf-display-none"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              window.open(
                `${link}?print=true`,
                "print",
                "width=1000,height=600"
              );
            }}
          >
            <div
              className="d-flex align-items-center"
              onClick={() => _addNote({ id: order?.id, type: "print" })}
            >
              <PrintRoundedIcon
                fontSize="small"
                style={{ color: graphite }}
                className="ml-3"
              />
              <div style={{ color: graphite }} className="d-inline-block">
                print
              </div>
            </div>
          </div>
        )}
      </TableCell>
    ),
    [HISTORY_HEAD_CELL]: (
      <TableCell
        align="center"
        style={{ minWidth: 150, width: 160, maxWidth: 170 }}
      >
        {orderHistories?.length
          ? orderHistories.reverse().map((item) => item)
          : "_"}
      </TableCell>
    ),
    [COL_1_HEAD_CELL]: (
      <TableCell className="text-nowrap" align="right"></TableCell>
    ),
    [COL_2_HEAD_CELL]: (
      <TableCell className="text-nowrap" align="right"></TableCell>
    ),
    [COL_3_HEAD_CELL]: (
      <TableCell className="text-nowrap" align="right"></TableCell>
    ),
  };

  return (
    <>
      <AssignCourierModal
        isOpen={UIModals[ASSIGN_COURIER_MODAL]}
        onClose={() => toggleModal(ASSIGN_COURIER_MODAL)}
        couriers={couriers}
        submit={(_courier) =>
          _assignDeliveryMan(
            order?.id,
            _courier,
            true,
            business.site_domain,
            actionForShouldUpdateListInAssignDelivery
          )
        }
        assignedCourierPhone={order?.deliverer_phone}
      />
      <TableRow
        component={Link}
        href={link}
        onContextMenu={handleContextMenu}
        hover
        style={{
          border: "1px solid #F0F2F3",
          cursor: "pointer",
          ...(iframe_from_pos && {
            borderRight: `8px solid ${
              orderStatusesBorderRightColor[orderStatus] || smoke
            }`,
          }),
        }}
      >
        {sortedColumns.map((column) => cells[column])}
      </TableRow>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem
          onClick={() => {
            window.open(link, "_blank");
            handleClose();
          }}
        >
          Opening in the new tab
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigator.clipboard.writeText(window.location.origin + link);
            _setSnackBarMessage("The order link was copied!", "success");
            handleClose();
          }}
        >
          Copy the link
        </MenuItem>
      </Menu>
    </>
  );
}

export default memo(AdminOrderCard);
