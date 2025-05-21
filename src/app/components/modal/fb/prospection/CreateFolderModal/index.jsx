import { Modal } from "antd";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Checkbox } from "antd";
import useFbProspectingStore from "../../../../../../store/fb/prospecting";
import useGroupStore from "../../../../../../store/group/groupStore";
import GroupImg from "../../../../../../assets/img/groupImg.png";
import { t } from "i18next";

const CreateFolderModal = ({ socialType, visible, onClose, prospect_folder,setFolders }) => {
    const [folderName, setFolderName] = useState("");
    const [selectedGroups, setSelectedGroups] = useState([]);
    const { initialGroups, fetchInitialGroups } = useGroupStore();
    const { createFolder } = useFbProspectingStore();


    const handleSelect = (id, checked, groupName, url) => {
        setSelectedGroups((prev) =>
            checked
                ? [...prev, { id, group_name: groupName, url }]
                : prev.filter((group) => group.id !== id)
        );
    };

    const handleCreateFolder =async () => {
        if (folderName && selectedGroups.length > 0) {
            await createFolder(folderName, socialType, selectedGroups, prospect_folder);
            setFolders(prospect_folder)
            setFolderName("");
            setSelectedGroups([]);
            onClose();
        }
    };

    useEffect(() => {
        if(prospect_folder){
            const type = prospect_folder === "ig" ? "instagram" : "facebook"
            fetchInitialGroups(type)
        }
    }, []);

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            width={745}
            className="custom-modal custom-modal-p4 !p-0 !top-[50px]"
        >
            <div className="flex flex-col h-[calc(100vh-140px)] p-0 space-y-5 overflow-y-auto">
                <div className="flex items-center gap-[6px]">
                    <h2 className="font-[500] text-[20px]">{t("prospecting.Create Folder")}</h2>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.9987 13.1666C10.4045 13.1666 13.1654 10.4057 13.1654 6.99992C13.1654 3.59416 10.4045 0.833252 6.9987 0.833252C3.59294 0.833252 0.832031 3.59416 0.832031 6.99992C0.832031 10.4057 3.59294 13.1666 6.9987 13.1666Z" stroke="black" stroke-opacity="0.75" stroke-width="0.9"></path><path d="M7 6.87524V10.2086" stroke="black" stroke-opacity="0.75" stroke-linecap="round"></path><path d="M6.9974 5.45866C7.45763 5.45866 7.83073 5.08556 7.83073 4.62533C7.83073 4.16509 7.45763 3.79199 6.9974 3.79199C6.53716 3.79199 6.16406 4.16509 6.16406 4.62533C6.16406 5.08556 6.53716 5.45866 6.9974 5.45866Z" fill="black" fill-opacity="0.75"></path></svg>
                </div>
                <input
                    type="text"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    placeholder={t("prospecting.Enter folder name")}
                    className="border border-[#00000014] rounded-[10px] px-5 py-3 min-h-[52px]"
                />
                <div className="flex items-center gap-[6px]">
                    <h2 className="font-medium text-[20px]">{t("prospecting.Select Group")}</h2>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.9987 13.1666C10.4045 13.1666 13.1654 10.4057 13.1654 6.99992C13.1654 3.59416 10.4045 0.833252 6.9987 0.833252C3.59294 0.833252 0.832031 3.59416 0.832031 6.99992C0.832031 10.4057 3.59294 13.1666 6.9987 13.1666Z" stroke="black" stroke-opacity="0.75" stroke-width="0.9"></path><path d="M7 6.87524V10.2086" stroke="black" stroke-opacity="0.75" stroke-linecap="round"></path><path d="M6.9974 5.45866C7.45763 5.45866 7.83073 5.08556 7.83073 4.62533C7.83073 4.16509 7.45763 3.79199 6.9974 3.79199C6.53716 3.79199 6.16406 4.16509 6.16406 4.62533C6.16406 5.08556 6.53716 5.45866 6.9974 5.45866Z" fill="black" fill-opacity="0.75"></path></svg>
                </div>
                
                <div className="rounded-[10px] flex-grow overflow-hidden border border-[#00000014] mb-0">
                    <div className="h-[calc(100%-40px)] overflow-x-auto pl-12 pr-3 flex flex-col gap-[10px] ctm-scroll-2px my-5 mr-3">
                        {initialGroups?.map((group) => (
                            <div
                                key={group.id}
                                className="flex items-center p-2.5 bg-[#F6F6F6] rounded-[8px] cursor-pointer"
                                onClick={() =>
                                    handleSelect(group.id, !selectedGroups.some((g) => g.id === group.id), group.name, group.url)
                                }
                            >
                                <Checkbox
                                    checked={selectedGroups.some((g) => g.id === group.id)}
                                    onChange={(e) => handleSelect(group.id, e.target.checked, group.name, group.url)}
                                    className="!mr-9 !-ml-[42px]"
                                    onClick={(e) => e.stopPropagation()}
                                />
                                <img
                                    src={ group.post_image || GroupImg}
                                    alt="Group"
                                    className="w-16 h-11 rounded-[4px] object-cover mr-5"
                                />
                                <span className="text-gray-700 truncate max-w-72 overflow-hidden text-ellipsis whitespace-nowrap">{group?.name}</span>
                            </div>
                        ))}
                    </div>
                    
                </div>
                <div className="flex justify-between mt-5 space-x-10">
                    <button
                        className="border border-[#0087FF] text-[#0087FF] w-1/2 py-2 rounded-md cursor-pointer min-h-[52px]"
                        onClick={() => {
                            setSelectedGroups([])
                            onClose()
                        }}
                    >
                        {t("prospecting.Cancel")}
                    </button>
                    <button
                        className={`border bg-[#0087FF] text-white w-1/2 py-2 rounded-md min-h-[52px] ${selectedGroups.length === 0 || !folderName ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                        disabled={selectedGroups.length === 0 || !folderName}
                        onClick={handleCreateFolder}
                    >
                        {t("prospecting.Create Folder")}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

CreateFolderModal.propTypes = {
    socialType: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    groups: PropTypes.array,
    prospect_folder: PropTypes.string
};

export default CreateFolderModal;
