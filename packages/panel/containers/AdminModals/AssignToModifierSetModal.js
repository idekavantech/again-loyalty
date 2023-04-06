import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Button from "@material-ui/core/Button";
import Skeleton from "@material-ui/lab/Skeleton";
import Modal from "@saas/components/Modal";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import Input from "@saas/components/Input";
import { useRouter } from "next/router";
import useTheme from "@material-ui/core/styles/useTheme";
import TabContext from "@material-ui/lab/TabContext";
import TabPanel from "@material-ui/lab/TabPanel";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { getBusinessCategories } from "../../store/actions";
import { makeSelectBusinessCategories } from "../../store/selectors";
import {
  SELECT_LABEL,
  SELECT_PRODUCT,
} from "../AdminShopping/containers/AdminModifierSetList/useModifierSetList";

let timeoutId = null;

const modalHeaders = {
  [SELECT_PRODUCT]: "Products",
  [SELECT_LABEL]: "Labels",
};

function AssignToModifierSetModal({
  isOpen,
  onClose,
  allProducts,
  isLoading,
  title,
  selectedResources,
  onSubmit,
  onSelectResource,
  _getBusinessCategories,
  businessCategories,
  setTabValue,
  tabValue,
}) {
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const router = useRouter();
  const productId =
    router.query.id === "new" ? null : parseInt(router.query.id);

  const onDealClick = (resource, isChecked, type) => {
    const _selectedResources = { ...selectedResources };
    if (!isChecked) {
      delete _selectedResources[resource.id];
    } else {
      _selectedResources[resource.id] = type;
    }
    onSelectResource({ ..._selectedResources });
  };
  useEffect(() => {
    if (!isOpen) {
      setSearch("");
      setTabValue(SELECT_PRODUCT);
      router.push({
        pathname: router.pathname,
        query: { ...router.query },
      });
    }
  }, [isOpen]);

  useEffect(() => {
    setTimeout(() => {
      _getBusinessCategories({
        filters: {
          page_size: 200,
          has_paginated: false,
        },
      });
    }, 200);
  }, [_getBusinessCategories]);

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      header={
        <div>
          <div className="u-fontWeightBold p-3 text-center">
            Apply settings{title} On other products{" "}
          </div>
          <div
            style={{ backgroundColor: theme.palette.background.paper }}
            className="p-3"
          >
            <div className="text-center">
              {tabValue === SELECT_PRODUCT ? "Products" : "Tags"} That
              You want settings{title} To have a choice..
            </div>
            <div className="text-center mt-1">
              These settings for{" "}
              <span className="u-fontWeightBold">
                {englishNumberToPersianNumber(
                  Object.keys(selectedResources).filter(
                    (key) =>
                      selectedResources[key] ===
                      (tabValue === SELECT_PRODUCT ? "product" : "label")
                  )?.length
                )}{" "}
                {tabValue === SELECT_PRODUCT ? "the product" : "Label"}
              </span>
              Will apply.
            </div>
          </div>

          <Input
            autoFocus
            InputProps={{ style: { borderRadius: 0 } }}
            variant="outlined"
            placeholder={`search${
              tabValue === SELECT_PRODUCT ? "the product" : "Label"
            }`}
            value={search}
            onChange={(value) => {
              setSearch(value);
              clearTimeout(timeoutId);
              const query = { ...router.query };
              delete query.search;
              if (value) {
                query.search = value;
              }
              timeoutId = setTimeout(() => {
                router.push({
                  pathname: router.pathname,
                  query,
                });
              }, 500);
            }}
          />
          <Tabs
            variant="fullWidth"
            value={tabValue}
            onChange={(_, value) => {
              setSearch("");
              setTabValue(value);
            }}
            indicatorColor="primary"
            textColor="primary"
          >
            {Object.keys(modalHeaders).map((key) => (
              <Tab key={key} label={modalHeaders[key]} value={key} />
            ))}
          </Tabs>
        </div>
      }
      body={
        <div className="h-100 overflow-scroll">
          <div className="c-modal-body">
            <div className="px-3">
              <div className="container px-0">
                <TabContext value={tabValue}>
                  <TabPanel className="p-0" value={SELECT_PRODUCT}>
                    {!isLoading && allProducts && allProducts?.length === 0 ? (
                      <div className="container p-2">There was no results.</div>
                    ) : isLoading ? (
                      <LoadingSkeletons />
                    ) : (
                      allProducts &&
                      allProducts.map((product) => {
                        const isProductSelected =
                          product?.id in (selectedResources || {});
                        return (
                          <div className="py-2" key={product.id}>
                            <FormControlLabel
                              className="mr-0"
                              disabled={product.id === productId}
                              control={
                                <Checkbox
                                  checked={isProductSelected}
                                  onChange={(e) => {
                                    onDealClick(
                                      product,
                                      e.target.checked,
                                      "product"
                                    );
                                  }}
                                  color="primary"
                                />
                              }
                              label={product.title}
                            />
                          </div>
                        );
                      })
                    )}
                  </TabPanel>
                  <TabPanel className="p-0" value={SELECT_LABEL}>
                    {!isLoading &&
                    businessCategories &&
                    businessCategories?.length === 0 ? (
                      <div className="container p-2">There was no results.</div>
                    ) : isLoading ? (
                      <LoadingSkeletons />
                    ) : (
                      businessCategories &&
                      businessCategories.map((label) => {
                        const isLabelSelected =
                          label?.id in (selectedResources || {});
                        return (
                          <div className="py-2" key={label.id}>
                            <FormControlLabel
                              className="mr-0"
                              disabled={label.id === productId}
                              control={
                                <Checkbox
                                  checked={isLabelSelected}
                                  onChange={(e) => {
                                    onDealClick(
                                      label,
                                      e.target.checked,
                                      "label"
                                    );
                                  }}
                                  color="primary"
                                />
                              }
                              label={label.title}
                            />
                          </div>
                        );
                      })
                    )}
                  </TabPanel>
                </TabContext>
              </div>
            </div>
          </div>
        </div>
      }
      cta={
        <>
          <Button color="primary" className="w-100" onClick={onClose}>
            to close
          </Button>
          <Button
            className="w-100"
            color="primary"
            variant="contained"
            onClick={() => {
              onSubmit();
            }}
            disabled={isLoading || !Object.keys(selectedResources).length}
          >
            actions
          </Button>
        </>
      }
    />
  );
}

const LoadingSkeletons = () => {
  return [0, 1, 2, 3, 4, 5].map((number) => (
    <div key={number} className="d-flex align-items-center px-4 py-2">
      <Skeleton
        style={{
          width: 36,
          height: 36,
          transform: "none",
        }}
        className="ml-2"
      />
      <Skeleton style={{ width: "100%" }} />
    </div>
  ));
};

const mapStateToProps = createStructuredSelector({
  businessCategories: makeSelectBusinessCategories(),
});

function mapDispatchToProps(dispatch) {
    return {
        _getBusinessCategories: (data) => dispatch(getBusinessCategories(data)),
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AssignToModifierSetModal);
