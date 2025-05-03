import React from 'react'
import { getSubdomain } from '../../../../helpers/helper'
import PlansReseller from './resellerPlan'
import Plans from './plans'

const PlansIndex = () => {
   const appDomains =["app","dev",null]
   const subdomain =  getSubdomain(window.location.hostname)
   console.log(subdomain,window.location.hostname)
  return (
   <>
   {
    appDomains?.includes(subdomain) ? <Plans/>: <PlansReseller/>
   }
       
   </>
  )
}

export default PlansIndex