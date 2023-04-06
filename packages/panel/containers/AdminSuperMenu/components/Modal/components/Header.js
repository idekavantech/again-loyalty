/*
 *
 * Header Component display at every top of the
 * Modals comp
 *
*/ 
import { memo } from "react";
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '95% !important',
      margin: 'auto !important'
    },
    startFlex: {
      padding: theme.spacing(1),
      textAlign: 'center',
      flex: 1,
      display: 'flex',
      color: theme.palette.text.secondary,
      alignItems: 'flex-start',
    },
    centerFlex: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    endFlex: {
        padding: theme.spacing(1),
        display: 'flex',
        color: theme.palette.text.secondary,
        justifyContent: 'flex-end',
    },
    icon: {
        fontSize: 40,
        backgroundColor: '#F2F4F5',
        borderRadius: 8,
        cursor: 'pointer'
    },
    text: {
        fontSize: 20,
    },
    button: {
        boxShadow: 'none',
        width: '40%',
        '&:hover': {
            boxShadow: 'none'
        }
    }
    
}));

function ModalHeader({
    title,
    text,
    onClose,
    endButtonClick
}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
        <Grid container>
            <Grid item xs={4} sm={4}>
                <div className={classes.startFlex}>
                    <CloseIcon className={classes.icon} onClick={onClose} />
                </div>
            </Grid>
            <Grid item xs={4} sm={4}>
                <div className={classes.centerFlex}>
                    <p className={classes.text}>
                        {title}
                    </p>
                </div>
            </Grid>
            <Grid item xs={4} sm={4}>
                <div className={classes.endFlex}>
                    {text &&
                        <Button 
                            variant="contained" 
                            color="primary" 
                            className={classes.button}
                            onClick={endButtonClick}
                        >
                            {text}
                        </Button>
                    }
                </div>
            </Grid>
        </Grid>
        </div>
    );
};

ModalHeader.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onClose: PropTypes.string.isRequired,
    endButtonClick: PropTypes.func.isRequired
};

export default memo(ModalHeader);
