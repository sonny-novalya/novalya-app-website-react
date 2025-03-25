import { Modal, Checkbox } from "antd";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import useGroupStore from "../../../../../../store/group/groupStore";
import useFbProspectingStore from "../../../../../../store/fb/prospecting";
import GroupImg from "../../../../../../assets/img/groupImg.png";
import { formatNumber } from "../../../../../../helpers/formatGroupMembers";
import { DeleteFillIcon } from "../../../../../pages/common/icons/icons";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateFolderModal = ({ socialType, folderId, folderName, visible, onClose }) => {
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [newFolderName, setNewFolderName] = useState(folderName);
    const { groups, initialGroups, fetchInitialGroups, fetchGroups } = useGroupStore();
    const { updateFolder } = useFbProspectingStore();
    const navigate = useNavigate();  
    const handleSelect = (id, checked) => {
        setSelectedGroups((prev) =>
            checked ? [...prev, id] : prev.filter((groupId) => groupId !== id)
        );
    };
    const location = useLocation();
    console.log("location.pathname", location.pathname)
    
    const handleSave = async () => {
        if (selectedGroups.length === 0) return;

        const selectedGroupsPayload = selectedGroups.map((groupId) => {
            const group = initialGroups.find((g) => g.id === groupId);
            return {
                id: group.id,
                group_name: group.name,
                url: group.url,
            };
        });

        updateFolder(newFolderName, folderId, socialType , selectedGroupsPayload);
        onClose();
    };

    const handleDelete = async () => {
            const confirmed = window.confirm("Are you sure you want to delete this folder?");
            if (!confirmed) return;

            const selectedGroupsPayload = groups.map((group) => ({
                id: group.id,
                group_name: group.name,
                url: group.url,
            }));

            const result = await useFbProspectingStore.getState().deleteFolder(folderId, selectedGroupsPayload);

            if (result?.status === "success") {
                onClose();
                navigate(location.pathname);
            }
    };
    useEffect(() => {
        if (folderId && socialType) {
            fetchGroups(socialType, folderId);
            fetchInitialGroups(socialType);
        }
    }, [folderId]);

    useEffect(() => {
        // Sync selected groups with API-loaded groups
        if (groups.length > 0) {
            const selected = groups.map((g) => g.id);
            setSelectedGroups(selected);
        }
    }, [groups]);

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            width={900}
            className="custom-modal p-0"
            closeIcon={null} 
        >
            <div className="flex flex-col h-[calc(100vh-200px)] p-0 space-y-5 overflow-y-auto">
            <div className="flex justify-between">
                    <h2 className="font-medium text-lg">Edit Folder</h2>
                    <button
                        className="h-4 cursor-pointer"
                        onClick={handleDelete}
                    >
                        <DeleteFillIcon />
                    </button>

            </div>
                <input
                    type="text"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="Enter folder name"
                    className="border border-[#00000014] rounded-md p-4"
                />
                <h2 className="font-medium text-lg mb-4">Select Groups</h2>
                <div className="rounded-lg">
                    <div className="max-h-64 overflow-y-auto border border-[#00000014] rounded-md p-2">
                        <table className="w-full border-collapse">
                            <thead className="bg-[#F6F6F6]">
                                <tr className="text-left font-normal">
                                    <th className="p-3 w-10"></th>
                                    <th className="p-3 font-medium">Group&apos;s Name</th>
                                    <th className="p-3 font-medium">Members</th>
                                    <th className="p-3 font-medium">Privacy</th>
                                    <th className="p-3 font-medium">Messages Sent</th>
                                </tr>
                            </thead>
                            <tbody>
                                {initialGroups.map((group) => (
                                    <tr
                                        key={group.id}
                                        className="cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSelect(group.id, !selectedGroups.includes(group.id))}
                                    >
                                        <td className="p-3 text-center">
                                            <Checkbox
                                                checked={selectedGroups.includes(group.id)}
                                                onChange={(e) => handleSelect(group.id, e.target.checked)}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        </td>
                                        <td className="p-3 flex items-center">
                                            <img
                                                src={GroupImg}
                                                alt="Group"
                                                className="w-10 h-10 rounded-full object-cover mx-2"
                                            />
                                            <span className="text-gray-700 truncate max-w-72 overflow-hidden text-ellipsis whitespace-nowrap">{group.name}</span>
                                        </td>
                                        <td className="p-3">{formatNumber(group.total_member)}</td>
                                        <td className="p-3">🌎</td>
                                        <td className="p-3">110</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-between mt-8 space-x-5">
                        <button
                            className={`border bg-[#0087FF] text-white w-1/2 py-2 rounded-md ${selectedGroups.length === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                            disabled={selectedGroups.length === 0}
                            onClick={handleSave}
                        >
                            Save
                        </button>
                        <button
                            className="border border-[#0087FF] text-[#0087FF] w-1/2 py-2 rounded-md cursor-pointer"
                            onClick={() => setSelectedGroups([])}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

UpdateFolderModal.propTypes = {
    folderId: PropTypes.any,
    folderName: PropTypes.string,
    socialType: PropTypes.string,
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default UpdateFolderModal;
