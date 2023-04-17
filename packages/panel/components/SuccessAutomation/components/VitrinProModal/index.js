import React, { memo } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import LazyImage from "@saas/components/LazyImage";
import Button from "@material-ui/core/Button";
import { automaticConsultationRequest } from "store/actions";


const VitrinProModal = ({
  isOpen,
  onClose,
  _createAutomaticConsultationRequest,
}) => {
  const desktopMatches = useMediaQuery("(min-width:768px)");

  const subminConsulationRequest = () => {
    _createAutomaticConsultationRequest("requestForVitrinPro", onClose);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        style: { maxWidth: desktopMatches ? 520 : 320, margin: 0 },
      }}
    >
      <DialogContent className="p-3 p-md-4 w-100">
        <h2
          style={{
            fontSize: 20,
            fontWeight: 500,
            lineHeight: "32px",
          }}
        >
          What is a showcase?
        </h2>
        <div className="w-100 mt-2 d-flex justify-content-center">
          <LazyImage
            width={desktopMatches ? 300 : 169}
            height={desktopMatches ? 190 : 107}
            src={`/images/vitrin-pro.svg`}
          />
        </div>
        <p
          className="mt-2 mt-md-3"
          style={{
            fontSize: desktopMatches ? 16 : 14,
            lineHeight: desktopMatches ? "24px" : "20px",
          }}
        >
          Design, Content and Digital Marketing Specialists Showcase:
          <br />
          -Launch Services
          <br />
          -Professional design for site pages
          <br />
          -Digital Marketing Advice to Increase Site Sales<br />And SEO services
          Advanced for customers showcase and exclusively based on the needs of each
          They do business.
        </p>
        <div className="d-flex justify-content-between">
          <Button
            className=" mt-2 dashboard_buttons"
            style={{
              height: desktopMatches ? 42 : 32,
            }}
            color="primary"
            variant="outlined"
            size={desktopMatches ? "large" : "small"}
            onClick={onClose}
          >
            coming back
          </Button>
          <Button
            className="flex-1 mr-2 mt-2 dashboard_buttons"
            style={{
              height: desktopMatches ? 42 : 32,
            }}
            color="primary"
            variant="contained"
            size={desktopMatches ? "large" : "small"}
            onClick={subminConsulationRequest}
          >
            I want to set up advice
          </Button>
        </div>
        <p
          className="mt-2 mt-md-1"
          style={{
            fontSize: desktopMatches ? 12 : 10,
            lineHeight: desktopMatches ? "20px" : "10px",
          }}
        >
          You will contact you after submitting the request by the Peruvian showcase.
        </p>
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    _createAutomaticConsultationRequest: (data, callback) =>
      dispatch(automaticConsultationRequest(data, callback)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withConnect)(VitrinProModal);
