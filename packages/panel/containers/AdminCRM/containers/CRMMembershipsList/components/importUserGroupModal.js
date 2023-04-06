import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@material-ui/core/styles";
import { useDropzone } from "react-dropzone";
import Upload from "containers/AdminCRM/icons/upload";
import { Checkbox, LinearProgress, ListItemText, MenuItem, Select } from "@material-ui/core";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

function ImportUserGroupModal(props) {
  const {
    EXAMPLE_UPLOAD_FILE_LINK,
    labels,
    theme,
    maxWidth768,
    selectedFileData,
    submitImportUsers,
    cancelImportUsers,
    isImportUsersModalOpen,
    _isImportUsersLoading,
    _isLoadingUploadFile,
    isActiveDropzon,
    handleRemoveImportingUsersLabel,
    isUsersExcelFileValid,
    handleToggleImportingUsersLabel,
    onDrop,
    resetFileState,
    importingUsersLabels,
    isExcelFileUploaded,
    isUserChooseExcelfile,
  } = props;

  const useStyles = makeStyles(() => ({
    root: {
      "& .MuiLinearProgress-colorPrimary": {
        backgroundColor: "rgba(159 , 51 , 175 , .3)",
      },
      "& .MuiLinearProgress-barColorPrimary": {
        backgroundColor: theme.palette.primary.light,
      },
    },
  }));

  const classes = useStyles();

  const UploadComponent = ({ isLoading }) => {
    return (
      <>
        {isLoading ? (
          <>
            <Paper className="px-3 py-2 m-4" style={{ width: "90%" }}>
              <div className="d-flex flex-row-reverse align-items-center">
                <InsertDriveFileOutlinedIcon className="mx-2" /> {selectedFileData?.name ?? ""}
              </div>
              <div className={`${classes.root} d-flex flex-row-reverse align-items-center`}>
                <LinearProgress style={{ width: "100%" }} className="my-4" />
              </div>
            </Paper>
            <p>Loading...</p>
            <p> please wait</p>
          </>
        ) : (
          <>
            <Paper className="px-3 py-2 m-4 d-flex flex-row-reverse justify-content-between" style={{ width: "90%" }}>
              <div className="d-flex flex-row-reverse align-items-center">
                <InsertDriveFileOutlinedIcon className="mx-2" /> {selectedFileData?.name ?? ""}
              </div>
              <div>
                <IconButton onClick={resetFileState}>
                  <CancelOutlinedIcon size="small" style={{ color: "red" }} />
                </IconButton>
              </div>
            </Paper>
            <p>Your file was successfully loaded.</p>
          </>
        )}
      </>
    );
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <Dialog
      PaperProps={{
        style: { borderRadius: maxWidth768 ? 0 : 16, width: "max(590px ,unset )" },
      }}
      open={isImportUsersModalOpen}
      fullScreen={maxWidth768}
    >
      <Paper style={{ height: "max(600px , 100%)" }} className="p-4">
        <div className="d-flex flex-row-reverse justify-content-between mb-4">
          <IconButton onClick={cancelImportUsers} size="small">
            <CloseIcon />
          </IconButton>
          <p
            style={{
              fontSize: 16,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            Adding a group of customers
          </p>
        </div>
        <div>
          <p>You can Upload list your customers in Excel file format .xls .xlsx</p>
          <div style={{ fontSize: "15px", fontWeight: 400 }} className="d-flex justify-content-between my-4">
            <p>File *</p>
            <p style={{ borderBottom: `solid 1px ${theme.palette.primary.main}`, color: theme.palette.primary.main }}>
              <a href={EXAMPLE_UPLOAD_FILE_LINK} download={EXAMPLE_UPLOAD_FILE_LINK}>
                Download an acceptable file sample
              </a>
            </p>
          </div>
        </div>
        <div
          className="my-3 d-flex flex-column align-items-center justify-content-center "
          style={{
            border: isUserChooseExcelfile
              ? "none"
              : `dotted 3px ${isUsersExcelFileValid ? theme.palette.primary.main : "red"}`,
            background: theme.palette.grey["100"],
            cursor: "pointer",
            borderRadius: 8,
            height: 200,
            fontSize: 14,
          }}
          {...getRootProps({ onClick: (e) => (isActiveDropzon ? null : e.stopPropagation()) })}
        >
          <input {...getInputProps()} />
          {!isUserChooseExcelfile ? (
            <>
              <Upload />
              <div style={{ fontSize: 14 }} className="my-5">
                Drag and Drop your file here or
                <span style={{ fontWeight: 600, color: theme.palette.primary.main }}> Select</span>{" "}
                from your device
              </div>{" "}
            </>
          ) : (
            <>{UploadComponent({ isLoading: _isLoadingUploadFile })}</>
          )}
        </div>
        {!isUsersExcelFileValid && <p style={{ color: "red" }}>*The file format is not correct.. Try again.</p>}
        <div className="my-5">
          <div style={{ fontSize: 15 }}>Label</div>
          <div>
            <Select
              className="w-100 mb-3"
              style={{
                minWidth: 150,
                flex: 1,
                borderRadius: 8,
                height: 44,
              }}
              value={importingUsersLabels || []}
              multiple
              margin="dense"
              variant="outlined"
              displayEmpty
              size="large"
              renderValue={() => {
                if (importingUsersLabels?.length === 0) return "";
                if (importingUsersLabels?.length === 1 && importingUsersLabels[0])
                  return labels?.find((level) => level?.id === importingUsersLabels[0])?.title;
                if (importingUsersLabels?.length === labels?.length) return "All tags";
                return `${englishNumberToPersianNumber(importingUsersLabels?.length)} Label`;
              }}
              MenuProps={{
                getContentAnchorEl: null,
                style: { maxHeight: 500 },
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "center",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "center",
                },
                variant: "menu",
              }}
            >
              {labels?.map((label) => {
                return (
                  <MenuItem
                    className="px-2"
                    key={label?.title}
                    onClick={(e) => handleToggleImportingUsersLabel(e, label.id)}
                    value={label?.id}
                  >
                    <div className="w-100 d-flex align-items-center">
                      <Checkbox
                        className="p-1"
                        size="small"
                        onChange={(e) => {
                          e.preventDefault();
                        }}
                        color="primary"
                        checked={importingUsersLabels?.includes(Number(label.id)) ?? false}
                      />
                      <ListItemText primary={label?.title} className="text-right" />
                    </div>
                  </MenuItem>
                );
              })}
            </Select>
          </div>
          <p>Select Label for all your customers in the loaded file.</p>
        </div>
        <div className="my-1" style={{ minHeight: "80px" }}>
          {importingUsersLabels?.map((labelId) => (
            <Chip
              className="m-1"
              key={labelId}
              label={<span className="align-text-middle"> {labels.find((lb) => lb.id === labelId).title}</span>}
              color="primary"
              variant="outlined"
              onDelete={(e) => handleRemoveImportingUsersLabel(labelId)}
            />
          ))}
        </div>
        <div className="d-flex flex-row-reverse mt-3">
          <Button
            onClick={submitImportUsers}
            disabled={!isExcelFileUploaded || _isImportUsersLoading}
            variant="contained"
            color="primary"
            className="mx-2"
          >
            Add
          </Button>{" "}
          <Button onClick={cancelImportUsers} variant="outlined" color="primary" className="mx-2">
            cancel
          </Button>{" "}
        </div>
      </Paper>
    </Dialog>
  );
}

export default ImportUserGroupModal;
