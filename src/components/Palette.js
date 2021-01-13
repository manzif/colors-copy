import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';

import ColorBox from './ColorBox';
import Navbar from './PaletteNavbar';
import Footer from './PaletteFooter';
import styles from '../styles/palette';

class Palette extends Component {
  state = {
    level: 500,
    format: 'hex',
  };

  changeLevel = (level) => {
    this.setState({ level });
  };

  changeFormat = (format) => {
    this.setState({ format });
  };

  render() {
    const { palette, classes } = this.props;
    const { colors, paletteName, emoji, id } = palette;
    const { level, format } = this.state;
    const colorsBoxes = colors[level].map((color) => (
      <ColorBox
        key={color.id}
        background={color[format]}
        name={color.name}
        id={color.id}
        paletteId={id}
        showLink
      />
    ));

    return (
      <div className={classes.Palette}>
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          changeFormat={this.changeFormat}
          showSlider
        />
        <div className={classes.PaletteColors}>{colorsBoxes}</div>
        <Footer paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(Palette);
