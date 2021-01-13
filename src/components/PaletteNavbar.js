import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';

import styles from '../styles/paletteNavbar';

class PaletteNavbar extends Component {
  state = {
    format: 'hex',
    openSnackbar: false,
  };

  handleFormatChange = (e) => {
    this.setState({ format: e.target.value, openSnackbar: true });
    this.props.changeFormat(e.target.value);
  };

  closeSnackbar = () => {
    this.setState({ openSnackbar: false });
  };

  render() {
    const { level, changeLevel, showSlider, classes } = this.props;
    const { format, openSnackbar } = this.state;
    return (
      <header className={classes.Navbar}>
        <div className={classes.logo}>
          <Link to='/'>Lux Color Picker</Link>
        </div>
        {showSlider && (
          <div>
            <span>Level: {level}</span>
            <div className={classes.slider}>
              <Slider
                value={level}
                min={100}
                max={900}
                step={100}
                onChange={changeLevel}
              />
            </div>
          </div>
        )}
        <div className={classes.selectContainer}>
          <Select value={format} onChange={this.handleFormatChange}>
            <MenuItem value='hex'>HEX - #ffffff</MenuItem>
            <MenuItem value='rgb'>RGB - rgb(255, 255, 255)</MenuItem>
            <MenuItem value='rgba'>RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={openSnackbar}
          message={
            <span id='message-id'>
              Format Changed To {format.toLocaleUpperCase()}
            </span>
          }
          autoHideDuration={3000}
          ContentProps={{ 'aria-describedby': 'message-id' }}
          onClose={this.closeSnackbar}
          action={
            <Fragment>
              <IconButton onClick={this.closeSnackbar} color='inherit'>
                <CloseIcon />
              </IconButton>
              ,
            </Fragment>
          }
        />
      </header>
    );
  }
}

export default withStyles(styles)(PaletteNavbar);
