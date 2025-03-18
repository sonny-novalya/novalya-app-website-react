import { Modal} from "antd";
import PropTypes from "prop-types";
import CreateFolderSelectGroups from "./createFolderSelectGroups";
import UpdateFolderSelectGroups from "./UpdateFolderSelectGroups";

const CreateFolderModal = ({ visible, onClose, isUpdate }) => {
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
                    {
                        isUpdate 
                        ? "Create Folder"
                        : "Edit Folder"
                    }
                </h2>
                <h3 className="border border-[#00000014] rounded-md p-4">
                    Newly Added
                </h3>
                <h2 className="font-medium text-lg mb-4">Select Groups</h2>
                {
                    isUpdate
                    ? <UpdateFolderSelectGroups />
                    : <CreateFolderSelectGroups />
                }
            </div>
        </Modal>
    );
};

CreateFolderModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    group: PropTypes.object,
    isUpdate: PropTypes.bool,
};

CreateFolderModal.defaultProps = {
    group: null,
    isUpdate: false
};

export default CreateFolderModal;
