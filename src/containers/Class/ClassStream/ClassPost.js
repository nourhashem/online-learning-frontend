import SendIcon from '@mui/icons-material/Send';
import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/MoreVertRounded';
import EditIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/DeleteRounded';
import Utils from 'utils';
import React from 'react';
import Moment from 'react-moment';

const ClassPost = (props) => {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const open = Boolean(menuAnchorEl);
  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  const { data: post } = props;
  return (
    <Box className="classPost">
      <Box className="postHeader">
        <Box className="postOwner">
          <Avatar style={{ backgroundColor: 'darkgreen' }}>
            {Utils.calculateAvatar(post.owner)}
          </Avatar>
          <Box className="postMetadata">
            <Typography variant="body1">{post.owner}</Typography>
            <Typography variant="body2">
              <Moment interval={0} format="DD/MM/YYYY hh:mm A">
                {post.date}
              </Moment>
            </Typography>
          </Box>
        </Box>
        <Box>
          <IconButton onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={menuAnchorEl}
            open={open}
            onClose={handleMenuClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      <Box className="postBody">
        <Typography variant="body1" className="postTitle">
          {post.title}
        </Typography>
        <Typography variant="body2">{post.body}</Typography>
      </Box>
      <Box className="postFooter">
        <Avatar
          sx={{
            width: 30,
            height: 30,
            fontSize: '12px',
            backgroundColor: Utils.stringToColor('Nour Hachem'),
            backgroundBlendMode: 'darken',
          }}
        >
          NH
        </Avatar>
        <TextField
          variant="standard"
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
            disableUnderline: true,
          }}
        />
      </Box>
    </Box>
  );
};

export default ClassPost;
