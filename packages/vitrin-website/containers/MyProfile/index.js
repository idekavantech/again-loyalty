import React, { memo, useState, useEffect, useRef } from "react";
import ProfileHeader from "../../components/ProfileHeader";
import { compose } from "redux";
import { connect } from "react-redux";
import { makeSelectUploadedFile } from "stores/global/selector";
import { createStructuredSelector } from "reselect";
import { makeSelectUser } from "stores/user/selector";
import { updateProfile } from "stores/user/actions";
import { uploadFile } from "stores/global/actions";
import Footer from "components/Footer";
import { englishNumberToPersianNumber } from "utils/helpers/englishNumberToPersianNumber";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import Image from "next/image";

function MyProfile({ user, _updateProfile, _uploadFile, uploadedFile }) {
  const myFiles = useRef(null);
  const [name, setName] = useState(user?.name);
  const [phone, setPhone] = useState(user?.phone_zero_starts);
  const {maxWidth768} = useResponsive()

  useEffect(() => {
    setName(user?.name);
    setPhone(user?.phone_zero_starts);
  }, [user]);
  const submit = () => {
    const editedProfile = { name: name };
    if (uploadedFile)
      editedProfile.image = `${uploadedFile.folder_name}/${uploadedFile.file_name}`;
    _updateProfile(editedProfile);
  };

  return (
    <>
      <div>
        <ProfileHeader user={user} />
        <div style={{ backgroundColor: "#E5E5E5" }}>
          <div className="container">
            <div
              className={`d-flex ${
                maxWidth768 ? "flex-column" : "flex-row"
              } position-relative`}
              style={{
                padding: "40px 0",
              }}
            >
              <p
                className="col-12 col-md-2"
                style={{
                  color: "#000000",
                  fontSize: 20,
                  lineHeight: "28px",
                  textAlign: "right",
                }}
              >
                پروفایل من
              </p>
              <div
                className="col-12 mt-4 mt-md-0 col-md-8 p-5"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 16,
                }}
              >
                <div className={`d-flex ${maxWidth768 ? "flex-column" : ""}`}>
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
                    style={{ alignSelf: maxWidth768 ? "center" : "flex-start" }}
                    onClick={(e) => {
                      e.preventDefault();
                      myFiles.current.click();
                    }}
                  >
                    <div
                      className={`${
                        maxWidth768 ? "ml-0" : "ml-5"
                      }  cursorPointer radius-16 d-flex flex-column justify-content-center align-items-center`}
                      style={{
                        border: "1px dashed #98A9B1",
                        boxSizing: "content-box",
                      }}
                    >
                      {uploadedFile ? (
                        <>
                          <div
                            className="radius-16"
                            style={{
                              width: 208,
                              height: 208,
                              backgroundImage: `url(${uploadedFile?.url})`,
                              backgroundSize: "cover",
                            }}
                          ></div>
                        </>
                      ) : user?.image ? (
                        <>
                          <div>
                            <Image
                              className="radius-16"
                              width={208}
                              height={208}
                              src={user.image_url}
                              alt="profileImage"
                            />
                          </div>
                        </>
                      ) : (
                        <div
                          className="cursorPointer radius-16 d-flex flex-column justify-content-center align-items-center"
                          style={{
                            width: 208,
                            height: 208,
                            backgroundColor: "#F0F0F0",
                          }}
                        >
                          <div>
                            <Image
                              height={56}
                              width={56}
                              src="/images/upload-icon.svg"
                              alt="upload"
                            />
                          </div>
                          <p className="mt-4" style={{ color: "#202223" }}>
                            بارگذاری تصویر
                          </p>
                        </div>
                      )}
                    </div>
                  </label>

                  <div
                    className={`mr-5 ${maxWidth768 ? "mt-5" : "mt-0"}`}
                    style={{ flex: 2 }}
                  >
                    <div>
                      <p
                        className="font-weight-600"
                        style={{ fontSize: 16, lineHeight: "24px" }}
                      >
                        نام و نام‌خانوادگی
                      </p>
                      <div
                        className="d-flex w-100 radius-16 mt-2 p-4"
                        style={{
                          border: "1px solid #E4E6E7",
                          backgroundColor: "#F6F6F7",
                        }}
                      >
                        <div>
                          <Image
                            width={24}
                            height={24}
                            src="/images/profile-icon-gray.svg"
                            alt="profile"
                          />
                        </div>

                        <input
                          className="flex-1 mr-4"
                          value={name}
                          style={{
                            fontSize: 15,
                            lineHeight: "25px",
                            color: "#202223",
                          }}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mt-5">
                      <p
                        className="font-weight-600 mt-2"
                        style={{ fontSize: 16, lineHeight: "24px" }}
                      >
                        شماره تماس
                      </p>
                      <div
                        className="d-flex w-100 radius-16 mt-2 p-4"
                        style={{
                          border: "1px solid #E4E6E7",
                          backgroundColor: "#F6F6F7",
                        }}
                      >
                        <div>
                          <Image
                            width={24}
                            height={24}
                            src="/images/mobile-icon-gray.svg"
                            alt="mobile"
                          />
                        </div>

                        <input
                          className="flex-1"
                          style={{
                            fontSize: 15,
                            lineHeight: "25px",
                            color: "#8C9196",
                          }}
                          value={
                            phone ? englishNumberToPersianNumber(phone) : ""
                          }
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  style={{
                    float: "left",
                    height: "36px",
                    marginTop: 48,
                    color: "#fff",
                    padding: "8px 13px",
                    backgroundColor: "#0050FF",
                    borderRadius: 8,
                  }}
                  onClick={submit}
                >
                  ذخیره تغییرات
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  uploadedFile: makeSelectUploadedFile(),
});
function mapDispatchToProps(dispatch) {
  return {
    _updateProfile: (data) => dispatch(updateProfile(data)),
    _uploadFile: (files, folderName) =>
      dispatch(uploadFile({ files, folderName })),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(MyProfile);
