import { Box, Typography } from '@mui/material';
import React from 'react';
import '../style.scss';
import QuestionAnswer from './QuestionAnswer';

const Question = ({
	data: { question, type, choices, answer, points },
	onAnswer,
	questionIndex,
	sx,
}) => {
	return (
		<Box className="question" sx={sx}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					mb: 2,
				}}
			>
				<Typography variant="body1" sx={{ fontWeight: 'bold' }}>
					{`${questionIndex ? questionIndex + '. ' : ''} ${question}`}
				</Typography>
				<Typography
					variant="body1"
					sx={{
						fontStyle: 'italic',
						color: 'rgba(0, 0, 0, 0.6)',
						ml: 2,
					}}
				>
					{`${points} points`}
				</Typography>
			</Box>

			<QuestionAnswer
				type={type}
				choices={choices}
				answer={answer}
				onAnswer={onAnswer}
			/>
		</Box>
	);
};

export default Question;
