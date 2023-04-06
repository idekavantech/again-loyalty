/*
*
*  New Modal component
*  Built on React Material
*
*/
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import Modal from '@material-ui/core/Modal';
import ModalHeader from "./components/Header";
import ModalBottom from "./components/Bottom";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '50vw',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 5,
  },
}));

function SefareshModal({
    title,
    headerButtonText,
    bodys,
    bottomStartText,
    bottomEndText,
    bottomEndColor,
    bottomEndVariant,
    bottomStartColor,
    bottomStartVariant,
    onTopHeaderBtnClick,
    bottomEndOnClick,
    bottomStartOnClick,
    isOpen,
    onClose
}) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div style={modalStyle} className={classes.paper}>
                <ModalHeader 
                    title={title}
                    text={headerButtonText}
                    onClose={onClose}
                    endButtonClick={onTopHeaderBtnClick}
                />
                <hr />
                {bodys()}
                <ModalBottom 
                    bottomEndOnClick={bottomEndOnClick}
                    bottomStartOnClick={bottomStartOnClick}
                    endButtonText={bottomStartText}
                    startButtonText={bottomEndText}
                    bottomEndColor={bottomEndColor}
                    bottomEndVariant={bottomEndVariant}
                    bottomStartColor={bottomStartColor}
                    bottomStartVariant={bottomStartVariant}
                />
            </div>
        </Modal>
    );
};

SefareshModal.PropTypes = {
    headerButtonText: PropTypes.string,
    title: PropTypes.string.isRequired,
    bottomEndText: PropTypes.string,
    bottomStartText: PropTypes.string,
    bottomStartColor: PropTypes.string,
    bottomStartVariant: PropTypes.string,
    bottomEndColor: PropTypes.string,
    bottomEndVariant: PropTypes.string,
    bodys: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onTopHeaderBtnClick: PropTypes.func.isRequired
};

export default SefareshModal;