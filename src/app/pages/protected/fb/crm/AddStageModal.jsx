import PropTypes from "prop-types";
import { Modal } from "antd";
import { useState } from "react";

const AddStageModal = ({ visible, onCancel }) => {
    const [stageName, setStageName] = useState("");

    const handleInputChange = (e) => {
        setStageName(e.target.value);
    };

    return (
        <Modal
            open={visible}
            onCancel={onCancel}
            footer={null}
            width={600}
            centered
        >
            <div className="bg-gray-50 rounded-t-lg pb-4 ">
                <h2 className="text-xl font-medium ">Add Stage</h2>
            </div>

            <h2 className="text-lg font-medium my-2">Stage Name</h2>
            <input
                className="w-full rounded-lg bg-white border border-gray-300 px-4 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Select stage"
                value={stageName}
                onChange={handleInputChange}
                style={{ height: "50px" }}
            />
            <p className="text-[#00000065] mt-1">
                Max length is 50 characters
            </p>

            <div className="bg-gray-50 mt-4 rounded-b-lg flex justify-end space-x-4">
                <button
                    onClick={() => {
                        console.log("Cancel");
                        onCancel(); // optional: clear state on cancel
                    }}
                    className="bg-white w-32 text-[#0087FF] border border-[#0087FF] rounded-lg py-2 px-6"
                >
                    Cancel
                </button>
                <button
                    onClick={() => {
                        console.log("Move", stageName);
                        // handle save logic here
                    }}
                    className="bg-[#21BF7C] w-32 text-white rounded-lg py-2 px-6"
                >
                    Move
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
