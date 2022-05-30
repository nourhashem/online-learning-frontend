import { Fab, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Add as AddIcon } from '@mui/icons-material';
import ClassDeliverables from './ClassDeliverables';
import CreateDeliverable from './CreateDeliverable';
import './style.scss';

const ClassWork = () => {
  const [creationMode, setCreationMode] = useState(false);
  const [deliverables, setDeliverables] = useState([]);
  const handleCreateDeliverable = () => {
    setCreationMode(true);
  };
  return (
    <Box className="classWork">
      <Box className="classWorkContainer">
        <Box className="classWorkHeader">
          <Typography variant="h4">Class Deliverables</Typography>
          <Fab
            onClick={handleCreateDeliverable}
            variant="extended"
            color="primary"
            aria-label="add"
          >
            <AddIcon sx={{ mr: 1 }} />
            Create Deliverable
          </Fab>
        </Box>
        <Box className="classWorkBody">
          {creationMode ? <CreateDeliverable /> : <ClassDeliverables />}
        </Box>
      </Box>
    </Box>
  );
};

export default ClassWork;
