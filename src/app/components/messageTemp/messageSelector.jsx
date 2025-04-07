import React from 'react'
import writingImg from "../../../assets/img/Writing-img.svg"
import tempIconImg from "../../../assets/img/template-icons.svg"
import aiIconImg from "../../../assets/img/Content-Creation-Writing.svg"
import useMessageSteps from '../../../store/messageTemp/MessageTemp'
import { useTranslation } from 'react-i18next'

const MessageSelector = ({containerRef}) => {
  const {setStep} = useMessageSteps()
  const {t} = useTranslation()
 const handleSelector = (index)=>{
  if(index === 0){
    setStep(2)
  }else if (index === 1){
    setStep(6)
  }
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-black/30 h-screen" >
        <div ref={containerRef} className="bg-white px-6 py-9 rounded-[10px] max-w-[1125px] mx-auto w-full relative max-h-[90vh] overflow-auto">
          <div className='grid grid-cols-3 gap-12'>
            {data.map((item, index) => (
              <div key={index} className="border border-[#D2D2D2] rounded-[6px] text-center px-5 py-[10px]" onClick={()=>handleSelector(index)}>
                <img className='mx-auto flex' src={item.img} alt={item.title} />
                <span className={`font-semibold text-[24px] leading-[36px] max-w-[220px] text-center block mx-auto ${item.color}`}>{t(`message.${item.title}`)}</span>
                <button className={`font-medium text-[14px] leading-[20px] px-5 py-[10px] text-white rounded-[24px] w-full max-w-[200px] mt-2 ${item.bgColor}`}>{item.buttonText}</button>
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
      bgColor: "bg-[#0087FF]"
    },
    {
      img: tempIconImg,
      title: "Over 30 Templates ready to use",
      buttonText: "Use Template",
      color: "text-[#3833A1]",
      bgColor: "bg-[#3833A1]"
    },
    {
      img: aiIconImg,
      title: "Use AI to write your Message",
      buttonText: "Ask AI",
      color: "text-[#B136C6]",
      bgColor: "bg-[#B136C6]"
    }
  ];

export default MessageSelector