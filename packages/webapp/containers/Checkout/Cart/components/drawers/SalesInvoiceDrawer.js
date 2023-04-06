import React, { memo } from "react";

import { coal, graphite, night, pollution } from "@saas/utils/colors";
import IconComponent from "@saas/components/Icon";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { $ } from "@saas/icons";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import { FULFILLMENT_ON_USER_SITE } from "@saas/plugins/Shopping/constants";

import { Collapse } from "react-collapse";
import Paper from "@material-ui/core/Paper";
import ArrowDropUpRoundedIcon from "@material-ui/icons/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import ErrorRoundedIcon from "@material-ui/icons/ErrorRounded";

function SalesInvoiceDrawer({
  isSalesInvoiceDrawerOpen,
  setSalesInvoiceDrawerOpen,
  toggleDrawer,
  setPriceDetailsCollapseOpen,
  isPriceDetailsCollapseOpen,
  allItemsCount,
  allItemsPrice,
  orders,
  allItemsDiscounts,
  selectedFulfillmentType,
  amountOfTax,
  business,
  themeColor,
}) {
  return (
    <Drawer
      anchor="bottom"
      open={isSalesInvoiceDrawerOpen}
      onClose={(event) => {
        const setStateFunction = () => setSalesInvoiceDrawerOpen(false);
        toggleDrawer(setStateFunction)(event);
      }}
      classes={{ paperAnchorBottom: "drawer-border-radius" }}
    >
      <Paper elevation={1} style={{ padding: "15px 20px 95px 20px" }}>
        <div className="d-flex justify-content-between align-items-center mb-2 w-100">
          <IconButton
            className="p-0"
            onClick={() => setSalesInvoiceDrawerOpen(false)}
            style={{ color: night }}
          >
            <CancelRoundedIcon />
          </IconButton>
          <span
            style={{ color: coal }}
            className="u-fontLarge  u-fontWeightBold"
          >
            جزییات قیمت
          </span>
          <IconButton
            className="p-0"
            onClick={() => setSalesInvoiceDrawerOpen(false)}
            style={{ color: night, visibility: "hidden" }}
          >
            <CancelRoundedIcon />
          </IconButton>
        </div>
        <section>
          <div
            className="d-flex justify-content-between align-items-center py-3"
            style={{
              borderBottom: !isPriceDetailsCollapseOpen && "1px solid #E0E5E8",
            }}
          >
            <div
              className="d-flex align-items-center u-cursor-pointer"
              onClick={() =>
                setPriceDetailsCollapseOpen(!isPriceDetailsCollapseOpen)
              }
            >
              <span style={{ color: night }} className="u-fontNormal">
                جمع محصولات ({englishNumberToPersianNumber(allItemsCount)})
              </span>
              <div className="d-flex">
                {isPriceDetailsCollapseOpen ? (
                  <ArrowDropUpRoundedIcon />
                ) : (
                  <ArrowDropDownRoundedIcon />
                )}
              </div>
            </div>
            <span style={{ color: night }} className="u-fontMedium">
              {priceFormatter(allItemsPrice)}{" "}
              <IconComponent
                icon={$}
                width={21}
                height={21}
                color={night}
              />
            </span>
          </div>
          <Collapse isOpened={isPriceDetailsCollapseOpen}>
            {orders?.map((order, index) => {
              const modifiers_price = order.modifiers?.reduce(
                (a, b) => +a + +b?.discounted_price * (b.amount || 1),
                0
              );
              const variationId = order.variation_id;
              const selectedVariation = order.product?.variations?.find(
                (variation) => variation.id === variationId
              );
              return (
                <div
                  className={`d-flex flex-column ${
                    index === 0 ? "pb-3" : "py-3"
                  }`}
                  key={order.id}
                  style={{
                    borderBottom:
                      index !== orders.length - 1
                        ? "1px dashed #EDEDED"
                        : "1px solid #E0E5E8",
                  }}
                >
                  <div>
                    <div className="d-flex justify-content-between">
                      <div
                        style={{ color: graphite, lineHeight: 2 }}
                        className="u-font-semi-small w-50"
                      >
                        {order.product.title}
                        {"  "}
                        {`(${englishNumberToPersianNumber(order.count)})`}
                      </div>
                      <div
                        style={{ color: graphite }}
                        className="u-font-semi-small"
                      >
                        {priceFormatter(
                          selectedVariation?.initial_price * order.count
                        )}
                        {"  "}
                        <IconComponent
                          icon={$}
                          width={21}
                          height={21}
                          color={graphite}
                        />
                      </div>
                    </div>
                    {order.modifiers?.length ? (
                      <div
                        className="d-flex align-items-center u-fontVerySmall mt-2"
                        style={{ color: pollution }}
                      >
                        <div className="ml-1">موارد افزودنی</div>
                        <div>
                          ({priceFormatter(modifiers_price)}{" "}
                          <IconComponent
                            icon={$}
                            width={21}
                            height={21}
                            color={pollution}
                          />
                          )
                        </div>
                      </div>
                    ) : null}
                    {order.modifiers?.map((item) => (
                      <div
                        key={item.id}
                        style={{ color: pollution }}
                        className="d-flex align-items-center u-fontVerySmall mt-2"
                      >
                        <div>
                          {englishNumberToPersianNumber(item.amount || 1)} x
                        </div>
                        <span className="mr-1">{item.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </Collapse>
          <div
            className="d-flex justify-content-between align-items-center py-3 u-fontNormal mb-3"
            style={{ borderBottom: "1px solid #E0E5E8" }}
          >
            <span style={{ color: pollution }}>تخفیف محصولات</span>
            <span style={{ color: themeColor }}>
              {priceFormatter(allItemsDiscounts)}
              {allItemsDiscounts ? (
                <span style={{ marginRight: 2 }}>-</span>
              ) : null}{" "}
              <IconComponent
                icon={$}
                width={21}
                height={21}
                color={themeColor}
              />
            </span>
          </div>
          {selectedFulfillmentType?.name === FULFILLMENT_ON_USER_SITE ? (
            <div className="d-flex flex-column u-fontNormal">
              <div className="d-flex justify-content-between pb-3">
                <span style={{ color: night }}>هزینه ارسال</span>
                <span style={{ color: night }}>نامشخص</span>
              </div>
              <div className="d-flex pb-3" style={{ color: pollution }}>
                <ErrorRoundedIcon fontSize="small" className="ml-2" />
                <div
                  className="u-fontVerySmall text-justify"
                  style={{ lineHeight: 1.8 }}
                >
                  هزینه ارسال در ادامه بر اساس آدرس، زمان و نحوه ارسال انتخابی
                  شما محاسبه و به این مبلغ اضافه خواهد شد.
                </div>
              </div>
            </div>
          ) : null}
          {amountOfTax && (
            <div
              className="d-flex justify-content-between align-items-center pb-3 u-fontNormal"
              style={{
                color: night,
                borderBottom: "1px solid #E0E5E8",
              }}
            >
              <span className="u-fontNormal">
                ماليات بر ارزش افزوده (٪
                {englishNumberToPersianNumber(
                  business?.plugins_config?.[SHOPPING_PLUGIN]?.data?.taxing
                    ?.percent
                )}
                )
              </span>
              <span>
                {priceFormatter(amountOfTax)}{" "}
                <IconComponent
                  icon={$}
                  width={21}
                  height={21}
                  color={coal}
                />
              </span>
            </div>
          )}
          <div className="d-flex justify-content-between align-items-center mt-3 u-fontWeightBold">
            <span style={{ color: coal }} className="u-fontNormal">
              مبلغ قابل پرداخت
            </span>
            <span style={{ color: coal }} className="u-fontMedium">
              {priceFormatter(allItemsPrice + amountOfTax - allItemsDiscounts)}{" "}
              <IconComponent icon={$} width={21} height={21} color={coal} />
            </span>
          </div>
        </section>
      </Paper>
    </Drawer>
  );
}
export default memo(SalesInvoiceDrawer);
