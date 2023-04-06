import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&$checked': {
      color: '#006AFF !important',
      backgroundColor: 'black'
    },
    '&:after': {
      backgroundColor: 'black !important'
    },
    color: '#006AF !important'
  },
  container: {
    border: '1px solid transparent',
    display: 'flex',
  },
  containerChild: {
    display: 'flex',
  },
  icon: {
    borderRadius: 3,
    width: 16,
    height: 16,
    backgroundColor: '#fff',
    border: '1px solid #C2C7CC',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      border: '1px solid #006AFF',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#006AFF',
    color: 'black',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 15,
      height: 15,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    'input:hover ~ &': {
      border: '1px solid #006AFF',
    },
  },
});

// Inspired by blueprintjs
export default function CustomizedRadios({
  title,
  child,
  subTitle,
  onChange,
  checked = false,
  onClick = () => {},
  ...props
}) {
  const classes = useStyles();

  return (
    <div className={child ? classes.containerChild : classes.container}>
      <div style={{justifyContent: 'flex-start',width: '50%'}}>
        <Radio
          className={classes.root}
          disableRipple
          checked={checked}
          onChange={onChange}
          onClick={onClick}
          {...props}
        />
        <span style={{fontSize: child ? 14 : 16,fontWeight: child ? 'normal' : 600}}>
          {title}
        </span>
      </div>
      <div style={{justifyContent: 'flex-end',width: '50%'}}>
        <span style={{fontSize: 14,fontWeight: 600,display: 'flex',justifyContent: 'flex-end',marginTop: 12}}>
          {subTitle}
        </span>
      </div>
    </div>
  );
};