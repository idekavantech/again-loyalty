/**
 *
 * AdminSettings
 *
 */

import React, { memo, useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Head from "next/head";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import {
  makeSelectBusiness,
  makeSelectBusinessRedirectsMap,
  makeSelectBusinessThemeConfig,
} from "@saas/stores/business/selector";
import MainInfoSection from "./components/MainInfoSection";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import {
  suggestBusinessEdit,
  updateBusiness,
} from "@saas/stores/business/actions";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import ContactYouSection from "./components/ContactYouSection";
import SocialNetworksSection from "./components/SocialNetworksSection";
import ScheduleSection from "./components/ScheduleSection";
import { removeFile, uploadFile } from "@saas/stores/global/actions";
import Licence from "./components/Licence";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { makeSelectPlugin } from "@saas/stores/plugins/selector";
import { PLUGIN_TRIAL_STATUS } from "@saas/stores/plugins/constants";
import { BASE_PLUGIN, SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import { ONBOARDED_MAIN_INFO } from "store/constants";
import SuccessMessageModal from "components/Modals/SuccessMessageModal";
import { makeSelectJourneyState } from "store/selectors";
import { getJourneyState, updateJourneyState } from "store/actions";
import Paper from "@material-ui/core/Paper";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import useTheme from "@material-ui/core/styles/useTheme";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

const Tour = dynamic(() => import("reactour"), { ssr: false });

import dynamic from "next/dynamic";
import SaveAndDiscardButtons from "@saas/components/SaveAndDiscardButtons";
import { useRouter } from "next/router";
import { DARAMAD_WEBAPP_CONSTANT, VITRIN_WEBAPP_CONSTANT } from "@saas/utils/constants";
import { night } from "@saas/utils/colors";
import Switch from "@saas/components/Switch";
import Input from "@saas/components/Input";
import { ADMIN_HELP_VIDEOS } from "../AdminBreadCrumb/constants";

export function AdminSettings({
  loading,
  _updateBusiness,
  business,
  _suggestEdit,
  _uploadFile,
  _removeFile,
  redirects,
  themeConfig,
  basePlugin,
  _getJourneyState,
  journeyData,
  _updateJourneyState,
  shoppingPluginData,
}) {
  const [slogan, setSlogan] = useState(business?.slogan);
  const [workingHours, setWorkingHours] = useState(business?.working_hours);
  const [title, setTitle] = useState(business?.revised_title);
  const [phone, setPhone] = useState(business?.phone_zero_starts);
  const [address, setAddress] = useState(business?.address);
  const [latitude, setLatitude] = useState(business?.latitude);
  const [longitude, setLongitude] = useState(business?.longitude);
  const [aboutUs, setAboutUs] = useState(business?.about_us);
  const [instagram, setInstagram] = useState(business?.instagram_url || "");
  const [telegram, setTelegram] = useState(business?.telegram_url || "");
  const [linkedin, setLinkedin] = useState(business?.linkedin_url || "");
  const [whatsapp, setWhatsapp] = useState(business?.whatsapp_url || "");
  const [twitter, setTwitter] = useState(business?.twitter_url || "");
  const [facebook, setFacebook] = useState(business?.facebook_url || "");
  const [aparat, setAparat] = useState(business?.aparat_url || "");
  const [youtube, setYoutube] = useState(business?.youtube_url || "");
  const [isOpenOnboarding, setIsOpenOnboarding] = useState(false);
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);
  const [showLicence, setShowLicence] = useState(false);
  const [showWorkingTime, setShowWorkingTime] = useState(false);
  const [textError, setTextError] = useState("");
  const dashboardState = journeyData?.vitrin_journey_state?.dashboard_state;
  const workingHourRef = useRef(null);
  const router = useRouter();
  const [icon, setIcon] = useState({
    img: business?.icon_image_url || "",
    url: "",
  });

  const isDaramad =
    process.env.NEXT_PUBLIC_APP_NAME === DARAMAD_WEBAPP_CONSTANT;
    
  const isVitrin =
    process.env.NEXT_PUBLIC_APP_NAME === VITRIN_WEBAPP_CONSTANT;

  const [favIcon, setFavIcon] = useState({
    img:
      business?.fav_icon_image_url ===
      "https://hs3-cdn-saas.behtarino.com/media/business_images/corrupted.jpg"
        ? business?.icon_image_url
        : business?.fav_icon_image_url || "",
    url: "",
  });
  const [cover, setCover] = useState({
    img: business?.cover_image_url || "",
    url: "",
  });
  const [morePhoneNumbers, setMorePhoneNumbers] = useState(
    business?.more_phone_numbers ? business?.more_phone_numbers.split("\n") : []
  );

  const [enamad, setEnamad] = useState(themeConfig?.enamad_config || "");
  const [samandehi, setSamandehi] = useState(
    themeConfig?.samandehi_config || ""
  );
  const [virtualBusinessAssociation, setVirtualBusinessAssociation] = useState(
    themeConfig?.virtual_business_association_config || ""
  );

  const [socialErrors, setSocialErrors] = useState({});
  const isTrial = basePlugin?.status === PLUGIN_TRIAL_STATUS;
  const isShopping = shoppingPluginData?.isActive;
  const socialNetworkRef = useRef();

  ///////// REDIRECTS MAP /////////
  const [_redirectsMap, _setRedirectsMap] = useState([
    { origin: "", destination: "", type: 302 },
  ]);
  const [showRedirectsMap, setShowRedirectsMap] = useState(false);
  const [inputError, setInputError] = useState({ value: "", id: null });
  const theme = useTheme();
  const addNewRow = () => {
    _setRedirectsMap([
      ..._redirectsMap,
      { origin: "", destination: "", type: 302 },
    ]);
  };
  const removeRow = (index) => {
    const __redirectsMap = [..._redirectsMap];
    __redirectsMap.splice(index, 1);
    _setRedirectsMap(
      __redirectsMap.length
        ? __redirectsMap
        : [{ origin: "", destination: "", type: 302 }]
    );
  };
  ///////// REDIRECTS MAP /////////

  useEffect(() => {
    setTimeout(() => {
      _getJourneyState();
    }, 0);
  }, []);

  useEffect(() => {
    if (isShopping) {
      setShowLicence(true);
      setShowWorkingTime(true);
    }
  }, [isShopping]);

  useEffect(() => {
    if (redirects && redirects.length) {
      _setRedirectsMap(redirects);
    }
  }, [redirects]);

  const removeStartingSlashes = (string) => {
    let numberOfFirstSlashes;
    string.split("").every((char, index) => {
      if (char !== "/") {
        numberOfFirstSlashes = !!index ? index : 0;
        return false;
      }
      return true;
    });
    return string.slice(numberOfFirstSlashes);
  };

  const isValidUrl = (string) => {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    if (url.protocol === "https:" || url.protocol === "http:") return url;

    url.pathname = removeStartingSlashes(url.pathname);
    url.protocol = "https:";
    return url;
  };

  const normalizeLink = (link) => {
    if (!link) return link;
    if (isValidUrl(link)) {
      if (isValidUrl(link).protocol === "https:") return isValidUrl(link);
      else return link.replace("http://", "https://");
    }
    return "https://" + removeStartingSlashes(link);
  };

  const submit = () => {
    if (
      !isDaramad &&
      isShopping &&
      showWorkingTime &&
      !Object.values(workingHours).find((hour) => hour.length > 0)
    ) {
      setTextError("تکمیل ساعت کاری برای فعال‌سازی سفارش‌گیری سایت ضروری است.");
      workingHourRef.current.scrollIntoView();
    } else {
      const editedBusiness = {
        revised_title: title,
        instagram_url: normalizeLink(instagram),
        telegram_url: normalizeLink(telegram),
        linkedin_url: normalizeLink(linkedin),
        whatsapp_url: normalizeLink(whatsapp),
        aparat_url: normalizeLink(aparat),
        youtube_url: normalizeLink(youtube),
        twitter_url: normalizeLink(twitter),
        facebook_url: normalizeLink(facebook),
        phone,
        latitude,
        longitude,
        slogan,
        address,
        working_hours: workingHours,
        about_us: aboutUs,
        more_phone_numbers: morePhoneNumbers?.map((mpn) => `${mpn}\n`).join(""),
        theme_config: {
          ...themeConfig,
          enamad_config: enamad,
          samandehi_config: samandehi,
          virtual_business_association_config: virtualBusinessAssociation,
        },
        redirects_map: _redirectsMap?.map((rm) => {
          const _rm = { ...rm };
          if (
            _rm.origin.split("").length > 1 &&
            _rm.origin.split("")[_rm.origin.length - 1] === "/"
          ) {
            const _origin = _rm.origin.split("");
            _origin.splice(_rm.origin.length - 1, 1);
            return { ..._rm, origin: _origin.join("") };
          }
          return _rm;
        }),
      };
      if (icon.url) editedBusiness.icon_image = icon.url;
      if (favIcon.url) editedBusiness.fav_icon_image = favIcon.url;
      if (cover.url) editedBusiness.cover_image = cover.url;
      if (Object.values(socialErrors).every((error) => !error)) {
        _updateBusiness(
          editedBusiness,
          "تنظیمات اصلی با موفقیت ذخیره شد.",
          "ذخیره تغییرات تنظیمات اصلی ناموفق بود!",
          () => {
            if (!dashboardState?.address_and_phone_step && isVitrin) {
              _updateJourneyState(
                {
                  dashboard_state: {
                    ...dashboardState,
                    address_and_phone_step: 1,
                  },
                },
                () => setIsOpenSuccessModal(true)
              );
            }
          }
        );
      } else {
        socialNetworkRef.current.scrollIntoView();
      }
      if (title !== business.revised_title) _suggestEdit({ title });
    }
  };

  const onboardingSteps = [
    {
      selector: '[data-tour="favIcon"]',
      content: () => (
        <div
          className="d-flex flex-column align-items-center"
          style={{ fontSize: 15 }}
          onClick={() => setIsOpenOnboarding(false)}
        >
          <h1>علائم راهنمای پنل</h1>
          <p className="mt-3">
            با کلیک بر علامت سوال در کنار تیتر آیتم‌های پیشرفته‌ یا جدید ویترین،
            توضیحات راهنما دریافت کنید.
          </p>
          <button
            className="mt-3"
            style={{ fontWeight: 500, color: "#0050ff" }}
          >
            خوبه
          </button>
        </div>
      ),
    },
    {
      selector: '[data-tour="favIcon"]',
      content: () => (
        <div
          className="d-flex flex-column align-items-center"
          style={{ fontSize: 15 }}
        >
          <h1>علائم راهنمای پنل</h1>
          <p className="mt-3">
            با کلیک بر علامت سوال در کنار تیتر آیتم‌های پیشرفته‌ یا جدید ویترین،
            توضیحات راهنما دریافت کنید.
          </p>
          <button
            className="mt-3"
            style={{ fontWeight: 500, color: "#0050ff" }}
          >
            خوبه
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (isTrial && localStorage.getItem(ONBOARDED_MAIN_INFO) !== "true") {
      setIsOpenOnboarding(true);
      localStorage.setItem(ONBOARDED_MAIN_INFO, true);
    }
  }, []);

  const validationSocialNetwork = (socialNetworkink, social, value) => {
    const normalizedURL = value
      .replace("www.", "")
      .replace(/(^\w+:|^)\/\//, "");
    if (normalizedURL && !normalizedURL.startsWith(socialNetworkink)) {
      setSocialErrors({
        ...socialErrors,
        [social]: `آدرس با عبارت /${socialNetworkink} شروع شود . بطور مثال : ${socialNetworkink}/${
          social == "whatsapp" ? "989121234567" : "vitrin"
        }`,
      });
    } else {
      setSocialErrors({
        ...socialErrors,
        [social]: "",
      });
    }
  };

  useEffect(() => {
    if (textError) {
      setTextError("");
    }
  }, [workingHours]);

  return (
    <div className="container pb-5 pb-md-0">
      <Head>
        <title>تنظیمات اصلی</title>
      </Head>

      <AdminBreadCrumb
        submitButtonText="ذخیره تغییرات"
        submitAction={submit}
        isLoading={loading}
        helpVideo={{
          url: ADMIN_HELP_VIDEOS.mainInfo.url,
        }}
      />

      <MainInfoSection
        changeSlogan={setSlogan}
        changeTitle={setTitle}
        title={title}
        slogan={slogan}
        changeUploadFile={_uploadFile}
        removingFile={_removeFile}
        iconImage={business.icon_image_url}
        isLoading={loading}
        aboutUs={aboutUs}
        changeAboutUs={setAboutUs}
        icon={icon}
        setIcon={setIcon}
        favIcon={favIcon}
        setFavIcon={setFavIcon}
        cover={cover}
        setCover={setCover}
      />

      <ContactYouSection
        phone={phone}
        changePhone={setPhone}
        address={address}
        changeAddress={setAddress}
        morePhoneNumbers={morePhoneNumbers}
        addMorePhoneNumbers={setMorePhoneNumbers}
        latitude={latitude}
        changeLatitude={setLatitude}
        longitude={longitude}
        changeLongitude={setLongitude}
      />

      <SocialNetworksSection
        instagram={instagram}
        changeInstagram={setInstagram}
        telegram={telegram}
        changeTelegram={setTelegram}
        linkedin={linkedin}
        changeLinkedin={setLinkedin}
        whatsapp={whatsapp}
        changeWhatsapp={setWhatsapp}
        twitter={twitter}
        changeTwitter={setTwitter}
        facebook={facebook}
        changeFacebook={setFacebook}
        aparat={aparat}
        changeAparat={setAparat}
        youtube={youtube}
        changeYoutube={setYoutube}
        socialErrors={socialErrors}
        validationSocialNetwork={validationSocialNetwork}
        socialNetworkRef={socialNetworkRef}
      />

      {/* <DomainSection /> */}

      <ScheduleSection
        workingHours={workingHours}
        updateWorkingHours={setWorkingHours}
        showWorkingTime={showWorkingTime}
        setShowWorkingTime={setShowWorkingTime}
        textError={textError}
        workingHourRef={workingHourRef}
      />

      {isDaramad ? null : (
        <Licence
          Enamad={enamad}
          changeEnamad={setEnamad}
          samandehi={samandehi}
          changeSamandehi={setSamandehi}
          virtualBusinessAssociation={virtualBusinessAssociation}
          changeVirtualBusinessAssociation={setVirtualBusinessAssociation}
          showLicence={showLicence}
          setShowLicence={setShowLicence}
        />
      )}
      {isDaramad ? null : (
        <Paper
          elevation={1}
          className="d-flex mt-3 py-3 flex-wrap mb-5 mb-md-0"
        >
          <div className="col-12 d-flex u-fontLarge" style={{ color: night }}>
            <span>ریدایرکت</span>
            <Switch
              onColor={theme.palette.primary.main}
              isSwitchOn={showRedirectsMap}
              toggleSwitch={() => {
                setShowRedirectsMap(!showRedirectsMap);
              }}
            />
          </div>
          <p className="mt-3 col-12" style={{ fontSize: 12 }}>
            در صورتی که هم اکنون میخواهید کاربران خود را از دامنه قبلی خود به
            دامنه جدید منتقل کنید می‌توانید از این بخش استفاده کنید.
          </p>
          {showRedirectsMap ? (
            <>
              <div className="d-flex mt-3 col-12" style={{ fontSize: 12 }}>
                <InfoOutlinedIcon />
                <div className="text-right u-fontNormal pr-2">
                  لطفا در صورتی‌که در مورد این بخش اطلاعاتی ندارید تغییری در آن
                  ایجاد نکنید.
                </div>
              </div>
              <div className="col-12">
                {_redirectsMap?.map(({ origin, destination, type }, index) => (
                  <div
                    key={index}
                    className="p-3 mt-3"
                    style={{ borderRadius: 8, border: "1px solid #CCCCCC" }}
                  >
                    <div className="d-flex flex-wrap w-100 align-items-center">
                      <div className="w-100">
                        <Input
                          label="لینک قدیمی"
                          value={origin}
                          placeholder="/a/b/c"
                          size="medium"
                          onChange={(value) => {
                            const newRedirectsMap = JSON.parse(
                              JSON.stringify(_redirectsMap)
                            );
                            if (newRedirectsMap[index].destination !== value) {
                              newRedirectsMap[index].origin = value;
                              setInputError({ value: "", id: null });
                            } else
                              setInputError({
                                value:
                                  "مقدار لینک جدید و لینک قدیمی نباید یکی باشد.",
                                id: index,
                              });

                            _setRedirectsMap(newRedirectsMap);
                          }}
                          inputProps={{
                            style: { textAlign: "left", direction: "ltr" },
                          }}
                        />
                      </div>
                      <div className="w-100 mt-4">
                        <Input
                          placeholder="/a/b/c"
                          size="medium"
                          label="لینک جدید"
                          value={destination}
                          onChange={(value) => {
                            const newRedirectsMap = JSON.parse(
                              JSON.stringify(_redirectsMap)
                            );
                            if (newRedirectsMap[index].origin !== value) {
                              newRedirectsMap[index].destination = value;
                              setInputError({ value: "", id: null });
                            } else
                              setInputError({
                                value:
                                  "مقدار لینک جدید و لینک قدیمی نباید یکی باشد.",
                                id: index,
                              });

                            _setRedirectsMap(newRedirectsMap);
                          }}
                          inputProps={{
                            style: { textAlign: "left", direction: "ltr" },
                          }}
                        />
                        {inputError.id === index && (
                          <div
                            className={"mt-1"}
                            style={{ color: theme.palette.error.main }}
                          >
                            {inputError.value}
                          </div>
                        )}
                      </div>
                      <FormControl variant="outlined" className="w-100 mt-4">
                        <Select
                          className="medium w-100"
                          value={type || 302}
                          onChange={(e) => {
                            const newRedirectsMap = JSON.parse(
                              JSON.stringify(_redirectsMap)
                            );
                            newRedirectsMap[index].type = e.target.value;
                            _setRedirectsMap(newRedirectsMap);
                          }}
                        >
                          <MenuItem key={302} value={302}>
                            302
                          </MenuItem>
                          <MenuItem key={301} value={301}>
                            301
                          </MenuItem>
                        </Select>
                      </FormControl>
                      <div className="w-100 d-flex justify-content-end">
                        {_redirectsMap?.length - 1 === index ? (
                          <IconButton onClick={addNewRow}>
                            <AddCircleOutlineIcon
                              color="primary"
                              style={{ cursor: "pointer" }}
                            />
                          </IconButton>
                        ) : null}

                        <IconButton onClick={() => removeRow(index)}>
                          <DeleteRoundedIcon
                            color="primary"
                            style={{ cursor: "pointer" }}
                          />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </Paper>
      )}
      <SaveAndDiscardButtons
        saveAction={submit}
        saveText="ذخیره تغییرات"
        disabled={loading}
      />
      <SuccessMessageModal
        isOpen={isOpenSuccessModal}
        title="اطلاعات اصلی با موفقیت ذخیره شد."
        content="آیا می‌دانستید کاربران هنگام خرید به سایت‌هایی که حاوی اطلاعاتی چون آیکون، نام برند، شعار و درباره ما  هستند بیشتر اعتماد می‌کنند؟"
        onClose={() => setIsOpenSuccessModal(false)}
        next={() => router.back()}
        image="/images/success-info-main.svg"
      />
      <Tour
        steps={onboardingSteps}
        isOpen={isOpenOnboarding}
        className="tour"
        showCloseButton={false}
        showNumber={false}
        onRequestClose={() => setIsOpenOnboarding(false)}
        rounded={5}
        showButtons={false}
        showNavigationNumber={false}
        showNavigation={false}
        disableInteraction
        disableDotsNavigation
        onAfterOpen={(target) => disableBodyScroll(target)}
        onBeforeClose={(target) => enableBodyScroll(target)}
      />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  business: makeSelectBusiness(),
  redirects: makeSelectBusinessRedirectsMap(),
  loading: makeSelectLoading(),
  themeConfig: makeSelectBusinessThemeConfig(),
  basePlugin: makeSelectPlugin(BASE_PLUGIN),
  shoppingPluginData: makeSelectPlugin(SHOPPING_PLUGIN),
  journeyData: makeSelectJourneyState(),
});

function mapDispatchToProps(dispatch) {
  return {
    _updateBusiness: (data, successMessage, failMessage, callback) =>
      dispatch(updateBusiness(data, successMessage, failMessage, callback)),
    _suggestEdit: (data) => dispatch(suggestBusinessEdit(data)),
    _uploadFile: (files, folderName, callback) =>
      dispatch(uploadFile({ files, folderName }, callback)),
    _removeFile: () => dispatch(removeFile()),
    _getJourneyState: () => dispatch(getJourneyState()),
    _updateJourneyState: (data, callback) =>
      dispatch(updateJourneyState(data, callback)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminSettings);
