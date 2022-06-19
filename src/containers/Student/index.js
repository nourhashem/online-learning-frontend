import React, { useEffect, useState } from 'react';
import { Box, Card } from '@mui/material';
import './style.scss';
import { useParams } from 'react-router-dom';
import deliverablesAPI from 'api/deliverable';

const Student = () => {
	const [data, setData] = useState(null);
	const { studentUuid, classroomUuid } = useParams();

	useEffect(() => {
		deliverablesAPI.getStudentReport(studentUuid, classroomUuid);
	}, [studentUuid]);

	return (
		<Box className="student">
			<Box>
				<Card
					sx={{
						padding: 3,
					}}
				>
					Test
				</Card>
			</Box>
		</Box>
	);
};

export default Student;
