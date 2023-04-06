import React, { memo, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import Input from "@saas/components/Input";
import { night } from "@saas/utils/colors";
import useTheme from "@material-ui/core/styles/useTheme";
import Checkbox from "@material-ui/core/Checkbox";
import TabContext from "@material-ui/lab/TabContext";
import TabPanel from "@material-ui/lab/TabPanel";
import { useRouter } from "next/router";
import Skeleton from "@material-ui/lab/Skeleton";
import { ellipseText } from "@saas/utils/helpers/ellipseText";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import DialogTitle from "@material-ui/core/DialogTitle";

let timeoutId = null;
const SELECT_LABEL = "select_label";

export function SelectLabelmodal({
  isOpen,
  onClose,
  isLoading,
  labels,
  loading,
  selectedLabels,
  setSelectedLabels,
}) {
  const [tabValue, setTabValue] = useState(SELECT_LABEL);
  const [searchValue, setSearchValue] = useState("");
  const theme = useTheme();
  const router = useRouter();
  useEffect(() => {
    if (!isOpen) {
      setSearchValue("");
      setTabValue(SELECT_LABEL);
      router.push({
        pathname: router.pathname,
        query: { ...router.query, search: "" },
      });
    }
  }, [isOpen]);
  const onLabelClick = (label, label_id) => {
    const _selectedLabels = { ...selectedLabels };
    const isLabelSelected = label_id in _selectedLabels;
    if (isLabelSelected) {
      delete _selectedLabels[label_id];
    } else {
      _selectedLabels[label_id] = label;
    }
    setSelectedLabels({ ..._selectedLabels });
  };

  const modalProductSearchExistance = {
    [SELECT_LABEL]: (
      <div className="p-4">
        <Input
          size="small"
          value={searchValue}
          onChange={(value) => {
            setSearchValue(value);
            clearTimeout(timeoutId);
            const query = { ...router.query };
            delete query.search;
            if (value) {
              query.search = value;
            }
            timeoutId = setTimeout(() => {
              router.push({
                pathname: router.pathname,
                query,
              });
            }, 500);
          }}
          placeholder="Search"
          inputProps={{
            className: "pr-5 mr-2",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment
                style={{ position: "absolute", right: 0 }}
                className={`u-cursor-pointer u-pointer-events-none`}
                position="start"
              >
                <SearchRoundedIcon
                  className="ml-1"
                  style={{ color: theme.palette.text.disabled }}
                  fontSize="small"
                />
              </InputAdornment>
            ),
          }}
        />
      </div>
    ),
  };
  if (!labels?.length) {
    return null;
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{ className: "w-100 m-2" }}
    >
      <DialogTitle>
        <div
          className="d-flex justify-content-between align-items-center p-4"
          style={{ borderBottom: "1px solid #EDEDED" }}
        >
          <div style={{ color: night, fontWeight: "bold", fontSize: 16 }}>
            Label
          </div>
          <div>
            <IconButton
              className="p-0"
              onClick={onClose}
              style={{ color: night }}
            >
              <CloseRoundedIcon />
            </IconButton>
          </div>
        </div>
        {modalProductSearchExistance[tabValue]}
      </DialogTitle>
      <DialogContent className="p-0 w-100">
        <TabContext value={tabValue}>
          <TabPanel className="p-0" value={SELECT_LABEL}>
            {loading
              ? [0, 1, 2, 3, 4, 5].map((number) => (
                  <div
                    key={number}
                    className="d-flex align-items-center px-4 py-2"
                  >
                    <Skeleton
                      style={{
                        width: 36,
                        height: 36,
                        transform: "none",
                      }}
                      className="ml-2"
                    />
                    <Skeleton style={{ width: "100%" }} />
                  </div>
                ))
              : labels?.map((label) => {
                  const isLabelSelected = label?.id in (selectedLabels || {});

                  return (
                    <div
                      hover
                      key={label.id}
                      aria-checked={label.id}
                      selected={isLabelSelected}
                      style={{
                        borderTop: "1px solid #EDEDED",
                        cursor: "pointer",
                      }}
                    >
                      <div align="left" className="w-100 py-4 pl-4 pr-0 d-flex justify-content-between align-items-center row-rev">

                          <Checkbox
                            className="mx-4"
                            onClick={() => {
                              onLabelClick(label, label.id);
                            }}
                            color="primary"
                            style={{ marginRight: -10 }}
                            checked={isLabelSelected}
                          />
                          <div className="mr-4" title={label.title}>
                            {ellipseText(label.title, 30)}
                          </div>

                      </div>
                    </div>
                  );
                })}
          </TabPanel>
        </TabContext>
      </DialogContent>
      <DialogActions
        className="d-flex align-items-center justify-content-between row-rev p-4"
        style={{ borderTop: "1px solid #EDEDED" }}
      >
        <div>
          {selectedLabels && englishNumberToPersianNumber(Object?.keys(selectedLabels).length)}{" "}
          Selected label
        </div>
        <div>
          <Button
            onClick={() => {
              onClose();
            }}
            variant="contained"
            color="primary"
            className="u-box-shadow-none u-fontMedium mx-2"
            size="medium"
            disabled={isLoading || (selectedLabels && !Object.keys(selectedLabels).length)}
          >
            Confirm
          </Button>
          <Button
            onClick={onClose}
            variant="outlined"
            color="primary"
            className="u-box-shadow-none u-fontMedium mr-3"
            size="medium"
          >
            cancel
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}

export default memo(SelectLabelmodal);
