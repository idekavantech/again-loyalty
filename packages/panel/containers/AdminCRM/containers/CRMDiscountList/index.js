import React, { memo } from "react";
import Paper from "@material-ui/core/Paper";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import Head from "next/head";
import CRMDiscountTable from "./CRMDiscountTable";
import Input from "@saas/components/Input";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { getDiscountCodeData, getCRMLabels } from "store/actions";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

import { useCRMDiscountList } from "./useCRMDiscountList";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function CRMDiscountPage() {
  const {
    router,
    tabProps,
    theme,
    inputRef,
    value,
    setValue,
    search,
    setSearch,
    loading,
    discountCodesData,
    adminUrlPrefix,
    onSearchChange,
  } = useCRMDiscountList();

  return (
    <div className="container dicountCode">
      <Head>
        <title>discount code</title>
      </Head>
      <AdminBreadCrumb
        submitButtonText="Create a new discount"
        submitButtonHasPlus
        submitAction={() => {
          router.push(`${adminUrlPrefix}crm/customer_discount/edit/new?`);
        }}
      />
      <Paper
        elevation={1}
        className="crm-search mt-3"
        style={{ padding: "24px 0" }}
      >
        <div className="mx-2" style={{ width: "30%" }}>
          <Input
            style={{
              direction:
                search?.[0] === "+" || search?.[0] === "0" ? "ltr" : "rtl",
            }}
            size="small"
            inputRef={inputRef}
            value={search}
            fullWidth={false}
            onChange={onSearchChange}
            placeholder="Search"
            inputProps={{
              className: "pr-5 mr-2",
            }}
            InputProps={{
              startAdornment: (
                <>
                  {router.query.search ? (
                    <InputAdornment
                      style={{ position: "absolute", left: 3 }}
                      className="u-cursor-pointer"
                      position="start"
                      onClick={() => {
                        setSearch("");
                        const query = { ...router.query };
                        delete query.search;
                        router.push({
                          pathname: router.pathname,
                          query,
                        });
                      }}
                    >
                      <ClearRoundedIcon
                        style={{ color: theme.palette.text.disabled }}
                      />
                    </InputAdornment>
                  ) : null}
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
                </>
              ),
            }}
          />
        </div>
        <div style={{ padding: "0 24px 24px 0" }}></div>
        <Box sx={{ width: "100%", padding: 0 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={(event, newValue) => setValue(newValue)}
              aria-label="basic tabs example"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Active codes" {...tabProps(0)} />
              <Tab label="expired" {...tabProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <CRMDiscountTable
              adminUrlPrefix={adminUrlPrefix}
              discountCodesData={discountCodesData}
              loading={loading}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CRMDiscountTable
              adminUrlPrefix={adminUrlPrefix}
              discountCodesData={discountCodesData}
              loading={loading}
            />
          </TabPanel>
        </Box>
      </Paper>
    </div>
  );
}

export default memo(CRMDiscountPage);
