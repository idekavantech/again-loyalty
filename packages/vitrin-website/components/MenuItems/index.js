import MenuItem from "@material-ui/core/MenuItem";
import React, { useCallback } from "react";
import Menu from "@material-ui/core/Menu";
import Link from "next/link";
import { memo, useState } from "react";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { Collapse } from "react-collapse";
import Image from "next/image";
import { LOGOUT, VITRIN_TOKEN } from "utils/constants";
import Axios from "axios";
import Cookies from "js-cookie";
const MenuItems = ({ menus }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const { maxWidth768 } = useResponsive();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = useCallback(() => {
    Cookies.remove(VITRIN_TOKEN);
    delete Axios.defaults.headers.common.Authorization;
    window.location = "/";
  }, []);

  return maxWidth768 ? (
    <div>
      <div
        className="py-4 w-100 d-flex justify-content-between"
        onClick={() => setOpenMenu(!openMenu)}
        style={{ borderBottom: "1px solid #E4E6E7" }}
      >
        {menus.hasOwnProperty("subMenu") ? (
          <div>{menus.label}</div>
        ) : menus.label == LOGOUT ? (
          <div onClick={logout}>
            <div>{menus.label}</div>
          </div>
        ) : (
          <Link passHref href={menus.link}>
            <div>{menus.label}</div>
          </Link>
        )}
        {menus.hasOwnProperty("subMenu") && (
          <div
            style={{
              cursor: "pointer",
              transform: openMenu ? "rotate(180deg)" : "rotate(0deg)",
              transition: "0.5s all",
              width: 12,
              height: 12,
            }}
          >
            <Image
              layout="fill"
              src="/images/arrow-bottom-icon-blue.svg"
              alt="arrow"
            />
          </div>
        )}
      </div>

      <Collapse isOpened={openMenu}>
        <ul>
          {menus.subMenu?.map(({ label, link, id }) => (
            <li className="py-3" key={id}>
              <Link href={link}>{label}</Link>
            </li>
          ))}
        </ul>
      </Collapse>
    </div>
  ) : (
    <div>
      {menus.hasOwnProperty("subMenu") ? (
        <div>
          <button onClick={handleClick} className="d-flex align-items-center">
            {menus.label} <KeyboardArrowDownIcon style={{ marginRight: 12 }} />{" "}
          </button>
        </div>
      ) : (
        <Link className="mx-4" href={menus.link}>
          {menus.label}
        </Link>
      )}

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{ top: 40 }}
      >
        {menus.subMenu?.map(({ label, link, id }) => (
          <Link href={link} key={id}>
            <MenuItem>{label}</MenuItem>
          </Link>
        ))}
      </Menu>
    </div>
  );
};

export default memo(MenuItems);
