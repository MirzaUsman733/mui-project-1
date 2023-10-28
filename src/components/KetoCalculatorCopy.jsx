import React, { useState, useEffect, useCallback } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  IconButton,
  TextField,
  InputLabel,
  InputAdornment,
  Button,
  Grid,
  Box,
  Paper,
  Modal,
  Typography,
  Divider,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import LaptopIcon from '@mui/icons-material/Laptop';
import SnowshoeingIcon from '@mui/icons-material/Snowshoeing';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import InfoIcon from '@mui/icons-material/Info';
import { Male, Female } from '@mui/icons-material';
import { Link } from 'react-router-dom';
// Modal Style
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 5,
};

export default function KetoCalculator() {
  const [genderValue, setGenderValue] = useState('male');
  const [activityValue, setActivityValue] = useState('sedentary');
  const [goalsValue, setGoalsValue] = useState('loseWeight');
  const [showContent, setShowContent] = useState(false);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [surplus, setSurplus] = useState('');
  const [result, setResult] = useState(null);
  const [weightUnit, setWeightUnit] = useState('kg'); // 'kg' or 'lbs'
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm'); // 'cm' or 'feet'
  const [bustSize, setBustSize] = useState('');
  const [waistSize, setWaistSize] = useState('');
  const [highHipSize, setHighHipSize] = useState('');
  const [hipSize, setHipSize] = useState('');
  const [bodyShape, setBodyShape] = useState('');
  const [whr, setWHR] = useState('');
  const [loadingBodyType, setLoadingBodyType] = useState(false);
  const [customDuration, setCustomDuration] = useState('');
  const [duration, setDuration] = useState(3);
  const [bmi, setBMI] = useState({
    value: 0,
    category: '',
    color: '',
    txtColor: '',
  });
  // Modal
  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const handleOpenCreate = () => {
    setOpen(false);
    setOpenCreate(true);
  };
  const handleCloseCreate = () => setOpenCreate(false);
  const handleOpen = () => {
    setOpenCreate(false);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  function convertFeetInchesToCm(feet, inches) {
    const cmInOneFoot = 30.48; // 1 foot = 30.48 cm
    const cmInOneInch = 2.54; // 1 inch = 2.54 cm

    const totalCm = feet * cmInOneFoot + inches * cmInOneInch;
    return totalCm;
  }
  const calculateBMI = useCallback(() => {
    //   Calculate BMI
    const calculateBMIValue = (weight, height) => {
      // BMI formula: BMI = weight (kg) / (height (m))^2
      const heightInMeters = height / 100; // Convert height to meters
      const numericWeight =
        weightUnit === 'kg'
          ? parseFloat(weight)
          : parseFloat(weight) * 0.453592; // 1 pound = 0.453592 kg

      const bmiValue = (
        numericWeight /
        (heightInMeters * heightInMeters)
      ).toFixed(2);
      return bmiValue;
    };

    try {
      if (weight !== '' && height !== '') {
        const numericWeight = parseFloat(weight);
        let numericHeight;

        if (heightUnit === 'cm') {
          numericHeight = parseFloat(height);
        } else {
          numericHeight = convertFeetInchesToCm(heightFeet, heightInches);
          console.log(numericHeight);
        }

        // Calculate BMI
        const bmiValue = calculateBMIValue(
          numericWeight,
          numericHeight
        );

        // Classify BMI
        let bmiCategory = '';
        let bmiColor = '';
        let bmiTxtColor = '';
        if (bmiValue < 18.5) {
          bmiCategory = 'Underweight';
          bmiColor = '#0D6EFD';
          bmiTxtColor = 'white';
        } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
          bmiCategory = 'Normal';
          bmiColor = '#198754';
          bmiTxtColor = 'white';
        } else if (bmiValue >= 25 && bmiValue <= 29.9) {
          bmiCategory = 'Overweight';
          bmiColor = '#FFC107';
          bmiTxtColor = 'black';
        } else if (bmiValue >= 30 && bmiValue <= 39.9) {
          bmiCategory = 'Obese';
          bmiColor = '#0DCAF0';
          bmiTxtColor = 'black';
        } else {
          bmiCategory = 'Morbidly Obese';
          bmiColor = '#DC3545';
          bmiTxtColor = 'white';
        }
        console.log(bmiValue);
        console.log(bmiCategory);
        // Update BMI and BMI category
        setBMI({
          value: bmiValue,
          category: bmiCategory,
          color: bmiColor,
          txtColor: bmiTxtColor,
        });
      }
    } catch (error) {
      console.error('Error calculating BMI:', error.message);
    }
  }, [height, heightFeet, heightInches, heightUnit, weightUnit, weight]);

  // Calculate TDEE

  const calculateTDEE = useCallback(
    (weight, height, age, surplus, genderValue, goalsValue, activityValue) => {
      const ageValue = parseInt(age, 10);
      const weightValue = parseFloat(weight);
      const heightValue = parseFloat(height);
      const surplusValue = parseFloat(surplus); // Convert surplus to a number
      const durationValue =
        duration === 'custom'
          ? parseFloat(customDuration)
          : parseFloat(duration);

      let bmr = 0;

      if (genderValue === 'male') {
        bmr = 10 * weightValue + 6.25 * heightValue - 5 * ageValue + 5;
      } else if (genderValue === 'female') {
        bmr = 10 * weightValue + 6.25 * heightValue - 5 * ageValue - 161;
      }

      let tdee;
      if (activityValue === 'sedentary') tdee = bmr * 1.2;
      else if (activityValue === 'lightlyActive') tdee = bmr * 1.375;
      else if (activityValue === 'moderatelyActive') tdee = bmr * 1.55;
      else if (activityValue === 'veryActive') tdee = bmr * 1.725;
      else {
        console.log('Invalid activity level');
        return; // or throw an error, depending on your use case
      }

      let weightChangeRate = 0; // Define your weight change rate here (in kg per week)

      if (goalsValue === 'loseWeight') {
        tdee -= (surplusValue * 7700) / (durationValue * 30); // Assuming 1 kg of weight loss is approximately 7700 calories
        weightChangeRate = -1; // Weight loss
      } else if (goalsValue === 'gainMuscle') {
        tdee += (surplusValue * 7700) / (durationValue * 30); // Assuming 1 kg of weight gain is approximately 7700 calories
        weightChangeRate = 1; // Weight gain
      }

      const timeToAchieveGoal = weightChangeRate !== 0 ? durationValue : 0;
      console.log(timeToAchieveGoal)
      return tdee.toFixed(2);
    },
    [duration, customDuration,]
  );

  const handleActivityChange = (event) => {
    setActivityValue(event.target.value);
  };

  useEffect(() => {
    calculateBMI();
  }, [
    weight,
    weightUnit,
    heightFeet,
    heightUnit,
    heightInches,
    age,
    activityValue,
    genderValue,
    goalsValue,
    height,
    surplus,
    calculateBMI,
    calculateTDEE,
  ]);
  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  // Calculate Body Type
  const calculateBodyType = () => {
    setLoadingBodyType(true);
    const bust = parseFloat(bustSize);
    const waist = parseFloat(waistSize);
    const highHip = parseFloat(highHipSize);
    const hip = parseFloat(hipSize);

    const bustHipsDiff = bust - hip;
    const hipsBustDiff = hip - bust;
    const bustWaistDiff = bust - waist;
    const hipsWaistDiff = hip - waist;
    const highHipWaistRatio = highHip / waist;
    const whr = (waist / hip).toFixed(2);
    if (
      (bustHipsDiff <= 1 && hipsBustDiff < 3.6 && bustWaistDiff >= 9) ||
      hipsWaistDiff >= 10
    ) {
      // Hourglass
      setWHR(`Waist-hip ratio (WHR): ${whr}`);
      setBodyShape('Body shape: Hourglass');
    } else if (
      hipsBustDiff >= 3.6 &&
      hipsBustDiff < 10 &&
      hipsWaistDiff >= 9 &&
      highHipWaistRatio < 1.19
    ) {
      // Bottom Hourglass
      setWHR(`Waist-hip ratio (WHR): ${whr}`);
      setBodyShape('Body shape: Bottom Hourglass');
    } else if (bustHipsDiff > 1 && bustHipsDiff < 10 && bustWaistDiff >= 9) {
      // Top Hourglass
      setWHR(`Waist-hip ratio (WHR): ${whr}`);
      setBodyShape('Body shape: Top Hourglass');
    } else if (
      hipsBustDiff > 2 &&
      hipsWaistDiff >= 7 &&
      highHipWaistRatio >= 1.193
    ) {
      // Spoon
      setWHR(`Waist-hip ratio (WHR): ${whr}`);
      setBodyShape('Body shape: Spoon');
    } else if (hipsBustDiff >= 3.6 && hipsWaistDiff < 9) {
      // Triangle
      setWHR(`Waist-hip ratio (WHR): ${whr}`);
      setBodyShape('Body shape: Triangle');
    } else if (bustHipsDiff >= 3.6 && bustWaistDiff < 9) {
      // Inverted Triangle
      setWHR(`Waist-hip ratio (WHR): ${whr}`);
      setBodyShape('Body shape: Inverted Triangle');
    } else if (
      hipsBustDiff < 3.6 &&
      bustHipsDiff < 3.6 &&
      bustWaistDiff < 9 &&
      hipsWaistDiff < 10
    ) {
      // Rectangle
      setWHR(`Waist-hip ratio (WHR): ${whr}`);
      setBodyShape('Body shape: Rectangle');
    } else {
      setWHR('');
      setBodyShape('Cannot determine body shape with given measurements.');
    }
    setLoadingBodyType(false);
  };


  const calculateKetoProfile = () => {
    try {
      const numericWeight =
        weightUnit === 'kg'
          ? parseFloat(weight)
          : parseFloat(weight) * 0.453592;
      // calculateTDEE()
      let numericHeight;

      if (heightUnit === 'cm') {
        numericHeight = parseFloat(height);
      } else {
        numericHeight = convertFeetInchesToCm(heightFeet, heightInches);
        
      }
      const tdee = calculateTDEE(
        numericWeight,
        numericHeight,
        age,
        surplus,
        genderValue,
        goalsValue,
        activityValue
      );
     
  
      // Update state or display the results as needed
      setResult({
        calories: tdee,
      });
    } catch (error) {
      console.error('Error calculating keto profile:', error.message);
    }
  };
  // Handle Change functionality
  const handleWeightUnitChange = (e) => {
    setWeightUnit(e.target.value);
  };

  const handleHeightFeetChange = (e) => {
    setHeightFeet(e.target.value);
  };

  const handleHeightInchesChange = (e) => {
    setHeightInches(e.target.value);
  };

  const handleHeightUnitChange = (e) => {
    setHeightUnit(e.target.value);
  };
  const handleGenderChange = (event) => {
    setGenderValue(event.target.value);
  };

  const handleGoalsChange = (event) => {
    setGoalsValue(event.target.value);
  };
  const handleDurationChange = (event) => {
    const value = event.target.value;

    if (value === 'custom') {
      setDuration(value); // Set duration to 'custom'
    } else {
      setDuration(value); // Set duration to the selected value
      setCustomDuration(''); // Reset custom duration when selecting other options
    }
  };

  const handleCustomDurationChange = (event) => {
    setCustomDuration(event.target.value);
  };
  //   Login Data
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setOpen(false);
    setIsProcessing(false);
  };
 
  // Scroll Functionality
  const scrollToGenderDetail = () => {
    const detailGenderSection = document.getElementById('detailGender');
    if (detailGenderSection) {
      detailGenderSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrollToWeightDetail = () => {
    const detailWeightSection = document.getElementById('detailWeight');
    if (detailWeightSection) {
      detailWeightSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToActivityDetail = () => {
    const detailActivitySection = document.getElementById('detailActivity');
    if (detailActivitySection) {
      detailActivitySection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrollToGoalsDetail = () => {
    const detailGoalsSection = document.getElementById('detailGoals');
    if (detailGoalsSection) {
      detailGoalsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrollToSurplusDetail = () => {
    const detailSurplusSection = document.getElementById('detailSurplus');
    if (detailSurplusSection) {
      detailSurplusSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrollToBodyTypeDetail = () => {
    const detailBodyTypeSection = document.getElementById('detailBodyType');
    if (detailBodyTypeSection) {
      detailBodyTypeSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  //   Handle Content Show
  const handleButtonClick = () => {
    setShowContent(!showContent); // Toggle the state
  };
  return (
    <>
      <div>
        <Container className="text-center ketoCalculatorFirstDiv">
          <h5>
            Starting on a ketogenic diet? Let’s calculate how much you should
            eat.
          </h5>
          <p className="mb-4">
            We use the information you put in to create an accurate keto
            nutrition profile for you.
          </p>
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
              <Link style={{ color: '#5A5A5A' }} onClick={scrollToGenderDetail}>
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
                    onChange={handleGenderChange}
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      sx={{
                        '& .MuiSvgIcon-root': {
                          fontSize: 24,
                        },
                      }}
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
                      sx={{
                        '& .MuiSvgIcon-root': {
                          fontSize: 24,
                        },
                      }}
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
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </Grid>
              </Grid>
            </div>
          </div>
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
              <InputLabel className="d-inline-block fs-4 mb-4" htmlFor="weight">
                Your Weight & height
              </InputLabel>
              {'  '}
              <Link style={{ color: '#5A5A5A' }} onClick={scrollToWeightDetail}>
                {'   '}
                <InfoIcon
                  className="d-inline-block fs-3"
                  style={{ marginBottom: '10px' }}
                />{' '}
              </Link>
            </div>
            <div className="mb-4">
              <Grid container spacing={2} direction="row">
                <Grid item xs={12} sm={heightUnit === 'cm' ? 6 : 4}>
                  <TextField
                    className="mb-4"
                    id="weight"
                    label="Weight"
                    type="number"
                    color="warning"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={handleWeightChange}
                  />

                  <RadioGroup
                    row
                    aria-label="weightUnit"
                    name="row-radio-buttons-group"
                    value={weightUnit}
                    onChange={handleWeightUnitChange}
                  >
                    <FormControlLabel
                      value="kg"
                      control={<Radio />}
                      label="kg"
                    />
                    <FormControlLabel
                      value="lbs"
                      control={<Radio />}
                      label="lbs"
                    />
                  </RadioGroup>
                </Grid>
                <Grid item xs={12} sm={heightUnit === 'cm' ? 6 : 8}>
                  {heightUnit === 'cm' ? (
                    <TextField
                      className="mb-4"
                      id="height"
                      label="Height (cm)"
                      type="number"
                      color="error"
                      InputLabelProps={{
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
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={handleHeightFeetChange}
                      />
                      <TextField
                        className="mb-4"
                        id="heightInches"
                        label="Inches"
                        type="number"
                        color="error"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={handleHeightInchesChange}
                      />
                    </div>
                  )}

                  <RadioGroup
                    row
                    aria-label="heightUnit"
                    name="row-radio-buttons-group"
                    value={heightUnit}
                    onChange={handleHeightUnitChange}
                  >
                    <FormControlLabel
                      value="cm"
                      control={<Radio />}
                      label="cm"
                    />
                    <FormControlLabel
                      value="feet"
                      control={<Radio />}
                      label="feet"
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
            </div>
          </div>
          <div style={{ height: '100px' }}>
            <div
              className="text-center"
              style={{
                backgroundColor: bmi.color,
                color: bmi.txtColor,
                margin: 0,
              }}
            >
              {bmi && (
                <>
                  <hr style={{ margin: 0 }} />
                  <div>
                    <div>
                      <p>BMI: {bmi.value}</p>
                      <p>Category: {bmi.category}</p>
                    </div>
                  </div>
                  <hr />
                </>
              )}
            </div>
          </div>
          <Button variant="contained" onClick={handleButtonClick}>
            Click Button If you Lose our weight
          </Button>
          {showContent && (
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
                  <InputLabel
                    className="d-inline-block fs-4 mb-4"
                    htmlFor="bodyType"
                  >
                    Check 
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
                        InputLabelProps={{
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
                        InputLabelProps={{
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
                        InputLabelProps={{
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
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => setHipSize(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </div>
              </div>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={calculateBodyType}
                  disabled={loadingBodyType} // Disable the button when loading is true
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
                </div>
              </div>
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
                <div>
                  <span className="d-inline-block fs-4 mb-4">
                    Your Activity Level{' '}
                  </span>{' '}
                  <Link
                    style={{ color: '	#5A5A5A' }}
                    onClick={scrollToActivityDetail}
                  >
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
                  <Link
                    style={{ color: '	#5A5A5A' }}
                    onClick={scrollToGoalsDetail}
                  >
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
                  <InputLabel
                    className="d-inline-block fs-4 mb-4"
                    htmlFor="surplur"
                  >
                    How much surplur do you want?
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">g</InputAdornment>
                    ),
                  }}
                  onChange={(e) => setSurplus(e.target.value)}
                />
              </div>
              <hr />
              <InputLabel id="demo-simple-select-label">Duration</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
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
                  onChange={handleCustomDurationChange}
                />
              )}
              <hr />
              <Button
                variant="contained"
                onClick={calculateKetoProfile}
                className="mb-3"
              >
                Calculate Keto Profile
              </Button>
              <br />
              <Button variant="contained" onClick={handleOpen}>
                Modal Open
              </Button>
            </>
          )}
          {result && (
            <>
              <p style={{ marginTop: '20px' }}>
                <strong>Based on your inputs, we suggest you eat:</strong>{' '}
                {result.calories ? result.calories + ' calories' : 'N/A'}.
              </p>
            </>
          )}
          <hr />
        </Container>

        <Container>
          <div>
            <div
              style={{
                marginTop: '40px',
              }}
              id="detailGender"
            >
              <h3 className="mb-3">
                How do I use your calculator to get my macros?
              </h3>
              <Container
                className="mb-4 p-3"
                style={{ backgroundColor: '#d6d5c9', borderRadius: '10px' }}
              >
                <p>
                  While inputting your information, you may find that some of
                  the sections and terms are confusing. If this is the case for
                  you, simply click the lower case “i” logo located near the
                  title of each section of our keto calculator. After you click
                  the lower case “i” logo, you will be directed to a brief
                  explanation that should answer your questions.
                </p>
                <p>
                  If you are still unsure of how to use the keto calculator or
                  if you think you aren’t getting the right keto macro numbers,
                  read through the other Q&As and comments below, you will
                  probably find the answer there.
                </p>
                <p>
                  If you still don’t find the answer, please submit a comment
                  with the question and we will address it as soon as possible.
                </p>
              </Container>
            </div>
            <hr />
          </div>

          <div
            style={{
              marginTop: '40px',
            }}
            id="detailWeight"
          >
            <h3 className="mb-3">
              Why do you need my gender/age/height/weight?
            </h3>
            <Container
              className="mb-4 p-3"
              style={{ backgroundColor: '#d6d5c9', borderRadius: '10px' }}
            >
              <p>
                Most people aim for a specific goal on a ketogenic diet. We aim
                to make sure the results of the calculator are accurate and can
                be used by anyone.
              </p>
              <p>
                Our keto calculator uses the Mifflin-St.Jeor Formula which was
                the most accurate (versus the Katch-McCardle Formula or the
                Harris-Benedict Formula) in a few studies. In this formula, the
                gender, height, weight, and age are needed to calculate the
                number of calories to consume.
              </p>
            </Container>
          </div>
          <hr />

          <div
            style={{
              marginTop: '40px',
            }}
            id="detailFat"
          >
            <h3 className="mb-3">Why do you need my body fat percentage?</h3>
            <Container
              className="mb-4 p-3"
              style={{ backgroundColor: '#d6d5c9', borderRadius: '10px' }}
            >
              <p>
                Our keto calculator uses body fat percentage to calculate your
                lean body mass. Using this number, we’re able to calculate how
                much protein you need to sufficiently lose weight without losing
                excess muscle. Eating too little or too much protein on a
                ketogenic diet (or any diet) can lead to dangerous or unwanted
                results.
              </p>
              <p>
                DEXA scans are proven to be the most accurate measurement of
                body fat. They’re commonly available at gyms and some doctor
                offices when requested. If you don’t have access to this, you
                can always go the old-fashioned route and use a good quality
                caliper. The last resort is using a guide to visually estimate –
                this can sometimes be a little bit inaccurate, so try to over
                estimate your body fat percentage.
              </p>
            </Container>
          </div>
          <hr />

          <div
            style={{
              marginTop: '40px',
            }}
            id="detailActivity"
          >
            <h3 className="mb-3">Why do you need to know my activity level?</h3>
            <Container
              className="mb-4 p-3"
              style={{ backgroundColor: '#d6d5c9', borderRadius: '10px' }}
            >
              <p>
                This will give us an idea of how much the minimum amount of
                calories your body will burn in a day. Our keto calculator uses
                this to calculate your Basal Metabolic Rate (BMR). We use this
                number, along with your body fat percentage, to estimate how
                many calories you’ll need for your goals.
              </p>
              <p>
                The BMR is simply a number of calories we burn while our bodies
                are at rest and from eating and digesting food. Together they
                form what’s known as TDEE, or total daily energy expenditure.
                This is the keto calculator’s estimate for your total calories
                burned per day. If you use a heart rate monitor or third party
                software to monitor your calories, you can use the custom input
                in the activity level section for an even more accurate macro
                profile.
              </p>
            </Container>
          </div>
          <hr />
          <div
            style={{
              marginTop: '40px',
            }}
            id="detailBodyType"
          >
            <h3 className="mb-3">Why do you need to know my activity level?</h3>
            <Container
              className="mb-4 p-3"
              style={{ backgroundColor: '#d6d5c9', borderRadius: '10px' }}
            >
              <p>
                This will give us an idea of how much the minimum amount of
                calories your body will burn in a day. Our keto calculator uses
                this to calculate your Basal Metabolic Rate (BMR). We use this
                number, along with your body fat percentage, to estimate how
                many calories you’ll need for your goals.
              </p>
              <p>
                The BMR is simply a number of calories we burn while our bodies
                are at rest and from eating and digesting food. Together they
                form what’s known as TDEE, or total daily energy expenditure.
                This is the keto calculator’s estimate for your total calories
                burned per day. If you use a heart rate monitor or third party
                software to monitor your calories, you can use the custom input
                in the activity level section for an even more accurate macro
                profile.
              </p>
            </Container>
          </div>
          <hr />
          <div
            style={{
              marginTop: '40px',
            }}
            id="detailSurplus"
          >
            <h3 className="mb-3">What is a deficit/surplus?</h3>
            <Container
              className="mb-4 p-3"
              style={{ backgroundColor: '#d6d5c9', borderRadius: '10px' }}
            >
              <p>
                A deficit or surplus just relates to the number of calories you
                want to intake. A surplus means you are eating more than your
                body needs. A deficit means you are eating less than your body
                needs.
              </p>
              <p>
                Typically if you are losing weight, you want to have a deficit
                in calories. 10-20% is standard for people. 20-30% ranges are
                considered high deficits and are typically difficult to do (you
                will be fighting hunger). You can go up to a 30% deficit, but
                going past that can lead to metabolic damage in the long run
                (study).
              </p>
              <p>
                Typically if you want to gain muscle, you want to have a surplus
                in calories. You need extra calories if you want to put on lean
                mass. Typically, 5-10% is suggested, but going over 10% can lead
                to excess weight gain.
              </p>
            </Container>
          </div>
          <hr />
          <div
            style={{
              marginTop: '40px',
            }}
            id="detail"
          >
            <h3 className="mb-3">
              I’m not sure about my macros, are they right?
            </h3>
            <Container
              className="mb-4 p-3"
              style={{ backgroundColor: '#d6d5c9', borderRadius: '10px' }}
            >
              <p>
                Generally speaking, many people are concerned that the keto
                calculator results in too many calories to eat. It’s very common
                for the average person to lose weight on a 1600 calorie a day
                keto diet. If you’re not 100% sure or confused about anything,
                you can also read more about macronutrients on a keto diet
              </p>
              <p>
                You should try to eat according to the macros given and try to
                spread your meals out during the day. Don’t worry about getting
                exact numbers to the tee. You can afford a small fluctuation in
                your macros, but as long as you are close to your ranges, it
                will balance itself out.
              </p>
              <p>
                If you’re just getting started and still want to learn more
                about keto, consider reading our extensive guide to keto
              </p>
            </Container>
          </div>
          <hr />

          <div
            style={{
              marginTop: '40px',
            }}
            id="detail"
          >
            <h3 className="mb-3">
              Why do calories matter? Isn’t a keto macronutrient calculator
              useless if I am already limiting carbs?
            </h3>
            <Container
              className="mb-4 p-3"
              style={{ backgroundColor: '#d6d5c9', borderRadius: '10px' }}
            >
              <p>
                After hearing about the keto diet and how it helps you burn fat,
                you may be wondering why we even have a keto calculator.
                According to many low carb diet proponents, all that really
                matters when it comes to losing fat is cutting the carbs — Isn’t
                this true?
              </p>
              <p>
                High-quality research studies have been published on this
                specific topic, and the data clearly shows that – regardless if
                you are on a high carb or low carb diet — you will lose weight
                if you are in a calorie deficit and gain weight if you are in a
                calorie surplus. For a closer look at the research and why
                calories matter, check out this article.
              </p>
              <p>
                Due to the irrefutable importance of calorie consumption for
                weight loss and weight gain, a keto macro calculator is one of
                the most valuable tools that you can use to increase your
                chances of diet success.
              </p>
            </Container>
          </div>
          <hr />
          <div
            style={{
              marginTop: '40px',
            }}
            id="detail"
          >
            <h3 className="mb-3">Do You Have to Count Keto Diet Macros?</h3>
            <Container
              className="mb-4 p-3"
              style={{ backgroundColor: '#d6d5c9', borderRadius: '10px' }}
            >
              <p>
                Macro counting can be beneficial if you aim for nutritional
                ketosis, whether for weight loss or other health goals. Because
                everyone’s macronutrient breakdown looks different, tracking
                helps to ensure that you’re following a keto meal plan that
                works to your advantage.
              </p>
              <p>
                You should try to eat according to the macros given and try to
                spread your meals out during the day. Don’t worry about getting
                exact numbers to the tee. You can afford a small fluctuation in
                your macros, but as long as you are close to your ranges, it
                will balance itself out.
              </p>
              <p>
                If you’re just getting started and still want to learn more
                about keto, consider reading our extensive guide to keto
              </p>
            </Container>
          </div>
        </Container>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="border-0"
      >
        <Box sx={style}>
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="card p-3 p-md-4">
                  <Typography variant="h3" className="m-0 text-center">
                    Login
                  </Typography>

                  <Divider />

                  <FormControl
                    component="form"
                    onSubmit={handleLogin}
                    fullWidth
                    className="mt-3"
                  >
                    <>
                      <TextField
                        label="Email"
                        id="email"
                        type="email"
                        placeholder="Input your email"
                        name="email"
                        required
                      />
                      <hr />
                      <TextField
                        label="Password"
                        id="password"
                        type="password"
                        placeholder="Input your password"
                        name="password"
                        required
                      />

                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="mt-3"
                        fullWidth
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Logging in...' : 'Login'}
                      </Button>
                    </>
                  </FormControl>
                  <Button onClick={handleOpenCreate} className="d-block mt-3">
                    Create an account
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      {/* Create Account Modal */}
      <Modal
        open={openCreate}
        onClose={handleCloseCreate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="border-0"
      >
        <Box sx={style}>
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="card p-3 p-md-4">
                  <Typography variant="h3" className="m-0 text-center">
                    Register
                  </Typography>

                  <Divider />

                  <FormControl
                    component="form"
                    onSubmit={handleLogin}
                    fullWidth
                    className="mt-3"
                  >
                    <>
                      <TextField
                        label="Name"
                        id="name"
                        placeholder="Input your Name"
                        name="name"
                        required
                      />
                      <hr />
                      <TextField
                        label="Email"
                        id="email"
                        type="email"
                        placeholder="Input your email"
                        name="email"
                        required
                      />
                      <hr />
                      <TextField
                        label="Password"
                        id="password"
                        type="password"
                        placeholder="Input your password"
                        name="password"
                        required
                      />

                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="mt-3"
                        fullWidth
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Logging in...' : 'Login'}
                      </Button>
                    </>
                  </FormControl>
                  <Button onClick={handleOpen} className="d-block mt-3">
                    Already have a account
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
