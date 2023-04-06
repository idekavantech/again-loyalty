import InputAdornment from "@material-ui/core/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useForm, Controller } from "react-hook-form";
import SubmitBtnMainInfoPage from "./SubmitBtnMainInfoPage";
import { useDispatch, useSelector } from "react-redux";
import { makeSelectLoading } from "stores/global/selector";
import { createVitrin } from "stores/global/actions";
import { MainInfoPageSteps } from "../constants";
import { memo, useEffect } from "react";
import Input from "components/Input";

const FillInformationMainInfoPage = ({
  setCurrentState,
  setStatsData,
  statsData,
}) => {
  const isLoading = useSelector(makeSelectLoading());
  const dispatch = useDispatch();

  const _createVitrin = (data, callback) =>
    dispatch(createVitrin(data, callback));
  const { control, handleSubmit, watch, setValue, getValues } = useForm({
    defaultValues: {
      firstName: "",
      businessTitle: "",
    },
  });

  const firstName = watch("firstName");
  const businessTitle = watch("businessTitle");

  useEffect(() => {
    if (statsData?.mainInfo) {
      setValue("firstName", statsData.mainInfo?.firstName);
      setValue("businessTitle", statsData.mainInfo?.businessTitle);
    }
  }, [statsData]);

  const onSubmit = (data) => {
    setStatsData((prevData) => ({
      ...prevData,
      mainInfo: data,
    }));
    if (localStorage.getItem("createdBusiness")) {
      setCurrentState((prevState) => ({
        ...prevState,
        number: MainInfoPageSteps.promotion,
      }));
    } else {
      _createVitrin({}, () =>
        setCurrentState((prevState) => ({
          ...prevState,
          number: MainInfoPageSteps.promotion,
        }))
      );
    }
  };
  const isValid = getValues("firstName") && getValues("businessTitle");
  return (
    <form
      className={"d-flex justify-content-between flex-col mt-5 h-100"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <div className="pb-3 pb-md-0" style={{ width: "100%" }}>
          <Controller
            name="firstName"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Input
                type="text"
                dir="rtl"
                id="phoneNumber"
                noModal
                autoFocus
                label="نام و نام خانوادگی*"
                className={`text-center mt-4 u-fontMedium ${
                  firstName ? "notEmpty" : null
                } d-flex align-items-center opacity-1`}
                InputProps={{
                  endAdornment: (
                    <>
                      <InputAdornment
                        style={{ position: "absolute", left: 3 }}
                        position="end"
                      >
                        <PersonIcon style={{ color: "gray" }} />
                      </InputAdornment>
                    </>
                  ),
                }}
                {...field}
              />
            )}
          />
        </div>
        <div className=" pb-3 py-md-2 " style={{ width: "100%" }}>
          <Controller
            name="businessTitle"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Input
                type="text"
                dir="rtl"
                noModal
                label="نام کسب‌و‌کار*"
                placeholder={"مثال : فروشگاه لوازم‌خانگی آوا"}
                className={`text-center mt-4 u-fontMedium ${
                  businessTitle ? "notEmpty" : null
                } d-flex align-items-center opacity-1`}
                InputProps={{
                  endAdornment: (
                    <>
                      <InputAdornment
                        style={{ position: "absolute", left: 3 }}
                        position="end"
                      >
                        <StorefrontIcon style={{ color: "gray" }} />
                      </InputAdornment>
                    </>
                  ),
                }}
                {...field}
              />
            )}
          />
        </div>
      </div>
      <div
        className="container px-0 d-flex justify-content-center"
        style={{
          backgroundColor: "#fff",
        }}
      >
        <SubmitBtnMainInfoPage
          onSubmit={onSubmit}
          isLoading={isLoading}
          isDisabled={!isValid || isLoading}
        >
          ادامه
        </SubmitBtnMainInfoPage>
      </div>
    </form>
  );
};

export default memo(FillInformationMainInfoPage);
