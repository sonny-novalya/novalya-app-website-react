import React from 'react'
import FBimg from "../../../assets/img/logos_facebook.svg"
import IGimg from "../../../assets/img/logos_instagram.svg"
import useMessageSteps from '../../../store/messageTemp/MessageTemp'

const MessagePlatformSelector = () => {
  const {setStep,setSelectedPlatform} = useMessageSteps()

  const  handleSelection = (platform) => {
    if(platform === "fb"){
      setSelectedPlatform(0)
    }else{
      setSelectedPlatform(1)
    }
    setStep(3)
  }
  return (
<div className="fixed inset-0 flex items-center justify-center bg-black/30 h-screen">
      <div className="bg-white px-6 py-9 rounded-[10px] max-w-[800px] mx-auto w-full relative max-h-[90vh] overflow-auto">
        <div className="flex items-center gap-[10px]">
          Select feature
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.0026 13.1668C10.4084 13.1668 13.1693 10.4059 13.1693 7.00016C13.1693 3.59441 10.4084 0.833496 7.0026 0.833496C3.59685 0.833496 0.835938 3.59441 0.835938 7.00016C0.835938 10.4059 3.59685 13.1668 7.0026 13.1668Z" stroke="black" strokeOpacity="0.75" strokeWidth="0.9"/>
            <path d="M7 6.87549V10.2088" stroke="black" strokeOpacity="0.75" strokeLinecap="round"/>
            <path d="M7.00521 5.45866C7.46545 5.45866 7.83854 5.08556 7.83854 4.62533C7.83854 4.16509 7.46545 3.79199 7.00521 3.79199C6.54497 3.79199 6.17188 4.16509 6.17188 4.62533C6.17188 5.08556 6.54497 5.45866 7.00521 5.45866Z" fill="black" fillOpacity="0.75"/>
          </svg>
        </div>
        <div>
          <button className='flex items-center gap-5 w-full p-5 mt-3 border border-[#0087FF] rounded-[10px] font-medium text-[24px] leading-[36px] text-[#0087FF]' onClick={()=>handleSelection("fb")}>
            <img src={FBimg} alt='Facebook'/> Facebook
          </button>
          <button className='flex items-center gap-5 w-full p-5 mt-3 border border-[#ED4B62] rounded-[10px] font-medium text-[24px] leading-[36px] text-[#F24D59]' onClick={()=>handleSelection("ig")} >
            <img src={IGimg} alt='Instagram'/> Instagram
          </button>
        </div>
      </div>
    </div>

  )
}

export default MessagePlatformSelector