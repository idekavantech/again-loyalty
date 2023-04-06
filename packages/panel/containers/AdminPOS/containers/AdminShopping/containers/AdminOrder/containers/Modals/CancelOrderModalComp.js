import React, { memo, useEffect, useMemo, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { graphite, night, pollution, smoke } from "@saas/utils/colors";
import useTheme from "@material-ui/core/styles/useTheme";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Link from "next/link";
import Icon from "@saas/components/Icon";
import { $ } from "@saas/icons";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import { calculateDiscountPercent } from "@saas/utils/helpers/calculateDiscountPercent";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";

export function CancelOrderModalComp({
  isOpen,
  onClose,
  submit,
  loading,
  order,
  urlPrefix,
  pluginUrl,
  _getAdminProductsByIds,
  adminDealsByIds,
  business,
}) {
  const theme = useTheme();
  const [orderItems, setOrderItems] = useState();
  const selected_business = order
    ? business.site_domain === order.business_site_domain
      ? business
      : business.branches?.find(
          (_business) => _business.site_domain === order?.business_site_domain
        )
    : null;

  const toggleRestock = (index) => {
    const _orderItems = JSON.parse(JSON.stringify(orderItems));
    _orderItems[index].restock = !Boolean(_orderItems[index].restock);
    setOrderItems(_orderItems);
  };

  const decrease = (index) => {
    const _orderItems = JSON.parse(JSON.stringify(orderItems));
    _orderItems[index].restockAmount = _orderItems[index].restockAmount - 1;
    setOrderItems(_orderItems);
  };

  const increase = (index) => {
    const _orderItems = JSON.parse(JSON.stringify(orderItems));
    _orderItems[index].restockAmount = _orderItems[index].restockAmount + 1;
    setOrderItems(_orderItems);
  };

  useEffect(() => {
    setTimeout(() => {
      _getAdminProductsByIds(
        selected_business?.slug,
        order?.items.map((item) => item.product_id)
      );
    }, 0);
  }, [order]);
  useEffect(() => {
    if (order && !!adminDealsByIds?.length) {
      setOrderItems(
        order?.items?.map((item) => {
          if (!item) {
            return null;
          }
          let variant = null;
          if (
            item.variation_id ||
            item?.variations?.variations_table?.[item.variation_id]
          ) {
            variant = item?.variations?.variations_table?.[item.variation_id];
          }
          const itemFinalPrice =
            item.discounted_price +
            item.modifiers.reduce(
              (sum, modifier) => sum + modifier.discounted_price,
              0
            );
          return {
            ...item,
            restock: false,
            variation_id: variant?.id,
            modifiers: item.modifiers,
            amount: item.amount,
            restockAmount: item.amount,
            itemFinalPrice,
          };
        })
      );
    }
  }, [order, adminDealsByIds]);
  const restockItems = useMemo(() => {
    if (!!orderItems?.length) {
      return orderItems
        ?.filter((item) => item?.restock)
        .map((item) => ({
          item_id: item.id,
          amount: item.restockAmount,
        }));
    }
  }, [orderItems]);
  return (
    <Dialog open={isOpen} onClose={onClose} PaperProps={{ className: "w-100" }}>
      <DialogContent className="p-0">
        <div className="px-4 pt-2">
          <div className="d-flex align-items-center justify-content-between">
            <div style={{ color: night, fontWeight: 500 }}>لغو سفارش</div>
            <IconButton
              aria-label="close"
              onClick={onClose}
              style={{ marginLeft: -13 }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        <div
          className="d-flex flex-1 flex-column"
          style={{ maxHeight: 350, overflow: "auto", direction: "ltr" }}
        >
          <div className="pl-4 pr-5 pt-4 pb-5" style={{ direction: "rtl" }}>
            {!!adminDealsByIds?.length &&
              orderItems?.map((item, index) => {
                if (!item) {
                  return null;
                }
                return (
                  <div
                    key={item.product_id}
                    className={`d-flex justify-content-between align-items-start ${
                      index === 0 ? "" : "mt-5"
                    }`}
                  >
                    <div className="pl-3" style={{ cursor: "pointer" }}>
                      <div
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: 8,
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={item.main_image_thumbnail_url}
                          alt=""
                          className="w-100 h-100"
                        />
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="d-flex justify-content-between align-items-start pb-3">
                        <div
                          style={{
                            flex: 3,
                            color: theme.palette.primary.main,
                          }}
                        >
                          <Link
                            href={`${urlPrefix}${pluginUrl}/settings/products/${
                              item.super_product_id || item.product_id
                            }`}
                          >
                            {item.product_title || ""}
                          </Link>
                          {item.variation_title && (
                            <Link
                              href={`${urlPrefix}${pluginUrl}/settings/products/${
                                item.super_product_id || item.product_id
                              }/variations/${item.variation_id}`}
                            >
                              {item.variation_title || ""}
                            </Link>
                          )}
                        </div>
                        <div>
                          {item.initial_price !== item.discounted_price && (
                            <div className="d-flex" style={{ color: smoke }}>
                              <div className="u-text-line-through ">
                                {priceFormatter(item.initial_price)}
                              </div>
                              <div
                                style={{
                                  color: theme.palette.primary.main,
                                  fontWeight: 500,
                                }}
                              >
                                {englishNumberToPersianNumber(
                                  calculateDiscountPercent(
                                    item.initial_price,
                                    item.discounted_price
                                  )
                                )}
                                <span className="mr-1">٪</span>
                              </div>
                            </div>
                          )}
                          <div style={{ flex: 2 }} className="text-left">
                            {priceFormatter(item.discounted_price)}
                            <Icon
                              icon={$}
                              width={21}
                              height={21}
                              color={graphite}
                              className="mr-1"
                            />
                          </div>
                        </div>
                      </div>
                      {item.modifiers?.map((modifier) => (
                        <div
                          className="d-flex justify-content-between align-items-center pb-3"
                          key={modifier.modifier_id}
                        >
                          <div
                            style={{
                              flex: 3,
                              color: smoke,
                              fontSize: 12,
                            }}
                          >
                            <Link
                              href={`${urlPrefix}${pluginUrl}/settings/products/${item.product_id}`}
                            >
                              {modifier.modifier_title || ""}
                            </Link>
                          </div>
                          <div
                            style={{
                              flex: 2,
                              color: graphite,
                              fontWeight: 400,
                            }}
                            className="text-left"
                          >
                            {priceFormatter(modifier.discounted_price)}
                            <Icon
                              icon={$}
                              width={21}
                              height={21}
                              color={graphite}
                              className="mr-1"
                            />
                          </div>
                        </div>
                      ))}
                      <div className="d-flex justify-content-between align-items-center">
                        <div
                          style={{
                            flex: 3,
                            color: night,
                            direction: "ltr",
                          }}
                        >
                          <span>
                            <Icon
                              icon={$}
                              width={21}
                              height={21}
                              color={graphite}
                              className="mr-1"
                            />
                            <span>{priceFormatter(item.itemFinalPrice)} </span>
                          </span>
                          <span> X </span>
                          <span>
                            {englishNumberToPersianNumber(item.amount)}
                          </span>
                        </div>
                        <div style={{ flex: 2 }} className="text-left">
                          {priceFormatter(item.itemFinalPrice * item.amount)}
                          <Icon
                            icon={$}
                            width={21}
                            height={21}
                            color={graphite}
                            className="mr-1"
                          />
                        </div>
                      </div>
                      <>
                        <div className="u-text-ellipse">
                          <FormControlLabel
                            style={{ padding: 0, marginRight: -12 }}
                            className="mt-1"
                            control={
                              <Checkbox
                                checked={item.restock}
                                onChange={() => toggleRestock(index)}
                                name="compareToPrevious"
                                color="primary"
                              />
                            }
                            label="بازگردانی آیتم‌ها به انبار"
                          />
                        </div>
                        {item.restock && (
                          <div
                            className="d-flex align-items-center p-1"
                            style={{
                              border: "1px solid #EDEDED",
                              borderRadius: 8,
                              maxWidth: "fit-content",
                            }}
                          >
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => {
                                increase(index);
                              }}
                              disabled={item.restockAmount === item.amount}
                            >
                              <AddRoundedIcon fontSize="small" />
                            </IconButton>
                            <span
                              className="d-flex mr-1"
                              style={{ lineHeight: "initial" }}
                            >
                              {englishNumberToPersianNumber(item.restockAmount)}
                            </span>
                            <span
                              className="d-flex mr-2"
                              style={{
                                color: pollution,
                                lineHeight: "initial",
                              }}
                            >
                              /
                            </span>
                            <span
                              className="d-flex mx-1"
                              style={{
                                color: pollution,
                                lineHeight: "initial",
                              }}
                            >
                              {englishNumberToPersianNumber(item?.amount)}
                            </span>
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => decrease(index)}
                              disabled={item.restockAmount === 0}
                            >
                              <RemoveRoundedIcon fontSize="small" />
                            </IconButton>
                          </div>
                        )}
                      </>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </DialogContent>
      <DialogActions
        className="d-flex align-items-center justify-content-between p-4"
        style={{ borderTop: "1px solid #EDEDED" }}
      >
        <Button
          onClick={() => {
            submit(restockItems);
          }}
          variant="contained"
          color="primary"
          className="u-box-shadow-none u-fontMedium"
          size="medium"
          disabled={loading}
          style={{ backgroundColor: theme.palette.error.main }}
        >
          لغو سفارش
        </Button>
        <Button
          onClick={onClose}
          variant="outlined"
          color="error"
          className="u-box-shadow-none u-fontMedium"
          size="medium"
          style={{
            borderColor: theme.palette.error.main,
            color: theme.palette.error.main,
            marginLeft: 0,
          }}
        >
          نگهداشتن سفارش
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default memo(CancelOrderModalComp);
