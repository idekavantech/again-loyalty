/**
 *
 * AdminOrdersSettings
 *
 */

import React, { memo, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import Head from "next/head";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import dynamic from "next/dynamic";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { makeSelectHierarchy } from "@saas/stores/business/selector";

const NavigationItem = dynamic(() => import("./NavigationItem"), {
  ssr: false,
});
import { updateBusiness } from "@saas/stores/business/actions";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import {
  SHOPPING_PLUGIN,
  SHOPPING_PLUGIN_URL,
} from "@saas/utils/constants/plugins";
import {
  makeSelectAdminUrlPrefix,
  makeSelectPlugin,
} from "@saas/stores/plugins/selector";
import { setPluginData } from "@saas/stores/plugins/actions";
import { useRouter } from "next/router";
import TableNoResultMessage from "../../../../components/TableNoResultMessage";
import { ADMIN_HELP_VIDEOS } from "containers/AdminBreadCrumb/constants";

export function AdminNavigationSetting({
  hierarchy,
  _updateBusiness,
  urlPrefix,
}) {
  const [editedHierarchy, setHierarchy] = useState({ ...hierarchy });
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) _updateBusiness({ menu: editedHierarchy });
    else loaded.current = true;
  }, [editedHierarchy]);
  useEffect(() => {
    loaded.current = false;
    setHierarchy(hierarchy);
  }, [hierarchy]);

  const router = useRouter();
  return (
    <div className="container">
      <Head>
        <title>categories</title>
      </Head>

      <AdminBreadCrumb
        title="products categorization"
        submitAction={() =>
          router.push(
            `${urlPrefix}${SHOPPING_PLUGIN_URL}/settings/c/new?parent=0`
          )
        }
        helpVideo={{
          url: ADMIN_HELP_VIDEOS.category.url,
        }}
        submitButtonHasPlus
        responsive={false}
        submitButtonText="New category"
      />

      <div className="d-flex flex-1 flex-column u-pb-80">
        <div className="mt-2">
          {editedHierarchy.children.length ? (
            <NavigationItem
              urlPrefix={urlPrefix}
              item={editedHierarchy}
              setHierarchy={setHierarchy}
              hierarchy={editedHierarchy}
              currentId={editedHierarchy.currentId}
            />
          ) : (
            <TableNoResultMessage
              title={"You don't have a category for your products"}
              description={
                "Use the new category button to build the category"
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  hierarchy: makeSelectHierarchy(),
  pluginData: makeSelectPlugin(SHOPPING_PLUGIN),
  urlPrefix: makeSelectAdminUrlPrefix(),
});

function mapDispatchToProps(dispatch) {
  return {
    _updateBusiness: (data) => dispatch(updateBusiness(data)),
    _setPluginData: (pluginName, data) =>
      dispatch(setPluginData(pluginName, data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminNavigationSetting);
