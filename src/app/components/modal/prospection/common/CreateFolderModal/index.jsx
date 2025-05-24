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
            className="custom-modal p-0"
        >
            <div className="flex flex-col h-[calc(100vh-200px)] p-0 space-y-5 overflow-y-auto">
                <h2 className="font-[500] text-[20px] mb-5">{t("prospecting.Create Folder")}</h2>
                <input
                    type="text"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    placeholder={t("prospecting.Enter folder name")}
                    className="border border-[#00000014] rounded-[10x] px-5 py-3 min-h-[52px]"
                />
                <h2 className="font-medium text-[20px] mb-4">{t("prospecting.Select Group")}</h2>
                <div className="rounded-[10px] flex-grow overflow-hidden border border-[#00000014]">
                    <div className="h-[calc(100%-40px)] overflow-x-auto pl-12 pr-3 flex flex-col gap-[10px] ctm-scroll-2px my-5 mr-3">
                        {initialGroups?.map((group) => (
                            <div
                                key={group.id}
                                className="flex items-center p-3 bg-[#F6F6F6] rounded-[8px] cursor-pointer"
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
                <div className="flex justify-between mt-5 space-x-5">
                    <button
                        className="border border-[#0087FF] text-[#0087FF] w-1/2 py-2 rounded-md cursor-pointer min-h-[52px]"
                        onClick={() => setSelectedGroups([])}
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
