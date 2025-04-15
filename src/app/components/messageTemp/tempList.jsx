import React, { useEffect, useState } from 'react'
import epRightImg from "../../../assets/img/ep_right.svg"
import noteIcon from "../../../assets/img/icons_note.svg"
import useMessageSteps from '../../../store/messageTemp/MessageTemp'
import { TempMessageIcon } from '../../pages/common/icons/messageIcons/MessageIcons'
import { useTranslation } from 'react-i18next'
import { message, Spin } from 'antd'
import { HeartFilled } from '@ant-design/icons'
const TempList = ({containerRef}) => {
  const {setStep,tempList,tempMessageList,setPreviewMessage,setBackStep,setSelecetdMessage,fetchTemps,fetchMessages,tempMessageLoader,tempLoader,setFavourite} = useMessageSteps()
  const [temps,setTemp]=useState([])
  const [selecetdCat,setSelecetdCat]=useState(null)
  const lang = localStorage.getItem("selectedLocale") || "en-US"
  const [currentLang,setCurrentLang]=useState(lang)
  const { t } = useTranslation();
  const pagination = {
    page: 1,
    limit: 200,
}

  useEffect(() => {
    if(tempList.length && tempMessageList.length){
        mergeAndSetTemps(tempList,tempMessageList)
    }
  
    setBackStep(6)
  }, [tempList, tempMessageList]);

  useEffect(() => {
    if(!tempList.length){
        fetchTemps()
    }
   
    fetchMessages(pagination)
  }, [])
  
  // 2️⃣ Once temps is available, select the initial category
  useEffect(() => {
    if (temps?.length) {
      const initialCat = selecetdCat?.category || temps?.[0]?.category;
      handleSelect(initialCat, currentLang);
    }
  }, [temps, currentLang,tempMessageList]);

  useEffect(()=>{

    console.log(selecetdCat)
  },[selecetdCat?.category])
  
  // 3️⃣ Handle category + language selection
  const handleSelect = (categoryName, lang = currentLang) => {
    const readableLang = langData.find((data) => data.value === lang)?.lable;
    const cat = temps?.find((data) => data?.category === categoryName);
    let filteredItems =[]
    if(categoryName === "My Message" || categoryName === "My Favorites"){
        setSelecetdCat(cat)
    }else{
        filteredItems = cat?.items?.filter((item) => item.language === readableLang);
        setSelecetdCat({ ...cat, items: filteredItems });
    }
   
  };
  
 const handleLangChange = (value)=>{
    setCurrentLang(value)
 }

 const handlePreview = (data)=>{
    setPreviewMessage(data)
    setStep(5)
 }

 const handleCreate = (data)=>{
    setSelecetdMessage(data)
    setStep(4)
 }

 const handleFav = async (data) => {
    const type = data.language ? "template" : "message";
  
    const payload = {
      type,
      action_id: data.id
    };
  
    try {
      const res = await setFavourite(payload);
      if (res.status === 200) {
        message.success("Message has been updated");
  
        // Fetch updated data
        if (type === "template") {
          const updatedTemplates = await fetchTemps();
          mergeAndSetTemps(updatedTemplates, tempMessageList);
        } else {
          const updatedMessages = await fetchMessages(pagination);
          mergeAndSetTemps(tempList, updatedMessages);
        }
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  const mergeAndSetTemps = (templates, messages) => {
    const groupedByCategoryName = Object.values(
      templates?.reduce((acc, item) => {
        const categoryName = item.category?.name || 'Unknown';
        if (!acc[categoryName]) {
          acc[categoryName] = { category: categoryName, items: [] };
        }
        acc[categoryName].items.push(item);
        return acc;
      }, {})
    );
  
    const favList = [...templates, ...messages]?.filter((data) => data?.favorite);
  
    const merged = [
      ...groupedByCategoryName,
      { category: "My Message", items: messages },
      { category: "My Favorites", items: favList }
    ];
  
    setTemp(merged);
  };

  const handleLoader = (cat)=>{
    if(cat === "My Message"){
        return tempMessageLoader
    }else if (cat ===  "My Favorites") {
        return (tempMessageLoader || tempLoader)
    }else{
        return tempLoader
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 h-screen z-[9999]">
        <div ref={containerRef} className="bg-white px-5 py-4 rounded-[10px] max-w-[1150px] mx-auto w-full relative max-h-[95vh] overflow-auto">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-[10px] text-[20px]">{t("message.Select a template")}
                 <TempMessageIcon index={0}/>
                </div>
                <div className="lang-dropdownWrap relative">
                    {/* <div className="pros-dropdown-text flex items-center justify-around gap-2 border border-[#CCCDCD] min-h-[44px] rounded-[6px] px-[10px] py-[5px] min-w-[193px] font-medium text-[14px] leading-[21px] text-black">
                        <img src={libFlag}/>
                        <span className="flex-1 text-[14px]">English</span>
                        <TempMessageIcon index={1}/>
                    </div> */}
                    {/* <div className="lang-dropdownCont absolute top-full left-0 w-full opacity-0 invisible bg-white py-3 rounded-[10px]">
                        <div className="lang-dropdownItems min-h-[40px] flex items-center gap-2 px-[10px] py-2 rounded-md cursor-pointer hover:bg-[#0087FF] hover:text-white">
                            <img src={libFlag}/>
                            <span className="flex-1 text-[14px]">English</span>
                            <TempMessageIcon index={2}/>
                        </div>
                    </div> */}

                    <select onChange={(e)=>handleLangChange(e.target.value)}>
                    {
                        langData.map((lang)=>{
                            return  <option key={lang.value}  value={lang.value}>{lang.lable}</option>
                  
                        })
                    }
                       
                    </select>
                  
                </div>
            </div>

            <div className="message-template flex flex-wrap gap-1.5 items-start h-[67vh]">
                <div className="flex flex-col w-1/5 h-full bg-[#F4F8FF] border border-[#0087FF1A] rounded-md overflow-y-auto gap-4">
                    <ul className="divide-y divide-[#0087FF1A] border-b border-[#dbedff]">
                    {
                        temps?.map((data,i)=>{
                            if(data.category === "My Message" || data.category === "My Favorites") return
                            return (
                                <li key={selecetdCat?.category+`${i}`} className={`hover:bg-[#0087FF] hover:text-white ${selecetdCat?.category ===  data.category ? "bg-[#0087FF] text-white":""} cursor-pointer`} onClick={()=>handleSelect(data.category)}>
                            <span className="template-list-a text-sm flex justify-between items-center p-3">
                                {data.category}
                                <img className='template-arrow' src={epRightImg}/>
                            </span>
                        </li>
                            )
                        })
                    }
                       
                       
                    </ul>
                    <ul className="divide-y cursor-pointer divide-[#0087FF1A] mt-auto border-t border-[#dbedff]">
                        <li className={`hover:bg-[#0087FF] hover:text-white ${selecetdCat?.category ===  "My Message" ? "bg-[#0087FF] text-white":""}`} onClick={()=>handleSelect("My Message")} >
                            <span className="template-list-a text-sm flex justify-between items-center p-3">
                                My Message
                                <img className='template-arrow' src={epRightImg}/>
                            </span>
                        </li>
                        <li className={`hover:bg-[#0087FF] hover:text-white ${selecetdCat?.category ===  "My Favorites" ? "bg-[#0087FF] text-white":""}`} onClick={()=>handleSelect("My Favorites")}>
                            <span className="template-list-a text-sm flex justify-between items-center p-3">
                                 {t("message.My Favorites")}
                                <img className='template-arrow' src={epRightImg}/>
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="w-[calc(80%-6px)] h-full border border-[#0087FF1A] rounded-md p-4">
                    <div className="flex flex-wrap gap-x-5 gap-y-4 max-h-full overflow-y-auto items-start">
                       { 
                        handleLoader(selecetdCat?.category) ?<div className='flex justify-center items-center w-full h-[600px]'>
                        <Spin size='large'/>
                        </div>:
                        selecetdCat?.items?.map((data)=>{
                           return (
                            <div key={data.title} className="template-items border border-[#0087FF1A] p-3 w-[calc(25%-15px)] rounded-lg">
                            <div className="flex justify-between items-start">
                                <img src={noteIcon}/>
                                <div  onClick={()=>handleFav(data)} className="bg-[#EFEFEF] w-6 h-6 flex items-center justify-center rounded-full mt-2 cursor-pointer">
                                <HeartFilled style={{color: data?.favorite?"#ff5f5f":"#C5C5C5"}} />
                                    
                                </div>
                            </div>
                            <h3 className="font-medium text-sm leading-6 mt-2 mb-3">{data.title}</h3>
                            <div className="flex gap-2">
                                <button className="flex-1 font-medium text-sm bg-white px-3 py-1.5 rounded-full" onClick={()=>handlePreview(data)}>{t("message.Preview")}</button>
                                <button className="flex-1 font-medium text-sm bg-[#0087FF] text-white px-3 py-1.5 rounded-full" onClick={()=>handleCreate(data)} >{t("message.Select")}</button>
                            </div>
                        </div>
                           )
                        })}
                       
                    </div>
                </div>
            </div>
            <div className="flex gap-4 justify-end mt-6">
                <button onClick={()=>setStep(1)} className="font-regular text-[21px] leading-[36px] bg-[#E8E8E8] 
                 px-4 py-1.5 w-[200px] rounded-md flex justify-center">{t("message.Back")}
                </button>
                {/* <button onClick={()=>setStep(4)} className="flex items-center justify-center gap-2 font-regular text-[21px] text-[white] leading-[36px] bg-[#0087FF] px-4 py-1.5 w-[200px] rounded-md">
                {t("message.Create")} 
                <TempMessageIcon index={3}/>
                </button> */}
            </div>
        </div>
    </div>
  )
}

const langData = [
    {
      lable:"English",
      value:"en-US"
    },
    {
        lable:"French",
        value:"fr-FR"
    },
    {
        lable:"Spanish",
        value:"es-ES"
    },
    {
        lable:"German",
        value:"de-DE"
    }
]

export default TempList