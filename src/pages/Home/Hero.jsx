import React from 'react'
import KetoHomeHeader from '../../components/KetoHomeHeader'
import KetoCalculatorComponents from '../../components/KetoCalculatorComponents'
import KetoCalculatorFooter from '../../components/KetoCalculatorFooter'

export default function Hero() {
  return (
    <div className=''>
     <KetoHomeHeader/>
     <KetoCalculatorComponents/>
    <KetoCalculatorFooter/>
    </div>
  )
}
