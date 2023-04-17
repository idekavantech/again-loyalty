/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-danger */
/* eslint-disable indent */

import React, { memo, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import moment from "moment";
import Close from "@material-ui/icons/Close";
import {
  makeSelectBusinessThemeColor,
  makeSelectDealsSearched,
} from "@saas/stores/business/selector";
import Modal from "@saas/components/Modal";
import { searchDeals } from "@saas/stores/business/actions";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import ProductRow from "./ProductRow";
import { uniqByProp } from "@saas/utils/helpers/uniqByProp";
import { isCurrentTimeAvailable } from "@saas/utils/helpers/isCurrentTimeAvailable";
import useTheme from "@material-ui/core/styles/useTheme";
import { makeSelectLabels } from "../../../../../stores/business/selector";
export function ProductsSearch({
  isOpen,
  onClose,
  deals,
  _searchDeals,
  loading,
  categories,
}) {
  const theme = useTheme();
  const inputRef = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current && isOpen) inputRef.current.focus();
    }, 100);
  }, [isOpen]);
  useEffect(() => {
    if (!isOpen) {
      setResults([]);
    }
  }, [isOpen]);
  useEffect(() => {
    if (deals) {
      setResults(
        deals.filter((product) => {
          if (
            product.extra_data.only_on_day &&
            product.extra_data.only_on_day.length &&
            !product.extra_data.only_on_day.find(
              (sc) => sc.id === moment().day()
            )
          )
            return false;
          if (
            product.extra_data.shifts &&
            !isCurrentTimeAvailable(product.extra_data.shifts)
          )
            return false;

          return true;
        })
      );
    }
  }, [deals]);
  const [results, setResults] = useState([]);
  const uniqueById = uniqByProp("id");

  const unifiedArray = uniqueById(results);
  const [isInputLengthZero, setInputLengthZero] = useState(true);

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      body={
        <div>
          <div className="c-modal-body ">
            <div>
              <div
                style={{ backgroundColor: theme.palette.secondary.main }}
                className="d-flex justify-content-around py-2 px-3"
              >
                <div className="container position-relative px-0">
                  <Close
                    className="u-cursor-pointer u-text-white position-absolute right-0 u-top-0 bottom-0 my-auto mr-3"
                    onClick={onClose}
                  />
                  <input
                    style={{ height: 36, marginRight: 2.5, paddingRight: 40 }}
                    className="c-input-search u-fontMedium u-text-ellipse w-100 u-border-radius-4 py-1"
                    onChange={(e) => {
                      const search = e.target.value;
                      if (search.length > 0) {
                        _searchDeals(search);
                        setInputLengthZero(false);
                      } else {
                        setResults([]);
                        setInputLengthZero(true);
                      }
                    }}
                    ref={inputRef}
                  />
                </div>
              </div>
              <div className="px-3">
                <div className="container px-0">
                  {loading ? (
                    <LoadingIndicator />
                  ) : unifiedArray.length === 0 && !isInputLengthZero ? (
                    <div className="container p-2">There was no results.</div>
                  ) : (
                    unifiedArray.map((product) => (
                      <ProductRow product={product} key={product.id} />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}

const mapStateToProps = createStructuredSelector({
  themeColor: makeSelectBusinessThemeColor(),
  deals: makeSelectDealsSearched(),
  loading: makeSelectLoading(),
  categories: makeSelectLabels(),
});
function mapDispatchToProps(dispatch) {
  return {
    _searchDeals: (title) => dispatch(searchDeals(title)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ProductsSearch);
