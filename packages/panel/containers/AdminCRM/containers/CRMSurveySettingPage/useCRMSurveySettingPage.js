import React, { memo, useEffect, useState } from "react";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import { makeSelectBusiness } from "@saas/stores/business/selector";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";

import {
  makeSelectReviewsTemplate,
} from "store/selectors";
import {
  getReviewsTemplate,
  updateCrmSurveyDelay,
} from "store/actions";
import { useSelector, useDispatch } from "react-redux";

const settingTypes = [
  {
    id: 0,
    title: "Survey settings by sending method",
    description: "For orders that must be sent to the customer's address.",
    label: "carry_out",
  },
  {
    id: 1,
    title: "Survey settings with on -site delivery method",
    description:
      "For customers who get your order at your business location.",
    label: "delivery_on_user_site",
  },
  {
    id: 2,
    title: "Survey settings by Mill Method on -site",
    description:
      "For customers who use your service in your business location.",
    label: "delivery_on_business_site",
  },
  {
    id: 3,
    title: "Survey settings with a car delivery method",
    description: "For customers who get their order in the car.",
    label: "delivery_on_car",
  },
];

export function useCRMSurveySettingPage() {
  const dispatch = useDispatch();

  const loading = useSelector(makeSelectLoading());
  const urlPrefix = useSelector(makeSelectAdminUrlPrefix());
  const business = useSelector(makeSelectBusiness());
  const reviewsTemplate = useSelector(makeSelectReviewsTemplate());

  const _getReviewsTemplate = (data) => dispatch(getReviewsTemplate(data));
  const _updateCrmSurveyDelay = (data) => dispatch(updateCrmSurveyDelay(data));

  const [showSettingModal, setShowSettingModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      _getReviewsTemplate();
    }, 0);
  }, []);

  const submitCrmSurveyDelay = (delay) =>{
    const value = delay === null ? null : Number(delay);
    const data = {
      plugin: SHOPPING_PLUGIN ,
      data : {
        feedback_delay:value
      }
    }
    _updateCrmSurveyDelay(data)
  }


  const feedBackDelay =
  business.plugins_config[SHOPPING_PLUGIN]?.data?.feedback_delay;

  return {
    settingTypes,
    loading,
    urlPrefix,
    business,
    reviewsTemplate,
    _getReviewsTemplate,
    _updateCrmSurveyDelay,
    showSettingModal,
    setShowSettingModal,
    submitCrmSurveyDelay,
    feedBackDelay
  };
}
