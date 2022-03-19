import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CoverImage from 'assets/images/card-cover.jpg';

const ClassCard = (props) => {
  const { name, fullName, section, instructor, campus, semester, time } =
    props.data;
  return (
    <Card align="start" sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={CoverImage}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {fullName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {time}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ClassCard;
