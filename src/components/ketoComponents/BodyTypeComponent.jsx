// BodyTypeComponent.js
import React from 'react';
import {
  Grid,
  TextField,
  Button,
  CircularProgress,
  InputLabel,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import {Link} from 'react-router-dom'
const BodyTypeComponent = ({
  bodyImage,
  bustSize,
  setBustSize,
  waistSize,
  setWaistSize,
  highHipSize,
  setHighHipSize,
  hipSize,
  setHipSize,
  bodyShape,
  whr,
  calculateBodyType,
  loadingBodyType,
  scrollToBodyTypeDetail,
}) => {
return (
    <>
    <hr />
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
        Check the Body Shape
      </InputLabel>{' '}
      &nbsp;
      {'  '}
      <Link
        style={{ color: '#5A5A5A' }}
        onClick={scrollToBodyTypeDetail}
      >
        {'   '}
        <InfoIcon className="d-inline-block fs-3" />{' '}
      </Link>
    </div>
    <div>
      <Grid container spacing={2} direction="row">
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            className="mb-4"
            id="bodyType"
            label="Bust Size"
            type="number"
            color="success"
            inputlabelprops={{
              shrink: true,
            }}
            onChange={(e) => setBustSize(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            className="mb-4"
            id="bodyType"
            label="Waist Size"
            type="number"
            color="success"
            inputlabelprops={{
              shrink: true,
            }}
            onChange={(e) => setWaistSize(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            className="mb-4"
            id="bodyType"
            label="High Hip Size"
            type="number"
            color="success"
            inputlabelprops={{
              shrink: true,
            }}
            onChange={(e) => setHighHipSize(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            className="mb-4"
            id="bodyType"
            label="Hip Size"
            type="number"
            color="success"
            inputlabelprops={{
              shrink: true,
            }}
            onChange={(e) => setHipSize(e.target.value)}
          />
        </Grid>
      </Grid>
    </div>
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={calculateBodyType}
        disabled={loadingBodyType}
      >
        {loadingBodyType ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          'Click Me'
        )}
      </Button>
      <br />
      <div>
        {bodyShape && <p>{bodyShape}</p>}
        {whr && <p>{whr}</p>}
        {bodyImage && <img src={bodyImage} alt='Body Type'/>}
      </div>
    </div>
  </div>
    <hr />
  </>
);
        }
export default BodyTypeComponent;
