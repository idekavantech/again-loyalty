/* eslint-disable camelcase */
import React, { memo, useState } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";

import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import Input from "@saas/components/Input";
import { createDiscountCode } from "store/actions";
import AdminBreadCrumb from "../../AdminBreadCrumb";
function CRMLabelPage({ loading, _createDiscountCode }) {

  const [discountPrice, setDiscountPrice] = useState("");
  const [discountMinimum, setDiscountMinimum] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [codeUsage, setCodeUsage] = useState("");
  return (
    <div className="d-flex flex-column">
      <AdminBreadCrumb />

      <div className="flex-1 d-flex flex-column  position-relative">
        <div className=" px-3">
          <div className="my-2">
            <Input
              type="text"
              onChange={(val) => setDiscountCode(val)}
              value={discountCode}
              placeholder="Discount code phrase likehello"
            />
          </div>
          <div className="my-2">
            <Input
              type="text"
              onChange={(val) => setCodeUsage(val)}
              value={codeUsage}
              placeholder="The number of purchases made with discount code"
            />
          </div>
          <div className="my-2">
            <Input
              type="text"
              onChange={(val) => setDiscountPrice(val)}
              value={discountPrice}
              placeholder="Discount applied for each purchase"
            />
          </div>
          <div className="my-2">
            <Input
              type="text"
              onChange={(val) => setDiscountMinimum(val)}
              value={discountMinimum}
              placeholder="Floor shopping for discounts"
            />
          </div>
        </div>
        <div className="c-submit-container-shadow sticky-bottom mt-4">
          <Button
            color="primary"
            variant="contained"
            className="w-100"
            disabled={loading}
            onClick={() =>
              _createDiscountCode(
                discountCode,
                discountPrice,
                discountMinimum,
                codeUsage,
                10000
              )
            }
          >
            Store
          </Button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    _createDiscountCode: (
      code,
      discountPrice,
      discountMinimum,
      max_using_number_per_user,
      max_using_total,
      is_active,
      id,
      discount_id
    ) =>
      dispatch(
        createDiscountCode(
          code,
          discountPrice,
          discountMinimum,
          max_using_number_per_user,
          max_using_total,
          is_active,
          id,
          discount_id
        )
      ),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CRMLabelPage);
