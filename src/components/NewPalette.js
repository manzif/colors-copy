/* eslint-disable no-loop-func */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Button } from '@material-ui/core';
import arrayMove from 'array-move';

import DraggableColorList from './DraggableColorList';
import NewPaletteNavbar from './NewPaletteNavbar';
import ColorPickerForm from './ColorPickerForm';
import styles from '../styles/newPalette';
import initialPalettes from '../models/palettes';

class NewPalette extends Component {
  state = {
    open: true,
    colors: initialPalettes[0].colors,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  addNewColor = (newColor) => {
    const { colors } = this.state;
    this.setState({ colors: [...colors, newColor], newColorName: '' });
  };

  savePalette = (newPalette) => {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
    newPalette.colors = this.state.colors;
    this.props.savePalette(newPalette);
    this.props.history.push('/');
  };

  deleteColor = (colorName) => {
    this.setState({
      colors: this.state.colors.filter((color) => color.name !== colorName),
    });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };

  clearColors = () => {
    this.setState({ colors: [] });
  };

  generateRandomColor = () => {
    const allColors = this.props.palettes.map((p) => p.colors).flat();
    let randomColor;
    let isDuplicateColor = true;
    while (isDuplicateColor) {
      const rand = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[rand];
      console.log(randomColor);
      isDuplicateColor = this.state.colors.some(
        (color) => color.name === randomColor.name
      );
    }
    this.setState({ colors: [...this.state.colors, randomColor] });
  };

  render() {
    const { classes, palettes } = this.props;
    const { open, colors } = this.state;
    const isPaletteFull = colors.length >= 20;
    return (
      <div className={classes.root}>
        <NewPaletteNavbar
          open={open}
          palettes={palettes}
          savePalette={this.savePalette}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.container}>
            <Typography variant='h4'>Design Your Palette</Typography>
            <div className={classes.buttons}>
              <Button
                variant='contained'
                color='secondary'
                onClick={this.clearColors}
                className={classes.button}
              >
                Clear Colors
              </Button>
              <Button
                variant='contained'
                color='primary'
                onClick={this.generateRandomColor}
                disabled={isPaletteFull}
                className={classes.button}
              >
                Random Color
              </Button>
            </div>
            <ColorPickerForm
              isPaletteFull={isPaletteFull}
              addNewColor={this.addNewColor}
              colors={colors}
            />
          </div>
        </Drawer>
        <main
          className={`${classes.content} ${open ? classes.contentShift : ''}`}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList
            colors={colors}
            deleteColor={this.deleteColor}
            axis='xy'
            onSortEnd={this.onSortEnd}
          />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPalette);
