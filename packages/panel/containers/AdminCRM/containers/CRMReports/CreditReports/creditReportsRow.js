import TableRow from "@material-ui/core/TableRow";
import { memo } from "react";
import jMoment from "moment-jalaali";

jMoment.locale("fa");
jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

function CreditReportRow(props) {
  const { reportRow, tableHeaders } = props;
  return (
    <TableRow
      className="d-flex align-items-center faq-box my-1 position-relative text-right rtl"
      style={{
        borderBottom: "1px solid #E4E6E7",
        overflowX: "hidden",
        height: 56,
        fontWeight: 400,
        fontSize: 14,
      }}
      key={reportRow?.id}
    >
      {tableHeaders.map((tableHeader,idx) => {
        const { width, minWidth, fontWeight, fontSize, type, aligh, formater } =
          tableHeader;
        return (
          <div
          key={idx}
            className="text-nowrap pr-4"
            align={aligh}
            style={{
              width,
              minWidth,
              fontWeight,
              fontSize,
            }}
          >
            {formater ? formater(reportRow[type]) : reportRow[type]}
          </div>
        );
      })}
    </TableRow>
  );
}

export default memo(CreditReportRow);
