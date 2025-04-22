import { Modal } from "antd";
import PropTypes from "prop-types";
import Settings from "./Settings";
import Filters from "./Filters";
import AdvOptions from "./AdvOptions";
import AddTags from "./AddTags";
import { t } from "i18next";
import { useEffect } from "react";
import SettingStore from "../../../../../../store/prospection/settings-store";
import useMessageSteps from "../../../../../../store/messageTemp/MessageTemp";
import useKeyWordStore from "../../../../../../store/keyword/keywordStore";
import usefbCRM from "../../../../../../store/fb/fbCRM";
import { useLocation } from "react-router-dom";

const ConfirmationModal = ({ visible, onClose, handleOpenSettingsTab, groupId }) => {
    const { prospection, fetchProspectionData } = SettingStore();
    const { tempMessageList, fetchMessages } = useMessageSteps();
    const { message, pro_stratagy, norequest, interval, gender, keyword, prospect, pro_convo, action } = prospection;
    const { fetchKeywords, keyWordList } = useKeyWordStore();
    const { fetchCRMGroups, CRMList } = usefbCRM();
    const location = useLocation();
    const isInstagram = location.pathname.split("/")[1] === "ig";

    const handleOpen = (value) => {
        handleOpenSettingsTab(value);
        onClose();
    };

    useEffect(() => {
        fetchKeywords({ page: 1, limit: 100 });
        groupId && fetchProspectionData(isInstagram ? 'instagram' : 'facebook', groupId);
        fetchMessages({ page: 1, limit: 200 });
        fetchCRMGroups();
    }, []);

    const messageTitle = tempMessageList.find((item) => item.id == message)?.title || 'Message';
    const keywordTitle = keyWordList.find((item) => item.id == keyword)?.name ?? "None";

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            width={900}
            className="custom-modal p-0"
            closeIcon={null}
            centered
        >
            <div className="flex flex-col h-[calc(100vh-200px)] p-0 space-y-5 overflow-y-auto ">
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
                    <Filters gender={gender} keyword={keywordTitle} handleOpen={handleOpen} />
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
                    Cancel
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
        </Modal>
    );
};

ConfirmationModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    handleOpenSettingsTab: PropTypes.func,
    groupId: PropTypes.string,
};

export default ConfirmationModal;
