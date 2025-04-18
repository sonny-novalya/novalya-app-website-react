import { useState } from "react";
import Strategy from "./Strategy";
import AddTag from "./AddTag";
import WishTypeSelector from "./WishTypeSelector";
import Layout from "../../Layout";
import { message, Select, Spin } from "antd";
import { t } from "i18next";
import MessagePopUp from "../../../../components/message/common/messagePop/messagePopUp";
import useMessageSteps from "../../../../../store/messageTemp/MessageTemp";
import usefbCRM from "../../../../../store/fb/fbCRM";
import { useEffect } from "react";
import useBirthdayStore from "../../../../../store/fb/birthday";


const Birthday = () => {
  const {
    fetchMessages,
    tempMessageList,
    tempMessageLoader,
  } = useMessageSteps();
  const {fetchCRMGroups,CRMList}=usefbCRM()
  const {fetchBirthdayData,saveBirthdayData,birthdayLoader}=useBirthdayStore()
  const [selectedWishType, setSelectedWishType] = useState("message");
  const [selectedStrategy, setSelectedStrategy] = useState("today");
  const [selectedTag, setSelectedTag] = useState("yes");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedStage, setSelectedStage] = useState(null);
  const [messageData, setMessageData] = useState(null);
  const [isMessagePop, setIsMessagePop] = useState(false);
  const [preSelecetdMessage, setPreSelecetdMessage] = useState(null);


 

  useEffect(()=>{
    if (!tempMessageList?.length) {
    fetchMessages({limit:200,page:1})
    }
    fetchCRMGroups()
    preSelectedData()
  },[])

  const handleSelectCRM = (data)=>{
    const currCrm = CRMList?.find((grp)=>grp?.id === Number(data.id))?.id
    setSelectedGroup(currCrm)
  }

  const handleSelectStage = (id)=>{
    setSelectedStage(id)
  }

  useEffect(() => {
    setPreSelecetdMessage(messageData)
  }, [messageData])

  const preSelectedData = async ()=>{
 
    try {
      const response = await fetchBirthdayData();
      if (response?.status === 200) {
        const data =response?.data?.data
        let action = data?.action ? JSON.parse(data?.action) :null
        setSelectedWishType(data.type || "message")
        setSelectedStrategy(data?.birthday_type || "today")
        setSelectedTag(data?.prospect || "yes")
        setMessageData(data?.newMessage)
        setSelectedGroup(action?.moveGroupId || null)
        setSelectedStage(action?.moveStageId || null)
     
      }
    } catch (error) {
      console.error(
        "Failed to fetch pre-settings:",
        error.response?.data || error.message
      );
    }
  }


  const createBithday =async () =>{
    const actionData = {
      moveStageId:selectedStage,
      moveGroupId:selectedGroup
    }
        const params = {
      type: selectedWishType,
      birthday_type: selectedStrategy,
      birthday_id: messageData?.id || null,
      action: actionData ? JSON.stringify(actionData) : "",
      prospect:selectedTag
  };


  const res = await saveBirthdayData(params)
  if (res?.status === 200) {
    message.success("Birthday Created Successfully")
  }
  }
  
  const findCrm = CRMList?.find((crm)=> crm.id === selectedGroup)
  

  return (
    <Layout>
    <div>
    {birthdayLoader && <div className="absolute z-10 w-[85%] h-full bg-white/50 flex items-center justify-center"> <Spin size="large" /> </div>}

    <h2 className="text-[24px] font-[500] mb-4">Wish your friends birthday automatically</h2>
      <div className="bg-white p-6 border border-[#DADADA] rounded-lg shadow-md mx-auto ">
        
        {/* Wish Type Selector */}
        <WishTypeSelector 
          selectedWishType={selectedWishType} 
          setSelectedWishType={setSelectedWishType}
        />

        {/* Select the strategy */}
        <Strategy setSelectedStrategy={setSelectedStrategy} selectedStrategy={selectedStrategy} />

        <div className="grid grid-cols-2 gap-6 mb-4">
          {/* Add Tag */}
          <AddTag 
            selectedTag={selectedTag} 
            setSelectedTag={setSelectedTag} 
          />
          {/* Select Group */}
         { selectedTag === "yes" &&<div className="border border-gray-300 p-4 rounded-lg">
            

            <div class="flex items-center gap-[6px] mb-4">
              <p className="text-xl mb-0 text-gray-800 font-[500]">{t("prospecting.Select Group")}</p>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.9987 13.1666C10.4045 13.1666 13.1654 10.4057 13.1654 6.99992C13.1654 3.59416 10.4045 0.833252 6.9987 0.833252C3.59294 0.833252 0.832031 3.59416 0.832031 6.99992C0.832031 10.4057 3.59294 13.1666 6.9987 13.1666Z" stroke="black" stroke-opacity="0.75" stroke-width="0.9"></path><path d="M7 6.87524V10.2086" stroke="black" stroke-opacity="0.75" stroke-linecap="round"></path><path d="M6.9974 5.45866C7.45763 5.45866 7.83073 5.08556 7.83073 4.62533C7.83073 4.16509 7.45763 3.79199 6.9974 3.79199C6.53716 3.79199 6.16406 4.16509 6.16406 4.62533C6.16406 5.08556 6.53716 5.45866 6.9974 5.45866Z" fill="black" fill-opacity="0.75"></path>
              </svg>
            </div>

            {/* Group Select */}
            <div className="flex flex-col gap-4">
                <Select
                    className="ctm-select-noBdr w-full rounded-lg bg-white border border-[#DADADA] px-4 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Select Group"
                    value={selectedGroup|| undefined}
                    onChange={(value) =>  handleSelectCRM(value)}
                    dropdownStyle={{ maxHeight: "200px", overflow: "auto" }} 
                    style={{ height: "50px" }} 
                >
                    {CRMList?.map((group) => (
                        <Option key={group.id} value={group.id} className="h-[50px] flex items-center px-4">
                            {group?.name}
                        </Option>
                    ))}
                </Select>

                {/* Stage Select */}
                <Select
                    className="w-full rounded-lg bg-white border border-[#DADADA] px-4 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Select Stage"
                    value={selectedStage}
                    onChange={(value) =>  handleSelectStage(value)}
                    dropdownStyle={{ maxHeight: "200px", overflow: "auto" }}
                    style={{ height: "50px" }}
                >
                    {findCrm?.stage?.map((stage) => (
                        <Option key={stage.id} value={stage.id} className="h-[50px] flex items-center px-4">
                            {stage?.name}
                        </Option>
                    ))}
                </Select>
            </div>
        </div>}
        </div>

        {/* Select Message Template */}
        {/* <SelectMessageTemplate 
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          templates={templates}
        /> */}

        <div className="border border-[#DADADA] p-4 rounded-lg">
            <div class="flex items-center gap-[6px] mb-4">
              <p className="text-xl mb-0 font-[500]">{t("prospecting.Select Message")} Template</p>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.9987 13.1666C10.4045 13.1666 13.1654 10.4057 13.1654 6.99992C13.1654 3.59416 10.4045 0.833252 6.9987 0.833252C3.59294 0.833252 0.832031 3.59416 0.832031 6.99992C0.832031 10.4057 3.59294 13.1666 6.9987 13.1666Z" stroke="black" stroke-opacity="0.75" stroke-width="0.9"></path><path d="M7 6.87524V10.2086" stroke="black" stroke-opacity="0.75" stroke-linecap="round"></path>
                <path d="M6.9974 5.45866C7.45763 5.45866 7.83073 5.08556 7.83073 4.62533C7.83073 4.16509 7.45763 3.79199 6.9974 3.79199C6.53716 3.79199 6.16406 4.16509 6.16406 4.62533C6.16406 5.08556 6.53716 5.45866 6.9974 5.45866Z" fill="black" fill-opacity="0.75"></path>
              </svg>
              </div>

            <div
                className="w-full rounded-lg bg-white border cursor-pointer p-[11px] border-gray-300 px-4 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                style={{ height: "50px" }} 
                onClick={()=>setIsMessagePop(true)}
            >
              { messageData?.title || "Select Template"}
            </div>
        </div>


        {/* Send Birthday Wishes */}
        <div className="flex items-center justify-center">
          <button onClick={()=>createBithday()} className="w-fit py-3 mt-6 rounded-lg text-lg bg-green-500 text-white px-40 cursor-pointer">
            Send Birthday Wishes
          </button>
        </div>
      </div>

      {isMessagePop && (
        <MessagePopUp
          setIsPop={setIsMessagePop}
          messageList={tempMessageList}
          setMessageData={setMessageData}
          preSelecetdMessage={preSelecetdMessage}
          loading={tempMessageLoader}
        />
      )}
    </div>
    </Layout>
  );
};

export default Birthday;
