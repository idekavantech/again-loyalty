import React, { memo } from "react";
import useTheme from "@material-ui/core/styles/useTheme";
import Button from "@material-ui/core/Button";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import Badge from "@material-ui/core/Badge";

function AdminOrdersWidget({ adminOrdersWidget, onClick }) {
  const theme = useTheme();
  if (!adminOrdersWidget) return <div className="flex-1" />;
  const IconComponent = adminOrdersWidget.icon;
  return <div className="flex-1"></div>;
}

export default memo(AdminOrdersWidget);
