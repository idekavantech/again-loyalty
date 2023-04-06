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
const SELECT_PRODUCT = "select_product";
const modalHeaders = {
  [SELECT_PRODUCT]: "انتخاب محصول",
};
export function SearchModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  deals,
  loading,
  selectedProduct,
  setSelectedProduct,
}) {
  const [tabValue, setTabValue] = useState(SELECT_PRODUCT);
  const [searchValue, setSearchValue] = useState("");
  const theme = useTheme();
  const router = useRouter();
  useEffect(() => {
    if (!isOpen) {
      setSearchValue("");
      setTabValue(SELECT_PRODUCT);
      router.push({
        pathname: router.pathname,
        query: { ...router.query, search: "" },
      });
    }
  }, [isOpen]);
  const onDealClick = (deal, deal_id) => {
    const _selectedProducts = { ...selectedProduct };
    const isDealSelected = deal_id in _selectedProducts;
    if (isDealSelected) {
      delete _selectedProducts[deal_id];
    } else {
      _selectedProducts[deal_id] = deal;
    }
    setSelectedProduct({ ..._selectedProducts });
  };
  const modalProductSearchExistance = {
    [SELECT_PRODUCT]: (
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
          placeholder="جستجو"
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
  if (!deals?.length) {
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
            {modalHeaders[tabValue]}
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
          <TabPanel className="p-0" value={SELECT_PRODUCT}>
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
              : deals?.map((deal) => {
                  const isDealSelected = deal?.id in (selectedProduct || {});
                  let {main_image_thumbnail_url: mainImageThumbnailUrl} = deal.default_variation
                  if (deal.has_image) mainImageThumbnailUrl = deal.main_image_thumbnail_url
                  
                  return (
                    <div
                      hover
                      key={deal.id}
                      aria-checked={deal.id}
                      selected={isDealSelected}
                      style={{
                        borderTop: "1px solid #EDEDED",
                        cursor: "pointer",
                      }}
                    >
                      <div align="right" className="w-100 py-4 pl-4 pr-0">
                        <div
                          className="d-flex align-items-center"
                          style={{ width: "max-content" }}
                        >
                          <Checkbox
                            className="mx-4"
                            onClick={() => {
                              onDealClick(deal, deal.id);
                            }}
                            color="primary"
                            style={{ marginRight: -10 }}
                            checked={isDealSelected}
                          />
                          <img
                            alt=""
                            width="48px"
                            height="48px"
                            style={{ borderRadius: 8 }}
                            src={mainImageThumbnailUrl}
                          />
                          <div className="mr-4" title={deal.title}>
                            {ellipseText(deal.title, 30)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </TabPanel>
        </TabContext>
      </DialogContent>
      <DialogActions
        className="d-flex align-items-center justify-content-between p-4"
        style={{ borderTop: "1px solid #EDEDED" }}
      >
        <div>
          {englishNumberToPersianNumber(Object.keys(selectedProduct).length)}{" "}
          محصول انتخاب‌شده
        </div>
        <div>
          <Button
            onClick={() => {
              if(onSubmit) onSubmit()
              if(!onSubmit) onClose();
            }}
            variant="contained"
            color="primary"
            className="u-box-shadow-none u-fontMedium"
            size="medium"
            disabled={isLoading || !Object.keys(selectedProduct).length}
          >
            تایید
          </Button>
          <Button
            onClick={onClose}
            variant="outlined"
            color="primary"
            className="u-box-shadow-none u-fontMedium mr-3"
            size="medium"
          >
            انصراف
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}

export default memo(SearchModal);
