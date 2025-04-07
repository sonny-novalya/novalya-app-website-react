import PropTypes from "prop-types";
import { Modal, Select } from "antd";
import { useState } from "react";
import { t } from "i18next";
import { TickFillIcon } from "../../../common/icons/icons";
const { Option } = Select;

const SendCampaignModal = ({ visible, onCancel }) => {
    const [interval, setInterval] = useState("medium");
    const [selectedMessage, setSelectedMessage] = useState(null);
    const messages = ["message 1", "message 2", "message 3"];

    const intervalOptions = [
            { label: t("prospecting.Fast"), value: t("prospecting.Fast"), time: t("prospecting.2 to 4 minutes") },
            { label: t("prospecting.Medium"), value: t("prospecting.Medium"), time: t("prospecting.4 to 6 minutes") },
            { label: t("prospecting.Slow"), value: t("prospecting.Slow"), time: t("prospecting.6 to 10 minutes") },
            { label: t("prospecting.Very Slow"), value: "very_slow", time: t("prospecting.10 to 15 minutes") }
        ];
    return (
        <Modal
            open={visible}
            onCancel={onCancel}
            footer={null}
            width={800}
            centered
        >
            <div className="bg-gray-50 rounded-t-lg border-b-[#DADADA] border-b pb-4 ">
                <h2 className="text-xl font-medium ">{t('crm.SendCampaignToPeople', {count: 15 })}</h2>
            </div>
            <h2 className="text-lg font-medium mt-3">{t("crm.Select the time interval")}</h2>
            <div className="border border-gray-300 p-4 rounded-lg mt-4">
                            <div className="grid grid-cols-4 gap-3">
                                {intervalOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        className={`relative`}
                                        onClick={() => setInterval(option.value)}
                                    >
                                        <span className="text-xs text-gray-500 mr-20">{option.time}</span>
                                        <div className={` flex flex-col items-start p-4 rounded-lg border transition ${interval === option.value
                                            ? "bg-[#CCE7FF] border-[#CCE7FF] text-[#0087FF] shadow-sm"
                                            : "bg-white border-gray-300 text-gray-700"
                                            }`}>
                                            <span className="text-sm font-medium">{option.label}</span>
                                        </div>
                                        {interval === option.value && (
                                            <span className="absolute -right-2 top-3">
                                                <TickFillIcon />
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
            </div>
            <h2 className="text-lg font-medium my-3">{t('crm.Select a message')}</h2>
            <Select
                className="w-full rounded-lg bg-white border border-gray-300 px-4 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={t('crm.Select Message')}
                value={selectedMessage || undefined}
                onChange={(value) => setSelectedMessage(value)}
                dropdownStyle={{ maxHeight: "200px", overflow: "auto" }}
                style={{ height: "50px" }}
            >
                {messages?.map((message) => (
                    <Option key={message} value={message} className="h-[50px] flex items-center px-4">
                        {message}
                    </Option>
                ))}
            </Select>

            <h2 className="text-lg font-medium my-3">{t('crm.Select the next action')}</h2>
            <Select
                className="w-full rounded-lg bg-white border border-gray-300 px-4 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={t('crm.Select Message')}
                value={selectedMessage || undefined}
                onChange={(value) => setSelectedMessage(value)}
                dropdownStyle={{ maxHeight: "200px", overflow: "auto" }}
                style={{ height: "50px" }}
            >
                {messages?.map((message) => (
                    <Option key={message} value={message} className="h-[50px] flex items-center px-4">
                        {message}
                    </Option>
                ))}
            </Select>

            <div className="bg-gray-50 mt-4 rounded-b-lg flex justify-end space-x-4">
                <button
                    onClick={() => console.log("Cancel")}
                    className="bg-white w-32 text-[#0087FF] border border-[#0087FF] rounded-lg py-2 px-6"
                >
                    {t('crm.Cancel')}
                </button>
                <button
                    onClick={()=> console.log("send")}
                    className="bg-[#21BF7C] w-32 text-white rounded-lg py-2 px-6"
                >
                    {t('crm.Send')}
                </button>
            </div>
        </Modal>
    );
};

SendCampaignModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default SendCampaignModal;
