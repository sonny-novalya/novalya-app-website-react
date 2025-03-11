import { useState } from "react";
import { Modal, Tabs } from "antd";
import SelectMessage from "./SelectMessage";
import Settings from "./Settings";
import Filters from "./Filters";
import AdvOptions from "./AdvOptions";
import AddTags from "./AddTags";
import PropTypes from "prop-types";

const SettingsModal = ({ visible, onClose, group }) => {
    const [activeKey, setActiveKey] = useState("1");
    console.log("group", group)
    const tabItems = [
        { label: "Select Message", key: "1", children: <SelectMessage /> },
        { label: "Settings", key: "2", children: <Settings /> },
        { label: "Filters", key: "3", children: <Filters /> },
        { label: "Advanced Options", key: "4", children: <AdvOptions /> },
        { label: "Add Tags", key: "5", children: <AddTags /> },
    ];

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            width={900}
            className="custom-modal p-0"
        >
            <div className="flex h-[calc(100vh-200px)] p-0">
                <div className="w-1/4 min-w-[200px] max-w-[250px] overflow-hidden">
                    <Tabs
                        tabPosition="left"
                        activeKey={activeKey}
                        onChange={setActiveKey}
                        items={tabItems.map(({ label, key }) => ({
                            label: (
                                <span className="whitespace-nowrap overflow-hidden text-ellipsis block px-2">
                                    {label}
                                </span>
                            ),
                            key
                        }))}
                        className="custom-tabs"
                    />
                </div>

                <div className="w-3/4 px-4 overflow-auto">
                    {tabItems.find(tab => tab.key === activeKey)?.children}
                </div>
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
