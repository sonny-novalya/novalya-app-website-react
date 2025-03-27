import React from 'react'
import FBimg from "../../../assets/img/logos_facebook.svg"
import IGimg from "../../../assets/img/logos_instagram.svg"
import useMessageSteps from '../../../store/messageTemp/MessageTemp'
import { PreviewMessageIcon } from '../../pages/common/icons/messageIcons/MessageIcons'
import { useTranslation } from 'react-i18next'

const MessagePlatformSelector = () => {
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
<div className="fixed inset-0 flex items-center justify-center bg-black/30 h-screen">
      <div className="bg-white px-6 py-9 rounded-[10px] max-w-[800px] mx-auto w-full relative max-h-[90vh] overflow-auto">
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