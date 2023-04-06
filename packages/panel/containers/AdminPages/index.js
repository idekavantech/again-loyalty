/**
 *
 * AdminThemeSettings
 *
 */

import React, { memo, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import Head from "next/head";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import {
  makeSelectBusiness,
  makeSelectBusinessBlogPagesPagination,
  makeSelectBusinessNextBlogPageNumber,
  makeSelectBusinessThemeColor,
  makeSelectBusinessThemeConfig,
  makeSelectNavigationMenus,
} from "@saas/stores/business/selector";
import {
  getBusinessBlogPages,
  getBusinessPages,
  setNextBlogPageNumber,
  setNextPageNumber,
  updateBusiness,
} from "@saas/stores/business/actions";
import {
  makeSelectPluginPages,
  makeSelectAdminUrlPrefix,
  makeSelectUrlPrefix,
} from "@saas/stores/plugins/selector";
import { useRouter } from "next/router";
import IconButton from "@material-ui/core/IconButton";
import {
  createBusinessPage,
  deleteBusinessPage,
  updateBusinessPage,
} from "store/actions";
import {
  makeSelectBusinessNextPageNumber,
  makeSelectBusinessPages,
  makeSelectBusinessBlogPages,
  makeSelectBusinessPagesPagination,
} from "@saas/stores/business/selector";
import TablePagination from "@material-ui/core/TablePagination";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { setSnackBarMessage } from "@saas/stores/ui/actions";
import PageBox from "./PageBox";
import { ADMIN_PAGES_MODAL } from "@saas/stores/ui/constants";
import { pushParamsToUrl } from "@saas/utils/helpers/pushParamsToUrl";

export function AdminPages({
  loading,
  themeConfig,
  _updateBusiness,
  urlPrefix,
  adminUrlPrefix,
  _getBusinessPages,
  _getBusinessBlogPages,
  _deleteBusinessPage,
  pages,
  loadingBlog,
  blogPages,
  _updatePage,
  pagesPagination,
  blogPagesPagination,
  _setNextPageNumber,
  _setNextBlogPageNumber,
  nextPageNumber,
  nextBlogPageNumber,
  _setSnackBarMessage,
  business,
  _createBusinessPage,
  pluginPages,
}) {
  const router = useRouter();
  const hasViewedThisPageBefore = useMemo(
    () => localStorage.getItem("HAS_VIEWED_ADMIN_PAGES"),
    []
  );
  const pagesData = [
    {
      title: "ویرایش صفحات سایت",
      name: "صفحه",
      type: "page",
      pages,
      nextPageNumber,
      pagesPagination,
      _setNextPageNumber,
    },
    {
      title: "ویرایش پست‌ها",
      name: "پست",
      type: "blog",
      pages: blogPages,
      nextPageNumber: nextBlogPageNumber,
      pagesPagination: blogPagesPagination,
      _setNextPageNumber: _setNextBlogPageNumber,
    },
  ];
  useEffect(() => {
    if (!hasViewedThisPageBefore) {
      pushParamsToUrl(ADMIN_PAGES_MODAL);
      localStorage.setItem("HAS_VIEWED_ADMIN_PAGES", "true");
    }
  }, []);
  useEffect(() => {
    setTimeout(() => {
      _getBusinessPages();
    }, 0);
  }, [nextPageNumber]);

  useEffect(() => {
    setTimeout(() => {
      _getBusinessBlogPages();
    }, 0);
  }, [nextBlogPageNumber]);
  const createPage = ({ currentPage, entityName }) => {
    const isBlog = entityName === "پست";
    if (currentPage)
      _createBusinessPage(
        {
          business: business.id,
          data: { ...currentPage.data, name: `کپی ${currentPage.data.name}` },
        },
        (id) => {
          if (isBlog) _getBusinessBlogPages();
          else _getBusinessPages();

          router.push(
            `${adminUrlPrefix}${isBlog ? "blog/" : "appearance/pages/"}${id}`
          );
        }
      );
    else
      _createBusinessPage(
        {
          business: business.id,
          data: {
            name: `${entityName} جدید`,
            seo_title: "",
            keyphrase: "",
            meta_description: "",
            main_image_url: "",
            is_active: true,
            slug: "",
            sections_skeleton: [],
            is_blog: isBlog,
          },
        },
        (id) =>
          router.push(
            `${adminUrlPrefix}${isBlog ? "blog/" : "appearance/pages/"}${id}`
          )
      );
  };

  const pageRowProps = ({ isBlog, entityName }) => ({
    urlPrefix,
    adminUrlPrefix,
    entityPersianCopyRight: entityName,
    themeConfig,
    isBlog,
    _setSnackBarMessage,
    business,
    _updatePage,
    _deleteBusinessPage,
    _updateBusiness,
  });
  return (
    <div className="container pb-3">
      <Head>
        <title>ویرایش صفحات وب سایت</title>
      </Head>
      <AdminBreadCrumb />
      {pagesData.map((page) => (
        <PageBox
          key={page.type}
          title={page.title}
          isLoading={page.type === "blog" ? loadingBlog : loading}
          pages={page.pages}
          defaultCollapseStatus={page.type === "page"}
          pageRowProps={pageRowProps({
            isBlog: page.type === "blog",
            entityName: page.name,
          })}
          newBtnData={{
            text: `${page.name} جدید`,
            onClick: ({ currentPage }) =>
              createPage({ entityName: page.name, currentPage }),
          }}
        >
          {!!page?.pages?.length && (
            <TablePagination
              labelDisplayedRows={({ from, to, count }) =>
                `${englishNumberToPersianNumber(
                  from
                )} - ${englishNumberToPersianNumber(to)} از ${
                  count !== -1
                    ? englishNumberToPersianNumber(count)
                    : `بیشتر از  ${englishNumberToPersianNumber(to)}`
                }`
              }
              rowsPerPageOptions={[10]}
              component="div"
              count={page.pagesPagination ? page.pagesPagination.count : 10}
              rowsPerPage={10}
              page={page.nextPageNumber - 1}
              onChangePage={(event, newPage) => {
                page._setNextPageNumber(newPage + 1);
              }}
              ActionsComponent={({
                count,
                page,
                rowsPerPage,
                onChangePage,
              }) => (
                <div className="">
                  <IconButton
                    onClick={(event) => {
                      onChangePage(event, page - 1);
                    }}
                    disabled={page === 0}
                    aria-label="previous page"
                  >
                    <KeyboardArrowRight />
                  </IconButton>
                  <IconButton
                    onClick={(event) => {
                      onChangePage(event, page + 1);
                    }}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                  >
                    <KeyboardArrowLeft />
                  </IconButton>
                </div>
              )}
            />
          )}
        </PageBox>
      ))}
      {/*like shopping pages*/}
      {Object.values(pluginPages).map((pagesObject) =>
        pagesObject.pages ? (
          <PageBox
            key={pagesObject.id}
            title={pagesObject.pagesLabel}
            isLoading={loading}
            pages={Object.values(pagesObject.pages)}
            pageRowProps={{
              ...pageRowProps({
                isBlog: false,
                entityName: "صفحه",
              }),
              plugin: pagesObject.id,
            }}
            newBtnData={{
              onClick: (currentPage) =>
                createPage({
                  ...(currentPage && { currentPage }),
                  entityName: "صفحه",
                }),
            }}
          />
        ) : null
      )}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  loadingBlog: makeSelectLoading("blogPages"),
  themeConfig: makeSelectBusinessThemeConfig(),
  themeColor: makeSelectBusinessThemeColor(),
  navigationMenus: makeSelectNavigationMenus(),
  adminUrlPrefix: makeSelectAdminUrlPrefix(),
  urlPrefix: makeSelectUrlPrefix(),
  pages: makeSelectBusinessPages(),
  blogPages: makeSelectBusinessBlogPages(),
  pagesPagination: makeSelectBusinessPagesPagination(),
  blogPagesPagination: makeSelectBusinessBlogPagesPagination(),
  nextPageNumber: makeSelectBusinessNextPageNumber(),
  nextBlogPageNumber: makeSelectBusinessNextBlogPageNumber(),
  business: makeSelectBusiness(),
  pluginPages: makeSelectPluginPages(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getBusinessPages: (filter) => dispatch(getBusinessPages(filter)),
    _getBusinessBlogPages: (filter) => dispatch(getBusinessBlogPages(filter)),
    _deleteBusinessPage: (id, filters) =>
      dispatch(deleteBusinessPage(id, filters)),
    _updateBusiness: (data, successMessage, failMessage) =>
      dispatch(updateBusiness(data, successMessage, failMessage)),
    _updatePage: (data) => dispatch(updateBusinessPage(data)),
    _setNextPageNumber: (data) => dispatch(setNextPageNumber(data)),
    _setNextBlogPageNumber: (data) => dispatch(setNextBlogPageNumber(data)),
    _setSnackBarMessage: (message, type) =>
      dispatch(setSnackBarMessage(message, type)),
    _createBusinessPage: (data, callback) =>
      dispatch(createBusinessPage(data, callback)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminPages);
