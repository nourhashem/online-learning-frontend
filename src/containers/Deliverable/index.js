import { Box, Button, Card, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import deliverablesAPI from 'api/deliverable';
import Countdown from 'react-countdown';
import moment from 'moment';
import SolvableQuestion from './SolvableQuestion';
import './style.scss';

const Deliverable = () => {
	const [searchParams] = useSearchParams();
	const [data, setData] = useState(null);
	const [answers, setAnswers] = useState([]);
	const { deliverableUuid } = useParams();
	const navigate = useNavigate();
	const preview = !!searchParams.get('preview');

	console.log({ data });

	useEffect(() => {
		deliverablesAPI.get(deliverableUuid, preview).then((response) => {
			if (preview) {
				setAnswers([...response.deliverable.questions]);
			}
			setData(response.deliverable);
		});
	}, [deliverableUuid, preview]);

	const handleAnswer = (question, index) => (answer) => {
		if (preview) return;
		console.log({ question }, { answer });
		const newAnswers = [...answers];
		newAnswers[index] = answer;
		setAnswers(newAnswers);
	};

	const submitDeliverable = () => {
		navigate(`/dashboard/class/${data.classroomUuid}/work`);
		// answers
		// deliverablesAPI.submit(answers, deliverableUuid).then(() => {
		// 	navigate(`/dashboard/class/${data.classroomUuid}/work`);
		// });
	};

	console.log({ answers });

	return (
		<Box className="deliverable">
			<Box>
				{data && (
					<Card sx={{ p: 4, mt: 2 }}>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<Typography
								variant="h4"
								sx={{ fontWeight: 'bold' }}
							>
								{data.title}
							</Typography>
							{!preview && (
								<Typography
									variant="h5"
									sx={{
										fontWeight: 'bold',
										color: '#d32f2f',
									}}
								>
									<Countdown
										daysInHours
										date={data.endTime * 1000}
									/>
								</Typography>
							)}
						</Box>
						<Box
							sx={{
								mt: 2,
							}}
						>
							<Typography
								sx={{
									color: 'rgba(0, 0, 0, 0.6)',
								}}
							>
								<span style={{ fontWeight: 'bold' }}>
									Date:{' '}
								</span>
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
								{moment
									.unix(data.activationTime)
									.format('hh:mm A')}
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
						<Box sx={{ mt: 4 }}>
							{data.questions.map((q, i) => (
								<SolvableQuestion
									sx={{
										mb: 2,
										border: '1px solid rgba(0, 0, 0, 0.23)',
										borderRadius: '4px',
										p: '20px',
									}}
									key={q.uuid}
									data={q}
									onAnswer={handleAnswer(q, i)}
									questionIndex={i + 1}
									disabled={preview}
								/>
							))}
						</Box>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								mt: 3,
							}}
						>
							{!preview && (
								<Button
									variant="contained"
									onClick={submitDeliverable}
								>
									Submit
								</Button>
							)}
						</Box>
					</Card>
				)}
			</Box>
		</Box>
	);
};

export default Deliverable;
