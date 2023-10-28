import React from 'react'

export default function DetailSurplus() {
  return (
    <>
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
            <hr /> 
    </>
  )
}
