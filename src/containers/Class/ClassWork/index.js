import { Fab, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Add as AddIcon } from '@mui/icons-material';
import deliverablesAPI from 'api/deliverable';
import ClassDeliverables from './ClassDeliverables';
import CreateDeliverable from './CreateDeliverable';
import './style.scss';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ClassWork = () => {
	const [creationMode, setCreationMode] = useState(false);
	const [deliverables, setDeliverables] = useState([]);
	const user = useSelector((state) => state.app.user);
	const { classroomUuid } = useParams();

	useEffect(() => {
		deliverablesAPI
			.getAll(classroomUuid)
			.then((response) =>
				setDeliverables(
					response.deliverables.sort(
						(a, b) => b.activationDate - a.activationDate
					)
				)
			);
	}, [classroomUuid]);

	const handleCreateDeliverable = () => {
		setCreationMode(true);
	};

	const handleSaveDeliverable = async (deliverableData) => {
		await deliverablesAPI.add(deliverableData, classroomUuid);
		const { deliverables } = await deliverablesAPI.getAll(classroomUuid);
		setDeliverables(
			deliverables.sort((a, b) => b.activationDate - a.activationDate)
		);
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
						<Typography variant="h4" sx={{ fontWeight: 'bold' }}>
							Class Deliverables
						</Typography>
						{user && user.role === 'instructor' && (
							<Fab
								onClick={handleCreateDeliverable}
								variant="extended"
								color="primary"
								aria-label="add"
							>
								<AddIcon sx={{ mr: 1 }} />
								Create Deliverable
							</Fab>
						)}
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
