import React from 'react';
import TextField from '@mui/material/TextField';
import { InputAdornment, InputLabel } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';

const SurplusInput = ({ surplus, setSurplus,scrollToSurplusDetail }) => {
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
    <div className="d-flex">
    <InputLabel className="d-inline-block fs-4 mb-4" htmlFor="bodyType">
      How much deficienty do you want?
    </InputLabel>{' '}
    &nbsp;
    {'  '}
    <Link
      style={{ color: '#5A5A5A' }}
      onClick={scrollToSurplusDetail}
    >
      {'   '}
      <InfoIcon className="d-inline-block fs-3" />{' '}
    </Link>
  </div>
    <TextField
      className="mb-4"
      id="surplus"
      label="Surplus"
      type="number"
      color="primary"
      inputlabelprops={{
        shrink: true,
      }}
      InputProps={{
        endAdornment: <InputAdornment position="end">kg.</InputAdornment>,
      }}
      value={surplus}
      onChange={(e) => setSurplus(e.target.value)}
    />
    </div>
    <hr />
    </>
  );
};

export default SurplusInput;
