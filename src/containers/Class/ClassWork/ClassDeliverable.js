import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Typography } from '@mui/material';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ClassDeliverable = ({ data }) => {
	const navigate = useNavigate();
	const user = useSelector((state) => state.app.user);
	const [nowUnix, setNowUnix] = useState(Date.now() / 1000);
	const activationDate = moment.unix(data.activationDate);
	const activationTime = moment.unix(data.activationTime);
	const endTime = moment.unix(data.endTime);
	const activationDateTime = activationTime.set({
		year: activationDate.year(),
		month: activationDate.month(),
		date: activationDate.date(),
	});
	const endDateTime = endTime.set({
		year: activationDate.year(),
		month: activationDate.month(),
		date: activationDate.date(),
	});
	const isActive =
		nowUnix > activationDateTime.unix() && nowUnix < endDateTime.unix();
	const deliverableType = data.type[0].toUpperCase() + data.type.substring(1);

	useEffect(() => {
		const timer = setInterval(() => {
			setNowUnix(Math.round(Date.now() / 1000));
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	const attemptDeliverable = () => {
		navigate(`/dashboard/deliverable/${data.uuid}`);
	};

	const previewDeliverable = () => {
		navigate(`/dashboard/deliverable/${data.uuid}?preview=true`);
	};

	return (
		<Card sx={{ p: 2, mb: 3 }}>
			<Box>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Typography variant="h5" sx={{ fontWeight: 'bold' }}>
						{data.title}
					</Typography>
					<Typography
						sx={{
							fontStyle: 'italic',
							color: 'rgba(0, 0, 0, 0.6)',
						}}
					>
						<span
							style={{ fontWeight: 'bold', fontStyle: 'italic' }}
						>
							Type:{' '}
						</span>
						{deliverableType}
					</Typography>
				</Box>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'flex-end',
						mt: 2,
					}}
				>
					<Box>
						<Typography
							sx={{
								color: 'rgba(0, 0, 0, 0.6)',
							}}
						>
							<span style={{ fontWeight: 'bold' }}>Date: </span>
							{moment
								.unix(data.activationDate)
								.format('DD/MM/YYYY')}
						</Typography>
						<Typography
							sx={{
								color: 'rgba(0, 0, 0, 0.6)',
							}}
						>
							<span style={{ fontWeight: 'bold' }}>
								Start Time:{' '}
							</span>
							{moment.unix(data.activationTime).format('hh:mm A')}
						</Typography>
						<Typography
							sx={{
								color: 'rgba(0, 0, 0, 0.6)',
							}}
						>
							<span style={{ fontWeight: 'bold' }}>
								Duration:{' '}
							</span>
							{moment(
								moment
									.unix(data.endTime)
									.diff(moment.unix(data.activationTime))
							)
								.utc()
								.format('H[h] mm[m]')}
						</Typography>
						<Typography
							sx={{
								color: 'rgba(0, 0, 0, 0.6)',
							}}
						>
							<span style={{ fontWeight: 'bold' }}>
								Number of Questions:{' '}
							</span>
							{data.questions.length}
						</Typography>
					</Box>
					{user && user.role === 'instructor' && (
						<Button
							variant="contained"
							onClick={previewDeliverable}
						>
							Preview {deliverableType}
						</Button>
					)}
					{user && user.role === 'student' && isActive && (
						<Button
							variant="contained"
							onClick={attemptDeliverable}
						>
							Attempt {deliverableType}
						</Button>
					)}
				</Box>
			</Box>
		</Card>
	);
};

export default ClassDeliverable;
