import React,{ useState, useEffect } from 'react'
import mobileImg from "../../../assets/img/mobile-preview.png"
import messageImg from "../../../assets/img/messenger-icon.svg"
import useMessageSteps from '../../../store/messageTemp/MessageTemp'
import { PreviewMessageIcon } from '../../pages/common/icons/messageIcons/MessageIcons'
import { useTranslation } from 'react-i18next'
import { Spin } from "antd";

const PreviewMessage = () => {
  const {setStep,MessagePreview,backStep,setIsMessage,setSelecetdMessage, getMessageVariants, getTemplateVariants} = useMessageSteps()
  const [variantsLoading, setVariantsLoading] = useState(false);
    const { t } = useTranslation();

    const handleCancel = ()=>{
        
        if (backStep === 0) {
            setIsMessage(false)
        }else{
            setStep(backStep) 
        }
    }

 const handleSelect = ()=>  {
  setSelecetdMessage(MessagePreview)
  setStep(4)
}

useEffect(() => {

  if (!MessagePreview.variants) {
    setVariantsLoading(true);
    // this code is required because we are using same component for predefined templates and messages
    if(MessagePreview.msgType && MessagePreview.msgType === "predefinedTemplate"){
      getTemplateVariants(MessagePreview)
    }else{
      getMessageVariants(MessagePreview)
    }
  } else {
    setVariantsLoading(false);
  }
}, [MessagePreview]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 h-screen previeMessage z-[99999]">
    <div className="bg-white px-5 py-4 rounded-[10px] max-w-[1150px] mx-auto w-full relative max-h-[90vh] overflow-auto">
        <div className="flex items-center gap-[10px] text-[20px] font-[500]"> {t("message.Message name")}
        <PreviewMessageIcon index={0}/>
        </div>
        <div className="flex items-center justify-between gap-4 mt-2">
            <div className="flex justify-between items-center flex-grow border border-[#00040733] 
                rounded px-4 py-0.5 pl-4 pr-[2px]">
                <input className="font-normal text-[16px] leading-[24px] outline-none flex grow" disabled defaultValue={MessagePreview?.title}/>
                <span className="text-white bg-[#0087FF] px-[30px] py-[7px]">{MessagePreview?.title?.length}/50</span>
            </div>
        </div>
        {/* <div className="mt-4 flex justify-center">
            <div className="w-[885px] border rounded border-[#E6E6E6] p-3">
                <div className="flex items-center gap-[10px] text-[20px] mb-4">{t("message.Message preview")}
                <PreviewMessageIcon index={0}/>
                </div>
                <div className="flex items-center gap-6">
                    <button className="border cursor-pointer border-black/25 bg-gray-100 rounded-md w-[30px] h-[30px] flex items-center justify-center mb-7">
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
                    <button className="border cursor-pointer border-black/25 bg-gray-100 rounded-md w-[30px] h-[30px] flex items-center justify-center mb-7">
                      <PreviewMessageIcon index={3}/>
                    </button>
                </div>
            </div>
        </div> */}
        <CarouselComponent MessagePreview={MessagePreview} variantsLoading={variantsLoading} />
        <div className="flex gap-4 justify-end mt-6">
            <button className="font-regular text-[21px] leading-[36px] bg-[#E8E8E8] 
             px-4 py-1.5 w-[200px] rounded-md flex justify-center cursor-pointer" onClick={()=>handleCancel()}>{t("message.Cancel")}</button>
            { backStep === 6 && <button onClick={()=>handleSelect()} className="cursor-pointer flex items-center justify-center gap-2 font-regular text-[21px] text-[white] leading-[36px] bg-[#0087FF] px-4 py-1.5 w-[200px] rounded-md"> {t("message.Select")}</button>}
        </div>
    </div>
</div>
  )
}

const CarouselComponent = ({MessagePreview, variantsLoading}) => {

    if(variantsLoading){
        return (
          <div className="min-h-[400px] w-full flex flex-col items-center pt-[170px]">
            <Spin size="large" /> 
            <span className='mt-[20px]'>Loading Preview...</span>
          </div>
        )
    }

    const variants = MessagePreview.variants || [];

    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleCount = 3;
  
    const nextSlide = () => {
      if (currentIndex < variants.length - visibleCount) {
        setCurrentIndex(currentIndex + 1);
      }
    };
  
    const prevSlide = () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    };
  
    return (
      <div className="w-full flex flex-col items-center mt-6">
        <div className="flex items-center gap-6">
          {/* Prev Button */}
          <button
            onClick={prevSlide}
            className="border cursor-pointer border-black/25 bg-gray-100 rounded-md w-[30px] h-[30px] flex items-center justify-center"
          >
            <svg width="9" height="13" viewBox="0 0 9 13" fill="none">
              <path d="M4.26405 6.49981L8.15324 10.3889L6.20858 12.3335L0.375 6.49981L6.20858 0.666237L8.15324 2.61076L4.26405 6.49981Z" fill="#747474" />
            </svg>
          </button>
  
          {/* Carousel Wrapper */}
          <div className="overflow-hidden w-[900px]">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
            transform: `translateX(-${currentIndex * 305}px)`,
            width: `${variants.length * 305}px`,
          }}
            >
              {variants.map((variant, index) => (
                <div key={index} className="w-[300px] flex-shrink-0 px-2">
                  <div className="relative max-w-[285px] mx-auto">
                    <img src={mobileImg} className="w-full" />
                    <div className="absolute top-[9%] left-[28%] w-[70%]">
                      <div className="text-[12px] font-bold text-black leading-[1.25]">User 1</div>
                      <div className="text-[11px] text-gray-500 font-normal leading-none">Messenger</div>
                    </div>
                    <div className="absolute top-[15%] left-[5%] w-[90%] p-2 h-[74%] grid grid-cols-[12%_85%] items-end gap-[3%]">
                      <img src={messageImg} className="w-full" />
                      <div className="bg-[#E8E8E8] p-2 rounded-[12px] text-[12px] overflow-y-auto leading-[1.3] max-h-[98%]">
                        <p className="my-[10px]">{variant?.name}</p>
                        {MessagePreview?.attachment != null && <img className="my-[10px]" src={MessagePreview?.attachment} style={{ maxWidth: "100%", maxHeight: "150px"}}/>}
                      </div>
                      
                    </div>
                    
                  </div>
                  <button className="varient-btn-hover bg-white border border-[#0087FF42] flex items-center justify-center gap-[10px] w-full max-w-[160px] mt-4 mx-auto px-3 py-2 rounded-md mb-[6px] hover:bg-[#0087FF] hover:text-white">
                    <PreviewMessageIcon index={1} />
                    Variant - {index + 1}
                  </button>
                </div>
              ))}
            </div>
          </div>
  
          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="border cursor-pointer border-black/25 bg-gray-100 rounded-md w-[30px] h-[30px] flex items-center justify-center"
          >
            <PreviewMessageIcon index={3} />
          </button>
        </div>
      </div>
    );
  };

export default PreviewMessage