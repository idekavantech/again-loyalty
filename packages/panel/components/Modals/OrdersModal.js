import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CloseIcon from "@material-ui/icons/Close";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import InsertInvitationIcon from "@material-ui/icons/InsertInvitation";
import Image from "next/image";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";


const OrdersModal = ({
  isOpen,
  onClose,
  adminOrdersWidget,
  urlPrefix,
  pluginUrl,
}) => {
  const desktopMatches = useMediaQuery("(min-width:768px)");
  const router = useRouter();
  return (
    <Dialog
      open={isOpen}
      scroll="paper"
      onClose={onClose}
      onClick={onClose}
      PaperProps={{
        style: { borderRadius: 8, margin: 0 },
      }}
    >
      <DialogTitle className="p-0">
        <div
          className="  d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "#fff", padding: desktopMatches ? 16 : 8 }}
        >
          <div
            className="position-absolute"
            style={{
              right: desktopMatches ? 16 : 8,
              width: desktopMatches ? 32 : 24,
              height: desktopMatches ? 32 : 24,
            }}
          >
            <CloseIcon
              style={{ fontSize: desktopMatches ? 32 : 24, cursor: "pointer" }}
            />
          </div>

          <span className="w-100 text-center">Orders</span>
        </div>
      </DialogTitle>
      <DialogContent
        className="m-0 d-flex flex-column justify-content-center"
        style={{
          overflowY: "hidden",
          borderRadius: 8,
          width: desktopMatches ? 444 : 341,
          padding: desktopMatches ? 24 : 20,
          backgroundColor: "#F6F6F7",
          color: "#8C9196",
          fontSize: desktopMatches ? 14 : 15,
        }}
        onClick={onClose}
      >
        <p>
          {" "}
          New order(
          {englishNumberToPersianNumber(adminOrdersWidget?.ordersAmount)})
        </p>
        <p className="mt-3 mb-2">
          Faster to approve or cancel orders.
        </p>
        <div
          className="scrollbar-hidden"
          style={{ maxHeight: 500, overflowY: "scroll" }}
        >
          {adminOrdersWidget?.orders?.map((order) => {
            const orderDate = new Date(order?.submitted_at);
            return (
              <div
                key={order.id}
                className="cursor-pointer mt-4 p-4 d-flex align-items-center "
                style={{
                  borderRadius: 8,
                  backgroundColor: "#fff",
                  fontSize: desktopMatches ? 14 : 13,
                  fontWeight: 500,
                }}
                id="test"
                onClick={() =>
                  router.push(
                    `${urlPrefix}${pluginUrl}/orders/${order.id}?is_edited=true`
                  )
                }
              >
                <div>
                  <div className="d-flex align-items-center">
                    <PersonRoundedIcon
                      style={{ fontSize: desktopMatches ? 16 : 12 }}
                    />
                    <span className="mr-1">
                      {order?.user_address?.name || "Test user"}
                    </span>
                  </div>
                  <div className="mt-2 d-flex align-items-center">
                    <Image
                      alt=""
                      width={desktopMatches ? 16 : 12}
                      height={desktopMatches ? 16 : 12}
                      src={`/images/price-1.svg`}
                    />
                    <span className="mr-1">
                      {priceFormatter(order?.total_price)}
                    </span>
                  </div>
                </div>
                <div className=" mr-5">
                  <div className="d-flex align-items-center">
                    <WatchLaterIcon
                      style={{ fontSize: desktopMatches ? 16 : 12 }}
                    />
                    <span className="mr-1">
                      {orderDate.toLocaleTimeString("fa-IR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <div className="mt-2 d-flex align-items-center">
                    <InsertInvitationIcon
                      style={{ fontSize: desktopMatches ? 16 : 12 }}
                    />
                    <span className="mr-1">
                      {orderDate.toLocaleDateString("fa-IR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginRight: "auto", color: "#fff" }}
                >
                  View
                </Button>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrdersModal;
