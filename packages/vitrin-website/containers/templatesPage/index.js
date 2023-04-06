import Image from "next/image";
import { categoris, FAQS, GUILD_CATEGORIES, templates } from "./constants";
import { useEffect, useRef, useState, memo } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import Footer from "components/Footer";
import Header from "containers/Header";
import TemplateCard from "./components/TemplateCard";
import FreeConsultationModal from "containers/FreeConsultationModal";
import LazyHydrate from "react-lazy-hydration";
import { Collapse } from "react-collapse";
import { useRouter } from "next/router";
import { makeSelectIsAuthenticated } from "stores/user/selector";
import { setQueriesInLocalstorage } from "utils/helpers/setQueriesInLocalstorage";

const TemplatePapes = ({ isAuthenticated }) => {
  const [collapses, setCollapses] = useState({});
  const [isOpenConsultationModal, setIsOpenConsultationModal] = useState(false);
  const [categoryList, setCategoryList] = useState(templates);
  const [selectedCategory, setSelectedCategory] = useState("پر طرفدار");
  const templatesRef = useRef();
  const itemsRef = useRef(null);
  let router = useRouter();

  useEffect(() => {
    setQueriesInLocalstorage(router.query);
  }, []);
  useEffect(() => {
    if (selectedCategory) {
      reorderListByProp("tags", selectedCategory);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (router.query?.step == 0) {
      onSelectTemplate();
    }
  }, []);

  function onSelectTemplate(domain) {
    router.push(
      `${isAuthenticated ? "/cr~main-info" : "/cr~signup-phone"}?template=${
        domain || "shoppingtemp"
      }&business_type=store`
    );
  }

  let openFreeConsultationModal = () => setIsOpenConsultationModal(true);
  let closeFreeConsultationModal = () => setIsOpenConsultationModal(false);

  function reorderListByProp(propName, propValue) {
    const tempTemplates = [...templates];
    let place = 0;
    templates.forEach((item, index) => {
      if (item[propName].includes(propValue)) {
        const b = tempTemplates.splice(index, 1);
        tempTemplates.splice(place, 0, ...b);
        place++;
      }
    });
    setCategoryList([...tempTemplates]);
  }

  useEffect(() => {
    let isDown = false;
    let startX;
    let scrollLeft;
    if (itemsRef.current) {
      const slider = itemsRef.current;
      slider.addEventListener(
        "mousedown",
        (e) => {
          isDown = true;
          slider.classList.add("active");
          startX = e.pageX - slider.offsetLeft;
          scrollLeft = slider.scrollLeft;
        },
        false
      );
      slider.addEventListener("mouseleave", () => {
        isDown = false;
        slider.classList.remove("active");
      });
      slider.addEventListener("mouseup", () => {
        isDown = false;
        slider.classList.remove("active");
      });
      slider.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = x - startX; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
      });
    }
  }, []);

  return (
    <div>
      {/* Section One */}
      <Header isTransparent />
      {/* Section Two */}
      <div className="template-page-banner">
        {/* (Desktop) */}
        <div className="container d-none d-md-flex justify-content-center">
          <div className="row justify-content-center">
            <div className="col-md-8 col-xl-7">
              <h1
                className="text-center"
                style={{
                  fontSize: 34,
                  fontWeight: 400,
                  lineHeight: "42px",
                }}
              >
                با یک قالب سایت زیبا، رایگان شروع کنید
              </h1>
              <div className="template-page-banner-description d-flex justify-content-center">
                <h2
                  className="text-center mt-3 pt-2"
                  style={{
                    fontSize: 24,
                    lineHeight: "32px",
                    fontWeight: 400,
                  }}
                >
                  هر قالب‌سایت کاملا واکنش‌گرا و قابل شخصی‌سازی است. سایت
                  اختصاصی خود را به کمک قالب‌های حرفه‌ای ویترین بسازید.
                </h2>
              </div>
              <div
                className="d-flex justify-content-center justify-content-md-center"
                style={{
                  marginBottom: "90px",
                  padding: 0,
                }}
              >
                <div style={{ flexBasis: "40%" }}>
                  <button
                    className="view-tmp-btn d-flex align-items-center w-100 justify-content-center"
                    onClick={() => onSelectTemplate()}
                  >
                    <span className="ml-3">با قالب پیش‌فرض شروع کنید</span>
                    <Image
                      alt=""
                      unoptimized
                      priority
                      width={18}
                      height={18}
                      src="/images/templates-desktop.svg"
                    />
                  </button>
                </div>
                <div style={{ flexBasis: "45%" }}>
                  <button
                    className="create-tmp-btn d-flex align-items-center w-100 justify-content-center mr-4"
                    onClick={() => templatesRef.current.scrollIntoView()}
                  >
                    <span className="ml-3">مشاهده قالب‌ها</span>
                    <Image
                      alt=""
                      unoptimized
                      priority
                      width={16}
                      height={16}
                      src="/images/arrow-down-desktop.svg"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* (Mobile) */}
        <div className="container d-flex d-md-none justify-content-center">
          <div style={{ width: "100%" }} className="mt-5">
            <h1
              style={{
                fontSize: 20,
                fontWeight: 400,
                lineHeight: "32px",
              }}
            >
              با یک قالب سایت زیبا، رایگان شروع کنید
            </h1>
            <h2
              className="pt-2"
              style={{
                fontSize: 14,
                lineHeight: "20px",
                fontWeight: 400,
                marginTop: 12,
              }}
            >
              هر قالب‌سایت کاملا واکنش‌گرا و قابل شخصی‌سازی است. سایت اختصاصی
              خود را به کمک قالب‌های حرفه‌ای ویترین بسازید.
            </h2>
            <div
              className="d-flex flex-column justify-content-center justify-content-md-between"
              style={{
                padding: "0 10px",
                marginTop: "48px",
              }}
            >
              <div>
                <button
                  className="view-tmp-btn w-100 d-flex align-items-center justify-content-center"
                  onClick={() => onSelectTemplate()}
                >
                  <span className="ml-3">با قالب پیش‌فرض شروع کنید</span>
                  <Image
                    alt=""
                    unoptimized
                    priority
                    width={15}
                    height={15}
                    src="/images/template.svg"
                  />
                </button>
              </div>
              <div style={{ marginTop: "20px" }}>
                <button
                  className="create-tmp-btn w-100 d-flex align-items-center justify-content-center"
                  onClick={() => templatesRef.current.scrollIntoView()}
                >
                  <span className="ml-3">مشاهده قالب‌ها</span>
                  <Image
                    alt=""
                    unoptimized
                    priority
                    width={14}
                    height={14}
                    src="/images/arrow-down-blue.svg"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Section Three */}
      <div className="template-page-guild">
        {/* (Desktop) */}
        <div className="container d-none d-md-block">
          <div className="template-page-guild-container row justify-content-around mx-0">
            <h2 className="col-12">با محبوب‌ترین قالب صنف خود شروع کنید:</h2>
            <div className="col-12 col-lg-9 col-xl-7">
              <div className="row">
                {GUILD_CATEGORIES.map((item) => {
                  if (item.link) {
                    return (
                      <div
                        key={item.id}
                        className="col-md-3 px-0 mb-5"
                        style={{ cursor: "pointer" }}
                        onClick={() => onSelectTemplate(item.domain)}
                      >
                        <div
                          className="template-page-guild-item"
                          style={{ maxWidth: "90%" }}
                        >
                          <Image
                            alt=""
                            src={item.image}
                            width="214px"
                            height="114px"
                            priority
                            unoptimized
                          />
                          <h3 className="pb-4 text-center">{item.title}</h3>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div key={item.id} className="col-md-3 px-0 mb-5">
                      <div
                        className="template-page-guild-item"
                        style={{ maxWidth: "90%", cursor: "pointer" }}
                        onClick={() => templatesRef.current.scrollIntoView()}
                      >
                        <Image
                          alt=""
                          src={item.image}
                          width="214px"
                          height="114px"
                          priority
                          unoptimized
                        />
                        <h3 className="pb-4 text-center">{item.title}</h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {/* (Mobile) */}
        <div className="container-fluid d-md-none">
          <div className="template-page-guild-container row justify-content-around justify-content-sm-center mx-0">
            <h2 className="col-12">با محبوب‌ترین قالب صنف خود شروع کنید:</h2>
            {GUILD_CATEGORIES.map((item) => {
              if (item.link) {
                return (
                  <div
                    key={item.id}
                    className="col-5 col-md-3 px-0 mb-4 d-flex justify-content-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => onSelectTemplate(item.domain)}
                  >
                    <div
                      className="template-page-guild-item"
                      style={{ maxWidth: "214px" }}
                    >
                      <Image
                        alt=""
                        src={item.image}
                        width="214px"
                        height="114px"
                        priority
                        unoptimized
                      />
                      <h3 className="pb-2 pt-1 text-center">{item.title}</h3>
                    </div>
                  </div>
                );
              }
              return (
                <div
                  key={item.id}
                  className="col-5 col-md-3 px-0 mb-4 d-flex justify-content-center"
                >
                  <div
                    className="template-page-guild-item"
                    style={{ maxWidth: "214px", cursor: "pointer" }}
                    onClick={() => templatesRef.current.scrollIntoView()}
                  >
                    <Image
                      alt=""
                      src={item.image}
                      width="214px"
                      height="114px"
                      priority
                      unoptimized
                    />
                    <h3 className="pb-2 pt-1 text-center">{item.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Section Four */}
      <div ref={templatesRef} className="template-page-ref" />
      {/* Section Five */}
      <div className="template-page-categories mx-md-0">
        <h2 className="mb-3">دسته‌بندی قالب‌ها</h2>
        <div className="categories scrollbar-hidden" ref={itemsRef}>
          {categoris.map((category, index) => (
            <div
              className={`category-item  d-flex align-items-center justify-content-center ${
                index != 0 ? "mr-3" : "m-0"
              }`}
              style={{
                backgroundColor:
                  category?.title == selectedCategory &&
                  "rgba(158, 158, 158, 1)",
              }}
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.title);
                reorderListByProp("tags", category.title);
              }}
            >
              {category.image && (
                <div style={{ height: 20, width: 20, position: "relative" }}>
                  <Image alt="" height={20} width={20} src={category.image} />
                </div>
              )}

              <span className="mr-2"> {category.title}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Section Six */}
      <div className="template-page-cards">
        <div>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-9 col-md-10 col-lg-12 col-xl-9">
                <h2 className="p">
                  همیشه می‌توانید ظاهر و محتوای هر قالب سایت را تغییر دهید.
                </h2>
                <div className="row  mt-3">
                  {categoryList?.map((template) => (
                    <TemplateCard
                      key={template.id}
                      id={template.id}
                      image={template.image}
                      title={template.title}
                      description={template.description}
                      domain={template.domain}
                      tags={template.tags}
                      onSelect={onSelectTemplate}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Section Seven */}
      <div className="template-page-find-template">
        <div>
          <div className="row justify-content-center">
            <div className="col-12 col-sm-8 col-md-11 col-lg-9 col-xl-8">
              <div className="row align-items-center">
                <h2 className="col-12 col-md-5 col-lg-5 col-xl-4 text-xl-left">
                  قالب مورد نظر خود را پیدا نکردید؟
                </h2>
                <div className="col-12 col-md-7 col-lg-7">
                  <div className="btns row justify-content-between mt-2 mt-md-0">
                    <div className="col-12 col-md-6 px-md-2 mb-3 mb-md-0">
                      <button
                        className="p-2 p-md-3"
                        onClick={openFreeConsultationModal}
                      >
                        درخواست طراحی اختصاصی
                      </button>
                    </div>
                    <div className="col-12 col-md-6 px-md-2">
                      <button className="p-2 p-md-3" onClick={onSelectTemplate}>
                        ادامه با قالب پیش‌فرض
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* FAQ (Mobile) */}
      <LazyHydrate whenVisible>
        <div
          className="container d-md-none"
          style={{
            paddingTop: 32,
          }}
        >
          <div
            style={{
              backgroundColor: "#F6F6F7",
              borderRadius: 16,
              padding: "24px 16px",
            }}
          >
            <p
              className="font-weight-600 pb-4"
              style={{
                textAlign: "center",
                fontSize: 16,
                lineHeight: "24px",
              }}
            >
              پرسش‌های متداول
            </p>
            {FAQS.map((item, index) => (
              <div
                key={item.question}
                style={{
                  backgroundColor: "#DFE9FF",
                  borderRadius: 16,
                }}
              >
                <div
                  className="d-flex justify-content-between align-items-center p-4"
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 16,
                    marginTop: 24,
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    setCollapses({ ...collapses, [index]: !collapses[index] })
                  }
                >
                  <div className={`d-flex align-items-center p-0`}>
                    <div style={{ minWidth: 24 }}>
                      <Image
                        unoptimized
                        height={24}
                        width={24}
                        src="/images/question-icon-blue.svg"
                        alt={item.question}
                        priority
                      />
                    </div>

                    <span
                      style={{
                        fontSize: 13,
                        lineHeight: "24px",
                        color: "#202223",
                        margin: "0 10px",
                      }}
                    >
                      {item.question}
                    </span>
                  </div>
                  <div
                    style={{
                      cursor: "pointer",
                      transform: collapses[index]
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.5s",
                      marginLeft: 0,
                    }}
                  >
                    <div style={{ width: 12, height: 12 }}>
                      <Image
                        unoptimized
                        layout="fill"
                        src="/images/arrow-bottom-icon-blue.svg"
                        alt="پرسش های متداول"
                        priority
                      />
                    </div>
                  </div>
                </div>
                <Collapse isOpened={collapses[index]}>
                  <p
                    style={{
                      fontSize: 12,
                      lineHeight: "20px",
                      padding: 20,
                      color: "#202223",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: item.response,
                    }}
                  ></p>
                </Collapse>
              </div>
            ))}
          </div>
        </div>
      </LazyHydrate>
      {/* FAQ (Desktop) */}
      <div
        className="container d-none d-md-block"
        style={{
          paddingTop: 40,
        }}
      >
        <div
          style={{
            backgroundColor: "#F6F6F7",
            borderRadius: 16,
            padding: "40px 64px",
          }}
        >
          <p
            className="font-weight-600 pb-4"
            style={{
              textAlign: "center",
              fontSize: 24,
              lineHeight: "24px",
            }}
          >
            پرسش‌های متداول
          </p>
          {FAQS.map((item, index) => (
            <div
              key={item.question}
              style={{
                backgroundColor: "#DFE9FF",
                borderRadius: 16,
              }}
            >
              <div
                className="d-flex justify-content-between align-items-center p-4"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 16,
                  marginTop: 24,
                  cursor: "pointer",
                }}
                onClick={() =>
                  setCollapses({ ...collapses, [index]: !collapses[index] })
                }
              >
                <div className={`d-flex align-items-center pr-2`}>
                  <div style={{ minWidth: 24 }}>
                    <Image
                      unoptimized
                      height={24}
                      width={24}
                      src="/images/question-icon-blue.svg"
                      alt={item.question}
                      priority
                    />
                  </div>

                  <span
                    style={{
                      fontSize: 14,
                      lineHeight: "24px",
                      color: "#202223",
                      margin: "0 16px 0 0",
                    }}
                  >
                    {item.question}
                  </span>
                </div>
                <div
                  style={{
                    cursor: "pointer",
                    transform: collapses[index]
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.5s",
                    marginLeft: 8,
                  }}
                >
                  <div style={{ width: 12, height: 12 }}>
                    <Image
                      unoptimized
                      priority
                      layout="fill"
                      src="/images/arrow-bottom-icon-blue.svg"
                      alt="پرسش های متداول"
                    />
                  </div>
                </div>
              </div>
              <Collapse isOpened={collapses[index]}>
                <p
                  style={{
                    fontSize: 12,
                    lineHeight: "20px",
                    padding: 20,
                    color: "#202223",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: item.response,
                  }}
                ></p>
              </Collapse>
            </div>
          ))}
        </div>
      </div>
      <FreeConsultationModal
        isOpen={isOpenConsultationModal}
        onClose={closeFreeConsultationModal}
      />
      <Footer />
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

export default compose(withConnect, memo)(TemplatePapes);
