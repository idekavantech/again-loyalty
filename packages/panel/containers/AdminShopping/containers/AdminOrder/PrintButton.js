import React, { memo, useRef } from "react";
import Button from "@material-ui/core/Button";
import PrintRoundedIcon from "@material-ui/icons/PrintRounded";
import Print from "./Print";
import { useRouter } from "next/router";
import { useReactToPrint } from "react-to-print";

function PrintButton({
  order,
  business,
  color,
  pluginData,
  hasButton = true,
  ref,
}) {
  const router = useRouter();
  const componentRef = useRef();
  const iframe_from_pos =
    router.query.iframe_from_pos || typeof sessionStorage !== "undefined"
      ? sessionStorage.getItem("iframe_from_pos")
      : false;

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      {!iframe_from_pos ? (
        hasButton ? (
          <Button
            fullWidth
            ref={ref}
            style={{ color }}
            onClick={handlePrint}
            id="print"
            className="d-flex text-nowrap justify-content-center align-items-center"
          >
            <PrintRoundedIcon style={{ color }} />
            <div className="d-inline-block mr-1">print</div>
          </Button>
        ) : (
          <div
            className="d-flex align-items-center w-100"
            ref={ref}
            id="print"
            onClick={handlePrint}
          >
            <PrintRoundedIcon
              fontSize="small"
              style={{ color }}
              className="ml-3"
            />
            <div style={{ color }} className="d-inline-block">
              print
            </div>
          </div>
        )
      ) : (
        <div
          className="d-flex align-items-center w-100"
          id="print"
          onClick={() =>
            window.parent.postMessage(
              JSON.stringify({ type: "order", order }),
              "*"
            )
          }
        >
          <PrintRoundedIcon
            fontSize="small"
            style={{ color }}
            className="ml-3"
          />
          <div style={{ color }} className="d-inline-block">
            print
          </div>
        </div>
      )}
      <div style={{ display: "none" }}>
        <Print
          pluginData={pluginData}
          ref={componentRef}
          order={order}
          business={business}
        />
      </div>
    </>
  );
}

export default memo(PrintButton);
