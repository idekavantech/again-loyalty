import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import Link from "next/link";
import moment from "moment-jalaali";
import { Checkbox } from "@material-ui/core";

const timeFormatter = (date) => {
  if (!date) return "--";
  const orderDate = new Date(date * 1000);
  const orderTime = moment(
    `${orderDate.getFullYear()}-${orderDate.getMonth() + 1}-${orderDate.getDate()}`,
    "YYYY-MM-DD"
  );
  return orderTime ? englishNumberToPersianNumber(orderTime.format("jYYYY/jMM/jDD")) : "--";
};
const averagePurchaseAmount = (total, count) => {
  return priceFormatter(total / count);
};
export default function CRMMembershipsListTable({
  CRMMembership,
  adminUrlPrefix,
  selectedMembershipIds,
  onMembershipClick,
  labels,
}) {
  return (
    <TableRow
      component={Link}
      href={`${adminUrlPrefix}crm/customers/${CRMMembership.id}`}
      style={{
        borderBottom: "1px solid #E4E6E7",
        height: 72,
        fontSize: "16px",
        fontWeight: 600,
      }}
      className="cursor-pointer"
    >
      <TableCell
        className="text-nowrap"
        align="right"
        style={{ fontSize: "16px", fontWeight: 600 }}
        onClick={(e) => onMembershipClick(e, CRMMembership.id)}
      >
        <Checkbox checked={Boolean(selectedMembershipIds.includes(CRMMembership.id))} color="primary" />
      </TableCell>
      <TableCell className="text-nowrap" align="right" style={{ fontSize: "16px", fontWeight: 600 }}>
        {CRMMembership.name}
      </TableCell>
      <TableCell className="text-nowrap" align="right" style={{ fontSize: "16px", fontWeight: 600 }}>
        {englishNumberToPersianNumber(CRMMembership?.user?.phone_zero_starts)}
      </TableCell>
      <TableCell className="text-nowrap" align="right" style={{ fontSize: "16px", fontWeight: 600 }}>
        {englishNumberToPersianNumber(CRMMembership?.point_credit)}
      </TableCell>
      <TableCell className="text-nowrap" align="right" style={{ fontSize: "16px", fontWeight: 600 }}>
        {priceFormatter(CRMMembership.gift_credit)}
        <span className="mr-1">$</span>
      </TableCell>
      <TableCell className="text-nowrap" align="right" style={{ fontSize: "16px", fontWeight: 600 }}>
        {priceFormatter(CRMMembership.wallet_credit)}
        <span className="mr-1">$</span>
      </TableCell>
      <TableCell className="text-nowrap" align="right" style={{ fontSize: "16px", fontWeight: 600 }}>
        {priceFormatter(CRMMembership.aggregated_data?.review?.satisfaction)}
      </TableCell>
      <TableCell className="text-nowrap" align="right" style={{ fontSize: "16px", fontWeight: 600 }}>
        {CRMMembership?.labels
          ?.map((label) => labels?.find((labelItem) => labelItem?.id === label)?.title || "")
          .join(" , ")}
      </TableCell>
      <TableCell className="text-nowrap" align="right" style={{ fontSize: "16px", fontWeight: 600 }}>
        {CRMMembership?.utm_data?.medium}
      </TableCell>
      <TableCell className="text-nowrap" align="right" style={{ fontSize: "16px", fontWeight: 600 }}>
        {timeFormatter(CRMMembership.aggregated_data?.order?.first_date)}
      </TableCell>
      <TableCell className="text-nowrap" align="right" style={{ fontSize: "16px", fontWeight: 600 }}>
        {timeFormatter(CRMMembership.aggregated_data?.order?.last_date)}
      </TableCell>
      <TableCell className="text-nowrap" align="right" style={{ fontSize: "16px", fontWeight: 600 }}>
        {englishNumberToPersianNumber(CRMMembership.aggregated_data?.order?.count)}
      </TableCell>
      <TableCell className="text-nowrap" align="right" style={{ fontSize: "16px", fontWeight: 600 }}>
        {averagePurchaseAmount(
          CRMMembership.aggregated_data?.order?.total,
          CRMMembership.aggregated_data?.order?.count
        )}
        <span className="mr-1">$</span>
      </TableCell>
      <TableCell className="text-nowrap" align="right" style={{ fontSize: "16px", fontWeight: 600 }}>
        {priceFormatter(CRMMembership.aggregated_data?.order?.total)}
        <span className="mr-1">$</span>
      </TableCell>
    </TableRow>
  );
}
