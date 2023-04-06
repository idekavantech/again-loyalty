import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Link from "next/link";
import moment from "moment-jalaali";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";

const timeFormatter = (date) => {
  const orderDate = new Date(date);
  const orderTime = moment(
    `${orderDate.getFullYear()}-${orderDate.getMonth() + 1}-${orderDate.getDate()}`,
    "YYYY-MM-DD"
  );
  return date ? englishNumberToPersianNumber(orderTime.format("jYYYY/jMM/jDD")) : "-";
};

export default function CRMDiscountRow({ discountCodeData, adminUrlPrefix }) {
  return (
    <TableRow
      component={Link}
      href={`${adminUrlPrefix}crm/customer_discount/edit/${discountCodeData?.id}`}
      style={{
        borderBottom: "1px solid #E4E6E7",
        height: 72,
        fontSize: "16px",
        fontWeight: 600,
      }}
      className="cursor-pointer"
    >
      <TableCell className="text-nowrap" align="right" style={{ fontSize: "16px", fontWeight: 600 }}>
        {timeFormatter(discountCodeData?.created_at)}
      </TableCell>
      <TableCell className="text-nowrap" align="right" style={{ fontSize: "16px", fontWeight: 600 }}>
        {discountCodeData?.code}
      </TableCell>
      <TableCell className="text-nowrap" align="right" style={{ fontSize: "16px", fontWeight: 600 }}>
        {discountCodeData?.discount_percent
          ? `${englishNumberToPersianNumber(discountCodeData.discount_percent)} Percent`
          : `${priceFormatter(discountCodeData?.discount_price)} $`}
      </TableCell>
      <TableCell className="text-nowrap" align="right" style={{ fontSize: "16px", fontWeight: 600 }}>
        {timeFormatter(discountCodeData?.expiration_date)}
      </TableCell>
    </TableRow>
  );
}
