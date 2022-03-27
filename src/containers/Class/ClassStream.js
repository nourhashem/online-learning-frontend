import { Box } from '@mui/system';
import React from 'react';
import ClassPosts from './ClassPosts';
import mockClasses from 'mocks/classes';
import { useParams } from 'react-router-dom';

const ClassStream = () => {
  const { classId } = useParams();
  const myClass = mockClasses.find((c) => c.uuid === classId);
  console.log({ myClass });
  return (
    <Box className="classStream">
      <Box>
        <ClassPosts data={myClass.posts || []} />
      </Box>
    </Box>
  );
};

export default ClassStream;
