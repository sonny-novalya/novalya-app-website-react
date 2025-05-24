import { Modal, Checkbox } from "antd";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import useGroupStore from "../../../../../../store/group/groupStore";
import useFbProspectingStore from "../../../../../../store/fb/prospecting";
import GroupImg from "../../../../../../assets/img/groupImg.png";
import { formatNumber } from "../../../../../../helpers/formatGroupMembers";
import { DeleteFillIcon } from "../../../../../pages/common/icons/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { t } from "i18next";

const UpdateFolderModal = ({folderId ,socialType, folderName, visible, onClose, prospectFolder , initialStoreFilters,setSelectedFolder}) => {
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [newFolderName, setNewFolderName] = useState(folderName);
    const { groups, initialGroups, fetchInitialGroups, fetchGroups,storeFilters } = useGroupStore();
    const { folders = [], setFolderManualy } = useFbProspectingStore();

    const { updateFolder } = useFbProspectingStore();
    const navigate = useNavigate();  
    const handleSelect = (id, checked) => {
        setSelectedGroups((prev) =>
            checked ? [...prev, id] : prev.filter((groupId) => groupId !== id)
        );
    };


  
  

    const location = useLocation();
    
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

        await  updateFolder(newFolderName, folderId, socialType, selectedGroupsPayload);
        fetchGroups({...storeFilters, id:folderId});
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
                const newFolders = folders?.filter((f)=>f.id !== folderId)
                setFolderManualy([...newFolders])
                fetchGroups(initialStoreFilters);
                setSelectedFolder(0)
                onClose();
            }

    };
    useEffect(() => {

        
        const type = prospectFolder === "ig" ? "instagram" : "facebook";
        if (prospectFolder) {
            fetchInitialGroups(type);
        }

        // if (folderId && socialType) {
        //     fetchGroups(socialType, folderId);
        //     fetchInitialGroups(type); 
        // }

        
    }, [folderId, prospectFolder]);

    useEffect(() => {
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
            width={800}
            className="custom-modal custom-modal-p4 !p-0 !top-[50px]"
            closeIcon={null} 
        >
            <div className="flex flex-col h-[calc(100vh-140px)] p-0 space-y-5 overflow-y-auto">
            <div className="flex justify-between">
                <div className="flex items-center gap-[6px]">
                    <h2 className="font-[500] text-[20px] mb-0">{t("prospecting.Edit Folder")}</h2>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.9987 13.1666C10.4045 13.1666 13.1654 10.4057 13.1654 6.99992C13.1654 3.59416 10.4045 0.833252 6.9987 0.833252C3.59294 0.833252 0.832031 3.59416 0.832031 6.99992C0.832031 10.4057 3.59294 13.1666 6.9987 13.1666Z" stroke="black" stroke-opacity="0.75" stroke-width="0.9"></path><path d="M7 6.87524V10.2086" stroke="black" stroke-opacity="0.75" stroke-linecap="round"></path><path d="M6.9974 5.45866C7.45763 5.45866 7.83073 5.08556 7.83073 4.62533C7.83073 4.16509 7.45763 3.79199 6.9974 3.79199C6.53716 3.79199 6.16406 4.16509 6.16406 4.62533C6.16406 5.08556 6.53716 5.45866 6.9974 5.45866Z" fill="black" fill-opacity="0.75"></path></svg>
                </div>
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
                    placeholder={t("prospecting.Enter folder name")}
                    className="border border-[#00000014] rounded-[10px] px-5 py-3 min-h-[52px]"
                />
                <div className="flex items-center gap-[6px]">
                    <h2 className="font-medium text-[20px]">{t("prospecting.Select Group")}s</h2>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.9987 13.1666C10.4045 13.1666 13.1654 10.4057 13.1654 6.99992C13.1654 3.59416 10.4045 0.833252 6.9987 0.833252C3.59294 0.833252 0.832031 3.59416 0.832031 6.99992C0.832031 10.4057 3.59294 13.1666 6.9987 13.1666Z" stroke="black" stroke-opacity="0.75" stroke-width="0.9"></path><path d="M7 6.87524V10.2086" stroke="black" stroke-opacity="0.75" stroke-linecap="round"></path><path d="M6.9974 5.45866C7.45763 5.45866 7.83073 5.08556 7.83073 4.62533C7.83073 4.16509 7.45763 3.79199 6.9974 3.79199C6.53716 3.79199 6.16406 4.16509 6.16406 4.62533C6.16406 5.08556 6.53716 5.45866 6.9974 5.45866Z" fill="black" fill-opacity="0.75"></path></svg>
                </div>
                
                <div className="rounded-b-[10px] flex-grow overflow-hidden border border-[#00000014] mb-0">
                    <div className="h-[100%] overflow-x-auto ctm-scroll-2px custom-normal-table px-4">
                        <table className="edit-folder-table w-full border-collapse">
                            <thead className="bg-[#F6F6F6]">
                                <tr className="text-left font-normal">
                                    <th className="p-3 w-10"></th>
                                    <th className="p-3 pl-24 font-medium">{t("prospecting.Group Name")}</th>
                                    <th className="p-3 font-medium">{t("prospecting.Members")}</th>
                                    <th className="p-3 font-medium">{t("prospecting.Privacy")}</th>
                                    <th className="p-3 font-medium">{t("prospecting.Messages Sent")}</th>
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
                                                className="w-16 h-11 rounded-[4px] object-cover mr-5"
                                            />
                                            <span className="text-gray-700 truncate max-w-72 overflow-hidden text-ellipsis whitespace-nowrap">{group.name}</span>
                                        </td>
                                        <td className="p-3">{formatNumber(group.total_member)}</td>
                                        <td className="p-3">
                                            <span class="flex justify-center">
                                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.9974 0.167969C5.0174 0.167969 0.164062 5.0213 0.164062 11.0013C0.164062 16.9813 5.0174 21.8346 10.9974 21.8346C16.9774 21.8346 21.8307 16.9813 21.8307 11.0013C21.8307 5.0213 16.9774 0.167969 10.9974 0.167969ZM9.91406 19.5921C5.6349 19.0613 2.33073 15.4213 2.33073 11.0013C2.33073 10.3296 2.4174 9.69047 2.55823 9.06214L7.7474 14.2513V15.3346C7.7474 16.5263 8.7224 17.5013 9.91406 17.5013V19.5921ZM17.3891 16.8405C17.1074 15.963 16.3057 15.3346 15.3307 15.3346H14.2474V12.0846C14.2474 11.4888 13.7599 11.0013 13.1641 11.0013H6.66406V8.83464H8.83073C9.42656 8.83464 9.91406 8.34714 9.91406 7.7513V5.58464H12.0807C13.2724 5.58464 14.2474 4.60964 14.2474 3.41797V2.9738C17.4216 4.26297 19.6641 7.37214 19.6641 11.0013C19.6641 13.2546 18.7974 15.3021 17.3891 16.8405Z" fill="#565656"></path></svg>
                                            </span>
                                        </td>
                                        <td className="p-3">110</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    
                </div>
                <div className="flex justify-between mt-5 space-x-10">
                        <button
                            className={`border bg-[#0087FF] text-white w-1/2 py-2 border bg-[#0087FF] text-white w-1/2 py-2 rounded-[10px] min-h-[52px] ${selectedGroups.length === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                            disabled={selectedGroups.length === 0}
                            onClick={handleSave}
                        >
                            Save
                        </button>
                        <button
                            className="border border-[#0087FF] text-[#0087FF] w-1/2 py-2 rounded-[10px] min-h-[52px] cursor-pointer"
                            onClick={() => {
                                    setSelectedGroups([])
                                    onClose()
                                }}
                        >
                            Cancel
                        </button>
                    </div>
            </div>
        </Modal>
    );
};

UpdateFolderModal.propTypes = {
    prospectFolder: PropTypes.string,
    folderName: PropTypes.string,
    folderId: PropTypes.string,
    socialType: PropTypes.string,
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default UpdateFolderModal;
