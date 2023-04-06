/**
 *
 * HeaderIconsWidget
 *
 */

import React, { memo } from "react";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import useTheme from "@material-ui/core/styles/useTheme";
import { pushParamsToUrl } from "@saas/utils/helpers/pushParamsToUrl";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import Icons from "@saas/utils/IconsDictionary";
import { useRouter } from "next/router";

function HeaderIconsWidget({ widgets }) {
  const theme = useTheme();
  const router = useRouter();
  return widgets.map((pluginIcon) => {
    const Icon = Icons[pluginIcon.icon];
    if (pluginIcon.itemsAmount) {
      return (
        <IconButton
          className="p-1"
          aria-label="menu"
          key={pluginIcon.id}
          onClick={() =>
            pluginIcon.link
              ? router.push(pluginIcon.link)
              : pluginIcon.item
              ? pushParamsToUrl(pluginIcon.item)
              : null
          }
        >
          <Badge
            style={{
              border: `1px solid ${theme && theme.palette.background.default}`,
              fontWeight: 700,
            }}
            badgeContent={englishNumberToPersianNumber(pluginIcon.itemsAmount)}
            color="secondary"
          >
            <Icon color="secondary" />
          </Badge>
        </IconButton>
      );
    }
    return (
      <IconButton
        className="p-1"
        aria-label="menu"
        key={pluginIcon.id}
        onClick={() =>
          pluginIcon.link
            ? router.push(pluginIcon.link)
            : pluginIcon.item
            ? pushParamsToUrl(pluginIcon.item)
            : null
        }
      >
        <Icon color="secondary" />
      </IconButton>
    );
  });
}

export default memo(HeaderIconsWidget);
