import React from 'react'
import libFlag from "../../../assets/img/flag-liberia.svg"
import epRightImg from "../../../assets/img/ep_right.svg"
import heartIcon from "../../../assets/img/heart-icons.svg"
import noteIcon from "../../../assets/img/icons_note.svg"
import useMessageSteps from '../../../store/messageTemp/MessageTemp'
import { TempMessageIcon } from '../../pages/common/icons/messageIcons/MessageIcons'
import { useTranslation } from 'react-i18next'
const TempList = () => {
  const {setStep} = useMessageSteps()
  const { t } = useTranslation();
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 h-screen">
        <div className="bg-white px-5 py-4 rounded-[10px] max-w-[1150px] mx-auto w-full relative max-h-[95vh] overflow-auto">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-[10px] text-[20px]">{t("message.Select a template")}
                 <TempMessageIcon index={0}/>
                </div>
                <div className="lang-dropdownWrap relative">
                    <div className="pros-dropdown-text flex items-center justify-around gap-2 border border-[#CCCDCD] min-h-[44px] rounded-[6px] px-[10px] py-[5px] min-w-[193px] font-medium text-[14px] leading-[21px] text-black">
                        <img src={libFlag}/>
                        <span className="flex-1 text-[14px]">English</span>
                        <TempMessageIcon index={1}/>
                    </div>
                    <div className="lang-dropdownCont absolute top-full left-0 w-full opacity-0 invisible bg-white py-3 rounded-[10px]">
                        <div className="lang-dropdownItems min-h-[40px] flex items-center gap-2 px-[10px] py-2 rounded-md cursor-pointer hover:bg-[#0087FF] hover:text-white">
                            <img src={libFlag}/>
                            <span className="flex-1 text-[14px]">English</span>
                            <TempMessageIcon index={2}/>
                        </div>
                    </div>
                  
                </div>
            </div>

            <div className="message-template flex flex-wrap gap-1.5 items-start h-[67vh]">
                <div className="flex flex-col w-1/5 h-full bg-[#F4F8FF] border border-[#0087FF1A] rounded-md overflow-y-auto gap-4">
                    <ul className="divide-y divide-[#0087FF1A] border-b border-[#dbedff]">
                        <li className="hover:bg-[#0087FF] hover:text-white">
                            <span className="template-list-a text-sm flex justify-between items-center p-3">
                                Accept/Decline 
                                <img className='template-arrow' src={epRightImg}/>
                            </span>
                        </li>
                        <li className="hover:bg-[#0087FF] hover:text-white">
                            <span className="template-list-a text-sm flex justify-between items-center p-3">
                                Birthday
                                <img className='template-arrow' src={epRightImg}/>
                            </span>
                        </li>
                        <li className="hover:bg-[#0087FF] hover:text-white">
                            <span className="template-list-a text-sm flex justify-between items-center p-3">
                                Engagement
                                <img className='template-arrow' src={epRightImg}/>
                            </span>
                        </li>
                        <li className="hover:bg-[#0087FF] hover:text-white">
                            <span className="template-list-a text-sm flex justify-between items-center p-3">
                                Follow-Up
                                <img className='template-arrow' src={epRightImg}/>
                            </span>
                        </li>
                        <li className="hover:bg-[#0087FF] hover:text-white">
                            <span className="template-list-a text-sm flex justify-between items-center p-3">
                                Invitation
                                <img className='template-arrow' src={epRightImg}/>
                            </span>
                        </li>
                        <li className="hover:bg-[#0087FF] hover:text-white">
                            <span className="template-list-a text-sm flex justify-between items-center p-3">
                                Lead Generation
                                <img className='template-arrow' src={epRightImg}/>
                            </span>
                        </li>
                    </ul>
                    <ul className="divide-y divide-[#0087FF1A] mt-auto border-t border-[#dbedff]">
                        <li className="hover:bg-[#0087FF] hover:text-white">
                            <span className="template-list-a text-sm flex justify-between items-center p-3">
                                
                                <img className='template-arrow' src={epRightImg}/>
                            </span>
                        </li>
                        <li className="hover:bg-[#0087FF] hover:text-white">
                            <span className="template-list-a text-sm flex justify-between items-center p-3">
                                 {t("message.My Favorites")}
                                <img className='template-arrow' src={epRightImg}/>
                            </span>
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
                                <button className="flex-1 font-medium text-sm bg-white px-3 py-1.5 rounded-full">{t("message.Preview")}</button>
                                <button className="flex-1 font-medium text-sm bg-[#0087FF] text-white px-3 py-1.5 rounded-full">{t("message.Select")}</button>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
            <div className="flex gap-4 justify-end mt-6">
                <button onClick={()=>setStep(1)} className="font-regular text-[21px] leading-[36px] bg-[#E8E8E8] 
                 px-4 py-1.5 w-[200px] rounded-md flex justify-center">{t("message.Back")}
                </button>
                <button onClick={()=>setStep(4)} className="flex items-center justify-center gap-2 font-regular text-[21px] text-[white] leading-[36px] bg-[#0087FF] px-4 py-1.5 w-[200px] rounded-md">
                {t("message.Create")} 
                <TempMessageIcon index={3}/>
                </button>
            </div>
        </div>
    </div>
  )
}

export default TempList