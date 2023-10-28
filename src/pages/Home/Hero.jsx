import React from 'react'
import KetoHomeHeader from '../../components/KetoHomeHeader'
// import KetoCalculator from '../../components/KetoCalculator'
// import KetoCalculator from '../../components/KetoCalculatorCopy'
// import CalculatedBodyType from '../../components/CalculatedBodyType'
import KetoCalculatorComponents from '../../components/KetoCalculatorComponents'

export default function Hero() {
  return (
    <div className=''>
     <KetoHomeHeader/>
     {/* <KetoCalculator/> */}
     {/* <KetoCalculator/>
     <CalculatedBodyType/> */}
     <KetoCalculatorComponents/>
    </div>
  )
}
