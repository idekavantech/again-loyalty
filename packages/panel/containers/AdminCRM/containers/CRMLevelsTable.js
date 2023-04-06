import React, { memo, useState, useEffect } from "react";
import Image from "next/image";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@material-ui/icons/ExpandLessRounded";
import { Collapse } from "react-collapse";
import TableContainer from "@material-ui/core/TableContainer";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Skeleton } from "@material-ui/lab";
import AssuranceDialog from "@saas/components/AssuranceDialog";
import Input from "@saas/components/Input";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

function CRMLevelsTable({
  crmLevels,
  setCrmLevels,
  isOpen,
  setIsOpen,
  theme,
  isLoading,
}) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [levelIndex, setLevelIndex] = useState("");
  const [order, setOrder] = useState(0);
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    if (crmLevels?.length) {
      setLevels(crmLevels);
    }
  }, [crmLevels]);

  useEffect(() => {
    if (levels?.length) {
      setOrder(levels?.length + 1);
    }
  }, [levels]);

  const addNewRow = () => {
    setCrmLevels([
      ...crmLevels,
      {
        title: "New level",
        min_score: null,
        max_score: null,
        color: "#000000",
        order: order,
      },
    ]);
  };

  const removeRow = (index) => {
    const _crmLevels = [...crmLevels];
    _crmLevels.splice(index, 1);
    setCrmLevels(_crmLevels.length ? _crmLevels : []);
  };

  return (
    <TableContainer component={Paper} style={{ border: "none" }}>
      <Table
        aria-labelledby="tableTitle"
        size="small"
        aria-label="enhanced table"
      >
        {isLoading ? (
          <TableBody>
            {[1, 2, 3, 4, 5].map((item) => (
              <TableRow style={{ height: 53 }} key={item}>
                <TableCell>
                  <Skeleton
                    style={{
                      transform: "scale(1)",
                      width: "100%",
                      height: 40,
                      padding: "24px 0",
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            {crmLevels?.map(
              ({ title, min_score, max_score, color, id }, index) => (
                <div
                  className={`faq-box my-1 position-relative text-right rtl`}
                  style={{
                    borderBottom: "1px solid #E4E6E7",
                    padding: "24px 0",
                    overflowX: "hidden",
                  }}
                  key={id}
                >
                  <div onClick={() => setIsOpen({ [index]: !isOpen[index] })}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <div
                          className="cursor-pointer"
                          style={{ marginLeft: 22 }}
                          onClick={() => setIsOpen({ [index]: !isOpen[index] })}
                        >
                          {isOpen[index] ? (
                            <ExpandLessRoundedIcon className="w-100" />
                          ) : (
                            <ExpandMoreRoundedIcon className="w-100" />
                          )}
                        </div>
                        <div
                          className="cursor-pointer cursor-pointer u-fontLarge u-pre-wrap u-overflow-wrap"
                          onClick={() => setIsOpen({ [index]: !isOpen[index] })}
                          style={{ fontSize: "16 !important", fontWeight: 600 }}
                        >
                          {title}
                        </div>
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          setLevelIndex(index);
                          setIsOpenModal(true);
                        }}
                      >
                        <Image
                          alt=""
                          className="cursor-pointer"
                          width={22}
                          height={22}
                          src="/images/Delete 2.svg"
                        />
                      </div>
                    </div>
                  </div>
                  <Collapse isOpened={isOpen[index]} className="w-100">
                    <div className="row d-flex py-3 u-fontLarge u-pre-wrap u-overflow-wrap justify-content-between">
                      <div className="mb-2 col-12 col-lg-4">
                        <p
                          style={{ fontSize: 12, fontWeight: 600 }}
                          className="mb-2"
                        >
                          Level name
                        </p>
                        <input
                          placeholder={title}
                          style={{
                            paddingTop: 11,
                            paddingBottom: 10,
                            color: "#202223",
                            border: "1px solid #E4E6E7",
                            borderRadius: 8,
                            fontSize: 14,
                            fontWeight: 400,
                          }}
                          value={title}
                          onChange={(e) => {
                            const newCrmLevels = JSON.parse(
                              JSON.stringify(crmLevels)
                            );
                            newCrmLevels[index].title = e.target.value;
                            setCrmLevels(newCrmLevels);
                          }}
                          className="w-100 px-4"
                        />
                      </div>
                      <div className="col-12 col-lg-4">
                        <p
                          style={{ fontSize: 12, fontWeight: 600 }}
                          className="mb-2"
                        >
                          Rating
                        </p>
                        <div className="d-flex align-items-start">
                          <Input
                            className="customInput"
                            placeholder="Minimum rating"
                            required={true}
                            value={
                              min_score || min_score === 0
                                ? englishNumberToPersianNumber(min_score)
                                : null
                            }
                            type="text"
                            onChange={(value) => {
                              const newCrmLevels = JSON.parse(
                                JSON.stringify(crmLevels)
                              );
                              newCrmLevels[index].min_score = parseInt(value);
                              setCrmLevels(newCrmLevels);
                            }}
                            numberOnly
                          />
                          <span className="mx-2" style={{ paddingTop: 12 }}>
                            until the
                          </span>
                          <Input
                            className="customInput"
                            placeholder="Maximum rating"
                            required={true}
                            value={
                              max_score || max_score === 0
                                ? englishNumberToPersianNumber(max_score)
                                : null
                            }
                            type="text"
                            onChange={(value) => {
                              const newCrmLevels = JSON.parse(
                                JSON.stringify(crmLevels)
                              );
                              newCrmLevels[index].max_score = parseInt(value);
                              setCrmLevels(newCrmLevels);
                            }}
                            numberOnly
                          />
                        </div>
                      </div>
                      <div className="col-12 col-lg-4">
                        <p
                          style={{ height: 17 }}
                          className="mb-2 align-items-center"
                        ></p>
                        <div
                          className="d-flex w-100 pr-4 pl-1 justify-content-between align-items-center"
                          style={{
                            border: "1px solid #E4E6E7",
                            borderRadius: 8,
                            padding: "1px 0",
                          }}
                        >
                          <p style={{ fontSize: 12, fontWeight: 600 }}>
                            Select surface color
                          </p>
                          <div style={{ width: 40, height: 40 }}>
                            <input
                              type="color"
                              className="w-100"
                              value={color}
                              onChange={(e) => {
                                const newCrmLevels = JSON.parse(
                                  JSON.stringify(crmLevels)
                                );
                                newCrmLevels[index].color = e.target.value;
                                setCrmLevels(newCrmLevels);
                              }}
                              style={{
                                height: "100%",
                                borderRadius: 4,
                                border: "none",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Collapse>
                </div>
              )
            )}
          </TableBody>
        )}
        <div
          className="d-flex align-items-center justify-content-center cursor-pointer"
          style={{
            border: `1px dashed ${theme.palette.primary.main}`,
            borderRadius: 4,
            padding: 10,
            marginTop: 24,
          }}
          onClick={addNewRow}
        >
          <AddIcon style={{ color: theme.palette.primary.main }} />
          <span
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: theme.palette.primary.main,
            }}
            className="ml-2"
          >
            Create a new level
          </span>
        </div>
        <AssuranceDialog
          isOpen={isOpenModal}
          closeDialogHandler={() => setIsOpenModal(false)}
          contentText="Are you sure you want to delete the stored level?"
          dialogMainActions={() => {
            removeRow(levelIndex);
            setIsOpenModal(false);
          }}
          dialogMainActionText="Delete"
          dialogSecondActions={() => setIsOpenModal(false)}
          dialogSecondActionText="cancel"
        />
      </Table>
    </TableContainer>
  );
}
export default memo(CRMLevelsTable);
