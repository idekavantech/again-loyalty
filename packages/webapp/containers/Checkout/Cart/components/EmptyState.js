import React, { memo } from "react";
import { useRouter } from "next/router";

import { cement, coal, pollution } from "@saas/utils/colors";
import { SHOPPING_PLUGIN_URL } from "@saas/utils/constants/plugins";

import Paper from "@material-ui/core/Paper";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";

function EmptyState({ themeColor, urlPrefix }) {
  const router = useRouter();
  return (
    <section>
      <div className="col-12">
        <Paper elevation={1} className="pt-3 pt-md-5 px-2 d-flex flex-column">
          <div className="d-flex flex-column justify-content-center align-items-center pb-5">
            <ShoppingCartRoundedIcon
              className="mb-5"
              style={{ color: cement, width: 68, height: 68 }}
            />
            <div style={{ color: coal }} className="u-fontMedium mb-3">
              سبد خرید شما خالی است.
            </div>
            <div style={{ color: pollution }} className="u-fontNormal">
              <span className="d-inline-flex">فرصت</span>
              <span
                style={{
                  color: themeColor,
                  borderBottom: `1px solid ${themeColor}`,
                }}
              >
                <span
                  onClick={() =>
                    router.push(`${urlPrefix}/${SHOPPING_PLUGIN_URL}`)
                  }
                  className="u-cursor-pointer d-inline-flex mx-1"
                >
                  سفارش آنلاین
                </span>
              </span>
              <span className="d-inline-flex">محصولات را از دست ندهید!</span>
            </div>
          </div>
        </Paper>
      </div>
    </section>
  );
}
export default memo(EmptyState);
