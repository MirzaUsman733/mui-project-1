// HeightWeightComponent.js
import React from 'react';
import {
  Grid,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Container,
} from '@mui/material';


const HeightWeightComponent = ({
  weight,
  setWeight,
  weightUnit,
  setWeightUnit,
  height,
  setHeight,
  heightFeet,
  setHeightFeet,
  heightInches,
  setHeightInches,
  heightUnit,
  setHeightUnit,
}) => (
  <div className="mb-4">
    <div>   
    <Container>
    <Grid container spacing={2} direction="row">
      <Grid item xs={12} sm={heightUnit === 'cm' ? 6 : 4}>
        <TextField
          className="mb-4"
          id="weight"
          label="Weight"
          type="number"
          color="warning"
          inputlabelprops={{
            shrink: true,
          }}
          onChange={(e) => setWeight(e.target.value)}
        />
        <RadioGroup
          row
          aria-label="weightUnit"
          name="row-radio-buttons-group"
          value={weightUnit}
          onChange={(e) => setWeightUnit(e.target.value)}
        >
          <FormControlLabel value="kg" control={<Radio />} label="kg" />
          <FormControlLabel value="lbs" control={<Radio />} label="lbs" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm=
      {heightUnit === 'cm' ? 6 : 8}
      >
        {heightUnit === 'cm' ? (
          <TextField
            className="mb-4"
            id="height"
            label="Height (cm)"
            type="number"
            color="error"
            inputlabelprops={{
              shrink: true,
            }}
            onChange={(e) => setHeight(e.target.value)}
          />
        ) : (
          <div>
            <TextField
              className="mb-4"
              id="heightFeet"
              label="Feet"
              type="number"
              color="error"
              inputlabelprops={{
                shrink: true,
              }}
              onChange={(e) => setHeightFeet(e.target.value)}
            />
            <TextField
              className="mb-4"
              id="heightInches"
              label="Inches"
              type="number"
              color="error"
              inputlabelprops={{
                shrink: true,
              }}
              onChange={(e) => setHeightInches(e.target.value)}
            />
          </div>
        )}

        <RadioGroup
          row
          aria-label="heightUnit"
          name="row-radio-buttons-group"
          value={heightUnit}
          onChange={(e) => setHeightUnit(e.target.value)}
        >
          <FormControlLabel value="cm" control={<Radio />} label="cm" />
          <FormControlLabel value="feet" control={<Radio />} label="feet" />
        </RadioGroup>
      </Grid>
    </Grid>
    </Container>
  </div>
  </div>
);

export default HeightWeightComponent;
