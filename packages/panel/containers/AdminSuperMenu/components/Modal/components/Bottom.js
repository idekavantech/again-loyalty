/*
 *
 * Bottom Component display at every bottom of the
 * Modals comp
 *
*/ 
import { memo } from "react";
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types';
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
    endFlex: {
        padding: theme.spacing(1),
        display: 'flex',
        color: theme.palette.text.secondary,
        justifyContent: 'flex-end',
    },
    button: {
        boxShadow: 'none',
        width: '30%',
        padding: 7,
        borderRadius: 10,
        fontSize: 14,
        '&:hover': {
            boxShadow: 'none'
        }
    }
    
}));

function ModalBottom({
    startButtonText,
    endButtonText,
    bottomStartColor,
    bottomEndColor,
    bottomStartVariant = 'contained',
    bottomEndVariant = 'contained',
    bottomEndOnClick,
    bottomStartOnClick
}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
        <Grid container>
            <Grid item xs={6} sm={6}>
                <div className={classes.startFlex}>
                    {startButtonText &&
                        <Button
                            onClick={bottomStartOnClick}
                            variant={bottomStartVariant} 
                            color='primary' 
                            className={classes.button}
                            style={bottomStartColor && {backgroundColor: bottomStartColor} }
                        >
                            {startButtonText}
                        </Button>
                    }
                </div>
            </Grid>
            <Grid item xs={6} sm={6}>
                <div className={classes.endFlex}>
                    {endButtonText &&
                        <Button 
                            onClick={bottomEndOnClick}
                            variant={bottomEndVariant} 
                            color='primary' 
                            className={classes.button}
                            style={bottomEndColor && {backgroundColor: bottomEndColor} }
                        >
                            {endButtonText}
                        </Button>
                    }
                </div>
            </Grid>
        </Grid>
        </div>
    );
};

ModalBottom.propTypes = {
    startButtonText: PropTypes.string.isRequired,
    endButtonText: PropTypes.string.isRequired,
    bottomEndOnClick: PropTypes.func,
    bottomStartOnClick: PropTypes.func,
    bottomStartColor: PropTypes.string,
    bottomEndColor: PropTypes.string,
    bottomStartVariant: PropTypes.string,
    bottomStartVariant: PropTypes.string,
};

export default memo(ModalBottom);
