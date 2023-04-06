/* eslint-disable @next/next/no-img-element */

import React, { memo, useState, useCallback } from "react";
import Drawer from "@material-ui/core/Drawer";
import MenuItems from "components/MenuItems";
import { makeSelectUser } from "stores/user/selector";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { connect } from "react-redux";
import Link from "next/link";
import FreeConsultationModal from "containers/FreeConsultationModal";
import Cookies from "js-cookie";
import { VITRIN_TOKEN } from "utils/constants";
import Axios from "axios";
import { useRouter } from "next/router";

function DrawerMenu({ isOpen, onClose, menuItems, user }) {
  const [isOpenConsultationModal, setIsOpenConsultationModal] = useState(false);
  const logout = useCallback(() => {
    Cookies.remove(VITRIN_TOKEN);
    delete Axios.defaults.headers.common.Authorization;
    window.location = "/";
  }, []);
  const handleClick = () => {
    user?.token ? logout() : setIsOpenConsultationModal(true);
  };

  const router = useRouter();
  return (
    <Drawer
      anchor="right"
      transitionDuration={300}
      open={isOpen}
      onClose={onClose}
      variant="temporary"
      elevation={0}
    >
      <div className={`d-flex`}>
        <div className="position-relative" style={{ width: 320 }}>
          <div>
            <img
              width={195}
              style={{ position: "absolute", left: 0, zIndex: -1 }}
              src="/images/background-menu-1.png"
              alt=""
            />
            <img
              alt=""
              width={142}
              style={{ position: "absolute", right: 0, top: 234, zIndex: -1 }}
              src="/images/background-menu-2.png"
            />
          </div>
          <div className="p-4" style={{ zIndex: 1 }}>
            <div className=" d-flex justify-content-between align-items-center">
              {user?.token ? (
                <div>
                  <Link passHref href="/profile">
                    <img width={20} src="/images/profile-icon.svg" alt="" />
                    <span
                      style={{
                        margin: "0 10px",
                        color: "#000000",
                        fontSize: 16,
                        lineHeight: "20px",
                        fontWeight: 600,
                      }}
                    >
                      {user?.name}
                    </span>
                  </Link>
                </div>
              ) : (
                <Link passHref href="/login">
                  <button
                    className="d-flex justify-content-around align-items-center px-4"
                    style={{
                      height: 40,
                      borderRadius: 8,
                      border: "1px solid #0050FF",
                      lineHeight: "20px",
                      fontSize: 15,
                      color: "#0050FF",
                      minWidth: 170,
                    }}
                  >
                    ورود به ویترین
                  </button>
                </Link>
              )}

              <img alt="" width={92} src="/images/vitrin-logo-blue.svg" />
            </div>
            <div style={{ marginTop: 48 }}>
              {router.asPath !== "/" && (
                <div className="px-4">
                  <div
                    className="py-4"
                    style={{ borderBottom: "1px solid #E4E6E7" }}
                  >
                    <Link href="/">
                      <div>خانه</div>
                    </Link>
                  </div>
                </div>
              )}

              {menuItems?.map((item) => (
                <div key={item.id} className="px-4">
                  <MenuItems menus={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 32, left: 16, right: 16 }}>
          <button
            style={{
              height: 52,
              borderRadius: 8,
              backgroundColor: "#0050FF",
              color: "#fff",
              width: "100%",
            }}
            onClick={handleClick}
          >
            {user?.token ? (
              <div>
                <img
                  width={24}
                  src="/images/logout-icon-blue.svg"
                  alt="logout"
                />{" "}
                <span className="mr-2">خروج از حساب</span>
              </div>
            ) : (
              " درخواست مشاوره رایگان"
            )}
          </button>
        </div>
      </div>
      <FreeConsultationModal
        isOpen={isOpenConsultationModal}
        onClose={() => setIsOpenConsultationModal(false)}
      />
    </Drawer>
  );
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(DrawerMenu);
