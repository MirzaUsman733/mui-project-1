// GoalsComponent.js
import React from 'react';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';

const GoalsComponent = ({
  goalsValue,
  handleGoalsChange,
  scrollToGoalsDetail,
}) => {
  return (
    <>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '40px',
      }}
    >
      <div>
        <span className="d-inline-block fs-4 mb-4">
          Your End Goals of a Ketogenic diet?{' '}
        </span>{' '}
        <Link style={{ color: '	#5A5A5A' }} onClick={scrollToGoalsDetail}>
          {' '}
          <InfoIcon
            className="d-inline-block fs-3"
            style={{ marginBottom: '10px' }}
          />{' '}
        </Link>
      </div>
      <RadioGroup
        row
        aria-label="weight"
        name="row-radio-buttons-group"
        value={goalsValue}
        onChange={handleGoalsChange}
      >
        <FormControlLabel
          value="loseWeight"
          control={<Radio />}
          sx={{
            '& .MuiSvgIcon-root': {
              fontSize: 24,
            },
          }}
          label={
            <>
              <div>Lose Weight</div>
            </>
          }
        />
        <FormControlLabel
          value="maintain"
          control={<Radio />}
          sx={{
            '& .MuiSvgIcon-root': {
              fontSize: 24,
            },
          }}
          label={
            <>
              <div>Maintain</div>
            </>
          }
        />
        <FormControlLabel
          value="gainMuscle"
          control={<Radio />}
          sx={{
            '& .MuiSvgIcon-root': {
              fontSize: 24,
            },
          }}
          label={<div>Gain Muscle</div>}
        />
      </RadioGroup>
    </div>
    <hr />
    </>
  );
};

export default GoalsComponent;
