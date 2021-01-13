import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { SortableElement } from 'react-sortable-hoc';

import styles from '../styles/draggableColorBox';

const useStyles = makeStyles(styles);

const DraggableColorBox = SortableElement((props) => {
  const classes = useStyles(props);
  const { color, name, deleteColor } = props;
  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      <div className={classes.boxContent}>
        <span>{name}</span>
        <DeleteIcon className={classes.deletIcon} onClick={deleteColor} />
      </div>
    </div>
  );
});

export default DraggableColorBox;
