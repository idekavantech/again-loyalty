import React, { memo, useEffect, useState } from "react";
import { createStructuredSelector } from "reselect";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { makeSelectBranches } from "@saas/stores/business/selector";
import { createPosUser, deletePosUser, updatePosUser } from "store/actions";
import { connect } from "react-redux";
import { compose } from "redux";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import Input from "@saas/components/Input";
import { border } from "@saas/utils/colors";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import PosUserItem from "containers/AdminPOS/containers/PosUsers/PosUserItem";
import Button from "@material-ui/core/Button";

function PosUsers({
  user,
  _updatePosUser,
  _deletePosUser,
  _createPosUser,
  device,
  deviceId,
  phone,
  setPhone,
  phoneError,
  setPhoneError,
  name,
  setName,
}) {
  const [newUsers, setNewUsers] = useState([]);
  useEffect(() => {
    if (user) {
      if (user.user) setPhone(user.user.phone_zero_starts);
      setName(user.user_name);
    }
  }, [user]);

  return (
    <div style={{ borderTop: `1px solid ${border.subdued}` }}>
      <Paper elevation={2} className="my-4 py-4">
        <div className="col-12 mb-3">
          <div className="mb-2 u-fontLarge u-fontWeightHeavy">Definition of the user</div>
          <div className="mb-4">
            To use the device, to the number of people using the device,
            Need an account on that device. You can
            Manage the operation of each user on the device through his account.
          </div>
          <Divider />
        </div>
        {deviceId ? (
          <>
            {[...device.pos_users, ...newUsers].map((user) => (
              <PosUserItem
                key={`user-${user.id}`}
                _createPosUser={_createPosUser}
                _updatePosUser={_updatePosUser}
                _deletePosUser={_deletePosUser}
                user={user}
                deviceId={deviceId}
                clearNewUsers={() => setNewUsers([])}
              />
            ))}
            {!newUsers.length ? (
              <div className="px-3">
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                    setNewUsers([{}]);
                  }}
                  className="u-dashed-border d-flex mt-4 mb-2 align-items-center px-3"
                  fullWidth
                >
                  <IconButton size="small">
                    <AddCircleOutlineIcon color="primary" />
                  </IconButton>

                  <span
                    className="u-fontMedium u-cursor-pointer"
                    style={{ color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR }}
                  >
                    Add new user
                  </span>
                </Button>
              </div>
            ) : null}
          </>
        ) : (
          <div className="d-flex flex-wrap">
            <div className="col-12 mt-4 col-lg-6">
              <Input
                labelPlacement="top"
                label="user name"
                value={name}
                onChange={setName}
                size="medium"
              />
            </div>
            <div className="col-12 mt-4 col-lg-6">
              <Input
                label="User phone number"
                helperText={phoneError}
                labelPlacement="top"
                numberOnly
                error={Boolean(phoneError)}
                type="tel"
                value={englishNumberToPersianNumber(phone, "")}
                onChange={(value) => {
                  setPhoneError("");
                  setPhone(persianToEnglishNumber(value));
                }}
                size="medium"
              />
            </div>
          </div>
        )}
      </Paper>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  branches: makeSelectBranches(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    _updatePosUser: (licence, id, data, callback) =>
      dispatch(updatePosUser(licence, id, data, callback)),
    _deletePosUser: (licence, id, callback) =>
      dispatch(deletePosUser(licence, id, callback)),
    _createPosUser: (licence, data, callback) =>
      dispatch(createPosUser(licence, data, callback)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(PosUsers);
