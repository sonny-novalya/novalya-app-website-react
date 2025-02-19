import React from 'react'
import { Button} from "antd";
import { useNavigate } from 'react-router-dom';

const AfiliateTopBar = () => {
   const navigate=  useNavigate()
  return (
    <div className="mb-6">
    <h1 className="text-2xl font-semibold mb-6" >Affiliates</h1>
    <div className="space-x-2">
    <Button className="border-gray-300" onClick={()=>navigate('/affiliate')}>Dashboard</Button>
      <Button className="border-gray-300" onClick={()=>navigate('/affiliate/links')}>Affiliate Links</Button>
      <Button className="border-gray-300" onClick={()=>navigate('/affiliate/level-commission')}>Level Commission</Button>
      <Button className="border-gray-300" onClick={()=>navigate('/affiliate/settings')}>Settings</Button>
    </div>
  </div>
  
  )
}

export default AfiliateTopBar