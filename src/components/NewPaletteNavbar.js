import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import PaletteMetaForm from './PaletteMetaForm';
import styles from '../styles/newPaletteNavbar';

class NewPaletteNavbar extends Component {
  state = {
    openForm: false,
  };

  showForm = () => {
    this.setState({ openForm: true });
  };

  hideForm = () => {
    this.setState({ openForm: false });
  };

  render() {
    const {
      open,
      classes,
      savePalette,
      handleDrawerOpen,
      palettes,
    } = this.props;

    const { openForm } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          color='default'
          position='fixed'
          className={`${classes.appBar} ${open ? classes.appBarShift : ''}`}
        >
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              className={`${classes.menuButton} ${open && classes.hide}`}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' noWrap>
              Create A Palette
            </Typography>
          </Toolbar>
          <div className={classes.navButtons}>
            <Link to='/'>
              <Button
                variant='contained'
                color='secondary'
                className={classes.button}
              >
                Go Back
              </Button>
            </Link>
            <Button
              variant='contained'
              color='primary'
              onClick={this.showForm}
              className={classes.button}
            >
              Save
            </Button>
          </div>
        </AppBar>
        {openForm && (
          <PaletteMetaForm
            palettes={palettes}
            savePalette={savePalette}
            openForm={openForm}
            hideForm={this.hideForm}
            showForm={this.showForm}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteNavbar);
