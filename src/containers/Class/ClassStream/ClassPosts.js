import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import ClassPost from './ClassPost';
import CreatePost from './CreatePost';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import postAPI from 'api/post';

const ClassPosts = (props) => {
  const { classroomUuid } = useParams();
  const [classroomPosts, setClassroomPosts] = useState([]);
  useEffect(() => {
    postAPI.getAll(classroomUuid).then(({ posts }) => {
      setClassroomPosts(posts.sort((a, b) => b.date.localeCompare(a.date)));
    });
  }, [classroomUuid]);
  return (
    <>
      <CreatePost setClassroomPosts={setClassroomPosts} />
      <Box>
        {classroomPosts &&
          classroomPosts.map((post) => (
            <ClassPost key={post.uuid} data={post} />
          ))}
      </Box>
      {classroomPosts && classroomPosts.length === 0 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '80px',
          }}
        >
          <Typography>No posts yet.</Typography>
        </Box>
      )}
    </>
  );
};

export default ClassPosts;