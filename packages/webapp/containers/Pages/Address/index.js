import React, { memo, useState, useEffect } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import Paper from "@material-ui/core/Paper";
import { night, pollution } from "@saas/utils/colors";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import IconButton from "@material-ui/core/IconButton";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { makeSelectAddresses } from "@saas/stores/user/selector";
import { deleteAddress, getAddresses } from "@saas/stores/user/actions";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import { makeSelectBusinessThemeColor } from "@saas/stores/business/selector";
import { makeSelectUrlPrefix } from "@saas/stores/plugins/selector";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
function Addresses({
  addresses,
  _deleteAddress,
  themeColor,
  urlPrefix,
  getUserAddressesList,
}) {
  const { minWidth768 } = useResponsive();
  const [addressId, setAddressId] = useState(0);
  const router = useRouter();
  const currentRout = router.asPath;
  useEffect(() => {
    setTimeout(() => {
      getUserAddressesList();
    }, 0);
  }, []);
  return (
    <div
      className={`d-flex flex-column flex-md-row py-2 py-md-4 ${
        minWidth768 ? " container " : ""
      }`}
    >
      <div className="col-12">
        <Paper elevation={1} className="p-4 d-flex flex-wrap">
          <div
            style={{
              border: `1px dashed ${themeColor} `,
              borderRadius: 8,
              width: minWidth768 ? 190 : "100%",
              height: minWidth768 ? 220 : 36,
            }}
            className="d-flex flex-md-column justify-content-md-center align-items-center u-cursor-pointer ml-0 ml-md-4 mb-3"
            onClick={() =>
              router.push(`${urlPrefix}/profile/address?url=${currentRout}`)
            }
          >
            <AddRoundedIcon color="secondary" className="mx-2 mx-md-0" />
            <div style={{ color: themeColor }} className="u-fontMedium mt-md-3">
              افزودن آدرس جدید
            </div>
          </div>
          {minWidth768 && addresses
            ? addresses.map((address) => (
                <div
                  style={{
                    border: "1px solid #E0E5E8",
                    borderRadius: 8,
                    width: 190,
                    height: 220,
                  }}
                  className="d-flex flex-column ml-4 mb-3"
                  key={`address-${address.id}`}
                >
                  <div className="d-flex flex-column justify-content-between h-100 p-2">
                    <div className="u-fontMedium" style={{ color: night }}>
                      {address.title}
                    </div>
                    <div className="u-fontMedium" style={{ color: night }}>
                      {address.full_address}
                    </div>
                    <div style={{ color: pollution }} className="u-fontNormal">
                      <div>{address.name}</div>
                      <div className="mt-1">
                        {address.phone?.replace("+98", "0")}
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-end">
                      <div
                        onClick={() =>
                          router.push(
                            `${urlPrefix}/profile/address?address=${address.id}&url=${currentRout}`
                          )
                        }
                      >
                        <IconButton className="p-1">
                          <EditRoundedIcon color="secondary" fontSize="small" />
                        </IconButton>
                      </div>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setAddressId(address.id);
                        }}
                      >
                        <IconButton className="p-1">
                          <DeleteRoundedIcon
                            color="secondary"
                            fontSize="small"
                          />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : !minWidth768 && addresses
            ? addresses.map((address) => (
                <div
                  style={{
                    border: "1px solid #E0E5E8",
                    borderRadius: 8,
                  }}
                  className="d-flex flex-column mb-3 w-100"
                  key={`address-${address.id}`}
                >
                  <div className="d-flex flex-column h-100 p-2">
                    <div className="u-fontMedium" style={{ color: night }}>
                      {address.title}
                    </div>
                    <div className="u-fontMedium" style={{ color: night }}>
                      {address.full_address}
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div
                        style={{ color: pollution }}
                        className="d-flex align-items-center u-fontNormal"
                      >
                        <div className="ml-1">{address.name}</div>
                        <div>-{address.phone?.replace("+98", "0")}</div>
                      </div>
                      <div className="d-flex align-items-center justify-content-end">
                        <div
                          onClick={() =>
                            router.push(
                              `${urlPrefix}/profile/address?address=${address.id}&url=${currentRout}`
                            )
                          }
                        >
                          <IconButton className="p-1">
                            <EditRoundedIcon
                              color="secondary"
                              fontSize="small"
                            />
                          </IconButton>
                        </div>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            setAddressId(address.id);
                          }}
                        >
                          <IconButton className="p-1">
                            <DeleteRoundedIcon
                              color="secondary"
                              fontSize="small"
                            />
                          </IconButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : null}
          {addressId ? (
            <Dialog
              open
              onClose={() => setAddressId(0)}
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  آیا مطمئن هستید که می‌خواهید آدرس ذخیره‌شده‌ی خود را حذف کنید؟
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button color="disabled" onClick={() => setAddressId(0)}>
                  انصراف
                </Button>
                <Button
                  color="secondary"
                  onClick={() => {
                    _deleteAddress(addressId);
                    setAddressId(0);
                  }}
                >
                  حذف
                </Button>
              </DialogActions>
            </Dialog>
          ) : null}
        </Paper>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  addresses: makeSelectAddresses(),
  themeColor: makeSelectBusinessThemeColor(),
  urlPrefix: makeSelectUrlPrefix(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getUserAddressesList: () => dispatch(getAddresses()),
    _deleteAddress: (id) => dispatch(deleteAddress(id)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(Addresses);
