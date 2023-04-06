import Input from "@saas/components/Input";
import { Button } from "@material-ui/core";
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";
import SingleDatePicker from "@saas/components/SingleDatePicker";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import NationalCardImage from "./NationalCardImage";

const GeneralInfo = ({
  submit,
  info,
  setInfo,
  _removeFile,
  _uploadFile,
  errors,
  setErrors,
}) => {
  return (
    <div>
      <p className="pt-3 my-2">
        اطلاعات زیر را برای ساخت حساب کاربری در زیبال پر کنید.
      </p>
      <div className="d-flex flex-wrap">
        <div className="mt-4 col-md-4 px-0 pr-md-0 pl-md-3">
          <Input
            size="large"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="مثال: مریم"
            label="نام"
            value={info.name}
            onChange={(name) => {
              setInfo({ ...info, name });
            }}
            onFocus={() => setErrors({ ...errors, name: "" })}
            helperText={errors.name}
            error={errors.name}
          />
        </div>
        <div className="mt-4 px-0 col-md-4 px-md-3">
          <Input
            size="large"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="مثال: طاهری"
            label="نام خانوادگی"
            value={info.lastname}
            onChange={(lastname) => {
              setInfo({ ...info, lastname });
            }}
            onFocus={() => setErrors({ ...errors, lastname: "" })}
            helperText={errors.lastname}
            error={errors.lastname}
          />
        </div>
        <div className="mt-4 px-0 col-md-4 px-md-3">
          <SingleDatePicker
            inputProps={{
              style: {
                width: "100%",
                height: 56,
                padding: "0 14px",
              },
            }}
            InputLabelProps={{
              shrink: true,
            }}
            selectedDate={englishNumberToPersianNumber(
              info?.birthday || "",
              ""
            )}
            handleDateChange={(date) =>
              setInfo({ ...info, birthday: date?.format("YYYY-MM-DD") || null })
            }
            placeholder="مثال : ۱۳۷۶/۱۲/۰۱"
            label={"تاریخ تولد"}
            onFocus={() => setErrors({ ...errors, birthday: "" })}
            helperText={errors.birthday}
            error={errors.birthday}
          />
        </div>
        <div className="mt-4 mt-md-5 px-0 col-md-4 pl-md-3 pr-md-0">
          <Input
            numberOnly
            size="large"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ maxlength: 10 }}
            placeholder="مثال: ۱۲۳۴۵۶۷۸۹۰"
            label="کد ملی"
            onChange={(nationalId) => {
              setInfo({ ...info, nationalId });
            }}
            value={englishNumberToPersianNumber(info.nationalId, "")}
            onBlur={() => {
              info.nationalId && info.nationalId.length < 10
                ? setErrors({
                    ...errors,
                    nationalId: "کدملی باید ده رقم باشد",
                  })
                : setErrors({ nationalId: "" });
            }}
            helperText={errors.nationalId}
            error={errors.nationalId}
            onFocus={() => setErrors({ ...errors, nationalId: "" })}
          />
        </div>
        <div className="mt-4 px-0 mt-md-5 col-md-4 pr-md-3 pl-md-3">
          <Input
            size="large"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="مثال: علی"
            label="نام پدر"
            onChange={(fatherName) => {
              setInfo({ ...info, fatherName });
            }}
            value={info.fatherName}
            helperText={errors.fatherName}
            error={errors.fatherName}
            onFocus={() => setErrors({ ...errors, fatherName: "" })}
          />
        </div>
        <div className="mt-4 px-0 mt-md-5 col-md-6 pr-md-3 pl-md-3">
          <p className="mb-2" style={{ color: "#0050FF", fontWeight: 500 }}>
            افزودن عکس کارت ملی*
          </p>
          <NationalCardImage
            removeFile={_removeFile}
            uploadFile={_uploadFile}
            cover={info?.nationalCardImg || ""}
            setCover={(img) => setInfo({ ...info, nationalCardImg: img })}
          />
          {errors.nationalCardImg ? (
            <p style={{ color: "red", fontSize: 12 }}>
              {errors.nationalCardImg}
            </p>
          ) : null}
        </div>
      </div>
      <div className="warning-box mt-5 p-3 d-flex align-items-center">
        <ReportProblemOutlinedIcon className="icon" />
        <span className="mr-2">
          ورود کامل و صحیح اطلاعات معتبر برای تایید اکانت و شروع فرآیند تهیه
          درگاه پرداخت ضروری است.
        </span>
      </div>
      <Button
        variant="contained"
        color="primary"
        className="w-100 mt-4 dashboard_buttons"
        size="large"
        onClick={submit}
      >
        ادامه
      </Button>
    </div>
  );
};

export default GeneralInfo;
