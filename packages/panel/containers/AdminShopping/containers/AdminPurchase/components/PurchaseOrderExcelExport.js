import React from "react";
import ListItem from "@material-ui/core/ListItem";
import { purchaseLogStatusOptions } from "store/constants";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import ListItemText from "@material-ui/core/ListItemText";
import moment from "moment";

export default function PurchaseOrderExcelExport({ purchase }) {
  const expectedDate = new Date(purchase.expected_date_to_receive);
  const expectedTime = moment(
    `${expectedDate.getFullYear()}-${
      expectedDate.getMonth() + 1
    }-${expectedDate.getDate()}`,
    "YYYY-MM-DD"
  );

  return (
    <ListItem
      button
      onClick={() => {
        let csvContent = "data:text/csv;charset=utf-8,%EF%BB%BF";
        const content = [
          ["name", "ID", "Note", "Number", "Unit price", "Total price", "Condition"],
          ...purchase.items
            .map((item) => [
              [
                item.title || "",
                item.sku || "",
                item.description || "",
                item.amount || "",
                item.price || "",
                item.amount * item.price || "",
                item.amount > item.supplied_amount ? "Open" : "Archive",
              ],
              ...item.received_amount.map((historyItem) => [
                item.title || "",
                item.sku || "",
                item.description || "",
                historyItem.amount || "",
                item.price || "",
                historyItem.amount * item.price || "",
                purchaseLogStatusOptions.find(
                  (o) => o.status === historyItem.reason
                )?.text || "",
              ]),
            ])
            .reduce((arr, current) => [...arr, ...current], []),
          [],
          ["Supplier", purchase.supplier_business.name],
          ["Address", purchase.supplier_business.address],
          ["Phone number", purchase.supplier_business.phone],
          ["email", purchase.supplier_business.email],
          ["The relevant responsible", purchase.supplier_business?.assignee?.name],
          [],
          ["Send to", purchase.submitter_business.name],
          ["Address", purchase.submitter_business.address],
          ["Phone number", purchase.submitter_business.phone],
          [
            "Delivery time",
            englishNumberToPersianNumber(expectedTime.format("YYYY/MM/DD")),
          ],
          ["notes", purchase.description],
          ["email", purchase.submitter_business.email],
          ["The relevant responsible", purchase.submitter_business?.assignee?.name],
        ]
          .map((e) => e.join(","))
          .join("\n");
        let encodedUri = csvContent + encodeURIComponent(content);
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${purchase.order_id}.csv`);
        document.body.appendChild(link); // Required for FF
        link.click();
      }}
    >
      <ListItemText className="text-right">Download Excel</ListItemText>
    </ListItem>
  );
}
