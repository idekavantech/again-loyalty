import React, { memo } from "react";
import Paper from "@material-ui/core/Paper";
import { night } from "@saas/utils/colors";
import EditIcon from "@material-ui/icons/Edit";

function DomainSection() {
  return (
    <Paper elevation={1} className="d-flex mt-3 py-3 flex-wrap">
      <div className="col-12 mb-lg-3 mb-0">
        <div className="u-fontLarge mb-3" style={{ color: night }}>
          دامنه
        </div>
        <div className="d-flex flex-column">
          <div className="d-flex align-items-center">
            <div className="u-fontMedium  u-text-secondary-grey ml-3">
              example.ir.ink
            </div>
            <div className="u-cursor-pointer">
              <EditIcon color="primary" />
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
}

export default memo(DomainSection);
