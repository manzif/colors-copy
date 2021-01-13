import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import styles from '../styles/colorPickerForm';

class ColorPickerForm extends Component {
  state = {
    currentColor: '#43AD2E',
    newColorName: '',
  };

  componentDidMount() {
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
      return this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule('isColorUnique', (value) => {
      return this.props.colors.every(
        ({ color }) => color !== this.state.currentColor
      );
    });
  }

  updateColor = (newColor) => {
    this.setState({ currentColor: newColor.hex });
  };

  handleNameChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addNewColor = () => {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName,
    };
    this.props.addNewColor(newColor);
    this.setState({ newColorName: '' });
  };

  render() {
    const { isPaletteFull, classes } = this.props;
    const { currentColor, newColorName } = this.state;
    return (
      <div className={classes.root}>
        <ChromePicker
          className={classes.picker}
          color={currentColor}
          onChange={this.updateColor}
        />
        <ValidatorForm onSubmit={this.addNewColor} instantValidate={false}>
          <TextValidator
            value={newColorName}
            name='newColorName'
            onChange={this.handleNameChange}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={[
              'The color name is required',
              'The color name must be unique',
              'The color already used',
            ]}
            className={classes.input}
            variant='filled'
            label='Color Name'
            size='small'
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            style={{
              backgroundColor: isPaletteFull
                ? 'rgba(0, 0, 0, 0.12)'
                : currentColor,
            }}
            disabled={isPaletteFull}
            className={classes.button}
          >
            Add Color
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default withStyles(styles)(ColorPickerForm);
