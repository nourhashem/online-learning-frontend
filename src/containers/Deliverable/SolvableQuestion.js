import Question from 'containers/Class/ClassWork/Question';
import React, { useState } from 'react';

const SolvableQuestion = ({ sx, data, onAnswer, questionIndex, disabled }) => {
	const [answer, setAnswer] = useState(disabled ? data.answer : '');

	const handleAnswerChange = (answer) => {
		if (disabled) return;
		setAnswer(answer);
		onAnswer({ ...data, answer });
	};

	const getQuestionData = () => ({
		...data,
		answer,
	});

	return (
		<Question
			sx={sx}
			data={getQuestionData()}
			onAnswer={handleAnswerChange}
			questionIndex={questionIndex}
		/>
	);
};

export default SolvableQuestion;
