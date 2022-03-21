import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ClassCard from './ClassCard';
import mockClasses from 'mocks/classes';

const Main = () => {
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    setClasses(mockClasses);
  }, []);
  return (
    <div className="classes">
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
        alignItems="stretch"
      >
        {classes.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index} align="center">
            <ClassCard data={item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Main;
