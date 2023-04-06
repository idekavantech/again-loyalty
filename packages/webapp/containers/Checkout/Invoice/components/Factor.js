import React, { memo } from "react";

import { coal, graphite, night, pollution } from "@saas/utils/colors";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import Icon from "@saas/components/Icon";
import { $ } from "@saas/icons";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import {
  FULFILLMENT_ON_BUSINESS_SITE,
  FULFILLMENT_ON_USER_SITE,
  FULFILLMENT_ON_WEBSITE,
} from "@saas/plugins/Shopping/constants";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

import { Collapse } from "react-collapse";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowDropUpRoundedIcon from "@material-ui/icons/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";

function Factor({
  setPriceDetailsCollapseOpen,
  isPriceDetailesCollapseOpen,
  allItemsCount,
  orderInfo,
  priceDetails,
  orders,
  themeColor,
  deliveryCostCopyRight,
  payableAmount,
  isUsingWallet,
  walletCredit,
  deductedAmountFromWallet,
  isLoading,
  callToActionConfig,
  finalSubmit,
  isSubmitButtonDisabled,
}) {
  const { minWidth768 } = useResponsive();
  return (
    <section className="col-12 col-md-4" style={{ marginBottom: 70 }}>
      <Paper elevation={1} className="p-4">
        <div
          className="d-flex flex-column mb-3"
          style={{
            borderBottom: !isPriceDetailesCollapseOpen && "1px solid #E0E5E8",
          }}
        >
          <div
            className="d-flex justify-content-between align-items-center u-cursor-pointer pb-3"
            onClick={() =>
              setPriceDetailsCollapseOpen(!isPriceDetailesCollapseOpen)
            }
          >
            <div className="d-flex align-items-center">
              <span style={{ color: night }} className="u-fontNormal">
                جمع محصولات ({englishNumberToPersianNumber(allItemsCount)})
              </span>
              <div className="d-flex">
                {isPriceDetailesCollapseOpen ? (
                  <ArrowDropUpRoundedIcon />
                ) : (
                  <ArrowDropDownRoundedIcon />
                )}
              </div>
            </div>
            <span style={{ color: night }} className="u-fontMedium">
              {priceFormatter(orderInfo?.total_items_initial_price)}{" "}
              <Icon icon={$} width={21} height={21} color={night} />
            </span>
          </div>
          {priceDetails && priceDetails.map((priceDetail) => priceDetail.html)}
        </div>
        <Collapse isOpened={isPriceDetailesCollapseOpen && minWidth768}>
          {orders?.map((order, index) => {
            const modifiers_price = order?.modifiers?.reduce(
              (a, b) => +a + +b.initial_price * (b.amount || 1),
              0
            );
            const variationId = order?.variation_id;
            const selectedVariation = order?.product?.variations.find(
              (variation) => variation.id === variationId
            );
            return (
              <div
                key={order.id}
                className={`d-flex flex-column ${
                  index === 0 ? "pb-3" : "py-3"
                }`}
                style={{
                  borderBottom:
                    index !== orders?.length - 1
                      ? "1px dashed #EDEDED"
                      : "1px solid #E0E5E8",
                }}
              >
                <div>
                  <div className="d-flex justify-content-between align-items-center">
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
                        selectedVariation.initial_price * order.count
                      )}
                      {"  "}
                      <Icon
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
                        {modifiers_price === 0 ? (
                          "رایگان"
                        ) : (
                          <>
                            {priceFormatter(modifiers_price)}
                            &nbsp;
                            <Icon
                              icon={$}
                              width={21}
                              height={21}
                              color={pollution}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  ) : null}
                  {order.modifiers?.map((item) => (
                    <div
                      key={item.title}
                      style={{ color: pollution }}
                      className="u-fontVerySmall mt-2"
                    >
                      <div>
                        {englishNumberToPersianNumber(item.amount || 1)} x{" "}
                        {item.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </Collapse>
        <div
          style={{
            borderBottom: `${
              orderInfo?.gift_credit_used ||
              orderInfo?.coupon_discount_amount ||
              orderInfo?.total_discount_amount ||
              orderInfo?.discount_code_amount
                ? "1px solid #E0E5E8"
                : null
            }`,
          }}
          className={
            orderInfo?.gift_credit_used ||
            orderInfo?.coupon_discount_amount ||
            orderInfo?.total_discount_amount ||
            orderInfo?.discount_code_amount
              ? "mb-3"
              : null
          }
        >
          {orderInfo?.gift_credit_used ? (
            <div className="d-flex justify-content-between align-items-center pb-3">
              <span style={{ color: pollution }} className="u-fontNormal">
                اعتبار هدیه
              </span>
              <span style={{ color: themeColor }} className="u-fontMedium">
                {priceFormatter(orderInfo?.gift_credit_used)}
                <Icon icon={$} width={21} height={21} color={themeColor} />
              </span>
            </div>
          ) : null}
          {orderInfo?.coupon_discount_amount ? (
            <div className="d-flex justify-content-between align-items-center pb-3">
              <span style={{ color: pollution }} className="u-fontNormal">
                تخفیف به واسطه کوپن
              </span>
              <span style={{ color: themeColor }} className="u-fontMedium">
                {priceFormatter(orderInfo?.coupon_discount_amount)}-{" "}
                <Icon icon={$} width={21} height={21} color={themeColor} />
              </span>
            </div>
          ) : null}
          {typeof orderInfo?.total_discount_amount === "number" ? (
            <div className="d-flex justify-content-between align-items-center pb-3 u-fontNormal">
              <span style={{ color: pollution }}>تخفیف محصولات</span>
              <span style={{ color: themeColor }}>
                {priceFormatter(orderInfo?.total_discount_amount)}
                {orderInfo?.total_discount_amount ? (
                  <span style={{ marginRight: 2 }}>-</span>
                ) : null}{" "}
                <Icon icon={$} width={21} height={21} color={themeColor} />
              </span>
            </div>
          ) : null}
          {orderInfo?.discount_code_amount ? (
            <div className="d-flex justify-content-between align-items-center pb-3">
              <span style={{ color: pollution }} className="u-fontNormal">
                کد تخفیف
              </span>
              <span style={{ color: themeColor }} className="u-fontMedium">
                {priceFormatter(orderInfo?.discount_code_amount)}-{" "}
                <Icon icon={$} width={21} height={21} color={themeColor} />
              </span>
            </div>
          ) : null}
        </div>
        {orderInfo?.delivery_site_type?.toUpperCase() ===
          FULFILLMENT_ON_WEBSITE ||
        orderInfo?.delivery_site_type?.toUpperCase() ===
          FULFILLMENT_ON_BUSINESS_SITE ? null : (
          <div
            className="d-flex justify-content-between align-items-center pb-3 u-fontNormal"
            style={{ color: pollution }}
          >
            <span>هزینه بسته‌بندی</span>
            {orderInfo?.total_packaging_price &&
            orderInfo?.total_packaging_price !== 0 ? (
              <span>
                {priceFormatter(orderInfo?.total_packaging_price)}
                &nbsp;
                <Icon icon={$} width={21} height={21} color={pollution} />
              </span>
            ) : (
              <span>رایگان</span>
            )}
          </div>
        )}
        {orderInfo?.delivery_site_type?.toUpperCase() ===
          FULFILLMENT_ON_USER_SITE && (
          <div className="d-flex justify-content-between align-items-center u-fontNormal">
            <span style={{ color: pollution }}>هزینه ارسال</span>
            <span style={{ color: pollution }}>
              {!orderInfo?.delivery_price ? (
                deliveryCostCopyRight
              ) : (
                <>
                  {priceFormatter(orderInfo?.delivery_price)}
                  &nbsp;
                  <Icon icon={$} width={21} height={21} color={pollution} />
                </>
              )}
            </span>
          </div>
        )}
        {orderInfo?.taxing_price ? (
          <div
            className="d-flex justify-content-between align-items-center py-3"
            style={{ borderBottom: "1px solid #E0E5E8" }}
          >
            <span style={{ color: pollution }} className="u-fontNormal">
              مالیات بر ارزش افزوده
            </span>
            <span style={{ color: themeColor }} className="u-fontMedium">
              {priceFormatter(orderInfo?.taxing_price)}{" "}
              <Icon icon={$} width={21} height={21} color={themeColor} />
            </span>
          </div>
        ) : null}
        <div
          className={`d-flex justify-content-between align-items-center mt-3 ${
            isUsingWallet ? "" : "u-fontWeightBold"
          } `}
        >
          <span style={{ color: coal }} className="u-fontNormal">
            کل مبلغ فاکتور
          </span>
          <span style={{ color: coal }} className="u-fontMedium">
            {priceFormatter(payableAmount)}{" "}
            <Icon icon={$} width={21} height={21} color={coal} />
          </span>
        </div>
        {isUsingWallet ? (
          <>
            {" "}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <span style={{ color: coal }} className="u-fontNormal">
                پرداختی از کیف پول{" "}
              </span>
              <span style={{ color: coal }} className="u-fontMedium">
                {payableAmount < walletCredit
                  ? priceFormatter(payableAmount)
                  : priceFormatter(deductedAmountFromWallet)}{" "}
                <Icon icon={$} width={21} height={21} color={coal} />
              </span>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3 u-fontWeightBold">
              <span style={{ color: coal }} className="u-fontNormal">
                باقی مانده جهت پرداخت{" "}
              </span>
              <span style={{ color: coal }} className="u-fontMedium">
                {priceFormatter(payableAmount - deductedAmountFromWallet)}{" "}
                <Icon icon={$} width={21} height={21} color={coal} />
              </span>
            </div>
          </>
        ) : null}

        <Button
          variant="contained"
          color="secondary"
          className="w-100 mt-4 d-flex justify-content-between align-items-center u-box-shadow-none u-fontMedium"
          disabled={isSubmitButtonDisabled}
          onClick={(e) => {
            if (callToActionConfig.onClick) callToActionConfig.onClick(e);
            else finalSubmit();
          }}
          size="large"
        >
          {isLoading ? (
            <LoadingIndicator size={32} className="u-height-24" />
          ) : (
            <>
              {callToActionConfig.label}
              <ArrowBackIosRoundedIcon
                fontSize="small"
                style={{ width: 15, height: 15 }}
              />
            </>
          )}
        </Button>
      </Paper>
    </section>
  );
}
export default memo(Factor);
