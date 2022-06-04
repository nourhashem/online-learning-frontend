import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';

const TimePicker = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <MobileTimePicker
        renderInput={(params) => (
          <TextField
            fullWidth={props.fullWidth}
            size="small"
            margin="normal"
            style={{ ...props.style }}
            {...params}
          />
        )}
        {...props}
      />
    </LocalizationProvider>
  );
};

export default TimePicker;
