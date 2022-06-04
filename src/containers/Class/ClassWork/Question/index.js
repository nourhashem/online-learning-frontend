import { Box, Typography } from '@mui/material';
import React from 'react';
import '../style.scss';
import QuestionAnswer from './QuestionAnswer';

const Question = ({
  data: { question, type, choices, answer },
  onAnswer,
  questionIndex,
  sx,
}) => {
  return (
    <Box className="question" sx={sx}>
      <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 }}>
        {`${questionIndex ? questionIndex + '. ' : ''} ${question}`}
      </Typography>
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
