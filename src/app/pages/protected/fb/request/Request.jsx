import { useEffect, useState } from "react";
import "./Request.css";
import MessagePopUp from "../../../../components/message/common/messagePop/messagePopUp";
import { useTranslation } from "react-i18next";
import Layout from "../../Layout";
import useMessageSteps from "../../../../../store/messageTemp/MessageTemp";
import usefbCRM from "../../../../../store/fb/fbCRM";
import { message, Spin } from "antd";
import useRequestStore from "../../../../../store/fb/request";

const Request = () => {
  const {
    fetchMessages,
    tempMessageList,
    tempMessageLoader,
  } = useMessageSteps();
  const {fetchCRMGroups,CRMList,fbCRMLoading}=usefbCRM()
  const {fetchRequestData,requestLoader,saveRequestData}=useRequestStore()

  const [acceptedData, setAcceptedData] = useState({
    selectedMessage: 0,
    isTag: "yes",
    selectedGroup: 0,
    selecetdStage: 0,
  });
  const [rejectedData, setRejecetdData] = useState({
    selectedMessage: 0,
    isTag: "yes",
    selectedGroup: 0,
    selecetdStage: 0,
  });
  const [groupData, setGroupData] = useState([]);
  const [isMessagePop, setIsMessagePop] = useState(false);
  const [messageData, setMessageData] = useState(false);
  const [messageType, setMessageType] = useState(1);
  const [preSelecetdMessage, setPreSelecetdMessage] = useState(null);
  const {t} = useTranslation()


 

   

  const handleMessagePOP = (type) => {
    if (type) {
      setPreSelecetdMessage(acceptedData?.selectedMessage);
    } else {
      setPreSelecetdMessage(rejectedData?.selectedMessage);
    }
    setIsMessagePop(true);
    setMessageType(type);
  };

  const handleSubmit = async () => {
    let params = {
      accept_message_id: Number(acceptedData?.selectedMessage?.id || 0),
      accept_group_id:
        acceptedData?.isTag === "yes" ? Number(acceptedData?.selectedGroup) : 0,
      accept_stage_id:
        acceptedData?.isTag === "yes" ? Number(acceptedData?.selecetdStage) : 0,
      reject_message_id: Number(rejectedData?.selectedMessage?.id || 0),
      reject_group_id:
        rejectedData?.isTag === "yes" ? Number(rejectedData?.selectedGroup) : 0,
      reject_stage_id:
        rejectedData?.isTag === "yes" ? Number(rejectedData?.selecetdStage) : 0,
    };
    try {
      const res = await saveRequestData(params);
      if (res.status === 200) {
        message.success("Data has been saved")
      }
    } catch (error) {}

    // Add your logic to submit the selected values to your backend or perform any other actions
  };

  const handleTags = (value, type) => {

    const checkGroup = value === "yes" ? true : false;
    if (type) {
      setAcceptedData((data) => ({
        ...data,
        isTag: value,
        selectedGroup: checkGroup ? data?.selectedGroup : 0,
        selecetdStage: checkGroup ? data?.selecetdStage : 0,
      }));
    } else {
      setRejecetdData((data) => ({
        ...data,
        isTag: value,
        selectedGroup: checkGroup ? data?.selectedGroup : 0,
        selecetdStage: checkGroup ? data?.selecetdStage : 0,
      }));
    }
  };

  const preSelectedSettings = async () => {
    try {
      const response = await fetchRequestData();
      console.log(response)
      if (response?.data?.data !== undefined) {
        setAcceptedData({
          selectedMessage: response?.data?.data?.accept_new_message,
          isTag: response?.data?.data?.accept_group_id ? "yes" : "no",
          selectedGroup: response?.data?.data?.accept_group_id,
          selecetdStage: response?.data?.data?.accept_stage_id,
        });
        setRejecetdData({
          selectedMessage: response?.data?.data?.reject_new_message,
          isTag: response?.data?.data?.reject_group_id ? "yes" : "no",
          selectedGroup: response?.data?.data?.reject_group_id,
          selecetdStage: response?.data?.data?.reject_stage_id,
        });
      }
    } catch (error) {
      console.error(
        "Failed to fetch pre-settings:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchCRMGroups({data: {}, type: "fb"});
    fetchMessages({limit:200,page:1});
    preSelectedSettings();
  }, []);

  useEffect(() => {
    if (messageType) {
      setAcceptedData((prev) => ({ ...prev, selectedMessage: messageData }));
    } else {
      setRejecetdData((prev) => ({ ...prev, selectedMessage: messageData }));
    }
  }, [messageData]);

  useEffect(() => {
    setGroupData(CRMList)
  }, [CRMList])
  
  return (
    <Layout>
    { requestLoader && <div className="absolute z-10 w-[84%] h-full bg-white/50 flex items-center justify-center">
      <Spin size="large"/>
    </div>}
      <div className="nw-manage-requests">
        <div>
        
        <input type="hidden" id="requestAcceptMsg" value={acceptedData?.selectedMessage?.id || ""}/>
        <input type="hidden" id="requestAcceptTag" value={acceptedData?.isTag} />
        <input type="hidden" id="requestAcceptGroup" value={acceptedData?.selectedGroup || 0} />
        <input type="hidden" id="requestAcceptStage" value={acceptedData?.selecetdStage || 0} />
        <input type="hidden" id="requestDeclineMsg" value={rejectedData?.selectedMessage?.id || ""}/>
        <input type="hidden" id="requestDeclineTag" value={rejectedData?.isTag} />
        <input type="hidden" id="requestDeclineGroup" value={rejectedData?.selectedGroup || 0} />
        <input type="hidden" id="requestDeclineStage" value={rejectedData?.selecetdStage || 0} />

          <h1 className="text-2xl font-[500] mb-4">
             {t("FB_request.Auto-Reply to Requests")}
          </h1>
          <div className="nv-content-wrapper"></div> {/* to display account syncing message */}
          <div className="border border-[#DADADA] px-5 pt-7.5 pb-8  bg-white rounded-[8px] mb-7">
            <div className="border border-[#DADADA] p-4 bg-white rounded-[8px] mb-6">
              <h1 className="text-xl font-[500] flex items-center gap-[10px] mb-6">
              {t("FB_request.When a request is accepted")} :
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_2388_708)">
                    <path
                      d="M10.5007 0.15625C7.48375 0.15625 5.06275 2.22825 5.06275 6.18825C5.06275 8.77425 6.09275 11.4082 7.65675 13.0312C8.26675 14.6543 7.16675 15.2582 6.93875 15.3442C3.78175 16.5023 0.09375 18.6022 0.09375 20.6882V21.4683C0.09375 24.3113 5.50775 24.9683 10.5307 24.9683C11.6255 24.966 12.7199 24.9246 13.8117 24.8442C12.4446 23.4012 11.6842 21.4881 11.6877 19.5002C11.6877 17.7092 12.2977 16.0682 13.3117 14.7502C13.1617 14.3982 13.1017 13.8433 13.3747 13.0002C14.9297 11.3752 15.9377 8.76425 15.9377 6.18725C15.9377 2.22825 13.5137 0.15725 10.4997 0.15725L10.5007 0.15625ZM19.5007 13.1873C17.8266 13.1873 16.221 13.8523 15.0371 15.0361C13.8533 16.22 13.1882 17.8256 13.1882 19.4998C13.1882 21.1739 13.8533 22.7795 15.0371 23.9634C16.221 25.1472 17.8266 25.8123 19.5007 25.8123C21.1749 25.8123 22.7805 25.1472 23.9644 23.9634C25.1482 22.7795 25.8132 21.1739 25.8132 19.4998C25.8132 17.8256 25.1482 16.22 23.9644 15.0361C22.7805 13.8523 21.1749 13.1873 19.5007 13.1873ZM18.6257 16.0002H20.3757V18.5942H22.9697V20.4062H20.3757V23.0002H18.6257V20.4062H16.0007V18.5942H18.6257V16.0002Z"
                      fill="#21BF7C"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2388_708">
                      <rect width="26" height="26" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </h1>

              <div
                onClick={() => handleMessagePOP(1)}
                className="w-full border border-[#DADADA] bg-white p-2 rounded-[10px] text-[#808183] min-h-[48px] outline-none focus:outline-none text-[14px] font-normal leading-[21px] p-[13px]"
              >
                {acceptedData?.selectedMessage
                  ? acceptedData.selectedMessage?.title
                  : "No message selected"}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] mt-7 mb-3">
                <div className="border border-[#DADADA] bg-white px-4 py-3 rounded-[6px]">
                  <h1 className="text-xl font-[500] mb-3 flex items-center gap-[10px]">
                  {t("FB_request.Do you want to add a tag?")} 
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.0026 14.1666C11.4084 14.1666 14.1693 11.4057 14.1693 7.99992C14.1693 4.59416 11.4084 1.83325 8.0026 1.83325C4.59685 1.83325 1.83594 4.59416 1.83594 7.99992C1.83594 11.4057 4.59685 14.1666 8.0026 14.1666Z"
                        stroke="black"
                        strokeOpacity="0.75"
                        stroke-width="0.9"
                      />
                      <path
                        d="M8 7.87524V11.2086"
                        stroke="black"
                        strokeOpacity="0.75"
                        stroke-linecap="round"
                      />
                      <path
                        d="M8.00521 6.45866C8.46545 6.45866 8.83854 6.08556 8.83854 5.62533C8.83854 5.16509 8.46545 4.79199 8.00521 4.79199C7.54497 4.79199 7.17188 5.16509 7.17188 5.62533C7.17188 6.08556 7.54497 6.45866 8.00521 6.45866Z"
                        fill="black"
                        fillOpacity="0.75"
                      />
                    </svg>
                  </h1>
                  <div className="tag-check relative mb-2">
                    <input
                      type="radio"
                      name="tags"
                      value={"yes"}
                      id="yes"
                      checked={acceptedData.isTag === "yes"}
                      onChange={(e) => handleTags(e.target.value, 1)}
                    />
                    <label
                      className="flex items-center justify-center border border-[#0087FF] text-[#0087FF] bg-white font-normal text-[16px] leading-[22px] p-3 w-full rounded-[10px]"
                      htmlFor="yes"
                    >
                    {t("FB_request.Yes")}  
                    </label>
                    <div className="checkmark absolute -top-2 -right-2 z-2 bg-white rounded-full">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clipRule="evenodd"
                          d="M0 10C0 7.34784 1.05357 4.8043 2.92893 2.92893C4.8043 1.05357 7.34784 0 10 0C12.6522 0 15.1957 1.05357 17.0711 2.92893C18.9464 4.8043 20 7.34784 20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20C7.34784 20 4.8043 18.9464 2.92893 17.0711C1.05357 15.1957 0 12.6522 0 10ZM9.42933 14.28L15.1867 7.08267L14.1467 6.25067L9.23733 12.3853L5.76 9.488L4.90667 10.512L9.42933 14.28Z"
                          fill="#0087FF"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="tag-check relative">
                    <input
                      type="radio"
                      name="tags"
                      id="no"
                      value={"no"}
                      checked={acceptedData.isTag === "no"}
                      onChange={(e) =>
                        setAcceptedData((data) => ({
                          ...data,
                          isTag: e.target.value,
                        }))
                      }
                    />
                    <label
                      className="flex items-center justify-center border border-[#0087FF] text-[#0087FF] bg-white font-normal text-[16px] leading-[22px] p-3 w-full rounded-[10px]"
                      htmlFor="no"
                    >
                    {t("FB_request.No")}  
                    </label>
                    <div className="checkmark absolute -top-2 -right-2 z-2 bg-white rounded-full">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clipRule="evenodd"
                          d="M0 10C0 7.34784 1.05357 4.8043 2.92893 2.92893C4.8043 1.05357 7.34784 0 10 0C12.6522 0 15.1957 1.05357 17.0711 2.92893C18.9464 4.8043 20 7.34784 20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20C7.34784 20 4.8043 18.9464 2.92893 17.0711C1.05357 15.1957 0 12.6522 0 10ZM9.42933 14.28L15.1867 7.08267L14.1467 6.25067L9.23733 12.3853L5.76 9.488L4.90667 10.512L9.42933 14.28Z"
                          fill="#0087FF"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                {acceptedData?.isTag === "yes" ? (
                  <div className="border border-[#DADADA] bg-white px-4 py-3 rounded-[6px] ">
                  <div className="flex items-baseline gap-[10px]">
                   <h1 className="text-xl font-[500] mb-3 flex items-center gap-[10px]">
                    {t("FB_request.Select Group")} 
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.0026 14.1666C11.4084 14.1666 14.1693 11.4057 14.1693 7.99992C14.1693 4.59416 11.4084 1.83325 8.0026 1.83325C4.59685 1.83325 1.83594 4.59416 1.83594 7.99992C1.83594 11.4057 4.59685 14.1666 8.0026 14.1666Z"
                          stroke="black"
                          strokeOpacity="0.75"
                          stroke-width="0.9"
                        />
                        <path
                          d="M8 7.87524V11.2086"
                          stroke="black"
                          strokeOpacity="0.75"
                          stroke-linecap="round"
                        />
                        <path
                          d="M8.00521 6.45866C8.46545 6.45866 8.83854 6.08556 8.83854 5.62533C8.83854 5.16509 8.46545 4.79199 8.00521 4.79199C7.54497 4.79199 7.17188 5.16509 7.17188 5.62533C7.17188 6.08556 7.54497 6.45866 8.00521 6.45866Z"
                          fill="black"
                          fillOpacity="0.75"
                        />
                      </svg>
                    </h1>

                    {fbCRMLoading && <Spin size="small"/>}
                   </div>
                   <div className={`${fbCRMLoading && "opacity-50"}`}>
                    <select
                      value={acceptedData?.selectedGroup || 0}
                      onChange={(e) =>
                        setAcceptedData((data) => ({
                          ...data,
                          selectedGroup: e.target.value,
                        }))
                      }
                      className="w-full border border-[#DADADA] bg-white p-2 rounded-[10px] text-[#808183] min-h-[48px] outline-none focus:outline-none text-[14px] font-normal leading-[21px] mb-2"
                    >
                      <option value={0}>{t("FB_request.Select Group")} </option>
                      {groupData?.map((grp) => {
                        return <option key={grp?.id} value={grp?.id}>{grp?.name}</option>;
                      })}
                    </select>
                    <select
                      value={acceptedData?.selecetdStage || 0}
                      onChange={(e) =>
                        setAcceptedData((data) => ({
                          ...data,
                          selecetdStage: e.target.value,
                        }))
                      }
                      className="w-full border border-[#DADADA] bg-white p-2 rounded-[10px] text-[#808183] min-h-[48px] outline-none focus:outline-none text-[14px] font-normal leading-[21px]"
                    >
                      <option value={0}> {t("FB_request.Select Stage")}</option>
                      {groupData
                        ?.find((grps) => grps.id == acceptedData?.selectedGroup)
                        ?.stage?.map((stg) => {
                          return <option  key={stg?.id} value={stg?.id}>{stg?.name}</option>;
                        })}
                    </select>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="border border-[#DADADA] p-4 bg-white rounded-[8px]">
              <h1 className="text-xl font-[500] mb-3 flex items-center gap-[10px] mb-6">
              {t("FB_request.When a request is declined")} :
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_2389_1302)">
                    <path
                      d="M10.5007 0.156006C7.48375 0.156006 5.06275 2.22801 5.06275 6.18801C5.06275 8.77401 6.09275 11.408 7.65675 13.031C8.26675 14.654 7.16675 15.258 6.93875 15.344C3.78175 16.502 0.09375 18.602 0.09375 20.688V21.468C0.09375 24.311 5.50775 24.968 10.5307 24.968C11.6255 24.9657 12.7199 24.9244 13.8117 24.844C12.4446 23.401 11.6842 21.4878 11.6877 19.5C11.6877 17.709 12.2977 16.068 13.3117 14.75C13.1617 14.398 13.1017 13.843 13.3747 13C14.9297 11.375 15.9377 8.76401 15.9377 6.18701C15.9377 2.22801 13.5137 0.157006 10.4997 0.157006L10.5007 0.156006Z"
                      fill="#FF0000"
                    />
                    <path
                      d="M23.1943 15.2686C22.0622 14.1365 20.5268 13.5005 18.9258 13.5005C17.3248 13.5005 15.7893 14.1365 14.6572 15.2686C13.5251 16.4006 12.8891 17.9361 12.8891 19.5371C12.8891 21.1381 13.5251 22.6736 14.6572 23.8057C15.7893 24.9378 17.3248 25.5738 18.9258 25.5738C20.5268 25.5738 22.0622 24.9378 23.1943 23.8057C24.3264 22.6736 24.9624 21.1381 24.9624 19.5371C24.9624 17.9361 24.3264 16.4006 23.1943 15.2686ZM20.7005 16.579L21.8838 17.7624L20.1298 19.5165L21.8838 21.2706L20.6586 22.4959L18.9045 20.7418L17.1504 22.4959L15.967 21.3125L17.7211 19.5584L15.9461 17.7834L17.1714 16.5581L18.9464 18.3331L20.7005 16.579Z"
                      fill="#FF0000"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2389_1302">
                      <rect width="26" height="26" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </h1>
              
              <div
                onClick={() => handleMessagePOP(0)}
                className="w-full border border-[#DADADA] bg-white p-2 rounded-[6px] text-[#808183] min-h-[48px] outline-none focus:outline-none text-[14px] font-normal leading-[21px] p-[13px]"
              >
                {rejectedData?.selectedMessage
                  ? rejectedData.selectedMessage?.title
                  : "No message selected"}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] mt-7">
                <div className="border border-[#DADADA] bg-white p-4 rounded-[6px]">
                  <h1 className="text-xl font-[500] mb-3 flex items-center gap-[10px]">
                  {t("FB_request.Do you want to add a tag?")} 
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.0026 14.1666C11.4084 14.1666 14.1693 11.4057 14.1693 7.99992C14.1693 4.59416 11.4084 1.83325 8.0026 1.83325C4.59685 1.83325 1.83594 4.59416 1.83594 7.99992C1.83594 11.4057 4.59685 14.1666 8.0026 14.1666Z"
                        stroke="black"
                        strokeOpacity="0.75"
                        stroke-width="0.9"
                      />
                      <path
                        d="M8 7.87524V11.2086"
                        stroke="black"
                        strokeOpacity="0.75"
                        stroke-linecap="round"
                      />
                      <path
                        d="M8.00521 6.45866C8.46545 6.45866 8.83854 6.08556 8.83854 5.62533C8.83854 5.16509 8.46545 4.79199 8.00521 4.79199C7.54497 4.79199 7.17188 5.16509 7.17188 5.62533C7.17188 6.08556 7.54497 6.45866 8.00521 6.45866Z"
                        fill="black"
                        fillOpacity="0.75"
                      />
                    </svg>
                  </h1>
                  <div className="tag-check relative mb-2">
                    <input
                      type="radio"
                      name="tags2"
                      id="yes2"
                      value={"yes"}
                      checked={rejectedData.isTag === "yes"}
                      onChange={(e) =>
                        setRejecetdData((data) => ({
                          ...data,
                          isTag: e.target.value,
                        }))
                      }
                    />
                    <label
                      className="flex items-center justify-center border border-[#0087FF] text-[#0087FF] bg-white font-normal text-[16px] leading-[22px] p-3 w-full rounded-[10px]"
                      htmlFor="yes2"
                    >
                    {t("FB_request.Yes")} 
                    </label>
                    <div className="checkmark absolute -top-2 -right-2 z-2 bg-white rounded-full">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clipRule="evenodd"
                          d="M0 10C0 7.34784 1.05357 4.8043 2.92893 2.92893C4.8043 1.05357 7.34784 0 10 0C12.6522 0 15.1957 1.05357 17.0711 2.92893C18.9464 4.8043 20 7.34784 20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20C7.34784 20 4.8043 18.9464 2.92893 17.0711C1.05357 15.1957 0 12.6522 0 10ZM9.42933 14.28L15.1867 7.08267L14.1467 6.25067L9.23733 12.3853L5.76 9.488L4.90667 10.512L9.42933 14.28Z"
                          fill="#0087FF"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="tag-check relative">
                    <input
                      type="radio"
                      name="tags2"
                      id="no2"
                      value={"no"}
                      checked={rejectedData.isTag === "no"}
                      onChange={(e) =>
                        setRejecetdData((data) => ({
                          ...data,
                          isTag: e.target.value,
                        }))
                      }
                    />
                    <label
                      className="flex items-center justify-center border border-[#0087FF] text-[#0087FF] bg-white font-normal text-[16px] leading-[22px] p-3 w-full rounded-[10px]"
                      htmlFor="no2"
                    >
                   {t("FB_request.No")}   
                    </label>
                    <div className="checkmark absolute -top-2 -right-2 z-2 bg-white rounded-full">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clipRule="evenodd"
                          d="M0 10C0 7.34784 1.05357 4.8043 2.92893 2.92893C4.8043 1.05357 7.34784 0 10 0C12.6522 0 15.1957 1.05357 17.0711 2.92893C18.9464 4.8043 20 7.34784 20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20C7.34784 20 4.8043 18.9464 2.92893 17.0711C1.05357 15.1957 0 12.6522 0 10ZM9.42933 14.28L15.1867 7.08267L14.1467 6.25067L9.23733 12.3853L5.76 9.488L4.90667 10.512L9.42933 14.28Z"
                          fill="#0087FF"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                {rejectedData?.isTag === "yes" ? (
                  <div className="border border-[#DADADA] bg-white p-4 rounded-[6px]">
                   <div className="flex items-baseline gap-[10px]">
                   <h1 className="text-xl font-[500] mb-3 flex items-center gap-[10px]">
                    {t("FB_request.Select Group")} 
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.0026 14.1666C11.4084 14.1666 14.1693 11.4057 14.1693 7.99992C14.1693 4.59416 11.4084 1.83325 8.0026 1.83325C4.59685 1.83325 1.83594 4.59416 1.83594 7.99992C1.83594 11.4057 4.59685 14.1666 8.0026 14.1666Z"
                          stroke="black"
                          strokeOpacity="0.75"
                          stroke-width="0.9"
                        />
                        <path
                          d="M8 7.87524V11.2086"
                          stroke="black"
                          strokeOpacity="0.75"
                          stroke-linecap="round"
                        />
                        <path
                          d="M8.00521 6.45866C8.46545 6.45866 8.83854 6.08556 8.83854 5.62533C8.83854 5.16509 8.46545 4.79199 8.00521 4.79199C7.54497 4.79199 7.17188 5.16509 7.17188 5.62533C7.17188 6.08556 7.54497 6.45866 8.00521 6.45866Z"
                          fill="black"
                          fillOpacity="0.75"
                        />
                      </svg>
                    </h1>

                    {fbCRMLoading && <Spin size="small"/>}
                   </div>
                   <div className={`${fbCRMLoading && "opacity-50"}`}>
                    <select
                      value={rejectedData?.selectedGroup || 0}
                      onChange={(e) =>
                        setRejecetdData((data) => ({
                          ...data,
                          selectedGroup: Number(e.target.value),
                        }))
                      }
                      className="w-full border border-[#DADADA] bg-white p-2 rounded-[10px] text-[#808183] min-h-[48px] outline-none focus:outline-none text-[14px] font-normal leading-[21px] mb-2"
                    >
                      <option value={0}>{t("FB_request.Select Group")}</option>
                      {groupData?.map((grp) => {
                        return <option key={grp?.id} value={grp?.id}>{grp?.name}</option>;
                      })}
                    </select>
                    <select
                      value={rejectedData?.selecetdStage || 0}
                      onChange={(e) =>
                        setRejecetdData((data) => ({
                          ...data,
                          selecetdStage:Number(e.target.value),
                        }))
                      }
                      className="w-full border border-[#DADADA] bg-white p-2 rounded-[10px] text-[#808183] min-h-[48px] outline-none focus:outline-none text-[14px] font-normal leading-[21px]"
                    >
                      <option value={0}>{t("FB_request.Select Stage")}</option>

                      {groupData
                        ?.find((grps) => grps.id == rejectedData?.selectedGroup)
                        ?.stage?.map((stg) => {
                          return <option key={stg?.id} value={stg?.id}>{stg?.name}</option>;
                        })}
                    </select>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <button
              onClick={() => handleSubmit()}

              className="bg-[#21BF7C] text-white rounded-[10px] font-[500] text-[14px] leading-[21px] px-6 py-3 min-h-[48px] w-full max-w-[325px] mt-6bg-[#21BF7C] hover:bg-[#15AE6D] text-white rounded-[10px] font-bold text-[14px] leading-[21px] px-6 py-3 min-h-[48px] w-full max-w-[325px] mt-6 cursor-pointer transition duration-250 start-manage-request"

            >
             {t("FB_request.Save & Check Requests")} 
            </button>
          </div>
          <h1 className="text-[24px] font-[500] mb-4">{t("FB_request.Pending Requests Sent")}</h1>
          <div className="border border-[#DADADA] p-4 pb-7 bg-white rounded-[8px]">
            <h1 className="text-[20px] font-[500] mb-3 flex items-center gap-[10px] mb-6">
            {t("FB_request.do_you_delete_all")} 
            </h1>
                  
            <button className="flex items-center justify-center gap-[8px]  bg-[#FF0000] hover:bg-[#F40000] text-white rounded-[10px] font-[500] text-[14px] leading-[21px] px-6 py-3 min-h-[48px] w-full max-w-[325px] mt-6 cursor-pointer transition duration-250" id="delete_pending_request">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clipRule="evenodd"
                  d="M18.412 6.5L17.611 20.117C17.5812 20.6264 17.3577 21.1051 16.9865 21.4551C16.6153 21.8052 16.1243 22.0001 15.614 22H8.386C7.87575 22.0001 7.38475 21.8052 7.0135 21.4551C6.64226 21.1051 6.41885 20.6264 6.389 20.117L5.59 6.5H3.5V5.5C3.5 5.36739 3.55268 5.24021 3.64645 5.14645C3.74021 5.05268 3.86739 5 4 5H20C20.1326 5 20.2598 5.05268 20.3536 5.14645C20.4473 5.24021 20.5 5.36739 20.5 5.5V6.5H18.412ZM10 2.5H14C14.1326 2.5 14.2598 2.55268 14.3536 2.64645C14.4473 2.74021 14.5 2.86739 14.5 3V4H9.5V3C9.5 2.86739 9.55268 2.74021 9.64645 2.64645C9.74021 2.55268 9.86739 2.5 10 2.5ZM9 9L9.5 18H11L10.6 9H9ZM13.5 9L13 18H14.5L15 9H13.5Z"
                  fill="white"
                />
              </svg>
              {t("FB_request.Delete All")} 
            </button>
          </div>
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
    </Layout>
  );
};

export default Request;
