import Paper from "@material-ui/core/Paper";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Link from "next/link";
import React, { memo } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { makeSelectBranches } from "@saas/stores/business/selector";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import useTheme from "@material-ui/core/styles/useTheme";
import { DARAMAD_WEBAPP_CONSTANT } from "@saas/utils/constants";

function AdminBranches({ branches, urlPrefix }) {
  const isDaramad =
    process.env.NEXT_PUBLIC_APP_NAME === DARAMAD_WEBAPP_CONSTANT;

  const theme = useTheme();
  return (
    <div className="container pb-3">
      <AdminBreadCrumb />
      <Paper elevation={2} className="u-cursor-pointer my-3 py-3">
        {branches.map((branch) => (
          <Link
            href={`${urlPrefix}/branches/${branch.site_domain}${
              isDaramad ? "/" : "/appearance/pages/"
            }`}
            passHref
            key={branch.id}
          >
            <div
              style={{ color: theme.palette.primary.main }}
              className="my-4 p-4"
            >
              {branch.revised_title}
            </div>
          </Link>
        ))}
      </Paper>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  urlPrefix: makeSelectAdminUrlPrefix(),
  branches: makeSelectBranches(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(AdminBranches);
