import Mldata from '@/components/Mldata'
import WeeklyDemandPrediction from '@/components/WeekData'
import React from 'react'

function page() {
  return (
    <div>
        <Mldata/>
        <WeeklyDemandPrediction/>
    </div>
  )
}

export default page