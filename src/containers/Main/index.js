import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ClassCard from './ClassCard';
import classroomAPI from '../../api/classroom';
import './style.scss';
import { useDispatch } from 'react-redux';
import classroomActions from 'store/actions/classroom';

const Main = () => {
  const [classrooms, setClassrooms] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    classroomAPI.getAll().then(({ classrooms }) => {
      setClassrooms(classrooms);
      dispatch({
        type: classroomActions.setAll,
        classrooms,
      });
    });
  }, [dispatch]);
  return (
    <div className="classGrid">
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
        alignItems="stretch"
      >
        {classrooms.map((item) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={item.uuid}
            align="center"
          >
            <ClassCard data={item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Main;
