/**
 *
 * AdminFeedbacks
 *
 */

import React, { memo, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import Head from "next/head";
import Button from "@material-ui/core/Button";
import CallIcon from "@material-ui/icons/Call";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { makeSelectAdminReview } from "../../store/selectors";
import { getAdminReview } from "../../store/actions";
import ReviewCard from "components/ReviewCard";
import { callPhoneNumber } from "@saas/utils/helpers/callPhoneNumber";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import { useRouter } from "next/router";
import AdminBreadCrumb from "../AdminBreadCrumb";

export function AdminFeedback({ review, _getAdminReview }) {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      _getAdminReview({ id: router.query.id });
    }, 0);
  }, []);
  const call = useCallback((phone) => () => callPhoneNumber(phone));
  if (!review) return <LoadingIndicator />;
  return (
    <div
      className="container col-md-6 col-lg-5 col-12"
      style={{ minHeight: 600 }}
    >
      <Head>
        <title>نظرات مشتری‌ها</title>
      </Head>
      <AdminBreadCrumb />

      <div className="mt-5 flex-1">
        <ReviewCard review={review} />
      </div>
      <div className="p-3 d-flex flex-row justify-content-between">
        <Button
          style={{ direction: "ltr" }}
          color="primary"
          variant="contained"
          className="w-100"
          onClick={call(review.creator_phone)}
          endIcon={<CallIcon />}
        >
          تماس با مشتری
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  review: makeSelectAdminReview(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getAdminReview: (data) => dispatch(getAdminReview(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminFeedback);
