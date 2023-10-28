import React, { useEffect, useState, useCallback } from 'react';
import GenderAgeComponent from './ketoComponents/GenderAgeComponent';
import { Button, Container, InputLabel } from '@mui/material';
import HeightWeightComponent from './ketoComponents/HeightWeightComponent';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';
import BMIComponent from './ketoComponents/BMIComponent';
import ActivityComponent from './ketoComponents/ActivityComponent';
import BodyTypeComponent from './ketoComponents/BodyTypeComponent';
import GoalsComponent from './ketoComponents/GoalsComponent';
import ResultComponent from './ketoComponents/ResultComponent';
import DurationInput from './ketoComponents/DurationInput';
import SurplusInput from './ketoComponents/SurplusInput';
import LoginComponent from './ketoComponents/LoginComponent';
import RegisterComponent from './ketoComponents/RegisterComponent';
import DetailGender from './ketoComponents/DetailGender';
import DetailWeight from './ketoComponents/DetailWeight';
import DetailFat from './ketoComponents/DetailFat';
import DetailActivity from './ketoComponents/DetailActivity';
import DetailBodyType from './ketoComponents/DetailBodyType';

// Style
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

export default function KetoCalculatorComponents() {
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
  // Handle Activity
  const handleActivityChange = (event) => {
    setActivityValue(event.target.value);
  };
  //   Handle Goals
  const handleGoalsChange = (event) => {
    setGoalsValue(event.target.value);
  };
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
        const bmiValue = calculateBMIValue(numericWeight, numericHeight);

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
      console.log(timeToAchieveGoal);
      return tdee.toFixed(2);
    },
    [duration, customDuration]
  );

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
    <div>
      <Container className="text-center ketoCalculatorFirstDiv">
        <h5>
          Starting on a ketogenic diet? Let’s calculate how much you should eat.
        </h5>
        <p className="mb-4">
          We use the information you put in to create an accurate keto nutrition
          profile for you.
        </p>
        <GenderAgeComponent
          genderValue={genderValue}
          setGenderValue={setGenderValue}
          age={age}
          setAge={setAge}
          scrollFunction={scrollToGenderDetail}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '40px',
          }}
        >
          <div className="d-flex ">
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
          <HeightWeightComponent
            weight={weight}
            setWeight={setWeight}
            weightUnit={weightUnit}
            setWeightUnit={setWeightUnit}
            height={height}
            setHeight={setHeight}
            heightFeet={heightFeet}
            setHeightFeet={setHeightFeet}
            heightInches={heightInches}
            setHeightInches={setHeightInches}
            heightUnit={heightUnit}
            setHeightUnit={setHeightUnit}
          />
        </div>
        <BMIComponent bmi={bmi} />
        <Button variant="contained" onClick={handleButtonClick}>
          Click Button If you Lose our weight
        </Button>
        {showContent && (
          <>
            <BodyTypeComponent
              bustSize={bustSize}
              setBustSize={setBustSize}
              waistSize={waistSize}
              setWaistSize={setWaistSize}
              hipSize={hipSize}
              setHipSize={setHipSize}
              highHipSize={highHipSize}
              setHighHipSize={setHighHipSize}
              calculateBodyType={calculateBodyType}
              loadingBodyType={loadingBodyType}
              bodyShape={bodyShape}
              whr={whr}
              scrollToBodyTypeDetail={scrollToBodyTypeDetail}
            />
            <ActivityComponent
              activityValue={activityValue}
              handleActivityChange={handleActivityChange}
              scrollToActivityDetail={scrollToActivityDetail}
            />
            <GoalsComponent
              goalsValue={goalsValue}
              handleGoalsChange={handleGoalsChange}
              scrollToGoalsDetail={scrollToGoalsDetail}
            />
            <SurplusInput
              surplus={surplus}
              setSurplus={setSurplus}
              scrollToSurplusDetail={scrollToSurplusDetail}
            />
            <DurationInput
              duration={duration}
              setDuration={setDuration}
              customDuration={customDuration}
              setCustomDuration={setCustomDuration}
            />
            <Button variant="contained" onClick={calculateKetoProfile}>
              {' '}
              Calculate Keto Profile{' '}
            </Button>
            <ResultComponent result={result} />
            <Button variant="contained" onClick={handleOpen}>
              Modal Open
            </Button>
            <LoginComponent
              open={open}
              handleClose={handleClose}
              handleOpen={handleOpen}
              style={style}
            />
            <RegisterComponent
              open={openCreate}
              handleClose={handleCloseCreate}
              handleOpenCreate={handleOpenCreate}
            />
          </>
        )}
      </Container>
      <Container>
        <div>
            <div
              style={{
                marginTop: '40px',
              }}
              id="detailGender"
            >
                <DetailGender/>
            </div>
            <div
              style={{
                marginTop: '40px',
              }}
              id="detailWeight"
            >
                <DetailWeight/>
            </div>
            <div
              style={{
                marginTop: '40px',
              }}
              id="detailFat"
            >
                <DetailFat/>
            </div>
            <div
              style={{
                marginTop: '40px',
              }}
              id="detailActivity"
            >
                <DetailActivity/>
            </div>
            <div
              style={{
                marginTop: '40px',
              }}
              id="detailBodyType"
            >
                <DetailBodyType/>
            </div>
        </div>
        </Container>
    </div>
  );
}
