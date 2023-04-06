import React from "react";
import Link from "next/link";
import Icon from "../Icon";
import { GIFT, CHEVRON } from "@saas/icons";
import useTheme from "@material-ui/core/styles/useTheme";

function ReferralCard({ inviterGift, className = "", urlPrefix = "" }) {
  const theme = useTheme();
  return (
    <div
      style={{ backgroundColor: theme.palette.secondary.main }}
      className="u-border-radius-8"
    >
      <Link href={`${urlPrefix}/invite`}>
        <div
          className={`mx-auto align-items-center justify-content-between px-1 my-2 u-cursor-pointer py-3 d-flex ${className}`}
        >
          <div className="d-flex">
            <Icon icon={GIFT} color="white" />
            <div className="text-right mr-2">
              <div className="u-fontWeightBold u-text-white">
                {inviterGift} تومان اعتبار هدیه
              </div>
              <div className="u-fontNormal u-text-white">
                با معرفی ما به دوستانتان هدیه بگیرید.
              </div>
            </div>
          </div>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              width: 24,
              height: 24,
              minWidth: 24,
              minHeight: 24,
              backgroundColor: "rgba(255,255,255,0.2)",
              borderRadius: "50%",
              transform: "rotate(-90deg)",
            }}
          >
            <Icon icon={CHEVRON} color="white" />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ReferralCard;
