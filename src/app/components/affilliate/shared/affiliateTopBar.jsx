import React from 'react'
import { Button} from "antd";
import { useNavigate } from 'react-router-dom';

const AfiliateTopBar = () => {
   const navigate=  useNavigate()
  return (
    <div className="mb-5">
    <h1 className="text-2xl font-semibold mb-6" >Affiliates</h1>
    <div className="flex justify-between gap-6">
      <Button className="affiliate-btn w-full min-h-12 sm:w-1/4 border-gray-300 font-[500] text-[16px] sm:text-[18px] leading-[25.2px] !text-[16px] sm:!text-[18px] !p-3" onClick={()=>navigate('/affiliate')}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 4.1C22 2.6 21.36 2 19.77 2H15.73C14.14 2 13.5 2.6 13.5 4.1V10.9C13.5 12.4 14.14 13 15.73 13H19.77C21.36 13 22 12.4 22 10.9V4.1Z" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M22 18.1C22 16.6 21.36 16 19.77 16H15.73C14.14 16 13.5 16.6 13.5 18.1V19.9C13.5 21.4 14.14 22 15.73 22H19.77C21.36 22 22 21.4 22 19.9V18.1Z" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10.5 19.9C10.5 21.4 9.86 22 8.27 22H4.23C2.64 22 2 21.4 2 19.9V13.1C2 11.6 2.64 11 4.23 11H8.27C9.86 11 10.5 11.6 10.5 13.1V19.9Z" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10.5 5.9C10.5 7.4 9.86 8 8.27 8H4.23C2.64 8 2 7.4 2 5.9V4.1C2 2.6 2.64 2 4.23 2H8.27C9.86 2 10.5 2.6 10.5 4.1V5.9Z" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>  Dashboard
      </Button>
      <Button className="affiliate-btn w-full min-h-12 sm:w-1/4 border-gray-300 font-[500] text-[16px] sm:text-[18px] leading-[25.2px] !text-[16px] sm:!text-[18px] !p-3" onClick={()=>navigate('/affiliate/links')}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.9922 17.5H16.5022C19.5222 17.5 22.0022 15.03 22.0022 12C22.0022 8.98 19.5322 6.5 16.5022 6.5H14.9922" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9 6.5H7.5C4.47 6.5 2 8.97 2 12C2 15.02 4.47 17.5 7.5 17.5H9" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8 12H16" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg> Affiliate Links
      </Button>
      <Button className="affiliate-btn w-full min-h-12 sm:w-1/4 border-gray-300 font-[500] text-[16px] sm:text-[18px] leading-[25.2px] !text-[16px] sm:!text-[18px] !p-3" onClick={()=>navigate('/affiliate/level-commission')}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.5 13.75C9.5 14.72 10.25 15.5 11.17 15.5H13.05C13.85 15.5 14.5 14.82 14.5 13.97C14.5 13.06 14.1 12.73 13.51 12.52L10.5 11.47C9.91 11.26 9.51001 10.94 9.51001 10.02C9.51001 9.17999 10.16 8.48999 10.96 8.48999H12.84C13.76 8.48999 14.51 9.26999 14.51 10.24" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 7.5V16.5" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M17 3V7H21" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M22 2L17 7" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg> Level Commission
      </Button>
      <Button className="affiliate-btn w-full min-h-12 sm:w-1/4 border-gray-300 font-[500] text-[16px] sm:text-[18px] leading-[25.2px] !text-[16px] sm:!text-[18px] !p-3" onClick={()=>navigate('/affiliate/settings')}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15Z" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 11.1199C2 10.0799 2.85 9.21994 3.9 9.21994C5.71 9.21994 6.45 7.93994 5.54 6.36994C5.02 5.46994 5.33 4.29994 6.24 3.77994L7.97 2.78994C8.76 2.31994 9.78 2.59994 10.25 3.38994L10.36 3.57994C11.26 5.14994 12.74 5.14994 13.65 3.57994L13.76 3.38994C14.23 2.59994 15.25 2.31994 16.04 2.78994L17.77 3.77994C18.68 4.29994 18.99 5.46994 18.47 6.36994C17.56 7.93994 18.3 9.21994 20.11 9.21994C21.15 9.21994 22.01 10.0699 22.01 11.1199V12.8799C22.01 13.9199 21.16 14.7799 20.11 14.7799C18.3 14.7799 17.56 16.0599 18.47 17.6299C18.99 18.5399 18.68 19.6999 17.77 20.2199L16.04 21.2099C15.25 21.6799 14.23 21.3999 13.76 20.6099L13.65 20.4199C12.75 18.8499 11.27 18.8499 10.36 20.4199L10.25 20.6099C9.78 21.3999 8.76 21.6799 7.97 21.2099L6.24 20.2199C5.33 19.6999 5.02 18.5299 5.54 17.6299C6.45 16.0599 5.71 14.7799 3.9 14.7799C2.85 14.7799 2 13.9199 2 12.8799V11.1199Z" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg> Settings
      </Button>
    </div>
  </div>
  
  )
}

export default AfiliateTopBar