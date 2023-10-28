import React from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { InputLabel } from '@mui/material';

const DurationInput = ({ duration, setDuration, customDuration, setCustomDuration }) => {
  const handleDurationChange = (event) => {
    const value = event.target.value;
    if (value === 'custom') {
      setDuration(value);
    } else {
      setDuration(value);
      setCustomDuration('');
    }
  };

  return (
    <>
    <div>
      <InputLabel id="duration-label">Duration</InputLabel>
      <Select
        labelId="duration-label"
        id="duration"
        value={duration}
        label="Duration"
        onChange={handleDurationChange}
      >
        <MenuItem value={3}>Three Months</MenuItem>
        <MenuItem value={6}>Six Months</MenuItem>
        <MenuItem value={12}>1 Year</MenuItem>
        <MenuItem value="custom">Custom</MenuItem>
      </Select>
      {duration === 'custom' && (
        <TextField
          label="Custom Duration (in months)"
          type="number"
          value={customDuration}
          onChange={(e) => setCustomDuration(e.target.value)}
        />
      )}
    </div>
    <hr />
    </>
  );
};

export default DurationInput;
