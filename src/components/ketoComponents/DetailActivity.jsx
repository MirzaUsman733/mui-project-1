import { Container } from '@mui/material'
import React from 'react'

export default function DetailActivity() {
  return (
    <>
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
            <hr /> 
    </>
  )
}
