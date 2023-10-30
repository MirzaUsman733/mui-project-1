// GenderAgeComponent.js
import React from 'react';
import { Link, InputLabel, Grid, Radio, RadioGroup, FormControlLabel, TextField, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import Male from '@mui/icons-material/Male';
import Female from '@mui/icons-material/Female';

const GenderAgeComponent = ({
  genderValue,
  setGenderValue,
  age,
  setAge,
  scrollFunction,
}) => (
    <>
    <hr />
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '50px',
    }}
  >
    <div className="d-flex">
      <InputLabel className="d-inline-block fs-4 mb-4" htmlFor="age">
        Your Gender & Age
      </InputLabel>{' '}
      &nbsp;
      {'  '}
      <Link style={{ color: '#5A5A5A' }} onClick={scrollFunction}>
        {'   '}
        <InfoIcon className="d-inline-block fs-3" />{' '}
      </Link>
    </div>
    <div className="text-center">
      <Grid container spacing={2} direction="row">
        <Grid item xs={12} sm={6}>
          <RadioGroup
            row
            aria-label="gender"
            name="row-radio-buttons-group"
            value={genderValue}
            onChange={(e) => setGenderValue(e.target.value)}
          >
            <FormControlLabel
              value="male"
              control={<Radio />}
              label={
                <div>
                  <IconButton color="primary" size="small">
                    <Male />
                  </IconButton>
                  Male
                </div>
              }
            />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label={
                <div>
                  <IconButton color="error" size="small">
                    <Female />
                  </IconButton>
                  Female
                </div>
              }
            />
          </RadioGroup>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            className="mb-4 mt-3"
            id="age"
            label="Age"
            type="number"
            color="info"
            inputlabelprops={{
              shrink: true,
            }}
            onChange={(e) => setAge(e.target.value)}
          />
        </Grid>
      </Grid>
    </div>
  </div>
  <hr />
  </>
);

export default GenderAgeComponent;
