import { Modal } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";
import { Checkbox } from "antd";
import useFbProspectingStore from "../../../../../../store/fb/prospecting";

const groups = [
    { id: 1, name: "Group One", image: "https://plus.unsplash.com/premium_photo-1661715812379-23d652805042?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, name: "Group Two", image: "https://plus.unsplash.com/premium_photo-1661715812379-23d652805042?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 3, name: "Group Three", image: "https://plus.unsplash.com/premium_photo-1661715812379-23d652805042?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 4, name: "Group Four", image: "https://plus.unsplash.com/premium_photo-1661715812379-23d652805042?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 5, name: "Group Five", image: "https://plus.unsplash.com/premium_photo-1661715812379-23d652805042?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 6, name: "Group Six", image: "https://plus.unsplash.com/premium_photo-1661715812379-23d652805042?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 7, name: "Group Seven", image: "https://plus.unsplash.com/premium_photo-1661715812379-23d652805042?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 8, name: "Group Eight", image: "https://plus.unsplash.com/premium_photo-1661715812379-23d652805042?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];


const CreateFolderModal = ({ visible, onClose }) => {
    const [folderName, setFolderName] = useState("");
    const [selectedGroups, setSelectedGroups] = useState([]);
    const { folders, addFolder } = useFbProspectingStore(); 

    console.log("folders", folders)

    const handleSelect = (id, checked) => {
        setSelectedGroups((prev) =>
            checked ? [...prev, id] : prev.filter((groupId) => groupId !== id)
        );
    };

    const handleCreateFolder = () => {
        console.log("cc")
        if (folderName && selectedGroups.length > 0) {
            addFolder(folderName, selectedGroups);
            setFolderName("");
            setSelectedGroups([]);
            onClose();
        }
    };

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            width={900}
            className="custom-modal p-0"
        >
            <div className="flex flex-col h-[calc(100vh-200px)] p-0 space-y-5 overflow-y-auto ">
                <h2 className="font-medium text-lg">
                    Create Folder
                </h2>
                <input
                    type="text"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    placeholder="Enter folder name"
                    className="border border-[#00000014] rounded-md p-4"
                />
                <h2 className="font-medium text-lg mb-4">Select Groups</h2>
                <div className="rounded-lg">
                    <div className="max-h-64 overflow-y-auto border border-[#00000014] rounded-md p-2">
                        {groups.map((group) => (
                            <div
                                key={group.id}
                                className="flex items-center p-3 bg-[#F6F6F6] rounded-md cursor-pointer"
                                onClick={() => handleSelect(group.id, !selectedGroups.includes(group.id))}
                            >
                                <Checkbox
                                    checked={selectedGroups.includes(group.id)}
                                    onChange={(e) => handleSelect(group.id, e.target.checked)}
                                    className="mr-3"
                                    onClick={(e) => e.stopPropagation()} // Prevent event bubbling
                                />
                                <img src={group.image} alt="group" className="w-12 h-12 rounded-md mx-3 object-cover" />
                                <span className="text-gray-700 truncate">{group.name}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-8 space-x-5">
                        <button
                            className="border border-[#0087FF] text-[#0087FF] w-1/2 py-2 rounded-md cursor-pointer"
                            onClick={() => setSelectedGroups([])}
                        >
                            Cancel
                        </button>
                        <button
                            className={`border bg-[#0087FF] text-white w-1/2 py-2 rounded-md ${selectedGroups.length === 0 || !folderName ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                            disabled={selectedGroups.length === 0 || !folderName}
                            onClick={handleCreateFolder}
                        >
                            Create Folder
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

CreateFolderModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default CreateFolderModal;
