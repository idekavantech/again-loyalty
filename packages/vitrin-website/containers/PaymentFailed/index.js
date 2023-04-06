import { memo } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { compose } from "redux";
import { makeTransaction } from "stores/global/actions";
import Footer from "components/Footer";
import Header from "containers/Header";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

function PaymentFailed({ retry }) {
  const router = useRouter();
  const {minWidth576} = useResponsive()
  return (
    <div style={{ minHeight: "100vh" }}>
      <Header isDark />
      <div className=" p-5 m-5">
        <Paper
          elevation={1}
          className="d-flex flex-column justify-content-center align-items-center mx-2 p-4"
        >
          <div
            style={{
              color: "#000000",
              fontSize: 24,
              direction: "rtl",
            }}
            className="text-center bold my-3"
          >
            تراکنش ناموفق بود!
          </div>
          <div className="text-right my-3" style={{ direction: "rtl" }}>
            چنانچه مبلغی از حساب شما کسر شده باشد ظرف ۷۲ ساعت به حسابتان بازگشت
            داده می‌شود.
          </div>
          {minWidth576 ? (
            <Button
              style={{ width: 135 }}
              variant="contained"
              color="primary"
              onClick={() => retry({ amount: router.query.amount, plan: "" })}
              className="w-75"
              id="btn-404-1"
            >
              تلاش مجدد
            </Button>
          ) : (
            <div
              style={{ boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)" }}
              className="fixed-bottom p-3"
            >
              <Button
                style={{ width: 135 }}
                variant="contained"
                color="primary"
                className="w-100"
                onClick={() => retry({ amount: router.query.amount, plan: "" })}
                id="btn-404-2"
              >
                تلاش مجدد
              </Button>
            </div>
          )}
        </Paper>
      </div>

      <Footer />
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    retry: (data) => dispatch(makeTransaction(data)),
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect, memo)(PaymentFailed);
