import React from 'react';
import { Box } from '@mui/system';
import ClassDeliverable from './ClassDeliverable';
import './style.scss';

const ClassDeliverables = ({ data }) => {
  return (
    <>
      {!data.length && (
        <Box className="noDeliverables">
          <span>No Deliverables yet.</span>
        </Box>
      )}
      {!!data.length && data.map((item) => <ClassDeliverable data={item} />)}
    </>
  );
};

export default ClassDeliverables;
