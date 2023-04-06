import React , {memo} from "react"
import Dashboard from "../AdminBusinessReports/Dashboard";
import MultiBranchDashboard from "../AdminMultiBranchesReports/Dashboard";
import { makeSelectPlugins } from "@saas/stores/plugins/selector";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";


function AnalyticsDashboardContainer({ plugins  }) {
  const isSuper = plugins[BRANCHES_PLUGIN].isActive 
  if (isSuper) {
    return <MultiBranchDashboard />;
  }
  return <Dashboard />;
}

const makeStateToProps = createStructuredSelector(
  {
    plugins : makeSelectPlugins(),
  }
)

const withConnect = connect(makeStateToProps , null )

export default compose(withConnect, memo)(AnalyticsDashboardContainer);
