import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';

const Class = () => {
	const { classroomUuid } = useParams();
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
			<Tabs centered value={tabIndex} onChange={handleChangeTab}>
				<Tab
					LinkComponent={Link}
					to={`/dashboard/class/${classroomUuid}`}
					label="Stream"
				/>
				<Tab LinkComponent={Link} to="work" label="Classwork" />
				<Tab LinkComponent={Link} to="chat" label="Chat" />
			</Tabs>
			<Outlet />
		</Box>
	);
};

export default Class;
