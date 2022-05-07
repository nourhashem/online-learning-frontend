import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AddClassroomDialog = ({ open, onClose }) => {
  const addClassroom = () => {
    console.log('added classroom!');
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          size="small"
          variant="outlined"
        />
        <TextField
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          size="small"
          variant="outlined"
        />
        <TextField
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          size="small"
          variant="outlined"
        />
        <TextField
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          size="small"
          variant="outlined"
        />
        <TextField
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          size="small"
          variant="outlined"
        />
        <TextField
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          size="small"
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={addClassroom}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddClassroomDialog;
