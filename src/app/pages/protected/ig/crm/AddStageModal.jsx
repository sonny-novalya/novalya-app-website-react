import PropTypes from "prop-types";
import { message, Modal, Spin } from "antd";
import { useState } from "react";
import { t } from "i18next";

const AddStageModal = ({ visible, onCancel, createStage, setSortedStages, selectedGroup, addGrpLoader, existingStageNames = [] }) => {
    const [stageName, setStageName] = useState("");

    const handleInputChange = (e) => {
        setStageName(e.target.value);
    };

    const onsubmit = async () => {
        if (!stageName?.trim()) {
            message.error("Stage Name is Required");
            return;
        }

        const normalizedName = stageName.trim().toLowerCase();
        if (existingStageNames.includes(normalizedName)) {
            message.error("Stage name already exists");
            return;
        }

        const data = {
            name: stageName.trim(),
            tag_id: selectedGroup.id,
        };

        const res = await createStage({ data, type: "ig" });
        if (res.status === 200) {
            const stage = res?.data?.data;
            setSortedStages((prev) => [...prev, stage]);
            message.success("Stage has been created");
            onCancel();
        }
    };


    return (
        <Modal
            className="crm-common-model"
            open={visible}
            onCancel={onCancel}
            footer={null}
            width={745}
            centered
        >
            
            <h2 className="text-[24px] font-[600] leading-[1.25] mb-4 ">{t("crm.Add Stage")}</h2>
             <div class="flex items-center gap-[6px] mb-3">
                <h2 className="text-[20px] font-[500] text-[#000407]">{t("crm.Stage Name")}</h2>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.9987 13.1666C10.4045 13.1666 13.1654 10.4057 13.1654 6.99992C13.1654 3.59416 10.4045 0.833252 6.9987 0.833252C3.59294 0.833252 0.832031 3.59416 0.832031 6.99992C0.832031 10.4057 3.59294 13.1666 6.9987 13.1666Z" stroke="black" stroke-opacity="0.75" stroke-width="0.9"></path>#
                    <path d="M7 6.87524V10.2086" stroke="black" stroke-opacity="0.75" stroke-linecap="round"></path><path d="M6.9974 5.45866C7.45763 5.45866 7.83073 5.08556 7.83073 4.62533C7.83073 4.16509 7.45763 3.79199 6.9974 3.79199C6.53716 3.79199 6.16406 4.16509 6.16406 4.62533C6.16406 5.08556 6.53716 5.45866 6.9974 5.45866Z" fill="black" fill-opacity="0.75"></path>
                </svg>
            </div>

            
            <input
                className="w-full rounded-lg bg-white border border-gray-300 px-4 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Add stage"
                value={stageName}
                onChange={handleInputChange}
                style={{ height: "50px" }}
            />
            <p className="text-[#00040780] mt-2.5">
                {t("crm.Max length is 50 characters")}
            </p>

            <div className=" mt-4 rounded-b-lg flex justify-end space-x-5">
                <button
                    onClick={() => {
                        console.log("Cancel");
                        onCancel(); // optional: clear state on cancel
                    }}
                    className="min-h-[50px] bg-white w-37.5 text-[#0087FF] border border-[#0087FF] rounded-[10px] py-2 px-6"
                >
                    {t("crm.Cancel")}
                </button>
                <button
                    onClick={() => {
                        onsubmit()
                    }}
                    className="min-h-[50px] bg-[#21BF7C] w-37.5 text-white rounded-[10px] py-2 px-6"
                >
                    {!addGrpLoader ? t("crm.Add") : <Spin size="small" />}
                </button>
            </div>
        </Modal>
    );
};

AddStageModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default AddStageModal;
