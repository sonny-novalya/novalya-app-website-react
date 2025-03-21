import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // Use useNavigate instead of useHistory
import { Table, Button, Input, Dropdown, Menu } from "antd";
import { SearchOutlined, SettingOutlined, SendOutlined, MoreOutlined } from "@ant-design/icons";
import GroupImg from "../../../../../assets/img/groupImg.png";
import SettingsModal from "../../../../components/modal/fb/prospection/SettingsModal/SettingsModal";
import ConfirmationModal from "../../../../components/modal/fb/prospection/ConfirmationModal";
import CreateFolderModal from "../../../../components/modal/fb/prospection/CreateFolderModal";
import useFbProspectingStore from "../../../../../store/fb/prospecting";
import { useSearchParams } from "react-router-dom";
import useGroupStore from "../../../../../store/group/groupStore";
import { formatNumber } from "../../../../../helpers/formatGroupMembers";

const menu = (
    <Menu>
        <Menu.Item key="1">Facebook</Menu.Item>
        <Menu.Item key="2">Cloud</Menu.Item>
        <Menu.Item key="3">Delete</Menu.Item>
    </Menu>
);

const GroupsTable = () => {
    const [searchParams] = useSearchParams();  // Use useSearchParams to get query parameters
    const f = searchParams.get("f");  // Get the 'f' query parameter from the URL
    const [searchText, setSearchText] = useState("");
    const [selectedFolder, setSelectedFolder] = useState(f ? decodeURIComponent(f) : "All");

    const [modalOpen, setModalOpen] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [openCreateFolderModal, setOpenCreateFolderModal] = useState(false);
    const { folders = [], setFolders } = useFbProspectingStore();
    const { groups, fetchGroups } = useGroupStore();

    console.log("folders", folders)
    const socialType = "fb_groups"; 

    const navigate = useNavigate();  

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
            dataIndex: "name",
            render: (text) => (
                <div className="flex items-center space-x-2">
                    <img src={GroupImg} alt="Group" className="w-10 h-10 rounded-full object-cover" />
                    <span className="font-semibold max-w-72 overflow-hidden text-ellipsis whitespace-nowrap">{text}</span>
                </div>
            ),
        },
        { title: "Members", dataIndex: "group_type" },
        {
            title: "Privacy", dataIndex: "privacy", render: () => (
                <span className="">
                    🌎
                </span>
            ), },
        // { title: "Messages sent", dataIndex: "messagesSent" },
        {
            title: "Total Members", dataIndex: "total_member", render: (text) => (
                <span>{formatNumber(text)}</span>
        ) },
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

    const buttonsData = [
        { id: 0, folder_name: "All", selectedGroups: [] },
        { id: 1, folder_name: "Archived", selectedGroups: [] },
    ];

    const handleFolderClick = (folderId) => {
        setSelectedFolder(folderId.toString());
        navigate(`/fb/prospecting?f=${encodeURIComponent(folderId)}`);
    };

    useEffect(() => {
        fetchGroups()
    }, []);

    useEffect(() => {
        setFolders(socialType); 
    }, [setFolders, socialType]);

    return (
        <div className="bg-white p-2">
            <div className="flex items-center justify-between ">
                <div className="space-x-2 overflow-x-auto max-w-full mb-2">
                    {
                        [...buttonsData, ...(Array.isArray(folders) ? folders : [])].map((folder, index) => (
                            <button
                                key={index}
                                className={`px-4 text-sm py-1.5 rounded cursor-pointer hover:bg-[#D7E5F3] hover:text-[#005199] ${selectedFolder == folder.id ? "bg-[#D7E5F3] text-[#005199]" : "bg-[#F2F2F2] text-[#00000080]"}`}
                                onClick={() => handleFolderClick(folder.id)}
                            >
                                {folder.folder_name}
                            </button>
                        ))
                    }

                    <button className={`px-4 text-sm py-1.5 rounded cursor-pointer bg-[#F2F2F2] text-[#00000080]`} onClick={() => setOpenCreateFolderModal(true)}><span className="text-[#005199]">+</span>{" "}Create Folder</button>
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
            <Table columns={groupColumns} dataSource={groups} pagination={false} className="custom-table" />

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
                    groups={groups}
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
