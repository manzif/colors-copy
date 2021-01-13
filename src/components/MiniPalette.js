import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from '../styles/miniPalette';

const useStyles = makeStyles(styles);

const MiniPalette = ({
  id,
  paletteName,
  emoji,
  colors,
  handleClick,
  deletePalette,
}) => {
  const classes = useStyles();

  const handleDelete = (e) => {
    e.stopPropagation();
    deletePalette(id);
  };

  return (
    <div className={classes.root} onClick={handleClick}>
      <DeleteIcon className={classes.deleteIcon} onClick={handleDelete} />
      <div className={classes.colors}>
        {colors.map((color) => (
          <div
            className={classes.miniBox}
            style={{ backgroundColor: color.color }}
            key={color.color}
          ></div>
        ))}
      </div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
};

export default MiniPalette;
