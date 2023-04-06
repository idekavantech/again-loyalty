/**
 *
 * PURCHASE BY PRODUCT REPORTS
 *
 */
import React, { memo } from "react";
import Paper from "@material-ui/core/Paper";
import { useRouter } from "next/router";
import Icon from "@saas/components/Icon";
import { ROW_MATERIALS_STORAGE_EMPTY_STATE } from "@saas/icons";
import { textTypes } from "@saas/utils/colors";
import Button from "@material-ui/core/Button";
import {
  BRANCHES_PLUGIN,
  SHOPPING_PLUGIN_URL,
} from "@saas/utils/constants/plugins";

function AdminIngredientsStorageEmptyStateIngredients({ urlPrefix, isSuper }) {
  const router = useRouter();
  return (
    <Paper
      elevation={2}
      className="p-5 d-flex align-items-center justify-content-center flex-column mt-4"
    >
      <Icon icon={ROW_MATERIALS_STORAGE_EMPTY_STATE} width={48} height={48} />
      <div
        className="u-fontExteraLarge mt-5 mb-3"
        style={{ color: textTypes.text.default }}
      >
        Your raw materials lack warehouse!
      </div>
      <div
        className="u-fontMedium mb-4 text-justify"
        style={{ color: textTypes.text.subdued }}
      >
        In order to report the raw materials it is necessary to first direct the warehouse for
        Activate the raw materials you want.
      </div>
      <span>
        <Button
          color="primary"
          variant="contained"
          onClick={() =>
            router.push(
              `${urlPrefix}${
                isSuper ? BRANCHES_PLUGIN : SHOPPING_PLUGIN_URL
              }/settings/ingredients`
            )
          }
        >
          Warehouse activation
        </Button>
      </span>
    </Paper>
  );
}

export default memo(AdminIngredientsStorageEmptyStateIngredients);
