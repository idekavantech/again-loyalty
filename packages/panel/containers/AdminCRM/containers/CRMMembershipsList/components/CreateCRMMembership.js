/**
 *
 * Modal
 *
 */

import React, { memo } from "react";
import MaterialModal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import CloseIcon from "@material-ui/icons/Close";

import Button from "@material-ui/core/Button";
import Input from "@saas/components/Input";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import  ListItemText  from "@material-ui/core/ListItemText";

function CreateCRMMembership({
  createCRMMembership,
  isSubmitButtonDisabled,
  closeCreateCRMMembershipModal,
  isOpen,
  CRMMembershipData,
  onCRMMembershipNameChange,
  onCRMMembershipPhoneChange,
  handleCRMLabelClick , 
  handleCRMLabelItemClick,
  labels
}) {

  return (
    <MaterialModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      className={"d-flex align-items-center"}
    >
      <div className="walletChargeModalContainer">
        <Fade in={isOpen}>
          <Paper
            elevation={3}
            className={`mx-auto  overflow-hidden c-modal-box d-flex flex-column col-md-5 p-5 col-11 py-5`}
            style={{ backgroundColor: "#fff", height: "auto" }}
          >
            <div
              style={{ cursor: "pointer", lineHeight: 0.5, marginBottom: 24 }}
              className="d-flex justify-content-between align-items-center position-relative mb-5"
              onClick={closeCreateCRMMembershipModal}
            >
              <p style={{ fontSize: 16, fontWeight: 600 }}>Making a new customer</p>
              <CloseIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 12, fontWeight: 600 }} className="mb-2">
                Full name 
              </p>
              <Input
                className="customInput"
                required={true}
                type="text"
                onChange={onCRMMembershipNameChange}
                value={
                  CRMMembershipData?.name
                    ? englishNumberToPersianNumber(CRMMembershipData?.name)
                    : ""
                }
              />
            </div>
            <div style={{ marginBottom: 32 }}>
              <p style={{ fontSize: 12, fontWeight: 600 }} className="mb-2">
                phone number{" "}
              </p>
              <Input
                className="customInput"
                selectOnFocus
                value={
                  CRMMembershipData?.user?.phone
                    ? englishNumberToPersianNumber(
                        CRMMembershipData?.user?.phone
                      )
                    : ""
                }
                onChange={onCRMMembershipPhoneChange}
                numberOnly
              />
            </div>
            <div style={{ marginBottom: 32 }}>
              <p style={{ fontSize: 12, fontWeight: 600 }} className="mb-2">
                 Label
              </p>
              <Select
                  className="w-100 mb-3"
                  style={{
                    minWidth: 150,
                    flex: 1,
                    borderRadius: 8,
                    height: 44,
                  }}
                  value={CRMMembershipData?.labels || []}
                  multiple
                  margin="dense"
                  variant="outlined"
                  displayEmpty
                  size="large"
                  renderValue={() => {
                    if (CRMMembershipData?.labels?.length === 0)
                      return "";
                    if (
                      CRMMembershipData?.labels?.length === 1 &&
                      CRMMembershipData?.labels[0]
                    )
                      return labels?.find(
                        (level) =>
                          level?.id === CRMMembershipData?.labels[0]
                      )?.title;
                    if (
                      CRMMembershipData?.labels?.length ===
                      labels?.length
                    )
                      return "All tags";
                    return `${englishNumberToPersianNumber(
                      CRMMembershipData?.labels?.length
                    )} Label`;
                  }}
                  MenuProps={{
                    getContentAnchorEl: null,
                    style: { maxHeight: 500 },
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "center",
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "center",
                    },
                    variant: "menu",
                  }}
                >
                  <MenuItem className="px-2">
                    <div
                      className="w-100 d-flex align-items-center"
                     onClick={  handleCRMLabelClick }
                    >
                      <Checkbox
                        className="p-1"
                        size="small"
                        indeterminate={
                          CRMMembershipData?.labels?.length !==
                            labels?.length &&
                          CRMMembershipData?.labels?.length
                        }
                        onChange={(e) => {
                          e.preventDefault();
                        }}
                        color="primary"
                        checked={
                          CRMMembershipData?.labels?.length ===
                          labels?.length
                        }
                      />
                      <ListItemText
                        primary="Choose all tags"
                        className="text-right"
                      />
                    </div>
                  </MenuItem>
                  {labels?.map((label) => {
                    return (
                      <MenuItem
                        className="px-2"
                        key={label?.title}
                        value={label?.id}
                      >
                        <div
                          className="w-100 d-flex align-items-center"
                          onClick={(e) => handleCRMLabelItemClick(e, label)}
                        >
                          <Checkbox
                            className="p-1"
                            size="small"
                            onChange={(e) => {
                              e.preventDefault();
                            }}
                            color="primary"
                            checked={CRMMembershipData?.labels?.includes(
                              label?.id
                            )}
                          />
                          <ListItemText
                            primary={label?.title}
                            className="text-right"
                          />
                        </div>
                      </MenuItem>
                    );
                  })}
                </Select>
            </div>
            <div className="d-flex justify-content-end">
              <Button
                              variant="contained"
                className="py-2 px-4 ml-4"
                onClick={closeCreateCRMMembershipModal}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                variant="contained"
                className="py-2 px-4"
                onClick={createCRMMembership}
                disabled={isSubmitButtonDisabled}
              >
                Create
              </Button>
            </div>
          </Paper>
        </Fade>
      </div>
    </MaterialModal>
  );
}

export default memo(CreateCRMMembership);
