/* eslint-disable no-param-reassign */
/* eslint-disable indent */
import React, { memo } from "react";
import useTheme from "@material-ui/core/styles/useTheme";
import Icon from "../Icon";
import { noOp } from "@saas/utils/helpers/noOp";
import { pushParamsToUrl } from "@saas/utils/helpers/pushParamsToUrl";

import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import { CHEVRON } from "@saas/icons";
import { pollution } from "@saas/utils/colors";
import { useRouter } from "next/router";
function Pagination({ pagination, themeColor }) {
  const theme = useTheme();
  themeColor = themeColor || theme.palette.primary.main;
  const router = useRouter();
  const page = router.query.page || 1;
  const pages = pagination.pagesCount
    ? Array.from(Array(pagination.pagesCount).keys())
        .slice(
          Math.max(+page - 3, 0),
          Math.min(+page + 2, pagination.pagesCount)
        )
        .reverse()
    : [];
  return (
    <div className="d-flex justify-content-center align-items-center  py-2">
      <div style={{ width: 24 }}>
        {pagination.next && (
          <div
            onKeyDown={noOp}
            tabIndex="0"
            role="button"
            onClick={() => {
              pushParamsToUrl({
                page: Number(page) + 1,
              });
            }}
            className="u-cursor-pointer d-flex u-cursor-pointer justify-content-center align-items-center"
          >
            <Icon icon={CHEVRON} angle={90} color={pollution} />
          </div>
        )}
      </div>
      <div className="d-flex justify-content-center align-items-center">
        {pages[0] + 1 < pagination.pagesCount && (
          <div className="d-flex align-items-center">
            <span>...</span>
          </div>
        )}
        {pages.map((p) => (
          <div
            className="u-cursor-pointer"
            onKeyDown={noOp}
            tabIndex="0"
            role="button"
            onClick={() => {
              pushParamsToUrl({
                page: Number(p) + 1,
              });
            }}
            key={`page-${p}`}
          >
            <div
              className="u-border-radius-4 px-2"
              style={{
                backgroundColor: p + 1 === +page ? themeColor : "",
                fontWeight: p + 1 === +page ? "bold" : "normal",
                color: p + 1 === +page ? "white" : "",
              }}
            >
              {englishNumberToPersianNumber(p + 1)}
            </div>
          </div>
        ))}
        {pages[pages.length - 1] > 0 && (
          <div className="d-flex align-items-center">
            <span>...</span>
            <div
              onKeyDown={noOp}
              tabIndex="0"
              role="button"
              onClick={() => {
                pushParamsToUrl({
                  page: 1,
                });
              }}
              className="px-2"
            >
              <div className="u-cursor-pointer u-border-radius-50-percent u-text-darkest-grey">
                ۱
              </div>
            </div>
          </div>
        )}
      </div>
      <div style={{ width: 24 }}>
        {pagination.previous && (
          <div
            onKeyDown={noOp}
            tabIndex="0"
            role="button"
            onClick={() => {
              pushParamsToUrl({
                page: page - 1 || 1,
              });
            }}
            className="u-cursor-pointer d-flex justify-content-center align-items-center"
          >
            <Icon icon={CHEVRON} angle={-90} color={pollution} />
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(Pagination);
