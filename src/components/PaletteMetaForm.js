import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

class PletteMetaForm extends Component {
  state = {
    stage: 'form',
    newPaletteName: '',
  };

  componentDidMount() {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
      return this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  }

  handleNameChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  showEmojiPicker = () => {
    this.setState({ stage: 'emoji' });
  };

  savePalette = (emoji) => {
    const newPalette = {
      paletteName: this.state.newPaletteName,
      emoji: emoji.native,
    };
    this.setState({ stage: '' });
    this.props.savePalette(newPalette);
  };

  render() {
    const { newPaletteName, stage } = this.state;
    const { openForm, hideForm } = this.props;
    return (
      <Fragment>
        <Dialog open={openForm && stage === 'emoji'} onClose={hideForm}>
          <DialogTitle>Choose a Palette Emoji</DialogTitle>
          <Picker
            onSelect={this.savePalette}
            title='Pick a Palette emoji'
            emoji='point_up'
            emojiTooltip
          />
        </Dialog>
        <Dialog
          open={openForm && stage === 'form'}
          onClose={hideForm}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>
            Choose a Palette Name
          </DialogTitle>
          <ValidatorForm onSubmit={this.showEmojiPicker}>
            <DialogContent>
              <DialogContentText>
                Please enter a name for your new beautiful palette. Make sure it
                is unique
              </DialogContentText>

              <TextValidator
                label='Palette Name'
                value={newPaletteName}
                onChange={this.handleNameChange}
                name='newPaletteName'
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={[
                  'The palette name is required',
                  'The palette name must be unique',
                ]}
                fullWidth
                variant='filled'
                size='small'
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={hideForm} color='default' variant='contained'>
                Cancel
              </Button>
              <Button type='submit' variant='contained' color='primary'>
                Save Palette
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </Fragment>
    );
  }
}

export default PletteMetaForm;
