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
import { TickFillIcon } from "../../../common/icons/icons";
import "./wishbirthday.css";

const Birthday = () => {
  const {
    fetchMessagesNew,
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
  const reTargetUserData = [
    {
        label: "Yes",
        value: "yes"
    },
    {
        label: "No",
        value: "no"
    }
];
 const [prospect , setProspect] = useState("no");
 const [isApi,setIsApi]=useState(0)


 

  useEffect(()=>{
    fetchMessagesNew({ page: 1, limit: 200 }, "", null, "birthday");
    fetchCRMGroups({data: {}, type: "fb"})
    preSelectedData()
  },[])

  const handleSelectCRM = (data)=>{
    const currCrm = CRMList?.find((grp)=>grp?.id === data)?.id
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
        setSelectedTag(action?.moveGroupId  ? "yes":"no")
        setMessageData(data?.newMessage)
        setSelectedGroup(action?.moveGroupId || null)
        setSelectedStage(action?.moveStageId || null)
        setProspect(data?.prospect || "no")
     
      }
    } catch (error) {
      console.error(
        "Failed to fetch pre-settings:",
        error.response?.data || error.message
      );
    }
  }


  const createBithday =async () =>{
    let actionData = {
      moveStageId:selectedStage,
      moveGroupId:selectedGroup
    }
     actionData= actionData ? JSON.stringify(actionData) : ""
        const params = {
      type: selectedWishType,
      birthday_type: selectedStrategy,
      birthday_id: messageData?.id || null,
      action: selectedTag === "yes"?actionData:"" ,
      prospect:prospect
  };


  const res = await saveBirthdayData(params)
  if (res?.status === 200) {
    message.success("Birthday Created Successfully")
    setIsApi(1)
  }
  }
  
  const findCrm = CRMList?.find((crm)=> crm.id === selectedGroup)
  

  return (
    <Layout>
    <div>
    {birthdayLoader && <div className="absolute z-10 w-[85%] h-full bg-white/50 flex items-center justify-center"> <Spin size="large" /> </div>}
    <input type="hidden" id="birthdayType" value={selectedWishType} />
    <input type="hidden" id="birthdayStrategy" value={selectedStrategy} />
    <input type="hidden" id="birthdayAddTag" value={selectedTag} />
    <input type="hidden" id="birthdaySelectedGroup" value={selectedGroup} />
    <input type="hidden" id="birthdaySelectedStage" value={selectedStage} />
    <input type="hidden" id="birthdayMessage" value={messageData?.id || ""} />
    <h2 className="text-[24px] font-[500] mb-5">Wish your friends birthday automatically</h2>
      <div class="nv-content-wrapper"></div> {/* to display account syncing message */}
      <div className="bg-white px-5 pt-4.5 pb-8 rounded-[10px] mx-auto border border-[#DADADA]">
        
        {/* Wish Type Selector */}
        <WishTypeSelector 
          selectedWishType={selectedWishType} 
          setSelectedWishType={setSelectedWishType}
        />

        {/* Select the strategy */}
        <Strategy setSelectedStrategy={setSelectedStrategy} selectedStrategy={selectedStrategy} />

        <div className="grid grid-cols-2 gap-7.5 mb-6 ">
          {/* Add Tag */}
          <AddTag 
            selectedTag={selectedTag} 
            setSelectedTag={setSelectedTag} 
          />
          {/* Select Group */}
         { selectedTag === "yes" &&<div className=" border border-gray-300 p-4 rounded-[6px]">
            

            <div class="flex items-center gap-[6px] mb-4">
              <p className="text-xl mb-0 text-gray-800 font-[500]">{t("prospecting.Select Group")}</p>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.9987 13.1666C10.4045 13.1666 13.1654 10.4057 13.1654 6.99992C13.1654 3.59416 10.4045 0.833252 6.9987 0.833252C3.59294 0.833252 0.832031 3.59416 0.832031 6.99992C0.832031 10.4057 3.59294 13.1666 6.9987 13.1666Z" stroke="black" stroke-opacity="0.75" stroke-width="0.9"></path><path d="M7 6.87524V10.2086" stroke="black" stroke-opacity="0.75" stroke-linecap="round"></path><path d="M6.9974 5.45866C7.45763 5.45866 7.83073 5.08556 7.83073 4.62533C7.83073 4.16509 7.45763 3.79199 6.9974 3.79199C6.53716 3.79199 6.16406 4.16509 6.16406 4.62533C6.16406 5.08556 6.53716 5.45866 6.9974 5.45866Z" fill="black" fill-opacity="0.75"></path>
              </svg>
            </div>

            {/* Group Select */}
            <div className="flex flex-col gap-2.5 ctm-nobdr-select">
                <Select
                    className="ctm-select-noBdr w-full rounded-[10px] bg-white border border-[#F0F0F0] px-4 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                    className="w-full rounded-[10px] bg-white border border-[#F0F0F0] px-4 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
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

       
        <div className="border border-gray-300 px-4 pt-4 pb-3 rounded-[6px] mb-4">
            <p className="font-[500] text-[20px] text-gray-800 mb-2 flex items-center">
                Retarget same user
            </p>
            <div className="grid grid-cols-2 gap-6">
                {reTargetUserData.map((option) => (
                    <button
                        key={option.value}
                        className={`relative flex items-center justify-center px-4 py-3 rounded-[10px] border text-[#0087FF] cursor-pointer ${prospect === option.value
                            ? "bg-[#CCE7FF] border-[#CCE7FF]"
                            : "bg-white border-[#0087FF]"
                            }`}
                        onClick={() => setProspect(option.value)}
                    >
                        {option.label}
                        {prospect === option.value && (
                            <span className="absolute -right-2 -top-2">
                                <TickFillIcon />
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </div>
        <div className="border border-[#DADADA] px-4 pt-4 pb-8 rounded-[6px]">
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
          <button onClick={()=>createBithday()} isapi={isApi} className="w-fit py-2 h-[52px] mt-9 rounded-lg text-[14px] bg-green-500 text-white px-37 cursor-pointer send_birthday_message">
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
