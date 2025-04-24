import PropTypes from "prop-types";
import { Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { t } from "i18next";
import { TickFillIcon } from "../../../common/icons/icons";
import useMessageSteps from "../../../../../store/messageTemp/MessageTemp";
const { Option } = Select;

const SendCampaignModal = ({ visible, onCancel, userIds, peopleCount }) => {
    const { tempMessageList, fetchMessages } = useMessageSteps();

    const intervalList = [
        { label: t("prospecting.Fast"), value: "2-4", time: t("prospecting.2 to 4 minutes") },
        { label: t("prospecting.Medium"), value: "4-6", time: t("prospecting.4 to 6 minutes") },
        { label: t("prospecting.Slow"), value: "6-10", time: t("prospecting.6 to 10 minutes") },
        { label: t("prospecting.Very Slow"), value: "10-15", time: t("prospecting.10 to 15 minutes") },
    ];

    const [campiagnModalData, setCampiagnModalData] = useState({
        userIds: userIds,
        peopleCount: peopleCount,
        time_interval: intervalList[0].value,
        message_id: null,
        selectAction: false,
        moveStageId: null,
        moveGroupId: null,
    });

    useEffect(() => {
        fetchMessages({ page: 1, limit: 200 });
    }, []);

    const handleIntervalChange = (value) => {
        setCampiagnModalData((prev) => ({
            ...prev,
            time_interval: value,
        }));
    };

    const handleMessageChange = (value) => {
        setCampiagnModalData((prev) => ({
            ...prev,
            message_id: value,
        }));
    };

    return (
        <Modal open={visible} onCancel={onCancel} footer={null} width={800} centered>
            <div className="bg-gray-50 rounded-t-lg border-b-[#DADADA] border-b pb-4">
                <h2 className="text-xl font-medium">{t('crm.SendCampaignToPeople', { count: peopleCount })}</h2>
            </div>

            {/* Time Interval */}
            <h2 className="text-lg font-medium mt-3">{t("crm.Select the time interval")}</h2>
            <div className="border border-gray-300 p-4 rounded-lg mt-4">
                <div className="grid grid-cols-4 gap-3">
                    {intervalList.map((option) => (
                        <button
                            key={option.value}
                            className="relative"
                            onClick={() => handleIntervalChange(option.value)}
                        >
                            <span className="text-xs text-gray-500 mr-20">{option.time}</span>
                            <div
                                className={`flex flex-col items-start p-4 rounded-lg border transition ${campiagnModalData.time_interval === option.value
                                        ? "bg-[#CCE7FF] border-[#CCE7FF] text-[#0087FF] shadow-sm"
                                        : "bg-white border-gray-300 text-gray-700"
                                    }`}
                            >
                                <span className="text-sm font-medium">{option.label}</span>
                            </div>
                            {campiagnModalData.time_interval === option.value && (
                                <span className="absolute -right-2 top-3">
                                    <TickFillIcon />
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Message Selector */}
            <h2 className="text-lg font-medium my-3">{t('crm.Select a message')}</h2>
            <Select
                className="w-full"
                placeholder={t('crm.Select Message')}
                value={campiagnModalData.message_id}
                onChange={handleMessageChange}
                dropdownStyle={{ maxHeight: "200px", overflow: "auto" }}
                style={{ height: "50px" }}
            >
                {tempMessageList.map((message) => (
                    <Option key={message.id} value={message.id}>
                        {message.title}
                    </Option>
                ))}
            </Select>

            {/* Action Placeholder */}
            <h2 className="text-lg font-medium my-3">{t('crm.Select the next action')}</h2>
            <Select
                className="w-full"
                placeholder={t('crm.Select Action')}
                value={"No Action"}
                onChange={(value) =>  console.log(value)}
                dropdownStyle={{ maxHeight: "200px", overflow: "auto" }}
                style={{ height: "50px" }}
            >
                <Option value="no_action">No Action</Option>
            </Select>

            {/* Footer Buttons */}
            <div className="bg-gray-50 mt-4 rounded-b-lg flex justify-end space-x-4">
                <button
                    onClick={onCancel}
                    className="bg-white w-32 text-[#0087FF] border border-[#0087FF] rounded-lg py-2 px-6"
                >
                    {t('crm.Cancel')}
                </button>
                <button
                    id="submit_insta_camping"
                    attr-data={JSON.stringify(campiagnModalData)}
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
    userIds: PropTypes.array,
    peopleCount: PropTypes.number,
};

export default SendCampaignModal;
