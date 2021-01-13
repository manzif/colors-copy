import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

import ColorBox from './ColorBox';
import Navbar from './PaletteNavbar';
import Footer from './PaletteFooter';
import styles from '../styles/palette';

const useStyles = makeStyles(styles);

const SingleColorPalette = ({ palette, colorId }) => {
  const [format, setFormat] = useState('hex');
  const classes = useStyles();

  const gatherShades = (palette, colorId) => {
    let shades = [];
    let allColors = palette.colors;
    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorId)
      );
    }
    return shades.slice(1);
  };

  const changeFormat = (format) => {
    setFormat(format);
  };

  const shades = gatherShades(palette, colorId);
  const colorBoxes = shades.map((color) => (
    <ColorBox key={color.hex} name={color.name} background={color[format]} />
  ));

  return (
    <div className={classes.Palette}>
      <Navbar changeFormat={changeFormat} />
      <div className={classes.PaletteColors}>
        {colorBoxes}
        <div className={classes.GoBack}>
          <Link to={`/palette/${palette.id}`}>Go Back</Link>
        </div>
      </div>
      <Footer paletteName={palette.paletteName} emoji={palette.emoji} />
    </div>
  );
};

export default SingleColorPalette;
