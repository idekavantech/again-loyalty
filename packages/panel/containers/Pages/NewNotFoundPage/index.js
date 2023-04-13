/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React, { memo } from "react";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import { makeSelectUrlPrefix } from "@saas/stores/plugins/selector";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

function NewNotFoundPage({
  urlPrefix,
  item = "Page",
  noButton,
  buttonLink,
  buttonText,
}) {
  const router = useRouter();
  const { maxWidth768 } = useResponsive();
  return (
    <div
      style={{
        minHeight: "80vh",
        padding: "30px 0",
      }}
      className="flex-wrap d-flex justify-content-center align-items-center"
    >
      <div className="col-12 col-md-6">
        <div className="text-center">
          <div
            style={{ color: "#000" }}
            className="d-flex flex-wrap flex-column justify-content-center align-items-center"
          >
            <h1 style={{ fontSize: `${maxWidth768 ? "30px" : "40px"}` }}>
              Page Not Found
            </h1>
            <h2
              className="mt-3"
              style={{
                fontSize: `${maxWidth768 ? "70px" : "100px"}`,
                fontWeight: 900,
              }}
            >
              404
            </h2>
            <p
              className="mb-5"
              style={{
                fontSize: `${maxWidth768 ? "14px" : "19.5px"}`,
              }}
            >
              You can press the button below and go to the store's homepage.
            </p>
            {!noButton && (
              <Button
              size="large"
                style={{ borderRadius: "10px" }}
                color="secondary"
                variant="contained"
                onClick={() => router.push(buttonLink || `${urlPrefix}/`)}
              >
                {buttonText || "HOME"}
              </Button>
            )}
          </div>
        </div>
      </div>
      <div
        style={{ order: `${maxWidth768 ? -1 : 0}` }}
        className={`col-12 col-md-6 h-100}`}
      >
        <div className="w-100 h-100">
          <img
            src="https://hs3-cdn-saas.behtarino.com/media/richtext/404-page.png"
            alt="404 image"
            className={`d-block mx-auto ${maxWidth768 ? "w-50 " : "w-75"}`}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  urlPrefix: makeSelectUrlPrefix(),
});

function mapDispatchToProps() {
  return {};
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(NewNotFoundPage);
