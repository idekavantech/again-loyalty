import Input from "@saas/components/Input";
import { Button } from "@material-ui/core";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

const ContactInfo = ({ submit, info, setInfo, errors, setErrors }) => {
  return (
    <div className="d-flex flex-wrap pt-md-2">
      <div className="mt-4 col-md-4 px-0 pr-md-0 pl-md-3">
        <Input
          numberOnly
          size="large"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="مثال: ۰۲۱۷۷۶۰۱۲۳۴"
          label="شماره تلفن ثابت"
          value={englishNumberToPersianNumber(info.phoneNumber, "")}
          onChange={(phoneNumber) => setInfo({ ...info, phoneNumber })}
          error={errors.phoneNumber}
          helperText={errors.phoneNumber}
          onFocus={() => setErrors({ ...errors, phoneNumber: "" })}
        />
      </div>
      <div className="mt-4 col-md-4 px-0 px-md-3">
        <Input
          size="large"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="مثال: maryamsalmani@gmail.com"
          label="آدرس ایمیل"
          value={info.email}
          onChange={(email) => setInfo({ ...info, email })}
          type="email"
          error={errors.email}
          helperText={errors.email}
          onFocus={() => setErrors({ ...errors, email: "" })}
        />
      </div>
      <div className="mt-4 col-md-4 px-0 pr-md-3">
        <Input
          numberOnly
          size="large"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="مثال: ۱۷۱۲۳۲۱۲۴۵"
          label="کد پستی"
          value={englishNumberToPersianNumber(info.postalCode, "")}
          onChange={(postalCode) => setInfo({ ...info, postalCode })}
          inputProps={{ maxlength: 10 }}
          error={errors.postalCode}
          helperText={errors.postalCode}
          onFocus={() => setErrors({ ...errors, postalCode: "" })}
        />
      </div>
      <div className="mt-4 col-md-4 px-0 pl-md-3 ">
        <Input
          size="large"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="مثال: تهران، خیابان آزادی، مرکز نوآوری شریف، ویترین"
          label="آدرس کسب‌وکار"
          multiline
          rows={2}
          maxRows={4}
          value={info.address}
          onChange={(address) => setInfo({ ...info, address })}
          error={errors.address}
          helperText={errors.address}
          onFocus={() => setErrors({ ...errors, address: "" })}
        />
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

export default ContactInfo;
