import PropTypes from "prop-types";
import { message, Modal, Select } from "antd";
import { useState } from "react";
import { t } from "i18next";
const { Option } = Select;

const MoveToStageModal = ({ visible, onCancel, selectedUsersMap, moveStage, sortedStages, setSortedStages, setSelectedUsersMap }) => {
    const [selectedStage, setSelectedStage] = useState(null);
    const allIds = Object.values(selectedUsersMap).flat();


    const moverTaggedUsers = async () => {


        if (!selectedStage) {
            message.error("Stage cant be empty")
            return
        }
        const data = {
            stage_id: selectedStage,
            tagged_user_ids: allIds
        }
        const res = await moveStage({ data, type: 'ig'})

        if (res.status === 200) {
            message.success("Users has been moved")
            const newArr = []
            let tempArr = sortedStages?.map((s) => {
                s.leads.forEach((l) => {
                    if (allIds.includes(l.id)) {
                        newArr.push(l)
                    }
                })
                return { ...s, leads: s?.leads?.filter((f) => !allIds.includes(f.id)) }
            })

            tempArr = tempArr.map((data) => {
                if (data.id === Number(selectedStage)) {
                    return { ...data, leads: [...data?.leads, ...newArr] }
                } else {
                    return data
                }
            })
            setSelectedUsersMap({})
            setSortedStages(tempArr)

            onCancel()
        }


    }
    return (
        <Modal className="crm-common-model"
            open={visible}
            onCancel={onCancel}
            footer={null}
            width={735}
            centered
        >
           
                <h2 className="text-[24px] font-[600] leading-[1.25] mb-4">{t("crm.Move to Stage")}</h2>
                <div class="flex items-center gap-[6px] mb-4">
                    <h2 className="text-[20px] font-[500] text-[#000407]">{t("crm.Where would you like to move")}{" "}
                    {allIds?.length + " "}{t("crm.users?")}</h2>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.9987 13.1666C10.4045 13.1666 13.1654 10.4057 13.1654 6.99992C13.1654 3.59416 10.4045 0.833252 6.9987 0.833252C3.59294 0.833252 0.832031 3.59416 0.832031 6.99992C0.832031 10.4057 3.59294 13.1666 6.9987 13.1666Z" stroke="black" stroke-opacity="0.75" stroke-width="0.9"></path>#
                        <path d="M7 6.87524V10.2086" stroke="black" stroke-opacity="0.75" stroke-linecap="round"></path><path d="M6.9974 5.45866C7.45763 5.45866 7.83073 5.08556 7.83073 4.62533C7.83073 4.16509 7.45763 3.79199 6.9974 3.79199C6.53716 3.79199 6.16406 4.16509 6.16406 4.62533C6.16406 5.08556 6.53716 5.45866 6.9974 5.45866Z" fill="black" fill-opacity="0.75"></path>
                    </svg>
                </div>
                
            <Select
                className="ctm-select-white ctm-select-white-op5 w-full border !border-[#DADADA] bg-white p-2 rounded-[10px] text-[#808183] min-h-[48px] outline-none focus:outline-none text-[14px] font-normal leading-[21px] mb-2"
                placeholder={t("crm.Select stage")}
                value={selectedStage || undefined}
                onChange={(value) => setSelectedStage(value)}
                dropdownStyle={{ maxHeight: "200px", overflow: "auto" }}
                style={{ height: "52px" }}
            >
                {sortedStages?.map((stage) => (
                    <Option key={stage.id} value={stage.id} className="h-[50px] flex items-center px-4">
                        {stage.name}
                    </Option>
                ))}
            </Select>
            <div className="mt-4 rounded-b-lg flex justify-end space-x-5">
                <button
                    onClick={() => console.log("Cancel")}
                    className="min-h-[50px] bg-white w-37.5 text-[#0087FF] border border-[#0087FF] rounded-[10px] py-2 px-6"
                >
                    {t("crm.Cancel")}
                </button>
                <button
                    onClick={() => moverTaggedUsers()}
                    className="min-h-[50px] bg-[#21BF7C] w-37.5 text-white rounded-[10px] py-2 px-6"
                >
                    {t("crm.Move")}
                </button>
            </div>
        </Modal>
    );
};

MoveToStageModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default MoveToStageModal;
