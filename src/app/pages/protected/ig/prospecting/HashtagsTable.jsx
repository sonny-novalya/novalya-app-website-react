import { useEffect, useState } from "react";
import { Table, Button, Input, Dropdown, Menu } from "antd";
import { SearchOutlined, MoreOutlined, SettingOutlined, SendOutlined } from "@ant-design/icons";
import CreateFolderModal from "../../../../components/modal/fb/prospection/CreateFolderModal";
import useFbProspectingStore from "../../../../../store/fb/prospecting";
import SettingsModal from "../../../../components/modal/fb/prospection/SettingsModal/SettingsModal";
import UpdateFolderModal from "../../../../components/modal/fb/prospection/UpdateFolderModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGroupStore from "../../../../../store/group/groupStore";
import { formatNumber } from "../../../../../helpers/formatGroupMembers";
import GroupImg from "../../../../../assets/img/groupImg.png";
import { EditIcon2 } from "../../../common/icons/icons";
import ConfirmationModal from "../../../../components/modal/fb/prospection/ConfirmationModal";
import ProspectingLayout from "../../helpersLayout/ProspectingLayout";
import { t } from "i18next";

const menu = (
    <Menu>
        <Menu.Item key="1">Facebook</Menu.Item>
        <Menu.Item key="2">Cloud</Menu.Item>
        <Menu.Item key="3">Delete</Menu.Item>
    </Menu>
);

const HashtagsTable = () => {
    const [searchParams] = useSearchParams();
    const f = searchParams.get("f");
    const [searchText, setSearchText] = useState("");
    const [selectedFolder, setSelectedFolder] = useState(f ? decodeURIComponent(f) : 0);

    const [modalOpen, setModalOpen] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [openCreateFolderModal, setOpenCreateFolderModal] = useState(false);
    const [openUpdateFolderModal, setOpenUpdateFolderModal] = useState(false);
    const [folderId, setFolderId] = useState(null);
    const [folderName, setFolderName] = useState("");
    const { folders = [], setFolders } = useFbProspectingStore();
    const { groups, fetchGroups } = useGroupStore();
    const socialType = "ig_hashtags";
    const [activeKey, setActiveKey] = useState(1);

    const navigate = useNavigate();

    const handleOpenSettingsTab = (value) => {
        setActiveKey(value);
        setModalOpen(true);
    };

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
    };

    const handleCloseConfirmModal = () => {
        setConfirmModalOpen(false);
    };

    const handleCloseCreateFolderModal = () => {
        setOpenCreateFolderModal(false);
    };

    const handleCloseUpdateFolderModal = () => {
        setOpenUpdateFolderModal(false);
    };

    const handleFolderClick = (folderId) => {
        setSelectedFolder(folderId.toString());
        navigate(`/ig/prospecting/posts?f=${encodeURIComponent(folderId)}`);
    };

    useEffect(() => {
        if (socialType) {
            if (selectedFolder == 0) {
                fetchGroups(socialType, null);
            } else {
                fetchGroups(socialType, selectedFolder);
            }
        }
    }, [selectedFolder]);


    useEffect(() => {
        setFolders(socialType);
    }, [setFolders, socialType]);

    const postColumns = [
        {
            title: t("prospecting.Group's Name"),
            dataIndex: "name",
            render: (text) => (
                <div className="flex items-center space-x-2">
                    <img src={GroupImg} alt="Group" className="w-10 h-10 rounded-full object-cover" />
                    <span className="font-semibold max-w-72 overflow-hidden text-ellipsis whitespace-nowrap">{text}</span>
                </div>
            ),
        },
        { title: t("prospecting.Members"), dataIndex: "group_type" },
        {
            title: t("prospecting.Privacy"), dataIndex: "privacy", render: () => (
                <span className="">
                    🌎
                </span>
            ),
        },
        // { title: "Messages sent", dataIndex: "messagesSent" },
        {
            title: t("prospecting.Total Members"), dataIndex: "total_member", render: (text) => (
                <span>{formatNumber(text)}</span>
            )
        },
        {
            title: t("prospecting.Folder"),
            dataIndex: "folder",
            render: (text) => <span className="px-3 py-1 rounded-lg bg-green-200 text-green-800 font-medium">{text}</span>,
        },
        {
            title: t("prospecting.Settings"),
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
            title: t("prospecting.Send"),
            render: (_, record) => (
                <Button
                    icon={<SendOutlined />}
                    className="bg-gray-200 px-3 py-1 rounded-md"
                    onClick={() => handleOpenConfirmModal(record)} />
            )
        },
        {
            title: t("prospecting.Action"),
            render: () => (
                <Dropdown overlay={menu} trigger={["click"]}>
                    <Button icon={<MoreOutlined />} className="bg-gray-200 px-3 py-1 rounded-md" />
                </Dropdown>
            ),
        },
    ];

    const buttonsData = [
        { id: 0, folder_name: "All", selectedGroups: [] },
        // { id: 1, folder_name: "Archived", selectedGroups: [] },
    ];

    return (
        <ProspectingLayout>
            <div className="bg-white p-2">
                <div className="flex items-center justify-between ">
                    <div className="space-x-2 overflow-x-auto max-w-full mb-2 flex">
                        {
                            [...buttonsData, ...(Array.isArray(folders) ? folders : [])].map((folder, index) => (
                                <div className="flex items-center" key={index}>
                                    <button
                                        className={`px-4 text-sm py-1.5 rounded cursor-pointer hover:bg-[#D7E5F3] hover:text-[#005199] ${selectedFolder == folder.id ? "bg-[#D7E5F3] text-[#005199]" : "bg-[#F2F2F2] text-[#00000080]"}`}
                                        onClick={() => handleFolderClick(folder.id)}
                                    >
                                        <div className="flex space-x-2 items-center">
                                            <span>{folder.folder_name}</span>
                                        </div>
                                    </button>
                                    <span className="ml-1 cursor-pointer" onClick={() => {
                                        setFolderId(folder.id)
                                        setFolderName(folder.folder_name)
                                        setOpenUpdateFolderModal(true)
                                    }}>
                                        {
                                            selectedFolder == folder.id && folder.id !== 0 &&
                                            <EditIcon2 />
                                        }
                                    </span>
                                </div>
                            ))
                        }

                        <button className={`px-4 text-sm py-1.5 rounded cursor-pointer bg-[#F2F2F2] text-[#00000080]`} onClick={() => setOpenCreateFolderModal(true)}><span className="text-[#005199]">+</span>{" "}{t("prospecting.Create Folder")}</button>
                    </div>

                </div>
                <div className="flex items-center justify-between mb-4">
                    <Input
                        placeholder="Search groups"
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="w-1/3 px-3 py-2 rounded-md border border-gray-300"
                    />
                    <Button className="bg-gray-200 px-4 py-2 rounded-md">{t("prospecting.Sort By")}</Button>
                </div>
                <Table columns={postColumns} dataSource={groups} pagination={false} className="custom-table" />

                {modalOpen && (
                    <SettingsModal
                        visible={modalOpen}
                        onClose={handleCloseModal}
                        group={selectedGroup}
                        socialType={socialType}
                        activeKey={activeKey}
                        setActiveKey={setActiveKey}
                    />
                )}

                {confirmModalOpen && (
                    <ConfirmationModal
                        visible={confirmModalOpen}
                        onClose={handleCloseConfirmModal}
                        groups={groups}
                        socialType={socialType}
                        handleOpenSettingsTab={handleOpenSettingsTab}
                    />
                )}

                {openCreateFolderModal && (
                    <CreateFolderModal
                        visible={openCreateFolderModal}
                        onClose={handleCloseCreateFolderModal}
                        socialType={socialType}
                    />
                )}

                {openUpdateFolderModal && (
                    <UpdateFolderModal
                        folderId={folderId}
                        folderName={folderName}
                        visible={openUpdateFolderModal}
                        onClose={handleCloseUpdateFolderModal}
                        socialType={socialType}
                    />
                )}
            </div>
        </ProspectingLayout>
    );
};

export default HashtagsTable;
