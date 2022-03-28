import { Button, Card, IconButton, TextField } from '@mui/material';
import { Box } from '@mui/system';
import AttachFileIcon from '@mui/icons-material/AttachFileRounded';
import InsertLinkIcon from '@mui/icons-material/InsertLinkRounded';
import React from 'react';
import './style.scss';

const CreatePost = () => {
	return (
		<Card className="createPost" elevation={3}>
			<Box class="inputWrapper">
				<TextField
					variant="standard"
					size="small"
					fullWidth
					InputProps={{
						disableUnderline: true,
						className: 'postTitleInput',
					}}
					placeholder="Title"
				/>
				<TextField
					multiline
					variant="standard"
					fullWidth
					InputProps={{ disableUnderline: true }}
					minRows={2}
					placeholder="Write your post"
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
				<Button variant="contained">Post</Button>
			</Box>
		</Card>
	);
};

export default CreatePost;
