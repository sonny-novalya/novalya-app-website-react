import React, { useRef, useState } from 'react'
import uploadImg from "../../../assets/img/upload-icons.svg"
import uploadImgFile from "../../../assets/img/upload-files.svg"
import uploadTick from "../../../assets/img/tick-circle.svg"
import uploadDel from "../../../assets/img/delete-icon.svg"

const Upload = ({setIsUpload}) => {
    const fileInputRef = useRef(null);
    const [fileData,setFileData] = useState(null);

    const handleBrowseClick = () => {
      fileInputRef.current.click();
    };
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setFileData(file)
        console.log('Selected file:', file);
      }
    };
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 h-screen">
        <div className="bg-white px-6 py-5 rounded-[10px] max-w-[800px] mx-auto w-full relative max-h-[90vh] overflow-auto">
          <h3 className="text-[24px] font-medium mb-4">Upload files</h3>
  
          <div className="border-2 border-dashed border-[#CBD0DC] text-center px-6 pt-5 pb-8 rounded-[10px]">
            <div className="flex justify-center mb-2">
              <img src={uploadImg} alt="uploadImg" />
            </div>
            <h3 className="text-[24px] text-[#292D32] mb-2">Choose a file or drag & drop it here</h3>
            <span className="block mb-8 text-[20px] leading-none text-[#A9ACB4]">
              JPEG, PNG, PDG, and MP4 formats, up to 50MB
            </span>
  
            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
              accept=".jpeg,.jpg,.png,.pdf,.mp4"
            />
  
            <button
              className="bg-[#0087FF] text-white text-[24px] rounded-[6px] px-9 py-1.5"
              onClick={handleBrowseClick}
            >
              Browse File
            </button>
          </div>
  
         { fileData?<div className="border border-[#0087ff33] rounded-[10px] mt-5 px-4 py-2">
            <div className="flex items-center gap-6">
              <img src={uploadImgFile} alt="uploadImgFile" />
              <div className="flex-1">
                <h4 className="text-[24px] m-0 text-[#292D32]">{fileData?.name}</h4>
                <div className="flex items-center gap-4">
                  <span className="text-[16px] text-[#A9ACB4]">{fileData?.size/(1024*1024)} MB of {fileData?.size/(1024*1024)} MB •</span>
                  <div className="flex items-center gap-[6px]">
                    <img src={uploadTick} alt="uploadTick" />
                    <span className="text-[14px] text-[#292D32]">Completed</span>
                  </div>
                </div>
              </div>
              <button>
                <img src={uploadDel} alt="uploadDel" onClick={()=>setFileData(null)} />
              </button>
            </div>
          </div>:""}
  
          <div className="flex justify-end mt-5 gap-4">
            <button className="bg-[#E8E8E8] text-black text-[24px] rounded-[6px] px-9 py-1.5" onClick={()=>setIsUpload(false)}>Cancel</button>
            <button className="bg-[#0087FF] text-white text-[24px] rounded-[6px] px-9 py-1.5">Confirm</button>
          </div>
        </div>
      </div>
    );
}

export default Upload