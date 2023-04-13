import React, { memo, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import MaterialModal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import Input from "@saas/components/Input";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import {
  getCRMMembershipByQuery,
  getLabels,
  invoiceFactor,
  setInvoiceFactorAction,
  submitFactor,
  editMembership,
  createCRMMembership,
  setSearchedCRMMembership,
} from "store/actions";
import {
  makeSelectCrmLabels,
  makeSelectCRMMemberShipsByQuery,
  makeSelectInvoiceFactorResponse,
  makeSelectSearchedCRMMembership,
} from "store/selectors";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { makeSelectBusiness } from "@saas/stores/business/selector";
import InputAdornment from "@material-ui/core/InputAdornment";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClearIcon from "@material-ui/icons/Clear";
import { reversePriceFormatter } from "@saas/utils/helpers/reversePriceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { makeSelectDiscountError } from "@saas/plugins/Shopping/selectors";
import useTheme from "@material-ui/core/styles/useTheme";
import { setDiscountError } from "@saas/plugins/Shopping/actions";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import { textTypes } from "@saas/utils/colors";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

const deliveryTypesConstant = [
  { id: 0, title: "Send to the customer", value: "carry_out" },
  { id: 1, title: "delivery at your location", value: "delivery_on_user_site" },
  { id: 2, title: "Mill in the place", value: "delivery_on_business_site" },
  { id: 3, title: "Delivery in the car", value: "delivery_on_car" },
];

const submitFactorConstant = {
  delivery_price: 0,
  order_items: [],
  is_offline: false,
  use_gift_credit: false,
  delivery_site_type: "",
  user_phone: "",
  user_name: "",
  total_items_initial_price: null,
};

const membershipInitialState = {
  labels: [],
  name: "",
  user: {},
};

let searchTimeoutId = null;
const SubmitFactor = ({
  loading,
  _getCRMMembershipsByQuery,
  _createInvoiceFactor,
  _createSubmitFactor,
  membershipByQuery,
  business,
  invoiceFactorResponse,
  discountError,
  _setInvoiceFactorAction,
  _setDiscountError,
  _getCrmLabels,
  labels,
  _editCrmMembership,
  _createCRMMembership,
  _setSearchedMembership,
  selectedCrmMemberShip,
}) => {
  const node = useRef();
  const router = useRouter();
  const theme = useTheme();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isInputLengthZero, setInputLengthZero] = useState(true);
  const [isShowSearchBar, setIsShowSearchBar] = useState(false);
  const [invoiceFactor, setInvoiceFactor] = useState({
    ...submitFactorConstant,
  });
  const [walletCredit, setWalletCredit] = useState(false);
  const [discountCode, setDiscountCode] = useState(false);
  const [search, setSearch] = useState({ user: { phone: "" }, name: "" });
  const [submitModalStep, setSubmitModalStep] = useState(1);
  const { minWidth768 } = useResponsive();
  const [crmMemberShipDetail, setCrmMemberShipDetail] = useState({
    ...membershipInitialState,
  });

  useEffect(() => {
    if (router?.query?.submit_factor) {
      setIsOpenModal(true);
    }
  }, [router?.query?.submit_factor]);

  const handleClose = () => {
    const _query = { ...router.query };
    delete _query.submit_factor;
    router.push({
      pathname: router.pathname,
      query: {
        ..._query,
      },
    });
    setIsOpenModal(false);
    setSubmitModalStep(1);
  };

  useEffect(() => {
    setTimeout(() => {
      if (search) {
        const query = {
          search:
            search?.user?.phone?.length && search?.user?.phone[0] === "0"
              ? persianToEnglishNumber(search?.user?.phone?.replace("0", "+98"))
              : persianToEnglishNumber(search?.user?.phone),
        };
        clearTimeout(searchTimeoutId);
        searchTimeoutId = setTimeout(() => {
          _getCRMMembershipsByQuery({ ...query });
        }, 500);
      } else {
        clearTimeout(searchTimeoutId);
        searchTimeoutId = setTimeout(() => {
          _getCRMMembershipsByQuery();
        }, 500);
      }
    }, 0);
  }, [search]);

  useEffect(() => {
    setTimeout(() => {
      _getCrmLabels();
    }, 0);
  }, []);

  const handleClick = (e) => {
    if (!node?.current?.contains(e.target)) {
      setIsShowSearchBar(false);
    }
  };

  useEffect(() => {
    if (isShowSearchBar) {
      document.addEventListener("mousedown", handleClick);
      return () => {
        document.removeEventListener("mousedown", handleClick);
      };
    }
  }, [isShowSearchBar]);

  useEffect(() => {
    if (!discountCode) {
      _setDiscountError("");
      if (invoiceFactor.discount_code) {
        const _invoiceFactor = { ...invoiceFactor };
        delete _invoiceFactor.discount_code;
        setInvoiceFactor(_invoiceFactor);
      }
    }
  }, [discountCode]);

  const createFactor = () => {
    const _invoiceFactor = { ...invoiceFactor };
    _invoiceFactor.business_id = business.id;
    _invoiceFactor.user_name = selectedCrmMemberShip.name;
    _invoiceFactor.user_phone = selectedCrmMemberShip?.user?.phone;
    _createInvoiceFactor(_invoiceFactor);
  };

  let timeout = null;
  useEffect(() => {
    timeout = setTimeout(() => {
      if (
        !invoiceFactor.total_items_initial_price ||
        !invoiceFactor.delivery_site_type
      )
        return;
      createFactor();
    }, 500);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
    };
  }, [invoiceFactor]);

  const submit = () => {
    if (search?.id) {
      const _crmMemberShipDetail = { ...crmMemberShipDetail };
      _crmMemberShipDetail.name = search.name;
      _crmMemberShipDetail.user.phone = search?.user?.phone;
      _editCrmMembership(search?.id, _crmMemberShipDetail);
    } else {
      const _crmMemberShipDetail = { ...crmMemberShipDetail };
      _crmMemberShipDetail.name = search.name;
      _crmMemberShipDetail.business = business.id;
      _crmMemberShipDetail.user.phone = search?.user?.phone;
      _createCRMMembership(_crmMemberShipDetail);
    }
    !minWidth768 &&
      setInvoiceFactor((factor) => {
        return { ...factor, delivery_site_type: deliveryTypesConstant[1].value };
      });
  };

  useEffect(() => {
    if (selectedCrmMemberShip && Object?.keys(selectedCrmMemberShip).length) {
      setSubmitModalStep(2);
    }
  }, [selectedCrmMemberShip]);

  const submitFactorInvoice = (e) => {
    const _invoiceFactor = { ...invoiceFactor };
    _invoiceFactor.business_id = business.id;
    _createSubmitFactor({ ..._invoiceFactor });
    setSubmitModalStep(1);
    _setInvoiceFactorAction({});
    _setSearchedMembership({});
    const _query = { ...router.query };
    delete _query.submit_factor;
    router.push({
      pathname: router.pathname,
      query: {
        ..._query,
      },
    });

    _setDiscountError("");
    setIsOpenModal(false);
  };

  return (
    <MaterialModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpenModal}
      className={"d-flex align-items-center"}
    >
      <Fade in={isOpenModal}>
        {submitModalStep === 1 ? (
          <Paper
            elevation={3}
            style={{
              backgroundColor: "#fff",
              margin: "0 auto",
              padding: 24,
            }}
            className="submitFactor"
          >
            <div
              className="d-flex align-items-center pb-4"
              style={{
                borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
              }}
            >
              <CloseIcon
                style={{ color: "#000000" }}
                onClick={handleClose}
                className="cursor-pointer"
              />
              <p style={{ fontSize: 16, fontWeight: 500, paddingRight: 13 }}>
                Quick order
              </p>
            </div>
            <div>
              <p
                style={{ fontSize: 14, fontWeight: 500, paddingTop: 24 }}
                className="pb-4"
              >
                customer information
              </p>
              <div className="d-flex row mb-3">
                <div
                  className="col-12 col-md-4 pl-md-0 mb-3 mb-md-0"
                  style={{ position: "relative" }}
                >
                  <Input
                    variant="outlined"
                    label="customer number"
                    size="small"
                    value={search?.user?.phone}
                    fullWidth={false}
                    onChange={(value) => {
                      const _invoiceFactor = { ...invoiceFactor };
                      _invoiceFactor.user_phone = value;
                      clearTimeout(searchTimeoutId);
                      setInvoiceFactor(_invoiceFactor);
                      setIsShowSearchBar(true);
                      setSearch({ ...search, user: { phone: value } });
                      if (value?.length > 0) {
                        setInputLengthZero(false);
                      } else {
                        setInputLengthZero(true);
                      }
                    }}
                    placeholder="customer number"
                    inputProps={{
                      className: "pr-5",
                    }}
                    InputProps={{
                      startAdornment: (
                        <>
                          <InputAdornment
                            style={{ position: "absolute", left: 3 }}
                            className="u-cursor-pointer"
                            position="start"
                            onClick={() => {
                              setIsShowSearchBar(true);
                            }}
                          >
                            <ArrowDropDownIcon />
                          </InputAdornment>
                          {search?.user?.phone ? (
                            <InputAdornment
                              style={{ position: "absolute", right: 0 }}
                              position="start"
                              onClick={() => {
                                setSearch({ user: { phone: "" }, name: "" });
                                setInvoiceFactor({
                                  delivery_price: 0,
                                  is_offline: false,
                                  order_items: [],
                                });
                              }}
                              className="cursor-pointer"
                            >
                              <ClearIcon
                                style={{ color: "gray", width: 18, height: 18 }}
                              />
                            </InputAdornment>
                          ) : null}
                        </>
                      ),
                    }}
                  />
                  {isShowSearchBar && (
                    <div
                      ref={node}
                      style={{
                        background: "#FFFFFF",
                        boxShadow: "0px 3px 14px 2px rgba(0, 0, 0, 0.12)",
                        borderRadius: 4,
                        maxHeight: 150,
                        overflow: "scroll",
                        marginTop: 2,
                        position: "absolute",
                        zIndex: 1000,
                        width: "calc(100% - 14px)",
                      }}
                    >
                      {loading ? (
                        <LoadingIndicator />
                      ) : membershipByQuery?.length === 0 &&
                        !isInputLengthZero ? (
                        <p>There was no results.</p>
                      ) : (
                        membershipByQuery?.map((person) => (
                          <div
                            className="d-flex cursor-pointer personDataRow"
                            key={person.id}
                            style={{
                              padding: "6px 16px",
                              fontSize: 13,
                              fontWeight: 500,
                            }}
                            onClick={() => {
                              const _invoiceFactor = { ...invoiceFactor };
                              _invoiceFactor.user_phone = person.user.phone;
                              _invoiceFactor.user_name = person.name;
                              setInvoiceFactor(_invoiceFactor);
                              setSearch(person);
                              setIsShowSearchBar(false);
                              const userLabels = person?.labels || [];
                              setCrmMemberShipDetail((membershipDetail) => {
                                return {
                                  ...membershipDetail,
                                  labels: userLabels,
                                };
                              });
                            }}
                          >
                            <p style={{ whiteSpace: "nowrap" }}>
                              {person.name}
                            </p>
                            <span className="mx-1"> - </span>
                            <p style={{ direction: "ltr" }}>
                              {englishNumberToPersianNumber(person?.user?.phone)}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
                <div className="col-12 col-md-4 mb-3 mb-md-0 px-md-2 ">
                  <Input
                    variant="outlined"
                    label="Customer Name"
                    size="small"
                    value={search?.name}
                    fullWidth={false}
                    onChange={(value) => {
                      const _invoiceFactor = { ...invoiceFactor };
                      _invoiceFactor.user_name = value;
                      setInvoiceFactor(_invoiceFactor);

                      setSearch({ ...search, name: value });
                    }}
                    placeholder="Customer Name"
                    inputProps={{
                      className: "pr-5",
                    }}
                  />
                </div>
                <div className="col-12 col-md-4 mb-3 mb-md-0 px-md-2 ">
                  <Select
                    className="w-100 "
                    value={crmMemberShipDetail.labels || []}
                    multiple
                    margin="dense"
                    variant="outlined"
                    displayEmpty={true}
                    size="large"
                    style={{
                      height: 36,
                    }}
                    renderValue={() => {
                      if (crmMemberShipDetail?.labels?.length === 0)
                        return "Select the label";
                      if (
                        crmMemberShipDetail?.labels?.length === 1 &&
                        crmMemberShipDetail?.labels[0]
                      )
                        return labels?.find(
                          (level) =>
                            level?.id === crmMemberShipDetail?.labels[0]
                        )?.title;
                      if (
                        crmMemberShipDetail?.labels?.length === labels?.length
                      )
                        return "All tags";
                      return `${englishNumberToPersianNumber(
                        crmMemberShipDetail?.labels?.length
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
                        onClick={() => {
                          const newCrmMemberShipDetail = JSON.parse(
                            JSON.stringify(crmMemberShipDetail)
                          );

                          if (newCrmMemberShipDetail?.labels?.length) {
                            newCrmMemberShipDetail.labels = [];
                            setCrmMemberShipDetail(newCrmMemberShipDetail);
                          } else {
                            newCrmMemberShipDetail.labels = labels?.map(
                              (label) => label.id
                            );
                            setCrmMemberShipDetail(newCrmMemberShipDetail);
                          }
                        }}
                      >
                        <Checkbox
                          className="p-1"
                          size="small"
                          indeterminate={
                            crmMemberShipDetail?.labels?.length !==
                              labels?.length &&
                            crmMemberShipDetail?.labels?.length
                          }
                          onChange={(e) => {
                            e.preventDefault();
                          }}
                          color="primary"
                          checked={
                            crmMemberShipDetail?.labels?.length ===
                            labels?.length
                          }
                        />
                        <ListItemText
                          primary="Select all tags"
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
                            onClick={(e) => {
                              e.preventDefault();
                              const newCrmMemberShipDetail = JSON.parse(
                                JSON.stringify(crmMemberShipDetail)
                              );

                              if (
                                crmMemberShipDetail?.labels.includes(label.id)
                              ) {
                                const newLabels =
                                  crmMemberShipDetail?.labels.filter(
                                    (_label) => _label !== label.id
                                  );
                                newCrmMemberShipDetail.labels = [...newLabels];
                                setCrmMemberShipDetail(newCrmMemberShipDetail);
                              } else {
                                newCrmMemberShipDetail.labels = [
                                  ...newCrmMemberShipDetail.labels,
                                  label.id,
                                ];
                                setCrmMemberShipDetail(newCrmMemberShipDetail);
                              }
                            }}
                          >
                            <Checkbox
                              className="p-1"
                              size="small"
                              onChange={(e) => {
                                e.preventDefault();
                              }}
                              color="primary"
                              checked={crmMemberShipDetail?.labels?.includes(
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
              </div>
            </div>
            <div
              className="d-flex align-items-center justify-content-end"
              style={{
                paddingTop: 24,
                marginTop: `${search ? 0 : "150px"}`,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                className="u-box-shadow-none u-fontMedium mr-2"
                size="large"
                style={{ direction: "ltr", whiteSpace: "nowrap" }}
                onClick={submit}
                disabled={
                  !(invoiceFactor.user_phone && invoiceFactor.user_name)
                }
              >
                {search?.id ? "Customer Update" : "Customer build"}
              </Button>
            </div>
          </Paper>
        ) : (
          <Paper
            elevation={3}
            style={{
              backgroundColor: "#fff",
              height: "100vh",
              maxHeight: "45rem",
              overflow: "scroll",
              margin: "0 auto",
              padding: 24,
            }}
            className="submitFactor"
          >
            <div
              className="d-flex align-items-center pb-4"
              style={{
                borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
              }}
            >
              <CloseIcon
                style={{ color: "#000000" }}
                onClick={handleClose}
                className="cursor-pointer"
              />
              <p style={{ fontSize: 16, fontWeight: 500, paddingRight: 13 }}>
                Quick order
              </p>
            </div>
            <div>
              <div
                className="d-flex row justify-content-start"
                style={{
                  padding: "24px 0",
                }}
              >
                <div
                  style={{ fontSize: 14, fontWeight: 500 }}
                  className="col-12 mb-2 mb-sm-0 col-sm-5 d-flex"
                >
                  <p className="ml-1">customer number:</p>
                  <p style={{ direction: "ltr" }}>
                    <b>
                      {englishNumberToPersianNumber(
                        selectedCrmMemberShip?.user?.phone
                      )}
                    </b>
                  </p>
                  <p></p>
                </div>
                <div
                  style={{ fontSize: 14, fontWeight: 500 }}
                  className="col-12 col-sm-4 d-flex justify-content-sm-start"
                >
                  <p className="ml-1"> Customer Name:</p>
                  <p>
                    {" "}
                    <b>{selectedCrmMemberShip?.name}</b>
                  </p>
                </div>
              </div>
              <div
                className="d-flex justify-content-between flex-column"
                style={{
                  borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                  borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                  paddingTop: "24px",
                }}
              >
                <div className="d-flex w-100 col-12 justify-content-between flex-wrap align-items-start mb-4 px-sm-0">
                  <div className="col-12 col-md-4 col-md-5 px-md-0 px-sm-0 mt-md-4">
                    <p
                      style={{ fontSize: 12, fontWeight: 600 }}
                      className="mb-1"
                    >
                      The total amount of purchase
                    </p>

                    <div className="position-relative">
                      <Input
                        variant="outlined"
                        size="small"
                        value={priceFormatter(
                          invoiceFactor?.total_items_initial_price
                        )}
                        fullWidth={false}
                        onChange={(value) => {
                          const _invoiceFactor = { ...invoiceFactor };
                          _invoiceFactor.total_items_initial_price = Number(
                            reversePriceFormatter(value)
                          );
                          setInvoiceFactor(_invoiceFactor);
                        }}
                        inputProps={{
                          className: "pr-5",
                        }}
                      />

                      <p
                        style={{
                          position: "absolute",
                          top: 9,
                          left: 16,
                          color: textTypes.text.subdued,
                        }}
                      >
                        $
                      </p>
                    </div>
                  </div>
                </div>
                {minWidth768 ? (
                  <div className="mb-4">
                    <div className="col-12 col-lg-2 col-md-2 col-sm-2">
                      How to Delivery
                    </div>
                    <div className="mt-2 px-1">
                      <RadioGroup
                        className="col-10 w-100 mx-0 px-0 d-flex"
                        aria-label="gender"
                        color="primary"
                        name="gender1"
                        style={{ padding: 0 }}
                        value={invoiceFactor.delivery_site_type}
                        onChange={(e) => {
                          const _invoiceFactor = { ...invoiceFactor };
                          _invoiceFactor.delivery_site_type = e.target.value;
                          setInvoiceFactor(_invoiceFactor);
                        }}
                        row
                      >
                        {deliveryTypesConstant.map((item) => (
                          <FormControlLabel
                            key={item.id}
                            className="col-12 col-lg-3 col-md-3 col-sm-5"
                            value={item.value}
                            control={<Radio color="primary" />}
                            label={item.title}
                            style={{ padding: 0, margin: 0 }}
                          />
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="d-flex w-100 col-12 justify-content-between flex-wrap align-items-start mb-4 px-4 px-sm-0 px-lg-0">
                      <div className=" w-100 px-5 px-sm-0">
                        <p
                          style={{ fontSize: 12, fontWeight: 600 }}
                          className="mb-1"
                        >
                          How to Delivery
                        </p>
                        <Select
                          style={{
                            height: 38,
                          }}
                          className="w-100"
                          value={invoiceFactor.delivery_site_type}
                          margin="dense"
                          variant="outlined"
                          disableUnderline={true}
                          displayEmpty
                          size="large"
                          onChange={(e) => {
                            const _invoiceFactor = { ...invoiceFactor };
                            _invoiceFactor.delivery_site_type = e.target.value;
                            setInvoiceFactor(_invoiceFactor);
                          }}
                          renderValue={(e)=>{
                            return deliveryTypesConstant.find((deliveryType) => deliveryType.value === e)?.title
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
                          {deliveryTypesConstant?.map((dateItem) => {
                            return (
                              <MenuItem
                                className="px-2"
                                key={dateItem.id}
                                value={dateItem.value}
                              >
                                <Radio checked={dateItem.value === invoiceFactor.delivery_site_type} />
                                <div className="w-100 d-flex align-items-center">
                                  <ListItemText
                                    primary={dateItem.title}
                                    className="text-right"
                                  />
                                </div>
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </div>
                    </div>
                  </div>
                )}
                <div className="d-flex w-100 col-12 justify-content-between flex-wrap align-items-start mb-4 px-0">
                  {selectedCrmMemberShip?.wallet_credit ? (
                    <div
                      className="d-flex align-items-center col-12 col-md-4 justify-content-between mb-2"
                      style={{ fontSize: 16, fontWeight: 400 }}
                    >
                      <div className="d-flex">
                        <p
                          style={{
                            fontSize: 16,
                            fontWeight: 400,
                            whiteSpace: "nowrap",
                          }}
                        >
                          wallet
                        </p>
                        <span className="mx-1">:</span>
                        {search.wallet_credit ? (
                          <>
                            <span style={{ color: "#2E7D32" }} className="pl-1">
                              {priceFormatter(search.wallet_credit)}
                            </span>
                            <span style={{ color: "#000000", opacity: "60%" }}>
                              $
                            </span>
                          </>
                        ) : (
                          "-"
                        )}
                      </div>
                      <Switch
                        color="primary"
                        checked={walletCredit}
                        onChange={(e) => {
                          setWalletCredit(e.target.checked);
                          if (walletCredit) {
                            const _invoiceFactor = { ...invoiceFactor };
                            _invoiceFactor.use_wallet_credit = false;
                            setInvoiceFactor(_invoiceFactor);
                          } else {
                            const _invoiceFactor = { ...invoiceFactor };
                            _invoiceFactor.use_wallet_credit =
                              !_invoiceFactor.use_wallet_credit;
                            setInvoiceFactor(_invoiceFactor);
                          }
                        }}
                        name="checkedA"
                        inputProps={{ "aria-label": "secondary checkbox" }}
                      />
                    </div>
                  ) : null}
                  {search?.gift_credit ? (
                    <div
                      className="d-flex align-items-center col-12 col-md-4 justify-content-between mb-2"
                      style={{ fontSize: 16, fontWeight: 400 }}
                    >
                      <div className="d-flex">
                        <p style={{ whiteSpace: "nowrap" }}>Gift credit</p>
                        <span className="mx-1">:</span>
                        {search.gift_credit ? (
                          <>
                            <span style={{ color: "#2E7D32" }} className="pl-1">
                              {priceFormatter(search.gift_credit)}
                            </span>
                            <span style={{ color: "#000000", opacity: "60%" }}>
                              $
                            </span>
                          </>
                        ) : (
                          "-"
                        )}
                      </div>
                      <Switch
                        color="primary"
                        checked={invoiceFactor.use_gift_credit}
                        onChange={() => {
                          if (discountCode) {
                            setDiscountCode(false);
                          }
                          const _invoiceFactor = { ...invoiceFactor };
                          _invoiceFactor.use_gift_credit =
                            !_invoiceFactor.use_gift_credit;
                          if (invoiceFactor.discount_code) {
                            delete _invoiceFactor.discount_code;
                          }
                          setInvoiceFactor(_invoiceFactor);
                        }}
                        name="checkedA"
                        inputProps={{ "aria-label": "secondary checkbox" }}
                      />
                    </div>
                  ) : null}
                  <div className="d-flex col-12 col-md-4 flex-column mb-2">
                    <div
                      className="d-flex align-items-center justify-content-between mb-1"
                      style={{ fontSize: 16, fontWeight: 400 }}
                    >
                      <p style={{ whiteSpace: "nowrap" }}>discount code: </p>
                      <Switch
                        color="primary"
                        checked={discountCode}
                        onChange={(event) => {
                          const useDiscountCode = event.target.checked;
                          const _invoiceFactor = { ...invoiceFactor };
                          _invoiceFactor.use_gift_credit = !useDiscountCode;
                          setInvoiceFactor(_invoiceFactor);
                          setDiscountCode(useDiscountCode);
                        }}
                        name="checkedA"
                        inputProps={{ "aria-label": "secondary checkbox" }}
                      />
                    </div>
                    <div
                      className="d-flex align-items-center justify-content-between mb-1"
                      style={{ fontSize: 16, fontWeight: 400 }}
                    ></div>
                    <input
                      style={{
                        border: "1px dashed rgba(0, 0, 0, 0.23)",
                        borderRadius: "8px",
                        padding: "8px 12px",
                        background: `${
                          !discountCode ? "#f5f5f5" : "transparent"
                        }`,
                      }}
                      value={invoiceFactor.discount_code}
                      onChange={(e) => {
                        const _invoiceFactor = { ...invoiceFactor };
                        _invoiceFactor.discount_code = e.target.value;
                        setInvoiceFactor(_invoiceFactor);
                      }}
                      disabled={!discountCode}
                      placeholder="discount code"
                    />
                    {discountError ? (
                      <div
                        className="u-font-semi-small mt-2"
                        style={{
                          minHeight: 24,
                          color: discountError.includes("Success")
                            ? theme.palette.success.main
                            : theme.palette.error.main,
                        }}
                      >
                        {discountError}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="d-flex justify-content-between align-center">
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      marginBottom: 24,
                    }}
                  >
                    Total Amount
                  </p>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                    }}
                  >
                    {priceFormatter(
                      invoiceFactorResponse?.total_items_initial_price
                    )}
                    <span
                      className="mr-1"
                      style={{ color: "#000000", opacity: "60%" }}
                    >
                      $
                    </span>
                  </p>
                </div>
                {invoiceFactor?.use_wallet_credit ? (
                  <div className="d-flex justify-content-between align-center">
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        marginBottom: 16,
                      }}
                    >
                      The wallet amount
                    </p>
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 400,
                      }}
                    >
                      {invoiceFactor?.use_wallet_credit
                        ? selectedCrmMemberShip.wallet_credit >
                          invoiceFactor?.total_items_initial_price
                          ? `${priceFormatter(
                              invoiceFactor?.total_items_initial_price
                            )}`
                          : `${priceFormatter(
                              selectedCrmMemberShip.wallet_credit
                            )}`
                        : null}

                      <span
                        className="mr-1"
                        style={{ color: "#000000", opacity: "60%" }}
                      >
                        $
                      </span>
                    </p>
                  </div>
                ) : null}
                {invoiceFactorResponse?.gift_credit_used ? (
                  <div className="d-flex justify-content-between align-center">
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        marginBottom: 16,
                      }}
                    >
                      The amount of gift credit
                    </p>
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 400,
                      }}
                    >
                      {priceFormatter(invoiceFactorResponse?.gift_credit_used)}
                      <span
                        className="mr-1"
                        style={{ color: "#000000", opacity: "60%" }}
                      >
                        $
                      </span>
                    </p>
                  </div>
                ) : null}
                {invoiceFactorResponse?.discount_code_amount ? (
                  <div className="d-flex justify-content-between align-center">
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        marginBottom: 24,
                      }}
                    >
                      The amount of discount
                    </p>
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 400,
                      }}
                    >
                      {priceFormatter(
                        invoiceFactorResponse?.discount_code_amount
                      )}
                      <span
                        className="mr-1"
                        style={{ color: "#000000", opacity: "60%" }}
                      >
                        $
                      </span>
                    </p>
                  </div>
                ) : null}
                {invoiceFactorResponse?.taxing_price ? (
                  <div className="d-flex justify-content-between align-center">
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        marginBottom: 24,
                      }}
                    >
                      Tax amount
                    </p>
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 400,
                      }}
                    >
                      {priceFormatter(invoiceFactorResponse?.taxing_price)}
                      <span
                        className="mr-1"
                        style={{ color: "#000000", opacity: "60%" }}
                      >
                        $
                      </span>
                    </p>
                  </div>
                ) : null}

                <div className="d-flex justify-content-between align-center">
                  <p
                    style={{
                      fontSize: 20,
                      fontWeight: 500,
                      marginBottom: 42,
                    }}
                  >
                    Payable
                  </p>
                  <p
                    style={{
                      fontSize: 20,
                      fontWeight: 500,
                    }}
                  >
                    {priceFormatter(
                      Number(
                        invoiceFactorResponse?.should_pay -
                          (invoiceFactor.use_wallet_credit
                            ? selectedCrmMemberShip.wallet_credit
                            : 0)
                      ) > 0
                        ? Number(
                            invoiceFactorResponse?.should_pay -
                              (invoiceFactor.use_wallet_credit
                                ? selectedCrmMemberShip.wallet_credit
                                : 0)
                          )
                        : 0
                    )}
                    <span
                      className="mr-1"
                      style={{ color: "#000000", opacity: "60%" }}
                    >
                      $
                    </span>
                  </p>
                </div>
              </div>
              <div
                className="d-flex justify-content-end align-center"
                style={{ paddingTop: 24 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  className="u-box-shadow-none u-fontMedium mr-2"
                  size="large"
                  style={{
                    direction: "ltr",
                    background: "#E0E0E0",
                    color: "#000000DE",
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                  onClick={() => setSubmitModalStep(1)}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className="u-box-shadow-none u-fontMedium mr-2"
                  size="large"
                  disabled={!invoiceFactorResponse}
                  style={{
                    direction: "ltr",
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                  onClick={() => submitFactorInvoice(invoiceFactorResponse?.id)}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </Paper>
        )}
      </Fade>
    </MaterialModal>
  );
};
const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  membershipByQuery: makeSelectCRMMemberShipsByQuery(),
  business: makeSelectBusiness(),
  invoiceFactorResponse: makeSelectInvoiceFactorResponse(),
  discountError: makeSelectDiscountError(),
  labels: makeSelectCrmLabels(),
  selectedCrmMemberShip: makeSelectSearchedCRMMembership(),
});

function mapDispatchToProps(dispatch) {
  return {
    _setDiscountError: (err) => dispatch(setDiscountError(err)),
    _setInvoiceFactorAction: (err) => dispatch(setInvoiceFactorAction(err)),
    _getCRMMembershipsByQuery: (query) =>
      dispatch(getCRMMembershipByQuery(query)),
    _createInvoiceFactor: (data) => dispatch(invoiceFactor(data)),
    _createSubmitFactor: (data) => dispatch(submitFactor(data)),
    _getCrmLabels: () => dispatch(getLabels()),
    _editCrmMembership: (id, data) => dispatch(editMembership(id, data)),
    _createCRMMembership: (data) => dispatch(createCRMMembership(data)),
    _setSearchedMembership: (data) => dispatch(setSearchedCRMMembership(data)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(SubmitFactor);
