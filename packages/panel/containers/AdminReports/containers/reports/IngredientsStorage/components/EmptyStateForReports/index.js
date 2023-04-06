/**
 *
 * PURCHASE BY PRODUCT REPORTS
 *
 */
import React, { memo } from "react";
import Icon from "@saas/components/Icon";
import { ROW_MATERIALS_STORAGE_EMPTY_STATE } from "@saas/icons";
import { textTypes } from "@saas/utils/colors";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import { SHOPPING_PLUGIN_URL } from "@saas/utils/constants/plugins";

function AdminIngredientsStorageEmptyStateReports({
  isSuper,
  urlPrefix,
  hasAnyKeepTrackedIngredient,
}) {
  const router = useRouter();
  return (
    <div className="p-5 d-flex align-items-center justify-content-center flex-column mt-4">
      <Icon icon={ROW_MATERIALS_STORAGE_EMPTY_STATE} width={48} height={48} />
      <div
        className="u-fontExteraLarge mt-5 mb-3"
        style={{ color: textTypes.text.default }}
      >
        هنوز گزارشی دریافت نشده است!
      </div>
      <div
        className="u-fontMedium mb-4 text-justify"
        style={{ color: textTypes.text.subdued }}
      >
        به محض دریافت گزارش شمارش موجودی این قسمت به‌روزرسانی می‌شود.
      </div>
      {hasAnyKeepTrackedIngredient && !isSuper && (
        <span>
          <Button
            color="primary"
            variant="contained"
            onClick={() =>
              router.push(
                `${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/ingredients_storage/new`
              )
            }
          >
            درخواست شمارش جدید
          </Button>
        </span>
      )}
    </div>
  );
}

export default memo(AdminIngredientsStorageEmptyStateReports);
