import { memo, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  makeSelectVitrinFormInformation,
  makeSelectPackages,
  makeSelectBusinessCRMData,
  makeSelectTransaction,
} from "stores/global/selector";
import { createStructuredSelector } from "reselect";
import {
  createTransaction,
  getBusinessCRMData,
  getPackages,
  getTransaction,
  payTransaction,
  updateNewVitrinForm,
} from "stores/global/actions";
import Button from "@material-ui/core/Button";
import { priceFormatter } from "utils/helpers/priceFormatter";
import { useRouter } from "next/router";
import { coal, graphite, smoke } from "utils/colors";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import Header from "containers/Header";
import Footer from "components/Footer";
import LoadingIndicator from "components/LoadingIndicator";
import InfoIcon from "@material-ui/icons/Info";

const persianInvoiceRowKey = {
  initialize: "راه‌اندازی",
  installation: "راه‌اندازی",
  software: "هزینه آبونمان نرم افزار",
  license: "هزینه آبونمان نرم افزار",
  support: "پشتیبانی",
  debt: "بدهی قبلی",
  money_paid_data: "صورت‌حساب",
};

const SHOW_GUILD_TEXT_AMOUNT_PIVOT = 1500000;

function InvoicePage({
  _getBusinessCRMData,
  _getTransaction,
  transaction,
  _payTransaction,
}) {
  const { minWidth768 } = useResponsive();
  const router = useRouter();
  const { order } = router.query;
  useEffect(() => {
    if (router.query.business_slug) {
      setTimeout(() => {
        _getBusinessCRMData(router.query.business_slug);
      }, 0);
    }
  }, [router.query.business_slug]);

  useEffect(() => {
    setTimeout(() => {
      _getTransaction(router.query.tid);
    }, 0);
  }, [router.query.tid]);

  if (router.query.tid && !transaction) {
    return null;
  }
  if (router.query.tid && transaction) {
    return (
      <div>
        <style
          type="text/css"
          media="print"
          dangerouslySetInnerHTML={{
            __html: `
              .no-print { display: none; }
              .print-body {
                min-height: unset !important;
                max-height: unset !important;
              }
            `,
          }}
        ></style>
        <Header isTransparent />
        <div className="d-flex justify-content-center mb-5">
          <Paper
            className=" col-md-5  col-12 d-flex justify-content-between align-items-center flex-column p-4 print-body"
            style={{
              fontSize: 14,
              borderRadius: 8,
              maxHeight: `calc(100vh - 187px)`,
              overflow: "auto",
              marginTop: 80,
            }}
          >
            <div className="w-100">
              <div
                className="text-right d-flex justify-content-between align-items-center"
                style={{
                  fontWeight: "bold",
                  direction: "rtl",
                  color: coal,
                  fontSize: 14,
                }}
              >
                <div>فاکتور</div>
                <div className="no-print">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => window.print()}
                  >
                    پرینت
                  </Button>
                </div>
              </div>
              {/* {Object.values(transaction.data.plan).reduce((sumOfPrices, currentPlan) =>sumOfPrices + (currentPlan.price || 0),0) < SHOW_GUILD_TEXT_AMOUNT_PIVOT && 
                <div  className="text-right d-flex justify-content-between align-items-center">
                <Paper className="w-100 p-2 px-4 mt-2" 
                style={{
                  background:"rgba(0, 80, 255, 0.08)",
                  border:"solid 1px rgba(0, 80, 255)"
                }}
                  >
                  <div className="d-flex align-items-center">
                    <InfoIcon className="mx-2" style={{color:"rgba(0, 80, 255)"}}/> <h1 style={{height:"fit-content"}} >توضیحات</h1> 
                  </div>
                  <p>
                  همراه عزیز ویترین، سلام! <br/>

                  به دلیل تغییر در سیستم حسابداری شرکت ویترین، از ابتدای دوره بعدی (آبان، آذر و دی) پرداخت‌ هزینه خدمات به صورت  <b>پیش پرداخت</b> انجام می‌شود.
                  برای اجرای این تغییر، لازم است صورت‌حساب دوره جاری (مرداد، شهریور و مهر) شما تسویه شود.
                  <br/> <br/>
                  پیشاپیش از همراهی شما با ویترین سپاسگزاریم.
                  </p>
                </Paper>
              </div>
              }  */}
              <div
                className="mt-3"
                style={{
                  border: "1px solid #EDEDED",
                  borderRadius: 8,
                }}
                id="invoice"
              >
                {order == "business" ? (
                  <div style={{ direction: "rtl" }} className="text-right">
                    <div
                      style={{
                        color: graphite,
                      }}
                      className="px-3 pt-3 pb-2"
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div> صورت‌حساب: </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center px-3 pb-3">
                      <div style={{ color: smoke, fontSize: 11 }}>هزینه</div>
                      <div>{priceFormatter(transaction.amount)} تومان</div>
                    </div>
                  </div>
                ) : (
                  Object.entries(transaction.data?.plan).map(
                    ([key, _package], index) =>
                      typeof _package === "object" && (
                        <div
                          style={{ direction: "rtl" }}
                          className="text-right"
                        >
                          <div
                            style={{
                              borderTop:
                                index === 0 ? "none" : "1px solid #EDEDED",
                              color: graphite,
                            }}
                            className="px-3 pt-3 pb-2"
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <div> {persianInvoiceRowKey[key]}: </div>
                              <div style={{ color: coal }}>{_package.type}</div>
                            </div>
                          </div>

                          <div className="d-flex justify-content-between align-items-center px-3 pb-3">
                            <div style={{ color: smoke, fontSize: 11 }}>
                              هزینه
                            </div>
                            <div>{priceFormatter(_package.price)} تومان</div>
                          </div>
                        </div>
                      )
                  )
                )}
              </div>
            </div>
            <div className="w-100 my-4" style={{ direction: "rtl" }}>
              <div
                className="text-right"
                style={{
                  fontWeight: "bold",
                  direction: "rtl",
                  color: coal,
                  fontSize: 14,
                }}
              >
                صورت‌حساب
              </div>
              <div className="mt-3" style={{ color: graphite }}>
                <div
                  className="d-flex justify-content-between align-items-center mt-3"
                  style={{ fontWeight: "bold", color: coal }}
                >
                  <div>مبلغ قابل پرداخت</div>
                  <div>
                    <span>
                      {order == "business"
                        ? priceFormatter(transaction.amount)
                        : priceFormatter(
                            Object.values(transaction.data?.plan).reduce(
                              (sumOfPrices, currentPlan) =>
                                sumOfPrices + (currentPlan?.price || 0),
                              0
                            )
                          )}
                    </span>{" "}
                    تومان
                  </div>
                </div>
              </div>
            </div>
            {minWidth768 ? (
              <div
                style={{
                  position: "sticky",
                  bottom: 0,
                  left: 0,
                }}
                className="pt-4 w-100 no-print"
              >
                <Button
                  style={{
                    boxShadow: "none",
                    fontWeight: "bold",
                    height: 52,
                  }}
                  color="primary"
                  variant="contained"
                  className="w-100"
                  id="btn-invoice"
                  onClick={() =>
                    _payTransaction({ transaction_id: router.query.tid })
                  }
                >
                  پرداخت
                </Button>
              </div>
            ) : null}
          </Paper>
        </div>

        {!minWidth768 ? (
          <div className="p-4 bg-white w-100 no-print">
            <Button
              style={{
                boxShadow: "none",
                fontWeight: "bold",
                height: 52,
              }}
              color="primary"
              variant="contained"
              className="w-100"
              id="btn-invoice"
              onClick={() =>
                _payTransaction({ transaction_id: router.query.tid })
              }
            >
              پرداخت
            </Button>
          </div>
        ) : null}
        <Footer />
      </div>
    );
  }
  return <LoadingIndicator></LoadingIndicator>;
}
const mapStateToProps = createStructuredSelector({
  form: makeSelectVitrinFormInformation(),
  packages: makeSelectPackages(),
  businessCRMData: makeSelectBusinessCRMData(),
  transaction: makeSelectTransaction(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getBusinessCRMData: (slug) => dispatch(getBusinessCRMData(slug)),
    _getPackages: (id) => dispatch(getPackages(id)),
    _createTransaction: (data, slug, has_first_login_event) =>
      dispatch(createTransaction(data, slug, has_first_login_event)),
    _getTransaction: (id) => dispatch(getTransaction(id)),
    _updateForm: (data) => dispatch(updateNewVitrinForm(data)),
    _payTransaction: (data) => dispatch(payTransaction(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(InvoicePage);
