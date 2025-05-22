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
            
                <h2 className="text-[16px] font-medium mb-4">{t("crm.Where would you like to move")}{" "}
                {allIds?.length + " "}{t("crm.users?")}</h2>
            <Select
                className="ctm-select-white ctm-select-white-op5 w-full border !border-[#DADADA] bg-white p-2 rounded-[10px] text-[#808183] min-h-[48px] outline-none focus:outline-none text-[14px] font-normal leading-[21px] mb-2"
                placeholder={t("crm.Select stage")}
                value={selectedStage || undefined}
                onChange={(value) => setSelectedStage(value)}
                dropdownStyle={{ maxHeight: "200px", overflow: "auto" }}
                style={{ height: "50px" }}
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
                    className="min-h-[52px] bg-white w-37.5 text-[#0087FF] border border-[#0087FF] rounded-lg py-2 px-6"
                >
                    {t("crm.Cancel")}
                </button>
                <button
                    onClick={() => moverTaggedUsers()}
                    className="min-h-[52px] bg-[#21BF7C] w-37.5 text-white rounded-lg py-2 px-6"
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
