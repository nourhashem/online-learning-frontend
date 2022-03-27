import SendIcon from '@mui/icons-material/Send';
import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import Utils from 'utils';
import React from 'react';

const ClassPost = (props) => {
  const { data: post } = props;
  return (
    <Box className="classPost">
      <Box className="postHeader">
        <Avatar style={{ backgroundColor: 'darkgreen' }}>
          {Utils.calculateAvatar(post.owner)}
        </Avatar>
        <Box className="postMetadata">
          <Typography variant="body1">{post.owner.name}</Typography>
          <Typography variant="body2">{post.date}</Typography>
        </Box>
      </Box>
      <Box className="postBody">
        <Typography variant="body1" className="postTitle">
          {post.title}
        </Typography>
        <Typography variant="body2">{post.body}</Typography>
      </Box>
      <Box className="postFooter">
        <TextField
          variant="outlined"
          placeholder="write a comment"
          size="small"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" color="primary">
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default ClassPost;
