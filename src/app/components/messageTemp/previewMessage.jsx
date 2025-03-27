import React from 'react'
import mobileImg from "../../../assets/img/mobile-preview.png"
import messageImg from "../../../assets/img/messenger-icon.svg"
import useMessageSteps from '../../../store/messageTemp/MessageTemp'
import { t } from 'i18next'

const PreviewMessage = () => {
  const {setStep,MessagePreview} = useMessageSteps()

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 h-screen previeMessage">
    <div className="bg-white px-5 py-4 rounded-[10px] max-w-[1150px] mx-auto w-full relative max-h-[90vh] overflow-auto">
        <div className="flex items-center gap-[10px] text-[20px]">{ t("prospecting.Message")} name
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.0026 13.1668C10.4084 13.1668 13.1693 10.4059 13.1693 7.00016C13.1693 3.59441 10.4084 0.833496 7.0026 0.833496C3.59685 0.833496 0.835938 3.59441 0.835938 7.00016C0.835938 10.4059 3.59685 13.1668 7.0026 13.1668Z" stroke="black" stroke-opacity="0.75" stroke-width="0.9"/>
                <path d="M7 6.87549V10.2088" stroke="black" stroke-opacity="0.75" stroke-linecap="round"/>
                <path d="M7.00521 5.45866C7.46545 5.45866 7.83854 5.08556 7.83854 4.62533C7.83854 4.16509 7.46545 3.79199 7.00521 3.79199C6.54497 3.79199 6.17188 4.16509 6.17188 4.62533C6.17188 5.08556 6.54497 5.45866 7.00521 5.45866Z" fill="black" fill-opacity="0.75"/>
            </svg>
        </div>
        <div className="flex items-center justify-between gap-4 mt-2">
            <div className="flex justify-between items-center flex-grow border border-[#00040733] 
                rounded px-4 py-0.5 pl-4 pr-[2px]">
                <input className="font-normal text-[16px] leading-[24px] outline-none" value={MessagePreview?.name}/>
                <span className="text-white bg-[#0087FF] px-[30px] py-[7px]">{MessagePreview?.name?.length}/50</span>
            </div>
        </div>
        <div className="flex gap-4 mt-4">
            <div className="w-[200px] bg-[#F5F5F5] rounded p-3">
                <div className="flex items-center gap-[10px] text-[20px]">View variants
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.0026 13.1668C10.4084 13.1668 13.1693 10.4059 13.1693 7.00016C13.1693 3.59441 10.4084 0.833496 7.0026 0.833496C3.59685 0.833496 0.835938 3.59441 0.835938 7.00016C0.835938 10.4059 3.59685 13.1668 7.0026 13.1668Z" stroke="black" stroke-opacity="0.75" stroke-width="0.9"></path>
                        <path d="M7 6.87549V10.2088" stroke="black" stroke-opacity="0.75" stroke-linecap="round"></path>
                        <path d="M7.00521 5.45866C7.46545 5.45866 7.83854 5.08556 7.83854 4.62533C7.83854 4.16509 7.46545 3.79199 7.00521 3.79199C6.54497 3.79199 6.17188 4.16509 6.17188 4.62533C6.17188 5.08556 6.54497 5.45866 7.00521 5.45866Z" fill="black" fill-opacity="0.75"></path>
                    </svg>
                </div>
                <div className="mt-4">
                  {
                    MessagePreview?.variants?.map((_,index) =>{
                        return (
                            <button className="varient-btn-hover bg-white border border-[#0087FF42] flex items-center justify-center gap-[10px] w-full px-3 py-2 rounded-md mb-[6px] hover:bg-[#0087FF] hover:text-white">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                            <path opacity="0.3" d="M19 10C19.7956 10 20.5587 10.3161 21.1213 10.8787C21.6839 11.4413 22 12.2044 22 13V16C22 16.7956 21.6839 17.5587 21.1213 18.1213C20.5587 18.6839 19.7956 19 19 19V19.966C19 21.026 17.764 21.605 16.95 20.926L14.638 19H12C11.2044 19 10.4413 18.6839 9.87868 18.1213C9.31607 17.5587 9 16.7956 9 16V13C9 12.2044 9.31607 11.4413 9.87868 10.8787C10.4413 10.3161 11.2044 10 12 10H19Z" fill="#0087FF"/>
                            <path d="M16 4C16.7956 4 17.5587 4.31607 18.1213 4.87868C18.6839 5.44129 19 6.20435 19 7V8H11C9.93913 8 8.92172 8.42143 8.17157 9.17157C7.42143 9.92172 7 10.9391 7 12V16C7 17.044 7.4 17.996 8.056 18.708L7 19.5C6.176 20.118 5 19.53 5 18.5V17C4.20435 17 3.44129 16.6839 2.87868 16.1213C2.31607 15.5587 2 14.7956 2 14V7C2 6.20435 2.31607 5.44129 2.87868 4.87868C3.44129 4.31607 4.20435 4 5 4H16Z" fill="#0087FF"/>
                        </svg>
                        Variant - {index+1}
                    </button>
                        )
                    })
                  }
                </div>
            </div>
            <div className="w-[885px] border rounded border-[#E6E6E6] p-3">
                <div className="flex items-center gap-[10px] text-[20px] mb-4">{ t("prospecting.Message")} preview
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.0026 13.1668C10.4084 13.1668 13.1693 10.4059 13.1693 7.00016C13.1693 3.59441 10.4084 0.833496 7.0026 0.833496C3.59685 0.833496 0.835938 3.59441 0.835938 7.00016C0.835938 10.4059 3.59685 13.1668 7.0026 13.1668Z" stroke="black" stroke-opacity="0.75" stroke-width="0.9"></path>
                        <path d="M7 6.87549V10.2088" stroke="black" stroke-opacity="0.75" stroke-linecap="round"></path>
                        <path d="M7.00521 5.45866C7.46545 5.45866 7.83854 5.08556 7.83854 4.62533C7.83854 4.16509 7.46545 3.79199 7.00521 3.79199C6.54497 3.79199 6.17188 4.16509 6.17188 4.62533C6.17188 5.08556 6.54497 5.45866 7.00521 5.45866Z" fill="black" fill-opacity="0.75"></path>
                    </svg>
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
                                <div>
                            <div className="relative max-w-[285px]">
                                <img src={mobileImg} className="w-full" />
                                <div className="absolute top-[9%] left-[28%] w-[70%]">
                                    <div className="text-[12px] font-bold text-black leading-[1.25]">User 1</div>
                                    <div className="text-[11px] text-gray-500 font-normal leading-none">Messenger</div>
                                </div>
                                <div className="absolute top-[15%] left-[5%] w-[90%] p-2 h-[74%] grid grid-cols-[12%_85%] items-end gap-[3%]">
                                    <img src={messageImg} className="w-full" />
                                    <div className="bg-[#E8E8E8] p-2 rounded-[12px] text-[12px] overflow-y-auto leading-[1.3] max-h-[98%]">
                                        <p className=" my-[10px]">{variant?.text}</p>
                                        {/* <p className=" my-[10px]">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p> */}
                                    </div>
                                </div>
                            </div>
                            <button className="varient-btn-hover bg-white border border-[#0087FF42] flex items-center justify-center gap-[10px] w-full max-w-[160px] mt-4 mx-auto px-3 py-2 rounded-md mb-[6px] hover:bg-[#0087FF] hover:text-white">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                    <path opacity="0.3" d="M19 10C19.7956 10 20.5587 10.3161 21.1213 10.8787C21.6839 11.4413 22 12.2044 22 13V16C22 16.7956 21.6839 17.5587 21.1213 18.1213C20.5587 18.6839 19.7956 19 19 19V19.966C19 21.026 17.764 21.605 16.95 20.926L14.638 19H12C11.2044 19 10.4413 18.6839 9.87868 18.1213C9.31607 17.5587 9 16.7956 9 16V13C9 12.2044 9.31607 11.4413 9.87868 10.8787C10.4413 10.3161 11.2044 10 12 10H19Z" fill="#0087FF"/>
                                    <path d="M16 4C16.7956 4 17.5587 4.31607 18.1213 4.87868C18.6839 5.44129 19 6.20435 19 7V8H11C9.93913 8 8.92172 8.42143 8.17157 9.17157C7.42143 9.92172 7 10.9391 7 12V16C7 17.044 7.4 17.996 8.056 18.708L7 19.5C6.176 20.118 5 19.53 5 18.5V17C4.20435 17 3.44129 16.6839 2.87868 16.1213C2.31607 15.5587 2 14.7956 2 14V7C2 6.20435 2.31607 5.44129 2.87868 4.87868C3.44129 4.31607 4.20435 4 5 4H16Z" fill="#0087FF"/>
                                </svg>
                                Variant - {index+1}
                            </button>
                        </div>
                             )
                       }) }
                      
                    </div>
                    <button className="border border-black/25 bg-gray-100 rounded-md w-[30px] h-[30px] flex items-center justify-center mb-7">
                        <svg width="9" height="13" viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.73595 6.50019L0.846762 2.61106L2.79142 0.666504L8.625 6.50019L2.79142 12.3338L0.846762 10.3892L4.73595 6.50019Z" fill="#747474"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <div className="flex gap-4 justify-end mt-6">
            <button className="font-regular text-[21px] leading-[36px] bg-[#E8E8E8] 
             px-4 py-1.5 w-[200px] rounded-md flex justify-center" onClick={()=>setStep(4)}>{ t("prospecting.Cancel")}</button>
            <button onClick={()=>setStep(4)} className="flex items-center justify-center gap-2 font-regular text-[21px] text-[white] leading-[36px] bg-[#0087FF] px-4 py-1.5 w-[200px] rounded-md">Select</button>
        </div>
    </div>
</div>
  )
}

export default PreviewMessage