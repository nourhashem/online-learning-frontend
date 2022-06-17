import { Box, Typography } from '@mui/material';
import React from 'react';
import '../style.scss';
import QuestionAnswer from './QuestionAnswer';
import CorrectIcon from '@mui/icons-material/CheckCircleOutline';
import WrongIcon from '@mui/icons-material/HighlightOff';

const Question = ({
	data: { question, type, choices, answer, points, correct: qCorrect },
	onAnswer,
	questionIndex,
	sx,
	correct,
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
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					{correct ? (
						qCorrect ? (
							<CorrectIcon sx={{ color: '#4caf50' }} />
						) : (
							<WrongIcon sx={{ color: '#ef5350' }} />
						)
					) : null}
					<Typography
						variant="body1"
						sx={{
							fontStyle: 'italic',
							color: correct
								? qCorrect
									? '#1b5e20'
									: '#c62828'
								: 'rgba(0, 0, 0, 0.6)',
							ml: 1,
						}}
					>
						{`${points} points`}
					</Typography>
				</Box>
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
