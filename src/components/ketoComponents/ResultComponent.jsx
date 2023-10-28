// ResultComponent.js
import React from 'react';

const ResultComponent = ({ result }) => (
  <>
    {result && (
      <>
        <p style={{ marginTop: '20px' }}>
          <strong>Based on your inputs, we suggest you eat:</strong>{' '}
          {result.calories ? result.calories + ' calories' : 'N/A'}.
        </p>
      </>
    )}
  </>
);

export default ResultComponent;
