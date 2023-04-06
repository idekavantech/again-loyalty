import React from "react";

import { white } from "@saas/utils/colors";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import IconButton from "@material-ui/core/IconButton";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import CloseIcon from "@material-ui/icons/Close";

export default function SelectAddressModal({
  isOpen,
  closeModalHandler,
  isMobile,
  isTablet,
  addNewAddress,
  userAddresses,
  selectAddress,
  selectedAddress,
  editAddress,
  deleteAddress,
}) {
  return (
    <Modal open={isOpen} onClose={closeModalHandler}>
      <Paper
        style={{
          height: isMobile ? 560 : "80vh",
          width: isTablet ? "85vw" : isMobile ? 912 : "90vw",
          backgroundColor: white,
          borderRadius: 8,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "black",
          padding: isMobile ? 21 : 24,
          color: "#202223",
          overflowY: "auto",
        }}
        className={`${isMobile ? "scrollbar" : ""}`}
      >
        <div
          className="d-flex align-items-center pb-5"
          style={{ borderBottom: "1px solid #E4E6E7" }}
        >
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ width: 24, height: 24 }}
          >
            <button
              style={{ width: 24, height: 24 }}
              onClick={closeModalHandler}
            >
              <CloseIcon
                style={{ fontSize: 24, color: "rgba(0, 0, 0, 0.54" }}
              />
            </button>
          </div>

          <div
            className="mr-5"
            style={{
              fontSize: isMobile ? 15 : 16,
              fontWeight: 600,
            }}
          >
            انتخاب آدرس
          </div>
        </div>

        {selectedAddress ? (
          <div
            className="py-5 d-flex align-items-center justify-content-start"
            style={{ borderBottom: "1px solid #E4E6E7" }}
          >
            <div className="d-flex align-items-center justify-content-center">
              <svg
                width="16"
                height="21"
                viewBox="0 0 16 22"
                fill="#5C5F62"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 0.899902C3.58871 0.899902 0 4.50672 0 8.94029C0 12.1314 3.96188 17.7842 6.32376 20.8703C6.72706 21.3977 7.33835 21.6999 8 21.6999C8.66165 21.6999 9.27294 21.3977 9.67624 20.8703C12.0381 17.7842 16 12.1314 16 8.94029C16 4.50672 12.4113 0.899902 8 0.899902ZM11.2941 11.7781C11.2941 12.0391 11.0833 12.251 10.8235 12.251H9.41177C9.152 12.251 8.94118 12.0391 8.94118 11.7781V9.88621C8.94118 9.62514 8.73035 9.41325 8.47059 9.41325H7.52941C7.26965 9.41325 7.05882 9.62514 7.05882 9.88621V11.7781C7.05882 12.0391 6.848 12.251 6.58824 12.251H5.17647C4.91671 12.251 4.70588 12.0391 4.70588 11.7781V8.0951C4.70588 7.80517 4.83812 7.53133 5.06447 7.35207L7.70306 5.26299C7.87718 5.12489 8.12282 5.12489 8.29694 5.26299L10.9355 7.35207C11.1619 7.53133 11.2941 7.80517 11.2941 8.0951V11.7781Z"
                  fill="##5C5F62"
                />
              </svg>
            </div>
            <div className="d-flex flex-column w-100 mr-3">
              <div className="mb-2" style={{ fontSize: 12, fontWeight: 600 }}>
                ارسال به:
              </div>
              <div style={{ fontSize: 14, fontWeight: 400 }}>
                {selectedAddress.address}
              </div>
            </div>
          </div>
        ) : null}
        <div>
          <div
            className="pt-5 pb-3 d-flex align-items-center justify-content-between u-cursor-pointer checkout-collapse"
            onClick={addNewAddress}
          >
            <div className="d-flex align-items-center">
              <AddRoundedIcon
                color="secondary"
                style={{ fontSize: 24 }}
                className="ml-2"
              />
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                افزودن آدرس جدید
              </div>
            </div>
          </div>
        </div>
        {userAddresses?.map((address, index) => (
          <div
            key={address.id}
            style={{
              borderBottom:
                index === userAddresses.length - 1 ? "" : "1px solid #E4E6E7",
            }}
            className="d-flex align-items-center justify-content-between w-100 py-4 "
          >
            <div
              style={{
                paddingRight: 32,
                cursor: "pointer",
              }}
              className="d-flex flex-column w-100 position-relative"
              onClick={() => {
                if (address) {
                  selectAddress(address);
                }
                return null;
              }}
            >
              {address?.title?.length ? (
                <div className="mb-2" style={{ fontSize: 12, fontWeight: 600 }}>
                  {address.title}:
                </div>
              ) : null}
              <div style={{ fontSize: 14, fontWeight: 400 }}>
                {address.full_address}
              </div>
              {selectedAddress && address.id === selectedAddress.id ? (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: 0,
                    transform: "translateY(-50%)",
                  }}
                >
                  <CheckRoundedIcon
                    color="secondary"
                    style={{ fontSize: 24 }}
                  />
                </div>
              ) : null}
            </div>
            <div className="mr-2 d-flex justify-content-end">
              <IconButton
                onClick={() => {
                  editAddress(address);
                }}
                style={{ padding: 0 }}
                className="p-2"
              >
                <CreateRoundedIcon color="secondary" style={{ fontSize: 24 }} />
              </IconButton>
              <IconButton
                onClick={() => deleteAddress(address)}
                style={{ padding: 0 }}
                className="p-2"
              >
                <DeleteRoundedIcon style={{ fontSize: 24 }} color="secondary" />
              </IconButton>
            </div>
          </div>
        ))}
      </Paper>
    </Modal>
  );
}
