import { Button, Card, IconButton, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import AttachFileIcon from '@mui/icons-material/AttachFileRounded';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import InsertLinkIcon from '@mui/icons-material/InsertLinkRounded';
import CloseIcon from '@mui/icons-material/Close';
import React, { useRef, useState } from 'react';
import PostAttachment from './PostAttachment';
import postAPI from 'api/post';
import { useParams } from 'react-router-dom';
import './style.scss';

const CreatePost = ({ setClassroomPosts }) => {
  const { classroomUuid } = useParams();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [files, setFiles] = useState([]);
  const fileRef = useRef(null);
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };
  //console.log({ file });
  const handleChange = (event) => {
    const filesArray = Array.from(event.target.files);
    const newFiles = filesArray.filter((f) => {
      const foundFile = files.find(
        (selectedFile) => selectedFile.name === f.name
      );
      if (!foundFile) {
        return true;
      }
      return false;
    });
    setFiles([...files, ...newFiles]);
  };

  const handleRemoveFile = (selectedFile) => () => {
    const newFile = files.filter((f) => f.name !== selectedFile.name);
    setFiles(newFile);
    console.log({ newFile });
  };

  // const fn1 = () => 1;
  // const fn2 = (x) => () => x;

  // console.log(fn1());
  // console.log(1);

  // console.log(fn2(5));
  // console.log((x) => x);

  // console.log(fn2(5)());
  // console.log(5);

  // const onFileUpload = () => {
  //   console.log(files);
  // };
  const addPost = async () => {
    if (!(title && body)) return;
    const response = await postAPI.add(title, body, classroomUuid);
    if (response.message === 'success') {
      if (files.length) {
        const formData = new FormData();
        formData.append('postUuid', response.post.uuid);
        files.forEach((attachment) => {
          formData.append('attachments', attachment);
        });
        const uploadResponse = await postAPI.upload(formData);
        if (uploadResponse.message === 'success') {
          console.log('attachments uploaded successfully');
        }
        //console.log({ fd: formData.getAll('attachments') });
      }
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
      <Box
        style={{
          display: 'grid',
          gap: '10px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gridTemplateRows: 'auto',
          marginBottom: files.length ? '15px' : 0,
        }}
      >
        {files.map((f) => (
          <PostAttachment
            key={f.name}
            file={f}
            onRemove={handleRemoveFile(f)}
          />
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <input
          type="file"
          multiple
          //enctype="multipart/form-data"
          ref={fileRef}
          style={{
            display: 'none',
          }}
          onChange={handleChange}
        ></input>
        <IconButton
          onClick={() => {
            fileRef.current.click();
          }}
        >
          <AttachFileIcon />
        </IconButton>
        <Button onClick={addPost} variant="contained">
          Post
        </Button>
      </Box>
    </Card>
  );
};

export default CreatePost;
