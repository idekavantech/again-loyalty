import Modal from "@saas/components/Modal";
import ModalHeader from "@saas/components/Modal/ModalHeader";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Input from "@saas/components/Input";
import { memo, useState } from "react";
import Button from "@material-ui/core/Button";
import { updateBusiness } from "@saas/stores/business/actions";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
const BusinessInfoModal = ({ isOpen, onClose, _updateBusiness }) => {
  const desktopMatches = useMediaQuery("(min-width:768px)");
  const [businessInfo, setBusinessInfo] = useState({});

  const submit = () => {
    _updateBusiness(
      {
        revised_title: businessInfo.business_title,
        title: businessInfo.business_title,
        main_owner: {
          extra_data: {
            first_name: businessInfo.first_name,
            last_name: businessInfo.last_name,
          },
        },
      },
      "اطلاعات با موفقیت ذخیره شد",
      "خطا در ثبت اطلاعات",
      onClose
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      style={{
        borderRadius: 8,
        margin: 0,
        maxWidth: desktopMatches ? 520 : 320,
        height: "fit-content",
      }}
      header={
        <ModalHeader
          style={{
            fontSize: 20,
            fontWeight: 500,
            lineHeight: "32px",
            color: "#202223",
            padding: "0 8px 0px 0",
          }}
          classNameIcon="d-none"
          title="تکمیل اطلاعات"
        />
      }
      body={
        <div
          className="p-4 text-right u-fontLarge"
          style={{
            backgroundColor: "#F6F6F7",
          }}
        >
          <p>برای ورود به پنل کاربری ابتدا اطلاعات زیر را تکمیل کنید.</p>
          <div className="w-100 d-flex flex-col flex-md-row mt-4 justify-content-between">
            <div className="w-md-50 pl-md-2">
              <Input
                onChange={(value) => {
                  setBusinessInfo({ ...businessInfo, first_name: value });
                }}
                style={{ minWidth: 215 }}
                className="mt-4 w-100"
                value={businessInfo.first_name}
                label="نام"
                placeholder="مریم"
              />
            </div>
            <div className="w-md-50 pr-md-2">
              <Input
                onChange={(value) => {
                  setBusinessInfo({ ...businessInfo, last_name: value });
                }}
                className="mt-4 w-100"
                style={{ minWidth: 215 }}
                value={businessInfo.last_name}
                label="نام خانوادگی"
                placeholder="طاهری"
              />
            </div>
          </div>
          <Input
            onChange={(value) => {
              setBusinessInfo({ ...businessInfo, business_title: value });
            }}
            className="mt-4"
            value={businessInfo.business_title}
            label="نام کسب‌و‌کار"
            placeholder={"مثال : فروشگاه لوازم‌خانگی آوا"}
          />
        </div>
      }
      cta={
        <Button
          color="primary"
          variant="contained"
          className="w-100"
          onClick={submit}
          disabled={
            !businessInfo.first_name ||
            !businessInfo.last_name ||
            !businessInfo.business_title
          }
        >
          ذخیره اطلاعات
        </Button>
      }
    />
  );
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    _updateBusiness: (data, successMessage, failMessage, callback) =>
      dispatch(updateBusiness(data, successMessage, failMessage, callback)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withConnect)(BusinessInfoModal);
