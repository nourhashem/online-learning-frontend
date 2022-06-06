import { Box } from '@mui/system';
import React from 'react';
import { questionTypes } from 'const';
import {
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from '@mui/material';

const QuestionAnswer = ({ type, choices, answer, onAnswer }) => {
	const handleTextAnswer = ({ target: { value } }) => onAnswer(value);

	const handleNumberAnswer = ({ target: { value } }) =>
		onAnswer(value === '' ? value : Number(value));

	const handleTrueFalseAnswer = ({ target: { value } }) => onAnswer(value);

	const handleSingleAnswer = ({ target: { value } }) =>
		onAnswer(value === '' ? value : Number(value));

	const handleMultipleAnswer = ({ target: { checked, value } }) => {
		console.log({ answer, value, checked });
		const newAnswer = { ...answer };
		newAnswer[value] = checked;
		for (let i = 0; i < choices.length; i++) {
			if (!newAnswer.hasOwnProperty(i)) {
				newAnswer[i] = false;
			}
		}
		console.log({ newAnswer });
		onAnswer(newAnswer);
	};

	switch (type) {
		case questionTypes.text:
			return (
				<TextField
					placeholder="Write your answer"
					variant="outlined"
					size="small"
					type="text"
					fullWidth
					multiline
					minRows={3}
					autoComplete="off"
					value={answer || ''}
					onChange={handleTextAnswer}
				/>
			);
		case questionTypes.number:
			return (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<Typography sx={{ mr: 2 }}>Answer:</Typography>
					<TextField
						variant="outlined"
						size="small"
						style={{ width: '200px' }}
						type="number"
						autoComplete="off"
						value={answer || answer === 0 ? answer : ''}
						onChange={handleNumberAnswer}
					/>
				</Box>
			);
		case questionTypes.trueFalse:
			return (
				<Box sx={{ display: 'flex', flexDirection: 'column' }}>
					<FormControl>
						<FormLabel id="demo-radio-buttons-group-label">
							Select your answer
						</FormLabel>
						<RadioGroup
							value={answer}
							onChange={handleTrueFalseAnswer}
							aria-labelledby="demo-radio-buttons-group-label"
							name="radio-buttons-group"
						>
							<FormControlLabel
								value="true"
								control={<Radio />}
								label="True"
							/>
							<FormControlLabel
								value="false"
								control={<Radio />}
								label="False"
							/>
						</RadioGroup>
					</FormControl>
					<Button
						variant="outlined"
						sx={{ width: '100px', mt: 2 }}
						onClick={() => onAnswer('')}
					>
						Clear
					</Button>
				</Box>
			);
		case questionTypes.single:
			return (
				<Box sx={{ display: 'flex', flexDirection: 'column' }}>
					{choices && !!Object.values(choices).length && (
						<>
							<FormControl>
								<FormLabel id="demo-radio-buttons-group-label">
									Choose one answer:
								</FormLabel>
								<RadioGroup
									value={answer}
									onChange={handleSingleAnswer}
									aria-labelledby="demo-radio-buttons-group-label"
									name="radio-buttons-group"
								>
									{choices.map((choice, index) => (
										<FormControlLabel
											key={index.toString()}
											value={index}
											control={<Radio />}
											label={choice}
										/>
									))}
								</RadioGroup>
							</FormControl>
							<Button
								variant="outlined"
								sx={{ width: '100px', mt: 2 }}
								onClick={() => onAnswer('')}
							>
								Clear
							</Button>
						</>
					)}
				</Box>
			);
		case questionTypes.multiple:
			return (
				<Box>
					{choices && !!Object.values(choices).length && (
						<FormGroup value={answer}>
							<FormLabel id="demo-radio-buttons-group-label">
								Choose one or more answers:
							</FormLabel>
							{choices.map((choice, index) => (
								<FormControlLabel
									control={<Checkbox />}
									label={choice}
									value={index}
									checked={answer[index]}
									onChange={handleMultipleAnswer}
								/>
							))}
						</FormGroup>
					)}
				</Box>
			);
		default:
			return null;
	}
};

export default QuestionAnswer;
