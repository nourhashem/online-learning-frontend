import {
	Box,
	Button,
	Card,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import DatePicker from 'components/DatePicker';
import TimePicker from 'components/TimePicker';
import moment from 'moment';
import React, { useState } from 'react';
import uuid from 'react-uuid';
import CreateQuestion from './CreateQuestion';
import Question from './Question';
import './style.scss';

const CreateDeliverable = ({ onDiscard, onSave }) => {
	const [type, setType] = useState('');
	const [title, setTitle] = useState('');
	const [readyQuestions, setReadyQuestions] = useState([]);
	const [addingQuestion, setAddingQuestion] = useState(false);
	const [activationDate, setActivationDate] = useState(moment());
	const [activationTime, setActivationTime] = useState(
		moment().startOf('hour')
	);
	const [endTime, setEndTime] = useState(
		moment().startOf('hour').add(1, 'hour')
	);

	const getDeliverableData = () => ({
		metadata: {
			type,
			title,
			activationDate: activationDate.unix(),
			activationTime: activationTime.unix(),
			endTime: endTime.unix(),
		},
		questions: readyQuestions,
	});

	const handleSave = () => {
		onSave(getDeliverableData());
	};

	const handleDiscard = () => {
		onDiscard();
	};

	const handleTypeChange = ({ target: { value } }) => {
		setType(value);
	};

	const handleTitleChange = ({ target: { value } }) => {
		setTitle(value);
	};

	const handleActivationDateChange = (value) => {
		setActivationDate(value);
	};

	const handleActivationTimeChange = (value) => {
		setActivationTime(value);
		if (value.unix() > endTime.unix()) {
			setEndTime(moment(value).add(1, 'hour'));
		}
	};

	const handleEndTimeChange = (value) => {
		setEndTime(value);
	};

	const handleAddQuestion = () => {
		setAddingQuestion(true);
	};

	const handleQuestionCancel = () => {
		setAddingQuestion(false);
	};

	const handleQuestionDone = (questionData) => {
		const newQuestions = [...readyQuestions, questionData];
		setReadyQuestions(newQuestions);
		setAddingQuestion(false);
	};

	return (
		<Box className="createDeliverable">
			<Card className="metadata">
				<Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 }}>
					Deliverable Details
				</Typography>
				<FormControl fullWidth size="small" margin="normal">
					<InputLabel id="deliverable-type-label">
						Deliverable Type
					</InputLabel>
					<Select
						label="Deliverable Type"
						id="deliverable-type"
						value={type}
						onChange={handleTypeChange}
					>
						<MenuItem value={'assignment'}>Assignment</MenuItem>
						<MenuItem value={'quiz'}>Quiz</MenuItem>
						<MenuItem value={'exam'}>Exam</MenuItem>
					</Select>
				</FormControl>

				<TextField
					margin="normal"
					id="deliverable-title"
					label="Title"
					type="text"
					fullWidth
					size="small"
					variant="outlined"
					autoComplete="off"
					value={title}
					onChange={handleTitleChange}
				/>
				<DatePicker
					label="Activation Date"
					value={activationDate}
					onChange={handleActivationDateChange}
					size="small"
					fullWidth
				/>
				<Box sx={{ display: 'flex', flexDirection: 'row' }}>
					<TimePicker
						label="Activation Time"
						value={activationTime}
						onChange={handleActivationTimeChange}
						size="small"
						fullWidth
						style={{ marginRight: '5px' }}
					/>
					<TimePicker
						label="End Time"
						value={endTime}
						onChange={handleEndTimeChange}
						size="small"
						fullWidth
						style={{ marginLeft: '5px' }}
					/>
				</Box>
			</Card>
			<Card className="questions">
				<Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 }}>
					Questions
				</Typography>
				{readyQuestions.map((q, i) => (
					<Question
						sx={{ mb: 2 }}
						key={uuid()}
						data={q}
						onAnswer={() => {}}
						questionIndex={i + 1}
					/>
				))}
				{!addingQuestion && (
					<span className="addQuestion" onClick={handleAddQuestion}>
						Add Question
					</span>
				)}
				{addingQuestion && (
					<CreateQuestion
						onCancel={handleQuestionCancel}
						onDone={handleQuestionDone}
					/>
				)}
			</Card>
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
				<Button onClick={handleDiscard} sx={{ mr: 2 }}>
					Discard
				</Button>
				<Button variant="contained" onClick={handleSave}>
					Save
				</Button>
			</Box>
		</Box>
	);
};

export default CreateDeliverable;
