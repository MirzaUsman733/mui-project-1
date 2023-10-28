// BMIComponent.js
import React from 'react';

const BMIComponent = ({ bmi }) => (
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
);

export default BMIComponent;
