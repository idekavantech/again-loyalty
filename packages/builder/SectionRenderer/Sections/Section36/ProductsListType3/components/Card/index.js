import React from "react";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import Skeleton from "@material-ui/lab/Skeleton";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import Image from "next/image";

const Card = ({
  price,
  title,
  discountPrice,
  image,
  discountTime,
  isDiscountEnd,
  isEditMode,
  isMock,
  has_deadline,
}) => {
  const { maxWidth930, maxWidth1200 } = useResponsive();
  const discountPercent = ((price - discountPrice) / price) * 100;
  const time =
    !isDiscountEnd && has_deadline && discountTime.h ? (
      <time
        style={{
          fontSize: `${maxWidth930 ? "12px" : "13px"}`,
          paddingLeft: "2px",
          paddingBottom: "1px",
          fontFamily: "Vazir",
          color: "#737373",
        }}
      >
        {discountTime.h < 10
          ? `۰${englishNumberToPersianNumber(discountTime.h)}`
          : `${englishNumberToPersianNumber(discountTime.h)}`}
        :
        {discountTime.m < 10
          ? `۰${englishNumberToPersianNumber(discountTime.m)}`
          : `${englishNumberToPersianNumber(discountTime.m)}`}
        :
        {discountTime.s < 10
          ? `۰${englishNumberToPersianNumber(discountTime.s)}`
          : `${englishNumberToPersianNumber(discountTime.s)}`}
      </time>
    ) : (
      <time
        style={{
          fontSize: "12px",
          paddingLeft: "2px",
          paddingBottom: "1px",
          fontFamily: "Vazir",
          color: "#737373",
        }}
      >
        به مدت نامحدود
      </time>
    );
  if (isMock) {
    return (
      <div
        className="slider-product-card"
        style={{
          height: `${isEditMode ? "390px" : maxWidth930 ? "320px" : "436px"}`,
          fontFamily: "Parastoo",
          backgroundColor: "#fff",
          borderRadius: "8px",
        }}
      >
        <div
          className="slider-product-card__body h-100 direction-rtl"
          style={{
            padding: `${
              maxWidth930
                ? "10px 15px 8px"
                : maxWidth1200
                ? "30px 15px 3px 15px"
                : "40px 15px 3px 15px"
            }`,
          }}
        >
          <Skeleton
            variant="rect"
            animation="wave"
            width="100%"
            height={200}
          ></Skeleton>
          <div className="direction-ltr">
            <Skeleton className="mt-2" animation="wave" width="30%"></Skeleton>
          </div>

          <Skeleton className="mt-2" animation="wave" width="60%"></Skeleton>
          <Skeleton className="mt-2" animation="wave" width="80%"></Skeleton>
        </div>
      </div>
    );
  }
  return (
    <div
      className="slider-product-card"
      style={{
        height: `${isEditMode ? "390px" : maxWidth930 ? "320px" : "436px"}`,
        fontFamily: "Parastoo",
        backgroundColor: "#fff",
        borderRadius: "8px",
        direction: `${maxWidth930 ? "rtl" : "ltr"}`,
      }}
    >
      <div
        className="slider-product-card__body h-100"
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          alignItems: `${maxWidth930 ? "flex-end" : "flex-start"}`,
          padding: `${
            maxWidth930
              ? "10px 15px 8px"
              : maxWidth1200
              ? "30px 15px 3px 15px"
              : "40px 15px 3px 15px"
          }`,
        }}
      >
        <div className={"w-100 d-flex justify-content-center"}>
          <Image
            layout={"fixed"}
            width={`${
              isEditMode ? 100 : maxWidth930 ? 125 : maxWidth1200 ? 150 : 170
            }`}
            height={`${
              isEditMode ? 100 : maxWidth930 ? 125 : maxWidth1200 ? 150 : 170
            }`}
            quality={30}
            src={image}
            alt={`تصویر ${title}`}
          />
        </div>

        <div
          className="slider-product-card__title mb-auto"
          style={{
            textAlign: "right",
            fontSize: `${maxWidth930 ? "14px" : "12px"}`,
            fontFamily: "IranSans",
            color: "#2a2a2a",
            direction: "rtl",
            display: "block",
            marginTop: `${maxWidth930 ? "14px" : "30px"}`,
            paddingLeft: "15px",
            alignSelf: `${maxWidth930 ? "flex-start" : "flex-end"}`,
          }}
        >
          {title}
        </div>

        <div
          className="slider-product-card__price mt-auto"
          style={{
            textAlign: "left",
            display: "block",
            direction: `${maxWidth930 ? "ltr" : "rtl"}`,
            fontFamily: "IranSans",
          }}
        >
          {!!discountPercent && (
            <div
              className="d-flex align-items-center"
              style={{
                direction: "ltr",
              }}
            >
              <span
                className="mr-1 d-flex justify-content-center align-items-center"
                style={{
                  backgroundColor: "#ef394e",
                  padding: `${maxWidth930 ? "1px 4px 0px" : "4px 6px 4px"}`,
                  color: "#fff",
                  borderRadius: "20px",
                  fontSize: `${maxWidth930 ? "13px" : "14px"}`,
                  minWidth: `${maxWidth930 ? "35px" : "43px"}`,
                  height: `${maxWidth930 ? "20px" : "23px"}`,
                  fontWeight: "500",
                  marginBottom: "3px",
                }}
              >
                {priceFormatter(discountPercent)}%
              </span>
              <del
                className="text-muted"
                style={{
                  fontWeight: "300",
                  fontSize: "16px",
                }}
              >
                {priceFormatter(price)}
              </del>
            </div>
          )}
          <div style={{ direction: "ltr" }}>
            <div
              style={{
                display: "inline-block",
                fontWeight: "400",
                fontSize: "14px",
              }}
            >
              تومان
            </div>
            <strong
              className="ml-1"
              style={{
                fontSize: `${maxWidth930 ? "17px" : "20px"}`,
                fontWeight: "700",
                color: "#000",
              }}
            >
              {priceFormatter(discountPrice)}
            </strong>
          </div>
        </div>

        <div
          className="slider-product-card__timer d-flex justify-content-start align-items-center mt-4"
          style={{
            color: "rgb(81, 81, 81)",
            direction: "ltr",
          }}
        >
          <div
            style={{
              lineHeight: "15px",
              fontWeight: "bold",
            }}
          >
            <AccessTimeIcon
              style={{
                fontSize: "18px",
                display: "inline-block",
                color: "#737373",
              }}
            />
          </div>
          {time}
        </div>
      </div>
    </div>
  );
};

export default Card;
