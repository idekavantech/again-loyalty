/**
 *
 * Feedback
 *
 */

import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import Head from "next/head";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Button from "@material-ui/core/Button";
import { useInjectSaga } from "@saas/stores/injectSaga";
import { useInjectReducer } from "@saas/stores/injectReducer";
import makeSelectFeedback from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { useRouter } from "next/router";
import Image from "next/image";
import { getSurveyTemplate } from "@saas/stores/business/actions";
import { makeSelectSurveyTemplate } from "@saas/stores/business/selector";
import { makeSelectUserOrder } from "@saas/plugins/Shopping/selectors";
import { getOrder } from "@saas/plugins/Shopping/actions";
import { getResponse, updateResponse } from "./actions";
import { makeSelectResponse } from "./selectors";

export function FeedbackDetails({
  surveyTemplate,
  _getSurveyTemplate,
  _getOrder,
  order,
  response,
  _getResponse,
  _updateResponse,
}) {
  useInjectReducer({ key: "feedback", reducer });
  useInjectSaga({ key: "feedback", saga });
  const [questionList, setQuestionList] = useState();
  const [responsesList, setResponseList] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const router = useRouter();
  const order_id = router?.query?.order_id;
  const template_id = router?.query?.review_template;
  useEffect(() => {
    setTimeout(() => {
      _getSurveyTemplate(template_id);
      _getOrder({ id: order_id });
      _getResponse(router.query.id);
    }, 0);
  }, []);

  useEffect(() => {
    setQuestionList(response?.data);
  }, [response]);
  const submit = () => {
    _updateResponse({
      id: router?.query?.id,
      response: {
        template_id: template_id,
        business_id: surveyTemplate?.business,
        shopping_order_id: order_id,
        data: responsesList,
      },
    });
  };
  const selectVariationDeals = (attribute, item, index) => {
    let question = questionList.find((question) =>
      question.attributes.includes(attribute)
    );

    let selectDeal = {
      ...question,
      variation_id: item.deal.variation_id,
      deal_id: item.deal.id,
      attributes: [attribute],
    };
    !selectDeal.description ? delete selectDeal.description : null;
    delete selectDeal?.id;
    setResponseList([...responsesList, selectDeal]);
    let newSelectedItem = selectedItems;
    if (newSelectedItem[index]?.includes(item?.deal.title)) {
      newSelectedItem[index] =
        newSelectedItem[index]?.filter(
          (select) => select !== item.deal.title
        ) || delete newSelectedItem[index];
      setSelectedItems({ ...newSelectedItem });
    } else {
      newSelectedItem[index] = newSelectedItem[index]
        ? [...newSelectedItem[index], item.deal.title]
        : [item.deal.title];
      setSelectedItems({ ...newSelectedItem });
    }
  };

  return (
    <>
      <Head>
        <title>نظر مشتری</title>
      </Head>
      <div className="position-relative m-0 pb-3">
        <div
          className="d-flex justify-content-center"
          style={{
            backgroundColor: "#111213",
            color: "#fff",
          }}
        >
          <div
            className="d-flex align-items-center"
            style={{ padding: "24px 16px", width: 390 }}
          >
            <Image width={64} height={64} src="/images/Search 1.svg" alt="" />
            <div className="mr-2">
              <p style={{ fontWeight: 600, fontSize: 16 }}>دقیق‌سازی نظرسنجی</p>
              <p className="mt-2" style={{ fontSize: 12 }}>
                با ثبت نظر خود، ما را برای خدمات بهتر همراهی کنید.
              </p>
            </div>
          </div>
        </div>
        <div>
          {response?.aggregated_attributes?.map((attribute, index) => (
            <div
              key={attribute}
              className="d-flex  justify-content-center"
              style={{ backgroundColor: index % 2 == 0 ? "#FAFBFB" : "#fff" }}
            >
              <div
                style={{
                  padding: "24px 32px",
                  width: 390,
                }}
              >
                <div className="d-flex align-items-center">
                  <Image
                    alt=""
                    width={16}
                    height={16}
                    src="/images/Folder Minus 2.svg"
                  />
                  <span
                    className="mr-1"
                    style={{ fontSize: 12, fontWeight: 600 }}
                  >
                    {attribute}
                  </span>
                </div>
                <p className="mt-2">انتخاب آیتم سفارش</p>
                <div className="d-flex justify-content-between flex-wrap">
                  {order?.items?.map((item) => (
                    <div
                      key={item.deal.title}
                      className="mt-2 d-flex justify-content-center align-items-center"
                      style={{
                        width: "48%",
                        height: 41,
                        border: selectedItems[index]?.includes(item.deal.title)
                          ? "1px solid #202223"
                          : "1px solid #8C9196",
                        borderRadius: 8,
                        color: selectedItems[index]?.includes(item.deal.title)
                          ? "#202223"
                          : "#6D7175",
                        backgroundColor: selectedItems[index]?.includes(
                          item.deal.title
                        )
                          ? "#f1f1f1"
                          : "#fff",
                      }}
                      onClick={() =>
                        selectVariationDeals(attribute, item, index)
                      }
                    >
                      {item?.deal.title}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-center position-fixed w-100 bottom-0 ">
          <div
            className="d-flex  px-2 py-3"
            style={{ width: 390, backgroundColor: "#fff" }}
          >
            <Button
              className="w-100 u-border-radius-8"
              style={{
                color: "#fff",
                backgroundColor:
                  responsesList.length == 0 ? "#BABEC3" : "#00A47C",
                height: 40,
              }}
              onClick={submit}
              disabled={responsesList.length == 0}
            >
              ثبت نظرسنجی
            </Button>
            <Button
              className="w-100 u-border-radius-8 mr-2"
              style={{
                boxShadow: "none",
                width: 180,
                height: 40,
                border: "1px solid #00A47C",
                color: "#00A47C",
              }}
            >
              رد کردن و ثبت
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  feedback: makeSelectFeedback(),
  surveyTemplate: makeSelectSurveyTemplate(),
  order: makeSelectUserOrder(),
  response: makeSelectResponse(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getSurveyTemplate: (data) => dispatch(getSurveyTemplate(data)),
    _getOrder: (data) => dispatch(getOrder(data)),
    _getResponse: (data) => dispatch(getResponse(data)),
    _updateResponse: (data) => dispatch(updateResponse(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(FeedbackDetails);
