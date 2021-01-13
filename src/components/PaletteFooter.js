import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import styles from '../styles/paletteFooter';

const useStyles = makeStyles(styles);

const PaletteFooter = ({ paletteName, emoji }) => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      {paletteName} <span className={classes.emoji}>{emoji}</span>
    </footer>
  );
};

export default PaletteFooter;
