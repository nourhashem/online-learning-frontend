import { Box } from '@mui/system';
import React from 'react';
import ClassPost from './ClassPost';

const ClassPosts = (props) => {
  const { data } = props;
  console.log({ data });
  return (
    <>
      <h1>Posts</h1>
      <Box>{data && data.map((post) => <ClassPost data={post} />)}</Box>
    </>
  );
};

export default ClassPosts;
