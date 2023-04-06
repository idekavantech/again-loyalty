import Input from "@saas/components/Input";
import { Button } from "@material-ui/core";
import Link from "next/link";
import InputAdornment from "@material-ui/core/InputAdornment";

const FinancialInfo = ({ submit, info, setInfo, errors, setErrors }) => {
  return (
    <div>
      <p className="pt-3 mt-2">
        Enter the account number you want to connect to your payment gateway.
      </p>
      <p className="pt-3 mt-2" style={{ fontSize: 16 }}>
        financial information
      </p>
      <div className="mt-4 mt-md-5 col-md-4 px-0">
        <Input
          size="large"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{ style: { direction: "ltr" }, maxlength: 24 }}
          value={info.bank_acount_number}
          onChange={(bank_acount_number) => {
            if (bank_acount_number.includes("IR")) {
              setInfo({
                ...info,
                bank_acount_number: bank_acount_number.split("IR")[1],
              });
            } else {
              setInfo({ ...info, bank_acount_number });
            }
          }}
          label="Shaba number"
          InputProps={{
            endAdornment: <InputAdornment position="end">IR</InputAdornment>,
          }}
          onFocus={() => setErrors({ ...errors, bank_acount_number: "" })}
          error={errors.bank_acount_number}
          helperText={
            errors.bank_acount_number ||
            ` Enter a 2 -digit night number to connect the port to the desired account number
          do.`
          }
        />
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

export default FinancialInfo;
