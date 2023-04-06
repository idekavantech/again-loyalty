import Button from "@material-ui/core/Button";
import ReactToPrint from "react-to-print";
import { setSnackBarMessage } from "@saas/stores/ui/actions";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDispatch } from "react-redux";
import QRCode from "qrcode.react";
import { useRef, useState } from "react";
import Add from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import Input from "@saas/components/Input";

export function JoiningTheCustomerClubLink({
  link,
  businessTitle,
  hasPlusToAddNewMedium,
  title,
  addUTMMedium,
  hasDeleteButton,
  deleteJoiningLink,
  submitNewMediumAdded,
  loading,
}) {
  const dispatch = useDispatch();

  const _setSnackBarMessage = (message, type) =>
    dispatch(setSnackBarMessage(message, type));
  const componentRef = useRef(null);
  const [value, setValue] = useState("");

  return (
    <div className="d-flex mt-3">
      <div
        className="d-flex justify-content-between align-items-center flex-wrap px-4 py-2 flex-1"
        style={{ background: "rgba(0, 0, 0, 0.04)", borderRadius: 8 }}
      >
        <div className="d-flex align-items-center">
          {hasDeleteButton && (
            <Button style={{ minWidth: "unset" }} onClick={deleteJoiningLink}>
              <CloseIcon />
            </Button>
          )}
          {title ? (
            <div>{title}</div>
          ) : (
            <Input size="medium" value={value} onChange={setValue} />
          )}
        </div>
        {title ? (
          <div className="d-flex">
            <CopyToClipboard
              onCopy={() => _setSnackBarMessage("The invitation link was copied.", "success")}
              text={link}
            >
              <Button color="primary">Copy the link</Button>
            </CopyToClipboard>
            <ReactToPrint
              trigger={() => <Button color="primary">print QR CODE</Button>}
              content={() => componentRef.current}
            />
          </div>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => submitNewMediumAdded(value)}
            disabled={loading}
          >
            Link building
          </Button>
        )}

        <div
          ref={componentRef}
          className="w-100 d-print-block u-text-black printable u-fontVerySmall a5-print m-0 px-1"
        >
          <div
            className="u-border-bottom-dark text-center"
            style={{ paddingTop: 50 }}
          >
            <QRCode size={400} value={link} />
          </div>
          <h1 className="text-center mt-5" style={{ fontSize: 24 }}>
            Subscribe to Customer Club{businessTitle}
          </h1>
        </div>
      </div>

      <Button
        className="mr-3 p-0"
        style={{
          width: "32px",
          minWidth: "unset",
          visibility: hasPlusToAddNewMedium ? "visible" : "hidden",
        }}
        onClick={addUTMMedium}
        disabled={!hasPlusToAddNewMedium}
      >
        <Add
          fontSize="small"
          color="primary"
          className="d-flex justify-content-center u-cursor-pointer"
        />
      </Button>
    </div>
  );
}
