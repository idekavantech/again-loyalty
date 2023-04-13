/* eslint-disable indent */
import React from "react";
import moment from "moment";
import QRCode from "qrcode.react";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { getCountDown } from "@saas/utils/helpers/getCountDown";

import { deliveryTimeFormatter } from "@saas/utils/helpers/deliveryTimeFormatter";
import { deliveryIntervalFormatter } from "@saas/utils/helpers/deliveryIntervalFormatter";

import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import withTheme from "@material-ui/core/styles/withTheme";

import { DELIVERY_INTERVAL, DELIVERY_TIME } from "./constants";

// eslint-disable-next-line react/prefer-stateless-function
const printer_sizes = {
  a4: "90%",
  pos: "70mm",
};
class Print extends React.Component {
  render() {
    const { order, business, pluginData } = this.props;
    let cost = pluginData.data.delivery_costs_by_user
      ? "Customer"
      : "Free";
    if (+order.delivery_price === 999999) cost = "Out of the range of sending";
    else if (+order.delivery_price !== 0)
      cost = ` ${priceFormatter(+order.delivery_price)} $`;
    const {
      revised_title: title,
      get_vitrin_absolute_url: url,
      phone_zero_starts: phone,
      theme_config,
    } = business;
    const date = moment(order.submitted_at).format("YYYY/MM/DD - HH:mm:ss");
    const sortedItems = order.items ? [...order.items] : [];
    sortedItems.sort((a, b) => {
      let firstTotal = a.discounted_price;
      let secondTotal = b.discounted_price;
      if (a.modifiers)
        for (let i = 0; i < a.modifiers.length; i += 1)
          firstTotal += a.modifiers[i].price * (a.modifiers[i].amount || 1);
      if (b.modifiers)
        for (let j = 0; j < b.modifiers.length; j += 1)
          secondTotal +=
            b.modifiers?.[j]?.price * (a.modifiers?.[j]?.amount || 1);
      if (firstTotal > secondTotal) return -1;
      if (firstTotal < secondTotal) return 1;
      return 0;
    });
    const deliveryTimeOptions = {
      [DELIVERY_TIME]: order?.delivery_interval?.from_time
        ? `${deliveryTimeFormatter(
            order?.delivery_interval?.from_time
          )} (${englishNumberToPersianNumber(
            getCountDown(order?.delivery_time)
          )})`
        : null,
      [DELIVERY_INTERVAL]: order?.delivery_interval?.to_time
        ? deliveryIntervalFormatter(order?.delivery_interval)
        : null,
    };

    const finalDeliveryTime =
      deliveryTimeOptions[DELIVERY_INTERVAL] ||
      deliveryTimeOptions[DELIVERY_TIME];
    return (
      <div
        className="w-100 u-text-black printable u-fontVerySmall a5-print m-0 px-1"
        style={{
          width: printer_sizes[theme_config.printer_size || "pos"],
          float: "left",
        }}
      >
        <div className="px-3">
          <div className="py-1 u-border-bottom-dark">
            <div className="d-flex justify-content-between">
              <div className="px-2">
                <div className="u-fontLarge u-fontWeightBold">{title}</div>
                <div className="mt-1">{englishNumberToPersianNumber(date)}</div>
              </div>
              <QRCode value={url} />
            </div>
          </div>
          <div className="d-flex flex-column justify-content-between px-2 pb-1">
            <div className="mt-1 u-fontMedium">
              <span> Dear common: </span>
              {order.user_address && (
                <span className="u-fontWeightBold">
                  {order.user_address?.name}
                </span>
              )}
            </div>
            <div className="mt-1 u-fontMedium">
              <span>Order number: </span>
              <span className="u-fontWeightBold">
                {englishNumberToPersianNumber(order.order_id)}
              </span>
            </div>
            <div className="mt-1 u-fontMedium">
              <span>Invoice number: </span>
              <span className="u-fontWeightBold">
                {englishNumberToPersianNumber(order.order_number)}
              </span>
            </div>
            <div className="mt-4">
              <span>Phone: </span>
              {order.user_address && (
                <span className="u-fontWeightBold">
                  {englishNumberToPersianNumber(order.user_address?.phone)}
                </span>
              )}
            </div>

            <div className="mt-1">
              <span> The ordering address of the order: </span>
              {order.user_address && (
                <span className="u-fontWeightBold">
                  {order.user_address?.address}
                </span>
              )}
            </div>
            <div className="mt-1">
              <span> shipping time: </span>
              {finalDeliveryTime && (
                <span className="u-fontWeightBold">{finalDeliveryTime}</span>
              )}
            </div>

            <div className="mt-4 u-fontMedium">
              <span>Order description: </span>
              <span
                className="u-fontWeightBold"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {(order && order.description) || "does not have"}
              </span>
            </div>
            <div className="mt-4 u-fontMedium">
              <span>Sales Channel: </span>
              <span
                className="u-fontWeightBold"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {order?.sales_channel_name}
              </span>
            </div>
          </div>
          <style
            dangerouslySetInnerHTML={{
              __html: `
            #print-table , #print-table *{
              margin: 0px !important
            }
              #print-table{
                border-collapse: collapse;
                box-sizing: content-box;
                border-spacing: 0px;
              }

              #print-table, #print-table td, #print-table th{
                border: 1px solid #333333;
                margin: 0px;
              }
              #print-table th,#print-table tr{
                margin: 0px;
              }
              #print-table th, #print-table td {
                padding: 4px;
                text-align: right;
              }
            `,
            }}
          />
          <div className="px-2">
            <table id="print-table" className="w-100">
              <tr className="d-flex flex-row u-fontWeightBold w-100">
                <th style={{ whiteSpace: "pre-wrap", width: "45%" }}>
                  Product Name
                </th>

                <th className="text-center" style={{ width: "15%" }}>
                  Number
                </th>
                <th className="text-center" style={{ width: "20%" }}>
                  Price
                </th>
                <th className="text-center" style={{ width: "20%" }}>
                  Total price
                </th>
              </tr>

              {sortedItems.map((item) => (
                <>
                  <tr
                    key={item.id}
                    className={`d-flex m-0 flex-row w-100 u-fontWeightBold ${
                      item.modifiers?.length ? "" : "u-border-bottom-dark"
                    }`}
                  >
                    <td
                      className=""
                      style={{
                        width: "45%",
                      }}
                    >
                      {item.product_title}{" "}
                      {item?.variation_title ? item?.variation_title : ""}
                    </td>
                    <td
                      className="text-center u-fontMedium"
                      style={{ width: "15%" }}
                    >
                      {englishNumberToPersianNumber(item.amount)}
                    </td>

                    <td className="text-center" style={{ width: "20%" }}>
                      {priceFormatter(item.discounted_price)}
                    </td>
                    <td className="text-center" style={{ width: "20%" }}>
                      {priceFormatter(item.discounted_price * item.amount)}
                    </td>
                  </tr>
                  {item.modifiers?.map((_item) => (
                    <tr
                      className="d-flex flex-row u-border-bottom-dark m-0 w-100 u-fontWeightBold"
                      key={`order-item-${_item.id}`}
                    >
                      <td
                        className=""
                        style={{
                          width: "45%",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {_item.modifier_title}
                      </td>
                      <td
                        className="text-center  u-fontMedium"
                        style={{ width: "15%" }}
                      >
                        {englishNumberToPersianNumber(
                          _item.amount * item.amount
                        )}
                      </td>
                      <td className="text-center" style={{ width: "20%" }}>
                        {priceFormatter(_item.price)}
                      </td>
                      <td className="text-center" style={{ width: "20%" }}>
                        {priceFormatter(
                          _item.price * _item.amount * item.amount
                        )}
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </table>
          </div>
          <div className="d-flex flex-column justify-content-between px-3 pb-1 u-border-bottom-dark">
            <div className="mt-1">
              <span>Initial price: </span>
              <span
                className="u-fontWeightBold"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {priceFormatter(order.total_items_initial_price)} $
              </span>
            </div>
            {order?.total_discount ? (
              <div className="mt-1">
                <span>Discount Products: </span>
                <span
                  className="u-fontWeightBold"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {priceFormatter(order?.total_discount)}
                  <span style={{ marginRight: 2 }}>-</span> ${" "}
                </span>
              </div>
            ) : null}
            {order?.discount_code_amount ? (
              <div className="mt-1">
                <span> discount code: </span>
                <span
                  className="u-fontWeightBold"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {priceFormatter(order?.discount_code_amount)}
                  <span style={{ marginRight: 2 }}>-</span>
                  <span className="mr-1">$</span>
                </span>
              </div>
            ) : null}
            {order?.coupon_discount_amount ? (
              <div className="mt-1">
                <span> discount code: </span>
                <span
                  className="u-fontWeightBold"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {priceFormatter(order?.coupon_discount_amount)}
                  <span style={{ marginRight: 2 }}>-</span>
                  <span className="mr-1">$</span>
                </span>
              </div>
            ) : null}
            <div className="mt-1">
              <span>The sum of the discounts and the credit of the gift: </span>
              <span
                className="u-fontWeightBold"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {priceFormatter(order?.total_discount_amount)} $
              </span>
            </div>
            {order?.total_packaging_price ? (
              <div className="mt-1">
                <span>Packaging cost: </span>
                <span
                  className="u-fontWeightBold"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {priceFormatter(order?.total_packaging_price)} $
                </span>
              </div>
            ) : null}
            <div className="mt-1">
              <span>shipping cost: </span>
              <span className="u-fontWeightBold">{cost}</span>
            </div>
            {order?.taxing_price ? (
              <div className="mt-1">
                <span>Value added tax: </span>
                <span
                  className="u-fontWeightBold"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {priceFormatter(order?.taxing_price)} $
                </span>
              </div>
            ) : null}

            <div className="mt-1 u-fontMedium">
              <span>Payable: </span>
              <span
                className="u-fontWeightBold u-background-black p-1"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {priceFormatter(order?.total_price)} $
              </span>
            </div>
            <div className="mt-1 u-fontMedium">
              <span>Paid: </span>
              <span
                className="u-fontWeightBold u-background-black p-1"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {priceFormatter(order?.paid_price)} $
              </span>
            </div>
            <div className="mt-1 u-fontMedium">
              <span> Remaining: </span>
              <span
                className="u-fontWeightBold u-background-black p-1"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {priceFormatter(order?.should_pay)} $
              </span>
            </div>
            <span className="u-fontWeightBold mt-2">
              {order?.payment_status === 1 ? "Online" : "Cash"}
            </span>
          </div>
          <div className="mt-1 px-3">
            <span>{title}: </span>
            <span className="u-fontWeightBold">{phone}</span>
          </div>
          <div className="mt-1 px-3">
            <span>{url}</span>
          </div>
        </div>
      </div>
    );
  }
}
export default withTheme(Print);
