import { memo } from "react";
import useTheme from "@material-ui/core/styles/useTheme";
import { textTypes } from "@saas/utils/colors";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import EditIcon from "@material-ui/icons/Edit";

const MODIFIRE_MODAL = "MODIFIRE_MODAL";

const CustomizedOrderItemCard = ({
  orderCount,
  openModifiersModal,
  orderItem,
  productImage,
  name,
  modifiersName,
  initialPrice,
  discountedPrice,
  discountPercent,
  remainingCount,
  couldShop,
}) => {
  const theme = useTheme();
  const themeColor = theme.palette.secondary.main;
  return (
    <>
      <div
        className=""
        onClick={() => {
          if (couldShop)
            openModifiersModal(MODIFIRE_MODAL, null, orderItem, remainingCount);
        }}
      >
        <div className="d-flex align-items-start w-100 h-100">
          {productImage ? (
            <div
              className="ml-5"
              style={{
                width: 64,
                height: 64,
                border: "1px solid rgba(228, 230, 231, 0.6)",
                borderRadius: 4,
                boxSizing: "content-box",
              }}
            >
              <img
                alt=""
                style={{
                  width: 64,
                  borderRadius: 4,
                  height: 64,
                }}
                className="overflow-hidden object-fit-cover"
                src={productImage}
              />
            </div>
          ) : null}
          <div
            className={`d-flex flex-column h-100 ${
              productImage ? "w-75" : "w-100"
            }`}
          >
            <div
              className="new-product-card__name mb-1 d-flex justify-content-between align-items-center"
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: textTypes.text.default,
              }}
            >
              <div>
                {name}
                <span className="ml-auto mr-1" style={{ color: themeColor }}>
                  &times;
                  {englishNumberToPersianNumber(orderCount)}
                </span>
              </div>
              <div
                className="mr-2"
                style={{
                  background: "#F2F7FE",
                  padding: "2px 8px",
                  borderRadius: 100,
                  fontSize: 12,
                  whiteSpace: "nowrap",
                }}
              >
                شخصی‌سازی شده
              </div>
            </div>

            {modifiersName ? (
              <div
                className="new-product-card__description"
                style={{
                  fontSize: 11,
                  fontWeight: 400,
                  color: textTypes.text.subdued,
                }}
              >
                {modifiersName}
              </div>
            ) : null}

            <div className="d-flex w-100 align-items-end justify-content-between mt-3">
              {discountedPrice !== initialPrice ? (
                <div className="d-flex flex-column justify-content-center align-items-start">
                  <div className="d-flex align-items-center justify-content-start">
                    <div
                      className="ml-2"
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: textTypes.text.disabled,
                        textDecoration: "line-through",
                      }}
                    >
                      {priceFormatter(initialPrice)}
                    </div>
                    <div
                      className="p-1"
                      style={{
                        color: themeColor,
                        backgroundColor: "rgba(0, 80, 255, 0.08)",
                        fontSize: 10,
                        fontWeight: 700,
                        borderRadius: 4,
                      }}
                    >
                      {englishNumberToPersianNumber(discountPercent)}%
                    </div>
                  </div>
                  <div
                    className="new-product-card__price"
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: textTypes.text.default,
                    }}
                  >
                    {priceFormatter(discountedPrice) + " تومان"}
                  </div>
                </div>
              ) : (
                <div
                  className="new-product-card__price"
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: textTypes.text.default,
                  }}
                >
                  {priceFormatter(initialPrice) + " تومان"}
                </div>
              )}
              <EditIcon style={{ color: themeColor }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(CustomizedOrderItemCard);
