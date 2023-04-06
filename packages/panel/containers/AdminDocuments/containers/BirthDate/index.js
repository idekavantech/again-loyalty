import React, { memo, useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Head from "next/head";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import SingleDatePicker from "@saas/components/SingleDatePicker";
import { Button } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import Link from "next/dist/client/link";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { makeSelectBusiness } from "@saas/stores/business/selector";
import { updateBusiness } from "@saas/stores/business/actions";
import { useRouter } from "next/router";

const BirthDate = ({ adminUrlPrefix, business, _updateBusiness }) => {
  const [birthDate, setBirthDate] = useState(null);
  const desktopMatches = useMediaQuery("(min-width:768px)");
  const [userAge, setUserAge] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (birthDate) {
      getAge();
    }
  }, [birthDate]);

  const getAge = () => {
    const today = new Date();
    const birth_date = new Date(persianToEnglishNumber(birthDate));
    let age = today.getFullYear() - birth_date.getFullYear();
    let month = today.getMonth() - birth_date.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birth_date.getDate())) {
      age--;
    }
    setUserAge(age);
  };

  const submit = () => {
    _updateBusiness(
      {
        main_owner: {
          birth_date: persianToEnglishNumber(birthDate),
        },
      },
      "اطلاعات با موفقیت ذخیره شد",
      "خطا در ثبت اطلاعات",
      () =>
        router.push(
          `${adminUrlPrefix}documents/${userAge < 18 ? "setting" : "info"}`
        )
    );
  };
  return (
    <div className="container mb-5">
      <Head>
        <title>تنظیمات دامنه</title>
      </Head>
      <AdminBreadCrumb />
      <div className="col-12 mt-4 px-0">
        <Paper elevation={1} className="p-2 p-md-4">
          <p style={{ fontWeight: 600 }}>تاریخ تولد</p>
          <p
            style={{
              marginTop: 40,
              fontSize: 12,
              lineHeight: "22px",
              marginBottom: 20,
            }}
          >
            تاریخ تولد خود را مطابق شناسنامه وارد کنید.
          </p>
          <div
            className="mb-5"
            style={{ width: desktopMatches ? "50%" : "100%" }}
          >
            <SingleDatePicker
              inputProps={{
                style: {
                  height: 44,
                  padding: "0 14px",
                },
              }}
              selectedDate={birthDate}
              handleDateChange={(date) =>
                setBirthDate(date?.format("YYYY-MM-DD") || null)
              }
              placeholder="تاریخ تولد"
            />
          </div>
        </Paper>
        <div className="d-flex justify-content-end">
          <Button
            className=" mt-5"
            style={{ width: desktopMatches ? "auto" : "100%" }}
            variant="contained"
            color="primary"
            size="medium"
            disabled={!birthDate}
            onClick={submit}
          >
            تایید و ادامه
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  adminUrlPrefix: makeSelectAdminUrlPrefix(),
  business: makeSelectBusiness(),
});

function mapDispatchToProps(dispatch) {
  return {
    _updateBusiness: (data, successMessage, failMessage, callback) =>
      dispatch(updateBusiness(data, successMessage, failMessage, callback)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withConnect)(BirthDate);
