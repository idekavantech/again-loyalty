import React, { useState } from "react";
import Collapse from "@material-ui/core/Collapse";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Input from "@saas/components/Input";
import Button from "@material-ui/core/Button";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import { borderColor, dust } from "@saas/utils/colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import useTheme from "@material-ui/core/styles/useTheme";
import dynamic from "next/dynamic";
import { quillModules } from "store/constants";
import AdminProductInBoxWrapper from "./AdminProductInBoxWrapper";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

function InfoTable({
  infoTable,
  setInfoTable,
  onProductInfoTableRowKeyChange,
  onProductInfoTableRowValueChange,
  createProductInfoTableRow,
  deleteProductInfoTableRow,
  onProductComplementaryChange,
  emptyProductComplementaryChange,
  product,
}) {
  const [collapse, setCollapse] = useState(Boolean(infoTable.length));
  const theme = useTheme();
  const toggleInfoTable = (e) => {
    setCollapse(e.target.checked);
    if (!e.target.checked) {
      emptyProductComplementaryChange();
    }
    if (!e.target.checked) setInfoTable([]);
    else setInfoTable([{ key: "", value: "" }]);
  };
  if (!product) return null;
  const {
    extra_data: { complementary = "" },
  } = product;
  return (
    <AdminProductInBoxWrapper smallPadding>
      <div className={"col-12"}>
        <div className="d-flex justify-content-between flex-1 py-2">
          <div>
            <div className="u-fontLarge u-fontWeightBold">
              Profile table and additional description table
            </div>
            <div className="mt-2">
              You can make a separate table of your product features and to
              Display customers.
            </div>
          </div>
          <div
            className={
              "w-100 d-flex justify-content-between align-items-center"
            }
            style={{ width: 80 }}
          >
            <FormControlLabel
              className="ml-1"
              control={
                <Switch
                  size="small"
                  checked={collapse}
                  onChange={toggleInfoTable}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  color="primary"
                />
              }
              labelPlacement="start"
              label=""
            />
            {collapse ? "active" : "Inactive"}
          </div>
        </div>
        <Collapse in={collapse}>
          <div>
            {infoTable?.length ? (
              <div className="d-flex align-items-center">
                <div
                  style={{
                    border: `1px solid ${dust}`,
                    borderTopLeftRadius: 4,
                    borderTopRightRadius: 4,
                  }}
                  className="d-flex overflow-hidden flex-1 align-items-center"
                >
                  <div
                    style={{
                      height: 40,
                      backgroundColor: theme.palette.background.paper,
                    }}
                    className="d-flex flex-1 px-0 col-4 px-2 align-items-center"
                  >
                    The character name
                  </div>
                  <div
                    style={{
                      height: 40,
                      borderRight: `1px solid ${dust}`,
                      backgroundColor: theme.palette.background.paper,
                    }}
                    className="d-flex flex-1 px-0 col-8 px-2 align-items-center"
                  >
                    Description
                  </div>
                </div>

                <div style={{ height: 38, width: 38 }} />
              </div>
            ) : null}
            {infoTable?.map((row, index) => (
              <div key={index} className="d-flex align-items-center">
                <div
                  style={{ borderBottom: `1px solid ${dust}` }}
                  className="d-flex flex-1 align-items-center"
                >
                  <div
                    style={{
                      borderRight: `1px solid ${dust}`,
                      height: 40,
                    }}
                    className="d-flex flex-1 px-0 col-4 align-items-center"
                  >
                    <Input
                      style={{ height: 40 }}
                      className="px-2"
                      tableInput
                      value={row.key}
                      onChange={onProductInfoTableRowKeyChange(index)}
                    />
                  </div>
                  <div
                    style={{
                      borderRight: `1px solid ${dust}`,
                      borderLeft: `1px solid ${dust}`,
                      height: 40,
                    }}
                    className="d-flex flex-1 px-0 col-8 align-items-center"
                  >
                    <Input
                      style={{ height: 40 }}
                      className="px-2"
                      fullWidth
                      tableInput
                      value={row.value}
                      label="Feature description"
                      onChange={onProductInfoTableRowValueChange(index)}
                    />
                  </div>
                </div>

                <IconButton
                  size="small"
                  className="mr-2"
                  onClick={() => deleteProductInfoTableRow(index)}
                >
                  <ClearRoundedIcon color="text.disabled" />
                </IconButton>
              </div>
            ))}
            <Button
              className="u-cursor-pointer mt-2"
              onClick={createProductInfoTableRow}
              color="primary"
            >
              <AddCircleOutlineRoundedIcon className="ml-2" color="primary" />
              Add new row
            </Button>
          </div>
          <div className="w-100">
            <div className="mb-2">Supplementary product description</div>
            <ReactQuill
              placeholder="In detail the product aspects and its important features."
              value={complementary || ""}
              onChange={onProductComplementaryChange}
              modules={quillModules}
              theme="snow"
              className="text-left"
            />
          </div>
        </Collapse>
      </div>
    </AdminProductInBoxWrapper>
  );
}

export default InfoTable;
