import { Fab, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Add as AddIcon } from '@mui/icons-material';
import deliverablesAPI from 'api/deliverable';
import ClassDeliverables from './ClassDeliverables';
import CreateDeliverable from './CreateDeliverable';
import './style.scss';
import { useParams } from 'react-router-dom';

const ClassWork = () => {
	const [creationMode, setCreationMode] = useState(false);
	const [deliverables, setDeliverables] = useState([]);
	const { classroomUuid } = useParams();

	useEffect(() => {
		deliverablesAPI
			.getAll(classroomUuid)
			.then((response) => setDeliverables(response.deliverables));
	}, [classroomUuid]);

	const handleCreateDeliverable = () => {
		setCreationMode(true);
	};

	const handleSaveDeliverable = (deliverableData) => {
		deliverablesAPI.add(deliverableData, classroomUuid);
		setCreationMode(false);
	};

	const handleDiscardDeliverable = () => {
		setCreationMode(false);
	};

	return (
		<Box className="classWork">
			<Box className="classWorkContainer">
				{!creationMode && (
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
				)}
				<Box className="classWorkBody">
					{creationMode ? (
						<CreateDeliverable
							onDiscard={handleDiscardDeliverable}
							onSave={handleSaveDeliverable}
						/>
					) : (
						<ClassDeliverables data={deliverables} />
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default ClassWork;
