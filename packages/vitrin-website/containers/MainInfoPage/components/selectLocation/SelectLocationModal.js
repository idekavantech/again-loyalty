import debounce from "lodash/debounce";

import ModalHeader from "components/Modal/ModalHeader";
import Modal from "components/Modal";
import dynamic from "next/dynamic";
import { memo, useMemo, useRef, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputAdornment from "@material-ui/core/InputAdornment";
import SubmitBtnMainInfoPage from "../SubmitBtnMainInfoPage";
import SearchIcon from "@mui/icons-material/Search";
import { getLatAndLngFromAddressBehtarino } from "@saas/utils/services/getLatAndLngFromAddress";
import { uniqByProp } from "@saas/utils/helpers/uniqByProp";
import Input from "@saas/components/Input";
import { setSnackBarMessage } from "stores/global/actions";
import { useDispatch } from "react-redux";

const Map = dynamic(() => import("@saas/components/Map"), { ssr: false });
const SelectLocationModal = ({
  isModalShown,
  setModalShown,
  selectedLocation,
  setSelectedLocation,
}) => {
  const mapRef = useRef(null);
  const [searchedAddress, searchAddress] = useState(null);
  const [searchedResultOptions, setSearchedResultOptions] = useState([
    { address: "" },
  ]);
  const uniqueByAddress = uniqByProp("address");
  const dispatch = useDispatch();
  const _setSnackBarMessage = (message, type) =>
    dispatch(setSnackBarMessage(message, type));
  const position = {
    latitude: selectedLocation?.latitude,
    longitude: selectedLocation?.longitude,
    singleMarker: true,
  };

  const mapOptions = useMemo(
    () => ({
      height: "400px",
      width: "100%",
      center: position,
      editMode: true,
      zoom: 12,
      ref: mapRef,
    }),
    []
  );

  const onSelectLocation = () => {
    const { lat, lng } = mapRef.current?.getCenter();
    setSelectedLocation({
      latitude: lat.toFixed(7),
      longitude: lng.toFixed(7),
    });
    _setSnackBarMessage("موقعیت مکانی شما با موفقیت ثبت شد.", "success");
    setTimeout(() => setModalShown(false), 200);
  };
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .MuiOutlinedInput-adornedStart {
          padding-left: 0;
          padding-right: 24px;
        },
      `,
        }}
      />
      <Modal
        onClose={() => setModalShown(false)}
        isOpen={isModalShown}
        isBig
        style={{ borderRadius: 16, maxWidth: 430, width: "100%" }}
        header={
          <ModalHeader
            onRightClick={() => setModalShown(false)}
            title="انتخاب محدوده کسب‌و‌کار"
          />
        }
        body={
          <div className="p-3" style={{ minHeight: "100%" }}>
            <Autocomplete
              freeSolo
              filterOptions={(a) => a}
              options={uniqueByAddress(
                searchedResultOptions || [{ address: "" }]
              )}
              getOptionLabel={({ address }) => address}
              onInputChange={debounce(
                (event) =>
                  getLatAndLngFromAddressBehtarino(event?.target?.value).then(
                    ({ data: result }) => {
                      setSearchedResultOptions(
                        result?.map((item) => ({
                          ...item,
                          address: `${item.title || ""}${
                            item.data_type === "neighborhood"
                              ? ` (${item.parent_name})`
                              : ""
                          }`,
                        })) || []
                      );
                    }
                  ),
                200
              )}
              onChange={(event, newValue) => {
                if (newValue?.center_point)
                  mapRef.current?.setView(
                    {
                      lat: newValue.center_point.latitude,
                      lng: newValue.center_point.longitude,
                    },
                    13
                  );
                searchAddress(newValue);
              }}
              value={searchedAddress}
              disableClearable
              renderInput={(params) => (
                <Input
                  {...params}
                  type="text"
                  dir="rtl"
                  noModal
                  label="جست‌و‌جوی محدوده"
                  placeholder={"مثلا ونک"}
                  className={`text-center u-fontMedium ${
                    selectedLocation ? "notEmpty" : null
                  } d-flex align-items-center opacity-1`}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <InputAdornment>
                          <SearchIcon style={{ color: "gray" }} />
                        </InputAdornment>
                      </>
                    ),
                  }}
                />
              )}
              className="my-4 px-0 bg-white"
              style={{
                top: 10,
                borderRadius: 8,
              }}
              classes={{
                inputRoot: "search-address-input",
              }}
            />
            <Map options={mapOptions} />
          </div>
        }
        cta={
          <div
            className="container px-0 d-flex justify-content-center"
            style={{
              backgroundColor: "#fff",
            }}
          >
            <SubmitBtnMainInfoPage onClick={onSelectLocation}>
              ثبت محدوده
            </SubmitBtnMainInfoPage>
          </div>
        }
      />
    </>
  );
};
export default memo(SelectLocationModal);
