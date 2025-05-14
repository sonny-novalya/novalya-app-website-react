import { Modal, Spin } from "antd";
import PropTypes from "prop-types";
import Settings from "./Settings";
import Filters from "./Filters";
import AdvOptions from "./AdvOptions";
import AddTags from "./AddTags";
import { t } from "i18next";
import { useEffect, useState } from "react";
import SettingStore from "../../../../../../store/prospection/settings-store";
import { useLocation } from "react-router-dom";

const ConfirmationModal = ({ visible, onClose, handleOpenSettingsTab, groupId, postType, tempMessageList, keyWordList, CRMList, handleOpenSettings }) => {
    const { prospection, fetchProspectionData, settingLoading } = SettingStore();
    const { message, pro_stratagy, norequest, interval, gender, keyword, prospect, pro_convo, action, post_target } = prospection;
    const location = useLocation();
    const isInstagram = location.pathname.split("/")[1] === "ig";

    const handleOpen = (value) => {
        handleOpenSettingsTab(value);
        onClose();
    };

    const [ isEmpty, setIsEmpty] = useState(false)

    const messageTitle = tempMessageList.find((item) => item.id == message)?.title || t("prospecting.Message");
    const keywordTitle = keyWordList.find((item) => item.id == keyword)?.name ?? t("prospecting.None");

    useEffect(() => {
        const type = isInstagram ? 'instagram' : 'facebook'
        if (groupId)
            fetchProspectionData(type, groupId);
    }, []);

    useEffect(() => {
        if (!settingLoading && prospection) {
            if (prospection?.message === null || prospection?.message === undefined) {
                setIsEmpty(true);
            } else {
                setIsEmpty(false);
            }
        }
    }, [settingLoading, prospection?.message]);
    

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            width={isEmpty ? 600 : 900}
            className="custom-modal p-0"
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
                            handleOpen(1)
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
                            <h2 className="font-medium text-lg">{t("prospecting.Message Selected")}</h2>
                            <h3 className="border border-[#00000014] rounded-md p-4 text-[#0087FF] cursor-pointer" onClick={() => handleOpen(1)}>
                                {messageTitle}
                            </h3>
                            <Settings
                                proStratagy={pro_stratagy}
                                norequest={norequest}
                                interval={interval}
                                handleOpen={handleOpen}
                            />
                            {!isInstagram && (
                                <Filters gender={gender} keyword={keywordTitle} handleOpen={handleOpen} postType={postType} postTarget={post_target} />
                            )}
                            <AdvOptions
                                prospect={prospect}
                                pro_convo={pro_convo}
                                handleOpen={handleOpen}
                            />
                            <AddTags action={action} CRMList={CRMList} handleOpen={handleOpen} />
                        </div>
                        <div className="flex justify-end space-x-4 pr-4 mt-4">
                            <button
                                className="px-12 py-2 rounded-lg border border-[#0087FF] text-[#0087FF] cursor-pointer"
                                onClick={() => onClose()}
                            >
                                {t("prospecting.Cancel")}
                            </button>
                            <button
                                className={`px-12 py-2 rounded-lg bg-[#21BF7C] text-white cursor-pointer `}
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
    postType: PropTypes.string,
    tempMessageList: PropTypes.any,
    keyWordList: PropTypes.any,
    CRMList: PropTypes.any,
    handleOpenSettings: PropTypes.func
};

export default ConfirmationModal;
