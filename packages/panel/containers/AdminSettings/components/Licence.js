import React, { memo } from "react";
import Input from "@saas/components/Input";
import Paper from "@material-ui/core/Paper";
import { night } from "@saas/utils/colors";
import Switch from "@saas/components/Switch";
import useTheme from "@material-ui/core/styles/useTheme";
function Licence({
  Enamad,
  changeEnamad,
  samandehi,
  changeSamandehi,
  virtualBusinessAssociation,
  changeVirtualBusinessAssociation,
  showLicence,
  setShowLicence,
}) {
  const theme = useTheme();
  return (
    <Paper elevation={1} className="d-flex mt-3 py-3 flex-wrap">
      <div className="d-flex col-12">
        <span className="u-fontLarge" style={{ color: night }}>
          Business permits
        </span>
        <Switch
          onColor={theme.palette.primary.main}
          isSwitchOn={showLicence}
          toggleSwitch={() => {
            setShowLicence(!showLicence);
          }}
        />
      </div>
      <p className="mt-3 col-12">
        Can if you would like your Internet business permits information
        Including Inmad, the organization and the union of virtual businesses are imported here
        do. Below you can show them in editing your site pages.
      </p>
      {showLicence ? (
        <>
          {" "}
          <div className="d-flex flex-wrap w-100 mt-5">
            <div className="col-12 col-lg-6 mb-3">
              <div className="u-fontLarge" style={{ color: night }}>
                Inm
              </div>
              <Input
                className="mt-3"
                label="Inm"
                value={Enamad}
                onChange={changeEnamad}
                multiline
                inputProps={{ style: { textAlign: "left" } }}
              />
            </div>
            <div className="col-12 col-lg-6 mb-3">
              <div className="u-fontLarge" style={{ color: night }}>
                Organizing
              </div>
              <Input
                className="mt-3"
                label="Organizing"
                value={samandehi}
                onChange={changeSamandehi}
                multiline
                inputProps={{ style: { textAlign: "left" } }}
              />
            </div>
          </div>
          <div className="d-flex flex-wrap w-100">
            <div className="col-12 col-lg-6 mb-3">
              <div className="u-fontLarge" style={{ color: night }}>
                Virtual Business Union
              </div>
              <Input
                className="mt-3"
                label="Virtual Business Union"
                value={virtualBusinessAssociation}
                onChange={changeVirtualBusinessAssociation}
                multiline
                inputProps={{ style: { textAlign: "left" } }}
              />
            </div>
          </div>
        </>
      ) : null}
    </Paper>
  );
}

export default memo(Licence);
