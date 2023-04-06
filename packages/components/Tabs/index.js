/**
 *
 * Switch
 *
 */

import React, { memo } from "react";
import styled from "styled-components";
import Tab from "./Tab";
import Roller from "./Roller";
import { hexToRGBA } from "@saas/utils/helpers/hexToRGBA";
const TabsComponent = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin: auto;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 4px inset;
  border-radius: 8px;
  height: 40px;
  padding: 4px;
`;
function Tabs({ tabs, selectedTab, selectTab }) {
  const index = tabs.findIndex((tab) => tab.value === selectedTab.value);
  return (
    <TabsComponent>
      <Roller
        index={index}
        color={hexToRGBA(selectedTab.color, 0.1)}
        tabsLength={tabs.length}
      />
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          text={tab.text}
          tabsLength={tabs.length}
          color={tab.color}
          selected={selectedTab.value === tab.value}
          onSelect={() => {
            selectTab(tab);
          }}
        />
      ))}
    </TabsComponent>
  );
}

export default memo(Tabs);
