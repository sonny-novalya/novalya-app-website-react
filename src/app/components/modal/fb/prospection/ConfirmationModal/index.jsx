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

const SettingsModal = ({ visible, onClose }) => {
    const { prospection, fetchProspectionData } = SettingStore();
    const { tempMessageList, fetchMessages } = useMessageSteps();
    const { message, stratagy, norequest, interval, gender, keyword, prospect, pro_convo, action } = prospection
    const { fetchKeywords, keyWordList } = useKeyWordStore();
    const { fetchCRMGroups, CRMList } = usefbCRM()

    // const [loading, setLoading] = useState(false)

    // useEffect(() => {
    //     const fetchData = async () => {
    //         setLoading(true);
    //         try {
    //             await fetchKeywords({ page: 1, limit: 100 });
    //             await fetchProspectionData();
    //             await fetchMessages({ page: 1, limit: 200 });
    //             await fetchCRMGroups();
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, []);


    useEffect(() => {
        fetchKeywords({ page: 1, limit: 100 });
        fetchProspectionData();
        fetchMessages({ page: 1, limit: 200 });
        fetchCRMGroups();

    }, []);

    const messageTitle = tempMessageList.find((item) => item.id === message) || "Message123"
    const keywordTitle = keyWordList.find((item) => item.id === keyword) || "Message123"

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
                <h3 className="border border-[#00000014] rounded-md p-4 text-[#0087FF]">
                    {messageTitle}
                </h3>
                <Settings stratagy={stratagy} norequest={norequest} interval={interval} />
                <Filters gender={gender} keyword={keywordTitle} />
                <AdvOptions prospect={prospect} pro_convo={pro_convo} />
                <AddTags action={action} CRMList={CRMList} />
            </div>
            <div className="flex justify-end space-x-4 pr-4 mt-4">
                {/* {loading && (
                    <div className="absolute inset-0 flex justify-center items-center bg-gray-100 opacity-50 z-50 rounded-lg">
                        <Spin size="large" />
                    </div>
                )} */}
                <button
                    className="px-12 py-2 rounded-lg border border-[#0087FF] text-[#0087FF] cursor-pointer"
                    onClick={() => onClose()}
                >
                    Cancel
                </button>
                <button
                    className={`px-12 py-2 rounded-lg bg-[#21BF7C] text-white cursor-pointer `}
                    id="start-novayla-connect"
                >
                    {t("prospecting.Next")}
                </button>
            </div>
        </Modal>
    );
};

SettingsModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    group: PropTypes.object,
};

SettingsModal.defaultProps = {
    group: null,
};

export default SettingsModal;
