import React from 'react'
import { Button} from "antd";
import { useNavigate } from 'react-router-dom';

const AfiliateTopBar = () => {
   const navigate=  useNavigate()
  return (
    <div className="mb-6">
    <h1 className="text-2xl font-semibold mb-6" >Affiliates</h1>
    <div className="flex justify-between gap-6">
      <Button className="w-full sm:w-1/4 border-gray-300 font-[500] text-[16px] sm:text-[18px] leading-[25.2px] !text-[16px] sm:!text-[18px] !p-3" onClick={()=>navigate('/affiliate')}>Dashboard</Button>
      <Button className="w-full sm:w-1/4 border-gray-300 font-[500] text-[16px] sm:text-[18px] leading-[25.2px] !text-[16px] sm:!text-[18px] !p-3" onClick={()=>navigate('/affiliate/links')}>Affiliate Links</Button>
      <Button className="w-full sm:w-1/4 border-gray-300 font-[500] text-[16px] sm:text-[18px] leading-[25.2px] !text-[16px] sm:!text-[18px] !p-3" onClick={()=>navigate('/affiliate/level-commission')}>Level Commission</Button>
      <Button className="w-full sm:w-1/4 border-gray-300 font-[500] text-[16px] sm:text-[18px] leading-[25.2px] !text-[16px] sm:!text-[18px] !p-3" onClick={()=>navigate('/affiliate/settings')}>Settings</Button>
    </div>
  </div>
  
  )
}

export default AfiliateTopBar