import React, { memo } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Head from "next/head";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Skeleton } from "@material-ui/lab";
import { Button, Paper } from "@material-ui/core";
import moment from "moment-jalaali";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { deleteCrmLevel, getCrmLevels } from "store/actions";
import { makeSelectCrmLevels } from "store/selectors";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import Image from "next/dist/client/image";
import AssuranceDialog from "@saas/components/AssuranceDialog";
import useCrmLevels from "./useCrmLevels";

const tableHead = [
  {
    id: 0,
    label: "created at",
    align: "right",
    minWidth: 100,
    width: 160,
    maxWidth: 170,
  },
  {
    id: 1,
    label: "Level name",
    align: "right",
    minWidth: 100,
    width: 160,
    maxWidth: 170,
  },
  {
    id: 2,
    label: "Minimum rating",
    align: "right",
    minWidth: 100,
    width: 160,
    maxWidth: 170,
  },
  {
    id: 3,
    label: "Maximum rating",
    align: "right",
    minWidth: 100,
    width: 160,
    maxWidth: 170,
  },
  {
    id: 4,
    label: "Number of customers",
    align: "right",
    minWidth: 100,
    width: 120,
    maxWidth: 130,
  },
  {
    id: 5,
    label: "",
    align: "right",
    minWidth: 50,
    width: 50,
    maxWidth: 70,
  },
];

function CRMLevels() {
    const {
      router,
      adminUrlPrefix,
      isLoading,
      allCrmLevels,
      handleDeleteLevel,
      navigateToLevelDetail,
      selectedLevelId,
      openCancelModal,
      setOpenCancelModal,
      handleTableRowClick
    } = useCrmLevels();
    
  return (
    <div className="container">
      <Head>
        <title>Customer levels</title>
      </Head>

      <AdminBreadCrumb
        submitButtonText="Create a new level"
        submitButtonHasPlus
        submitAction={() => {
          router.push(`${adminUrlPrefix}crm/customer_levels/details/new`);
        }}
      />
      <div className="d-flex align-items-center position-relative mb-5 ">
        <p
          className="mt-2"
          style={{ fontSize: 14, fontWeight: 400, lineHeight: "24px" }}
        >
          In this section you can create customer levels and view information about each level. 
        </p>
      </div>
      <TableContainer component={Paper} style={{ border: "none" }}>
      <AssuranceDialog
          isOpen={openCancelModal}
          closeDialogHandler={() => setOpenCancelModal(false)}
          contentText= " Are you sure to remove the level?"
          dialogSecondActionTextColor="primary"
          dialogMainActions={() => {
            handleDeleteLevel(selectedLevelId)
          }}
          dialogSecondActions = {
            ()=>{
             setOpenCancelModal(false)
            }
          }
          dialogMainActionText="Yes"
          dialogSecondActionText="Good"
        />
        <Table
          aria-labelledby="tableTitle"
          size="small"
          aria-label="enhanced table"
        >
          <TableHead
            style={{
              width: "100%",
              height: 50,
              position: "sticky",
              top: 0,
              zIndex: 1000,
              background: "#E4E5E7",
              height: 64,
            }}
          >
            <TableRow style={{ width: "100%", paddingRight: 24 }}>
              {tableHead?.map((headCell, index) => (
                <TableCell
                  className="text-nowrap u-fontWeightBold"
                  key={headCell.id}
                  align={headCell.align}
                  color="text.primary"
                  style={{
                    minWidth: headCell.minWidth,
                    width: headCell.width,
                    maxWidth: headCell.maxWidth,
                    paddingRight: `${index === 0 ? "24px" : null}`,
                  }}
                >
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {isLoading ? (
            <TableBody>
              {[1, 2, 3, 4, 5].map((item) => (
                <TableRow style={{ height: 53 }} key={item.id}>
                  {[1, 2, 3, 4, 5].map((item) => (
                    <TableCell key={item.id}>
                      <Skeleton
                        style={{
                          transform: "scale(1)",
                          width: "100%",
                          height: 40,
                          padding: "24px 0",
                          align: "right",
                          minWidth: 100,
                          width: 160,
                          maxWidth: 170,
                        }}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {allCrmLevels?.map((level, index) => (
                <TableRow
                  className="faq-box my-1 cursor-pointer position-relative text-right rtl mx-4"
                  onClick={(e) => navigateToLevelDetail(e , level.id)}
                  style={{
                    borderBottom: `${
                      allCrmLevels.length - 1 === index
                        ? ""
                        : "1px solid #E4E6E7"
                    }`,
                    padding: "24px 0",
                    overflowX: "hidden",
                    height: 72,
                  }}
                  key={level.id}
                >
                  <TableCell
                    className="text-nowrap"
                    align="right"
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      paddingRight: 24,
                    }}
                  >
                    {englishNumberToPersianNumber(
                      moment(level?._created_at).format("jYYYY/jMM/jDD")
                    )}
                  </TableCell>
                  <TableCell
                    className="d-flex align-items-center justify-content-end text-nowrap"
                    align="right"
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      paddingTop: 24,
                    }}
                  >
                    {level.title}
                    <div
                      className="ml-2"
                      style={{
                        background: `${
                          level?.color.includes("#")
                            ? level?.color
                            : `#${level?.color}`
                        }`,
                        width: 16,
                        height: 16,
                        borderRadius: "100%",
                      }}
                    ></div>
                  </TableCell>
                  <TableCell
                    className="text-nowrap"
                    align="right"
                    style={{ fontSize: "16px", fontWeight: 600 }}
                  >
                    {englishNumberToPersianNumber(level.min_score)}
                  </TableCell>
                  <TableCell
                    className="text-nowrap"
                    align="right"
                    style={{ fontSize: "16px", fontWeight: 600 }}
                  >
                    {englishNumberToPersianNumber(level.max_score)}
                  </TableCell>
                  <TableCell
                    className="text-nowrap"
                    align="right"
                    style={{ fontSize: "16px", fontWeight: 600 }}
                  >
                    {englishNumberToPersianNumber(level?.num_of_memberships)}
                  </TableCell>
                  <TableCell
                    onClick={(e) =>handleTableRowClick(e , level.id)}
                  >
                    <Button style={{ padding: 0, minWidth: 24 }}>
                      <Image
                        alt="delete icon"
                        className="cursor-pointer"
                        width={24}
                        height={24}
                        src="/images/Delete 2.svg"
                      />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  adminUrlPrefix: makeSelectAdminUrlPrefix(),
  isLoading: makeSelectLoading(),
  allCrmLevels: makeSelectCrmLevels(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getCrmLevels: () => dispatch(getCrmLevels()),
    _deleteCrmLevel : (data) => dispatch(deleteCrmLevel(data))
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CRMLevels);
