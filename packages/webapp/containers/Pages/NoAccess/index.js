/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React, { memo } from "react";
import Button from "@material-ui/core/Button";
const noAccess = `/images/no-access.svg`;

import LazyImage from "@saas/components/LazyImage";
import { useRouter } from "next/router";
import Paper from "@material-ui/core/Paper";
import Head from "next/head";
import { createStructuredSelector } from "reselect";
import { makeSelectUrlPrefix } from "@saas/stores/plugins/selector";
import { connect } from "react-redux";
import { compose } from "redux";

function NoAccess({ urlPrefix }) {
  const router = useRouter();

  return (
    <div className="container">
      <Paper
        elevation={1}
        color="text.primary"
        className="d-flex justify-content-between align-items-center flex-column my-5 w-100"
        style={{ minHeight: "50vh" }}
      >
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <div></div>
        <div className="d-flex flex-column justify-content-center align-items-center flex-1">
          <LazyImage src={noAccess} alt="" />
          <div className="mt-4 text-center">
            <div>متاسفانه به این صفحه دسترسی ندارید!</div>
          </div>
        </div>
        <div className="sticky-bottom">
          <Button
            color={
              router?.asPath?.includes("/admin/") ? "primary" : "secondary"
            }
            variant="contained"
            className="w-100"
            onClick={() => router.push(`${urlPrefix}/`)}
          >
            بازگشت به صفحه اصلی
          </Button>
        </div>
      </Paper>
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

export default compose(withConnect, memo)(NoAccess);
