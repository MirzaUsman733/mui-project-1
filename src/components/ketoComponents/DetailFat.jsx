import { Container } from '@mui/material'
import React from 'react'

export default function DetailFat() {
  return (
    <>
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
            <hr />
    </>
  )
}
