import React from 'react'
import propectIcon from "../../../assets/img/ui-porpection-ig.svg"
import CRMIcon from "../../../assets/img/ui_facebook-messenger.svg"
import useMessageSteps from '../../../store/messageTemp/MessageTemp'
import { PreviewMessageIcon } from '../../pages/common/icons/messageIcons/MessageIcons'
import { useTranslation } from 'react-i18next'

const IgVisibilitySelector = () => {
  const {setStep,step,setSelectedVisibilty} = useMessageSteps()
  const {t}= useTranslation()
      const handleVisibilty = (visibility) => { 
        setSelectedVisibilty(visibility)
        setStep(4) // Go to next step
      }
    
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 h-screen">
          <div className="bg-white px-6 py-9 rounded-[10px] max-w-[880px] mx-auto w-full relative max-h-[90vh] overflow-auto">
            <div className="flex items-center gap-[10px] text-[20px]">
            {t("message.Select feature")}
               <PreviewMessageIcon index={0}/>
            </div>
            <div className="grid grid-cols-4 gap-4 border border-[#0087FF33] rounded-[10px] p-3 px-4 mt-6">
              {features.map((feature, index) => (
                <div key={index} onClick={()=>handleVisibilty(feature.value)} className="px-10 py-6 bg-[#E2F1FE4F] border border-[#0087FF3D] rounded-[6px] text-center hover:bg-[#E2F1FE] hover:border-[#0087FF] cursor-pointer">
                  <div className="w-12 h-12 flex items-center justify-center mx-auto">
                    <img src={feature.icon} alt={feature.name} />
                  </div>
                  <span className="block mt-2 font-medium text-[20px] leading-[30px] text-[#0087FF]">
                  {t(`message.${feature.name}`)}
                  </span>
                </div>
              ))}
            </div>
            <button 
              className="font-medium text-[24px] leading-[36px] bg-[#E8E8E8] px-4 py-1.5 w-full max-w-[200px] rounded-md mt-4 ml-auto block"
              onClick={()=>setStep(step-1)}
            >
               {t("message.Back")}
            </button>
          </div>
        </div>
      );
    
}

const features = [
  { name: "Prospecting", icon: propectIcon , value:"ig_prospecting"},
  { name: "CRM", icon: CRMIcon , value:"ig_crm" },
];

export default IgVisibilitySelector