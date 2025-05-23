import { useState } from "react";
import { message, Modal, Spin } from "antd";
import { RgbaColorPicker } from "react-colorful";
import PropTypes from "prop-types";
import { formatColorToString } from "../../../../../helpers/formatColorToString";
import { t } from "i18next";

const AddGroupModal = ({ createGroup, createCRMGroup, fetchCRMGroups, addGrpLoader, existingGroupNames }) => {
    const [groupName, setGroupName] = useState('');
    const [color, setColor] = useState({ r: 255, g: 255, b: 255, a: 1 });
    const [colorSource, setColorSource] = useState("picker");
    console.log("colorSource", colorSource)

    const colorOptions = [
        { 'r': 242, 'g': 7, 'b': 7, 'a': 1 },
        { 'r': 0, 'g': 135, 'b': 255, 'a': 1 },
        { 'r': 33, 'g': 191, 'b': 124, 'a': 1 },
        { 'r': 151, 'g': 71, 'b': 255, 'a': 1 },
        { 'r': 228, 'g': 137, 'b': 123, 'a': 1 },
        { 'r': 235, 'g': 141, 'b': 6, 'a': 1 },
        { 'r': 255, 'g': 221, 'b': 85, 'a': 1 }
    ]

    const handleColorChangeInternal = (newColor) => {
        setColor(newColor);
        setColorSource("picker");
    };

    const handlePresetColorChange = (newColor) => {
        setColor(newColor);
        setColorSource("preset");

    };

    const handleSubmit = async () => {
        const trimmedName = groupName.trim().toLowerCase();

        if (!trimmedName) {
            message.error("Group Name is required");
            return;
        }

        if (existingGroupNames?.includes(trimmedName)) {
            message.error("Group name already exists. Please choose a different name.");
            return;
        }

        const payloadRGB = `rgba(${color.r},${color.g},${color.b},${color.a})`;
        const payload = {
            custom_color: payloadRGB,
            name: groupName,
            no_stages_group: false
        };

        const res = await createCRMGroup({ data: payload, type: 'ig' });

        if (res.status === 200) {
            message.success("Group has been created");
            fetchCRMGroups({ type: "ig" });
            createGroup.onClose();
        }
    };
    return (
        <Modal
            className="crm-common-model"
            open={createGroup.isOpen}
            onCancel={() => {
                createGroup.onClose();
            }}
            footer={null}
            width={745}
            centered
            
        >
            
            
            <div class="flex items-center gap-[6px] mb-2.5">
                <h2 className="text-[20px] font-[500] leading-[1.25] mb-1">{t("crm.Add Group")}</h2>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.9987 13.1666C10.4045 13.1666 13.1654 10.4057 13.1654 6.99992C13.1654 3.59416 10.4045 0.833252 6.9987 0.833252C3.59294 0.833252 0.832031 3.59416 0.832031 6.99992C0.832031 10.4057 3.59294 13.1666 6.9987 13.1666Z" stroke="black" stroke-opacity="0.75" stroke-width="0.9"></path><path d="M7 6.87524V10.2086" stroke="black" stroke-opacity="0.75" stroke-linecap="round"></path><path d="M6.9974 5.45866C7.45763 5.45866 7.83073 5.08556 7.83073 4.62533C7.83073 4.16509 7.45763 3.79199 6.9974 3.79199C6.53716 3.79199 6.16406 4.16509 6.16406 4.62533C6.16406 5.08556 6.53716 5.45866 6.9974 5.45866Z" fill="black" fill-opacity="0.75"></path>
                </svg>
            </div>
            <input
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder={t("crm.Write group name ...")}
                className="min-h-[52px] w-full rounded-[10px] px-[24px] py-[12px] border border-[#DADADA] focus:outline-none focus:border-[#0087FF] "
            />
            <div className="flex flex-col space-y-3">
                 <div class="flex items-center gap-[6px] mt-5">
                    <div className="text-[20px] text-[#000407] font-[500] mb-1">{t("crm.Select the color")}</div>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.9987 13.1666C10.4045 13.1666 13.1654 10.4057 13.1654 6.99992C13.1654 3.59416 10.4045 0.833252 6.9987 0.833252C3.59294 0.833252 0.832031 3.59416 0.832031 6.99992C0.832031 10.4057 3.59294 13.1666 6.9987 13.1666Z" stroke="black" stroke-opacity="0.75" stroke-width="0.9"></path><path d="M7 6.87524V10.2086" stroke="black" stroke-opacity="0.75" stroke-linecap="round"></path><path d="M6.9974 5.45866C7.45763 5.45866 7.83073 5.08556 7.83073 4.62533C7.83073 4.16509 7.45763 3.79199 6.9974 3.79199C6.53716 3.79199 6.16406 4.16509 6.16406 4.62533C6.16406 5.08556 6.53716 5.45866 6.9974 5.45866Z" fill="black" fill-opacity="0.75"></path>
                    </svg>
                </div>

                

                <div className="flex space-x-5">
                    {colorOptions.map((col, index) => (
                        <div
                            key={index}
                            style={{
                                backgroundColor: formatColorToString(col),
                            }}
                            className="h-8 w-8 rounded-sm cursor-pointer"
                            onClick={() => handlePresetColorChange(col)}
                        />
                    ))}
                </div>

                <div className="rounded-lg mt-2 flex space-x-5">
                    <RgbaColorPicker
                        color={color}
                        className="mb-4"
                        onChange={handleColorChangeInternal}
                    />
                    <div>
                        <div className="text-sm font-medium flex flex-col">
                            <h2 className="mb-2 text-[16px]">Hex</h2>
                            <span className="min-w-[90px] rounded-[7px] border border-gray-300 p-2.5 text-[#000000]">{`#${(color.r << 16 | color.g << 8 | color.b).toString(16).padStart(6, '0').toUpperCase()}`}</span>
                        </div>
                        <div
                            style={{
                                backgroundColor: formatColorToString(color),
                            }}
                            className="mt-5 h-10 w-20 rounded-lg"
                        />
                    </div>
                </div>
            </div>

            <div className=" mt-5 rounded-b-lg flex justify-end space-x-5">
                <button
                    onClick={() => {
                        createGroup.onClose();
                    }}
                    className="min-h-[50px] bg-white w-37.5 text-[#0087FF] border border-[#0087FF] rounded-[10px] py-2 px-6"
                >
                    {t("crm.Cancel")}
                </button>
                <button
                    onClick={handleSubmit}
                    className="min-h-[50px] bg-[#21BF7C] w-37.5 text-white rounded-[10px] py-2 px-6"
                >
                    {!addGrpLoader ? t("crm.Add") : <Spin size="small" style={{ color: "white" }} />}
                </button>
            </div>
        </Modal>
    );
};



export default AddGroupModal;
