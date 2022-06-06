import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { questionTypes } from 'const';
import Question from './Question';

const CreateQuestion = ({ onCancel, onDone }) => {
	const [question, setQuestion] = useState('');
	const [type, setType] = useState('');
	const [showAnswers, setShowAnswers] = useState(false);
	const [numberChoices, setNumberChoices] = useState(2);
	const [choices, setChoices] = useState([]);
	const [answer, setAnswer] = useState('');

	const handleQuestionAdd = () => {
		onDone({
			question,
			type,
			choices,
			answer,
		});
	};

	const getQuestionData = () => ({
		question,
		type,
		choices,
		answer,
	});

	const handleQuestionChange = ({ target: { value } }) => {
		setQuestion(value);
	};

	const handleTypeChange = ({ target: { value } }) => {
		setAnswer('');
		setChoices([]);
		setType(value);
		if ([questionTypes.single, questionTypes.multiple].includes(value))
			setShowAnswers(true);
		else setShowAnswers(false);
	};

	const handleNumberChoicesChange = ({ target: { value } }) => {
		setChoices([]);
		if (value && value < 2) setNumberChoices(2);
		else if (value && value > 100) setNumberChoices(100);
		else if (!value) setNumberChoices('');
		else setNumberChoices(Number(value));
	};

	const handleChoiceChange =
		(choiceId) =>
		({ target: { value } }) => {
			const newChoices = [...choices];
			newChoices[choiceId] = value;
			setChoices(newChoices);
		};

	const handleAnswerChange = (answer) => {
		setAnswer(answer);
	};

	return (
		<Box className="createQuestion">
			<Typography sx={{ fontWeight: 'bold' }}>
				Add New Question
			</Typography>
			<TextField
				margin="normal"
				id="deliverable-title"
				label="Question"
				type="text"
				fullWidth
				size="small"
				variant="outlined"
				value={question}
				autoComplete="off"
				onChange={handleQuestionChange}
			/>
			<FormControl fullWidth size="small" margin="normal">
				<InputLabel id="deliverable-type-label">
					Question Type
				</InputLabel>
				<Select
					label="Question Type"
					id="question-type"
					value={type}
					onChange={handleTypeChange}
				>
					<MenuItem value={questionTypes.text}>Text</MenuItem>
					<MenuItem value={questionTypes.number}>Number</MenuItem>
					<MenuItem value={questionTypes.trueFalse}>
						True/False
					</MenuItem>
					<MenuItem value={questionTypes.single}>
						Single Answer
					</MenuItem>
					<MenuItem value={questionTypes.multiple}>
						Multiple Answers
					</MenuItem>
				</Select>
			</FormControl>
			{showAnswers && (
				<Box>
					<Typography
						variant="body1"
						sx={{ fontWeight: 'bold', mt: 2, mb: 2 }}
					>
						Answers
					</Typography>
					<TextField
						margin="normal"
						id="numberChoices"
						label="Number of Choices"
						type="number"
						fullWidth
						size="small"
						variant="outlined"
						value={numberChoices}
						autoComplete="off"
						onChange={handleNumberChoicesChange}
						sx={{ mb: 2 }}
					/>
					{choices &&
						[
							...Array(numberChoices ? numberChoices : 2).keys(),
						].map((choice) => (
							<TextField
								key={choice}
								margin="normal"
								id={`choice-${choice}`}
								label={`Choice #${choice + 1}`}
								type="text"
								fullWidth
								size="small"
								variant="outlined"
								autoComplete="off"
								value={choices[choice] || ''}
								onChange={handleChoiceChange(choice)}
							/>
						))}
				</Box>
			)}
			{question && type && (
				<Box>
					<Typography
						variant="body1"
						sx={{ fontWeight: 'bold', mt: 2, mb: 2 }}
					>
						Provide Quesion Answer
					</Typography>
					<Question
						data={getQuestionData()}
						onAnswer={handleAnswerChange}
					></Question>
				</Box>
			)}
			<Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
				<Button onClick={onCancel} sx={{ mr: 2 }}>
					Cancel
				</Button>
				<Button variant="contained" onClick={handleQuestionAdd}>
					Add
				</Button>
			</Box>
		</Box>
	);
};

export default CreateQuestion;
