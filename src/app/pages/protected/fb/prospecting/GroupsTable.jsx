import { useState } from "react";
import { Table, Button, Input, Dropdown, Menu } from "antd";
import { SearchOutlined, SettingOutlined, SendOutlined, MoreOutlined } from "@ant-design/icons";
import GroupImg from "../../../../../assets/img/groupImg.png";
import SettingsModal from "../../../../components/modal/fb/prospection/SettingsModal/SettingsModal";
import ConfirmationModal from "../../../../components/modal/fb/prospection/ConfirmationModal";
import CreateFolderModal from "../../../../components/modal/fb/prospection/CreateFolderModal";

const menu = (
    <Menu>
        <Menu.Item key="1">Facebook</Menu.Item>
        <Menu.Item key="2">Cloud</Menu.Item>
        <Menu.Item key="3">Delete</Menu.Item>
    </Menu>
);

const initialGroups = Array(7).fill(null).map(() => ({
    key: Math.random(),
    groupName: "Longnamegroup Example",
    members: "All Members",
    privacy: "🌎",
    messagesSent: 110,
    folder: "Interested Buyer",
}));

const GroupsTable = () => {
    const [searchText, setSearchText] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [openCreateFolderModal, setOpenCreateFolderModal] = useState(false);

    const filteredData = initialGroups.filter(group =>
        group.groupName.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleOpenSettings = (group) => {
        setSelectedGroup(group);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedGroup(null);
    };

    const handleOpenConfirmModal = (group) => {
        setConfirmModalOpen(true);
        console.log("Saved data", group)
        // handle states of pre saved data here
    };

    const handleCloseConfirmModal = () => {
        setConfirmModalOpen(false);
    };

    const handleCloseCreateFolderModal = () => {
        setOpenCreateFolderModal(false);
    };

    const groupColumns = [
        {
            title: "Group's Name",
            dataIndex: "groupName",
            render: (text) => (
                <div className="flex items-center space-x-2">
                    <img src={GroupImg} alt="Group" className="w-10 h-10 rounded-full object-cover" />
                    <span className="font-semibold">{text}</span>
                </div>
            ),
        },
        { title: "Members", dataIndex: "members" },
        { title: "Privacy", dataIndex: "privacy" },
        { title: "Messages sent", dataIndex: "messagesSent" },
        {
            title: "Folder",
            dataIndex: "folder",
            render: (text) => <span className="px-3 py-1 rounded-lg bg-green-200 text-green-800 font-medium">{text}</span>,
        },
        {
            title: "Settings",
            render: (_, record) => (
                <Button
                    icon={<SettingOutlined />}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md"
                    onClick={() => handleOpenSettings(record)} 
                >
                    Settings
                </Button>
            ),
        },
        {
            title: "Send", 
            render: (_, record) => (
            <Button 
                icon={<SendOutlined />} 
                className="bg-gray-200 px-3 py-1 rounded-md" 
                onClick={() => handleOpenConfirmModal(record)} />
        ) },
        {
            title: "Action",
            render: () => (
                <Dropdown overlay={menu} trigger={["click"]}>
                    <Button icon={<MoreOutlined />} className="bg-gray-200 px-3 py-1 rounded-md" />
                </Dropdown>
            ),
        },
    ];

    return (
        <div>
            <div className="flex items-center justify-between my-4">
                <div className="space-x-2">
                    <Button className="bg-gray-200 px-4 py-2 rounded-md">All</Button>
                    <Button className="bg-gray-200 px-4 py-2 rounded-md">Archived</Button>
                    <Button className="bg-gray-200 px-4 py-2 rounded-md" onClick={() => setOpenCreateFolderModal(true)}>+ Create Folder</Button>
                </div>
                <Button className="bg-blue-500 text-white px-4 py-2 rounded-md">Add new group</Button>
            </div>
            <div className="flex items-center justify-between mb-4">
                <Input
                    placeholder="Search groups"
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-1/3 px-3 py-2 rounded-md border border-gray-300"
                />
                <Button className="bg-gray-200 px-4 py-2 rounded-md">Sort by</Button>
            </div>
            <Table columns={groupColumns} dataSource={filteredData} pagination={false} className="custom-table" />

            {/* Settings Modal - Open only when modalOpen is true */}
            {modalOpen && (
                <SettingsModal
                    visible={modalOpen}
                    onClose={handleCloseModal}
                    group={selectedGroup} 
                />
            )}

            {confirmModalOpen && (
                <ConfirmationModal
                    visible={confirmModalOpen}
                    onClose={handleCloseConfirmModal}
                    // group={selectedGroup}
                />
            )}

            {openCreateFolderModal && (
                <CreateFolderModal
                    visible={openCreateFolderModal}
                    onClose={handleCloseCreateFolderModal}
                    // group={selectedGroup}
                />
            )}
        </div>
    );
};

export default GroupsTable;
