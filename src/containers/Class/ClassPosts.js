import { Box } from '@mui/system';
import React from 'react';
import ClassPost from './ClassPost';
import CreatePost from './CreatePost';
import { Typography } from '@mui/material';

const ClassPosts = (props) => {
	const { data } = props;
	console.log({ data });
	return (
		<>
			<CreatePost />
			<Box>{data && data.map((post) => <ClassPost data={post} />)}</Box>
			{data && data.length === 0 && (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						marginTop: '80px',
					}}
				>
					<Typography>No posts yet.</Typography>
				</Box>
			)}
		</>
	);
};

export default ClassPosts;
