/* eslint-disable @next/next/no-img-element */
import React, { memo, useState, useEffect } from "react";
import Footer from "components/Footer";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import DrawerMenu from "../DrawerMenu";
import ProfileHeader from "../../components/ProfileHeader";
import Skeleton from "@material-ui/lab/Skeleton";
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { makeSelectUser } from "stores/user/selector";
import { getUserBusinesses } from "stores/global/actions";
import { makeSelectBusinesses } from "stores/global/selector";
import { useRouter } from "next/router";
import Image from "next/image";
import { getAdminUrl } from "@saas/utils/helpers/getAdminUrl";

const ProfilePage = ({ businesses, _getUserBusinesses, user }) => {
  const { maxWidth768 } = useResponsive();
  const [hasOpenDrawer, setHasOpenDrawer] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      _getUserBusinesses();
    }, 0);
  }, []);

  return (
    <div>
      <ProfileHeader user={user} />
      <div className="container">
        <p
          style={{
            color: "#000000",
            fontSize: 20,
            lineHeight: "28px",
            marginTop: 40,
            display: "flex",
            justifyContent: maxWidth768 ? "space-between" : "start",
          }}
        >
          <span> ویترین‌های من</span>
          {maxWidth768 && (
            <button
              className="px-2 px-md-4 d-flex justify-content-between align-items-center"
              style={{
                backgroundColor: "#0050FF",
                color: "#fff",
                borderRadius: 8,
                height: 40,
                width: 167,
                fontSize: 14,
                lineHeight: "20px",
              }}
              onClick={() => router.push("/cr~templates")}
            >
              <div className="d-flex justify-content-center align-items-center">
                <Image height={24} width={24} src="/images/Add.svg" alt="" />
              </div>

              <span>ساخت ویترین جدید</span>
            </button>
          )}
        </p>
        <div
          style={{
            paddingTop: 24,
            display: "grid",
            gridTemplateColumns: maxWidth768
              ? "repeat(1, 1fr)"
              : "repeat(4, 1fr)",
            gridGap: maxWidth768 ? "24px" : "64px 32px",
          }}
        >
          {businesses?.map((business, index) => (
            <div
              key={index}
              className="d-flex align-items-end"
              style={{
                background: ` url(${business?.main_image_url})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",

                borderRadius: 16,
              }}
            >
              <div
                className="p-4 d-flex  flex-column align-items-center justify-content-between"
                style={{
                  width: "100%",
                  height: 106,
                  borderRadius: 16,
                  marginTop: "70%",
                  backgroundColor: "rgba(240, 240, 240, 0.64)",
                  boxShadow: "0px -2px 8px rgba(0, 0, 0, 0.25)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <p style={{ color: "#202223", fontWeight: 600 }}>
                  {business?.title}{" "}
                </p>
                <button
                  style={{
                    backgroundColor: "#0050FF",
                    borderRadius: 8,
                    color: "#fff",
                    height: 40,
                    width: "100%",
                    fontSize: 14,
                  }}
                  onClick={() =>
                    business?.site_domain
                      ? (window.location = `${getAdminUrl(business)}?token=${
                          user.token
                        }`)
                      : null
                  }
                >
                  پنل مدیریت
                </button>
              </div>
            </div>
          )) ||
            [1, 2, 3, 4].map((item) => (
              <div key={item}>
                <Skeleton
                  className="radius-16"
                  variant="rect"
                  animation="wave"
                  width="100%"
                  height={300}
                ></Skeleton>
              </div>
            ))}
        </div>
      </div>
      <DrawerMenu
        isOpen={hasOpenDrawer}
        onClose={() => setHasOpenDrawer(false)}
        isLogin
      />
      <Footer />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  businesses: makeSelectBusinesses(),
  user: makeSelectUser(),
});
function mapDispatchToProps(dispatch) {
  return {
    _getUserBusinesses: () => dispatch(getUserBusinesses()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ProfilePage);
