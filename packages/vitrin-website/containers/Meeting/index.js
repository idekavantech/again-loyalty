import { memo } from "react";
import { createStructuredSelector } from "reselect";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { compose } from "redux";
import { connect } from "react-redux";
import { makeSelectLoading } from "stores/global/selector";
import { useRouter } from "next/router";
import Loading from "components/Loading";
import { acceptEvent } from "stores/global/actions";
import Header from "containers/Header";
import Footer from "components/Footer";

function MeetingPage({ isLoading, _acceptEvent }) {
  const router = useRouter();
  const { slug, event_id } = router.query;
  if (slug && event_id) {
    return (
      <div>
        <Header isTransparent />
        <div className="container d-flex justify-content-center">
          <Paper
            elevation={1}
            className="mx-2 col-md-5 col-12 m-5 px-5 py-3 d-flex flex-column aling-items-center justify-content-center"
            style={{ height: 200 }}
          >
            <h2 className="text-center" style={{ direction: "rtl" }}>
              {" "}
              برای شما جلسه‌ای ست شده است.
            </h2>
            <Button
              onClick={() => _acceptEvent({ slug, event_id })}
              disabled={isLoading}
              className="w-100 mt-5"
              variant="contained"
              color="primary"
            >
              پذیرفتن
            </Button>
          </Paper>
        </div>
        <Footer />
      </div>
    );
  }
  return <Loading isLoading />;
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    _acceptEvent: (data) => dispatch(acceptEvent(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(MeetingPage);
