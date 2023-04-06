/* eslint-disable no-param-reassign */
/* eslint-disable indent */
import Collapse from "@material-ui/core/Collapse";
import React, { memo, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Paper from "@material-ui/core/Paper";
import useTheme from "@material-ui/core/styles/useTheme";
import AddNewItemSection from "@saas/components/AddNewItemSection";
import { noOp } from "@saas/utils/helpers/noOp";
import { findKey } from "@saas/utils/helpers/findKey";

import EditRoundedIcon from "@material-ui/icons/EditRounded";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import IconButton from "@material-ui/core/IconButton";
import Link from "next/link";
import { SHOPPING_PLUGIN_URL } from "@saas/utils/constants/plugins";
import { useRouter } from "next/router";

function NavigationItem({
  item,
  themeColor,
  dragHandleProps,
  setHierarchy,
  hierarchy,
  urlPrefix,
}) {
  const theme = useTheme();
  const router = useRouter();
  themeColor = themeColor || theme.palette.primary.main;
  const [collapse, setCollapse] = useState(!item.id);
  const onDragEnd = (e) => {
    const newList = [...item.children];
    const draggbleItem = newList[e.source.index];
    newList.splice(e.source.index, 1);
    newList.splice(e.destination.index, 0, draggbleItem);
    const newItem = findKey(hierarchy, item.id);
    newItem.children = newList;
    setHierarchy({ ...hierarchy });
  };

  const parent = findKey(hierarchy, item.parent);
  const childIndex =
    parent && parent.children
      ? parent.children.findIndex((c) => c.id === item.id)
      : -1;
  return (
    <div className="d-flex w-100 flex-1">
      {item.parent ? (
        <div style={{ width: 15 }} className="position-relative">
          <div
            className={`u-background-dark-grey ${
              childIndex === parent.children.length - 1 ? "h-25-px" : "h-100"
            } mx-auto`}
            style={{ width: 1 }}
          />
          <div
            className="w-50 position-absolute left-0 u-background-dark-grey"
            style={{ height: 1, top: 25 }}
          />
        </div>
      ) : null}
      <div className="flex-1">
        {item.id ? (
          <Paper
            elevation={2}
            className="d-flex px-3 py-2 mt-1 u-border-radius-4 align-items-center"
          >
            <div
              style={{ color: theme.palette.text.secondary }}
              className="d-flex align-items-center flex-1"
            >
              {dragHandleProps && (
                <span className="dragHandle d-flex  ml-2" {...dragHandleProps}>
                  <DragIndicatorIcon />
                </span>
              )}
              <div
                onKeyDown={noOp}
                tabIndex="0"
                role="button"
                className="u-cursor-pointer flex-1 align-items-center d-flex"
                onClick={() => setCollapse(!collapse)}
              >
                {item.name}
                <ArrowDropDownRoundedIcon
                  style={{
                    transform: `rotate(${collapse ? 180 : 0}deg)`,
                    transition: "all 0.3s ease-in-out",
                  }}
                />
              </div>
              <Link
                href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/settings/c/${item.id}`}
                passHref
              >
                <IconButton className="p-1" color="primary">
                  <EditRoundedIcon />
                </IconButton>
              </Link>
            </div>
          </Paper>
        ) : null}
        <Collapse in={collapse}>
          {item.id ? (
            <Paper elevation={2} className="p-1 mt-1">
              <div style={{ width: 150 }}>
                <AddNewItemSection
                  className="px-2 u-height-32 d-flex u-border-none "
                  onClick={() =>
                    router.push(
                      `${urlPrefix}${SHOPPING_PLUGIN_URL}/settings/c/[id]?parent=${item.id}`,
                      `${urlPrefix}${SHOPPING_PLUGIN_URL}/settings/c/new/?parent=${item.id}`
                    )
                  }
                  color={themeColor}
                  title="Add sub -category"
                />
              </div>
            </Paper>
          ) : null}
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="deal_categories">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {item.children
                    ? item.children.map((childItem, index) => (
                        <Draggable
                          draggableId={`menu-item-${childItem.id}`}
                          index={index}
                          key={`menu-item-${childItem.id}`}
                        >
                          {(_provided) => (
                            <div
                              ref={_provided.innerRef}
                              {..._provided.draggableProps}
                            >
                              <NavigationItem
                                urlPrefix={urlPrefix}
                                dragHandleProps={_provided.dragHandleProps}
                                item={childItem}
                                setHierarchy={setHierarchy}
                                hierarchy={hierarchy}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))
                    : null}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Collapse>
      </div>
    </div>
  );
}

export default memo(NavigationItem);
