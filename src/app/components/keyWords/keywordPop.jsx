import { Spin } from 'antd'
import React from 'react'

const KeywordPop = ({containerRef,setData,data,handleCreate,actionLoader}) => {
    const handleKeywordsEntery = (keyword,type)=>{
        const KeyArr = keyword?.split(",") || []
      if(type){
        setData({...data,positive_keyword:KeyArr})
      }else{
        setData({...data,negative_keyword:KeyArr})
      }

    }

    // const ConvertArray = (data)=>{
    //     let stringArr = ""

    //     data?.forEach(element => {
    //         stringArr+","+element
    //     });

    //     return stringArr


    // }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#00000047] h-screen">
    <div ref={containerRef} className="bg-white px-6 py-5 rounded-[10px] max-w-[700px] mx-auto w-full relative max-h-[90vh] overflow-auto">
        <h3 className="text-[20px] font-medium mb-5">Create Keyword</h3>
        <div className="border border-[#DCDCDC] rounded-[10px] p-5">
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name of your Keywords</label>
                <input onChange={(e)=>setData({...data,name:e.target.value})} className="w-full border border-[#DCDCDC] bg-[rgb(217_217_217_/_10%)] rounded-[4px] px-4 py-2 leading-5 text-[rgba(0,0,0,0.75)] font-light placeholder-[text-[rgba(0,0,0,0.4)]" type="text" name="" placeholder="Name"/>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Positive Keywords</label>
                <input onChange={(e)=>handleKeywordsEntery(e.target.value,1)}  className="w-full border border-[#DCDCDC] bg-[rgb(217_217_217_/_10%)] rounded-[4px] px-4 py-2 leading-5 text-[rgba(0,0,0,0.75)] font-light placeholder-[text-[rgba(0,0,0,0.4)]" type="text" name="" placeholder="Enter keyword, Separated by commas "/>
            </div>
            <div>
                <label className="block text-sm font-medium mb-2">Negative Keywords</label>
                <input onChange={(e)=>handleKeywordsEntery(e.target.value,0)}   className="w-full border border-[#DCDCDC] bg-[rgb(217_217_217_/_10%)] rounded-[4px] px-4 py-2 leading-5 text-[rgba(0,0,0,0.75)] font-light placeholder-[text-[rgba(0,0,0,0.4)]" type="text" name="" placeholder="Enter keyword, Separated by commas "/>
            </div>
        </div>
        <div className="flex justify-end mt-4">
            <button className="bg-[#0087FF] text-white text-sm rounded-[6px] px-12 py-3 cursor-pointer" disabled={actionLoader} onClick={()=>handleCreate()}>{actionLoader?<Spin size="small" style={{color:"white"}} />:"Submit"}</button>
        </div>
    </div>
  </div>
  )
}

export default KeywordPop