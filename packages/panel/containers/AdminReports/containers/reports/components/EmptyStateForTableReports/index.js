/**
 *
 * PURCHASE BY PRODUCT REPORTS
 *
 */
import React, { memo } from "react";
import Icon from "@saas/components/Icon";
import { ROW_MATERIALS_STORAGE_EMPTY_STATE } from "@saas/icons";
import { textTypes } from "@saas/utils/colors";

function AdminEmptyStateForTables() {
  return (
    <div className="p-5 d-flex align-items-center justify-content-center flex-column mt-4">
      <Icon icon={ROW_MATERIALS_STORAGE_EMPTY_STATE} width={48} height={48} />
      <div
        className="u-fontExteraLarge mt-5 mb-3"
        style={{ color: textTypes.text.default }}
      >
        There was no report!
      </div>
    </div>
  );
}

export default memo(AdminEmptyStateForTables);
