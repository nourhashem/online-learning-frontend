import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import classroomAPI from 'api/classroom';
import { useDispatch, useSelector } from 'react-redux';
import classroomActions from 'store/actions/classroom';
import { Button, Card, IconButton, TextField } from '@mui/material';
import { Box } from '@mui/system';
import AttachFileIcon from '@mui/icons-material/AttachFileRounded';
import InsertLinkIcon from '@mui/icons-material/InsertLinkRounded';
import React, { useState } from 'react';
import postAPI from 'api/post';
import { useParams } from 'react-router-dom';
// import '..//style.scss';

const ConfirmationDialog = ({ open, onClose, data: post, onSave }) => {
  // const user = useSelector((state) => state.app.user);
  // const dispatch = useDispatch();
  const { classroomUuid } = useParams();
  const deletePost = async () => {
    onSave(post);
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Post</DialogTitle>
      <DialogContent>Are you sure you want to delete this?</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Disagree</Button>
        <Button onClick={deletePost} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
