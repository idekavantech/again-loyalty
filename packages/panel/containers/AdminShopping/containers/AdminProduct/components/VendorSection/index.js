import React, { memo, useEffect, useMemo, useState } from "react";
import { borderColor } from "@saas/utils/colors";
import Paper from "@material-ui/core/Paper";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  makeSelectAdminVendorItems,
  makeSelectAdminVendors,
} from "store/selectors";
import {
  createDealVendorItem,
  createIngredientVendorItem,
  deleteAdminVendorItem,
  getAdminVendorItemsByDeal,
  getAdminVendorItemsByIngredient,
  getAdminVendors,
  updateAdminVendorItem,
} from "store/actions";
import VendorItem from "containers/AdminShopping/components/VendorItem";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import {
  VENDOR_ITEM_TYPE_DEAL,
  VENDOR_ITEM_TYPE_INGREDIENT,
} from "store/constants";

function VendorSection({
  variationId,
  adminVendors,
  _getAdminVendors,
  vendorItems,
  _updateVendorItem,
  _deleteVendorItem,
  _createDealVendorItem,
  _createIngredientVendorItem,
  _getVendorItemsByDeal,
  _getVendorItemsByIngredient,
  modelId,
  modelType = VENDOR_ITEM_TYPE_DEAL,
}) {
  const vendorItemActions = useMemo(() => ({
    [VENDOR_ITEM_TYPE_DEAL]: {
      create: _createDealVendorItem,
      get: _getVendorItemsByDeal,
    },
    [VENDOR_ITEM_TYPE_INGREDIENT]: {
      create: _createIngredientVendorItem,
      get: _getVendorItemsByIngredient,
    },
  }));
  const getVendorItems = vendorItemActions[modelType].get;
  const createVendorItem = vendorItemActions[modelType].create;
  const [newVendorItems, setNewVendorItems] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      _getAdminVendors();
    }, 0);
  }, [modelId]);
  useEffect(() => {
    setTimeout(() => {
      getVendorItems(modelId);
    }, 0);
  }, [modelId]);

  const availableVendors =
    adminVendors?.filter(
      (_vendor) =>
        !(vendorItems || []).find(
          (vendorItem) =>
            vendorItem.vendor?.id === _vendor.id &&
            vendorItem.variation_id === variationId
        )
    ) || [];
  const sortedVendorItems = useMemo(() => {
    const _vendorItems = [...(vendorItems || [])];
    _vendorItems.sort((a, b) => {
      if (a.id > b.id) return 1;
      if (a.id < b.id) return -1;
      return 0;
    });
    return [..._vendorItems, ...(newVendorItems || [])];
  }, [vendorItems, newVendorItems]);
  return (
    <Paper className="my-4 text-center">
      <div
        className="d-flex justify-content-between flex-1 text-right"
        style={{ borderBottom: `1px solid ${borderColor}` }}
      >
        <div>
          <div className="u-fontLarge u-fontWeightBold">Supplier</div>
          <div className="mt-2">
            In this section you can add the supplier to your product.
          </div>
        </div>
      </div>
      <div className="p-4">
        {sortedVendorItems
          .filter(
            (vendorItem) =>
              !vendorItem.variation_id ||
              vendorItem.variation_id === variationId
          )
          .map((vendorItem) => (
            <VendorItem
              key={vendorItem.id}
              availableVendors={availableVendors}
              vendors={adminVendors}
              vendorItem={vendorItem}
              clearNewVendorItems={() => setNewVendorItems([])}
              _updateVendorItem={(id, data, callback) =>
                _updateVendorItem(id, data, () => {
                  callback();
                  getVendorItems(modelId);
                })
              }
              _createVendorItem={(data, callback) =>
                createVendorItem(
                  modelId,
                  { ...data, variation_id: variationId },
                  callback
                )
              }
              _deleteVendorItem={(id, callback) =>
                _deleteVendorItem(id, () => {
                  callback();
                  getVendorItems(modelId);
                })
              }
            />
          ))}
        {!newVendorItems?.length && availableVendors?.length ? (
          <div className="px-3">
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                setNewVendorItems([{}]);
              }}
              className="u-dashed-border d-flex mt-4 mb-2 align-items-center px-3"
              fullWidth
            >
              <IconButton size="small">
                <AddCircleOutlineRoundedIcon color="primary" />
              </IconButton>

              <span className="u-fontMedium ">Add new supplier</span>
            </Button>
          </div>
        ) : null}
      </div>
    </Paper>
  );
}
const mapStateToProps = createStructuredSelector({
  adminVendors: makeSelectAdminVendors(),
  vendorItems: makeSelectAdminVendorItems(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getAdminVendors: () => dispatch(getAdminVendors()),
    _updateVendorItem: (id, data, callback) =>
      dispatch(updateAdminVendorItem(id, data, callback)),
    _deleteVendorItem: (id, callback) =>
      dispatch(deleteAdminVendorItem(id, callback)),
    _createDealVendorItem: (id, data, callback) =>
      dispatch(createDealVendorItem(id, data, callback)),
    _createIngredientVendorItem: (id, data, callback) =>
      dispatch(createIngredientVendorItem(id, data, callback)),
    _getVendorItemsByDeal: (id) => dispatch(getAdminVendorItemsByDeal(id)),
    _getVendorItemsByIngredient: (id) =>
      dispatch(getAdminVendorItemsByIngredient(id)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(VendorSection);
