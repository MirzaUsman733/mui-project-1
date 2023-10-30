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
  const [bodyTypeContent, setBodyTypeContent] = useState(false);
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
  const [bodyImage,setBodyImage] = useState('');
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
  const handleClose = () => {
    setOpenCreate(false)
    setOpen(false)};
  
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
      (hipsWaistDiff >= 10) || (genderValue === 'women')
    ) {
      // Hourglass
      setWHR(`Waist-hip ratio (WHR): ${whr}`);
      setBodyShape('Body shape: Hourglass');
      setBodyImage("data:image/png;base64,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")
    }else if (
      (bustHipsDiff <= 1 && hipsBustDiff < 3.6 && bustWaistDiff >= 9) ||
      (hipsWaistDiff >= 10) || (genderValue === 'men')
    ) {
      // Hourglass
      setWHR(`Waist-hip ratio (WHR): ${whr}`);
      setBodyShape('Body shape: Hourglass');
      setBodyImage("data:image/jpeg;base64,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")
    }
     else if (
      hipsBustDiff >= 3.6 &&
      hipsBustDiff < 10 &&
      hipsWaistDiff >= 9 &&
      highHipWaistRatio < 1.19 &&
      genderValue === 'women'
    ) {
      // Bottom Hourglass
      setWHR(`Waist-hip ratio (WHR): ${whr}`);
      setBodyShape('Body shape: Bottom Hourglass');
    } else if (bustHipsDiff > 1 && bustHipsDiff < 10 && bustWaistDiff >= 9) {
      // Top Hourglass
      setWHR(`Waist-hip ratio (WHR): ${whr}`);
      setBodyShape('Body shape: Top Hourglass');
      setBodyImage("data:image/jpeg;base64,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")

    } else if (
      hipsBustDiff > 2 &&
      hipsWaistDiff >= 7 &&
      highHipWaistRatio >= 1.193
    ) {
      // Spoon
      setWHR(`Waist-hip ratio (WHR): ${whr}`);
      setBodyShape('Body shape: Spoon');
      setBodyImage("data:image/jpeg;base64,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")

    } else if (hipsBustDiff >= 3.6 && hipsWaistDiff < 9) {
      // Triangle
      setWHR(`Waist-hip ratio (WHR): ${whr}`);
      setBodyShape('Body shape: Triangle');
      setBodyImage("data:image/png;base64,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")

    } else if (bustHipsDiff >= 3.6 && bustWaistDiff < 9) {
      // Inverted Triangle
      setWHR(`Waist-hip ratio (WHR): ${whr}`);
      setBodyShape('Body shape: Inverted Triangle');
      setBodyImage("data:image/png;base64,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")

    } else if (
      hipsBustDiff < 3.6 &&
      bustHipsDiff < 3.6 &&
      bustWaistDiff < 9 &&
      hipsWaistDiff < 10
    ) {
      // Rectangle
      setWHR(`Waist-hip ratio (WHR): ${whr}`);
      setBodyShape('Body shape: Rectangle');
      setBodyImage("data:image/png;base64,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")

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
  const handleBodyShapeClick = () => {
    setBodyTypeContent(!bodyTypeContent); // Toggle the state
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
        <br />
        <br />
        {showContent && (
          <>
           <Button variant="contained" onClick={handleBodyShapeClick}>
          Click Button for Check Body Shape 
        </Button>
          {bodyTypeContent && 
            <BodyTypeComponent
            bodyImage={bodyImage}
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
          }
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
              handleOpenCreate={handleOpenCreate}
            />
            <RegisterComponent
              open={openCreate}
              handleClose={handleCloseCreate}
              handleOpenCreate={handleOpenCreate}
              style={style}
              handleOpen={handleOpen}
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
