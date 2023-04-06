import React from "react";

import { $ } from "@saas/icons";
import Icon from "@saas/components/Icon";
import LazyImage from "@saas/components/LazyImage";
import { coal, graphite, pollution } from "@saas/utils/colors";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { useFactor } from "containers/Checkout/Cart/components/CheckoutOrderCard/hooks/useFactor";

import AddRoundedIcon from "@material-ui/icons/AddRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import IconButton from "@material-ui/core/IconButton";

function DesktopCard({ order, increase, decrease, themeColor }) {
  const {
    modifiers_price,
    variation_name,
    variation_initial_price,
    variation_discounted_price,
    variation_image,
    variation_discount,
    isPlusDisabled
  } = useFactor(order);

  return (
    <>
      <div className="pr-4">
        <div
          className="object-fit-cover d-flex"
          style={{ borderRadius: 8, overflow: "hidden" }}
        >
          <LazyImage src={variation_image} width={140} height={140} />
        </div>
      </div>
      <div className="flex-1 d-flex flex-column justify-content-between px-4">
        <div>
          <div style={{ color: coal }} className="u-fontMedium">
            {order.product.title}
          </div>
          <div className="u-font-semi-small my-2" style={{ color: pollution }}>
            {variation_name}
          </div>
          {order.modifiers?.length ? (
            <div
              className="d-flex align-items-center u-font-semi-small mt-2"
              style={{ color: graphite }}
            >
              <div className="ml-1">موارد افزودنی</div>
              <div>
                {modifiers_price === 0 ? (
                  "(رایگان)"
                ) : (
                  <>
                    {priceFormatter(modifiers_price)}
                    &nbsp;
                    <Icon
                      icon={$}
                      width={21}
                      height={21}
                      color={graphite}
                    />
                  </>
                )}
              </div>
            </div>
          ) : null}

          {order.modifiers?.map((item) => (
            <div
              key={item.id}
              style={{ color: pollution }}
              className="d-flex align-items-center u-font-semi-small my-2"
            >
              <div>{englishNumberToPersianNumber(item.amount || 1)} x</div>
              <span className="mr-1">{item.title}</span>
            </div>
          ))}
        </div>
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
            color="secondary"
            onClick={() => increase(order.id)}
            disabled={isPlusDisabled}
          >
            <AddRoundedIcon fontSize="small" />
          </IconButton>
          <span className="mx-3">
            {englishNumberToPersianNumber(order.count)}
          </span>
          <IconButton
            size="small"
            style={{
              color: pollution,
            }}
            color="secondary"
            onClick={() => decrease(order.id)}
          >
            {order.count > 1 ? (
              <RemoveRoundedIcon fontSize="small" color="secondary" />
            ) : (
              <DeleteOutlineRoundedIcon fontSize="small" color="secondary" />
            )}
          </IconButton>
        </div>
      </div>
      <div className="d-flex flex-column justify-content-end text-left pl-4">
        <div className="d-flex align-items-center justify-content-between">
          {variation_initial_price - variation_discounted_price ? (
            <div
              className={"u-fontMedium u-text-line-through"}
              style={{ color: pollution }}
            >
              {priceFormatter(
                (variation_initial_price + modifiers_price) * order.count
              )}
            </div>
          ) : null}
          {Boolean(Math.round(variation_discount)) ? (
            <div style={{ color: themeColor }} className="u-fontMedium">
              {englishNumberToPersianNumber(Math.round(variation_discount))}٪
            </div>
          ) : null}
        </div>
        <div style={{ color: coal }} className="u-fontMedium">
          {priceFormatter(
            (variation_discounted_price + modifiers_price) * order.count
          )}{" "}
          &nbsp;
          <Icon icon={$} width={21} height={21} color={coal} />
        </div>
      </div>
    </>
  );
}

export default DesktopCard;
