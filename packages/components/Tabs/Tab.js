import React from "react";
import styled from "styled-components";
import { ellipseText } from "@saas/utils/helpers/ellipseText";
const TabComponent = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => 100 / props.tabsLength}%;
  font-size: 14px;
  height: 100%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  ${({ selected, color }) =>
    selected
      ? `
      color: ${color}
    `
      : ""}
`;

function Tab({ text, selected, onSelect, color, tabsLength }) {
  return (
    <TabComponent
      tabsLength={tabsLength}
      onClick={onSelect}
      selected={selected}
      color={color}
    >
      {ellipseText(text.toUpperCase(), 22)}
    </TabComponent>
  );
}

export default Tab;
