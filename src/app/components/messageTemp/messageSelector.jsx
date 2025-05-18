import React from 'react'
import writingImg from "../../../assets/img/Writing-img.svg"
import tempIconImg from "../../../assets/img/template-icons2.svg"
import aiIconImg from "../../../assets/img/Content-Creation-Writing2.svg"
import useMessageSteps from '../../../store/messageTemp/MessageTemp'
import { useTranslation } from 'react-i18next'

const MessageSelector = ({containerRef}) => {
  const {setStep,setIsMessage} = useMessageSteps()
  const {t} = useTranslation()
 const handleSelector = (index)=>{
  if(index === 0){
    setStep(2)
  }else if (index === 1){
    setStep(6)
  }
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center flex-col bg-black/30 h-screen z-[9999]" >
        
        <div ref={containerRef} className="bg-white px-6.5 py-9 rounded-[10px] max-w-[1140px] mx-auto w-full relative max-h-[90vh] overflow-auto">
          {/* <button className='bg-[#f6f6f6] px-5 py-[2px] rounded-[24px] mb-4 border border-[#d2d2d2] cursor-pointer'>Back</button> */}
          
          <button className='absolute right-1 top-1.5 cursor-pointer' onClick={()=>setIsMessage(false)}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.6875 8.3125L8.3125 19.6875M8.3125 8.3125L19.6875 19.6875" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          
          <div className='grid grid-cols-3 gap-12'>
            {data.map((item, index) => (
              <div
                key={index}
                className={`cursor-pointer border rounded-[6px] text-center px-5 py-[16px] ${item.color} ${item.borderColor}`}
                onClick={() => handleSelector(index)}>
                <img className='mx-auto flex my-[44px]' src={item.img} alt={item.title} />
                <span className={`font-semibold text-[24px] leading-[36px] max-w-[220px] text-center block mx-auto ${item.color}`}>{t(`message.${item.title}`)}</span>
                <button className={`cursor-pointer font-medium text-[14px] leading-[20px] px-5 py-[10px] text-white rounded-[10px] w-full max-w-[200px] mt-2 ${item.bgColor}`}>{item.buttonText}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}

const data = [
    {
      img: writingImg,
      title: "Start from a blank page",
      buttonText: "Blank",
      color: "text-[#0087FF]",
      bgColor: "bg-[#0087FF]",
      borderColor:  "border-[#0087ff33]"
    },
    {
      img: tempIconImg,
      title: "Over 30 Templates ready to use",
      buttonText: "Use Template",
      color: "text-[#3833A1]",
      bgColor: "bg-[#3833A1]",
      borderColor:  "border-[#3833a133]"
    },
    {
      img: aiIconImg,
      title: "Use AI to write your Message",
      buttonText: "Ask AI",
      color: "text-[#B136C6]",
      bgColor: "bg-[#B136C6]",
      borderColor:  "border-[#b136c633]"
    }
  ];

export default MessageSelector