import React, { useState } from 'react'
import useKeyWordStore from '../../../store/keyword/keywordStore'
import { Spin } from 'antd'

const KeywordUpdatePop = ({containerRef}) => {
    const {selectedKeyword,setSelectedKeyword,setFlow,updateKeyWords,fetchKeywords,actionLoader} = useKeyWordStore()
    const [data,setData]= useState({...selectedKeyword})
 
    
    const handleKeywordsEntery = (keyword,type)=>{
        const KeyArr = keyword?.split(",") || []
      if(type){
        setData({...data,positive_keyword:KeyArr})
      }else{
        setData({...data,negative_keyword:KeyArr})
      }

    }

    const ConvertArray = (data)=>{
        let stringArr = ""
        data?.forEach(element => {
            if (stringArr) {
                stringArr= stringArr  + "," + element
            }else{
                stringArr=  element
            }  
        });

        return stringArr
    }

    const onsubmit = async()=>{
      
        const paylaod = {
            name:data.name,
            negative_keyword:JSON.stringify(data.negative_keyword),
            positive_keyword:JSON.stringify(data.positive_keyword),
            types:["facebook"]
        }
        if(!paylaod.name){
            message.error("Keyword Name is required")
            return
          }
          if(!data.positive_keyword.length && !data.negative_keyword.length){
            message.error("Positive or Negitive Keywords are required")
            return
          }
        const res = await updateKeyWords(paylaod,data.id)
        if (res?.status === 200) {
            setFlow(0)
            setSelectedKeyword({})
            fetchKeywords({
                page: 1,
                limit: 10,
              })
        }

    }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#00000047] h-screen">
    <div ref={containerRef} className="bg-white px-6 py-5 rounded-[10px] max-w-[700px] mx-auto w-full relative max-h-[90vh] overflow-auto1">
        <svg style={{position: "absolute", right: "2px", cursor: "pointer", top: "-40px"}} onClick={() => setFlow(0)} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.6875 8.3125L8.3125 19.6875M8.3125 8.3125L19.6875 19.6875" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <h3 className="text-[20px] font-[500] mb-2.5">Update Keyword</h3>
        <div className="border border-[#DCDCDC] rounded-[10px] p-5">
            <div className="mb-3">
                <label className="block text-sm font-[500] mb-1.5">Name of your Keywords</label>
                <input onChange={(e)=>setData({...data,name:e.target.value})}  value={data.name} className="w-full border border-[#DCDCDC] bg-[rgb(217_217_217_/_10%)] rounded-[4px] px-4 py-2 leading-5 text-[rgba(0,0,0,0.75)] font-light placeholder-[text-[rgba(0,0,0,0.4)]" type="text" name="" placeholder="Name"/>
            </div>
            <div className="mb-3">
                <label className="block text-sm font-[500] mb-1.5">Positive Keywords</label>
                <input onChange={(e)=>handleKeywordsEntery(e.target.value,1)}  value={ConvertArray(data?.positive_keyword || [])} className="w-full border border-[#DCDCDC] bg-[rgb(217_217_217_/_10%)] rounded-[4px] px-4 py-2 leading-5 text-[rgba(0,0,0,0.75)] font-light placeholder-[text-[rgba(0,0,0,0.4)]" type="text" name="" placeholder="Enter keyword, Separated by commas "/>
            </div>
            <div className='mb-3'>
                <label className="block text-sm font-[500] mb-1.5">Negative Keywords</label>
                <input onChange={(e)=>handleKeywordsEntery(e.target.value,0)}  value={ConvertArray(data?.negative_keyword || [])}   className="w-full border border-[#DCDCDC] bg-[rgb(217_217_217_/_10%)] rounded-[4px] px-4 py-2 leading-5 text-[rgba(0,0,0,0.75)] font-light placeholder-[text-[rgba(0,0,0,0.4)]" type="text" name="" placeholder="Enter keyword, Separated by commas "/>
            </div>
        </div>
        <div className="flex justify-end mt-4">
            <button className="bg-[#0087FF] text-white text-sm rounded-[6px] px-12 py-3 w-[154px] cursor-pointer" disabled={actionLoader} onClick={()=>onsubmit()}>{actionLoader?<Spin size="small" style={{color:"white"}} />:"Submit"}</button>
        </div>
    </div>
  </div>
  )
}

export default KeywordUpdatePop