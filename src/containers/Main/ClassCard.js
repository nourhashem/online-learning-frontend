import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Box } from '@mui/material';
import CoverImage from 'assets/images/card-cover.jpg';
import { useNavigate } from 'react-router-dom';

const ClassCard = (props) => {
  const navigate = useNavigate();
  const { code, title, section, instructor, campus, semester, schedule, uuid } =
    props.data;
  const openClassURL = (classUuid) => () =>
    navigate(`/dashboard/class/${classUuid}`);
  return (
    <Card
      align="start"
      sx={{ maxWidth: 345 }}
      onClick={openClassURL(uuid)}
      style={{ height: '100%' }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={CoverImage}
          alt="green iguana"
        />
        <CardContent>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              style={{ fontWeight: 'bold' }}
              variant="h5"
              component="div"
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ fontWeight: 'bold' }}
            >
              {code}
            </Typography>
          </Box>
          <Typography style={{ fontWeight: 'bold' }} variant="body1">
            {instructor}
          </Typography>
          <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              Section {section}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {semester}
            </Typography>
          </Box>
          <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              {schedule}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {campus}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ClassCard;
