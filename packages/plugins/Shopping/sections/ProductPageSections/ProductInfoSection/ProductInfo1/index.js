/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-danger */
/**
 *
 * ProductPage
 *
 */

import React, { memo, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Paper from "@material-ui/core/Paper";
import { makeSelectDeal } from "@saas/stores/business/selector";
import { vanilla, white } from "@saas/utils/colors";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import { mockProducts } from "../../../constants";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
export function ProductInfo1({ product: p, isEditMode }) {
  const product = isEditMode ? mockProducts[0] : p;
  const {minWidth768} = useResponsive()
  const infoTable = isEditMode
    ? mockProducts[0].extra_data.info_table
    : product &&
      product.extra_data &&
      product.extra_data.info_table !== undefined
    ? product.extra_data.info_table
    : [];
  const complementary = isEditMode
    ? mockProducts[0].extra_data.complementary
    : product &&
      product.extra_data &&
      product.extra_data.complementary !== undefined
    ? product.extra_data.complementary
    : "";

  const [selectedTab, selectTab] = useState(
    infoTable && infoTable.length ? "technical" : "description"
  );

  const noExtraSection =
    (!infoTable || (infoTable && infoTable.length === 0)) && !complementary;
  if (!product) {
    return <LoadingIndicator />;
  }
  if (noExtraSection) return null;
  if (!minWidth768)
    return (
      <div className="c-modal-body-sec container px-2 d-flex mx-auto">
        <Paper elevation={3} className="mt-2 u-relative p-0 w-100">
          <div
            className="d-flex px-3 "
            style={{
              borderRadius: "8px 8px 0px 0px",
            }}
          >
            <div className="d-flex">
              {infoTable && infoTable.length ? (
                <div
                  className={`mx-2 u-border-color-night h-100 py-3 u-cursor-pointer ${
                    selectedTab === "technical" ? "u-fontWeightBold" : ""
                  }`}
                  onClick={() => selectTab("technical")}
                  style={{
                    borderBottom:
                      selectedTab === "technical" ? "2px solid" : "",
                  }}
                >
                  مشخصات فنی
                </div>
              ) : null}
              {complementary ? (
                <div
                  className={`mx-2 u-border-color-night h-100 py-3 u-cursor-pointer ${
                    selectedTab === "description" ? "u-fontWeightBold" : ""
                  }`}
                  onClick={() => selectTab("description")}
                  style={{
                    borderBottom:
                      selectedTab === "description" ? "2px solid" : "",
                  }}
                >
                  مشخصات تکمیلی
                </div>
              ) : null}
            </div>
          </div>
          <div className="col-12 p-3">
            {selectedTab === "description" ? (
              <div
                className="contentBox u-fontNormal mt-2"
                dangerouslySetInnerHTML={{
                  __html: complementary,
                }}
              />
            ) : (
              <div>
                {infoTable?.map((row) => (
                  <div className="row mx-0 py-1" key={row.key}>
                    <div className="px-0 col-4">
                      <Paper
                        elevation={0}
                        className="p-3 ml-2 u-border-radius-4"
                      >
                        {row.key}
                      </Paper>
                    </div>
                    <div className="px-0 col-8">
                      <Paper elevation={0} className="p-3 u-border-radius-4">
                        {row.value}
                      </Paper>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Paper>
      </div>
    );
  return (
    <div className="c-modal-body-sec w-100 container px-2">
      <Paper elevation={3} className="mt-2 u-relative">
        <div className="mt-2 u-relative  u-border-radius-8">
          <div className="d-flex px-3  u-border-radius-8">
            <div className="d-flex">
              {infoTable && infoTable.length ? (
                <div
                  className={`mx-2 u-border-color-night h-100 py-3 u-cursor-pointer ${
                    selectedTab === "technical" ? "u-fontWeightBold" : ""
                  }`}
                  onClick={() => selectTab("technical")}
                  style={{
                    borderBottom:
                      selectedTab === "technical" ? "2px solid" : "",
                  }}
                >
                  مشخصات فنی
                </div>
              ) : null}
              {complementary ? (
                <div
                  className={`mx-2 u-border-color-night h-100 py-3 u-cursor-pointer ${
                    selectedTab === "description" ? "u-fontWeightBold" : ""
                  }`}
                  onClick={() => selectTab("description")}
                  style={{
                    borderBottom:
                      selectedTab === "description" ? "2px solid" : "",
                  }}
                >
                  مشخصات تکمیلی
                </div>
              ) : null}
            </div>
          </div>
          <style
            dangerouslySetInnerHTML={{
              __html: `
           .ql-editor {
             direction: rtl;
             text-align: right;
           }
           `,
            }}
          />
          <div className="col-12 p-3">
            {selectedTab === "description" ? (
              <div className="ql-editor">
                <span
                  dangerouslySetInnerHTML={{
                    __html: complementary,
                  }}
                />
              </div>
            ) : (
              <div>
                {infoTable?.map((row) => (
                  <div className="row mx-0 py-1" key={row.key}>
                    <div className="px-0 col-4">
                      <div
                        className="p-3 ml-2 u-border-radius-4"
                        style={{
                          background: row.key ? vanilla : white,
                        }}
                      >
                        {row.key}
                      </div>
                    </div>
                    <div className="px-0 col-8">
                      <div
                        className="p-3 u-border-radius-4"
                        style={{
                          background: row.value ? vanilla : white,
                        }}
                      >
                        {row.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Paper>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  product: makeSelectDeal(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(ProductInfo1);
