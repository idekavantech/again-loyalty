import React, { memo } from "react";

import LoadingIndicator from "@saas/components/LoadingIndicator";
import Link from "next/link";
import { dust } from "@saas/utils/colors";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import PosDeviceIcon from "@saas/icons/PosDeviceIcon";
import { CDN_BASE_URL } from "@saas/utils/api";
import { useAdminDevicesList } from "./useAdminDevicesList";
import DeviceCreatedModal from "containers/AdminPOS/components/DeviceCreatedModal";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

function AdminDevicesList({ filters }) {
  const { minWidth768 } = useResponsive();

  const {
    devices,
    branches,
    filteredDevices,
    createDevicePageLink,
    getDeviceDrawerType,
    shouldShowDevices,
    modal,
    setModal,
    _setSnackBarMessage,
  } = useAdminDevicesList(filters);

  return (
    <div className="pl-4 pr-2">
      <DeviceCreatedModal
        isOpen={Boolean(modal.name)}
        onClose={() => setModal({})}
        device={modal}
        _setSnackBarMessage={_setSnackBarMessage}
        branches={branches}
      />
      {shouldShowDevices ? (
        <div className="d-flex mt-2 flex-wrap">
          {devices.length ? (
            filteredDevices?.length ? (
              filteredDevices.map((device, index) => {
                const drawerStatus = getDeviceDrawerType(device.drawer_status);
                return (
                  <Link
                    key={device.id}
                    passHref
                    href={createDevicePageLink(device.id)}
                  >
                    <div
                      className="mt-4 mx-2 position-relative u-border-radius-8 d-flex flex-column justify-content-center align-items-center"
                      style={{
                        width: minWidth768 ? 150 : 142,
                        height: minWidth768 ? 180 : 164,
                        border: `1px solid ${dust}`,
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: drawerStatus.surfaceColor,
                          color: drawerStatus.color,
                          width: 56,
                          height: 24,
                          borderRadius: 10,
                          right: 35,
                          top: 8,
                        }}
                        className="position-absolute d-flex align-items-center justify-content-center u-font-semi-small"
                      >
                        {drawerStatus.text}
                      </div>
                      <PosDeviceIcon />
                      <div className="mt-4 u-fontWeightBold">
                        {device.name ||
                          `دستگاه ${englishNumberToPersianNumber(index + 1)}`}
                      </div>
                      {branches.find(
                        (branch) => branch.slug === device.business_slug
                      ) ? (
                        <div className="mt-2 u-fontWeightHeavy u-fontNormal">
                          {
                            branches.find(
                              (branch) => branch.slug === device.business_slug
                            ).title
                          }
                        </div>
                      ) : (
                        <div style={{ height: 28 }} />
                      )}
                      <div
                        style={{
                          height: 8,
                          backgroundColor: drawerStatus.borderColor,
                          borderRadius: "0 0 8px 8px",
                        }}
                        className="w-100 position-absolute bottom-0"
                      />
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="d-flex flex-1 flex-column justify-content-center align-items-center p-5">
                <img alt="" src={`${CDN_BASE_URL}empty_devices.png`} />
                <div className="mt-4">با این فیلتر دستگاهی یافت نشد</div>
              </div>
            )
          ) : (
            <div className="d-flex flex-1 flex-column justify-content-center align-items-center p-5">
              <img alt="" src={`${CDN_BASE_URL}empty_devices.png`} />
              <div className="mt-4">هنوز دستگاهی اضافه نشده است.</div>
            </div>
          )}
        </div>
      ) : (
        <LoadingIndicator />
      )}
    </div>
  );
}

export default memo(AdminDevicesList);
