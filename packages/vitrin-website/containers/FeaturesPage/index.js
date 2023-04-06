import { useState, useRef } from "react";
import Header from "containers/Header/index";
import LazyImage from "components/LazyImage";
import { Button } from "@material-ui/core";
import { FEATURES } from "./constants";
import Link from "next/link";
import { Collapse } from "react-collapse";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { useRouter } from "next/router";
import FreeConsultationModal from "containers/FreeConsultationModal";
import { useEffect } from "react";
import { setQueriesInLocalstorage } from "utils/helpers/setQueriesInLocalstorage";

const FeaturesPage = () => {
  const [isOpenCollapses, setIsOpenCollapses] = useState({});
  const [selectedFeature, setSelectedFeature] = useState("");
  const [isOpenConsultationModal, setIsOpenConsultationModal] = useState(false);

  const featureRef = useRef([]);
  const router = useRouter();
  useEffect(() => {
    setQueriesInLocalstorage(router.query);
  }, [router]);

  return (
    <div className="w-100 position-relative">
      <Header isTransparent />
      <div className="feature-page-banner">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="col-md-5 p-0">
            <h1 className="title">امکانات سایت‌ساز ویترین</h1>
            <p className="description">
              می‌خواهید سایت شما جذاب و حرفه‌ای باشد؟
              <br />
              فروش آنلاین شما بیشتر و راحت‌تر شود؟
              <br />
              با استفاده از امکانات متنوع ویترین می‌توانید.
            </p>

            <div className="buttons w-100 d-flex flex-column flex-md-row justify-content-between pl-md-5 align-items-center">
              <Button variant="contained" color="primary">
                <Link passHref href="/cr~templates">
                  <span>رایگان تست کنید</span>
                </Link>
              </Button>

              {/* <Button className="mt-5 mt-md-0" variant="text" color="primary">
                مشاهده به‌روز رسانی ها
              </Button> */}
            </div>
          </div>

          <LazyImage src="/images/banner-features-desktop.svg" />
        </div>
      </div>
      <div className="feature-page-content">
        <div className="container p-0 px-md-5 d-flex position-relative">
          <div className="mt-5 ">
            <div
              className="position-sticky d-none d-md-block"
              style={{ top: 86 }}
            >
              <div className="feature-menu ">
                {FEATURES.map((feature, index) => (
                  <div
                    key={feature.id}
                    className={`mt-4 p-2 w-100 menu ${
                      selectedFeature == feature.type ? "active-menu" : ""
                    }`}
                    onClick={() => {
                      window.scrollTo({
                        top: featureRef.current[index].offsetTop + 420,
                        behavior: "smooth",
                      });
                      setSelectedFeature(feature.type);
                    }}
                  >
                    {feature.title}{" "}
                  </div>
                ))}
              </div>
              <div className="content-box d-flex flex-column align-items-center justify-content-center">
                <p>دوست دارید امکانات ویترین را در عمل ببینید؟</p>
                <Link passHref href="/cr~templates">
                  <Button variant="contained" color="primary">
                    ۱۴ روز تست رایگان
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-1 feature-box mr-md-5 ">
            {FEATURES.map((feature, index) => (
              <div
                key={feature.id}
                className="container p-0"
                ref={(el) => (featureRef.current[index] = el)}
              >
                <div
                  className="px-5 d-flex align-items-center header pt-3 d-flex justify-content-md-center justify-content-between"
                  onClick={() =>
                    setIsOpenCollapses({
                      ...isOpenCollapses,
                      [index]: !isOpenCollapses[index],
                    })
                  }
                >
                  <div>
                    <LazyImage src={feature.icon} />
                    <span className="title">{feature.title}</span>
                  </div>
                  <div className="d-md-none">
                    {isOpenCollapses[index] ? (
                      <RemoveIcon className="icon" />
                    ) : (
                      <AddIcon className="icon" />
                    )}
                  </div>
                </div>
                <Collapse
                  isOpened={isOpenCollapses[index]}
                  timeout="auto"
                  unmountOnExit
                  className="d-md-none"
                >
                  <div className="content">
                    <div className="all-features">
                      {feature.options.map((option) => (
                        <div
                          key={option.id}
                          className={`d-flex flex-column feature-card p-4 ${
                            option.link ? "cursor-pointer" : ""
                          }`}
                          onClick={() => {
                            if (option.link) router.push(option.link);
                          }}
                        >
                          <div className="head">
                            <LazyImage
                              width={40}
                              height={40}
                              src={option.icon}
                            />
                            <span className="mr-4">{option.title}</span>
                          </div>
                          <p>{option.description}</p>
                          {/* for link */}
                          {option.name == "no-code" ? (
                            <Link passHref href={`/features/${option.name}`}>
                              <div className="link w-100 d-flex justify-content-end align-items-center">
                                <span>{option.link_text}</span>
                                <LazyImage
                                  width={32}
                                  height={32}
                                  src="/images/ArrowLeftFilled.svg"
                                />
                              </div>
                            </Link>
                          ) : null}
                        </div>
                      ))}
                    </div>
                    <div className="w-100 d-flex justify-content-center">
                      <Button
                        className="text-center"
                        variant="contained"
                        color="primary"
                      >
                        <Link passHref href="/cr~templates">
                          <span>رایگان تست کنید</span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Collapse>
                <div className="content d-none d-md-block">
                  <div className="all-features">
                    {feature.options.map((option) => (
                      <div
                        key={option.id}
                        className={`d-flex flex-column feature-card p-4 ${
                          option.link ? "cursor-pointer" : ""
                        }`}
                        onClick={() => {
                          if (option.link) router.push(option.link);
                        }}
                      >
                        <div className="head">
                          <LazyImage width={40} height={40} src={option.icon} />
                          <span className="mr-4">{option.title}</span>
                        </div>
                        <p>{option.description}</p>
                        {/* for link */}
                        {option?.name == "no-code" ? (
                          <Link passHref href={`/features/${option.name}`}>
                            <div className="link w-100 d-flex justify-content-end align-items-center">
                              <span>{option.link_text}</span>
                              <LazyImage
                                width={32}
                                height={32}
                                src="/images/ArrowLeftFilled.svg"
                              />
                            </div>
                          </Link>
                        ) : null}
                      </div>
                    ))}
                  </div>
                  <Link passHref href="/cr~templates">
                    <div className="w-100 d-flex justify-content-center">
                      <Button
                        className="text-center"
                        variant="contained"
                        color="primary"
                      >
                        رایگان تست کنید
                      </Button>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="feature-page-footer d-flex flex-column align-items-center ">
        <p>وبسایت یا فروشگاه اینترنتی کسب‌وکار خود را با ویترین بسازید.</p>
        <div className="w-100 d-flex justify-content-center buttons p-4">
          <Button className="text-center primary-btn">
            <Link passHref href="/cr~templates">
              رایگان شروع کنید
            </Link>
          </Button>
          <Button
            className="text-center secondary-btn"
            onClick={() => setIsOpenConsultationModal(true)}
          >
            درخواست مشاوره
          </Button>
        </div>
        <FreeConsultationModal
          isOpen={isOpenConsultationModal}
          onClose={() => setIsOpenConsultationModal(false)}
        />
      </div>
    </div>
  );
};

export default FeaturesPage;
