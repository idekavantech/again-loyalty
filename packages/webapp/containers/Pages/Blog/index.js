/**
 *
 * Feedback
 *
 */

import React, { memo } from "react";
import { connect } from "react-redux";
import Head from "next/head";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { makeSelectBusinessThemeColor } from "@saas/stores/business/selector";
import {
  makeSelectBusinessPages,
  makeSelectBusinessPagesPagination,
} from "@saas/stores/business/selector";
import Link from "next/link";
import { makeSelectUrlPrefix } from "@saas/stores/plugins/selector";
import { useRouter } from "next/router";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import moment from "moment-jalaali";

export function Blog({ posts, urlPrefix, postsPagination }) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>پست‌ها</title>
      </Head>
      <div className="container d-flex flex-wrap">
        {posts &&
          posts.map((post) => {
            const createdDate = post._created_at
              ? new Date(post._created_at)
              : new Date();
            const createdTime = moment(
              `${createdDate.getFullYear()}-${
                createdDate.getMonth() + 1
              }-${createdDate.getDate()}`,
              "YYYY-MM-DD"
            );
            const time = englishNumberToPersianNumber(
              createdTime.format("jYYYY/jMM/jDD")
            );
            return (
              <div
                className="col-12 col-md-4 p-3 direction-ltr"
                key={post._created_at}
              >
                <Link
                  href={`${urlPrefix}/blog/${post.id}-${
                    post.data.slug || post.data.seo_title || post.data.name
                  }`}
                  passHref
                  className="w-100"
                >
                  <Card>
                    <CardHeader title={post.data.name} subheader={time} />
                    <CardMedia
                      style={{ height: 0, paddingTop: "56.25%" }}
                      image={
                        post.data.main_image_url ||
                        "https://hs3-cdn-saas.behtarino.com/static/images/behtarino-web/default_product.jpg"
                      }
                      title={post.data.seo_title || post.data.name}
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {post.data.meta_description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            );
          })}
      </div>
      <div className="d-flex justify-content-center">
        <Pagination
          count={
            postsPagination.count / 10 +
            (postsPagination.count % 10 > 0 ? 1 : 0)
          }
          variant="outlined"
          shape="rounded"
          defaultPage={router.query.page}
          onChange={(event, value) => {
            router.push(`${urlPrefix}/blog?page=${value}`);
          }}
        />
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  themeColor: makeSelectBusinessThemeColor(),
  posts: makeSelectBusinessPages(),
  postsPagination: makeSelectBusinessPagesPagination(),
  urlPrefix: makeSelectUrlPrefix(),
});

function mapDispatchToProps() {
  return {};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Blog);
