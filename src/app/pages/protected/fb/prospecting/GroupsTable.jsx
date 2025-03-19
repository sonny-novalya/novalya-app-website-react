import { useState } from "react";
import { useNavigate } from "react-router-dom";  // Use useNavigate instead of useHistory
import { Table, Button, Input, Dropdown, Menu } from "antd";
import { SearchOutlined, SettingOutlined, SendOutlined, MoreOutlined } from "@ant-design/icons";
import GroupImg from "../../../../../assets/img/groupImg.png";
import SettingsModal from "../../../../components/modal/fb/prospection/SettingsModal/SettingsModal";
import ConfirmationModal from "../../../../components/modal/fb/prospection/ConfirmationModal";
import CreateFolderModal from "../../../../components/modal/fb/prospection/CreateFolderModal";
import useFbProspectingStore from "../../../../../store/fb/prospecting";
import { useSearchParams } from "react-router-dom";

const menu = (
    <Menu>
        <Menu.Item key="1">Facebook</Menu.Item>
        <Menu.Item key="2">Cloud</Menu.Item>
        <Menu.Item key="3">Delete</Menu.Item>
    </Menu>
);

const initialGroups = [
    { key: 1, groupName: "Longnamegroup Example", members: "All Members", privacy: "🌎", messagesSent: 110, folder: "asd" },
    { key: 2, groupName: "Group 2", members: "All Members", privacy: "🌍", messagesSent: 120, folder: "temp one" },
    { key: 3, groupName: "Group 3", members: "All Members", privacy: "🌍", messagesSent: 130, folder: "sample name 1" },
    { key: 4, groupName: "Group 4", members: "All Members", privacy: "🌍", messagesSent: 140, folder: "example name 2" },
    { key: 5, groupName: "Group 5", members: "All Members", privacy: "🌎", messagesSent: 150, folder: "demo name 3" },
    { key: 6, groupName: "Group 6", members: "All Members", privacy: "🌍", messagesSent: 160, folder: "test name 4" },
    { key: 7, groupName: "Group 7", members: "All Members", privacy: "🌎", messagesSent: 170, folder: "dummy name 5" },
    { key: 8, groupName: "Group 8", members: "All Members", privacy: "🌎", messagesSent: 180, folder: "asd" },
    { key: 9, groupName: "Group 9", members: "All Members", privacy: "🌍", messagesSent: 190, folder: "temp one" },
    { key: 10, groupName: "Group 10", members: "All Members", privacy: "🌍", messagesSent: 200, folder: "sample name 1" },
    { key: 11, groupName: "Group 11", members: "All Members", privacy: "🌎", messagesSent: 210, folder: "example name 2" },
    { key: 12, groupName: "Group 12", members: "All Members", privacy: "🌍", messagesSent: 220, folder: "demo name 3" },
    { key: 13, groupName: "Group 13", members: "All Members", privacy: "🌎", messagesSent: 230, folder: "test name 4" },
    { key: 14, groupName: "Group 14", members: "All Members", privacy: "🌍", messagesSent: 240, folder: "dummy name 5" },
    // Add more groups here up to 40-50
];


const GroupsTable = () => {
    const [searchParams] = useSearchParams();  // Use useSearchParams to get query parameters
    const f = searchParams.get("f");  // Get the 'f' query parameter from the URL
    const [searchText, setSearchText] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [openCreateFolderModal, setOpenCreateFolderModal] = useState(false);
    const { folders } = useFbProspectingStore();
    console.log("f parameter:", f);
    const navigate = useNavigate();  // Use navigate for routing in React Router v6+
    console.log("decodeURIComponent(f)", decodeURIComponent(f))
    // Filter groups based on the folder ID 'f' and search text
    const filteredData = initialGroups.filter(group => {
        // Check if the folder from the data matches the 'f' parameter and if the group name matches the search text
        const isMatchingFolder = group.folder.toLowerCase() === decodeURIComponent(f)?.toLowerCase();
        const isMatchingSearch = group.groupName.toLowerCase().includes(searchText.toLowerCase());
        return isMatchingFolder && isMatchingSearch;
    });


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
        console.log("group", group)
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
            )
        },
        {
            title: "Action",
            render: () => (
                <Dropdown overlay={menu} trigger={["click"]}>
                    <Button icon={<MoreOutlined />} className="bg-gray-200 px-3 py-1 rounded-md" />
                </Dropdown>
            ),
        },
    ];

    // Button data to display folders
    const buttonsData = [
        { id: 0, name: "All", selectedGroups: [] },
        { id: 1, name: "Archived", selectedGroups: [] },
    ];

    const handleFolderClick = (folderId) => {
        navigate(`/fb/prospecting?f=${folderId}`);  // Use navigate to route to the folder
    };

    return (
        <div>
            <div className="flex items-center justify-between my-4">
                <div className="space-x-2 overflow-x-auto max-w-full">
                    {
                        [...buttonsData, ...folders].map((folder, index) => (
                            <Button
                                key={index}
                                className="bg-gray-200 px-4 py-2 rounded-md"
                                onClick={() => handleFolderClick(folder.id)}  // Handle folder click to route
                            >
                                {folder.name}
                            </Button>
                        ))
                    }
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
                />
            )}

            {openCreateFolderModal && (
                <CreateFolderModal
                    visible={openCreateFolderModal}
                    onClose={handleCloseCreateFolderModal}
                />
            )}
        </div>
    );
};

export default GroupsTable;
