import PropTypes from "prop-types";
import { Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { t } from "i18next";
import { TickFillIcon } from "../../../common/icons/icons";
import useMessageSteps from "../../../../../store/messageTemp/MessageTemp";
import usefbCRM from "../../../../../store/fb/fbCRM";
const { Option } = Select;

const actionOptions = [
    { label: "No Action", value: "no_action" },
    { label: "Move To Stage", value: "move_to_stage" },
    { label: "Move To Group", value: "move_to_group" },
    { label: "Delete From Group", value: "delete_from_group" },
];

const SendCampaignModal = ({ visible, onCancel, userIds, peopleCount, stages, groupId }) => {
    const { tempMessageList, fetchMessages } = useMessageSteps();
    const { CRMList, fetchCRMGroups } = usefbCRM()
    const [selectedAction, setSelectedAction] = useState("no_action");
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const selectedGroup = CRMList.find(group => group.id === selectedGroupId);

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
        fetchCRMGroups({ type: 'ig' })
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

            <h2 className="text-lg font-medium my-3">{t('crm.Select the next action')}</h2>
            <Select
                className="w-full"
                placeholder={t('crm.Select Action')}
                value={selectedAction}
                onChange={(value) => {
                    setSelectedAction(value);
                    if (value === "no_action") {
                        setCampiagnModalData((prev) => ({
                            ...prev,
                            selectAction: false,
                            moveGroupId: null,
                            moveStageId: null,
                        }));
                    } else if (value === "delete_from_group") {
                        setCampiagnModalData((prev) => ({
                            ...prev,
                            selectAction: "Delete From Group",
                            moveGroupId: null,
                            moveStageId: null,
                        }));
                    } else if (value === "move_to_stage") {
                        setCampiagnModalData((prev) => ({
                            ...prev,
                            selectAction: "Move To Stage",
                            moveGroupId: groupId,
                            moveStageId: null,
                        }));
                    } else if (value === "move_to_group") {
                        setCampiagnModalData((prev) => ({
                            ...prev,
                            selectAction: "Move To Group",
                            moveGroupId: null,
                            moveStageId: null,
                        }));
                        setSelectedGroupId(null);
                    } else {
                        setCampiagnModalData((prev) => ({
                            ...prev,
                            selectAction: value,
                            moveGroupId: null,
                            moveStageId: null,
                        }));
                    }
                }}

                dropdownStyle={{ maxHeight: "200px", overflow: "auto" }}
                style={{ height: "50px" }}
            >
                {actionOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
                        {option.label}
                    </Option>
                ))}
            </Select>

            {selectedAction === "move_to_group" && (
                <>
                    <h2 className="text-lg font-medium my-3">Select Group</h2>
                    <Select
                        className="w-full"
                        placeholder="Select Group"
                        value={selectedGroupId}
                        onChange={(groupId) => {
                            setSelectedGroupId(groupId);
                            setCampiagnModalData(prev => ({
                                ...prev,
                                moveGroupId: groupId,
                                moveStageId: null
                            }));
                        }}
                        dropdownStyle={{ maxHeight: "200px", overflow: "auto" }}
                        style={{ height: "50px" }}
                    >
                        {CRMList.map(group => (
                            <Option key={group.id} value={group.id}>
                                {group.name}
                            </Option>
                        ))}
                    </Select>

                    {selectedGroup && selectedGroup.stage && (
                        <>
                            <h2 className="text-lg font-medium my-3">Select Stage</h2>
                            <Select
                                className="w-full"
                                placeholder="Select Stage"
                                value={campiagnModalData.moveStageId}
                                onChange={(stageId) => {
                                    setCampiagnModalData(prev => ({
                                        ...prev,
                                        moveStageId: stageId
                                    }));
                                }}
                                dropdownStyle={{ maxHeight: "200px", overflow: "auto" }}
                                style={{ height: "50px" }}
                            >
                                {selectedGroup.stage.sort((a, b) => a.stage_num - b.stage_num).map(stage => (
                                    <Option key={stage.id} value={stage.id}>
                                        {stage.name}
                                    </Option>
                                ))}
                            </Select>
                        </>
                    )}
                </>
            )}

            {selectedAction === "move_to_stage" && (
                <>
                    <h2 className="text-lg font-medium my-3">Select Stage</h2>
                    <Select
                        className="w-full"
                        placeholder={t('crm.Select Stage')}
                        value={campiagnModalData.moveStageId}
                        onChange={(stageId) => {
                            setCampiagnModalData((prev) => ({
                                ...prev,
                                selectAction: "Move To Stage",
                                moveGroupId: groupId,
                                moveStageId: stageId,
                            }));
                        }}
                        dropdownStyle={{ maxHeight: "200px", overflow: "auto" }}
                        style={{ height: "50px" }}
                    >
                        {stages.map((stage) => (
                            <Option key={stage.id} value={stage.id}>
                                {stage.name}
                            </Option>
                        ))}
                    </Select>
                </>
            )}

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
    stages: PropTypes.array,
    groupId: PropTypes.number,
};

export default SendCampaignModal;
