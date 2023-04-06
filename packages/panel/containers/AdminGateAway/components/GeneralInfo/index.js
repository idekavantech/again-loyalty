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
        Fill in the following information to build an account in Zebra.
      </p>
      <div className="d-flex flex-wrap">
        <div className="mt-4 col-md-4 px-0 pr-md-0 pl-md-3">
          <Input
            size="large"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Example: Mary"
            label="name"
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
            placeholder="Example: Taheri"
            label="last name"
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
            placeholder="Example: ۱۳۷۶/۱۲/۰۱"
            label={"Date of birth"}
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
            placeholder="Example: ۱۲۳۴۵۶۷۸۹۰"
            label="National Code"
            onChange={(nationalId) => {
              setInfo({ ...info, nationalId });
            }}
            value={englishNumberToPersianNumber(info.nationalId, "")}
            onBlur={() => {
              info.nationalId && info.nationalId.length < 10
                ? setErrors({
                    ...errors,
                    nationalId: "Code must be ten digits",
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
            placeholder="Example: Ali"
            label="father's name"
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
            Adding a national card photo*
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
          Full and correct login valid information to confirm your account and start the preparation process
          Payment Portal is essential.
        </span>
      </div>
      <Button
        variant="contained"
        color="primary"
        className="w-100 mt-4 dashboard_buttons"
        size="large"
        onClick={submit}
      >
        Continuation
      </Button>
    </div>
  );
};

export default GeneralInfo;
