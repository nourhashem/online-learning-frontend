import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AttemptItem = ({ data }) => {
	const navigate = useNavigate();
	const handleViewAttempt = () => {
		navigate(
			`/dashboard/deliverable/${data.deliverable.uuid}?preview=true&studentUuid=${data.student.uuid}`
		);
	};

	return (
		<Box
			sx={{
				borderBottom: '1px solid rgba(0,0,0,0.2)',
				'&:last-child': { border: 0 },
				padding: '10px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}
		>
			<Typography>{`${data.student.firstName} ${data.student.lastName}`}</Typography>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>
				<Typography
					sx={{ fontWeight: 'bold', mr: 2 }}
				>{`${data.grade}/100`}</Typography>
				<Button size="small" onClick={handleViewAttempt}>
					View Attempt
				</Button>
			</Box>
		</Box>
	);
};

export default AttemptItem;
