/* eslint-disable indent */
import React, { memo } from "react";
import moment from "moment-jalaali";
import Link from "next/link";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import useTheme from "@material-ui/core/styles/useTheme";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { ellipseText } from "@saas/utils/helpers/ellipseText";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import Icon from "@saas/components/Icon";
import { CHEVRON, STAR } from "@saas/icons";
import { oceanII, skyI } from "@saas/utils/colors";
import { useRouter } from "next/router";
import Divider from "@material-ui/core/Divider";

function ReviewCard({ review, link, brief }) {
  const theme = useTheme();
  const router = useRouter();

  const {
    description: comment,
    created_at: createdAt,
    data: extraData = [],
    order_details: orderData = {},
    user_details = {},
  } = review;
  const orderDate = new Date(createdAt);
  const orderTime = moment(
    `${orderDate.getFullYear()}-${
      orderDate.getMonth() + 1
    }-${orderDate.getDate()}`,
    "YYYY-MM-DD"
  );
  const backgroundColor = theme.palette.primary.main;
  const degrees = review.rating ? review.rating * 20 * 3.6 : 0;
  return (
    <div className="mx-sm-auto mx-3">
      <Paper
        elevation={2}
        className={`d-flex px-0 ${
          brief ? "c-order-card" : "u-border-radius-8"
        } mb-3 overflow-hidden`}
      >
        {brief && (
          <div
            style={{
              width: 8,
              backgroundColor,
            }}
          />
        )}
        <div className="flex-1 px-3">
          <div className="d-flex text-center mt-3 u-text-darkest-grey justify-content-between">
            <div className="u-fontWeightBold ">
              فرستنده:‌ {user_details.full_name}{" "}
            </div>
            <div className="">
              {englishNumberToPersianNumber(orderTime.format("jYYYY/jMM/jDD"))}
            </div>
          </div>
          <div className="d-flex text-center py-1 u-text-darkest-grey">
            شماره همراه:‌{" "}
            {englishNumberToPersianNumber(user_details.phone_number)}
          </div>
          {review.badges && (
            <div className="d-flex flex-wrap mt-2 mb-1">
              {review.badges.map((c, index) => {
                if (!brief || index < 3)
                  return (
                    <Chip
                      key={c.title}
                      label={c.title}
                      onClick={() => router.push(c.link)}
                      variant="outlined"
                      color="primary"
                      className="m-1"
                    />
                  );
                return null;
              })}
              {brief && review.badges.length > 3 ? (
                <Chip label="..." variant="outlined" disabled className="m-1" />
              ) : null}
            </div>
          )}
          {brief && (
            <div className="d-flex u-text-primary-blue-remove">
              <Icon icon={STAR} color={skyI} className="ml-1" />
              {englishNumberToPersianNumber(review.rating?.toFixed(1))} از ۵
            </div>
          )}
          {brief && (
            <div className="d-flex py-1 u-text-darkest-grey">
              <div className="">{ellipseText(comment, 93)}</div>
            </div>
          )}
          {brief && (
            <Link passHref href={link}>
              <div className="u-text-primary-blue-remove d-flex mb-3 mt-1 cursor-pointer">
                مشاهده کامل
                <div className="mr-2" style={{ transform: "rotate(-90deg)" }}>
                  <Icon icon={CHEVRON} color={theme.palette.primary.main} />
                </div>
              </div>
            </Link>
          )}
        </div>
      </Paper>
      {!brief && (
        <>
          <Paper
            elevation={2}
            className={`mt-2 p-4 ${
              brief ? "c-order-card" : "u-border-radius-8"
            } mb-3 overflow-hidden`}
          >
            <div className="d-flex u-font-semi-small">
              <div className="circle-container">
                <div
                  id="activeBorder"
                  className="active-border d-flex align-items-center justify-content-center"
                  style={{
                    backgroundImage:
                      degrees <= 180
                        ? `linear-gradient(${
                            90 + degrees
                          }deg, transparent 50%, ${
                            theme.palette.primary.main
                          } 50%),linear-gradient(90deg, ${
                            theme.palette.primary.main
                          } 50%, transparent 50%)`
                        : `linear-gradient(${
                            degrees - 90
                          }deg, transparent 50%, ${oceanII} 50%),linear-gradient(90deg, ${
                            theme.palette.primary.main
                          } 50%, transparent 50%)`,
                  }}
                >
                  <div
                    id="circle"
                    className="circle d-flex align-items-center justify-content-center"
                    style={{ backgroundColor: theme.palette.background.paper }}
                  >
                    <span className="prec 270" id="prec">
                      {englishNumberToPersianNumber(
                        review.rating.toFixed(1) * 20
                      )}
                      %
                    </span>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center flex-column flex-1">
                {extraData.map((key) => (
                  <div className="d-flex" key={key.title}>
                    <div style={{ width: 90 }} className="text-center mx-2">
                      {key.title}
                    </div>
                    <div className="d-flex flex-1 position-relative">
                      <span
                        className="position-absolute u-background-melo-grey-remove w-100"
                        style={{ borderRadius: 55, height: 6 }}
                      />
                      <span
                        className="u-background-primary-blue w-100 z-index-2"
                        style={{
                          borderRadius: 55,
                          height: 6,
                          backgroundColor: "#0050ff",
                          width: `${key.rating * 5}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="d-flex py-1 px-2 mt-5 u-text-darkest-grey">
              <div className="">{comment}</div>
            </div>
          </Paper>
          {orderData?.items ? (
            <Paper
              elevation={2}
              className={`mt-2 py-4 ${
                brief ? "c-order-card" : "u-border-radius-8"
              } mb-3 overflow-hidden`}
            >
              <div className="container">
                <div className="row mb-4">
                  <div className="col-5 text-right u-fontWeightBold ">
                    محصول
                  </div>
                  <div className="col-4 text-center u-fontWeightBold ">
                    قیمت(تومان)
                  </div>
                  <div className="col-3 text-center u-fontWeightBold ">
                    تعداد
                  </div>
                </div>
                {orderData?.items.map((item, index) => {
                  return (
                    <>
                      <div className="row my-3" key={item.id}>
                        <div className="col-5 text-right u-fontWeightBold">
                          {item?.product_title}
                        </div>
                        <div className="col-4 text-center u-fontWeightBold ">
                          {priceFormatter(item.discounted_price)}
                        </div>
                        <div className="col-3 text-center u-fontWeightBold ">
                          {englishNumberToPersianNumber(item?.amount)}
                        </div>
                        {item.deal?.modifiers.map((item) => (
                          <>
                            <div className="col-5 text-right u-text-darkest-grey">
                              {item.title}
                            </div>
                            <div className="col-4 text-center u-text-darkest-grey">
                              {priceFormatter(item.price)}
                            </div>
                            <div className="col-3 text-center  u-text-darkest-grey">
                              {englishNumberToPersianNumber(item.amount)}
                            </div>
                          </>
                        ))}
                      </div>
                      {index === orderData.items.length - 1 ? null : (
                        <Divider />
                      )}
                    </>
                  );
                })}
              </div>
            </Paper>
          ) : null}
        </>
      )}
    </div>
  );
}

export default memo(ReviewCard);
