import React, { memo } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import Modal from "@saas/components/Modal";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { makeSelectAdminOrdersWidget } from "@saas/stores/plugins/selector";
import LazyImage from "@saas/components/LazyImage";
import ModalHeader from "@saas/components/Modal/ModalHeader";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import InsertInvitationIcon from "@material-ui/icons/InsertInvitation";
import Image from "next/image";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import { makeSelectPlugin } from "@saas/stores/plugins/selector";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";

import { makeSelectLoading } from "@saas/stores/global/selectors";
import LoadingIndicator from "@saas/components/LoadingIndicator";

function OrderNotificationsModal({
  isOpen,
  onClose,
  adminOrdersWidget,
  urlPrefix,
  pluginData,
  isLoading,
}) {
  const desktopMatches = useMediaQuery("(min-width:768px)");
  const pluginUrl = pluginData.plugin_url;
  const router = useRouter();

  if (!localStorage.getItem("order") || !adminOrdersWidget?.orders.length) {
    return (
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        style={{
          borderRadius: 8,
          margin: 0,
          maxWidth: desktopMatches ? 520 : 320,
          height: "fit-content",
        }}
        header={
          <ModalHeader
            onRightClick={onClose}
            style={{
              fontSize: 20,
              fontWeight: 500,
              lineHeight: "32px",
              color: "#202223",
            }}
            title="Orders"
          />
        }
        body={
          <div
            className="p-4 text-right u-fontLarge"
            style={{ backgroundColor: "#F6F6F7" }}
          >
            {isLoading ? (
              <LoadingIndicator />
            ) : (
              <>
                <p>New order(۰)</p>
                <p className="mt-3">
                  You don't have a new order. Can you enter the section by entering{" "}
                  <Link href={`${urlPrefix}${pluginUrl}/orders`}>
                    <span style={{ color: "#0050FF", cursor: "pointer" }}>
                      {" "}
                      Order management{" "}
                    </span>
                  </Link>
                  View and manage previous orders.
                </p>
                <div className="w-100 d-flex justify-content-center mt-5 pt-2">
                  <LazyImage
                    width={200}
                    height={200}
                    src={`/images/no-data.svg`}
                  />
                </div>
              </>
            )}
          </div>
        }
      />
    );
  }
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      style={{
        borderRadius: 8,
        margin: 0,
        maxWidth: desktopMatches ? 520 : 320,
        height: "fit-content",
      }}
      header={
        <ModalHeader
          style={{
            fontSize: 20,
            fontWeight: 500,
            lineHeight: "32px",
            color: "#202223",
          }}
          onRightClick={onClose}
          title="Orders"
        />
      }
      body={
        <div className="u-fontLarge p-4" style={{ backgroundColor: "#F6F6F7" }}>
          <p>
            New order(
            {englishNumberToPersianNumber(adminOrdersWidget?.orders?.length)})
          </p>
          <p className="mt-3">
            Faster to approve or cancel orders.
          </p>
          <div
            className="scrollbar-hidden"
            style={{ maxHeight: 350, overflowY: "scroll" }}
          >
            {adminOrdersWidget?.orders?.map((order) => {
              const orderDate = new Date(order?.submitted_at);
              return (
                <div
                  key={order.id}
                  className="cursor-pointer mt-4 p-2 p-md-4 d-flex align-items-center "
                  style={{
                    borderRadius: 8,
                    backgroundColor: "#fff",
                    fontSize: desktopMatches ? 16 : 14,
                    fontWeight: 500,
                  }}
                  id="test"
                  onClick={() => {
                    router.push(
                      `${urlPrefix}${pluginUrl}/orders/${order.id}?is_edited=true`
                    );
                    onClose();
                  }}
                >
                  <div className="flex-1 d-flex justify-content-between">
                    <div>
                      <div className="d-flex align-items-center">
                        <PersonRoundedIcon
                          style={{ fontSize: desktopMatches ? 16 : 14 }}
                        />
                        <span
                          className="mr-1"
                          style={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            width: desktopMatches ? 175 : 62,
                          }}
                        >
                          {order?.user_address?.name || "Test user"}
                        </span>
                      </div>
                      <div className="mt-2 mt-md-5 d-flex align-items-center">
                        <Image
                          width={desktopMatches ? 16 : 14}
                          height={desktopMatches ? 16 : 14}
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
                          style={{ fontSize: desktopMatches ? 16 : 14 }}
                        />
                        <span className="mr-1">
                          {orderDate.toLocaleTimeString("fa-IR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      <div className="mt-2 mt-md-5 d-flex align-items-center">
                        <InsertInvitationIcon
                          style={{ fontSize: desktopMatches ? 16 : 14 }}
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
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    className="mr-4"
                    style={{ color: "#fff", fontWeight: 400, borderRadius: 8 }}
                  >
                    View
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      }
    />
  );
}

const mapStateToProps = createStructuredSelector({
  adminOrdersWidget: makeSelectAdminOrdersWidget(),
  isLoading: makeSelectLoading("adminOrders"),
  urlPrefix: makeSelectAdminUrlPrefix(),
  pluginData: makeSelectPlugin(SHOPPING_PLUGIN),
});

function mapDispatchToProps() {
  return {};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,

  memo
)(OrderNotificationsModal);
