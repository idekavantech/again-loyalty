import React, { memo, useMemo, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Head from "next/head";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import {
  makeSelectBranches,
  makeSelectBusiness,
} from "@saas/stores/business/selector";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import AllBranchTransactionsTable from "./AllBranchTransactionsTable";
import moment from "moment";
 
 
import {
  getWalletBalance,
  getWalletTransactions,
} from "@saas/stores/plugins/actions";
import {
  makeSelectWalletTransactions,
  makeSelectWalletBalance,
} from "@saas/stores/plugins/selector";

const headCells = [
  {
    id: "id",
    name: "Branch Name",
    label: "Branch Name",
    align: "center",
  },
  {
    id: "time",
    name: "The total amount of transaction",
    label: "The total amount of transaction",
    align: "center",
  },
];
function SOWAllBranchTransactions({
  branches,
  isLoading,
  business,
  _getWalletBalance,
  walletBalance,
}) {
  const businessId = useMemo(() => {
    if (business?.super_business) {
      return business?.super_business?.id;
    } else {
      return business?.id;
    }
  }, [business, branches]);

  const branchIds = branches.map((item) => item.id);

  useEffect(() => {
    if ((businessId, branchIds)) {
      setTimeout(() => {
        _getWalletBalance({
          branchId: branchIds,
          businessId,
        });
      }, 0);
    }
  }, [branches]);

  return (
    <div>
      <div className="container mb-5">
        <Head>
          <title>Wallet Report(Branch accounts)</title>
        </Head>
        <AdminBreadCrumb />
        <AllBranchTransactionsTable
          isLoading={isLoading}
          headCells={headCells}
          walletBalance={walletBalance}
        />
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  branches: makeSelectBranches(),
  isLoading: makeSelectLoading(),
  business: makeSelectBusiness(),
  walletTransactions: makeSelectWalletTransactions(),
  walletBalance: makeSelectWalletBalance(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getWalletTransactions: (data) => dispatch(getWalletTransactions(data)),
    _getWalletBalance: (data) => dispatch(getWalletBalance(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withConnect)(SOWAllBranchTransactions);
