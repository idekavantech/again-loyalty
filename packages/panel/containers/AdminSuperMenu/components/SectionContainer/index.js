import { memo } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
      backgroundColor: 'white !important',
      border: '1.5px solid #C2C7CC',
      borderRadius: 10,
      padding: 10,
      marginBottom: 40,
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#3D454C'
    }
}));

function SectionContainer({
    title,
    btns
}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <p className={classes.title}>{title}</p>
            <hr />
            {btns}
        </div>
    );
};

SectionContainer.propTypes = {
    title: PropTypes.string.isRequired,
    btns: PropTypes.any
};

export default memo(SectionContainer);
