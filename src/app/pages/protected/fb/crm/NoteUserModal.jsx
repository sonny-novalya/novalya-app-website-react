// eslint-disable-next-line react/prop-types
import PropTypes from "prop-types";
import { Modal, Select, Tag } from "antd";
import { useState } from "react";
import { DeleteFillRedIcon, MessengerIcon } from "../../../common/icons/icons";
const { Option } = Select;

const NoteUserModal = ({ visible, onCancel, lead }) => {
    console.log("lead", lead)
    const [userInfo, setUserInfo] = useState({
        firstName: "John",
        lastName: "Doe",
        groupTags: ["CO - Stage 1", "HO - Stage 4"],
        phone: "",
        email: "",
        note: ""
    });

    const groupedTags = {
        CO: ["Stage 1", "Stage 2", "Stage 3"],
        HO: ["Stage 3", "Stage 4", "Stage 5"],
        Buyers: ["Stage 6"],
    };

    const tagColors = {
        CO: "blue",
        HO: "red",
        Buyers: "green",
        default: "gray"
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleNoteChange = (e) => {
        setUserInfo({ ...userInfo, note: e.target.value });
    };

    const handleGroupTagChange = (value) => {
        setUserInfo({ ...userInfo, groupTags: value });
    };

    return (
        <Modal
            open={visible}
            onCancel={onCancel}
            footer={null}
            width={700}
            centered
            closeIcon={null}
        >
            <div className="flex justify-between items-center mb-4">
                <div>
                    <div className="text-lg font-semibold flex items-center space-x-2">
                        <h2>Note For {userInfo.firstName} {userInfo.lastName}</h2>
                        <span className="text-sm text-gray-500">(stage 1)</span>
                        <span className="text-xs text-[#EB8D06] border border-[#F9DFB9] bg-[#fDF5E8] px-2 py-1 rounded-full">Low Priority</span>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="rounded border border-[#0087FF7D] p-3 scale-90">
                        <MessengerIcon />
                    </button>
                    <button className="rounded border border-[#0087FF7D] p-2">
                        <DeleteFillRedIcon />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">First name</label>
                    <input
                        name="firstName"
                        value={userInfo.firstName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Last name</label>
                    <input
                        name="lastName"
                        value={userInfo.lastName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>
            </div>

            <div className="mt-4">
                <label className="block text-sm font-medium mb-1">
                    Group tags <span className="text-gray-400">(i)</span>
                </label>

                <Select
                    mode="multiple"
                    value={userInfo.groupTags}
                    className="w-full"
                    onChange={handleGroupTagChange}
                    placeholder="Select group tags"
                    tagRender={(props) => {
                        const groupKey = props.value?.split(" - ")[0];
                        const color = tagColors[groupKey] || tagColors.default;
                        return (
                            <Tag
                                color={color}
                                closable={props.closable}
                                onClose={props.onClose}
                                style={{ marginRight: 3 }}
                            >
                                {props.value}
                            </Tag>
                        );
                    }}
                >
                    {Object.entries(groupedTags).map(([group, stages]) => (
                        <Select.OptGroup label={group} key={group}>
                            {stages.map(stage => {
                                const val = `${group} - ${stage}`;
                                return (
                                    <Option key={val} value={val}>
                                        <div className="flex justify-between">
                                            <span>{val}</span>
                                        </div>
                                    </Option>
                                );
                            })}
                        </Select.OptGroup>
                    ))}
                </Select>
            </div>

            <div className="mt-4">
                <label className="block text-sm font-medium mb-1">
                    Phone <span className="text-gray-400">(i)</span>
                </label>
                <input
                    name="phone"
                    type="text"
                    value={userInfo.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                />
            </div>

            <div className="mt-4">
                <label className="block text-sm font-medium mb-1">
                    Email <span className="text-gray-400">(i)</span>
                </label>
                <input
                    name="email"
                    type="email"
                    value={userInfo.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                />
            </div>

            <div className="mt-4">
                <label className="block text-sm font-medium mb-1">
                    Write note <span className="text-gray-400">(i)</span>
                </label>
                <textarea
                    rows={4}
                    value={userInfo.note}
                    onChange={handleNoteChange}
                    placeholder="Write your note"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                />
            </div>

            <div className="flex justify-end mt-4 space-x-3">
                <button
                    onClick={onCancel}
                    className="border border-blue-500 text-blue-500 px-5 py-2 rounded-lg"
                >
                    Cancel
                </button>
                <button
                    onClick={() => {
                        console.log("Updated info", userInfo);
                    }}
                    className="bg-green-500 text-white px-5 py-2 rounded-lg"
                >
                    Update
                </button>
            </div>
        </Modal>
    );
};

NoteUserModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    lead: PropTypes.object,
};

export default NoteUserModal;
