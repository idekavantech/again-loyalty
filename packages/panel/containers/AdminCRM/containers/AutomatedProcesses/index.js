import React from "react";
import { AUTOMATED_PROCESSES_TYPES } from "../../constants";
import AutomatedProcessesUI from './AutomatedProcessesUI'
import { useAutomatedProcesses } from "./useAutomatedProcesses";

function AutomatedProcess(props) {
  const {type} = props

  const au = AUTOMATED_PROCESSES_TYPES.find(
    (automatedProcess) => automatedProcess.type == type.type
  );

  const AutomatedProcessesHook = useAutomatedProcesses({au})

  return <AutomatedProcessesUI props={{...AutomatedProcessesHook , au} }/>
}

export default AutomatedProcess;
