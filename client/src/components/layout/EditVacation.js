import React, { Fragment } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import _ from 'lodash';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Alert from '@material-ui/lab/Alert';
import { deepPurple, blue } from '@material-ui/core/colors';

import { connect } from 'react-redux';
import {
  editVacation,
  addVacation,
  toggleOpen
} from '../../actions/VacationActions';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: blue
  },
  fab: {
    margin: 0,
    top: 'auto',
    left: 'auto',
    bottom: 20,
    right: 30,
    position: 'fixed',
  }
});

let newVacation = {
  country: '',
  destination: '',
  description: '',
  starts: '',
  ends: '',
  price: '',
  image: ''
};


function EditVacation({ add, edit, data, editVacation, addVacation, toggleOpen, errorType, success }) {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    toggleOpen();
    setOpen(true);
  };

  const handleClose = () => {
    newVacation = _.mapValues(newVacation, () => '');
    setOpen(false);
  }

  const handleAddVacation = async () => {
    await addVacation(newVacation);
  };

  const handleEditVacation = () => {
    editVacation(data);
  };

  const onChange = (field, value) => {
    data[field] = value;
    newVacation[field] = value;
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        {edit && <Fragment>
          <Button color="primary" onClick={handleClickOpen}>
            <EditIcon /> &nbsp; Edit
          </Button>
        </Fragment>}
        {add && <Fab color="primary" aria-label="add" style={theme.fab} onClick={handleClickOpen}>
            <AddIcon />
          </Fab>}
      </ThemeProvider>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        
        <DialogTitle id="form-dialog-title">Edit Vacation</DialogTitle>

        {!success && errorType === 'String Problem' &&  <Alert severity="error">Looks like some fildes are missing...</Alert>}
        {!success && errorType === 'Array Problem' &&  <Alert severity="error">Description most contain 1-500 characters</Alert>}
        {!success && errorType === 'Date Problem' &&  <Alert severity="error">Invalid Dates (past dates are not alowed)</Alert>}
        {!success && errorType === 'Price Problem' &&  <Alert severity="error">Price should contain numbers only</Alert>}
        {!success && errorType === 'URL Problem' &&  <Alert severity="error">Invalid Image URL</Alert>}

        <DialogContent>
          { _.keys(newVacation).map((field, idx) => {
            if(field === 'starts' || field === 'ends') {
              return <span key={idx}>
                <TextField
                  key={idx}
                  style={{margin: '20px'}}
                  autoFocus
                  id={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  type="datetime-local"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={({target: {value}}) => onChange(field, value)}
                />
              </span> 
            } if (data[field]) {
              return <TextField
              key={idx}
              autoFocus
              margin="dense"
              id={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              type="text"
              fullWidth
              onChange={({target: {value}}) => onChange(field, value)}
              defaultValue={data[field]}
            />
            } else {
              return <TextField
              key={idx}
              autoFocus
              margin="dense"
              id={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              type="text"
              fullWidth
              onChange={({target: {value}}) => onChange(field, value)}
              />
            }
          })}

          {add && success && <Alert severity="success">Vacation Added!</Alert>}
          {edit && success && <Alert severity="success">Vacation Updated!</Alert>}
        </DialogContent>

        <DialogActions>
          {!success && <Button onClick={handleClose} color="primary">
            Cancel
          </Button>}
          {edit && <Button onClick={handleEditVacation} color="primary">
            Apply Changes
          </Button> }
          {add && !success && <Button onClick={handleAddVacation} color="primary">
            Add Vacation
          </Button> }
          {success && <Button onClick={handleClose} color="primary">
            Close
          </Button> }
        </DialogActions>

      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { errorType, success } = state.vacationReducer;
  return {
      errorType: errorType,
      success: success,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editVacation: (data) => dispatch(editVacation(data)),
    addVacation: (data) => dispatch(addVacation(data)),
    toggleOpen: () => dispatch(toggleOpen()),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(EditVacation);