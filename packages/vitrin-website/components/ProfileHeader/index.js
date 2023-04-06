import React, { useState, useCallback } from "react";
import { LOGOUT, MY_PROFILE, VITRIN_TOKEN } from "utils/constants";
import { useRouter } from "next/router";
import DrawerMenu from "../../containers/DrawerMenu";
import Axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

const menuItems = [
  {
    id: 0,
    label: MY_PROFILE,
    image: "/images/profile-icon.svg",
    link: "/profile/me",
  },
  { id: 1, label: LOGOUT, image: "/images/logout-icon.svg", link: "/login" },
];
function ProfileHeader({ user }) {
  const [hasOpenMenu, setHasOpenMenu] = useState(false);
  const router = useRouter();
  const { maxWidth768 } = useResponsive();

  const [hasOpenDrawer, setHasOpenDrawer] = useState(false);
  const logout = useCallback(() => {
    Cookies.remove(VITRIN_TOKEN);
    delete Axios.defaults.headers.common.Authorization;
    window.location = "/";
  }, []);
  return (
    <div style={{ padding: "24px 0", borderBottom: "1px solid #E4E6E7" }}>
      <div className="container d-flex justify-content-between align-items-center position-relative">
        {maxWidth768 ? (
          <Image
            width={24}
            height={24}
            src="/images/extend-icon-gray.svg"
            onClick={() => setHasOpenDrawer(true)}
            alt="extend"
          />
        ) : (
          <div className="d-flex align-items-center">
            <div
              className="ml-4 d-flex  align-items-center position-relative cursorPointer"
              onClick={() => setHasOpenMenu(!hasOpenMenu)}
            >
              <Image
                height={24}
                width={24}
                src="/images/profile-icon.svg"
                alt="ویترین"
              />
              <span
                style={{
                  marginRight: 8,
                  color: "#000000",
                  fontSize: 14,
                  lineHeight: "20px",
                }}
              >
                {user?.name}
              </span>
              <Image
                width={24}
                height={24}
                className="mr-1"
                src="/images/arrow-bottom-icon.svg"
                alt="down"
              />
              {hasOpenMenu && (
                <div
                  className="px-4"
                  style={{
                    width: "max-content",
                    top: 32,
                    borderRadius: 8,
                    border: "1px solid #E4E6E7",
                    right: 0,
                    backgroundColor: "#fff",
                    position: "absolute",
                    zIndex: 1,
                  }}
                >
                  {menuItems.map((item, index) => (
                    <div
                      className="d-flex py-4 cursorPointer"
                      style={{ borderBottom: "1px solid #E4E6E7" }}
                      key={index}
                      onClick={() => {
                        item.id == 1 ? logout() : router.push(item.link);
                      }}
                    >
                      <div>
                        <Image
                          style={{ margin: index == "0" ? 2 : 0 }}
                          width={20}
                          height={20}
                          src={item.image}
                          alt="ویترین"
                        />
                      </div>
                      <span className="mr-2" style={{ fontSize: 14 }}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Link href="/profile">
              <span
                className="mr-4 cursorPointer"
                style={{ color: "#000000", fontSize: 14, lineHeight: "20px" }}
              >
                ویترین های من
              </span>
            </Link>
          </div>
        )}
        <div>
          <Link
            href="/"
            style={{
              position: "absolute",
              top: "50%",
              left: maxWidth768 ? "52px" : "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
              <Image
                width={maxWidth768 ? 64 : 108}
                height={maxWidth768 ? 21 : 36}
                className="cursorPointer"
                src="/images/vitrin-logo-blue.svg"
                alt="logo"
              />
          </Link>
        </div>

        {!maxWidth768 && (
          <Link href="/cr~templates">
            <button
              className="px-4 d-flex justify-content-between align-items-center"
              style={{
                backgroundColor: "#0050FF",
                color: "#fff",
                borderRadius: 8,
                height: 40,
                width: 175,
                fontSize: 14,
                lineHeight: "20px",
              }}
            >
              <Image height={24} width={24} src="/images/Add.svg" alt="add" />
              <span>ساخت ویترین جدید</span>
            </button>
          </Link>
        )}
      </div>
      <DrawerMenu
        isOpen={hasOpenDrawer}
        onClose={() => setHasOpenDrawer(false)}
        menuItems={menuItems}
      />
    </div>
  );
}

export default ProfileHeader;
