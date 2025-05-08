import { useEffect, useMemo, useState } from "react";
import { Input, Button } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { EditIcon, PreviewIcon } from "../../../../../pages/common/icons/icons";
import { t } from "i18next";
import PropTypes from "prop-types";
import SettingStore from "../../../../../../store/prospection/settings-store";
import useMessageSteps from "../../../../../../store/messageTemp/MessageTemp";

const SelectMessage = ({ tempMessageList, onComplete }) => {
    const {
        setIsMessage,
        setStep,
        setBackStep,
        setPreviewMessage,
        setSelecetdMessage
    } = useMessageSteps();

    const { prospection, updateProspection } = SettingStore();
    const { message } = prospection;

    const [selectedRow, setSelectedRow] = useState(null);
    const [searchText, setSearchText] = useState('');

    const handleUpdate = (field, value) => {
        updateProspection({
            ...prospection,
            [field]: value
        });
    };

    const handlePreview = (data) => {
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

    const handleRowClick = (id) => {
        setSelectedRow(id);
        handleUpdate("message", id);
    };

    const filteredMessages = useMemo(() => {
        return tempMessageList?.filter((msg) =>
            msg?.title?.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [searchText, tempMessageList]);

    // Check if this section is complete (a message is selected)
    useEffect(() => {
        // Notify parent about completion status
        if (onComplete) {
            onComplete(!!selectedRow);
        }
    }, [selectedRow, onComplete]);

    useEffect(() => {
        setSelectedRow(message ? message  : null);
    }, [message]);

    return (
        <div className="w-full h-full bg-white rounded-lg flex flex-col">
            <h2 className="font-medium text-[24px] flex items-center gap-[6px]">{t("prospecting.Select Message")}
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.5026 15.8228C12.5469 15.8228 15.8255 12.5443 15.8255 8.49992C15.8255 4.45558 12.5469 1.177 8.5026 1.177C4.45827 1.177 1.17969 4.45558 1.17969 8.49992C1.17969 12.5443 4.45827 15.8228 8.5026 15.8228Z" stroke="black"/>
                    <path d="M8.5 8.35181V12.3101" stroke="black" stroke-linecap="round"/>
                    <path d="M8.50521 6.6696C9.05174 6.6696 9.49479 6.22654 9.49479 5.68001C9.49479 5.13348 9.05174 4.69043 8.50521 4.69043C7.95868 4.69043 7.51562 5.13348 7.51562 5.68001C7.51562 6.22654 7.95868 6.6696 8.50521 6.6696Z" fill="black"/>
                </svg>
            </h2>
            <div className="flex gap-4 mt-5">
                <Input placeholder="Search messages" prefix={<SearchOutlined />} className="ctm-search w-1/2 !rounded-[4px] min-h-[44px]" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                
                <Button
                    className="!text-[16px] !rounded-[4px] !p-2.5 min-h-[44px] min-w-[160px] !text-[#808183] justify-start"
                    >
                    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.33333 10H4.66667C5.125 10 5.5 9.625 5.5 9.16667C5.5 8.70833 5.125 8.33333 4.66667 8.33333H1.33333C0.875 8.33333 0.5 8.70833 0.5 9.16667C0.5 9.625 0.875 10 1.33333 10ZM0.5 0.833333C0.5 1.29167 0.875 1.66667 1.33333 1.66667H14.6667C15.125 1.66667 15.5 1.29167 15.5 0.833333C15.5 0.375 15.125 0 14.6667 0H1.33333C0.875 0 0.5 0.375 0.5 0.833333ZM1.33333 5.83333H9.66667C10.125 5.83333 10.5 5.45833 10.5 5C10.5 4.54167 10.125 4.16667 9.66667 4.16667H1.33333C0.875 4.16667 0.5 4.54167 0.5 5C0.5 5.45833 0.875 5.83333 1.33333 5.83333Z" fill="#808080"/>
                    </svg>
                    <span className="flex-1 text-left !font-[300]">Sort by</span>
                    <span className="filter-arrow">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.99951 3.1716L7.82797 0.343099L9.24219 1.7574L4.99951 6L0.756909 1.7574L2.17111 0.343098L4.99951 3.1716Z" fill="#8C8C8C"/>
                        </svg>
                    </span>
                </Button>
                <Button className="!text-[16px] flex align-center gap-2.5 !rounded-[10px] px-4 min-h-[44px] min-w-[210px] !text-white" type="primary" onClick={() => setIsMessage(true)}>
                    {t("prospecting.Create New Message")}
                </Button>
            </div>

            <div className="flex-1 overflow-auto my-5 ctm-list-design">
                {filteredMessages?.map((record) => (
                    <div
                        key={record?.id}
                        className={`cursor-pointer flex w-full items-center justify-between px-4 py-3 border bg-[#F5F5F5] rounded-[8px] my-2 ${selectedRow == record?.id ? "bg-blue-100 rounded-xl border-[#0087FF]" : "border-white hover:border-[#0087FF]"}`}
                        onClick={() => handleRowClick(record?.id)}
                    >
                        <h2>
                            {record?.title}
                        </h2>
                        <div>
                            <div className="flex justify-end items-center gap-2">
                                <button className="flex items-center justify-center h-9 min-w-[86px] px-[12px] py-[8px] gap-[6px] bg-white rounded-[25px] border-transparent text-[#808183] text-[14px] leading-[21px] tracking-normal font-medium cursor-pointer btn-hover" onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit(record);
                                }}>
                                    {/* <span><EditIcon /></span> */}
                                    <svg class="fill-svg" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.2578 16.1724H2.9797C2.65207 16.1737 2.3275 16.1093 2.02524 15.9829C1.72298 15.8565 1.44917 15.6707 1.22005 15.4365C0.989234 15.204 0.806779 14.9281 0.683222 14.6247C0.559665 14.3213 0.497456 13.9964 0.500188 13.6689V4.3987C0.496102 4.07259 0.558538 3.74907 0.683682 3.4479C0.808825 3.14673 0.994051 2.87423 1.22804 2.64705C1.45571 2.41621 1.7278 2.23391 2.02788 2.11115C2.33189 1.98402 2.65818 1.91877 2.98769 1.91919H6.53899C6.69809 1.91919 6.85067 1.98239 6.96317 2.09489C7.07567 2.20739 7.13887 2.35997 7.13887 2.51907C7.13887 2.67817 7.07567 2.83075 6.96317 2.94325C6.85067 3.05575 6.69809 3.11895 6.53899 3.11895H2.98769C2.81566 3.12363 2.6455 3.15604 2.48379 3.21493C2.24811 3.31441 2.04715 3.48143 1.90624 3.69494C1.76533 3.90844 1.69077 4.15888 1.69195 4.4147V13.6849C1.68995 13.8567 1.72215 14.0272 1.78669 14.1865C1.85123 14.3458 1.94681 14.4907 2.06788 14.6127C2.18892 14.7328 2.33248 14.8278 2.49032 14.8923C2.64816 14.9568 2.81718 14.9895 2.98769 14.9886H12.2658C12.4362 14.9886 12.6042 14.9566 12.7617 14.8926C12.9186 14.8296 13.0603 14.7342 13.1777 14.6127C13.2992 14.4953 13.3946 14.3536 13.4576 14.1967C13.5283 14.0383 13.5638 13.8664 13.5616 13.6929V10.1416C13.5616 9.98246 13.6248 9.82988 13.7373 9.71738C13.8498 9.60488 14.0024 9.54168 14.1615 9.54168C14.3206 9.54168 14.4732 9.60488 14.5856 9.71738C14.6981 9.82988 14.7614 9.98246 14.7614 10.1416V13.7168C14.7627 14.0445 14.6983 14.369 14.5719 14.6713C14.4455 14.9736 14.2597 15.2474 14.0255 15.4765C13.7959 15.707 13.5244 15.8916 13.2257 16.0204C12.9161 16.1324 12.5874 16.1844 12.2578 16.1724Z" fill="#808080"></path><path d="M16.3458 2.94296C16.2643 2.73702 16.1387 2.55139 15.9779 2.39907L14.2582 0.679414C14.1059 0.518601 13.9203 0.393028 13.7143 0.311488C13.4049 0.181091 13.0634 0.146448 12.7341 0.212033C12.4047 0.277617 12.1026 0.440416 11.8667 0.679414L10.499 2.04714V2.08713L4.30822 8.26991C3.99567 8.5846 3.82028 9.01014 3.82031 9.45367V11.1893C3.82242 11.6363 4.0009 12.0643 4.31694 12.3804C4.63299 12.6964 5.06103 12.8749 5.50798 12.877H7.24363C7.46402 12.8773 7.68225 12.8336 7.88552 12.7484C8.08879 12.6633 8.27302 12.5384 8.4274 12.3811L14.6182 6.19032L15.9939 4.81459C16.1555 4.66262 16.2818 4.47706 16.3618 4.2707C16.4534 4.06557 16.5007 3.84346 16.5007 3.61883C16.5007 3.3942 16.4534 3.17209 16.3618 2.96696L16.3458 2.94296ZM15.242 3.7828C15.2161 3.84323 15.178 3.89768 15.1301 3.94277L14.1543 4.91857L11.7547 2.51905L12.7385 1.53524C12.833 1.44385 12.959 1.3923 13.0905 1.39127C13.1538 1.39233 13.2164 1.40592 13.2744 1.43126C13.3363 1.45739 13.3896 1.49472 13.4344 1.54324L15.1621 3.2629C15.2056 3.30988 15.2408 3.36399 15.266 3.42287C15.2779 3.48362 15.2779 3.54608 15.266 3.60683C15.2691 3.66647 15.2609 3.72615 15.242 3.7828Z" fill="#808080"></path></svg>
                                    <span>{t("prospecting.Edit")}</span>
                                </button>
                                <button className="flex items-center justify-center h-9 min-w-[86px] px-[20px] py-[8px] gap-[6px] bg-white rounded-[25px] border-transparent text-[#808183] text-[14px] leading-[21px] tracking-normal font-medium cursor-pointer btn-hover" onClick={(e) => {
                                    e.stopPropagation();
                                    handlePreview(record);
                                }}>
                                    {/* <span><PreviewIcon /></span> */}
                                    <svg class="fill-svg" width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 10.8464C6.67778 10.8464 5.05022 10.3521 3.61733 9.36369C2.18444 8.37524 1.14533 7.09169 0.5 5.51302C1.14444 3.93524 2.18356 2.65213 3.61733 1.66369C5.05111 0.675244 6.67867 0.180578 8.5 0.179689C10.3213 0.1788 11.9493 0.673466 13.384 1.66369C14.8187 2.65391 15.8573 3.93702 16.5 5.51302C15.8556 7.0908 14.8169 8.37435 13.384 9.36369C11.9511 10.353 10.3231 10.8472 8.5 10.8464ZM8.5 7.51302C7.94444 7.51302 7.47244 7.3188 7.084 6.93035C6.69556 6.54191 6.50089 6.06947 6.5 5.51302C6.49911 4.95658 6.69378 4.48458 7.084 4.09702C7.47422 3.70947 7.94622 3.5148 8.5 3.51302C9.05378 3.51124 9.52622 3.70591 9.91733 4.09702C10.3084 4.48813 10.5027 4.96013 10.5 5.51302C10.4973 6.06591 10.3031 6.53835 9.91733 6.93035C9.53156 7.32235 9.05911 7.51658 8.5 7.51302ZM8.5 8.84635C9.43333 8.84635 10.2222 8.52413 10.8667 7.87969C11.5111 7.23524 11.8333 6.44635 11.8333 5.51302C11.8333 4.57969 11.5111 3.7908 10.8667 3.14636C10.2222 2.50191 9.43333 2.17969 8.5 2.17969C7.56667 2.17969 6.77778 2.50191 6.13333 3.14636C5.48889 3.7908 5.16667 4.57969 5.16667 5.51302C5.16667 6.44635 5.48889 7.23524 6.13333 7.87969C6.77778 8.52413 7.56667 8.84635 8.5 8.84635Z" fill="#808182"></path></svg>
                                    <span>{t("prospecting.Preview")}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {(!filteredMessages || filteredMessages.length === 0) && (
                    <div className="text-center py-8 text-gray-500">
                        {t("prospecting.No messages available")}
                    </div>
                )}
            </div>
        </div>
    );
};

SelectMessage.propTypes = {
    tempMessageList: PropTypes.array,
    onComplete: PropTypes.func,
};

export default SelectMessage;