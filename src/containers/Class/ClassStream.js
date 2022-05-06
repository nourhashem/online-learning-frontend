import { Box } from '@mui/system';
import React from 'react';
import ClassPosts from './ClassPosts';

const ClassStream = () => {
  return (
    <Box className="classStream">
      <Box>
        <ClassPosts />
      </Box>
    </Box>
  );
};

export default ClassStream;
