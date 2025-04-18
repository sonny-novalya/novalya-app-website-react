import React, { useRef, useState } from 'react'
import uploadImg from "../../../assets/img/upload-icons.svg"
import uploadImgFile from "../../../assets/img/upload-files.svg"
import uploadTick from "../../../assets/img/tick-circle.svg"
import uploadDel from "../../../assets/img/delete-icon.svg"
import { message } from 'antd'

const Upload = ({setIsUpload,setAttachment,attachment}) => {
    const fileInputRef = useRef(null);
    const [fileData,setFileData] = useState(null);
    const [previewUrl,setPreviewUrl] = useState(attachment || null);

    const handleBrowseClick = () => {
      fileInputRef.current.click();
    };
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const maxSizeInMB = 5;
        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    
        if (file.size > maxSizeInBytes) {
          message.error(`File is too large. Max allowed size is ${maxSizeInMB}MB.`);
          event.target.value = null; // Reset file input
          return;
        }
        setFileData(file)
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result); // base64 string
        };
        reader.readAsDataURL(file); 
      }
    };

    const handleSubmit = () =>{
        setAttachment(previewUrl)
        setIsUpload(false)
    }

    const handleDelete = ()=>{
      setFileData(null)
      setPreviewUrl(null)
    }
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 h-screen z-[9999]">
        <div className="bg-white px-6 py-5 rounded-[10px] max-w-[800px] mx-auto w-full relative max-h-[90vh] overflow-auto">
          <h3 className="text-[24px] font-medium mb-4">Upload files</h3>
  
          { previewUrl? <div className='flex items-center content-center'>
            <img src={previewUrl}   className=' w-full h-[400px]'  alt={"previewUrl"}/>
          </div>: <div className="border-2 border-dashed border-[#CBD0DC] text-center px-6 pt-5 pb-8 rounded-[10px]">
            <div className="flex justify-center mb-2">
              <img src={uploadImg} alt="uploadImg" />
            </div>
            <h3 className="text-[24px] text-[#292D32] mb-2">Choose a file or drag & drop it here</h3>
            <span className="block mb-8 text-[20px] leading-none text-[#A9ACB4]">
              JPEG, PNG , GIF etc. up to 5MB
            </span>
  
            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
               accept="image/*"
            />
  
            <button
              className="bg-[#0087FF] text-white text-[24px] rounded-[6px] px-9 py-1.5"
              onClick={handleBrowseClick}
            >
              Browse File
            </button>
          </div>}
  
         { previewUrl?<div className="border border-[#0087ff33] rounded-[10px] mt-5 px-4 py-2">
            <div className="flex items-center gap-6">
              <img src={uploadImgFile} alt="uploadImgFile" />
              <div className="flex-1">
                <h4 className="text-[24px] m-0 text-[#292D32]">{fileData?.name || "Selected File"}</h4>
                <div className="flex items-center gap-4">
                 {fileData?.size && <span className="text-[16px] text-[#A9ACB4]">{ fileData?.size/(1024*1024)} MB of {fileData?.size/(1024*1024)} MB •</span>}
                  <div className="flex items-center gap-[6px]">
                    <img src={uploadTick} alt="uploadTick" />
                    <span className="text-[14px] text-[#292D32]">Completed</span>
                  </div>
                </div>
              </div>
              <button className='cursor-pointer'>
                <img src={uploadDel} alt="uploadDel" onClick={()=>handleDelete()} />
              </button>
            </div>
          </div>:""}
  
          <div className="flex justify-end mt-5 gap-4">
            <button className="bg-[#E8E8E8] text-black text-[24px] rounded-[6px] px-9 py-1.5" onClick={()=>setIsUpload(false)}>Cancel</button>
            <button className="bg-[#0087FF] text-white text-[24px] rounded-[6px] px-9 py-1.5" onClick={()=>handleSubmit()}>Confirm</button>
          </div>
        </div>
      </div>
    );
}

export default Upload