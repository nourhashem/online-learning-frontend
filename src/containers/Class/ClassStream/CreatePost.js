import { Button, Card, IconButton, TextField } from '@mui/material';
import { Box } from '@mui/system';
import AttachFileIcon from '@mui/icons-material/AttachFileRounded';
import InsertLinkIcon from '@mui/icons-material/InsertLinkRounded';
import React, { useState } from 'react';
import postAPI from 'api/post';
import { useParams } from 'react-router-dom';
import './style.scss';

const CreatePost = ({ setClassroomPosts }) => {
  const { classroomUuid } = useParams();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };
  const addPost = async () => {
    const response = await postAPI.add(title, body, classroomUuid);
    if (response.message === 'success') {
      const { posts } = await postAPI.getAll(classroomUuid);
      const sortedPosts = posts.sort((a, b) => b.date.localeCompare(a.date));
      console.log({ sortedPosts });
      setClassroomPosts(sortedPosts);
    }
    setTitle('');
    setBody('');
  };
  return (
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

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <IconButton color="primary">
            <AttachFileIcon />
          </IconButton>
          <IconButton color="primary">
            <InsertLinkIcon />
          </IconButton>
        </Box>
        <Button onClick={addPost} variant="contained">
          Post
        </Button>
      </Box>
    </Card>
  );
};

export default CreatePost;
