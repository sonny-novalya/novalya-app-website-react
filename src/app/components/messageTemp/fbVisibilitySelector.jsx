import React from 'react'
import pospectIcon from "../../../assets/img/prospection-issue.svg"
import CRMIcon from "../../../assets/img/fb-messenger.svg"
import BdayIcon from "../../../assets/img/proicons_cake.svg"
import RequestIcon from "../../../assets/img/mingcute_user.svg"
import useMessageSteps from '../../../store/messageTemp/MessageTemp'
import { PreviewMessageIcon } from '../../pages/common/icons/messageIcons/MessageIcons'
import { useTranslation } from 'react-i18next'


const FbVisibilitySelector = ({containerRef}) => {
  const {setStep,step,setSelectedVisibilty,setIsMessage} = useMessageSteps()
  const {t}= useTranslation()

  const handleVisibilty = (visibility) => { 
    setSelectedVisibilty(visibility)
    setStep(4) // Go to next step
  }

    
      return (
        <div className="fixed inset-0 flex items-center flex-col justify-center bg-black/30 h-screen z-[9999]">
            
            <div ref={containerRef} className="bg-white p-5 rounded-[10px] max-w-[880px] mx-auto w-full relative max-h-[90vh] overflow-auto">
              
              <button className='absolute right-1 top-1.5 cursor-pointer' onClick={()=>setIsMessage(false)}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.6875 8.3125L8.3125 19.6875M8.3125 8.3125L19.6875 19.6875" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              
              <button onClick={()=>setStep(step-1)} className='bg-[#f6f6f6] w-6.5 h-6.5 flex items-center justify-center rounded-full border border-[#d2d2d2] p-[7px] cursor-pointer'>
                <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.6176 15.6478C9.86245 15.4222 10 15.1163 10 14.7974C10 14.4784 9.86245 14.1725 9.6176 13.947L3.15257 7.99274L9.6176 2.03852C9.85551 1.81166 9.98716 1.50781 9.98418 1.19242C9.9812 0.877029 9.84385 0.575333 9.60169 0.352311C9.35954 0.129289 9.03196 0.00278563 8.68951 4.5003e-05C8.34706 -0.00269563 8.01715 0.118547 7.77082 0.33766L0.382398 7.14231C0.137549 7.36788 -3.63951e-07 7.67378 -3.50009e-07 7.99274C-3.36066e-07 8.3117 0.137549 8.6176 0.382398 8.84317L7.77082 15.6478C8.01575 15.8733 8.34789 16 8.69421 16C9.04053 16 9.37268 15.8733 9.6176 15.6478Z" fill="black"/>
                </svg>
              </button>

                <div className="flex items-center font-[500] gap-[10px] text-[20px] mt-4">
                  {t("message.Select feature")}
                  <PreviewMessageIcon index={0}/>
                </div>
                <div className="grid grid-cols-4 gap-4 border border-[#0087FF33] rounded-[10px] p-3 px-4 mt-6">
                  {features.map((feature, index) => (
                    <div key={index} onClick={()=>handleVisibilty(feature.value)}  className="px-10 py-6 bg-[#E2F1FE4F] border border-[#0087FF3D] rounded-[6px] text-center hover:bg-[#E2F1FE] hover:border-[#0087FF] cursor-pointer">
                      <div className="w-12 h-12 flex items-center justify-center mx-auto">
                        <img src={feature.icon} alt={feature.name} />
                      </div>
                      <span className="block mt-2 font-medium text-[20px] leading-[30px] text-[#0087FF]">
                        {t(`message.${feature.name}`)}
                      </span>
                    </div>
                  ))}
                </div>
                {/* <button 
                  className="font-medium text-[24px] leading-[36px] bg-[#E8E8E8] px-4 py-1.5 w-full max-w-[200px] rounded-md mt-4 ml-auto block"
                  onClick={()=>setStep(step-1)}
                >
                    {t("message.Back")}
                </button> */}
            </div>
        </div>
      )
  
}

const features = [
    { name: "Prospecting", icon: pospectIcon , value:"fb_prospecting"},
    { name: "CRM", icon: CRMIcon ,value:"fb_crm"},
    { name: "Birthday", icon: BdayIcon , value: "birthday" },
    { name: "Request", icon: RequestIcon , value:"request"},
  ]

export default FbVisibilitySelector