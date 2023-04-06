import TemplateHeader from "./components/tamplateHeader";
import { useState, memo } from "react";
import ScrollModal from "components/scrollModal";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeSelectIsAuthenticated } from "stores/user/selector";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import { useRouter } from "next/router";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

const TemplatePage = ({ template, domain, isAuthenticated }) => {
  const [selectedDevice, setSelectedDevice] = useState("mobile");
  const [isOpenScrollModal, setIsOpenScrollModal] = useState(true);
  const { maxWidth600 } = useResponsive();

  const router = useRouter();
  function onSelectTemplate() {
    router.push(
      `${
        isAuthenticated ? "/cr~main-info" : "/cr~signup-phone"
      }?template=${domain}&business_type=store`
    );
  }
  return (
    <div
      className="p-4 d-flex justify-content-center align-items-center"
      style={{ height: "100vh", overflow: "hidden", zIndex: 100 }}
      onWheel={() => setIsOpenScrollModal(false)}
      onTouchMove={() => setIsOpenScrollModal(false)}
    >
      <TemplateHeader
        selectedDevice={selectedDevice}
        setSelectedDevice={setSelectedDevice}
      />
      <div className="mt-3">
        {selectedDevice === "mobile" && (
          <div className="w-100 d-flex justify-content-center">
            <div className="frame-container position-relative d-flex justify-content-center align-items-center p-5">
              <img alt="" width={300} src="/images/mobile.svg" />
              <div
                style={{
                  position: "absolute",
                  borderRadius: "0 0 20px 20px",
                  top: maxWidth600 ? -90 : 80,
                  right: maxWidth600 ? -21 : 57,
                  zIndex: isOpenScrollModal ? -1 : 1,
                }}
              >
                <iframe
                  src={template?.url}
                  width={maxWidth600 ? "390" : "233"}
                  height={maxWidth600 ? "810" : "480"}
                  tabIndex="1"
                  style={{
                    position: "relative",
                    borderRadius: "0 0 20px 20px",
                    transform: maxWidth600 ? "scale(0.6)" : "scale(1)",
                  }}
                ></iframe>
              </div>
            </div>
          </div>
        )}
        {selectedDevice === "tablet" && (
          <div className="w-100 d-flex justify-content-center">
            <div
              className="frame-container position-relative d-flex justify-content-center align-items-center p-5"
              style={{ width: maxWidth600 ? 350 : 500 }}
            >
              <img
                alt=""
                width={maxWidth600 ? 350 : 500}
                src="/images/tablet.svg"
              />
              <div
                style={{
                  position: "absolute",
                  borderRadius: 20,
                  right: -124,
                  zIndex: isOpenScrollModal ? -1 : 1,
                  right: maxWidth600 ? -124 : -18,
                }}
              >
                <iframe
                  src={template?.url}
                  width={maxWidth600 ? "202%" : "550"}
                  height={maxWidth600 ? "800" : "730"}
                  tabIndex="1"
                  id="iframe"
                  style={{
                    position: "relative",
                    transform: maxWidth600 ? "scale(0.5)" : "scale(0.8)",

                    borderRadius: 20,
                  }}
                ></iframe>
              </div>
            </div>
          </div>
        )}
        {selectedDevice === "desktop" && (
          <div className="w-100 d-flex justify-content-center">
            <div className="frame-container position-relative d-flex justify-content-center align-items-center p-5">
              <img
                alt=""
                width={maxWidth600 ? 700 : 800}
                src="/images/computer copy.svg"
              />
              <div
                style={{
                  position: "absolute",
                  right: -224,
                  top: maxWidth600 ? -209 : 17,
                  zIndex: isOpenScrollModal ? -1 : 1,
                  right: maxWidth600 ? -240 : -25,
                }}
              >
                <iframe
                  src={template?.url}
                  width={maxWidth600 ? "400%" : "900"}
                  height={maxWidth600 ? "800" : "400"}
                  tabIndex="1"
                  style={{
                    position: "relative",
                    transform: maxWidth600 ? "scale(0.35)" : "scale(0.8)",
                  }}
                ></iframe>
              </div>
            </div>
          </div>
        )}

        <div
          className=" d-flex justify-content-center"
          style={{
            position: "fixed",
            bottom: 16,
            left: maxWidth600 ? 16 : 0,
            right: maxWidth600 ? 16 : 0,
            zIndex: 100,
          }}
        >
          <button
            className="radius-8 p-2"
            style={{
              backgroundColor: "#0050FF",
              color: "#fff",
              height: 38,
              width: maxWidth600 ? "100%" : 320,
              fontWeight: maxWidth600 ? "400" : "700",
              fontSize: maxWidth600 ? "14px" : "16px",
            }}
            onClick={onSelectTemplate}
          >
            ساخت سایت با این قالب
          </button>
        </div>
        <ScrollModal
          isOpen={isOpenScrollModal}
          onClose={() => setIsOpenScrollModal(false)}
        />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(TemplatePage);
