import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import { useState } from "react";
import useTheme from "@material-ui/core/styles/useTheme";
import Link from "next/link";
import { SHOPPING_PLUGIN_URL } from "@saas/utils/constants/plugins";
import { slugify } from "@saas/utils/helpers/slugify";

export default function CategoryNode({ node, urlPrefix, handleDrawerClose }) {
  const theme = useTheme();
  const [isCollapseOpen, setCollapseOpen] = useState({});
  const handleCollapse = (e) => {
    setCollapseOpen({ ...isCollapseOpen, [e]: !isCollapseOpen[e] });
  };
  if (!node.children.length)
    return (
      <Link
        href={`${urlPrefix || ""}/${SHOPPING_PLUGIN_URL}/c/${node.id}-${slugify(
          node.name
        )}`}
        passHref
        target="_blank"
      >
        <div className="p-2">
          <div className="text-right pl-0" onClick={handleDrawerClose}>
            <div>{node.name}</div>
          </div>
        </div>
      </Link>
    );

  return (
    <div>
      {node.name && (
        <div onClick={() => handleCollapse(node.id)}>
          <div
            button
            className="text-right d-flex justify-content-between"
            style={{ padding: "10px 10px 10px 0px" }}
          >
            <div
              style={{
                color: isCollapseOpen[node.id] && theme.palette.secondary.main,
              }}
            >
              {node.name}
            </div>
            {isCollapseOpen[node.id] ? (
              <ExpandLess
                color="secondary"
                onClick={() => handleCollapse(node.id)}
                fontSize="small"
              />
            ) : (
              <ExpandMore
                onClick={() => handleCollapse(node.id)}
                fontSize="small"
              />
            )}
          </div>
        </div>
      )}
      <Collapse
        component="li"
        in={node.id ? isCollapseOpen[node.id] : true}
        timeout="auto"
        unmountOnExit
      >
        <div>
          {node.children.map((c) => (
            <div key={c.id} className="mr-2">
              <CategoryNode
                node={c}
                urlPrefix={urlPrefix}
                handleDrawerClose={handleDrawerClose}
              />
            </div>
          ))}
        </div>
      </Collapse>
    </div>
  );
}
