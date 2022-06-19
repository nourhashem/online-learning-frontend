import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Avatar } from '@mui/material';
import Utils from 'utils';

const UserItem = ({ data: { name, uuid } }) => {
	return (
		<Box
			sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
		>
			<Avatar
				sx={{
					width: 30,
					height: 30,
					fontSize: '12px',
					backgroundColor: Utils.stringToColor(name),
					backgroundBlendMode: 'darken',
					mr: 1,
				}}
			>
				{Utils.calculateAvatar(name)}
			</Avatar>
			<Typography>{name}</Typography>
		</Box>
	);
};

export default UserItem;
