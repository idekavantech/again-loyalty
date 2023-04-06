import React, { memo, useState } from "react";
import Head from "next/head";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {
  makeSelectPlugin,
  makeSelectAdminUrlPrefix,
} from "@saas/stores/plugins/selector";
import { makeSelectBusiness } from "@saas/stores/business/selector";
import { setPluginData } from "@saas/stores/plugins/actions";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import { useRouter } from "next/router";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Paper from "@material-ui/core/Paper";
import ImageUploader from "@saas/builder/SectionRenderer/components/ImageUploader";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { uploadFile } from "@saas/stores/global/actions";
import {
  makeSelectLoading,
  makeSelectUploadedFile,
} from "@saas/stores/global/selectors";
const Personal = ({ loading, pluginData, _setPluginData, _uploadFile }) => {
  const router = useRouter();
  const CourierId = router.query.id === "new" ? null : router.query.id;
  const couriers = pluginData.data?.couriers;
  const [courier, setCourier] = useState(
    CourierId
      ? couriers[CourierId]
      : {
          phone: "",
          name: "",
          image: "",
        }
  );

  const submit = () => {
    let _couriers;
    if (CourierId) {
      _couriers = { ...couriers };
      _couriers[CourierId] = courier;
    } else {
      _couriers = { ...couriers, [uniqueid()]: courier };
    }
    _setPluginData(SHOPPING_PLUGIN, {
      ...pluginData.data,
      couriers: _couriers,
    });
  };
  return (
    <div>
      <Head>
        <title>Making a new courier</title>
      </Head>
      <div className="container">
        <AdminBreadCrumb
          isLoading={loading}
          submitButtonText={"Store"}
          submitAction={submit}
          responsive={false}
        />
      </div>
      <div className="container mt-4">
        <Paper className="pt-5 px-5 pb-2">
          <div className="u-fontLarge font-weight-bold">Personal Peak Information</div>
          <div className="d-flex mt-4">
            <div className="d-flex justify-content-between align-items-end">
              <ImageUploader
                _uploadFile={_uploadFile}
                image={courier.image}
                callback={(img) => setCourier({ ...courier, image: img })}
                size={144}
                folderName="business_courier_images"
              />
            </div>
            <div className="flex-1 mr-4 mt-3">
              <div>
                <p className="font-weight-bold">Courier name</p>
                <input
                  className="w-100 mt-1"
                  style={{
                    height: 40,
                    padding: 8,
                    borderRadius: 4,
                    border: "1px solid #E4E6E7",
                  }}
                  placeholder="Assumption"
                  value={courier.name}
                  onChange={(e) =>
                    setCourier({ ...courier, name: e.target.value })
                  }
                />
              </div>
              <div className="mt-3">
                <p className="font-weight-bold">Phone number</p>
                <input
                  className="w-100 mt-1"
                  style={{
                    height: 40,
                    padding: 8,
                    borderRadius: 4,
                    border: "1px solid #E4E6E7",
                  }}
                  value={courier.phone}
                  onChange={(e) =>
                    setCourier({ ...courier, phone: e.target.value })
                  }
                  placeholder="Assumption"
                />
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  urlPrefix: makeSelectAdminUrlPrefix(),
  business: makeSelectBusiness(),
  pluginData: makeSelectPlugin(SHOPPING_PLUGIN),
  uploadedFile: makeSelectUploadedFile(),
});

function mapDispatchToProps(dispatch) {
  return {
    _setPluginData: (plugin, data) => dispatch(setPluginData(plugin, data)),
    _uploadFile: (files, folderName, callback) =>
      dispatch(uploadFile({ files, folderName }, callback)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(memo, withConnect)(Personal);
