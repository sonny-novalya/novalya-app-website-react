import React from 'react'

const KeywordPop = ({containerRef}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#00000047] h-screen">
    <div ref={containerRef} className="bg-white px-6 py-5 rounded-[10px] max-w-[700px] mx-auto w-full relative max-h-[90vh] overflow-auto">
        <h3 className="text-[20px] font-medium mb-5">Create Keyword</h3>
        <div className="border border-[#DCDCDC] rounded-[10px] p-5">
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name of your Keywords</label>
                <input className="w-full border border-[#DCDCDC] bg-[rgb(217_217_217_/_10%)] rounded-[4px] px-4 py-2 leading-5 text-[rgba(0,0,0,0.75)] font-light placeholder-[text-[rgba(0,0,0,0.4)]" type="text" name="" placeholder="Name"/>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Positive Keywords</label>
                <input className="w-full border border-[#DCDCDC] bg-[rgb(217_217_217_/_10%)] rounded-[4px] px-4 py-2 leading-5 text-[rgba(0,0,0,0.75)] font-light placeholder-[text-[rgba(0,0,0,0.4)]" type="text" name="" placeholder="Enter keyword, Separated by commas "/>
            </div>
            <div>
                <label className="block text-sm font-medium mb-2">Negative Keywords</label>
                <input className="w-full border border-[#DCDCDC] bg-[rgb(217_217_217_/_10%)] rounded-[4px] px-4 py-2 leading-5 text-[rgba(0,0,0,0.75)] font-light placeholder-[text-[rgba(0,0,0,0.4)]" type="text" name="" placeholder="Enter keyword, Separated by commas "/>
            </div>
        </div>
        <div className="flex justify-end mt-4">
            <button className="bg-[#0087FF] text-white text-sm rounded-[6px] px-12 py-3">Submit</button>
        </div>
    </div>
  </div>
  )
}

export default KeywordPop