import { GridContextProvider, GridDropZone, GridItem } from "react-grid-dnd";
import AddNewItemSection from "@saas/components/AddNewItemSection";
import LazyImage from "@saas/components/LazyImage";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { memo, useCallback, useRef } from "react";
import { removeFile, uploadFile } from "@saas/stores/global/actions";
import { compose } from "redux";
import { connect } from "react-redux";

const FieldMultipleImageUploader = ({
  _uploadFile,
  _removeFile,
  _value,
  _setValue,
  handleOnDragEnd,
}) => {
  const myFiles = useRef(null);
  const removeImageFromList = useCallback(
    (index, sourceIndex, destinationIndex) => {
      const items = JSON.parse(JSON.stringify(_value));
      if (destinationIndex === items.length || sourceIndex === items.length)
        return;
      items.splice(index, 1);
      _setValue(items);
    },
    [_value]
  );
  return (
    <div>
      <input
        ref={myFiles}
        className="d-none"
        type="file"
        multiple
        onChange={() => _uploadFile(myFiles.current.files, "business_page_images")}
      />
      <GridContextProvider onChange={handleOnDragEnd}>
        <GridDropZone
          id="items"
          boxesPerRow={3}
          dir="ltr"
          rowHeight={80}
          style={{
            height: _value ? Math.round(_value.length / 3) * 80 + 100 : 200,
            width: "100%",
          }}
        >
          {_value &&
            _value.map((item, index) => (
              <GridItem
                key={item.id}
                style={{
                  padding: 5,
                }}
              >
                <div
                  className="position-relative"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <LazyImage
                    alt=""
                    className="u-border-radius-4 w-100 h-100"
                    wrapperClassName="w-100 h-100"
                    src={item.url}
                    style={{ objectFit: "cover" }}
                  />
                  <div className="liner-gradiant-card u-border-radius-4" />
                  <div className="u-cursor-pointer position-absolute left-0 bottom-0 p-1 z-index-2 d-flex">
                    <IconButton
                      className="p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!item.initialIndex) {
                          removeImageFromList(index);
                        } else {
                          _removeFile(item.initialIndex);
                        }
                      }}
                    >
                      <DeleteIcon className="u-text-white" />
                    </IconButton>
                    <IconButton
                      className="p-0"
                      onClick={() => {
                        uploadFile(myFiles.current.files, "business_page_images");
                      }}
                    >
                      <EditIcon className="u-text-white" />
                    </IconButton>
                  </div>
                </div>
              </GridItem>
            ))}
          <GridItem key={0} style={{ padding: 5 }}>
            <AddNewItemSection
              className="h-100 u-box-shadow-none flex-column-reverse align-items-center justify-content-center p-2 u-border-radius-4"
              title="عکس"
              onClick={() => myFiles.current.click()}
            />
          </GridItem>
        </GridDropZone>
      </GridContextProvider>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    _uploadFile: (files, folderName, callback) =>
      dispatch(uploadFile({ files, folderName }, callback)),
    _removeFile: (index) => dispatch(removeFile(index)),
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect, memo)(FieldMultipleImageUploader);
