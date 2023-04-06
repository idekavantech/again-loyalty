import React from "react";
import { textTypes } from "@saas/utils/colors";
import Link from "next/link";
import { AUTOMATED_PROCESSES_TYPES } from "../../constants";
import AdminBreadCrumb from "../../../AdminBreadCrumb";
import Paper from "@material-ui/core/Paper";
import LeftIcon from "@saas/icons/leftIcon";
import { useAutomatedProcesses } from "./useAutomatedProcesses";

function AutomatedProcess() {
  const { theme, urlPrefix } = useAutomatedProcesses();

  //${urlPrefix}crm/automated_processes/${automatedProcess.type}

  return (
    <div className="container">
      <AdminBreadCrumb />
      <div className="w-100 d-flex flex-column align-items-center position-relative">
        <div>
          <p
            className="w-100"
            style={{
              textAlign: "right",
              color: textTypes.text.default,
              fontSize: 20,
              fontWeight: 600,
              lineHeight: "28px",
            }}
          >
            Automatic trends
          </p>
          <p className="mt-2" style={{ fontSize: 14, lineHeight: "24px", marginBottom: 24 }}>
            You can automatically run actions such as (SMS , assign point and ...) for each customers action like ( Participate in survey, first customer entry,... )
          </p>
          <div className="d-flex flex-wrap mt-3">
            {AUTOMATED_PROCESSES_TYPES.map((automatedProcess) => {
              return (
                <Paper
                  component={Link}
                  href={`${urlPrefix}crm/automated_processes/${automatedProcess.type}`}
                  key={automatedProcess.id}
                  elevation={3}
                  style={{ padding: 24 }}
                  className="d-flex align-items-center justify-content-between w-100 mb-4 cursor-pointer "
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div style={{ width: 34, height: 34 }}>{automatedProcess.image(theme.palette.primary.main)}</div>
                    <p
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        marginRight: 27,
                      }}
                    >
                      {automatedProcess.title}
                    </p>
                  </div>
                  <LeftIcon />
                </Paper>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AutomatedProcess;
