import React, { memo } from "react";
import { useAutomatedProcesses } from "./useAutomatedProcesses";
import AutomatedProcessDetailUI from "./AutomatedProcessDetailUI";
import { AUTOMATED_PROCESSES_TYPES } from "../../constants";


function AddActionCRMAutomatedTrends(props) {
  const { type } = props;

  const au = AUTOMATED_PROCESSES_TYPES.find(
    (automatedProcess) => automatedProcess.type == type.type
  );

  const AutomatedProcessesDetailHook = useAutomatedProcesses({ au });

  return (
    <AutomatedProcessDetailUI props={{ ...AutomatedProcessesDetailHook, au }} />
  );
}

export default memo(AddActionCRMAutomatedTrends);
