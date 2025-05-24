import { Modal, Spin } from "antd";
import PropTypes from "prop-types";
import Settings from "./Settings";
import AdvOptions from "./AdvOptions";
import AddTags from "./AddTags";
import { t } from "i18next";
import { useEffect, useState } from "react";
import SettingStore from "../../../../../../store/prospection/settings-store";
import { useLocation } from "react-router-dom";

const ConfirmationModal = ({ visible, onClose, handleOpenSettingsTab, groupId, tempMessageList, CRMList, handleOpenSettings }) => {

    const { instaProspection, fetchProspectionData, settingLoading } = SettingStore();
    const { selectedMessage, selectedStrategy, selectedRequest, selectedInterval, selectedGender, selectedKeyword, reTargetSameUser, existingConvo, action, postTarget } = instaProspection;

    const handleOpen = (value) => {
        handleOpenSettingsTab(value);
        onClose();
    };

    const [ isEmpty, setIsEmpty] = useState(false)

    const messageTitle = tempMessageList.find((item) => item.id == selectedMessage)?.title || t("prospecting.Message");

    useEffect(() => {
        if (groupId) {
            fetchProspectionData("instagram", groupId);
        }
    }, []);

    useEffect(() => {
        if (!settingLoading && selectedMessage) {
            setIsEmpty(false);
        }else{
            setIsEmpty(true);
        }
    }, [settingLoading, selectedMessage]);
    

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            width={isEmpty ? 600 : 1115}
            className="custom-modal custom-modal-edit-filter p-0"
            closeIcon={null}
            centered
        >
            {
                isEmpty 
                ? <div className="h-60 flex items-center justify-center flex-col relative">
                        {settingLoading && (
                            <div className="absolute inset-0 flex justify-center items-center bg-gray-100 opacity-100 z-50 rounded-lg h-full">
                                <Spin size="large" />
                            </div>
                        )}
                        <h2 className="text-2xl font-medium text-center">Please save your settings before initiating prospection.</h2>
                    <button 
                        className="px-2 py-1 rounded bg-blue-500 font-medium text-white mt-4 cursor-pointer"
                        onClick={()=>{
                            onClose()
                            setIsEmpty(false)
                            handleOpen("open")
                        }}
                        >
                        Open Settings
                    </button>
                </div>
                : <>
                        <div className="flex flex-col h-[calc(100vh-200px)] p-0 space-y-5 overflow-y-auto relative">
                            {settingLoading && (
                                <div className="absolute inset-0 flex justify-center items-center bg-gray-100 opacity-50 z-50 rounded-lg h-full">
                                    <Spin size="large" />
                                </div>
                            )}
                            <h2 className="font-[500] text-[24px] mb-5">{t("prospecting.Message Selected")}</h2>
                            <h3 className="flex items-center border border-[#00000024] rounded-[6px] p-4 text-[#0087FF] cursor-pointer min-h-[62px] tracking-[.32px] mb-5" onClick={() => handleOpen(1)}>
                                {messageTitle}
                            </h3>

                            <Settings
                                selectedStrategy={selectedStrategy}
                                selectedRequest={selectedRequest}
                                selectedInterval={selectedInterval}
                                handleOpen={handleOpen}
                            />

                            <AdvOptions
                                reTargetSameUser={reTargetSameUser}
                                existingConvo={existingConvo}
                                handleOpen={handleOpen}
                            />

                            <AddTags 
                                action={action} 
                                CRMList={CRMList} 
                                handleOpen={handleOpen} 
                            />

                        </div>
                        <div className="flex justify-end space-x-10 pr-4 mt-7">
                            <button
                                className="px-12 py-2 rounded-lg border border-[#0087FF] text-[#0087FF] cursor-pointer min-h-[52px] w-[250px]"
                                onClick={() => onClose()}
                            >
                                {t("prospecting.Cancel")}
                            </button>
                            <button
                                className={`px-12 py-2 rounded-lg bg-[#21BF7C] text-white cursor-pointer min-h-[52px] w-[250px]`}
                                id="start-novayla-connect"
                                // eslint-disable-next-line react/no-unknown-property
                                groupId={groupId}
                            >
                                {t("prospecting.Next")}
                            </button>
                        </div>
                </>
            }
        </Modal>
    );
};

ConfirmationModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    handleOpenSettingsTab: PropTypes.func,
    groupId: PropTypes.string,
    tempMessageList: PropTypes.any,
    CRMList: PropTypes.any,
    handleOpenSettings: PropTypes.func
};

export default ConfirmationModal;
