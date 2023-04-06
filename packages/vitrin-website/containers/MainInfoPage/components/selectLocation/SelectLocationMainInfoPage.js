import { MainInfoPageSteps } from "../../constants";

import AddLocationByMapBtn from "./AddLocationByMapBtn";
import { memo, useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import SelectLocationModal from "./SelectLocationModal";
import { makeSelectLoading } from "stores/global/selector";
import { createBehtarino, updateBehtarino } from "stores/global/actions";
import { useDispatch, useSelector } from "react-redux";
import { getAddressFromCoordinates } from "@saas/utils/services/getAddressFromCoordinates";

import Input from "components/Input";
import SubmitBtnMainInfoPage from "../SubmitBtnMainInfoPage";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

const SelectLocationMainInfoPage = ({
  setCurrentState,
  setStatsData,
  statsData,
}) => {
  const [isModalShown, setModalShown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(
    statsData?.addressInfo?.selectedLocation
  );

  const isLoading = useSelector(makeSelectLoading("createBehtarino"));
  const dispatch = useDispatch();
  const addressDetailRef = useRef();
  const { maxWidth430: isMobile } = useResponsive();

  const _createBehtarino = (data, callback) =>
    dispatch(createBehtarino(data, callback));

  const _updateBehtarino = (data, callback) =>
    dispatch(updateBehtarino(data, callback));
  const { control, handleSubmit, watch, setValue, getValues } = useForm({
    defaultValues: {
      address: "",
      addressDetails: "",
    },
  });

  const address = watch("address");
  const onSubmit = (data) => {
    setStatsData((prevState) => ({
      ...prevState,
      addressInfo: { ...data, selectedLocation },
    }));
    if (!Object.keys(statsData.mainInfo).length)
      return setCurrentState((prevState) => ({
        ...prevState,
        number: MainInfoPageSteps.information,
      }));
    const createdBusiness = JSON.parse(localStorage.getItem("createdBusiness"));
    const createdBehtarinoBusiness = JSON.parse(
      localStorage.getItem("behtarinoCreatedBusiness")
    );
    if (createdBehtarinoBusiness) {
      const isBusinessEdited =
        +statsData.addressInfo.selectedLocation.longitude !==
          +selectedLocation.longitude ||
        +statsData.addressInfo.selectedLocation.latitude !==
          +selectedLocation.latitude;
      if (isBusinessEdited) {
        _updateBehtarino(
          {
            business: +createdBehtarinoBusiness.id,
            latitude: +selectedLocation.latitude,
            longitude: +selectedLocation.longitude,
            address: `${data.address}${
              data.addressDetails ? ` ${data.addressDetails}` : ""
            }`,
          },
          () => {
            setCurrentState((prevState) => ({
              ...prevState,
              number: MainInfoPageSteps.addImages,
            }));
          }
        );
      } else
        setCurrentState((prevState) => ({
          ...prevState,
          number: MainInfoPageSteps.addImages,
        }));
    } else {
      const newData = {
        title: statsData.mainInfo.businessTitle,
        reval_id: createdBusiness.reval_id,
        address: `${data.address}${
          data.addressDetails ? ` ${data.addressDetails}` : ""
        }`,
        latitude: +selectedLocation.latitude,
        longitude: +selectedLocation.longitude,
        is_owner: true,
        extra_data: { business_type: "behtarino" },
        theme_config: {},
      };

      _createBehtarino(newData, () => {
        setCurrentState((prevState) => ({
          ...prevState,
          number: MainInfoPageSteps.addImages,
        }));
      });
    }
  };

  useEffect(() => {
    if (statsData?.addressInfo) {
      setValue("address", statsData.addressInfo?.address);
      setValue("addressDetails", statsData.addressInfo?.addressDetails);
    }
  }, [statsData]);

  useEffect(() => {
    if (selectedLocation) {
      getAddressFromCoordinates(
        selectedLocation.latitude,
        selectedLocation.longitude
      ).then((address) => {
        setValue("address", address?.address_compact);
        if (!getValues("addressDetails")) addressDetailRef.current?.focus();
        else addressDetailRef.current?.blur();
      });
    }
  }, [selectedLocation]);

  return (
    <>
      <div className={"h-100 d-flex flex-col"}>
        <div
          className={`d-flex flex-col justify-content-between h-100 pt-${
            isMobile ? "3" : "2"
          }`}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={"d-flex justify-content-between flex-col h-100"}
          >
            <div>
              <div>
                <p
                  style={{
                    fontSize: isMobile ? 14 : 12,
                    fontWeight: 400,
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  در جستجوها دیده شوید:
                </p>
                <h2 style={{ fontSize: isMobile ? 22 : 20, fontWeight: 500 }}>
                  تعیین آدرس کسب‌و‌کار
                </h2>
              </div>
              <p
                className={`${selectedLocation ? "mt-2 mb-2" : "mt-5"}`}
                style={{ fontSize: isMobile ? 17 : 16 }}
              >
                <strong>۷۸ درصد</strong> از جستجوهای آدرس‌محور منجر به فروش
                می‌شود و امروزه این نوع جستجوها در حال افزایش‌اند.
              </p>
            </div>
            <div style={{ marginTop: selectedLocation ? 0 : -35 }}>
              <AddLocationByMapBtn
                onClick={() => setModalShown(true)}
                hasCoords={!!selectedLocation}
              />
            </div>
            {selectedLocation && (
              <div style={{ marginTop: -15 }}>
                <div className="pb-md-0" style={{ width: "100%" }}>
                  <Controller
                    name="address"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Input
                        type="text"
                        dir="rtl"
                        noModal
                        autoFocus
                        label="آدرس کسب‌و‌کار"
                        className={`text-center mt-4 u-fontMedium d-flex align-items-center opacity-1`}
                        {...field}
                      />
                    )}
                  />
                </div>
                <div className="pb-3 pb-md-0" style={{ width: "100%" }}>
                  <Controller
                    name="addressDetails"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="text"
                        dir="rtl"
                        inputRef={addressDetailRef}
                        noModal
                        autoFocus
                        label="جزئیات آدرس"
                        className={`text-center mt-4 u-fontMedium d-flex align-items-center opacity-1`}
                        {...field}
                      />
                    )}
                  />
                </div>
              </div>
            )}
            <div className="d-flex px-2">
              <SubmitBtnMainInfoPage
                onSubmit={onSubmit}
                isDisabled={!selectedLocation || isLoading || !address}
                isLoading={isLoading}
                type={"submit"}
              >
                ادامه
              </SubmitBtnMainInfoPage>
            </div>
          </form>
        </div>
      </div>
      <SelectLocationModal
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        isModalShown={isModalShown}
        setModalShown={setModalShown}
      />
    </>
  );
};

export default memo(SelectLocationMainInfoPage);
