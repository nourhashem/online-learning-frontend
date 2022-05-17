import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import classroomAPI from 'api/classroom';
import { useSelector } from 'react-redux';

const AddClassroomDialog = ({ open, onClose }) => {
  const user = useSelector((state) => state.app.user);
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [semester, setSemester] = useState('');
  const [schedule, setSchedule] = useState('');
  const [campus, setCampus] = useState('');
  const [section, setSection] = useState('');
  const [studentsEmails, setStudentsEmails] = useState('');
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleStudentsEmailsChange = (event) => {
    setStudentsEmails(event.target.value);
  };
  const handleScheduleChange = (event) => {
    setSchedule(event.target.value);
  };
  const handleSemesterChange = (event) => {
    setSemester(event.target.value);
  };
  const handleCampusChange = (event) => {
    setCampus(event.target.value);
  };
  const handleSectionChange = (event) => {
    setSection(event.target.value);
  };

  const addClassroom = async () => {
    const instructorUuid = user.uuid;
    const studentsEmailsArray = studentsEmails.split(';');
    const response = await classroomAPI.add(
      title,
      code,
      semester,
      campus,
      instructorUuid,
      schedule,
      section,
      studentsEmailsArray
    );
    if (response.message === 'success') {
      console.log('successfully added', response);
    } else console.log('failure');
    setCampus('');
    setCode('');
    setSchedule('');
    setSection('');
    setSemester('');
    setTitle('');
    setStudentsEmails('');
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Classroom</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter classroom details</DialogContentText>
        <TextField
          margin="dense"
          id="code"
          label="Course Code"
          type="text"
          fullWidth
          size="small"
          variant="outlined"
          value={code}
          onChange={handleCodeChange}
        />
        <TextField
          margin="dense"
          id="title"
          label="Course Title"
          type="text"
          fullWidth
          size="small"
          variant="outlined"
          value={title}
          onChange={handleTitleChange}
        />
        <TextField
          margin="dense"
          id="semester"
          label="Semester"
          type="text"
          fullWidth
          size="small"
          variant="outlined"
          value={semester}
          onChange={handleSemesterChange}
        />
        <TextField
          margin="dense"
          id="schedule"
          label="Schedule"
          type="text"
          fullWidth
          size="small"
          variant="outlined"
          value={schedule}
          onChange={handleScheduleChange}
        />
        <TextField
          margin="dense"
          id="section"
          label="Section"
          type="text"
          fullWidth
          size="small"
          variant="outlined"
          value={section}
          onChange={handleSectionChange}
        />
        <TextField
          margin="dense"
          id="campus"
          label="Campus"
          type="text"
          fullWidth
          size="small"
          variant="outlined"
          value={campus}
          onChange={handleCampusChange}
        />
        <TextField
          margin="dense"
          id="students"
          label="Student Emails"
          type="text"
          fullWidth
          size="small"
          variant="outlined"
          multiline
          minRows={5}
          value={studentsEmails}
          onChange={handleStudentsEmailsChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={addClassroom}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddClassroomDialog;
