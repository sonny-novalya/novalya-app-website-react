import React from 'react'
import mobileImg from "../../../assets/img/mobile-preview.png"
import messageImg from "../../../assets/img/messenger-icon.svg"
import useMessageSteps from '../../../store/messageTemp/MessageTemp'
import { PreviewMessageIcon } from '../../pages/common/icons/messageIcons/MessageIcons'
import { useTranslation } from 'react-i18next'

const PreviewMessage = () => {
  const {setStep,MessagePreview,backStep,setIsMessage} = useMessageSteps()
    const { t } = useTranslation();

    const handleCancel = ()=>{
        if (backStep === 0) {
            setIsMessage(false)
        }else{
            setStep(backStep) 
        }
    }


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 h-screen previeMessage">
    <div className="bg-white px-5 py-4 rounded-[10px] max-w-[1150px] mx-auto w-full relative max-h-[90vh] overflow-auto">
        <div className="flex items-center gap-[10px] text-[20px]"> {t("message.Message name")}
        <PreviewMessageIcon index={0}/>
        </div>
        <div className="flex items-center justify-between gap-4 mt-2">
            <div className="flex justify-between items-center flex-grow border border-[#00040733] 
                rounded px-4 py-0.5 pl-4 pr-[2px]">
                <input className="font-normal text-[16px] leading-[24px] outline-none flex grow" value={MessagePreview?.title}/>
                <span className="text-white bg-[#0087FF] px-[30px] py-[7px]">{MessagePreview?.title?.length}/50</span>
            </div>
        </div>
        <div className="flex gap-4 mt-4">
            <div className="w-[200px] bg-[#F5F5F5] rounded p-3">
                <div className="flex items-center gap-[10px] text-[20px]">{t("message.View variants")}
                <PreviewMessageIcon index={0}/>
                </div>
                <div className="mt-4">
                  {
                    MessagePreview?.variants?.map((_,index) =>{
                        return (
                            <button key={index} className="varient-btn-hover bg-white border border-[#0087FF42] flex items-center justify-center gap-[10px] w-full px-3 py-2 rounded-md mb-[6px] hover:bg-[#0087FF] hover:text-white">
                            <PreviewMessageIcon index={1}/>
                        Variant - {index+1}
                    </button>
                        )
                    })
                  }
                </div>
            </div>
            <div className="w-[885px] border rounded border-[#E6E6E6] p-3">
                <div className="flex items-center gap-[10px] text-[20px] mb-4">{t("message.Message preview")}
                <PreviewMessageIcon index={0}/>
                </div>
                <div className="flex items-center gap-6">
                    <button className="border border-black/25 bg-gray-100 rounded-md w-[30px] h-[30px] flex items-center justify-center mb-7">
                        <svg width="9" height="13" viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.26405 6.49981L8.15324 10.3889L6.20858 12.3335L0.375 6.49981L6.20858 0.666237L8.15324 2.61076L4.26405 6.49981Z" fill="#747474"/>
                        </svg>
                    </button>
                    <div className="flex gap-9">

                       {MessagePreview?.variants?.map((variant,index)=>{
                             return (
                                <div key={index}>
                            <div className="relative max-w-[285px]">
                                <img src={mobileImg} className="w-full" />
                                <div className="absolute top-[9%] left-[28%] w-[70%]">
                                    <div className="text-[12px] font-bold text-black leading-[1.25]">User 1</div>
                                    <div className="text-[11px] text-gray-500 font-normal leading-none">Messenger</div>
                                </div>
                                <div className="absolute top-[15%] left-[5%] w-[90%] p-2 h-[74%] grid grid-cols-[12%_85%] items-end gap-[3%]">
                                    <img src={messageImg} className="w-full" />
                                    <div className="bg-[#E8E8E8] p-2 rounded-[12px] text-[12px] overflow-y-auto leading-[1.3] max-h-[98%]">
                                        <p className=" my-[10px]">{variant?.name}</p>
                                        {/* <p className=" my-[10px]">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p> */}
                                    </div>
                                </div>
                            </div>
                            <button className="varient-btn-hover bg-white border border-[#0087FF42] flex items-center justify-center gap-[10px] w-full max-w-[160px] mt-4 mx-auto px-3 py-2 rounded-md mb-[6px] hover:bg-[#0087FF] hover:text-white">
                            <PreviewMessageIcon index={1}/>
                                Variant - {index+1}
                            </button>
                        </div>
                             )
                       }) }
                      
                    </div>
                    <button className="border border-black/25 bg-gray-100 rounded-md w-[30px] h-[30px] flex items-center justify-center mb-7">
                      <PreviewMessageIcon index={3}/>
                    </button>
                </div>
            </div>
        </div>
        <div className="flex gap-4 justify-end mt-6">
            <button className="font-regular text-[21px] leading-[36px] bg-[#E8E8E8] 
             px-4 py-1.5 w-[200px] rounded-md flex justify-center" onClick={()=>handleCancel()}>{t("message.Cancel")}</button>
            { backStep === 6 && <button onClick={()=>setStep(4)} className="flex items-center justify-center gap-2 font-regular text-[21px] text-[white] leading-[36px] bg-[#0087FF] px-4 py-1.5 w-[200px] rounded-md"> {t("message.Select")}</button>}
        </div>
    </div>
</div>
  )
}

export default PreviewMessage