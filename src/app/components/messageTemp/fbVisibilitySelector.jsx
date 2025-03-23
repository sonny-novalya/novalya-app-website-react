import React from 'react'
import pospectIcon from "../../../assets/img/prospection-issue.svg"
import CRMIcon from "../../../assets/img/fb-messenger.svg"
import BdayIcon from "../../../assets/img/proicons_cake.svg"
import RequestIcon from "../../../assets/img/mingcute_user.svg"
import useMessageSteps from '../../../store/messageTemp/MessageTemp'


const FbVisibilitySelector = () => {
  const {setStep,step,setSelectedVisibilty} = useMessageSteps()

  const handleVisibilty = (visibility) => { 
    setSelectedVisibilty(visibility)
    setStep(4) // Go to next step
  }

    
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 h-screen">
          <div className="bg-white px-6 py-9 rounded-[10px] max-w-[880px] mx-auto w-full relative max-h-[90vh] overflow-auto">
            <div className="flex items-center gap-[10px] text-[20px]">
              Select feature
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.0026 13.1668C10.4084 13.1668 13.1693 10.4059 13.1693 7.00016C13.1693 3.59441 10.4084 0.833496 7.0026 0.833496C3.59685 0.833496 0.835938 3.59441 0.835938 7.00016C0.835938 10.4059 3.59685 13.1668 7.0026 13.1668Z" stroke="black" strokeOpacity="0.75" strokeWidth="0.9" />
                <path d="M7 6.87549V10.2088" stroke="black" strokeOpacity="0.75" strokeLinecap="round" />
                <path d="M7.00521 5.45866C7.46545 5.45866 7.83854 5.08556 7.83854 4.62533C7.83854 4.16509 7.46545 3.79199 7.00521 3.79199C6.54497 3.79199 6.17188 4.16509 6.17188 4.62533C6.17188 5.08556 6.54497 5.45866 7.00521 5.45866Z" fill="black" fillOpacity="0.75" />
              </svg>
            </div>
            <div className="grid grid-cols-4 gap-4 border border-[#0087FF33] rounded-[10px] p-3 px-4 mt-6">
              {features.map((feature, index) => (
                <div key={index} onClick={()=>handleVisibilty(feature.value)}  className="px-10 py-6 bg-[#E2F1FE4F] border border-[#0087FF3D] rounded-[6px] text-center hover:bg-[#E2F1FE] hover:border-[#0087FF] cursor-pointer">
                  <div className="w-12 h-12 flex items-center justify-center mx-auto">
                    <img src={feature.icon} alt={feature.name} />
                  </div>
                  <span className="block mt-2 font-medium text-[20px] leading-[30px] text-[#0087FF]">
                    {feature.name}
                  </span>
                </div>
              ))}
            </div>
            <button 
              className="font-medium text-[24px] leading-[36px] bg-[#E8E8E8] px-4 py-1.5 w-full max-w-[200px] rounded-md mt-4 ml-auto block"
              onClick={()=>setStep(step-1)}
            >
              Back
            </button>
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