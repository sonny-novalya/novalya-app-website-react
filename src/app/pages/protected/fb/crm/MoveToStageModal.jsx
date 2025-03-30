import PropTypes from "prop-types";
import { Modal, Select } from "antd";
import { useState } from "react";
const { Option } = Select;

const MoveToStageModal = ({ visible, onCancel }) => {
    const [selectedStage, setSelectedStage] = useState(null);
    const stages = ["stage 1", "stage 2", "stage 3"];

    return (
        <Modal
            open={visible}
            onCancel={onCancel}
            footer={null}
            width={600}
            centered
        >
            <div className="bg-gray-50 rounded-t-lg pb-4 ">
                <h2 className="text-xl font-medium ">Move to Stage</h2>
            </div>
            <h2 className="text-lg font-medium my-3">Where would you like to move 01 users?</h2>
            <Select
                className="w-full rounded-lg bg-white border border-gray-300 px-4 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Select stage"
                value={selectedStage || undefined}
                onChange={(value) => setSelectedStage(value)}
                dropdownStyle={{ maxHeight: "200px", overflow: "auto" }}
                style={{ height: "50px" }}
            >
                {stages?.map((stage) => (
                    <Option key={stage} value={stage} className="h-[50px] flex items-center px-4">
                        {stage}
                    </Option>
                ))}
            </Select>
            <div className="bg-gray-50 mt-4 rounded-b-lg flex justify-end space-x-4">
                <button
                    onClick={() => console.log("Cancel")}
                    className="bg-white w-32 text-[#0087FF] border border-[#0087FF] rounded-lg py-2 px-6"
                >
                    Cancel
                </button>
                <button
                    onClick={() => console.log("Move")}
                    className="bg-[#21BF7C] w-32 text-white rounded-lg py-2 px-6"
                >
                    Move
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
