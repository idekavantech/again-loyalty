/*
 *
 * Component to let user pick image & perview it
 * Or preview a color
 *
 */
import { memo, useState, createRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(() => ({
  bg: {
    marginTop: 10,
    padding: 10,
    borderRadius: "8px 8px 0px 0px",
    height: "80%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  root: {
    width: "80% !important",
    marginRight: 10,
  },
  button: {
    padding: 10,
    width: "100%",
    boxShadow: "none",
    borderRadius: 6,
    marginTop: -10,
    color: "#006AFF",
    backgroundColor: "#F2F4F5",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "#CCDDF5",
    },
    backgroundColor: "white",
  },
  removeBtn: {
    backgroundColor: "#F2F4F5",
    borderRadius: "50%",
    cursor: "pointer",
  },
}));

function MenuImagePicker({ pickedColor = "#DBDCDD" }) {
  const classes = useStyles();
  const myRef = createRef();
  const [selectedImage, setSelectedImage] = useState();

  // This function will be triggered when the file field change
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage();
  };

  return (
    <>
      <div
        className={classes.bg}
        style={{
          backgroundColor: pickedColor,
          backgroundImage:
            selectedImage && `url(${URL.createObjectURL(selectedImage)})`,
        }}
      >
        {selectedImage && (
          <CloseIcon
            className={classes.removeBtn}
            onClick={removeSelectedImage}
          />
        )}
      </div>
      <Button
        className={classes.button}
        variant="outlined"
        onClick={() => myRef.current.click()}
      >
        <input
          accept="image/*"
          type="file"
          ref={myRef}
          style={{ visibility: "hidden", display: "none" }}
          onChange={imageChange}
        />
        افزودن تصویر یا آیکون
      </Button>
    </>
  );
}

// MenuImagePicker.propTypes = {
//     label: PropTypes.string.isRequired,
//     value: PropTypes.func.isRequired,
// };

export default memo(MenuImagePicker);
