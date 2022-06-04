import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

const DatePicker = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <MobileDatePicker
        inputFormat="DD/MMM/yyyy"
        renderInput={(params) => (
          <TextField size="small" margin="normal" {...params} />
        )}
        {...props}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
