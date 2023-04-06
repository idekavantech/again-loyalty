/* eslint-disable @next/next/no-img-element */
import { useState, memo } from "react";
import DrawerMenu from "../../containers/DrawerMenu";
import Image from "next/image";
import Link from "next/link";
import { headerMenus } from "./constants";
import MenuItems from "components/MenuItems";
import uniqueId from "lodash/uniqueId";
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { makeSelectUser } from "stores/user/selector";

const pricingMenu = {
  id: uniqueId(),
  label: "تعرفه",
  link: "/pricing",
};

function Header({ isDark, isTransparent, user }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* (Mobile) */}
      <div
        className="d-flex d-md-none"
        style={{
          width: "100%",
          fontFamily: "dana",
          backgroundColor: isDark ? "#1690d4" : "#ffffff",
          color: isTransparent ? "#202223" : "#fff",
          height: 56,
          fontSize: 20,
          position: "static",
          zIndex: 1,
        }}
      >
        <div className="container w-100 d-flex justify-content-between align-self-center position-relative align-items-center">
          <div
            style={{ flex: 1 }}
            className="d-flex justify-content-start align-items-center"
          >
            <Image
              width={24}
              height={24}
              src={
                isTransparent
                  ? "/images/Menu Hamburger.svg"
                  : "/images/Menu Hamburger.svg"
              }
              onClick={() => setIsOpen(true)}
              alt="menu"
              priority
            />
          </div>

          <div
            className="position-absolute"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className={`d-flex align-items-center`}>
              <Image
                height={21}
                width={64}
                src={
                  isTransparent
                    ? "/images/vitrin-logo-blue.svg"
                    : "/images/vitrin-logo.svg"
                }
                alt="logo"
                priority
              />
            </div>
          </div>
          <div
            className="d-flex align-items-center justify-content-end"
            style={{ flex: 1 }}
          >
            <Link
              passHref
              href={user?.token ? "/profile" : "/login"}
              className={`d-flex align-items-center justify-content-center px-2`}
            >
              ویترین من
            </Link>
          </div>
          <DrawerMenu
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            menuItems={[...headerMenus, pricingMenu]}
          />
        </div>
      </div>
      {/* (Desktop) */}
      <div
        className="d-none d-md-flex"
        style={{
          width: "100%",

          fontFamily: "dana",
          backgroundColor: isDark ? "#1690d4" : "#ffffff",
          color: isTransparent ? "#202223" : "#fff",
          height: 68,
          fontSize: 20,
          position: "fixed",
          zIndex: 1,
        }}
      >
        <div className="container w-100 d-flex justify-content-between align-self-center position-relative align-items-center">
          <div className="d-flex align-items-center">
            {headerMenus.map((item) => (
              <div key={item.id} className="px-4">
                <MenuItems menus={item} isTransparent={isTransparent} />
              </div>
            ))}
          </div>

          <div
            className="position-absolute"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Link className={`d-flex align-items-center`} href="/">
              <Image
                height={36}
                width={108}
                src={
                  isTransparent
                    ? "/images/vitrin-logo-blue.svg"
                    : "/images/vitrin-logo.svg"
                }
                alt="logo"
                priority
              />
            </Link>
          </div>
          <div
            className="d-flex align-items-center justify-content-end"
            style={{ flex: 1 }}
          >
            <MenuItems menus={pricingMenu} />
            <Link
              passHref
              href={user?.token ? "/profile" : "/login"}
              className={`d-flex align-items-center justify-content-center px-2 mr-2`}
            >
              ویترین من
            </Link>
          </div>
          <DrawerMenu
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            menuItems={[...headerMenus, pricingMenu]}
          />
        </div>
      </div>
    </div>
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

export default compose(withConnect, memo)(Header);
