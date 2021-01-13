import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import styles from '../styles/page';

const useStyles = makeStyles(styles);

const Page = ({ children }) => {
  const classes = useStyles();

  return <section className={classes.page}>{children}</section>;
};

export default Page;
