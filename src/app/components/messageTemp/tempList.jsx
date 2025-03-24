import React from 'react'
import libFlag from "../../../assets/img/flag-liberia.svg"
import epRightImg from "../../../assets/img/ep_right.svg"
import heartIcon from "../../../assets/img/heart-icons.svg"
import noteIcon from "../../../assets/img/icons_note.svg"
import useMessageSteps from '../../../store/messageTemp/MessageTemp'
const TempList = () => {
  const {setStep} = useMessageSteps()

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 h-screen">
        <div className="bg-white px-5 py-4 rounded-[10px] max-w-[1150px] mx-auto w-full relative max-h-[95vh] overflow-auto">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-[10px] text-[20px]">Select a template
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.0026 13.1668C10.4084 13.1668 13.1693 10.4059 13.1693 7.00016C13.1693 3.59441 10.4084 0.833496 7.0026 0.833496C3.59685 0.833496 0.835938 3.59441 0.835938 7.00016C0.835938 10.4059 3.59685 13.1668 7.0026 13.1668Z" stroke="black" stroke-opacity="0.75" stroke-width="0.9"/>
                        <path d="M7 6.87549V10.2088" stroke="black" stroke-opacity="0.75" stroke-linecap="round"/>
                        <path d="M7.00521 5.45866C7.46545 5.45866 7.83854 5.08556 7.83854 4.62533C7.83854 4.16509 7.46545 3.79199 7.00521 3.79199C6.54497 3.79199 6.17188 4.16509 6.17188 4.62533C6.17188 5.08556 6.54497 5.45866 7.00521 5.45866Z" fill="black" fill-opacity="0.75"/>
                    </svg>
                </div>
                <div className="lang-dropdownWrap relative">
                    <div className="pros-dropdown-text flex items-center justify-around gap-2 border border-[#CCCDCD] min-h-[44px] rounded-[6px] px-[10px] py-[5px] min-w-[193px] font-medium text-[14px] leading-[21px] text-black">
                        <img src={libFlag}/>
                        <span className="flex-1 text-[14px]">English</span>
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.99951 3.1716L7.82797 0.343099L9.24219 1.7574L4.99951 6L0.756909 1.7574L2.17111 0.343098L4.99951 3.1716Z" fill="#8C8C8C"></path>
                        </svg>
                    </div>
                    <div className="lang-dropdownCont absolute top-full left-0 w-full opacity-0 invisible bg-white py-3 rounded-[10px]">
                        <div className="lang-dropdownItems min-h-[40px] flex items-center gap-2 px-[10px] py-2 rounded-md cursor-pointer hover:bg-[#0087FF] hover:text-white">
                            <img src={libFlag}/>
                            <span className="flex-1 text-[14px]">English</span>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.09375 9.84375L7.03125 13.7812L14.9062 5.34375" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="message-template flex flex-wrap gap-1.5 items-start h-[67vh]">
                <div className="flex flex-col w-1/5 h-full bg-[#F4F8FF] border border-[#0087FF1A] rounded-md overflow-y-auto gap-4">
                    <ul className="divide-y divide-[#0087FF1A] border-b border-[#dbedff]">
                        <li className="hover:bg-[#0087FF] hover:text-white">
                            <a href="#!" className="template-list-a text-sm flex justify-between items-center p-3">
                                Accept/Decline 
                                <img className='template-arrow' src={epRightImg}/>
                            </a>
                        </li>
                        <li className="hover:bg-[#0087FF] hover:text-white">
                            <a href="#!" className="template-list-a text-sm flex justify-between items-center p-3">
                                Birthday
                                <img className='template-arrow' src={epRightImg}/>
                            </a>
                        </li>
                        <li className="hover:bg-[#0087FF] hover:text-white">
                            <a href="#!" className="template-list-a text-sm flex justify-between items-center p-3">
                                Engagement
                                <img className='template-arrow' src={epRightImg}/>
                            </a>
                        </li>
                        <li className="hover:bg-[#0087FF] hover:text-white">
                            <a href="#!" className="template-list-a text-sm flex justify-between items-center p-3">
                                Follow-Up
                                <img className='template-arrow' src={epRightImg}/>
                            </a>
                        </li>
                        <li className="hover:bg-[#0087FF] hover:text-white">
                            <a href="#!" className="template-list-a text-sm flex justify-between items-center p-3">
                                Invitation
                                <img className='template-arrow' src={epRightImg}/>
                            </a>
                        </li>
                        <li className="hover:bg-[#0087FF] hover:text-white">
                            <a href="#!" className="template-list-a text-sm flex justify-between items-center p-3">
                                Lead Generation
                                <img className='template-arrow' src={epRightImg}/>
                            </a>
                        </li>
                    </ul>
                    <ul className="divide-y divide-[#0087FF1A] mt-auto border-t border-[#dbedff]">
                        <li className="hover:bg-[#0087FF] hover:text-white">
                            <a href="#!" className="template-list-a text-sm flex justify-between items-center p-3">
                                My Messages
                                <img className='template-arrow' src={epRightImg}/>
                            </a>
                        </li>
                        <li className="hover:bg-[#0087FF] hover:text-white">
                            <a href="#!" className="template-list-a text-sm flex justify-between items-center p-3">
                                My Favorites
                                <img className='template-arrow' src={epRightImg}/>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="w-[calc(80%-6px)] h-full border border-[#0087FF1A] rounded-md p-4">
                    <div className="flex flex-wrap gap-x-5 gap-y-4 max-h-full overflow-y-auto items-start">
                        <div className="template-items border border-[#0087FF1A] p-3 w-[calc(25%-15px)] rounded-lg">
                            <div className="flex justify-between items-start">
                                <img src={noteIcon}/>
                                <div className="bg-[#EFEFEF] w-6 h-6 flex items-center justify-center rounded-full mt-2">
                                    <img src={heartIcon}/>
                                </div>
                            </div>
                            <h3 className="font-medium text-sm leading-6 mt-2 mb-3">Accept | Wish to welcome</h3>
                            <div className="flex gap-2">
                                <button className="flex-1 font-medium text-sm bg-white px-3 py-1.5 rounded-full">Preview</button>
                                <button className="flex-1 font-medium text-sm bg-[#0087FF] text-white px-3 py-1.5 rounded-full">Select</button>
                            </div>
                        </div>
                        <div className="template-items border border-[#0087FF1A] p-3 w-[calc(25%-15px)] rounded-lg">
                            <div className="flex justify-between items-start">
                                <img src={noteIcon}/>
                                <div className="bg-[#EFEFEF] w-6 h-6 flex items-center justify-center rounded-full mt-2">
                                    <img src={heartIcon}/>
                                </div>
                            </div>
                            <h3 className="font-medium text-sm leading-6 mt-2 mb-3">Accept | Wish to welcome</h3>
                            <div className="flex gap-2">
                                <button className="flex-1 font-medium text-sm bg-white px-3 py-1.5 rounded-full">Preview</button>
                                <button className="flex-1 font-medium text-sm bg-[#0087FF] text-white px-3 py-1.5 rounded-full">Select</button>
                            </div>
                        </div>
                        <div className="template-items border border-[#0087FF1A] p-3 w-[calc(25%-15px)] rounded-lg">
                            <div className="flex justify-between items-start">
                                <img src={noteIcon}/>
                                <div className="bg-[#EFEFEF] w-6 h-6 flex items-center justify-center rounded-full mt-2">
                                    <img src={heartIcon}/>
                                </div>
                            </div>
                            <h3 className="font-medium text-sm leading-6 mt-2 mb-3">Accept | Wish to welcome</h3>
                            <div className="flex gap-2">
                                <button className="flex-1 font-medium text-sm bg-white px-3 py-1.5 rounded-full">Preview</button>
                                <button className="flex-1 font-medium text-sm bg-[#0087FF] text-white px-3 py-1.5 rounded-full">Select</button>
                            </div>
                        </div>
                        <div className="template-items border border-[#0087FF1A] p-3 w-[calc(25%-15px)] rounded-lg">
                            <div className="flex justify-between items-start">
                                <img src={noteIcon}/>
                                <div className="bg-[#EFEFEF] w-6 h-6 flex items-center justify-center rounded-full mt-2">
                                    <img src={heartIcon}/>
                                </div>
                            </div>
                            <h3 className="font-medium text-sm leading-6 mt-2 mb-3">Accept | Wish to welcome</h3>
                            <div className="flex gap-2">
                                <button className="flex-1 font-medium text-sm bg-white px-3 py-1.5 rounded-full">Preview</button>
                                <button className="flex-1 font-medium text-sm bg-[#0087FF] text-white px-3 py-1.5 rounded-full">Select</button>
                            </div>
                        </div>
                        <div className="template-items border border-[#0087FF1A] p-3 w-[calc(25%-15px)] rounded-lg">
                            <div className="flex justify-between items-start">
                                <img src={noteIcon}/>
                                <div className="bg-[#EFEFEF] w-6 h-6 flex items-center justify-center rounded-full mt-2">
                                    <img src={heartIcon}/>
                                </div>
                            </div>
                            <h3 className="font-medium text-sm leading-6 mt-2 mb-3">Accept | Wish to welcome</h3>
                            <div className="flex gap-2">
                                <button className="flex-1 font-medium text-sm bg-white px-3 py-1.5 rounded-full">Preview</button>
                                <button className="flex-1 font-medium text-sm bg-[#0087FF] text-white px-3 py-1.5 rounded-full">Select</button>
                            </div>
                        </div>
                        <div className="template-items border border-[#0087FF1A] p-3 w-[calc(25%-15px)] rounded-lg">
                            <div className="flex justify-between items-start">
                                <img src={noteIcon}/>
                                <div className="bg-[#EFEFEF] w-6 h-6 flex items-center justify-center rounded-full mt-2">
                                    <img src={heartIcon}/>
                                </div>
                            </div>
                            <h3 className="font-medium text-sm leading-6 mt-2 mb-3">Accept | Wish to welcome</h3>
                            <div className="flex gap-2">
                                <button className="flex-1 font-medium text-sm bg-white px-3 py-1.5 rounded-full">Preview</button>
                                <button className="flex-1 font-medium text-sm bg-[#0087FF] text-white px-3 py-1.5 rounded-full">Select</button>
                            </div>
                        </div>
                        <div className="template-items border border-[#0087FF1A] p-3 w-[calc(25%-15px)] rounded-lg">
                            <div className="flex justify-between items-start">
                                <img src={noteIcon}/>
                                <div className="bg-[#EFEFEF] w-6 h-6 flex items-center justify-center rounded-full mt-2">
                                    <img src={heartIcon}/>
                                </div>
                            </div>
                            <h3 className="font-medium text-sm leading-6 mt-2 mb-3">Accept | Wish to welcome</h3>
                            <div className="flex gap-2">
                                <button className="flex-1 font-medium text-sm bg-white px-3 py-1.5 rounded-full">Preview</button>
                                <button className="flex-1 font-medium text-sm bg-[#0087FF] text-white px-3 py-1.5 rounded-full">Select</button>
                            </div>
                        </div>
                        <div className="template-items border border-[#0087FF1A] p-3 w-[calc(25%-15px)] rounded-lg">
                            <div className="flex justify-between items-start">
                                <img src={noteIcon}/>
                                <div className="bg-[#EFEFEF] w-6 h-6 flex items-center justify-center rounded-full mt-2">
                                    <img src={heartIcon}/>
                                </div>
                            </div>
                            <h3 className="font-medium text-sm leading-6 mt-2 mb-3">Accept | Wish to welcome</h3>
                            <div className="flex gap-2">
                                <button className="flex-1 font-medium text-sm bg-white px-3 py-1.5 rounded-full">Preview</button>
                                <button className="flex-1 font-medium text-sm bg-[#0087FF] text-white px-3 py-1.5 rounded-full">Select</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-4 justify-end mt-6">
                <button onClick={()=>setStep(1)} className="font-regular text-[21px] leading-[36px] bg-[#E8E8E8] 
                 px-4 py-1.5 w-[200px] rounded-md flex justify-center">Back
                </button>
                <button onClick={()=>setStep(4)} className="flex items-center justify-center gap-2 font-regular text-[21px] text-[white] leading-[36px] bg-[#0087FF] px-4 py-1.5 w-[200px] rounded-md">Create 
                    <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.6895 7.71876H0.75C0.551088 7.71876 0.360322 7.80107 0.21967 7.94758C0.0790178 8.0941 0 8.29281 0 8.50001C0 8.70721 0.0790178 8.90592 0.21967 9.05244C0.360322 9.19895 0.551088 9.28126 0.75 9.28126H14.6895L9.219 14.9781C9.07817 15.1248 8.99905 15.3238 8.99905 15.5313C8.99905 15.7387 9.07817 15.9377 9.219 16.0844C9.35983 16.2311 9.55084 16.3135 9.75 16.3135C9.94916 16.3135 10.1402 16.2311 10.281 16.0844L17.031 9.05313C17.1008 8.98056 17.1563 8.89435 17.1941 8.79944C17.2319 8.70452 17.2513 8.60277 17.2513 8.50001C17.2513 8.39725 17.2319 8.2955 17.1941 8.20058C17.1563 8.10567 17.1008 8.01946 17.031 7.94688L10.281 0.915635C10.1402 0.768937 9.94916 0.686523 9.75 0.686523C9.55084 0.686523 9.35983 0.768937 9.219 0.915635C9.07817 1.06233 8.99905 1.2613 8.99905 1.46876C8.99905 1.67622 9.07817 1.87519 9.219 2.02189L14.6895 7.71876Z" fill="white"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>
  )
}

export default TempList