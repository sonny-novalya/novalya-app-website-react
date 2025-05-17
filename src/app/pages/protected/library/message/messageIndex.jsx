import React, { useEffect, useRef, useState } from "react";
import { Input, Button, List, Dropdown, Menu, message } from "antd";
import propSearch from "../../../../../assets/img/pros-serach-icon.svg";
import prospWhite from "../../../../../assets/img/prospection-white.svg";
import messangerIcon from "../../../../../assets/img/messanger.svg";
import messangerWhite from "../../../../../assets/img/messenger-white.svg";
import BdayIcon from "../../../../../assets/img/birth_cake.svg";
import BdayWhite from "../../../../../assets/img/birth_cake-white.svg";
import requestIcon from "../../../../../assets/img/user-add-fill.svg";
import requestWhite from "../../../../../assets/img/user-fill-white.svg";
import IgCrm from "../../../../../assets/img/ig-messnger.svg";
import IgCrmWhite from "../../../../../assets/img/messenger-white.svg";
import IgProsp from "../../../../../assets/img/ig-prospection.svg";
import {
  SearchOutlined,
  FilterOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { t } from "i18next";
import "./messageIndex.css";
import useMessageSteps from "../../../../../store/messageTemp/MessageTemp";
import { VerticalDotsIcon } from "../../../common/icons/icons";
import { useDebounce } from "../../../../../hooks/debounce";
import { CreateMessageIcon } from "../../../common/icons/messageIcons/MessageIcons";
const MessageIndex = () => {
  const {
    setIsMessage,
    setStep,
    fetchMessagesNew,
    messageList,
    setSelecetdMessage,
    loading,
    deleteMessages,
    setPreviewMessage,
    setBackStep,
    totalPages,
    duplicateMessage,
    searchKeyword,
    setSearchKeyword,
    setMessageList
  } = useMessageSteps(); 

  const [isDelete, setIsDelete] = useState(false);
  const [sort, setSort] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });
  const delTime = useRef();
  // const [query, setQuery] = useState('');
  const [visFilter, setVisFilter] = useState(null);
  const debouncedQuery = useDebounce(searchKeyword, 500);
  
  const getMsgFeature = (visibility) => {
    if(!visibility){
      return;
    }

    visibility = JSON.parse(visibility);
    // console.log(visibility[0])

    const matchedOption = visibilityOptions.find(option => option.id === visibility[0]);
    return matchedOption;
  }
  const renderPlatformButton = (visibility) => {
    if (!visibility) return null

    const feature = getMsgFeature(visibility)
    
    const platformClasses = feature?.platform === "facebook" ? 
      "!text-[#1877F2] !border-[#1877F2] shiv" : 
      "!text-[#f34e55] !border-[#f34e55]";
    return (
      <Button
        className={`${platformClasses} capitalize px-3 py-1 !rounded-[25px] !font-medium text-[14px] leading-[21px] tracking-normal gap-[4px] p-[6px_12px] flex !h-9`}
      >
        <img className="normalIcon" src={feature?.icon} />
        {feature?.label}
      </Button>
    );
  };

  useEffect(() => {
    return () => {
      setSearchKeyword(""); //to clear the search so when user comes again to the page it loads all data not the last search one
    };
  }, []);

  useEffect(() => {
    fetchMessagesNew(pagination,debouncedQuery,sort,(visFilter?.id || ""));
    setBackStep(null);
    setSelecetdMessage(null);
    setPreviewMessage(null);
  }, [pagination,debouncedQuery,sort,visFilter]);

 
 

  const handleEdit = (data) => {
    setSelecetdMessage(data);
    setIsMessage(true);
    setStep(7);
  };

  const handlePreview = (data ) => {
    setPreviewMessage(data);
    setIsMessage(true);
    setBackStep(0);
    setStep(5);
  };

  const handleDuplicate = async(data) => {
    const payload = {
      message_id: data.id
  }
  try{
    const res = await duplicateMessage(payload)
    if (res.status === 200) {
      message.success(res?.data?.message)
      fetchMessagesNew(pagination,debouncedQuery,sort,(visFilter?.id || ""));
    }else{
      message.error("Oops Something went wrong!")
    }
  }catch (error){
    message.error("Oops Something went wrong!")

  }

  };

  const handleDelete = async (id) => {
    if (!isDelete) {
      setIsDelete(true);
      delTime.current = setTimeout(() => {
        setIsDelete(false);
      }, 3000);
    } else {
      const res = await deleteMessages(id);
      if (res?.status === 200) {
        message.success("message Deleted");
        fetchMessagesNew(pagination,debouncedQuery,sort,(visFilter?.id || ""));
      } else {
        message.success("Oops Something went wrong");
      }
      clearIsDelete();
    }
  };

  const clearIsDelete = () => {
    setIsDelete(false);
    clearTimeout(delTime.current);
  };

  const DropdownMenu = ({ item, onDuplicate, onDelete }) => (
    <div
      className="bg-white rounded-md shadow-md p-2"
      onClick={(e) => e.stopPropagation()} // Prevent closing on click
    >
      <div
        onClick={() => onDuplicate(item)}
        className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
      >
        Duplicate
      </div>
      <div
        onClick={() => onDelete(item.id)}
        className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
      >
        {isDelete ? "Really?" : " Delete"}
      </div>
    </div>
  );

  const reanderPaginationButton = (num) => {
    const data =(num/pagination.limit) || 1
    num = Math.ceil(data) || 1
    const btnArray = Array(num).fill(null);

    return (
      <>
        {btnArray.map((_, i) => {
          return (
            <li className={`${pagination.page === i+1 && "active"} flex items-center justify-center w-6 h-6 border border-[#8C8C8C] font-medium text-[14px] rounded-[4px] hover:bg-[#0087FF] hover:text-white hover:border-[#008801]`}>
              <button
                onClick={() => setPagination({ ...pagination, page: i + 1 })}
              >
                {i + 1}
              </button>
            </li>
          );
        })}
      </>
    );
  };

  const getNumberOfPages = (totalItems) => {
    const data =(totalItems/pagination.limit) || 1;
    return Math.ceil(data) || 1;
  };

  const handleVisibilityChange = (data)=>{
    setVisFilter(data)
    console.log(data)
  }

  const getGroupedVisibilityOptions = (options) => {
    const grouped = {};
    options.forEach((option) => {
      if (!grouped[option.platform]) {
        grouped[option.platform] = [];
      }
      grouped[option.platform].push(option);
    });
    return Object.entries(grouped);
  };

  return (
    <>
      <div className="pl-10 pr-8 py-8 bg-[#f2f2f2] h-screen overflow-auto message-main-wraper">
        <div className="">
          <h1 className="text-[24px] font-[500] mb-4.5 mt-0">
            Messages Templates
          </h1>
          <div className="bg-white p-5 rounded-[16px]">
            <div className="flex justify-between items-center mb-4.5">
              <Input
                prefix={<SearchOutlined />}
                placeholder="Search"
                className="w-1/2 !rounded-[4px] min-h-[44px]"
                onChange={(e)=>setSearchKeyword(e.target.value)}
              />
              <div className="flex gap-2.5 ml-2.5">
            <div className="pros-dropdownWrap relative">
            <div className="pros-dropdown-text"> 
              <Button
                  // icon={<FilterOutlined />}
                  className="!text-[16px] !rounded-[4px] !p-2.5 min-h-[44px] min-w-[155px] !text-[#808183] justify-start"
                >
                  <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 1H4C2.586 1 1.879 1 1.44 1.412C1.001 1.824 1 2.488 1 3.815V4.505C1 5.542 1 6.061 1.26 6.491C1.52 6.921 1.993 7.189 2.942 7.723L5.855 9.363C6.491 9.721 6.81 9.9 7.038 10.098C7.512 10.509 7.804 10.993 7.936 11.588C8 11.872 8 12.206 8 12.873V15.543C8 16.452 8 16.907 8.252 17.261C8.504 17.616 8.952 17.791 9.846 18.141C11.725 18.875 12.664 19.242 13.332 18.824C14 18.406 14 17.452 14 15.542V12.872C14 12.206 14 11.872 14.064 11.587C14.1896 11.0042 14.5059 10.4798 14.963 10.097C15.19 9.9 15.509 9.721 16.145 9.362L19.058 7.722C20.006 7.189 20.481 6.922 20.74 6.492C21 6.062 21 5.542 21 4.504V3.814C21 2.488 21 1.824 20.56 1.412C20.122 1 19.415 1 18 1Z" stroke="#808183" stroke-width="1.5"/>
                  </svg>
                  <span className="flex-1 text-left">
                    {visFilter ? visFilter.label : 'Filter'}
                  </span>
                  <span className="filter-arrow">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.99951 3.1716L7.82797 0.343099L9.24219 1.7574L4.99951 6L0.756909 1.7574L2.17111 0.343098L4.99951 3.1716Z" fill="#8C8C8C"/>
                    </svg>
                  </span>
                </Button>
              </div>
              <div className="pros-dropdownCont absolute top-full left-0 w-full opacity-0 invisible bg-white pb-3 rounded-[10px]">
                {getGroupedVisibilityOptions(visibilityOptions).map(([platform, options]) => (
                  <div key={platform} className="mt-3 ">
                    {/* Platform Heading - no background, just light text + border */}
                    <div className="text-gray-500 text-sm font-semibold capitalize border-b border-gray-200 pb-1 mb-2 px-4">
                      {platform}
                    </div>
  
                    {/* List the options with indent */}
                    <div className="px-2">
                      {options.map((visibility) => (
                        <div
                          key={visibility.id}
                          onClick={() => handleVisibilityChange(visibility)}
                          className={`pros-dropdownItems min-h-[40px] flex items-center gap-2 px-[10px] py-2 rounded-md cursor-pointer hover:bg-[#0087FF] hover:text-white ${visibility.id == visFilter?.id ? "active bg-[#0087FF] text-white" : ""}`}
                        >
                          <img className="normalIcon" src={visibility.icon} />
                          <img className="normalIconHover" src={visibility.iconLight} />
                          <span className="flex-1 text-[14px]">
                            {t(`message.${visibility.label}`)}
                          </span>
                          <CreateMessageIcon index={2} />
                        </div>
                      ))}
                    </div> 
                  </div>
                ))}
                {/* {visibilityOptions?.map((visibility) => {
                  return (
                    <div
                    key={visibility.id}
                      onClick={() => handleVisibilityChange(visibility)}
                      className={`pros-dropdownItems min-h-[40px] flex items-center gap-2 px-[10px] py-2 rounded-md cursor-pointer hover:bg-[#0087FF] hover:text-white ${visibility.id == visFilter?.id ? "active bg-[#0087FF] text-white" : ""}`}
                    >
                      <img className="normalIcon" src={visibility.icon} />
                      <img
                        className="normalIconHover"
                        src={visibility.iconLight}
                      />
                      <span className="flex-1 text-[14px]">
                        {t(`message.${visibility.label}`)}  
                      </span>
                      <CreateMessageIcon index={2} />
                    </div>
                  );
                })} */}
              </div>
            </div>
            
      
              
                <Button
                  type="primary"
                  onClick={() => setIsMessage(true)}
                  className="!text-[16px] flex align-center gap-2.5 !rounded-[6px] px-4 min-h-[44px] min-w-[162px] !text-white"
                >
                  <span>+</span> Create New
                </Button>
              </div>
            </div>
            <div className="bg-[#E6F1FB] text-[14px] leading-[21px] tracking-[2%] flex items-center justify-between gap-[10px] px-5 py-[17px] mb-5">
              <div className="bg-[#E6F1FB] text-[14px] leading-[21px] tracking-[2%] flex items-center gap-[10px] text-[#000407]">
                Name
              <span onClick={()=>setSort(!sort)} className={`${ sort ?"rotate-180":""} cursor-pointer`}>

                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.062 12.0249L10.0036 17.0832L4.94531 12.0249"
                    stroke="black"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10 2.91675V16.9417"
                    stroke="black"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span> 
              </div>
            </div>
            <List
              bordered
              loading={loading}
              className="rounded-2xl ctm-list-design"
              dataSource={messageList}
              renderItem={(item) => (
                <List.Item
                  className={`flex justify-between items-center bg-[#0087FF33]`}
                >
                  <span className="cursor-pointer">{item?.title}</span>
                  <div className="flex gap-4 items-center">
                    {renderPlatformButton(item?.visibility_type)}

                    <Button
                      // icon={<EditOutlined />}
                      onClick={(e) => handleEdit(item, e)}
                      className="!border-transparent !text-[#808183] !rounded-[25px] !font-medium !text-[14px] leading-[21px] tracking-normal gap-[4px] p-[8px_12px] flex !h-9 btn-hover min-w-[86px]"
                    >
                      <svg className="fill-svg" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.2578 16.1724H2.9797C2.65207 16.1737 2.3275 16.1093 2.02524 15.9829C1.72298 15.8565 1.44917 15.6707 1.22005 15.4365C0.989234 15.204 0.806779 14.9281 0.683222 14.6247C0.559665 14.3213 0.497456 13.9964 0.500188 13.6689V4.3987C0.496102 4.07259 0.558538 3.74907 0.683682 3.4479C0.808825 3.14673 0.994051 2.87423 1.22804 2.64705C1.45571 2.41621 1.7278 2.23391 2.02788 2.11115C2.33189 1.98402 2.65818 1.91877 2.98769 1.91919H6.53899C6.69809 1.91919 6.85067 1.98239 6.96317 2.09489C7.07567 2.20739 7.13887 2.35997 7.13887 2.51907C7.13887 2.67817 7.07567 2.83075 6.96317 2.94325C6.85067 3.05575 6.69809 3.11895 6.53899 3.11895H2.98769C2.81566 3.12363 2.6455 3.15604 2.48379 3.21493C2.24811 3.31441 2.04715 3.48143 1.90624 3.69494C1.76533 3.90844 1.69077 4.15888 1.69195 4.4147V13.6849C1.68995 13.8567 1.72215 14.0272 1.78669 14.1865C1.85123 14.3458 1.94681 14.4907 2.06788 14.6127C2.18892 14.7328 2.33248 14.8278 2.49032 14.8923C2.64816 14.9568 2.81718 14.9895 2.98769 14.9886H12.2658C12.4362 14.9886 12.6042 14.9566 12.7617 14.8926C12.9186 14.8296 13.0603 14.7342 13.1777 14.6127C13.2992 14.4953 13.3946 14.3536 13.4576 14.1967C13.5283 14.0383 13.5638 13.8664 13.5616 13.6929V10.1416C13.5616 9.98246 13.6248 9.82988 13.7373 9.71738C13.8498 9.60488 14.0024 9.54168 14.1615 9.54168C14.3206 9.54168 14.4732 9.60488 14.5856 9.71738C14.6981 9.82988 14.7614 9.98246 14.7614 10.1416V13.7168C14.7627 14.0445 14.6983 14.369 14.5719 14.6713C14.4455 14.9736 14.2597 15.2474 14.0255 15.4765C13.7959 15.707 13.5244 15.8916 13.2257 16.0204C12.9161 16.1324 12.5874 16.1844 12.2578 16.1724Z" fill="#808080"/>
                        <path d="M16.3458 2.94296C16.2643 2.73702 16.1387 2.55139 15.9779 2.39907L14.2582 0.679414C14.1059 0.518601 13.9203 0.393028 13.7143 0.311488C13.4049 0.181091 13.0634 0.146448 12.7341 0.212033C12.4047 0.277617 12.1026 0.440416 11.8667 0.679414L10.499 2.04714V2.08713L4.30822 8.26991C3.99567 8.5846 3.82028 9.01014 3.82031 9.45367V11.1893C3.82242 11.6363 4.0009 12.0643 4.31694 12.3804C4.63299 12.6964 5.06103 12.8749 5.50798 12.877H7.24363C7.46402 12.8773 7.68225 12.8336 7.88552 12.7484C8.08879 12.6633 8.27302 12.5384 8.4274 12.3811L14.6182 6.19032L15.9939 4.81459C16.1555 4.66262 16.2818 4.47706 16.3618 4.2707C16.4534 4.06557 16.5007 3.84346 16.5007 3.61883C16.5007 3.3942 16.4534 3.17209 16.3618 2.96696L16.3458 2.94296ZM15.242 3.7828C15.2161 3.84323 15.178 3.89768 15.1301 3.94277L14.1543 4.91857L11.7547 2.51905L12.7385 1.53524C12.833 1.44385 12.959 1.3923 13.0905 1.39127C13.1538 1.39233 13.2164 1.40592 13.2744 1.43126C13.3363 1.45739 13.3896 1.49472 13.4344 1.54324L15.1621 3.2629C15.2056 3.30988 15.2408 3.36399 15.266 3.42287C15.2779 3.48362 15.2779 3.54608 15.266 3.60683C15.2691 3.66647 15.2609 3.72615 15.242 3.7828Z" fill="#808080"/>
                      </svg>
                      Edit
                    </Button>

                    <Button
                      // icon={<EyeOutlined />}
                      onClick={(e) => handlePreview(item, e)}
                      className="!border-transparent min-w-[110px] !text-[#808183] !rounded-[25px] !font-medium !text-[14px] leading-[21px] tracking-normal gap-[4px] p-[8px_12px] flex !h-9 btn-hover"
                    >
                      <svg className="fill-svg" width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.5 10.8464C6.67778 10.8464 5.05022 10.3521 3.61733 9.36369C2.18444 8.37524 1.14533 7.09169 0.5 5.51302C1.14444 3.93524 2.18356 2.65213 3.61733 1.66369C5.05111 0.675244 6.67867 0.180578 8.5 0.179689C10.3213 0.1788 11.9493 0.673466 13.384 1.66369C14.8187 2.65391 15.8573 3.93702 16.5 5.51302C15.8556 7.0908 14.8169 8.37435 13.384 9.36369C11.9511 10.353 10.3231 10.8472 8.5 10.8464ZM8.5 7.51302C7.94444 7.51302 7.47244 7.3188 7.084 6.93035C6.69556 6.54191 6.50089 6.06947 6.5 5.51302C6.49911 4.95658 6.69378 4.48458 7.084 4.09702C7.47422 3.70947 7.94622 3.5148 8.5 3.51302C9.05378 3.51124 9.52622 3.70591 9.91733 4.09702C10.3084 4.48813 10.5027 4.96013 10.5 5.51302C10.4973 6.06591 10.3031 6.53835 9.91733 6.93035C9.53156 7.32235 9.05911 7.51658 8.5 7.51302ZM8.5 8.84635C9.43333 8.84635 10.2222 8.52413 10.8667 7.87969C11.5111 7.23524 11.8333 6.44635 11.8333 5.51302C11.8333 4.57969 11.5111 3.7908 10.8667 3.14636C10.2222 2.50191 9.43333 2.17969 8.5 2.17969C7.56667 2.17969 6.77778 2.50191 6.13333 3.14636C5.48889 3.7908 5.16667 4.57969 5.16667 5.51302C5.16667 6.44635 5.48889 7.23524 6.13333 7.87969C6.77778 8.52413 7.56667 8.84635 8.5 8.84635Z" fill="#808182"/>
                      </svg>
                      Preview
                    </Button>

                    {/* Three Dots Menu */}
                    <Dropdown
                      overlay={
                        <DropdownMenu
                          item={item}
                          onDuplicate={handleDuplicate}
                          onDelete={handleDelete}
                        />
                      }
                      trigger={["click"]}
                      placement="bottomRight"
                    >
                      <Button
                        type="text"
                        icon={<VerticalDotsIcon />}
                        onClick={(e) => {
                          clearIsDelete();
                          e.stopPropagation();
                        }}
                        className="!text-[#808183] !h-9 btn-hover"
                      />
                    </Dropdown>
                  </div>
                </List.Item>
              )}
            />

            <div className="ctm-pagination flex items-center gap-[10px] justify-between border-t-[3px] border-[#E0E0E0] mt-5 pt-5">
              <div className="flex items-center gap-[10px]">
                <span className="text-[#000] text-[14px]">Rows per pages</span>
                <select
                  value={pagination?.limit}
                  onChange={(e) =>
                    setPagination({
                      ...pagination,
                      limit: Number(e.target.value),
                    })
                  }
                  className="border border-[#E0E0E0] px-2 py-1 text-[14px] rounded-[4px] text-black focus-visible:outline-none"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                {/* <span className='text-[#8C8C8C] text-[14px]' >25 Rows selected</span> */}
              </div>
              <div className="pagination-wrap flex items-center gap-[10px] ">
                <button
                  onClick={() => {
                    if (pagination.page > 1) {
                      setPagination({
                        ...pagination,
                        page: pagination.page - 1,
                      });
                    }
                  }}
                  disabled={pagination.page === 1}
                  className="flex items-center gap-[10px] font-medium text-[16px] leading-[1.5] text-[#404040] opacity-50 hover:opacity-100"
                >
                  <svg
                    width="8"
                    height="13"
                    viewBox="0 0 8 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clipRule="evenodd"
                      d="M0.37822 5.65751L6.03522 0.000514861L7.44922 1.41451L2.49922 6.36452L7.44922 11.3145L6.03522 12.7285L0.37822 7.07151C0.190749 6.88399 0.0854331 6.62968 0.0854331 6.36452C0.0854331 6.09935 0.190749 5.84504 0.37822 5.65751Z"
                      fill="#404040"
                    />
                  </svg>
                  Previous
                </button>
                <ul className="pagination-list flex items-center gap-[10px] mx-1.5">
                  {reanderPaginationButton(totalPages)}
                </ul>
                <button
                  onClick={() => {
                    if (pagination.page < getNumberOfPages(totalPages)) {
                      setPagination({
                        ...pagination,
                        page: pagination.page + 1,
                      })
                    }
                  }}
                  disabled={pagination.page === getNumberOfPages(totalPages)}
                  className="flex items-center gap-[10px] font-medium text-[16px] leading-[1.5] text-[#404040] opacity-50 hover:opacity-100"
                >
                  Next
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clipRule="evenodd"
                      d="M7.15694 7.71163L1.49994 13.3686L0.0859375 11.9546L5.03594 7.00462L0.0859375 2.05463L1.49994 0.640625L7.15694 6.29763C7.34441 6.48515 7.44972 6.73946 7.44972 7.00462C7.44972 7.26979 7.34441 7.5241 7.15694 7.71163Z"
                      fill="#404040"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const visibilityOptions = [
  {
    id: "fb_prospecting",
    label: "Prospecting",
    icon: propSearch,
    iconLight: prospWhite,
    inputs: true,
    attachment: false,
    platform: "facebook"
  },
  {
    id: "fb_crm",
    label: "CRM",
    icon: messangerIcon,
    iconLight: messangerWhite,
    inputs: true,
    attachment: true,
    platform: "facebook"
  },
  { id: "birthday", 
    label: "Birthday", 
    icon: BdayIcon, 
    iconLight: BdayWhite,
    inputs: true,
    attachment: true,
    platform: "facebook"
  },
  {
    id: "request",
    label: "Request",
    icon: requestIcon,
    iconLight: requestWhite,
    inputs: true,
    attachment: true,
    platform: "facebook"
  },
  {
    id: "ig_prospecting",
    label: "Prospecting",
    icon: IgProsp,
    iconLight: prospWhite,
    inputs: false,
    attachment: false,
    platform: "instagram"
  },
  { id: "ig_crm",
    label: "CRM", 
    icon: IgCrm, 
    iconLight: IgCrmWhite ,  
    inputs: false,
    attachment: true,
    platform: "instagram" 
  },
];

export default MessageIndex;
