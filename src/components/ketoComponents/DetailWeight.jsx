import { Container } from '@mui/material'
import React from 'react'

export default function DetailWeight() {
  return (
    <>
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
            <hr />
    </>
  )
}
