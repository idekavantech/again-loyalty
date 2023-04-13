import React from "react";
import AdminOrderCard from "./AdminOrderCard";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import Skeleton from "@material-ui/lab/Skeleton";
import { useRouter } from "next/router";

import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import { getMonthName } from "@saas/utils/helpers/getMonthName";

import { getWeekDay } from "@saas/utils/helpers/getWeekDay";

import {
  FIRST_SUBMITTED_AT_ORDER,
  headCells,
  LAST_SUBMITTED_AT_ORDER,
} from "./constants";

export default function AdminOrdersTable({
  orders,
  business,
  urlPrefix,
  pluginUrl,
  isLoading,
  pluginData,
  dispatch = { dispatch },
  _assignDeliveryMan,
  _addNote,
  columns,
  actionForShouldUpdateListInAssignDelivery,
  BasePluginData,
}) {
  const router = useRouter();
  const ordersGroupsByDate =
    orders?.reduce((groups, order) => {
      const orderDate = moment(order.submitted_at);
      const formattedDate = persianToEnglishNumber(
        orderDate.format("YYYY-MM-DD")
      );
      if (!groups[formattedDate]) {
        groups[formattedDate] = [];
      }
      groups[formattedDate].push(order);
      return groups;
    }, {}) || {};

  return (
    <TableContainer
      className="mt-3"
      id={"admin-order-table"}
      style={{ maxHeight: 400 }}
    >
      <Table
        aria-labelledby="tableTitle"
        size="small"
        aria-label="enhanced table"
      >
        <TableHead
          style={{
            width: "100%",
            backgroundColor: "#F1F2FF",
            height: 50,
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          <TableRow style={{ width: "100%" }}>
            {headCells
              .filter((headCell) => columns.includes(headCell.id))
              .map((headCell) => (
                <TableCell
                  className="text-nowrap u-fontWeightBold"
                  key={headCell.id}
                  align={headCell.align}
                  color="text.primary"
                  style={{
                    minWidth: headCell.minWidth,
                    width: headCell.width,
                    maxWidth: headCell.maxWidth,
                  }}
                >
                  {headCell.label}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        {isLoading || !orders ? (
          <TableBody>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <TableRow style={{ height: 53 }} key={item}>
                {columns.map((cell, index) => (
                  <TableCell key={cell?.id}>
                    <Skeleton
                      style={{
                        transform: "scale(1)",
                        width: index === 0 ? 48 : "100%",
                        height: index === 0 ? 48 : "",
                      }}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            {Object.entries(ordersGroupsByDate)?.map(([key, orders]) => {
              const orderDate = new Date(key);
              const momentTime = moment(
                `${orderDate.getFullYear()}-${
                  orderDate.getMonth() + 1
                }-${orderDate.getDate()}`,
                "YYYY-MM-DD"
              );
              const weekday =
                orderDate.getDate() === new Date().getDate() &&
                orderDate.getMonth() === new Date().getMonth() &&
                orderDate.getFullYear() === new Date().getFullYear()
                  ? "Today"
                  : getWeekDay(momentTime.isoWeekday());
              const formattedTime = `${weekday}،${englishNumberToPersianNumber(
                momentTime.date()
              )} ${getMonthName(
                momentTime.month() + 1
              )} ${englishNumberToPersianNumber(momentTime.year())}`;
              return (
                <>
                  {(router.query.ordering === LAST_SUBMITTED_AT_ORDER ||
                    router.query.ordering === FIRST_SUBMITTED_AT_ORDER ||
                    typeof router.query.ordering === "undefined") && (
                    <TableRow
                      style={{
                        background: "#FAFBFB",
                        border: "1px solid #F0F2F3",
                        borderRight: "3px solid #FAFBFB",
                      }}
                    >
                      <TableCell
                        align="right"
                        className="py-3 px-4"
                        colSpan={columns.length}
                      >
                        {formattedTime}
                      </TableCell>
                    </TableRow>
                  )}
                  {orders.map((order) => (
                    <AdminOrderCard
                      BasePluginData={BasePluginData}
                      columns={columns}
                      dispatch={dispatch}
                      key={order.id}
                      order={order}
                      business={business}
                      pluginData={pluginData}
                      _assignDeliveryMan={_assignDeliveryMan}
                      link={`${urlPrefix}${pluginUrl}/orders/${order.id}`}
                      _addNote={_addNote}
                      formattedTime={formattedTime}
                      actionForShouldUpdateListInAssignDelivery={
                        actionForShouldUpdateListInAssignDelivery
                      }
                    />
                  ))}
                </>
              );
            })}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
