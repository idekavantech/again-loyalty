import React, { memo } from "react";
import Button from "@material-ui/core/Button";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { callPhoneNumber } from "@saas/utils/helpers/callPhoneNumber";
import { useRouter } from "next/router";
import { makeSelectUrlPrefix } from "@saas/stores/plugins/selector";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import { makeSelectBusiness } from "@saas/stores/business/selector";


const serverErrorImage = `/images/500-error.png`;

const ServerErrorResponse = ({ urlPrefix, business }) => {
  const router = useRouter();
  const { maxWidth768 } = useResponsive();
  return (
    <div
      className="container d-flex flex-column flex-wrap justify-content-center align-items-center"
      style={{
        minHeight: "80vh",
        color: "#000",
        padding: "50px 0",
      }}
    >
      <div className={`${maxWidth768 ? "w-50" : "w-25"}`}>
        <img
          className="w-75 d-block mx-auto"
          src={serverErrorImage}
          alt="500-error"
        />
      </div>
      <h1
        style={{
          textAlign: "center",
          fontSize: `${maxWidth768 ? "27px" : "40px"}`,
          fontWeight: 400,
          marginTop: "40px",
          width: "90%",
        }}
      >
        It looks like the problem is from our side.
      </h1>
      <h2
        className="font-bold mt-4"
        style={{
          lineHeight: `${maxWidth768 ? "90px" : ""}`,
          fontWeight: "900",
          fontSize: `${maxWidth768 ? "80px" : "100px"}`,
        }}
      >
        500
      </h2>
      <p
        style={{
          fontSize: `${maxWidth768 ? "14px" : "20px"}`,
          lineHeight: "20px",
          maxWidth: `${maxWidth768 ? "80%" : "60%"}`,
        }}
        className="text-center"
      >
        This problem comes to the tech team's kids but if you like you can
        Call us and help us solve this problem faster and faster
        do.
      </p>
      <div
        className={`d-flex flex-wrap align-items-center justify-content-around mt-4  ${
          maxWidth768 ? "w-50" : "w-25"
        }`}
      >
        <Button
          style={{
            fontWeight: 100,
            width: 140,
            color: "#fff",
            backgroundColor: "#e83760",
            borderRadius: 10,
            padding: "8px 16px",
            marginBottom: maxWidth768 ? "10px" : "0px",
          }}
          variant="contained"
          onClick={() => {
            callPhoneNumber(business.phone_zero_starts);
          }}
        >
          contact us
        </Button>

        <Button
          style={{
            fontWeight: 100,
            width: 140,
            borderRadius: 10,
            padding: "8px 16px",
          }}
          variant="contained"
          color="secondary"
          onClick={() => router.push(`${urlPrefix}/`)}
        >
          The homepage of the site
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  urlPrefix: makeSelectUrlPrefix(),
  business: makeSelectBusiness(),
});

function mapDispatchToProps() {
  return {};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ServerErrorResponse);
