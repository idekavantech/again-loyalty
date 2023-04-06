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
import FeedbackItem from "./FeedbackItem";
import { useRouter } from "next/router";
import Image from "next/image";
import HelpIcon from "@material-ui/icons/Help";
import { getSurveyTemplate } from "@saas/stores/business/actions";
import { makeSelectSurveyTemplate } from "@saas/stores/business/selector";
import { createResponse } from "./actions";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import CircularProgress  from "@material-ui/core/CircularProgress";

export function Feedback({
  surveyTemplate = {},
  _getSurveyTemplate,
  _createResponse,
  loading
}) {
  useInjectReducer({ key: "feedback", reducer });
  useInjectSaga({ key: "feedback", saga });
  const [questionList, setQuestionList] = useState();
  const [description, setDescription] = useState("");
  const router = useRouter();
  const order_id = router?.query?.order_id;
  const template_id = router?.query?.review_template;
  useEffect(() => {
    setTimeout(() => {
      _getSurveyTemplate(template_id);
    }, 0);
  }, []);

  useEffect(() => {
    Object.keys(surveyTemplate).length
      ? setQuestionList(
          surveyTemplate.questions.filter((question) => question.is_active)
        )
      : null;
  }, [surveyTemplate]);

  const submit = () => {
    let responseList = questionList.map((question, index) => {
      let res = {
        ...question,
        attributes: question.selectedAttribute || [],
        question_id: question.id || index,
      };
      delete res.selectedAttribute;
      delete res.id;
      delete res.is_active;
      delete res.order;
      return res;
    });
    if (description) {
      _createResponse({
        template_id,
        business_id: surveyTemplate?.business,
        shopping_order_id: order_id,
        data: responseList,
        description,
      });
    } else {
      _createResponse({
        template_id,
        business_id: surveyTemplate?.business,
        shopping_order_id: order_id,
        data: responseList,
      });
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
            <Image alt="" width={64} height={64} src="/images/Survey.svg" />
            <div className="mr-2">
              <p style={{ fontWeight: 600, fontSize: 16 }}>نظرسنجی</p>
              <p className="mt-2" style={{ fontSize: 12 }}>
                با ثبت نظر خود، ما را برای خدمات بهتر همراهی کنید.
              </p>
            </div>
          </div>
        </div>
        <div>
          {loading && 
          <div
          style={{
            width:"100%",
            height:"70vh",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
          }}
          >  
          <CircularProgress/>
          </div>
          }
          {!loading && questionList?.map(
            (question, index) =>
              question.is_active && (
                <div
                  className="d-flex  justify-content-center"
                  style={{
                    backgroundColor: index % 2 == 0 ? "#FAFBFB" : "#fff",
                  }}
                >
                  <div
                    style={{
                      padding: "24px 32px",
                      width: 390,
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <HelpIcon style={{ color: "#FFC453", height: 20 }} />
                      <span
                        className="mr-1"
                        style={{ fontSize: 12, fontWeight: 600 }}
                      >
                        {question.title}
                      </span>
                    </div>
                    <p className="my-2">{question.subtitle}</p>

                    <FeedbackItem
                      rate={question?.rating}
                      attributes={question?.attributes}
                      setRate={(rate) => {
                        let newQuestionList = questionList;
                        newQuestionList[index] = {
                          ...question,
                          rating: rate,
                        };
                        setQuestionList([...newQuestionList]);
                      }}
                      setSelectedAttribute={(newSelectedAttribute) => {
                        let newQuestionList = questionList;
                        let selectedAttribute;
                        if (
                          question?.selectedAttribute?.find(
                            (item) => item == newSelectedAttribute
                          )
                        ) {
                          selectedAttribute =
                            question?.selectedAttribute.filter(
                              (item) => item !== newSelectedAttribute
                            );
                        } else {
                          selectedAttribute = question?.selectedAttribute
                            ? [
                                ...question?.selectedAttribute,
                                newSelectedAttribute,
                              ]
                            : [newSelectedAttribute];
                        }

                        newQuestionList[index] = {
                          ...question,
                          selectedAttribute: selectedAttribute,
                        };
                        setQuestionList([...newQuestionList]);
                      }}
                      selectedAttribute={question?.selectedAttribute}
                    />
                  </div>
                </div>
              )
          )}
        </div>
        <div className="d-flex justify-content-center  mb-5">
          <div className="mt-4 pt-2" style={{ width: 390, padding: "0 32px" }}>
            <p
              style={{
                color: "#6D7175",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              نوشتن نظر
            </p>
            <input
              className="w-100 mt-3 pb-2 crm-input"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              style={{ borderBottom: "1px solid #8C9196" }}
              placeholder="اگر نظر یا پیشنهاد دیگری دارید، با ما به اشتراک بگذارید."
            />
          </div>
        </div>

        <div
          className="d-flex justify-content-center px-2 py-3  position-fixed w-100 bottom-0 "
          style={{ backgroundColor: "#fff" }}
        >
          <Button
            className="w-100 u-border-radius-8"
            style={{
              color: "#fff",
              backgroundColor:
                questionList?.filter((question) => question.rating > 0)
                  ?.length < questionList?.length
                  ? "#BABEC3"
                  : "#00A47C",
              width: 390,
            }}
            color="secondary"
            onClick={submit}
            disabled={
              questionList?.filter((question) => question.rating > 0)?.length <
              questionList?.length
            }
          >
            مرحله بعد
          </Button>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  feedback: makeSelectFeedback(),
  surveyTemplate: makeSelectSurveyTemplate(),
  loading : makeSelectLoading()
});

function mapDispatchToProps(dispatch) {
  return {
    _getSurveyTemplate: (data) => dispatch(getSurveyTemplate(data)),
    _createResponse: (data) => dispatch(createResponse(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Feedback);
