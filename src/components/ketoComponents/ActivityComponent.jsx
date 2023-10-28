// ActivityComponent.js
import React from 'react';
import { RadioGroup, FormControlLabel, Radio, IconButton } from '@mui/material';
import LaptopIcon from '@mui/icons-material/Laptop';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import InfoIcon from '@mui/icons-material/Info';
import SnowshoeingIcon from '@mui/icons-material/Snowshoeing';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import { Link } from 'react-router-dom';

const ActivityComponent = ({
  activityValue,
  handleActivityChange,
  scrollToActivityDetail,
}) => (
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
      <span className="d-inline-block fs-4 mb-4">Your Activity Level </span>
      <Link style={{ color: ' #5A5A5A' }} onClick={scrollToActivityDetail}>
        {' '}
        <InfoIcon className="d-inline-block fs-3" />{' '}
      </Link>
    </div>
    <RadioGroup
      row
      aria-label="activity"
      name="activity-level"
      value={activityValue}
      onChange={handleActivityChange}
    >
      <FormControlLabel
        value="sedentary"
        control={<Radio />}
        sx={{
          '& .MuiSvgIcon-root': {
            fontSize: 24,
          },
        }}
        label={
          <>
            <div>
              <IconButton color="dark" size="small">
                <LaptopIcon />
              </IconButton>
              Sedentary
            </div>
          </>
        }
      />
      <FormControlLabel
        value="lightlyActive"
        control={<Radio />}
        sx={{
          '& .MuiSvgIcon-root': {
            fontSize: 24,
          },
        }}
        label={
          <>
            <div>
              <IconButton color="primary" size="small">
                <SnowshoeingIcon />
              </IconButton>
              Lightly Active
            </div>
          </>
        }
      />
      <FormControlLabel
        value="moderatelyActive"
        control={<Radio />}
        sx={{
          '& .MuiSvgIcon-root': {
            fontSize: 24,
          },
        }}
        label={
          <div>
            <IconButton color="warning" size="small">
              <DirectionsBikeIcon />
            </IconButton>
            Moderately Active
          </div>
        }
      />
      <FormControlLabel
        value="veryActive"
        control={<Radio />}
        sx={{
          '& .MuiSvgIcon-root': {
            fontSize: 24,
          },
        }}
        label={
          <div>
            <IconButton color="success" size="small">
              <SportsMartialArtsIcon />
            </IconButton>
            Very Active
          </div>
        }
      />
    </RadioGroup>
  </div>
  <hr />
  </>
);

export default ActivityComponent;
