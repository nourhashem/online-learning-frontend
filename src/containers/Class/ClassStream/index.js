import { Box } from '@mui/system';
import React from 'react';
import ClassPosts from './ClassPosts';
import ClassHeader from './ClassHeader';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './style.scss';

const ClassStream = () => {
  const { classroomUuid } = useParams();
  const classrooms = useSelector((state) => state.classroom.list);
  const myClass = classrooms.find((c) => c.uuid === classroomUuid);
  return (
    <Box className="classStream">
      <ClassHeader data={myClass} />
      <Box>
        <ClassPosts />
      </Box>
    </Box>
  );
};

export default ClassStream;
