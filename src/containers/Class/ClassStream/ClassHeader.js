import React from 'react';
import { Typography } from '@mui/material';
import CoverImage from 'assets/images/card-cover.jpg';
import { Box } from '@mui/system';
import './style.scss';

const ClassHeader = (props) => {
  const { title, code, instructor } = props.data;
  console.log(props.data);
  return (
    <Box className="classHeader">
      <Box
        style={{
          backgroundImage: `url(${CoverImage})`,
        }}
      >
        <Typography variant="h1">{title}</Typography>
        <Typography variant="h2">{`${code} - ${instructor}`}</Typography>
      </Box>
    </Box>
  );
};

export default ClassHeader;
