import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import ClassPosts from './ClassPosts';
import postAPI from '../../api/post';
import { useParams } from 'react-router-dom';

const ClassStream = () => {
  const { classId } = useParams();
  const [classPosts, setClassPosts] = useState([]);
  useEffect(() => {
    postAPI.getAll(classId).then(({ posts }) => {
      setClassPosts(posts);
    });
  }, [classId]);
  return (
    <Box className="classStream">
      <Box>
        <ClassPosts data={classPosts || []} />
      </Box>
    </Box>
  );
};

export default ClassStream;
