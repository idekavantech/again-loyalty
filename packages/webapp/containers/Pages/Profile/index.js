/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/**
 *
 * Profile
 *
 */

import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import Head from "next/head";
import { createStructuredSelector } from "reselect";
import Paper from "@material-ui/core/Paper";
import { compose } from "redux";
import Button from "@material-ui/core/Button";
import Input from "@saas/components/Input";
import { makeSelectUser } from "@saas/stores/user/selector";
import {
  makeSelectLoading,
  makeSelectUploadedFile,
} from "@saas/stores/global/selectors";
import { removeFile, uploadFile } from "@saas/stores/global/actions";
import { updateProfile } from "@saas/stores/user/actions";
import { makeSelectBusinessSiteDomain } from "@saas/stores/business/selector";

import { makeSelectBusinessCRMMembershipById } from "@saas/stores/business/selector";
import SingleDatePicker from "@saas/components/SingleDatePicker";
import LazyImage from "@saas/components/LazyImage";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";

import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { getCRMMembership } from "@saas/stores/business/actions";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

export function Profile({
  user,
  uploadedFile,
  _updateProfile,
  _getCRMMembership,
  loading,
  member,
  businessDomain,
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [marriageDate, setMarriageDate] = useState(null);
  const { maxWidth600: isMobile, maxWidth1000: isTablet } = useResponsive();

  const submit = () => {
    const editedProfile = {
      name,
      labels: [],
      email,
      user: {
        phone: persianToEnglishNumber(phone),
      },
      business_site_domain: businessDomain,
    };
    if (uploadedFile)
      editedProfile.image = `${uploadedFile.folder_name}/${uploadedFile.file_name}`;
    if (birthDate) editedProfile.birth_date = persianToEnglishNumber(birthDate);
    if (marriageDate)
      editedProfile.marriage_date = persianToEnglishNumber(marriageDate);
    const updateProfileCallback = () => {
      window.location.href = "/profile";
    };
    _updateProfile(member.id, editedProfile, updateProfileCallback);
  };

  useEffect(() => {
    setTimeout(() => {
      _getCRMMembership(user.crm_membership_id);
      setPhone(user.phone_zero_starts);
    }, 0);
  }, [user]);

  useEffect(() => {
    setName(member?.name);
    setMarriageDate(member?.marriage_date);
    setBirthDate(member?.birth_date);
    setEmail(member?.email);
  }, [member]);

  return (
    <div>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      {user && (
        <div style={{ backgroundColor: "#E5E5E5" }}>
          <div style={{ padding: isMobile ? 16 : isTablet ? 32 : 64 }}>
            <p
              style={{
                fontSize: isMobile ? 20 : 24,
                fontWeight: 600,
                color: "#202223",
                marginBottom: 24,
              }}
            >
              پروفایل من
            </p>
            <div
              className="d-flex"
              style={{ flexDirection: isMobile ? "column" : "row" }}
            >
              <div style={{ width: isMobile ? "100%" : 300 }}>
                <Paper
                  className="w-100 d-flex align-items-center justify-content-center p-4"
                  style={{ height: 120 }}
                  elevation={2}
                >
                  <LazyImage
                    src="/images/Wallet-profile.svg"
                    width="64"
                    height="64"
                  />
                  <div className="flex-1 mr-5">
                    <p
                      style={{
                        fontSize: 12,
                        color: "#6D7175",
                        fontWeight: 600,
                      }}
                    >
                      میزان اعتبار
                    </p>
                    <p
                      className="mt-4"
                      style={{ fontSize: 16, fontWeight: 600 }}
                    >
                      <span style={{ fontSize: 20, fontWeight: 400 }}>
                        {priceFormatter(member?.gift_credit)}
                      </span>{" "}
                      تومان
                    </p>
                  </div>
                </Paper>
                <Paper
                  className="w-100 mt-5 d-flex align-items-center justify-content-center p-4"
                  style={{ height: 120 }}
                  elevation={2}
                >
                  <LazyImage src="/images/Award 4.svg" width="64" height="64" />
                  <div className="flex-1 mr-5">
                    <p
                      style={{
                        fontSize: 12,
                        color: "#6D7175",
                        fontWeight: 600,
                      }}
                    >
                      امتیاز
                    </p>
                    <p
                      className="mt-4"
                      style={{ fontSize: 16, fontWeight: 600 }}
                    >
                      <span style={{ fontSize: 20, fontWeight: 400 }}>
                        {priceFormatter(member?.point_credit)}
                      </span>{" "}
                    </p>
                  </div>
                </Paper>
                <Paper
                  className="w-100 mt-5 d-flex align-items-center justify-content-center p-4"
                  style={{ height: 120 }}
                  elevation={2}
                >
                  <LazyImage src="/images/Star 2.svg" width="64" height="64" />
                  <div className="flex-1 mr-5">
                    <p
                      style={{
                        fontSize: 12,
                        color: "#6D7175",
                        fontWeight: 600,
                      }}
                    >
                      سطح
                    </p>
                    <p
                      className="mt-4"
                      style={{ fontSize: 16, fontWeight: 600 }}
                    >
                      <span style={{ fontSize: 20, fontWeight: 400 }}>
                        {member?.level?.title}
                      </span>{" "}
                    </p>
                  </div>
                </Paper>
                <Paper
                  className="w-100 mt-5 d-flex align-items-center justify-content-center p-4"
                  style={{ height: 120 }}
                  elevation={2}
                >
                  <LazyImage src="/images/Bag 6.svg" width="64" height="64" />
                  <div className="flex-1 mr-5">
                    <p
                      style={{
                        fontSize: 12,
                        color: "#6D7175",
                        fontWeight: 600,
                      }}
                    >
                      تعداد خرید
                    </p>
                    <p
                      className="mt-4"
                      style={{ fontSize: 16, fontWeight: 600 }}
                    >
                      {englishNumberToPersianNumber(
                        member?.aggregated_data?.order?.count || 0
                      )}
                      <span style={{ fontSize: 20, fontWeight: 400 }}></span>{" "}
                    </p>
                  </div>
                </Paper>
              </div>
              <Paper
                elevation={2}
                style={{
                  padding: 24,
                  flex: 1,
                  marginRight: isMobile ? 0 : 24,
                  marginTop: isMobile ? 24 : 0,
                }}
              >
                <p
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: "#202223",
                  }}
                >
                  اطلاعات کاربر
                </p>
                <p className="mt-4 pb-4">
                  در این بخش شما ‌می‌توانید، اطلاعات خود را وارد کنید.
                </p>
                <hr className="hr-normal my-3" />
                <div
                  className="d-flex  align-items-center justify-content-between pt-4 "
                  style={{ flexDirection: isTablet ? "column" : "row" }}
                >
                  {/* <div>
                    <input
                      ref={myFiles}
                      className="d-none"
                      id="profile_image"
                      type="file"
                      onChange={() =>
                        _uploadFile(myFiles.current.files, "profile_images")
                      }
                    />
                    <label
                      htmlFor="profile_image"
                      onClick={(e) => {
                        e.preventDefault();
                        myFiles.current.click();
                      }}
                    >
                      <div className="my-5 position-relative u-cursor-pointer">
                        <div>
                          <ProfileImage
                            themeColor={themeColor}
                            user={user}
                            uploadedFile={uploadedFile}
                          />
                        </div>
                      </div>
                    </label>
                  </div> */}
                  <div className="d-flex flex-1">
                    <div
                      className="flex-1"
                      // style={{ marginRight: isTablet ? 0 : 24 }}
                    >
                      <div>
                        <p>نام و نام خانوادگی</p>
                        <Input
                          value={name}
                          inputProps={{
                            style: { height: 44, padding: "0 14px" },
                          }}
                          margin="dense"
                          onChange={setName}
                          placeholder="نام و نام خانوادگی"
                          id="fullName"
                        />
                      </div>
                      <div className="mt-5">
                        <p className="mb-2">تاریخ ازدواج (اختیاری)</p>
                        <SingleDatePicker
                          inputProps={{
                            style: {
                              width: "100%",
                              height: 44,
                              padding: "0 14px",
                            },
                          }}
                          selectedDate={marriageDate}
                          handleDateChange={(date) =>
                            setMarriageDate(date?.format("YYYY-MM-DD") || null)
                          }
                          placeholder="تاریخ ازدواج"
                          isDisabled={member?.marriage_date}
                        />
                      </div>

                      <div className="mt-5">
                        <p>تلفن</p>
                        <Input
                          value={englishNumberToPersianNumber(phone)}
                          inputProps={{
                            style: { height: 44, padding: "0 14px" },
                          }}
                          margin="dense"
                          onChange={setPhone}
                          placeholder=""
                          id="fullName"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="flex-1" style={{ marginRight: 24 }}>
                      <div>
                        <p className="mb-2">تاریخ تولد</p>
                        <SingleDatePicker
                          inputProps={{
                            style: {
                              width: "100%",
                              height: 44,
                              padding: "0 14px",
                            },
                          }}
                          selectedDate={birthDate}
                          handleDateChange={(date) =>
                            setBirthDate(date?.format("YYYY-MM-DD") || null)
                          }
                          placeholder="تاریخ تولد"
                          isDisabled={member?.birth_date}
                        />
                      </div>
                      <div className="mt-5">
                        <p>ایمیل</p>
                        <Input
                          value={email}
                          inputProps={{
                            style: { height: 44, padding: "0 14px" },
                          }}
                          margin="dense"
                          onChange={setEmail}
                          placeholder="ایمیل"
                          id="fullName"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Paper>
            </div>
            <div className="w-100 mt-5 d-flex justify-content-end">
              <div style={{ width: 200 }}>
                <Button
                  id="SubmitProfile"
                  className="w-100"
                  onClick={submit}
                  color="secondary"
                  variant="contained"
                  disabled={loading}
                >
                  ذخیره
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  loading: makeSelectLoading(),
  uploadedFile: makeSelectUploadedFile(),
  member: makeSelectBusinessCRMMembershipById(),
  businessDomain: makeSelectBusinessSiteDomain(),
});
``;

function mapDispatchToProps(dispatch) {
  return {
    _uploadFile: (files, folderName) =>
      dispatch(uploadFile({ files, folderName })),
    _getCRMMembership: (id) => dispatch(getCRMMembership(id)),
    _removeFile: (index) => dispatch(removeFile(index)),
    _updateProfile: (id, data, callback) =>
      dispatch(updateProfile(id, data, callback)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Profile);
