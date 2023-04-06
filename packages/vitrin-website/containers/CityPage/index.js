/* eslint-disable @next/next/no-img-element */
import React, {
  memo,
  useState,
  useRef,
  useEffect,
  useMemo,
  Fragment,
} from "react";
import Header from "containers/Header";
import Footer from "components/Footer";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import KeyboardArrowLeftRoundedIcon from "@material-ui/icons/KeyboardArrowLeftRounded";

import Image from "next/image";
import Link from "next/link";
import FreeConsultationModal from "containers/FreeConsultationModal";

import { priceFormatter } from "utils/helpers/priceFormatter";
import { showTotolGmv } from "stores/global/actions";
import { makeSelectVitrinGmv } from "stores/global/selector";
import { makeSelectLoading } from "stores/global/selector";
import {
  createFormResponse,
  setSnackBarMessage,
  getFormsDictionary,
} from "stores/global/actions";
import { makeSelectFormsDictionary } from "stores/global/selector";
import { phoneValidator } from "utils/helpers/phoneValidator";
import Section1 from "components/LandingPageSections/Section1";
import Section2 from "components/LandingPageSections/Section2";
import Section3 from "components/LandingPageSections/Section3";
import Section4 from "components/LandingPageSections/Section4";
import Section5 from "components/LandingPageSections/Section5";
import Section6 from "components/LandingPageSections/Section6";
import Section7 from "components/LandingPageSections/Section7";
import Section8 from "components/LandingPageSections/Section8";
import Section10 from "components/LandingPageSections/Section10";
import { cn } from "utils/constants/PAGES";

function CityPage({
  _gmv,
  data,
  loading,
  _showTotolGmv,
  _setSnackBarMessage,
  _submitForm,
  _getFormsDictionary,
  formsDictionary,
}) {
  const [isOpenConsultationModal, setIsOpenConsultationModal] = useState(false);
  const [openCollapse, setOpenCollapse] = useState(false);
  const [form, setForm] = useState(null);
  const [_form, _setForm] = useState({});
  const [openListOfLinks, setOpenListOfLinks] = useState(true);
  const form_id = 548;
  const examplesRef = useRef();
  const possibilitiesRef = useRef();
  const possibilitiesRefMobile = useRef();

  let formattedGmv = useMemo(() => priceFormatter(_gmv), [_gmv]);

  const breadCrumbItems = [data.v2, data.xc1];

  useEffect(() => {
    setTimeout(() => {
      _getFormsDictionary(form_id);
    }, 0);
  }, []);

  useEffect(() => {
    if (formsDictionary) {
      _setForm(formsDictionary[form_id]);
      setForm(formsDictionary[form_id]);
    }
  }, [formsDictionary]);

  useEffect(() => {
    _showTotolGmv();
  }, []);

  const onToggleCollapse = () => setOpenCollapse(!openCollapse);
  const onOpenListOfLinks = () => setOpenListOfLinks(true);
  const onCloseListOfLinks = () => setOpenListOfLinks(false);

  function getVariable(value) {
    let { text, link } = value;
    return link ? (
      <Link style={{ color: "#0050FF" }} href={link}>
        {text}
      </Link>
    ) : (
      <span>{text}</span>
    );
  }

  const submit = () => {
    const newArray = [];
    form.inputs.forEach((input) => {
      if (
        input.required === true &&
        (input.value === undefined || input.value === "")
      ) {
        newArray.push(input);
      }
    });
    if (newArray && newArray.length) {
      _setSnackBarMessage("لطفا همه فیلدها را پر نمایید.", "fail");
    } else if (!phoneValidator(form?.inputs[1].value).valid) {
      _setSnackBarMessage("شماره تلفن همراه وارد شده اشتباه است", "fail");
    } else {
      _submitForm(_form, form_id);
      setTimeout(() => {
        form.inputs.forEach((input) => (input.value = ""));
        if (form.inputs.find((input) => input.type === "image")) {
          _removeFile();
        }
      }, 0);
    }
  };

  return (
    <main>
      <div className="position-relative">
        <div className="header_container"></div>
        <Header isTransparent />
        <Section1
          typeOfLanding={data.typeOfLanding}
          isShopping={data.isShopping}
          refToExamples={examplesRef}
          refToPossibilities={possibilitiesRef}
          formattedGmv={formattedGmv}
          name={data.nameFa}
          image={data.image1}
        />
      </div>
      <Section2
        typeOfLanding={data.typeOfLanding}
        isShopping={data.isShopping}
        name={data.nameFa}
        v1={getVariable(data.v1)}
        v3={getVariable(data.v3)}
        v5={getVariable(data.v5)}
        v6Text={data.v6.text}
        v8={getVariable(data.v8)}
        xc1={getVariable(data.xc1)}
        xc2={getVariable(data.xc2)}
        image={data.image2}
        site={getVariable(data.site)}
      />
      <Section3
        typeOfLanding={data.typeOfLanding}
        isShopping={data.isShopping}
        refOfPossibilitiesMobile={possibilitiesRefMobile}
        openCollapse={openCollapse}
        onToggleCollapse={onToggleCollapse}
        xc5={getVariable(data.xc5)}
        site={getVariable(data.site)}
        name={data.nameFa}
        shop2={getVariable(data.shop2)}
      />
      <Section4
        typeOfLanding={data.typeOfLanding}
        isShopping={data.isShopping}
        name={data.nameFa}
        v3={getVariable(data.v3)}
        v10={getVariable(data.v10)}
        v14={getVariable(data.v14)}
        v17={getVariable(data.v17)}
        xc1={getVariable(data.xc1)}
        xc3={getVariable(data.xc3)}
        type={getVariable(data.type)}
        site={getVariable(data.site)}
      />
      <Section5 />
      <Section6
        name={data.nameFa}
        typeOfLanding={data.typeOfLanding}
        isShopping={data.isShopping}
        shop2={getVariable(data.shop2)}
        shop1Text={data.shop1.text}
        site={getVariable(data.site)}
        xc1={getVariable(data.xc1)}
        xc2Text={data.xc2.text}
        v19={getVariable(data.v19)}
        v8={getVariable(data.v8)}
        xc6={getVariable(data.xc6)}
        xc7={getVariable(data.xc7)}
      />
      <Section7
        refOfSampleSites={examplesRef}
        name={data.nameFa}
        typeOfLanding={data.typeOfLanding}
        isShopping={data.isShopping}
        v22={getVariable(data.v22)}
        v4={getVariable(data.v4)}
        v23={getVariable(data.v23)}
        xc9={getVariable(data.xc9)}
        v18={getVariable(data.v18)}
        xc10={getVariable(data.xc10)}
        shop2={getVariable(data.shop2)}
        v25={getVariable(data.v25)}
        v7={getVariable(data.v7)}
        xc11={getVariable(data.xc11)}
      />
      <Section8
        name={data.nameFa}
        typeOfLanding={data.typeOfLanding}
        isShopping={data.isShopping}
        xc12={getVariable(data.xc12)}
        xc15={getVariable(data.xc15)}
        v3={getVariable(data.v3)}
        v19={getVariable(data.v19)}
        site={getVariable(data.site)}
        v31={getVariable(data.v31)}
        v5={getVariable(data.v5)}
        xc13={getVariable(data.xc13)}
        xc8={getVariable(data.xc8)}
        xc14={getVariable(data.xc14)}
        xc7={getVariable(data.xc7)}
        v30={getVariable(data.v30)}
        v13={getVariable(data.v13)}
        v23={getVariable(data.v23)}
        v32={getVariable(data.v32)}
      />
      {/* Section9 (Mobile) */}
      <div
        className="d-md-none"
        style={{
          backgroundColor: "#F2F7FE",
          color: "#202223",
        }}
      >
        <div className="container">
          <div className="container">
            <div
              className="w-100 d-flex flex-column flex-md-row align-items-center"
              style={{
                paddingTop: "24px",
                paddingBottom: "24px",
              }}
            >
              <div className={`w-100 flex-column justify-content-between`}>
                <Image
                  src="/images/vitrin-support.jpg"
                  width={"600px"}
                  height={"400px"}
                  priority
                  unoptimized
                  alt={`تیم پشتیبانی ویترین که آماده پاسخگویی به سؤالات شما در مورد طراحی سایت در ${data.nameFa} است.`}
                />
              </div>
              <div className="w-100 flex-1 d-flex flex-column justify-content-between m-0 mr-md-4">
                <h2 className="font-weight-600">
                  برای {getVariable(data.xc2)} به پشتیبانی نیاز دارید؟
                </h2>
                <p className="mt-4">
                  تیم {getVariable(data.v1)} آماده است در همه جای ایران، از جمله
                  در {data.nameFa} انواع {getVariable(data.xc14)} و مشاوره را در
                  اختیار شما قرار دهد. از طریق فرم زیر یا شماره تلفن ۰۲۱۹۱۰۷۰۷۵۱
                  همراه شما هستیم.
                </p>
                <div
                  className="d-flex w-100 radius-16 p-4"
                  style={{
                    border: "1px solid #E4E6E7",
                    marginTop: 43,
                    backgroundColor: "rgba(240, 240, 240, 0.3)",
                  }}
                >
                  <div>
                    <Image
                      unoptimized
                      width={24}
                      height={24}
                      src="/images/profile-icon-gray.svg"
                      alt="profile"
                      priority
                    />
                  </div>

                  <input
                    className="flex-1 mr-4"
                    placeholder="نام و نام‌خانوادگی"
                    style={{
                      fontSize: 15,
                      lineHeight: "25px",
                      color: "#202223",
                    }}
                    onChange={(e) => {
                      const localForm = { ..._form };
                      localForm.inputs[0].value = e.target.value;
                      _setForm(localForm);
                    }}
                  />
                </div>
                <div
                  className="d-flex w-100 radius-16 mt-4 p-4"
                  style={{
                    border: "1px solid #E4E6E7",
                    backgroundColor: "rgba(240, 240, 240, 0.3)",
                  }}
                >
                  <div>
                    <Image
                      unoptimized
                      width={24}
                      height={24}
                      src="/images/mobile-icon-gray.svg"
                      alt="mobile"
                      priority
                    />
                  </div>

                  <input
                    className="flex-1 mr-4"
                    placeholder="شماره تلفن همراه"
                    style={{
                      fontSize: 15,
                      lineHeight: "25px",
                      color: "#202223",
                    }}
                    onChange={(e) => {
                      const localForm = { ..._form };
                      localForm.inputs[1].value = e.target.value;
                      _setForm(localForm);
                    }}
                  />
                </div>
                <div
                  className="d-flex w-100 radius-16 mt-4 p-4"
                  style={{
                    border: "1px solid #E4E6E7",
                    backgroundColor: "rgba(240, 240, 240, 0.3)",
                  }}
                >
                  <div>
                    <Image
                      unoptimized
                      width={24}
                      height={24}
                      src="/images/work-gray.svg"
                      alt="mobile"
                      priority
                    />
                  </div>

                  <input
                    className="flex-1 mr-4"
                    placeholder="زمینه فعالیت شما"
                    style={{
                      fontSize: 15,
                      lineHeight: "25px",
                      color: "#202223",
                    }}
                    onChange={(e) => {
                      const localForm = { ..._form };
                      localForm.inputs[2].value = e.target.value;
                      _setForm(localForm);
                    }}
                  />
                </div>
                <button
                  className="w-100 radius-16 p-4 mt-4"
                  style={{
                    color: "#fff",
                    backgroundColor: "#0050FF",
                    boxSizing: "border-box",
                  }}
                  onClick={submit}
                  disabled={loading}
                >
                  ارسال
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Section9 (Desktop) */}
      <div
        className="d-none d-md-block"
        style={{
          backgroundColor: "#F2F7FE",
          color: "#202223",
        }}
      >
        <div className="container">
          <div className="container">
            <div
              className="w-100 d-flex flex-column flex-md-row align-items-center"
              style={{
                paddingTop: "40px",
                paddingBottom: "40px",
              }}
            >
              <div className={`flex-1 flex-column justify-content-between`}>
                <Image
                  src="/images/vitrin-support.jpg"
                  width={"600px"}
                  height={"400px"}
                  priority
                  unoptimized
                  alt={`تیم پشتیبانی ویترین که آماده پاسخگویی به سؤالات شما در مورد طراحی سایت در ${data.nameFa} است.`}
                />
              </div>
              <div className="w-100 flex-1 d-flex flex-column justify-content-between m-0 mr-md-4">
                <h2 className="font-weight-600">
                  برای {getVariable(data.xc2)} به پشتیبانی نیاز دارید؟
                </h2>
                <p className="mt-4">
                  تیم {getVariable(data.v1)} آماده است در همه جای ایران، از جمله
                  در {data.nameFa} انواع {getVariable(data.xc14)} و مشاوره را در
                  اختیار شما قرار دهد. از طریق فرم زیر یا شماره تلفن ۰۲۱۹۱۰۷۰۷۵۱
                  همراه شما هستیم.
                </p>
                <div
                  className="d-flex w-100 radius-16 p-4"
                  style={{
                    border: "1px solid #E4E6E7",
                    marginTop: 43,
                    backgroundColor: "rgba(240, 240, 240, 0.3)",
                  }}
                >
                  <div>
                    <Image
                      unoptimized
                      width={24}
                      height={24}
                      src="/images/profile-icon-gray.svg"
                      alt="profile"
                      priority
                    />
                  </div>

                  <input
                    className="flex-1 mr-4"
                    placeholder="نام و نام‌خانوادگی"
                    style={{
                      fontSize: 15,
                      lineHeight: "25px",
                      color: "#202223",
                    }}
                    onChange={(e) => {
                      const localForm = { ..._form };
                      localForm.inputs[0].value = e.target.value;
                      _setForm(localForm);
                    }}
                  />
                </div>
                <div
                  className="d-flex w-100 radius-16 mt-4 p-4"
                  style={{
                    border: "1px solid #E4E6E7",
                    backgroundColor: "rgba(240, 240, 240, 0.3)",
                  }}
                >
                  <div>
                    <Image
                      unoptimized
                      width={24}
                      height={24}
                      src="/images/mobile-icon-gray.svg"
                      alt="mobile"
                      priority
                    />
                  </div>

                  <input
                    className="flex-1 mr-4"
                    placeholder="شماره تلفن همراه"
                    style={{
                      fontSize: 15,
                      lineHeight: "25px",
                      color: "#202223",
                    }}
                    onChange={(e) => {
                      const localForm = { ..._form };
                      localForm.inputs[1].value = e.target.value;
                      _setForm(localForm);
                    }}
                  />
                </div>
                <div
                  className="d-flex w-100 radius-16 mt-4 p-4"
                  style={{
                    border: "1px solid #E4E6E7",
                    backgroundColor: "rgba(240, 240, 240, 0.3)",
                  }}
                >
                  <div>
                    <Image
                      unoptimized
                      width={24}
                      height={24}
                      src="/images/work-gray.svg"
                      alt="mobile"
                      priority
                    />
                  </div>

                  <input
                    className="flex-1 mr-4"
                    placeholder="زمینه فعالیت شما"
                    style={{
                      fontSize: 15,
                      lineHeight: "25px",
                      color: "#202223",
                    }}
                    onChange={(e) => {
                      const localForm = { ..._form };
                      localForm.inputs[2].value = e.target.value;
                      _setForm(localForm);
                    }}
                  />
                </div>
                <button
                  className="w-100 radius-16 p-4 mt-4"
                  style={{
                    color: "#fff",
                    backgroundColor: "#0050FF",
                    boxSizing: "border-box",
                  }}
                  onClick={submit}
                  disabled={loading}
                >
                  ارسال
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Section10
        title={`لینک‌های مرتبط با طراحی سایت در ${data.nameFa}`}
        isOpened={openListOfLinks}
        onOpen={onOpenListOfLinks}
        onClose={onCloseListOfLinks}
      >
        {cn
          .filter((item) => item.show)
          .map((item) => {
            return (
              <p key={item.id}>
                <Link style={{ color: "#0050FF" }} href={`/c/${item.english}`}>
                  طراحی سایت در {item.persian}
                </Link>
              </p>
            );
          })}
      </Section10>
      <FreeConsultationModal
        isOpen={isOpenConsultationModal}
        onClose={() => setIsOpenConsultationModal(false)}
      />
      {/* BreadCrumb */}
      <div className="container">
        <div
          className="my-4 p-2 d-flex  align-items-center"
          style={{
            width: "fit-content",
          }}
        >
          {breadCrumbItems.map((item, index) => {
            return (
              <Fragment key={item.id}>
                <Link href={item.link}>{item.text}</Link>
                {breadCrumbItems.length !== index + 1 && (
                  <KeyboardArrowLeftRoundedIcon />
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
      <Footer />
    </main>
  );
}

const mapStateToProps = createStructuredSelector({
  _gmv: makeSelectVitrinGmv(),
  formsDictionary: makeSelectFormsDictionary(),
  loading: makeSelectLoading(),
});
function mapDispatchToProps(dispatch) {
  return {
    _showTotolGmv: () => dispatch(showTotolGmv()),
    _submitForm: (data, id, cb) => dispatch(createFormResponse(data, id, cb)),
    _setSnackBarMessage: (message, type) =>
      dispatch(setSnackBarMessage(message, type)),
    _getFormsDictionary: (id) => dispatch(getFormsDictionary(id)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(CityPage);
