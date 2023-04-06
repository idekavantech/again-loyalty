import React from "react";
import styled from "styled-components";
const RollerComponent = styled.div`
  position: absolute;
  width: calc(${({ tabsLength }) => 100 / tabsLength}% - 8px);
  background: ${({ color }) => color};
  border-radius: 6px;
  top: 4;
  height: calc(100% - 8px);
  right: calc(4px + ${({ index, tabsLength }) => (100 / tabsLength) * index}%);
  transition: all 0.3s ease-in-out;
`;

function Roller({ index, color, tabsLength }) {
  return (
    <RollerComponent tabsLength={tabsLength} color={color} index={index} />
  );
}
export default Roller;
