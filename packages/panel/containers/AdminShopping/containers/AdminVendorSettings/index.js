import React, { memo, useEffect } from "react";
import { createStructuredSelector } from "reselect";
import { makeSelectAdminVendors } from "store/selectors";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { getAdminVendors, updateAdminVendor } from "store/actions";
import { connect } from "react-redux";
import { compose } from "redux";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Paper from "@material-ui/core/Paper";
import { useRouter } from "next/router";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import {
  makeSelectPlugins,
  makeSelectAdminUrlPrefix,
} from "@saas/stores/plugins/selector";
import AdminVendorTable from "containers/AdminShopping/containers/AdminVendorSettings/AdminVendorTable";
import { night } from "@saas/utils/colors";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import VendorIcon from "@saas/icons/VendorIcon";

function AdminVendorSettings({
  urlPrefix,
  pluginsData,
  plugin = SHOPPING_PLUGIN,
  isLoading,
  vendors,
  _getVendors,
  _updateAdminVendor,
}) {
  const router = useRouter();
  const pluginUrl = pluginsData[plugin].plugin_url;
  useEffect(() => {
    setTimeout(() => _getVendors(), 0);
  }, []);
  return (
    <div className="container pb-3">
      <AdminBreadCrumb
        responsive={false}
        submitAction={() => {
          router.push(`${urlPrefix}${pluginUrl}/vendors/new`);
        }}
        submitButtonText="Creating a supplier"
        submitButtonHasPlus
      />
      <Paper
        style={{ minHeight: 300 }}
        elevation={1}
        className="pb-3 mt-3 px-3"
      >
        {isLoading || !vendors ? (
          <LoadingIndicator />
        ) : vendors.length ? (
          <>
            {vendors?.filter((vendor) => vendor.is_active)?.length ? (
              <>
                <AdminVendorTable
                  isLoading={isLoading}
                  vendors={vendors?.filter((vendor) => vendor.is_active) || []}
                  urlPrefix={urlPrefix}
                  pluginUrl={pluginUrl}
                  _updateAdminVendor={_updateAdminVendor}
                  _getVendors={_getVendors}
                />
              </>
            ) : null}
            {vendors?.filter((vendor) => !vendor.is_active)?.length ? (
              <>
                <div
                  className="px-3 u-fontWeightHeavy mt-5 mb-1 u-fontLarge"
                  style={{ color: night }}
                >
                  Disable suppliers
                </div>
                <AdminVendorTable
                  isLoading={isLoading}
                  vendors={vendors?.filter((vendor) => !vendor.is_active) || []}
                  urlPrefix={urlPrefix}
                  pluginUrl={pluginUrl}
                  _updateAdminVendor={_updateAdminVendor}
                  _getVendors={_getVendors}
                />
              </>
            ) : null}
          </>
        ) : (
          <div className="d-flex flex-column align-items-center justify-content-center">
            <VendorIcon className="mb-4" />
            Has not yet been added supplier.
          </div>
        )}
      </Paper>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  vendors: makeSelectAdminVendors(),
  urlPrefix: makeSelectAdminUrlPrefix(),
  pluginsData: makeSelectPlugins(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getVendors: (data) => dispatch(getAdminVendors(data)),
    _updateAdminVendor: (id, data, callback) =>
      dispatch(updateAdminVendor(id, data, callback)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminVendorSettings);
