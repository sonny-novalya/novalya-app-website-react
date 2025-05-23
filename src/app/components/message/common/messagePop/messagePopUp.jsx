import React, { useMemo, useState } from 'react'
import './messagePopUp.css'
import { t } from 'i18next'
import { Spin } from 'antd'
import useMessageSteps from "../../../../../store/messageTemp/MessageTemp"

const MessagePopUp = ({setIsPop,messageList,setMessageData,preSelecetdMessage,loading}) => { 
  const {
    setIsMessage,
    setStep,
    setBackStep,
    setPreviewMessage,
    setSelecetdMessage
  } = useMessageSteps();
  const [selectedMessage,setSelectedMessage] = useState(preSelecetdMessage)
  const [searchText, setSearchText] = useState('');
  const handleMessage = (message) =>{
    setSelectedMessage(message)
  }

  const handleSelect = ()=>{
    setMessageData(selectedMessage)
    setIsPop(false)
  }

  const handlePreview = (data ) => {
    setPreviewMessage(data);
    setIsMessage(true);
    setBackStep(0);
    setStep(5);
  };

  const handleEdit = (data) => {
    setSelecetdMessage(data);
    setIsMessage(true);
    setStep(7);
  };

  const filteredMessages = useMemo(() => {
    return messageList?.filter((msg) =>
      msg?.title?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, messageList]);
  return (
    <div className='message-popup-main flex items-center justify-center fixed top-0 left-0 w-full h-screen bg-[#5A5A5A4F] z-[999]'>
      <div className='message-popup-container bg-white relative shadow-md rounded-[10px] w-full max-w-[875px] min-h-[80vh]'>
        <div className='message-popup-close absolute right-0 -top-[25px]'>
          <button className='message-close-btn absolute top-0 right-3' onClick={()=> setIsPop(false)}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.6875 2.3125L2.3125 13.6875M2.3125 2.3125L13.6875 13.6875" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div className='message-popup-wrap overflow-auto'>
          <div className='message-popup-content flex flex-col max-h-[85vh]'>
            <div className='message-popup-searchbar flex items-center gap-5 px-5 pt-14 pb-3'>
              <div className='message-search flex items-center gap-1.5 flex-grow text-.5 [#808183] border border-[#00040733] rounded px-4 py-2 text-base'>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clipRule="evenodd" d="M10.9635 12.315C9.61561 13.3919 7.90657 13.9118 6.18734 13.768C4.46812 13.6242 2.86921 12.8276 1.71901 11.5417C0.568806 10.2558 -0.045372 8.57833 0.00261415 6.85376C0.0506003 5.12919 0.757107 3.48846 1.97703 2.26854C3.19696 1.04861 4.83769 0.342104 6.56226 0.294118C8.28682 0.246132 9.9643 0.86031 11.2502 2.01051C12.5361 3.16071 13.3327 4.75962 13.4765 6.47885C13.6203 8.19808 13.1004 9.90712 12.0235 11.255L17.1795 16.41C17.2531 16.4786 17.3122 16.5614 17.3532 16.6534C17.3942 16.7454 17.4163 16.8447 17.418 16.9454C17.4198 17.0461 17.4013 17.1462 17.3636 17.2396C17.3259 17.3329 17.2697 17.4178 17.1985 17.489C17.1273 17.5602 17.0424 17.6164 16.9491 17.6541C16.8557 17.6918 16.7556 17.7103 16.6549 17.7086C16.5542 17.7068 16.4549 17.6847 16.3629 17.6437C16.2709 17.6027 16.1881 17.5436 16.1195 17.47L10.9635 12.315ZM3.03746 10.753C2.3035 10.0189 1.80361 9.08379 1.60097 8.06573C1.39833 7.04768 1.50203 5.9924 1.89897 5.03326C2.29591 4.07412 2.96827 3.25418 3.83107 2.67706C4.69388 2.09994 5.7084 1.79154 6.74643 1.79084C7.78445 1.79015 8.79939 2.09718 9.66297 2.67314C10.5266 3.2491 11.2 4.06813 11.5982 5.02673C11.9965 5.98533 12.1016 7.04047 11.9003 8.0588C11.6991 9.07713 11.2004 10.0129 10.4675 10.748L10.4625 10.753L10.4575 10.757C9.47255 11.7396 8.13788 12.2911 6.74663 12.2903C5.35537 12.2896 4.0213 11.7366 3.03746 10.753Z" fill="#808183"/>
                  <path fill-rule="evenodd" clipRule="evenodd" d="M10.9635 12.315C9.61561 13.3919 7.90657 13.9118 6.18734 13.768C4.46812 13.6242 2.86921 12.8276 1.71901 11.5417C0.568806 10.2558 -0.045372 8.57833 0.00261415 6.85376C0.0506003 5.12919 0.757107 3.48846 1.97703 2.26854C3.19696 1.04861 4.83769 0.342104 6.56226 0.294118C8.28682 0.246132 9.9643 0.86031 11.2502 2.01051C12.5361 3.16071 13.3327 4.75962 13.4765 6.47885C13.6203 8.19808 13.1004 9.90712 12.0235 11.255L17.1795 16.41C17.2531 16.4786 17.3122 16.5614 17.3532 16.6534C17.3942 16.7454 17.4163 16.8447 17.418 16.9454C17.4198 17.0461 17.4013 17.1462 17.3636 17.2396C17.3259 17.3329 17.2697 17.4178 17.1985 17.489C17.1273 17.5602 17.0424 17.6164 16.9491 17.6541C16.8557 17.6918 16.7556 17.7103 16.6549 17.7086C16.5542 17.7068 16.4549 17.6847 16.3629 17.6437C16.2709 17.6027 16.1881 17.5436 16.1195 17.47L10.9635 12.315ZM3.03746 10.753C2.3035 10.0189 1.80361 9.08379 1.60097 8.06573C1.39833 7.04768 1.50203 5.9924 1.89897 5.03326C2.29591 4.07412 2.96827 3.25418 3.83107 2.67706C4.69388 2.09994 5.7084 1.79154 6.74643 1.79084C7.78445 1.79015 8.79939 2.09718 9.66297 2.67314C10.5266 3.2491 11.2 4.06813 11.5982 5.02673C11.9965 5.98533 12.1016 7.04047 11.9003 8.0588C11.6991 9.07713 11.2004 10.0129 10.4675 10.748L10.4625 10.753L10.4575 10.757C9.47255 11.7396 8.13788 12.2911 6.74663 12.2903C5.35537 12.2896 4.0213 11.7366 3.03746 10.753Z" fill="#808183" fillOpacity="0.2"/>
                </svg>
                <input className='flex-grow font-[300] text-[#808183] focus:outline-none' type='text' placeholder='Search novalya' value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
              </div>
              <button className='flex items-center gap-2 font-[300] border border-[#00040733] px-4 py-2 rounded text-[#808183] min-w-[160px]'>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.33333 15H6.66667C7.125 15 7.5 14.625 7.5 14.1667C7.5 13.7083 7.125 13.3333 6.66667 13.3333H3.33333C2.875 13.3333 2.5 13.7083 2.5 14.1667C2.5 14.625 2.875 15 3.33333 15ZM2.5 5.83333C2.5 6.29167 2.875 6.66667 3.33333 6.66667H16.6667C17.125 6.66667 17.5 6.29167 17.5 5.83333C17.5 5.375 17.125 5 16.6667 5H3.33333C2.875 5 2.5 5.375 2.5 5.83333ZM3.33333 10.8333H11.6667C12.125 10.8333 12.5 10.4583 12.5 10C12.5 9.54167 12.125 9.16667 11.6667 9.16667H3.33333C2.875 9.16667 2.5 9.54167 2.5 10C2.5 10.4583 2.875 10.8333 3.33333 10.8333Z" fill="#808183"/>
                </svg>
                Sort by
              </button>
              <button onClick={()=>setIsMessage(true)} className='bg-[#0087FF] px-4 py-3 rounded-[10px] text-white text-sm min-h-[44px] min-w-[210px]'>{t("prospecting.Create New Message")}</button>
            </div>
            <div className='message-popup-list flex-grow overflow-auto mx-5 pr-0.5 gray-scroll'>
              { loading ? <div className='flex justify-center items-center h-[300px]'>
                <Spin size='large'/> 
              </div>: filteredMessages?.map((message)=>{
                return (
                  <div key={message?.id}  onClick={()=>handleMessage(message)} className={`message-popup-items  flex items-center gap-4 px-5 py-2.5 rounded-lg mb-2.5 hover:border-[#0087FF] hover:bg-[#D6E6F4] ${message?.id === selectedMessage?.id ? "border-[#0087FF] border bg-[#D6E6F4]":"bg-[#F5F5F5] border border-[#F5F5F5]"}`}>
                <span className='flex-grow text-[#000407] text-sm'>{message?.title}</span>
                <button onClick={()=>handleEdit(message)} className='flex items-center gap-1.5 h-9 bg-white px-4.5 py-1.5 rounded-full font-[400] text-[#808080]'>
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.2578 16.1724H2.9797C2.65207 16.1737 2.3275 16.1093 2.02524 15.9829C1.72298 15.8565 1.44917 15.6707 1.22005 15.4365C0.989234 15.204 0.806779 14.9281 0.683222 14.6247C0.559665 14.3213 0.497456 13.9964 0.500188 13.6689V4.3987C0.496102 4.07259 0.558538 3.74907 0.683682 3.4479C0.808825 3.14673 0.994051 2.87423 1.22804 2.64705C1.45571 2.41621 1.7278 2.23391 2.02788 2.11115C2.33189 1.98402 2.65818 1.91877 2.98769 1.91919H6.53899C6.69809 1.91919 6.85067 1.98239 6.96317 2.09489C7.07567 2.20739 7.13887 2.35997 7.13887 2.51907C7.13887 2.67817 7.07567 2.83075 6.96317 2.94325C6.85067 3.05575 6.69809 3.11895 6.53899 3.11895H2.98769C2.81566 3.12363 2.6455 3.15604 2.48379 3.21493C2.24811 3.31441 2.04715 3.48143 1.90624 3.69494C1.76533 3.90844 1.69077 4.15888 1.69195 4.4147V13.6849C1.68995 13.8567 1.72215 14.0272 1.78669 14.1865C1.85123 14.3458 1.94681 14.4907 2.06788 14.6127C2.18892 14.7328 2.33248 14.8278 2.49032 14.8923C2.64816 14.9568 2.81718 14.9895 2.98769 14.9886H12.2658C12.4362 14.9886 12.6042 14.9566 12.7617 14.8926C12.9186 14.8296 13.0603 14.7342 13.1777 14.6127C13.2992 14.4953 13.3946 14.3536 13.4576 14.1967C13.5283 14.0383 13.5638 13.8664 13.5616 13.6929V10.1416C13.5616 9.98246 13.6248 9.82988 13.7373 9.71738C13.8498 9.60488 14.0024 9.54168 14.1615 9.54168C14.3206 9.54168 14.4732 9.60488 14.5856 9.71738C14.6981 9.82988 14.7614 9.98246 14.7614 10.1416V13.7168C14.7627 14.0445 14.6983 14.369 14.5719 14.6713C14.4455 14.9736 14.2597 15.2474 14.0255 15.4765C13.7959 15.707 13.5244 15.8916 13.2257 16.0204C12.9161 16.1324 12.5874 16.1844 12.2578 16.1724Z" fill="#808183"/>
                    <path d="M16.3458 2.94296C16.2643 2.73702 16.1387 2.55139 15.9779 2.39907L14.2582 0.679414C14.1059 0.518601 13.9203 0.393028 13.7143 0.311488C13.4049 0.181091 13.0634 0.146448 12.7341 0.212033C12.4047 0.277617 12.1026 0.440416 11.8667 0.679414L10.499 2.04714V2.08713L4.30822 8.26991C3.99567 8.5846 3.82028 9.01014 3.82031 9.45367V11.1893C3.82242 11.6363 4.0009 12.0643 4.31694 12.3804C4.63299 12.6964 5.06103 12.8749 5.50798 12.877H7.24363C7.46402 12.8773 7.68225 12.8336 7.88552 12.7484C8.08879 12.6633 8.27302 12.5384 8.4274 12.3811L14.6182 6.19032L15.9939 4.81459C16.1555 4.66262 16.2818 4.47706 16.3618 4.2707C16.4534 4.06557 16.5007 3.84346 16.5007 3.61883C16.5007 3.3942 16.4534 3.17209 16.3618 2.96696L16.3458 2.94296ZM15.242 3.7828C15.2161 3.84323 15.178 3.89768 15.1301 3.94277L14.1543 4.91857L11.7547 2.51905L12.7385 1.53524C12.833 1.44385 12.959 1.3923 13.0905 1.39127C13.1538 1.39233 13.2164 1.40592 13.2744 1.43126C13.3363 1.45739 13.3896 1.49472 13.4344 1.54324L15.1621 3.2629C15.2056 3.30988 15.2408 3.36399 15.266 3.42287C15.2779 3.48362 15.2779 3.54608 15.266 3.60683C15.2691 3.66647 15.2609 3.72615 15.242 3.7828Z" fill="#808183"/>
                  </svg>
                  Edit
                </button>
                <button className='flex items-center gap-1.5 h-9 bg-white px-4.5 py-1.5 rounded-full font-[400] text-[#808080]' onClick={()=> handlePreview(message)} >
                  <svg width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.5 10.8464C6.67778 10.8464 5.05022 10.3521 3.61733 9.36369C2.18444 8.37524 1.14533 7.09169 0.5 5.51302C1.14444 3.93524 2.18356 2.65213 3.61733 1.66369C5.05111 0.675244 6.67867 0.180578 8.5 0.179689C10.3213 0.1788 11.9493 0.673466 13.384 1.66369C14.8187 2.65391 15.8573 3.93702 16.5 5.51302C15.8556 7.0908 14.8169 8.37435 13.384 9.36369C11.9511 10.353 10.3231 10.8472 8.5 10.8464ZM8.5 7.51302C7.94444 7.51302 7.47244 7.3188 7.084 6.93035C6.69556 6.54191 6.50089 6.06947 6.5 5.51302C6.49911 4.95658 6.69378 4.48458 7.084 4.09702C7.47422 3.70947 7.94622 3.5148 8.5 3.51302C9.05378 3.51124 9.52622 3.70591 9.91733 4.09702C10.3084 4.48813 10.5027 4.96013 10.5 5.51302C10.4973 6.06591 10.3031 6.53835 9.91733 6.93035C9.53156 7.32235 9.05911 7.51658 8.5 7.51302ZM8.5 8.84635C9.43333 8.84635 10.2222 8.52413 10.8667 7.87969C11.5111 7.23524 11.8333 6.44635 11.8333 5.51302C11.8333 4.57969 11.5111 3.7908 10.8667 3.14636C10.2222 2.50191 9.43333 2.17969 8.5 2.17969C7.56667 2.17969 6.77778 2.50191 6.13333 3.14636C5.48889 3.7908 5.16667 4.57969 5.16667 5.51302C5.16667 6.44635 5.48889 7.23524 6.13333 7.87969C6.77778 8.52413 7.56667 8.84635 8.5 8.84635Z" fill="#808182"/>
                  </svg>
                  Preview
                </button>
              </div>)}
                )
              }
             
            </div>
            <div className='flex justify-end px-5 pt-3 pb-4'>
              <button className='bg-[#0087FF] px-4 py-2 rounded-[10px] text-white text-sm min-h-[44px] min-w-[125px]' onClick={()=>handleSelect()}>Select</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessagePopUp