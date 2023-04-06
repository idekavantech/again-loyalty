/**
 *
 * AdminFeedbacks
 *
 */

import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import Head from "next/head";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import {
  makeSelectAdminReviews,
  makeSelectAdminReviewsPagination,
} from "../../store/selectors";
import { getAdminReviews } from "../../store/actions";
import ReviewCard from "components/ReviewCard";
import {
  makeSelectAdminUrlPrefix,
  makeSelectPlugin,
} from "@saas/stores/plugins/selector";
import { LANDING_PLUGIN } from "@saas/utils/constants/plugins";
import Pagination from "@material-ui/lab/Pagination";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import AdminBreadCrumb from "../AdminBreadCrumb";
import { makeSelectBusiness } from "@saas/stores/business/selector";

export function AdminFeedbacks({
  reviews,
  reviewsPagination,
  _getAdminReviews,
  isLoading,
  urlPrefix,
  business,
}) {
  const [page, setPage] = useState(1);
  useEffect(() => {
    setTimeout(() => {
      _getAdminReviews({ page, business_slug: business?.slug });
    }, 0);
  }, [page]);

  return (
    <div className="pb-70">
      <Head>
        <title>نظرات مشتری‌ها</title>
      </Head>
      <div className="container col-md-6 col-lg-5 col-12 mt-5">
        <AdminBreadCrumb />

        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <>
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                brief
                review={review}
                link={`${urlPrefix}reviews/${review.id}`}
              />
            ))}
            <Pagination
              count={Math.ceil(reviewsPagination?.count / 20)}
              variant="outlined"
              shape="rounded"
              color="primary"
              page={page}
              onChange={(event, page) => {
                setPage(page);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              classes={{
                ul: "flex-row-reverse",
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  reviews: makeSelectAdminReviews(),
  reviewsPagination: makeSelectAdminReviewsPagination(),
  pluginData: makeSelectPlugin(LANDING_PLUGIN),
  isLoading: makeSelectLoading(),
  urlPrefix: makeSelectAdminUrlPrefix(),
  business: makeSelectBusiness(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getAdminReviews: (page) => dispatch(getAdminReviews(page)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminFeedbacks);
