import { Button } from "@material-ui/core";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
const ConfirmInfo = ({ submit }) => {
  return (
    <div>
      <p className="pt-3 mt-2">
        کارشناس تیم زیبال، برای هماهنگی جهت دریافت درگاه پرداخت بانکی با شما
        تماس خواهد گرفت. وضعیت اتصال به درگاه پرداخت زیبال را از طریق این بخش می
        توانید دنبال کنید.
      </p>
      <div className="success-box d-flex align-items-center">
        <CheckCircleOutlineOutlinedIcon className="icon" />
        <span className="mr-3">
          اطلاعات شما با موفقیت برای تیم زیبال ارسال شد.
        </span>
      </div>
      <Button
        variant="contained"
        color="primary"
        className="w-100 mt-4 dashboard_buttons"
        size="large"
        onClick={submit}
      >
        تایید
      </Button>
    </div>
  );
};

export default ConfirmInfo;
