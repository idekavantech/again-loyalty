import React, { memo, useEffect, useState } from "react";
import PopUp from "@saas/components/PopUp";
import { useRouter } from "next/router";
import { createStructuredSelector } from "reselect";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import {
  createAdminVendor,
  getAdminVendor,
  getVendorItemsByVendor,
  updateAdminVendor,
  updateAdminVendorItem,
} from "store/actions";
import { connect } from "react-redux";
import { compose } from "redux";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {
  makeSelectAdminVendor,
  makeSelectAdminVendorItems,
} from "store/selectors";
import Button from "@material-ui/core/Button";
import VendorInfo from "containers/AdminShopping/containers/AdminVendor/components/VendorInfo";
import VendorIngredients from "containers/AdminShopping/containers/AdminVendor/components/VendorIngredients";
import VendorProducts from "containers/AdminShopping/containers/AdminVendor/components/VendorProducts";

function AdminVendor({
  _updateAdminVendor,
  _getAdminVendor,
  adminVendor,
  isLoading,
  _updateVendorItem,
  adminVendorItems,
  _getAdminVendorItems,
  _createVendor,
}) {
  const router = useRouter();
  const vendorId = router.query.id === "new" ? null : router.query.id;
  const [isDialogBoxOpen, setDialogBox] = useState(false);
  const [nameError, setNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [vendor, setVendor] = useState({});
  const [tab, setTab] = useState(0);
  useEffect(() => {
    if (vendorId)
      setTimeout(() => {
        _getAdminVendor(vendorId);
        _getAdminVendorItems({ vendor: vendorId });
      }, 0);
    else {
      setVendor({});
    }
    return () => {
      setTimeout(() => {
        _getAdminVendor(null);
        _getAdminVendorItems(null);
      }, 0);
    };
  }, [vendorId]);
  useEffect(() => {
    if (vendorId) setVendor(adminVendor || {});
  }, [adminVendor]);
  return (
    <div className="container pb-3">
      <AdminBreadCrumb
        responsive={false}
        buttons={
          <>
            {vendorId ? (
              <Button
                onClick={() => setDialogBox(true)}
                color="primary"
                variant="outlined"
              >
                {vendor?.is_active
                  ? "Disable supplier"
                  : "Enable the supplier"}
              </Button>
            ) : null}
            <Button
              onClick={() => {
                if (!vendor?.name) {
                  setNameError("Enter the supplier's name.");
                } else if (!vendor?.phone || vendor?.phone?.length < 10) {
                  setPhoneNumberError(
                    "Enter the supplier number.(۱۱No.)"
                  );
                } else {
                  if (vendorId) _updateAdminVendor(vendorId, vendor);
                  else _createVendor(vendor);
                }
              }}
              color="primary"
              variant="contained"
              className="mr-2"
            >
              Store
            </Button>
          </>
        }
      />
      {vendorId ? (
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          value={tab}
          onChange={(event, newValue) => {
            setTab(newValue);
          }}
        >
          <Tab label="Supplier information" />
          <Tab label="products List" />
          <Tab label="List of raw materials" />
        </Tabs>
      ) : null}
      {tab === 0 && (
        <VendorInfo
          vendor={vendor}
          setVendor={setVendor}
          nameError={nameError}
          setNameError={setNameError}
          setPhoneNumberError={setPhoneNumberError}
          phoneNumberError={phoneNumberError}
        />
      )}
      {tab === 1 && (
        <VendorProducts
          isLoading={isLoading}
          updateVendorItem={(id, data, callback) =>
            _updateVendorItem(id, data, () => {
              callback();
              _getAdminVendorItems({ vendor: vendorId });
            })
          }
          vendorProducts={
            adminVendorItems?.filter(
              (vendorItem) =>
                vendorItem?.variation?.resource_extra_data?.config?.is_saleable
            ) || []
          }
        />
      )}
      {tab === 2 && (
        <VendorIngredients
          isLoading={isLoading}
          updateVendorItem={(id, data, callback) =>
            _updateVendorItem(id, data, { vendor: vendorId }, () => {
              callback();
              _getAdminVendorItems({ vendor: vendorId });
            })
          }
          vendorIngredients={
            adminVendorItems?.filter(
              (vendorItem) =>
                vendorItem?.variation?.resource_extra_data?.config
                  ?.is_composable
            ) || []
          }
        />
      )}
      <PopUp
        open={isDialogBoxOpen}
        onClose={() => setDialogBox(false)}
        text={`Are you willing to${
          vendor?.is_active ? "Inactive" : "active"
        } Are you a supplier?`}
        submitText={vendor?.is_active ? "to deactivate" : "Activate"}
        closeText="Cancel"
        onSubmit={() => {
          setDialogBox(false);
          _updateAdminVendor(
            vendorId,
            { is_active: !vendor?.is_active },
            router.back
          );
        }}
      />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  adminVendor: makeSelectAdminVendor(),
  adminVendorItems: makeSelectAdminVendorItems(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getAdminVendor: (id) => dispatch(getAdminVendor(id)),
    _getAdminVendorItems: (data) => dispatch(getVendorItemsByVendor(data)),
    _updateAdminVendor: (id, data, callback) =>
      dispatch(updateAdminVendor(id, data, callback)),
    _updateVendorItem: (id, data, callback) =>
      dispatch(updateAdminVendorItem(id, data, callback)),
    _createVendor: (data, callback) =>
      dispatch(createAdminVendor(data, callback)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminVendor);
