import { memo } from "react";
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
      width: '80% !important',
      marginRight: 10,
    },
    button: {
        padding: 10,
        width: '100%',
        boxShadow: 'none',
        marginTop: 10,
        borderRadius: 6,
        color: '#00ab97 !important',
        backgroundColor: '#F2F4F5',
        '&:hover': {
            boxShadow: 'none',
            color: 'white !important',
            backgroundColor: '#00ab97'
        },
    },
    
}));

function SectionButton({
    title,
    disabled,
    onClick,
    textColor = '#006AFF'
}) {
    const classes = useStyles();

    return (
        <Button 
            className={classes.button}
            style={{
                color: disabled ? '#D2D6DA' : textColor
            }} 
            variant="contained"
            onClick={!disabled ? onClick : ''}
        >
            {title}
        </Button>
    );
};

SectionButton.propTypes = {
    title: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    textColor: PropTypes.string,
    onClick: PropTypes.func.isRequired
};

export default memo(SectionButton);
