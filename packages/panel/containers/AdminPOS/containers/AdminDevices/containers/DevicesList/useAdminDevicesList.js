import { getPosDevices } from "store/actions";
import { makeSelectPOSDevices } from "store/selectors";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeSelectBranches } from "@saas/stores/business/selector";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import { setSnackBarMessage } from "@saas/stores/ui/actions";
import { cashDrawerTypes } from "containers/AdminPOS/constants";
export function useAdminDevicesList(filters) {
  const devices = useSelector(makeSelectPOSDevices());
  const branches = useSelector(makeSelectBranches());
  const urlPrefix = useSelector(makeSelectAdminUrlPrefix());
  const loading = useSelector(makeSelectLoading());
  const dispatch = useDispatch();
  const _getDevices = () => dispatch(getPosDevices());
  const _setSnackBarMessage = (message, type) =>
    dispatch(setSnackBarMessage(message, type));
  const [modal, setModal] = useState({});

  const { selectedTypes, search, selectedBranches } = filters;

  const filteredDevices = useMemo(
    () =>
      devices
        ?.filter((device) => !device.name || device.name.includes(search))
        ?.filter(
          (device) =>
            !branches ||
            !branches.length ||
            selectedBranches.find((selected) => selected === device.business)
        )
        ?.filter((device) =>
          selectedTypes.find(
            (type) => parseInt(type) === parseInt(device.drawer_status)
          )
        ) || [],
    [devices, selectedTypes, selectedBranches, search]
  );
  const createDevicePageLink = (deviceId) => `${urlPrefix}devices/${deviceId}`;
  const getDeviceDrawerType = (deviceDrawerStatus) =>
    cashDrawerTypes.find(
      (_drawer) => parseInt(_drawer.id) === parseInt(deviceDrawerStatus)
    );
  useEffect(() => {
    setTimeout(() => _getDevices(), 0);
  }, []);

  useEffect(() => {
    const name = localStorage.getItem("selected-pos-device");
    if (name && devices && devices.find((device) => device.name === name)) {
      setModal(devices.find((device) => device.name === name));
      localStorage.removeItem("selected-pos-device");
    }
  }, [devices]);

  const shouldShowDevices = !loading && devices;
  return {
    devices,
    filteredDevices,
    branches,
    createDevicePageLink,
    shouldShowDevices,
    getDeviceDrawerType,
    shouldShowDevices,
    modal,
    setModal,
    _setSnackBarMessage,
  };
}
