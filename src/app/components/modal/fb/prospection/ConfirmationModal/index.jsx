import { Modal} from "antd";
import PropTypes from "prop-types";
import Settings from "./Settings";
import Filters from "./Filters";
import AdvOptions from "./AdvOptions";
import AddTags from "./AddTags";
import { t } from "i18next";

const SettingsModal = ({ visible, onClose }) => {

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            width={900}
            className="custom-modal p-0"
        >
            <div className="flex flex-col h-[calc(100vh-200px)] p-0 space-y-5 overflow-y-auto ">
                <h2 className="font-medium text-lg">{t("prospecting.Message Selected")}</h2>
                <h3 className="border border-[#00000014] rounded-md p-4 text-[#0087FF]">
                    Message #12345
                </h3>
                <Settings />
                <Filters />
                <AdvOptions />
                <AddTags />
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
