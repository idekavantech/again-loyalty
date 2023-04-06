import { MainInfoPageSteps } from "../constants";

import Button from "@material-ui/core/Button";
import { useCallback, useEffect, useState } from "react";
import { makeSelectLoading } from "../../../stores/global/selector";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import LazyImage from "@saas/components/LazyImage";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { useDropzone } from "react-dropzone";
import { Swiper, SwiperSlide } from "swiper/react";
import Add from "@material-ui/icons/Add";
import {
  addOrRemoveImageToBusinessBehtarino,
  updateBehtarino,
  uploadFileBehtarino,
} from "../../../stores/global/actions";
import ThreeDotsBounceLoading from "@saas/components/ThreeDotsBounceLoading";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import SubmitBtnMainInfoPage from "./SubmitBtnMainInfoPage";
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "video/mp4",
  "video/mkv",
  "video/mov",
  "video/avi",
];

const AddResourcesMainInfoPage = ({
  setCurrentState,
  setStatsData,
  statsData,
}) => {
  const [swiperRef, setSwiperRef] = useState();
  const [errorUpload, setErrorUpload] = useState("");
  const [acceptedFileByType, setAcceptedFileByType] = useState(null);
  const [isLoadingRemoveImage, setIsLoadingRemoveImage] = useState({
    id: null,
    isActive: false,
  });

  const dispatch = useDispatch();
  const _uploadFile = (files, folderName, callback) =>
    dispatch(uploadFileBehtarino({ files, folderName }, callback));
  const _updateBehtarino = (data, callback) =>
    dispatch(updateBehtarino(data, callback));

  const { maxWidth430: isMobile, minWidth768 } = useResponsive();
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (ACCEPTED_FILE_TYPES.includes(acceptedFiles[0]?.type)) {
        setAcceptedFileByType(acceptedFiles[0]);
        setErrorUpload("");
      } else {
        setErrorUpload("فرمت فایل انتخابی نادرست است.");
        setAcceptedFileByType(null);
      }
    },
  });

  const isLoadingUploadImage = useSelector(makeSelectLoading("uploadImage"));
  const isLoadingUpdateBusiness = useSelector(
    makeSelectLoading("createBehtarino")
  );

  const _addOrRemoveImageToBusinessBehtarino = (
    data,
    callback,
    callbackError
  ) =>
    dispatch(
      addOrRemoveImageToBusinessBehtarino(data, callback, callbackError)
    );
  const isSubmitDisabled = !statsData.images?.length || isLoadingUpdateBusiness;
  const slidesPerView = minWidth768 ? "2" : "1.5";

  const handleLeftClick = useCallback(() => {
    if (!swiperRef) return;
    if (!swiperRef.isEnd) swiperRef.slideNext();
  }, [swiperRef]);

  const onImageDeleteClick = (image) => {
    const createdBehtarinoBusiness = JSON.parse(
      localStorage.getItem("behtarinoCreatedBusiness")
    );
    if (!createdBehtarinoBusiness) return;
    setIsLoadingRemoveImage({ id: image.id, isActive: true });
    _addOrRemoveImageToBusinessBehtarino(
      {
        business: createdBehtarinoBusiness.id,
        resource: { url: ``, id: image.id },
        isRemove: true,
      },
      ({ id }) => {
        setStatsData((prevState) => ({
          ...prevState,
          images: [...prevState?.images.filter((image) => image.id !== id)],
        }));
        setIsLoadingRemoveImage({ id: null, isActive: false });
      },
      () => {
        setIsLoadingRemoveImage({ id: null, isActive: false });
      }
    );
  };

  const onSubmit = () => {
    const createdBehtarinoBusiness = JSON.parse(
      localStorage.getItem("behtarinoCreatedBusiness")
    );
    if (!createdBehtarinoBusiness) return;
    _updateBehtarino(
      {
        business: +createdBehtarinoBusiness.id,
        images: statsData.images.map((image) => image.id),
      },
      () => {
        setCurrentState((prevState) => ({
          ...prevState,
          number: MainInfoPageSteps.sale,
        }));
      }
    );
  };

  useEffect(() => {
    const createdBehtarinoBusiness = JSON.parse(
      localStorage.getItem("behtarinoCreatedBusiness")
    );
    if (!createdBehtarinoBusiness)
      setCurrentState((prevState) => ({
        ...prevState,
        number: prevState.number - 1,
      }));
    if (acceptedFileByType) {
      const isImageAlreadyUploaded = statsData.images?.some(
        (img) => img.name === acceptedFileByType?.name
      );
      if (!isImageAlreadyUploaded)
        _uploadFile([acceptedFileByType], "business_images", (newImageUrl) => {
          _addOrRemoveImageToBusinessBehtarino(
            {
              business: createdBehtarinoBusiness.id,
              resource: {
                url: `business_images/${newImageUrl.substring(
                  newImageUrl.lastIndexOf("/") + 1
                )}`,
              },
            },
            ({ id, thumbnail_url }) => {
              if (statsData.images?.length - 1 > slidesPerView)
                handleLeftClick();
              setStatsData((prevState) => ({
                ...prevState,
                images: [
                  ...prevState?.images.filter((image) => image.id !== id),
                  { url: thumbnail_url, name: acceptedFileByType?.name, id },
                ],
              }));
              setAcceptedFileByType(null);
            }
          );
        });
    }
  }, [acceptedFileByType]);

  return (
    <>
      <div className={"h-100 d-flex flex-col"}>
        <div className={"d-flex flex-col justify-content-between h-100 pt-2"}>
          <div className={"d-flex justify-content-between flex-col h-100"}>
            <div className={"mt-3"}>
              <div>
                <p
                  style={{
                    fontSize: isMobile ? 14 : 12,
                    fontWeight: 400,
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  در لیست نتایج انتخاب شوید:
                </p>
                <h2 style={{ fontSize: isMobile ? 22 : 20, fontWeight: 500 }}>
                  افزودن تصویر یا ویدیو کسب‌وکار
                </h2>
              </div>
              <p className={"mt-5"} style={{ fontSize: isMobile ? 17 : 16 }}>
                <strong>۷۵ درصد </strong>
                از خریداران آنلاین هنگام تصمیم‌گیری در مورد خرید به عکس‌های
                محصول اعتماد می‌کنند.
              </p>
            </div>
            <div>
              <div
                className={"d-flex position-relative"}
                style={{ height: 116 }}
              >
                <div
                  className="uploadContainer"
                  {...getRootProps({
                    className: "dropzone uploadContainer",
                    isSubmitDisabled: isLoadingUploadImage,
                  })}
                >
                  <input {...getInputProps()} />
                  <Button
                    className={`d-flex w-100 cursorPointer h-100 u-box-shadow-none flex-column align-items-center justify-content-center p-2 upload-btn-behtarino ${
                      errorUpload ? "error" : ""
                    }`}
                    role="button"
                    tabIndex="0"
                  >
                    <div className="d-flex flex-column align-items-center justify-content-center">
                      {isLoadingUploadImage ? (
                        <ThreeDotsBounceLoading color={"#0050FF"} size={8} />
                      ) : (
                        <>
                          <Add />
                          {"عکس یا ویدیو"}
                        </>
                      )}
                    </div>
                  </Button>
                </div>

                <Swiper
                  slidesPerView={slidesPerView}
                  spaceBetween={15}
                  className={"mr-2 w-100"}
                  onSwiper={setSwiperRef}
                >
                  {statsData.images?.map((img) => (
                    <SwiperSlide key={img.id}>
                      <div
                        className="position-relative "
                        style={{
                          width: 116,
                          height: "100%",
                        }}
                      >
                        <LazyImage
                          alt=""
                          className="u-border-radius-8 w-100 h-100"
                          wrapperClassName="w-100 h-100"
                          src={img.url}
                          style={{ objectFit: "cover" }}
                        />
                        <div
                          className="u-cursor-pointer u-border-radius-4 mr-1 mt-1 position-absolute top-0 p-1 z-index-2 d-flex"
                          style={{
                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                          }}
                        >
                          {isLoadingRemoveImage.id === img.id &&
                          isLoadingRemoveImage.isActive ? (
                            <ThreeDotsBounceLoading color={"#fff"} size={6} />
                          ) : (
                            <IconButton
                              className="p-0"
                              onClick={() => onImageDeleteClick(img)}
                            >
                              <ClearIcon
                                style={{
                                  color: "white",
                                  transform: "scale(1.16)",
                                }}
                              />
                            </IconButton>
                          )}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                {statsData.images?.length > slidesPerView ? (
                  <IconButton
                    className={"position-absolute"}
                    style={{
                      top: "25%",
                      left: -35,
                    }}
                    onClick={handleLeftClick}
                  >
                    <ChevronLeftIcon
                      style={{
                        color: "#000",
                        transform: "scale(1.3)",
                      }}
                    />
                  </IconButton>
                ) : null}
              </div>

              <p
                style={{
                  fontSize: isMobile ? 14 : 12,
                  fontWeight: 400,
                  color: errorUpload ? "#D32F2F" : "rgba(0, 0, 0, 0.6)",
                }}
                className={"mt-2"}
              >
                {errorUpload ||
                  "مثال: عکس محیط کسب‌وکار، محصولات، ویدیو معرفی کسب‌وکار و..."}
              </p>
            </div>

            <div className="d-flex px-2">
              <SubmitBtnMainInfoPage
                onClick={onSubmit}
                isDisabled={isSubmitDisabled}
                isLoading={isLoadingUpdateBusiness}
                style={{ width: "50%" }}
              >
                تایید
              </SubmitBtnMainInfoPage>

              <Button
                onClick={() =>
                  setCurrentState((prevState) => ({
                    ...prevState,
                    number: MainInfoPageSteps.sale,
                  }))
                }
                color={"primary"}
                className={"mr-2 w-50"}
              >
                بعدا اضافه می‌کنم
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddResourcesMainInfoPage;
