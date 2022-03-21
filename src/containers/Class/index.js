import { Box, Tab, Tabs, Typography } from '@mui/material';
import mockClasses from 'mocks/classes';
import React from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';

const Class = () => {
  const { classId } = useParams();
  const myClass = mockClasses.find((c) => c.uuid === classId);
  const path = document.location.pathname;
  const startingIndex = path.includes('work')
    ? 1
    : path.includes('chat')
    ? 2
    : 0;
  const [tabIndex, setTabIndex] = React.useState(startingIndex);
  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };
  return (
    <Box>
      <Typography sm={{ position: 'absolute' }} variant="h4">
        {myClass.fullName}
      </Typography>
      <Tabs centered value={tabIndex} onChange={handleChangeTab}>
        <Tab
          LinkComponent={Link}
          to={`/dashboard/class/${classId}`}
          label="Stream"
        />
        <Tab LinkComponent={Link} to="work" label="Your Work" />
        <Tab LinkComponent={Link} to="chat" label="Chat" />
      </Tabs>
      <Outlet />
    </Box>
  );
};

export default Class;
