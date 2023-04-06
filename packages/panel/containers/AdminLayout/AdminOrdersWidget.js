import React, { memo } from "react";
import useTheme from "@material-ui/core/styles/useTheme";
import Button from "@material-ui/core/Button";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import Badge from "@material-ui/core/Badge";

function AdminOrdersWidget({ adminOrdersWidget, onClick }) {
  const theme = useTheme();
  if (!adminOrdersWidget) return <div className="flex-1" />;
  const IconComponent = adminOrdersWidget.icon;
  return (
    <div className="flex-1">
      <Button
        color="primary"
        onClick={onClick}
        className="u-cursor-pointer h-100 u-fontNormal-r position-relative mx-1 d-flex justify-content-start align-items-center flex-1 px-4"
      >
        <Badge
          invisible={!adminOrdersWidget.ordersAmount}
          badgeContent={
            <span
              style={{
                background: theme.palette.primary.main,
                color: "white",
                borderRadius: "1rem",
                padding: ".2rem .2rem",
                height: "1.2rem",
                minWidth: "1.2rem",
                border: "solid 1px white",
                fontSize: ".9rem",
              }}
            >
              {englishNumberToPersianNumber(adminOrdersWidget.ordersAmount)}
            </span>
          }
          children={
            <IconComponent
              color="primary"
              className="ml-1"
              style={{ fontSize: 24 }}
              data-tour="widget"
            />
          }
        />

        Orders
      </Button>
    </div>
  );
}

export default memo(AdminOrdersWidget);
