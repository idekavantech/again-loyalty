import React, { useState } from "react";
import Link from "next/link";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Skeleton from "@material-ui/lab/Skeleton";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizRoundedIcon from "@material-ui/icons/MoreHorizRounded";
import MenuItem from "@material-ui/core/MenuItem";
import { graphite } from "@saas/utils/colors";
import Menu from "@material-ui/core/Menu";
import PopUp from "@saas/components/PopUp";
import Divider from "@material-ui/core/Divider";

export default function AdminVendorTableRow({
  vendor,
  urlPrefix,
  pluginUrl,
  isLoading,
  _updateAdminVendor,
  _getVendors,
}) {
  const { id, name, phone, email, is_active } = vendor;
  const isMock = !id;
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDialogBoxOpen, setDialogBox] = useState(false);

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          button
          className="d-flex align-items-center"
          style={{ color: graphite }}
          onClick={() => {
            setAnchorEl(null);
            setDialogBox(true);
          }}
        >
          <div>{is_active ? "to deactivate" : "Activate"}</div>
        </MenuItem>
      </Menu>

      <Link href={`${urlPrefix}${pluginUrl}/vendors/${id}`} passHref>
        <TableRow
          component="a"
          onClick={() => {}}
          className={isLoading ? "u-pointer-events-none" : "u-cursor-pointer"}
          hover
          key={id}
        >
          <TableCell style={{ width: "99%" }} scope="row" align="right">
            {isMock ? <Skeleton style={{ width: 150 }} /> : name}
          </TableCell>
          <TableCell align="right">
            {isMock ? <Skeleton style={{ width: 150 }} /> : phone}
          </TableCell>
          <TableCell align="right">
            {isMock ? <Skeleton style={{ width: 150 }} /> : email}
          </TableCell>
          <TableCell
            onClick={(e) => {
              e.preventDefault();
            }}
            align="right"
          >
            <IconButton
              onClick={(e) => setAnchorEl(e.currentTarget)}
              color="primary"
              className=""
            >
              <MoreHorizRoundedIcon fontSize="small" />
            </IconButton>
          </TableCell>
        </TableRow>
      </Link>
      <Divider />
      <PopUp
        open={isDialogBoxOpen}
        onClose={() => setDialogBox(false)}
        text={`Are you willing to${
          vendor?.is_active ? "Inactive" : "active"
        } Are you a supplier?`}
        submitText={vendor?.is_active ? "to deactivate" : "Activate"}
        closeText="Cancel"
        onSubmit={() => {
          setDialogBox(false);
          _updateAdminVendor(
            vendor.id,
            { is_active: !vendor?.is_active },
            _getVendors
          );
        }}
      />
    </>
  );
}
