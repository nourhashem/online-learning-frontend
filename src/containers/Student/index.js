import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Typography } from '@mui/material';
import './style.scss';
import { useNavigate, useParams } from 'react-router-dom';
import deliverablesAPI from 'api/deliverable';

const Student = () => {
	const [data, setData] = useState(null);
	const navigate = useNavigate();
	const { studentUuid, classroomUuid } = useParams();

	useEffect(() => {
		deliverablesAPI
			.getStudentReport(studentUuid, classroomUuid)
			.then((response) => {
				setData(response);
			});
	}, [studentUuid, classroomUuid]);

	const handleViewAttempt = (studentUuid, deliverableUuid) => () => {
		navigate(
			`/dashboard/deliverable/${deliverableUuid}?preview=true&studentUuid=${studentUuid}`
		);
	};

	return (
		<Box className="student">
			<Box>
				{data && (
					<Card
						sx={{
							padding: 3,
						}}
					>
						<Typography variant="h4" sx={{ fontWeight: 'bold' }}>
							{`${data.student.firstName} ${data.student.lastName}`}
						</Typography>
						<Box sx={{ mt: 4 }}>
							<Typography
								color="primary"
								sx={{
									fontSize: '30px',
									paddingBottom: '10px',
									borderBottom: '1px solid rgba(0,0,0,0.3)',
									mb: 2,
								}}
							>
								Assignments
							</Typography>
							{!!data.deliverables.length &&
								data.deliverables.map((deliverable) => {
									if (deliverable.type === 'assignment')
										return (
											<Box
												sx={{
													mb: 2,
													display: 'flex',
													justifyContent:
														'space-between',
													borderBottom:
														'1px solid rgba(0,0,0,0.2)',
													'&:last-child': {
														border: 0,
													},
													paddingBottom: 1,
												}}
												key={deliverable.uuid}
											>
												<Typography>
													{deliverable.title}
												</Typography>
												{deliverable.attempted ? (
													<Box
														sx={{
															display: 'flex',
															flexDirection:
																'row',
															alignItems:
																'center',
														}}
													>
														<Typography
															sx={{ mr: 1 }}
														>
															Grade:{' '}
															{
																deliverable
																	.attempt
																	.grade
															}
															/100
														</Typography>
														<Button
															onClick={handleViewAttempt(
																data.student
																	.uuid,
																deliverable.uuid
															)}
														>
															View Attempt
														</Button>
													</Box>
												) : (
													<Typography>
														Not Submitted
													</Typography>
												)}
											</Box>
										);
									else return null;
								})}
						</Box>
						<Box sx={{ mt: 4 }}>
							<Typography
								color="primary"
								sx={{
									fontSize: '30px',
									paddingBottom: '10px',
									borderBottom: '1px solid rgba(0,0,0,0.3)',
									mb: 2,
								}}
							>
								Quizzes
							</Typography>
							{!!data.deliverables.length &&
								data.deliverables.map((deliverable) => {
									if (deliverable.type === 'quiz')
										return (
											<Box
												sx={{
													mb: 2,
													display: 'flex',
													justifyContent:
														'space-between',
													borderBottom:
														'1px solid rgba(0,0,0,0.2)',
													'&:last-child': {
														border: 0,
													},
													paddingBottom: 1,
												}}
												key={deliverable.uuid}
											>
												<Typography>
													{deliverable.title}
												</Typography>
												{deliverable.attempted ? (
													<Box
														sx={{
															display: 'flex',
															flexDirection:
																'row',
															alignItems:
																'center',
														}}
													>
														<Typography
															sx={{ mr: 1 }}
														>
															Grade:{' '}
															{
																deliverable
																	.attempt
																	.grade
															}
															/100
														</Typography>
														<Button
															onClick={handleViewAttempt(
																data.student
																	.uuid,
																deliverable.uuid
															)}
														>
															View Attempt
														</Button>
													</Box>
												) : (
													<Typography>
														Not Submitted
													</Typography>
												)}
											</Box>
										);
									else return null;
								})}
						</Box>
						<Box sx={{ mt: 4 }}>
							<Typography
								color="primary"
								sx={{
									fontSize: '30px',
									paddingBottom: '10px',
									borderBottom: '1px solid rgba(0,0,0,0.3)',
									mb: 2,
								}}
							>
								Exams
							</Typography>
							{!!data.deliverables.length &&
								data.deliverables.map((deliverable) => {
									if (deliverable.type === 'exam')
										return (
											<Box
												sx={{
													mb: 2,
													display: 'flex',
													justifyContent:
														'space-between',
													borderBottom:
														'1px solid rgba(0,0,0,0.2)',
													'&:last-child': {
														border: 0,
													},
													paddingBottom: 1,
												}}
												key={deliverable.uuid}
											>
												<Typography>
													{deliverable.title}
												</Typography>
												{deliverable.attempted ? (
													<Box
														sx={{
															display: 'flex',
															flexDirection:
																'row',
															alignItems:
																'center',
														}}
													>
														<Typography
															sx={{ mr: 1 }}
														>
															Grade:{' '}
															{
																deliverable
																	.attempt
																	.grade
															}
															/100
														</Typography>
														<Button
															onClick={handleViewAttempt(
																data.student
																	.uuid,
																deliverable.uuid
															)}
														>
															View Attempt
														</Button>
													</Box>
												) : (
													<Typography>
														Not Submitted
													</Typography>
												)}
											</Box>
										);
									else return null;
								})}
						</Box>
					</Card>
				)}
			</Box>
		</Box>
	);
};

export default Student;
