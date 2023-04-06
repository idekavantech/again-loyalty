import { useRouter } from "next/router";
import Image from "next/image";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import { Fragment } from "react";

const devices = [
  { id: 0, imageSm: "/images/stay-primary-portrait.svg", imageLg: "/images/template-mobile-lg.svg", label: "mobile" },
  { id: 1, imageSm: "/images/tablet-android.svg", imageLg: "/images/template-tablet-lg.svg", label: "tablet" },
  { id: 2, imageSm: "/images/desktop-mac.svg", imageLg: "/images/template-desktop-lg.svg", label: "desktop" },
];
const TemplateHeader = ({ selectedDevice, setSelectedDevice }) => {
  const router = useRouter();
  return (
    <div
      className="template-header container d-flex flex-row-reverse justify-content-between py-5 align-items-center "
      style={{ position: "absolute", top: 0, zIndex: 100 }}
    >
      <div className="template-header-device-icon d-flex align-items-center justify-content-center">
        {devices.map((device) => (
          <Fragment key={device.id}>
            <div
              className="d-flex d-md-none align-items-center justify-content-center mx-2 p-1 p-md-2"
              onClick={() => {
                setSelectedDevice(device.label);
              }}
              style={{
                border:
                  device.label == selectedDevice
                    ? "1px solid #0050FF"
                    : "1px solid transparent",
                borderRadius: "50%",
                backgroundColor:
                  device.label == selectedDevice ? "#DFE9FF" : "transparent",
              }}
              key={device.label}
            >
              <Image alt="" width={24} height={24} src={device.imageSm} />
            </div>
            <div
              className="d-none d-md-flex align-items-center justify-content-center mx-2 p-1 p-md-2"
              onClick={() => {
                setSelectedDevice(device.label);
              }}
              style={{
                border:
                  device.label == selectedDevice
                    ? "1px solid #0050FF"
                    : "1px solid transparent",
                borderRadius: "50%",
                backgroundColor:
                  device.label == selectedDevice ? "#DFE9FF" : "transparent",
              }}
              key={device.label}
            >
              <Image alt="" width={34} height={34} src={device.imageLg} />
            </div>
          </Fragment>

        ))}
      </div>
      <div className="d-none d-md-block">
        <Image
          height={36}
          width={108}
          src={"/images/logo-desktop-blue.svg"}
          alt="logo"
          priority
        />
      </div>
      <div>
        <p
          className="d-flex align-items-center"
          style={{
            fontSize: 14,
            color: "#00000096",
            cursor: "pointer",
            fontWeight: 700,
          }}
          onClick={() => router.back()}
        >
          <ArrowBackIosRoundedIcon style={{ fontSize: 16, transform: "rotate(180deg)" }} />
          <span className="back-text mr-3"> بازگشت</span>
        </p>
      </div>
    </div>
  );
};

export default TemplateHeader;
