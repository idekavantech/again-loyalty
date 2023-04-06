import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Paper from "@material-ui/core/Paper";
import Stepper from "containers/AdminGateAway/components/Stepper";
import GeneralInfo from "containers/AdminGateAway/components/GeneralInfo";
import { useRouter } from "next/router";
import { useState, memo, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import ContactInfo from "containers/AdminGateAway/components/ContanctInfo";
import FinancialInfo from "containers/AdminGateAway/components/FinancialInfo";
import ConfirmInfo from "containers/AdminGateAway/components/confirmInfo";
import { CONTACT_INFO, FINANCIAL_INFO, steps } from "../../constant";
import { removeFile, uploadFile } from "@saas/stores/global/actions";
import { createGateAwayZibal, initializeGateAwayZibal } from "store/actions";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { makeSelectBusiness } from "@saas/stores/business/selector";

const CreateGateAway = ({
  adminUrlPrefix,
  _uploadFile,
  _removeFile,
  ـcreateGateAway,
  _initializeGateAwayZibal,
  business,
}) => {
  const [step, setStep] = useState(1);
  const [info, setInfo] = useState({
    name: business.main_owner?.extra_data.first_name || "",
    lastname: business.main_owner?.extra_data?.last_name || "",
    birthday: business.main_owner?.birth_date || "",
    nationalId: business.main_owner?.extra_data?.national_id || "",
    fatherName: business.main_owner?.extra_data?.father_name || "",
    nationalCardImg: {
      img: business.main_owner?.extra_data?.national_card_image || "",
    },
    email: business.main_owner?.email || "",
    address: business?.main_owner?.extra_data?.address || "",
    postalCode: business.extra_data?.postal_code || "",
    phoneNumber: business.extra_data?.landline || "",
  });

  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    setStep(steps.find((m) => m.label == router?.query.step)?.step || 4);
  }, [router.query]);

  const submitGeneralInfo = () => {
    const _errors = {
      name: !info.name ? "نام را وارد نمایید" : "",
      lastname: !info.lastname ? "نام خانوادگی را وارد نمایید" : "",
      birthday: !info.birthday ? "تاریخ تولد را وارد نمایید" : "",
      nationalId: !info.nationalId ? "شماره شناسنامه را وارد نمایید" : "",
      fatherName: !info.fatherName ? "نام پدر را وارد نمایید" : "",
      nationalCardImg: !info.nationalCardImg
        ? "عکس کارت ملی را وارد نمایید"
        : errors?.nationalCardImg,
    };

    setErrors(_errors);
    if (Object.values(_errors).every((error) => !error)) {
      ـcreateGateAway(
        {
          main_owner: {
            birth_date: persianToEnglishNumber(info.birthday),
            extra_data: {
              first_name: info.name,
              last_name: info.lastname,
              national_id: info.nationalId,
              father_name: info.fatherName,
              national_card_image: info.nationalCardImg.img,
            },
          },
          gateway: "zibal",
        },
        () => router.push(`${adminUrlPrefix}/gate_away/${CONTACT_INFO}`)
      );
    }
  };

  const submitContactInfo = () => {
    const _errors = {
      phoneNumber: !info.phoneNumber ? "شماره تلفن را وارد نمایید" : "",
      email: !info.email ? "ایمیل را وارد نمایید" : "",
      postalCode: !info.postalCode
        ? "کد پستی را وارد نمایید"
        : info.postalCode.length < 10
        ? "کد پستی باید ده رقم باشد"
        : "",
      address: !info.address ? "آدرس کسب و کار را وارد نمایید" : "",
    };
    setErrors(_errors);
    if (Object.values(_errors).every((error) => !error)) {
      ـcreateGateAway(
        {
          main_owner: {
            email: info.email,
            extra_data: {
              address: info.address,
            },
          },
          extra_data: {
            postal_code: info.postalCode,
            landline: info.phoneNumber,
          },
        },
        () => router.push(`${adminUrlPrefix}/gate_away/${FINANCIAL_INFO}`)
      );
    }
  };

  const submitFinancialInfo = () => {
    const _errors = {
      bank_acount_number: info.bank_acount_number
        ? info.bank_acount_number.length < 24
          ? "شماره شبا باید ۲۴ رقم باشد"
          : ""
        : "لطفا شماره شبا را وارد نمایید",
    };
    setErrors(_errors);
    if (Object.values(_errors).every((error) => !error)) {
      ـcreateGateAway(
        {
          extra_data: {
            bank_account_number: persianToEnglishNumber(
              info.bank_acount_number
            ),
          },
        },
        () => router.push(`${adminUrlPrefix}/gate_away/success`)
      );
    }
  };

  const initialize_zibal = () => {
    _initializeGateAwayZibal(() => router.push(`${adminUrlPrefix}`));
  };

  const selectComponent = () => {
    switch (step) {
      case 1:
        return (
          <GeneralInfo
            info={info}
            setInfo={setInfo}
            adminUrlPrefix={adminUrlPrefix}
            _uploadFile={_uploadFile}
            _removeFile={_removeFile}
            errors={errors}
            setErrors={setErrors}
            submit={submitGeneralInfo}
          />
        );
      case 2:
        return (
          <ContactInfo
            info={info}
            setInfo={setInfo}
            errors={errors}
            setErrors={setErrors}
            submit={submitContactInfo}
          />
        );
      case 3:
        return (
          <FinancialInfo
            info={info}
            setInfo={setInfo}
            errors={errors}
            setErrors={setErrors}
            submit={submitFinancialInfo}
          />
        );
      default:
        return <ConfirmInfo submit={initialize_zibal} />;
    }
  };

  useEffect(() => {
    fetch(info?.nationalCardImg?.img)
      .then((res) => res.blob())
      .then((blob) => {
        if (blob.size > 1000000) {
          setErrors({
            ...errors,
            nationalCardImg: "حجم عکس وارد شده باید کمتر از یک مگا بایت باشد",
          });
        } else {
          setErrors({
            ...errors,
            nationalCardImg: "",
          });
        }
      });
  }, [info.nationalCardImg.img]);

  return (
    <div className="container mb-5 gate_away_page ">
      <AdminBreadCrumb />
      <style
        dangerouslySetInnerHTML={{
          __html: `
       
          .MuiOutlinedInput-root {
            padding-left: 0;
            border-radius:8px
          },
        `,
        }}
      />
      <div className="col-12 mt-4 px-0">
        <Paper elevation={1} className="p-2 p-md-4">
          <p className="title">ساخت حساب در درگاه زیبال</p>
          <Stepper step={step} />
          {selectComponent()}
        </Paper>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  adminUrlPrefix: makeSelectAdminUrlPrefix(),
  business: makeSelectBusiness(),
});

function mapDispatchToProps(dispatch) {
  return {
    _uploadFile: (files, folderName, callback) =>
      dispatch(uploadFile({ files, folderName }, callback)),
    _removeFile: () => dispatch(removeFile()),
    ـcreateGateAway: (data, callback) =>
      dispatch(createGateAwayZibal(data, callback)),
    _initializeGateAwayZibal: (callback) =>
      dispatch(initializeGateAwayZibal(callback)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withConnect)(CreateGateAway);
