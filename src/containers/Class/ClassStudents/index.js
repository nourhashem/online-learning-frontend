import { Box, Button, Card, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './style.scss';
import usersAPI from 'api/user';
import { useNavigate, useParams } from 'react-router-dom';
import UserItem from './UserItem';

const ClassStudents = () => {
	const user = useSelector((state) => state.app.user);
	const [data, setData] = useState(null);
	const { classroomUuid } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		usersAPI
			.getClassroomMembers(classroomUuid)
			.then((response) => setData(response));
	}, [classroomUuid]);

	const handleViewClasswork = (studentUuid) => () => {
		navigate(`/dashboard/student/${studentUuid}/${classroomUuid}`);
	};

	return (
		<Box className="classStudents">
			{data && (
				<Box>
					{user && user.role === 'student' && (
						<Box>
							<Typography
								color="primary"
								sx={{
									fontSize: '30px',
									paddingBottom: '10px',
									borderBottom: '1px solid rgba(0,0,0,0.3)',
									mb: 2,
								}}
							>
								Instructor
							</Typography>
							<UserItem data={data.instructor} />
						</Box>
					)}
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
							Students
						</Typography>
						{!!data.students.length &&
							data.students.map((student) => (
								<Box
									sx={{
										mb: 2,
										display: 'flex',
										justifyContent: 'space-between',
										borderBottom:
											'1px solid rgba(0,0,0,0.2)',
										'&:last-child': { border: 0 },
										paddingBottom: 1,
									}}
									key={student.uuid}
								>
									<UserItem data={student} />
									{user && user.role === 'instructor' && (
										<Button
											onClick={handleViewClasswork(
												student.uuid
											)}
										>
											View Classwork
										</Button>
									)}
								</Box>
							))}
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default ClassStudents;
