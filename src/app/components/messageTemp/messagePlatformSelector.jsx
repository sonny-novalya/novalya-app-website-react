import React from 'react'
import FBimg from "../../../assets/img/logos_facebook.svg"
import IGimg from "../../../assets/img/logos_instagram.svg"
import useMessageSteps from '../../../store/messageTemp/MessageTemp'
import { PreviewMessageIcon } from '../../pages/common/icons/messageIcons/MessageIcons'
import { useTranslation } from 'react-i18next'

const MessagePlatformSelector = ({containerRef}) => {
  const {setStep,setSelectedPlatform} = useMessageSteps()
  const {t} = useTranslation()

  const  handleSelection = (platform) => {
    if(platform === "fb"){
      setSelectedPlatform(0)
    }else{
      setSelectedPlatform(1)
    }
    setStep(3)
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center flex-col bg-black/30 h-screen">
        <div className='flex justify-end max-w-[800px] mx-auto w-full'>
          <button>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.6875 8.3125L8.3125 19.6875M8.3125 8.3125L19.6875 19.6875" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div ref={containerRef} className="bg-white px-6 py-6 rounded-[10px] max-w-[800px] mx-auto w-full relative max-h-[90vh] overflow-auto">
            <button className='bg-[#f6f6f6] px-5 py-[2px] rounded-[24px] mb-4 border border-[#d2d2d2] cursor-pointer'>Back</button>
            <div className="flex items-center gap-[10px]">
            {t("message.Select feature")}
            
              <PreviewMessageIcon index={0}/>
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