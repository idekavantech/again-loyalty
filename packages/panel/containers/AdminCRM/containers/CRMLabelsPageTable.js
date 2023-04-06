import React, { memo, useState } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import { Skeleton } from "@material-ui/lab";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Image from "next/image";
import AssuranceDialog from "@saas/components/AssuranceDialog";
import { useRouter } from "next/router";
import EditCrmLabel from "./modals/editCrmLabel";
import { deleteCRMLabel, getCrmLevels, updateCrmLabel, updateCrmLables } from "store/actions";
import Link from "next/link";

function CRMLabelsPageTable({ labels, isLoading, setLabels, adminUrlPrefix , _updateLabels ,_deleteCrmLabel}) {
  const [labelIndex, setLabelIndex] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [labelId , setLabelId] = useState(null)
  const router = useRouter();
  const removeRow = (id) => {
    _deleteCrmLabel(id)

  };

  return (
    <TableContainer className="mt-3" component={Paper} style={{ border: "none" }}>
      <Table aria-labelledby="tableTitle" size="small" aria-label="enhanced table">
        <TableHead>
          <TableRow>
            <TableCell
              className="p-4"
              style={{
                fontWeight: 600,
                textAlign: "right",
                fontSize: 12,
              }}
            >
              Label name
            </TableCell>
            <TableCell className="p-4" style={{ fontWeight: 600, fontSize: 12, whiteSpace: "nowrap" }}>
              Number of customers
            </TableCell>
          </TableRow>
        </TableHead>
        {isLoading ? (
          <TableBody className="w-100">
            {[1, 2, 3, 4, 5].map((item) => (
              <TableRow key={item}>
                <TableCell
                  style={{
                    width: "100%",
                  }}
                >
                  <Skeleton
                    style={{
                      transform: "scale(1)",
                      width: "100%",
                      height: 40,
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody className="w-100">
            {labels?.map((label, index) => (
              <TableRow
                component={Link}
                href={`${adminUrlPrefix}crm/customers?label=${label.id}`}
                style={{
                  background: index % 2 == 0 ? "#F6F6F7" : "#FAFBFB",
                }}
                key={label?.id}
              >
                <TableCell
                  className="p-4 cursor-pointer"
                  style={{
                    fontWeight: 600,
                    textAlign: "right",
                    fontSize: 16,
                    lineHeight: "24px",
                  }}
                >
                  {label?.title}
                </TableCell>
                <TableCell
                  className="d-flex align-items-center justify-content-end p-4"
                  style={{
                    fontWeight: 600,
                    fontSize: 16,
                    lineHeight: "24px",
                  }}
                >
                  <div className="ml-4">{englishNumberToPersianNumber(label?.num_of_memberships)}</div>
                  <Image
                    alt=""
                    onClick={() => {
                      setLabelIndex(index);
                      setLabelId(label.id);
                      router.push(`${adminUrlPrefix}crm/labels?edit_modal=true`);
                    }}
                    className="cursor-pointer"
                    width={20}
                    height={20}
                    src="/images/pen.svg"
                  />
                  <div
                    style={{
                      width: "1px",
                      background: "#E4E6E7",
                      height: 20,
                    }}
                    className="mx-2"
                  ></div>
                  <Image
                    alt=""
                    onClick={() => {
                      setLabelIndex(index);
                      setLabelId(label.id);
                      setIsOpenModal(true);
                    }}
                    className="cursor-pointer"
                    width={22}
                    height={22}
                    src="/images/Delete 2.svg"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
      <AssuranceDialog
        isOpen={isOpenModal}
        closeDialogHandler={() => setIsOpenModal(false)}
        contentText="Are you sure you want to delete the saved label?"
        dialogSecondActionTextColor="primary"
        dialogMainActions={() => {
          removeRow(labelId);
          setIsOpenModal(false);
        }}
        dialogMainActionText="Delete"
        dialogSecondActions={() => setIsOpenModal(false)}
        dialogSecondActionText="cancel"
      />

      {router?.query?.edit_modal ? (
        <EditCrmLabel
          labelIndex={labelIndex}
          labels={labels}
          setLabels={setLabels}
          _updateLabels={_updateLabels}
          labelId={labelId}
        />
      ) : null}
    </TableContainer>
  );
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  adminUrlPrefix: makeSelectAdminUrlPrefix(),
});
function mapDispatchToProps(dispatch) {
  return {
    _updateCustomerLabels: (data) => dispatch(updateCrmLables(data)),
    _getCrmLevels: () => dispatch(getCrmLevels()),
    _updateLabels : (data) => dispatch(updateCrmLabel(data)),
    _deleteCrmLabel : (id) => dispatch(deleteCRMLabel(id))
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(CRMLabelsPageTable);
