import React, { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Card,
	Typography,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import attemptAPI from 'api/attempt';
import deliverableAPI from 'api/deliverable';
import AttemptItem from './AttemptItem';

const ClassDeliverable = ({ data }) => {
	const navigate = useNavigate();
	const user = useSelector((state) => state.app.user);
	const [showAttempts, setShowAttempts] = useState(false);
	const [publishDialogOpen, setPublishDialogOpen] = useState(false);
	const [showPublishButton, setShowPublishButton] = useState(!data.published);
	const [attempts, setAttempts] = useState([]);
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
	const deliverableType =
		data && data.type
			? data.type[0].toUpperCase() + data.type.substring(1)
			: '';

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

	const toggleViewAttempts = () => {
		console.log('toggleViewAttemtps', data.uuid);
		if (showAttempts) {
			setShowAttempts(false);
		} else {
			attemptAPI
				.getAll(data.uuid)
				.then(({ attempts }) => {
					console.log({ attempts });
					setAttempts(attempts);
					setShowAttempts(true);
				})
				.catch((error) => {
					console.error({ error });
					setShowAttempts(false);
				});
		}
	};

	const handleOpenPublishDialog = () => {
		setPublishDialogOpen(true);
	};

	const handleClosePublishDialog = () => {
		setPublishDialogOpen(false);
	};

	const handlePublishGrades = () => {
		deliverableAPI.publish(data.uuid).then(() => {
			setPublishDialogOpen(false);
			setShowPublishButton(false);
		});
	};

	const handleViewAttempt = () => {
		navigate(
			`/dashboard/deliverable/${data.uuid}?preview=true&studentUuid=${user.uuid}`
		);
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
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'flex-end',
						}}
					>
						{user &&
							user.role === 'student' &&
							data.attempted &&
							!data.published && (
								<Typography
									sx={{
										fontWeight: 'bold',
										fontStyle: 'italic',
									}}
								>
									Submitted
								</Typography>
							)}
						{user &&
							user.role === 'student' &&
							!data.attempted &&
							!isActive && (
								<Typography
									sx={{
										fontWeight: 'bold',
										fontStyle: 'italic',
									}}
								>
									Missed
								</Typography>
							)}
						{user &&
							user.role === 'student' &&
							data.attempted &&
							data.published && (
								<>
									<Typography
										sx={{
											fontWeight: 'bold',
											padding: '4px 10px',
											borderRadius: '4px',
										}}
									>
										Grade: {data.grade}/100
									</Typography>
									<Button
										variant="contained"
										onClick={handleViewAttempt}
										sx={{
											ml: 2,
										}}
									>
										View Attempt
									</Button>
								</>
							)}
					</Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'flex-end',
							alignItems: 'center',
							flexDirection: 'row',
						}}
					>
						{user &&
							user.role === 'instructor' &&
							showPublishButton && (
								<Button
									variant="contained"
									onClick={handleOpenPublishDialog}
									color="secondary"
									sx={{
										mr: 2,
									}}
								>
									Publish Grades
								</Button>
							)}
						{user && user.role === 'instructor' && (
							<>
								<Button
									variant="contained"
									onClick={previewDeliverable}
									sx={{
										mr: 2,
									}}
								>
									Preview {deliverableType}
								</Button>
								<Button
									variant="contained"
									onClick={toggleViewAttempts}
								>
									{showAttempts
										? 'Hide Attempts'
										: 'Show Attempts'}
								</Button>
							</>
						)}
						{user &&
							user.role === 'student' &&
							isActive &&
							!data.attempted && (
								<Button
									variant="contained"
									onClick={attemptDeliverable}
								>
									Attempt {deliverableType}
								</Button>
							)}
					</Box>
				</Box>
			</Box>
			{showAttempts && (
				<Box
					sx={{
						mt: 2,
					}}
				>
					<Typography variant="h6" sx={{ fontWeight: 'bold' }}>
						Attempts
					</Typography>
					{!attempts.length && (
						<Box
							sx={{
								display: 'flex',
								p: 4,
								justifyContent: 'center',
								alignItems: 'center',
								width: '100%',
							}}
						>
							<Typography sx={{ color: 'rgba(0,0,0,0.6)' }}>
								No Attempts
							</Typography>
						</Box>
					)}
					{!!attempts.length && (
						<Card
							elevation={0}
							sx={{ border: '1px solid rgba(0,0,0,0.2)', mt: 2 }}
						>
							{attempts.map((attempt) => (
								<AttemptItem
									data={attempt}
									key={attempt.uuid}
								/>
							))}
						</Card>
					)}
				</Box>
			)}
			<Dialog open={publishDialogOpen} onClose={handleClosePublishDialog}>
				<DialogTitle>{'Publish Grades'}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure you want to publish the grades for this
						deliverable?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button size="small" onClick={handleClosePublishDialog}>
						Cancel
					</Button>
					<Button
						onClick={handlePublishGrades}
						autoFocus
						variant="contained"
						size="small"
						color="secondary"
					>
						Publish
					</Button>
				</DialogActions>
			</Dialog>
		</Card>
	);
};

export default ClassDeliverable;
