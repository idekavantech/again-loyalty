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
import { bn } from "utils/constants/PAGES";

function BusinessPage({
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

  const breadCrumbItems = [data.v2, data.isShopping ? data.xsb1 : data.xb1];

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
    if (!value) return;
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
          refToExamples={examplesRef}
          refToPossibilities={possibilitiesRef}
          formattedGmv={formattedGmv}
          name={data.nameFa}
          image={data.image1}
          typeOfLanding={data.typeOfLanding}
          isShopping={data.isShopping}
        />
      </div>
      <Section2
        typeOfLanding={data.typeOfLanding}
        isShopping={data.isShopping}
        name={data.nameFa}
        image={data.image2}
        nameOfBusiness={data.name}
        xsb1={getVariable(data.xsb1)}
        v6={getVariable(data.v6)}
        v3={getVariable(data.v3)}
        v4={getVariable(data.v4)}
        v9={getVariable(data.v9)}
        v31={getVariable(data.v31)}
        v33={getVariable(data.v33)}
        v7={getVariable(data.v7)}
        site={getVariable(data.site)}
        shop1={getVariable(data.shop1)}
        shop2={getVariable(data.shop2)}
        main={getVariable(data.main)}
        type={getVariable(data.type)}
        xb1={getVariable(data.xb1)}
        xb2={getVariable(data.xb2)}
        xb3={getVariable(data.xb3)}
      />
      <Section3
        typeOfLanding={data.typeOfLanding}
        isShopping={data.isShopping}
        refOfPossibilitiesMobile={possibilitiesRefMobile}
        openCollapse={openCollapse}
        onToggleCollapse={onToggleCollapse}
        xsb2={getVariable(data.xsb2)}
        v6={getVariable(data.v6)}
        shop2={getVariable(data.shop2)}
        name={data.nameFa}
        site={getVariable(data.site)}
      />

      <Section4
        typeOfLanding={data.typeOfLanding}
        isShopping={data.isShopping}
        name={data.nameFa}
        v35={getVariable(data.v35)}
        v4={getVariable(data.v4)}
        v10={getVariable(data.v10)}
        v14={getVariable(data.v14)}
        v11Text={data.v11.text}
        xsb5={getVariable(data.xsb5)}
        xsb7={getVariable(data.xsb7)}
        type={getVariable(data.type)}
        xb2={getVariable(data.xb2)}
        xb7={getVariable(data.xb7)}
      />
      <Section5 />
      <Section6
        typeOfLanding={data.typeOfLanding}
        isShopping={data.isShopping}
        name={data.nameFa}
        shop2={getVariable(data.shop2)}
        shop1={getVariable(data.shop1)}
        site={getVariable(data.site)}
        xsb4={getVariable(data.xsb4)}
        xsb2Text={data.xsb2?.text}
        xsb1Text={data.xsb1?.text}
        xsb5={getVariable(data.xsb5)}
        v36={getVariable(data.v36)}
        v37={getVariable(data.v37)}
        xb3={getVariable(data.xb3)}
        xb2={getVariable(data.xb2)}
        xb2Text={data.xb2?.text}
        v1={getVariable(data.v1)}
        v10={getVariable(data.v10)}
        v17={getVariable(data.v17)}
      />

      <Section7
        typeOfLanding={data.typeOfLanding}
        isShopping={data.isShopping}
        name={data.nameFa}
        refOfSampleSites={examplesRef}
        v22={getVariable(data.v22)}
        xsb4={getVariable(data.xsb4)}
        xsb14={getVariable(data.xsb14)}
        v7={getVariable(data.v7)}
        shop2={getVariable(data.shop2)}
        xb14={getVariable(data.xb14)}
      />

      <Section8
        typeOfLanding={data.typeOfLanding}
        isShopping={data.isShopping}
        name={data.nameFa}
        main={getVariable(data.main)}
        shop1={getVariable(data.shop1)}
        xsb11={getVariable(data.xsb11)}
        xsb3={getVariable(data.xsb3)}
        xsb13={getVariable(data.xsb13)}
        v2={getVariable(data.v2)}
        v30={getVariable(data.v30)}
        site={getVariable(data.site)}
        v9={getVariable(data.v9)}
        v6={getVariable(data.v6)}
        v4={getVariable(data.v4)}
        xb11={getVariable(data.xb11)}
        xb11Text={data.xb11?.text}
        xb2={getVariable(data.xb2)}
        v37={getVariable(data.v37)}
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
                  alt={
                    data.isShopping
                      ? `پشتیبانی ویترین همیشه آماده مشاوره در خصوص ${data.xsb4} است.`
                      : `دپارتمان پشتیبانی سایت ویترین آماده ارائه مشاوره به برندهای ${data.nameFa} مختلف در سطح ایران است.`
                  }
                />
              </div>
              <div className="w-100 flex-1 d-flex flex-column justify-content-between m-0 mr-md-4">
                <h2 className="font-weight-600">به پشتیبانی نیاز دارید؟</h2>
                {data.isShopping ? (
                  <p className="mt-4">
                    تیم ویترین آماده است در همه جای ایران انواع خدمات طراحی{" "}
                    {getVariable(data.xsb2)} و مشاوره را در اختیار شما قرار دهد.
                    از طریق پر کردن فرم مشاوره زیر یا تماس با شماره تلفن
                    ۰۲۱۹۱۰۷۰۷۵۱ پاسخگوی شما هستیم.
                  </p>
                ) : (
                  <p className="mt-4">
                    اگر برای {getVariable(data.xb2)} خودتان نیاز به مشاوره
                    دارید، لطفا با تیم پشتیبانی ویترین تماس بگیرید تا از انواع
                    خدمات {getVariable(data.v4)} ویترین اطلاع پیدا کنید. برای
                    این کار می‌توانید فرم مشاوره زیر را پر کنید یا با شماره تلفن
                    ۰۲۱۹۱۰۷۰۷۵۱ تماس بگیرید.
                  </p>
                )}

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
                  alt={
                    data.isShopping
                      ? `پشتیبانی ویترین همیشه آماده مشاوره در خصوص ${data.xsb4} است.`
                      : `دپارتمان پشتیبانی سایت ویترین آماده ارائه مشاوره به برندهای ${data.nameFa} مختلف در سطح ایران است.`
                  }
                />
              </div>
              <div className="w-100 flex-1 d-flex flex-column justify-content-between m-0 mr-md-4">
                <h2 className="font-weight-600">به پشتیبانی نیاز دارید؟</h2>
                {data.isShopping ? (
                  <p className="mt-4">
                    تیم ویترین آماده است در همه جای ایران انواع خدمات طراحی{" "}
                    {getVariable(data.xsb2)} و مشاوره را در اختیار شما قرار دهد.
                    از طریق پر کردن فرم مشاوره زیر یا تماس با شماره تلفن
                    ۰۲۱۹۱۰۷۰۷۵۱ پاسخگوی شما هستیم.
                  </p>
                ) : (
                  <p className="mt-4">
                    اگر برای {getVariable(data.xb2)} خودتان نیاز به مشاوره
                    دارید، لطفا با تیم پشتیبانی ویترین تماس بگیرید تا از انواع
                    خدمات {getVariable(data.v4)} ویترین اطلاع پیدا کنید. برای
                    این کار می‌توانید فرم مشاوره زیر را پر کنید یا با شماره تلفن
                    ۰۲۱۹۱۰۷۰۷۵۱ تماس بگیرید.
                  </p>
                )}
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
        title={`لینک‌های مرتبط با طراحی سایت ${data.nameFa}`}
        isOpened={openListOfLinks}
        onOpen={onOpenListOfLinks}
        onClose={onCloseListOfLinks}
      >
        {bn
          .filter((item) => item.show)
          .map((item) => {
            return (
              <p key={item.id}>
                <Link style={{ color: "#0050FF" }} href={`/b/${item.english}`}>
                  طراحی سایت {item.persian}
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
export default compose(withConnect, memo)(BusinessPage);
