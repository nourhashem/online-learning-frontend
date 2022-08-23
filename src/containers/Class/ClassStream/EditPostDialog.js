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
import './style.scss';

const EditPostDialog = ({ open, onClose, data: post, onSave }) => {
  // const user = useSelector((state) => state.app.user);
  // const dispatch = useDispatch();
  const { classroomUuid } = useParams();
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };
  const updatePost = async () => {
    const newPost = { title, body, uuid: post.uuid };
    onSave(newPost);
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent>
        <Card className="createPost" elevation={3}>
          <Box className="inputWrapper">
            <TextField
              variant="standard"
              size="small"
              fullWidth
              InputProps={{
                disableUnderline: true,
                className: 'postTitleInput',
              }}
              value={title}
              onChange={handleTitleChange}
              placeholder="Title"
            />
            <TextField
              multiline
              variant="standard"
              fullWidth
              InputProps={{ disableUnderline: true }}
              minRows={2}
              placeholder="Write your post"
              value={body}
              onChange={handleBodyChange}
            />
          </Box>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={updatePost}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPostDialog;
