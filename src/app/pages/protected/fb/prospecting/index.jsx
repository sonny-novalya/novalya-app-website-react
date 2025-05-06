/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Table, Button, Input, Dropdown, Menu } from "antd";
import { SearchOutlined, MoreOutlined, FilterOutlined } from "@ant-design/icons";
import GroupImg from "../../../../../assets/img/groupImg.png";
import SettingsModal from "../../../../components/modal/fb/prospection/SettingsModal/SettingsModal";
import ConfirmationModal from "../../../../components/modal/fb/prospection/ConfirmationModal";
import CreateFolderModal from "../../../../components/modal/fb/prospection/CreateFolderModal";
import useFbProspectingStore from "../../../../../store/fb/prospecting";
import { useSearchParams } from "react-router-dom";
import useGroupStore from "../../../../../store/group/groupStore";
import { formatNumber } from "../../../../../helpers/formatGroupMembers";
import { DeleteFillRedIcon, EditIcon2, FacebookIcon, SendIconBlue, SendIconGray, SettingsIconWhite, SyncBlueIcon } from "../../../common/icons/icons";
import UpdateFolderModal from "../../../../components/modal/fb/prospection/UpdateFolderModal";
import { t } from "i18next";
import { getGroupTypeNames } from "../../../../../helpers/getGroupTypeNames";
import Layout from "../../Layout";
import { useRef } from "react";
import useMessageSteps from "../../../../../store/messageTemp/MessageTemp";
import useKeyWordStore from "../../../../../store/keyword/keywordStore";
import SettingStore from "../../../../../store/prospection/settings-store";



const FbProspecting = () => {
    const [searchParams] = useSearchParams();
    const f = searchParams.get("f");
    const [searchText, setSearchText] = useState("");
    const [selectedFolder, setSelectedFolder] = useState(f ? decodeURIComponent(f) : 0);

    const [modalOpen, setModalOpen] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [openCreateFolderModal, setOpenCreateFolderModal] = useState(false);
    const [openUpdateFolderModal, setOpenUpdateFolderModal] = useState(false);
    // const [folderId, setFolderId] = useState(null);
    const [folderName, setFolderName] = useState("");
    const { folders = [], setFolders } = useFbProspectingStore();
    const { groups, fetchGroups, storeFilters, updateFilters, loading, totalPages, totalGrp, deleteGroup, folderUpdateId, setFolderUpdateId } = useGroupStore();
    const socialType = "fb_groups";
    const prospect_folder = "fb";

    const [activeKey, setActiveKey] = useState(1);
    const [primaryGroupId, setPrimaryGroupId] = useState(null);

    const [openDropdownKey, setOpenDropdownKey] = useState(null);
    const [confirmModalKey, setConfirmModalKey] = useState(null);
    const [postType, setPostType] = useState(null);
    const [selectedSortLabel, setSelectedSortLabel] = useState("Sort By");
    const { keyWordList, fetchKeywords } = useKeyWordStore();
    const { tempMessageList, fetchMessages } = useMessageSteps();

    const { CRMList, fetchCRMGroups } = SettingStore();


    const dropdownRefs = useRef({});

    const handleOpenSettingsTab = (value) => {
        setActiveKey(value);
        setModalOpen(true);
    };

    const handleOpenSettings = (groupId, groupType) => {
        localStorage.setItem("selectedGroupId", groupId);
        setPostType(groupType)
        setActiveKey(1);
        setPrimaryGroupId(groupId);
        setModalOpen(true);
    };


    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleOpenConfirmModal = (groupId, groupType) => {
        setPostType(groupType)
        setPrimaryGroupId(groupId)
        setConfirmModalOpen(true);
    };

    const handleCloseConfirmModal = () => {
        // setPrimaryGroupId(null)
        setConfirmModalOpen(false);
    };

    const handleCloseCreateFolderModal = () => {
        setOpenCreateFolderModal(false);
    };

    const handleCloseUpdateFolderModal = () => {
        setOpenUpdateFolderModal(false);
    };

    const getFolderNames = (folderIds) => {
        if (![0, 11111111111, 22222222222].includes(Number(selectedFolder))) {
            const folder = folders?.find((item) => item.id == selectedFolder);
            return (
                <div className="flex items-center justify-center space-x-2 bg-green-500 px-2 py-1 rounded-md text-white hover:bg-green-600 cursor-pointer">
                    <span className="font-semibold max-w-72 overflow-hidden text-ellipsis whitespace-nowrap">
                        {folder ? folder.folder_name : t("prospecting.None")}
                    </span>
                </div>
            );
        }

        if (folderIds === null) return <div className="flex items-center justify-center space-x-2 p-2 rounded-lg">
            <span className="font-semibold max-w-72 overflow-hidden text-ellipsis whitespace-nowrap">
                {t("prospecting.None")}
            </span>
        </div>;

        let folderIdArray = [];
        try {
            folderIdArray = JSON.parse(folderIds);
            if (!Array.isArray(folderIdArray)) folderIdArray = [];
        } catch (error) {
            console.warn("Invalid folderIds:", error);
            folderIdArray = [];
        }
        const folderNames = folderIdArray
            .map(id => {
                const folder = folders.find(f => f.id === id);
                return folder ? folder.folder_name : null;
            })
            .filter(name => name !== null);

        if (folderNames.length === 0) return <div className="flex items-center justify-center space-x-2 p-2 rounded-lg">
            <span className="font-semibold max-w-72 overflow-hidden text-ellipsis whitespace-nowrap">
                {t("prospecting.None")}
            </span>
        </div>;
        if (folderNames.length === 1) {
            return (
                <div className="flex items-center justify-center space-x-2 bg-green-500 px-2 py-1 rounded-md text-white hover:bg-green-600 cursor-pointer">
                    <span className="font-semibold max-w-72 overflow-hidden text-ellipsis whitespace-nowrap">
                        {folderNames[0]}
                    </span>
                </div>
            );
        }

        return (
            <div className="flex items-center justify-center space-x-2 bg-green-500 px-2 py-1 rounded-md text-white hover:bg-green-600 cursor-pointer">
                <span className="font-semibold max-w-72 overflow-hidden text-ellipsis whitespace-nowrap">{folderNames[0]}</span>
                <Dropdown overlay={<Menu>{folderNames.slice(1).map((name, index) => <Menu.Item key={index}>{name}</Menu.Item>)}</Menu>} trigger={['hover']}>
                    <span className="cursor-pointer">
                        + {folderNames.length - 1}
                    </span>
                </Dropdown>
            </div>
        );
    };

    // const groupTypeColumn = (
    //     <div className="flex items-center space-x-3">
    //         <span>{t("prospecting.Type")}</span>
    //         <Dropdown
    //             overlay={
    //                 <Menu>
    //                     {[
    //                         { key: 'member', label: t("prospecting.Member") },
    //                         { key: 'things in common', label: t("prospecting.Things In Common") },
    //                         { key: 'post-like', label: t("prospecting.Post") },
    //                     ].map((type, index) => (
    //                         <Menu.Item key={index} onClick={() => {
    //                             updateFilters({
    //                                 ...storeFilters,
    //                                 group_type: type.key,
    //                                 page: 1,
    //                                 limit: 25,
    //                             });
    //                         }}>
    //                             {type.label}
    //                         </Menu.Item>
    //                     ))}
    //                 </Menu>
    //             }
    //             trigger={['click']}
    //         >
    //             <FilterOutlined className="cursor-pointer" />
    //         </Dropdown>
    //     </div>
    // );

    const GroupNameColumn = (
        <div className="flex items-center space-x-2">
            <span>{t("prospecting.Group Name")}</span>
            {storeFilters.sort_by === 0 && storeFilters.field === "name" ? (
                <button
                    className="w-8 h-8 border-none cursor-pointer"
                    onClick={() => {
                        updateFilters({
                            ...storeFilters,
                            sort_by: 1,
                            field: "name"
                        });
                    }}
                >
                    <svg
                        className="transform rotate-180"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M15.062 12.0249L10.0036 17.0832L4.94531 12.0249"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M10 2.91675V16.9417"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            ) : (
                <button
                    className="w-8 h-8 border-none cursor-pointer"
                    onClick={() => {
                        updateFilters({
                            ...storeFilters,
                            sort_by: 0,
                            field: "name"
                        });
                    }}
                >
                    <svg
                        className="transform rotate-0"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M15.062 12.0249L10.0036 17.0832L4.94531 12.0249"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M10 2.91675V16.9417"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            )}

        </div>
    );

    const TypeColumn = (
        <div className="flex items-center space-x-2">
            <span>{t("prospecting.Type")}</span>
            {storeFilters.sort_by === 0 && storeFilters.field === "type" ? (
                <button
                    className="w-8 h-8 border-none cursor-pointer"
                    onClick={() => {
                        updateFilters({
                            ...storeFilters,
                            sort_by: 1,
                            field: "type"
                        });
                    }}
                >
                    <svg
                        className="transform rotate-180"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M15.062 12.0249L10.0036 17.0832L4.94531 12.0249"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M10 2.91675V16.9417"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            ) : (
                <button
                    className="w-8 h-8 border-none cursor-pointer"
                    onClick={() => {
                        updateFilters({
                            ...storeFilters,
                            sort_by: 0,
                            field: "type"
                        });
                    }}
                >
                    <svg
                        className="transform rotate-0"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M15.062 12.0249L10.0036 17.0832L4.94531 12.0249"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M10 2.91675V16.9417"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            )}

        </div>
    );

    const TotalMemberColumn = (
        <div className="flex items-center space-x-2">
            <span>{t("prospecting.Total Members")}</span>
            {storeFilters.sort_by === 0 && storeFilters.field === "total_member" ? (
                <button
                    className="w-8 h-8 border-none cursor-pointer"
                    onClick={() => {
                        updateFilters({
                            ...storeFilters,
                            sort_by: 1,
                            field: "total_member"
                        });
                    }}
                >
                    <svg
                        className="transform rotate-180"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M15.062 12.0249L10.0036 17.0832L4.94531 12.0249"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M10 2.91675V16.9417"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            ) : (
                <button
                    className="w-8 h-8 border-none cursor-pointer"
                    onClick={() => {
                        updateFilters({
                            ...storeFilters,
                            sort_by: 0,
                            field: "total_member"
                        });
                    }}
                >
                    <svg
                        className="transform rotate-0"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M15.062 12.0249L10.0036 17.0832L4.94531 12.0249"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M10 2.91675V16.9417"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            )}

        </div>
    );

    const handlePageChange = (obj) => {
        updateFilters({
            ...storeFilters,
            page: obj.current,
            limit: obj.pageSize,
        });
    };

    const toggleDropdown = (key) => {
        if (confirmModalKey === null) {
            setOpenDropdownKey(openDropdownKey === key ? null : key);
        }
    };

    const handleMenuClick = (key, action) => {
        if (action === 'Delete') {
            setOpenDropdownKey(null);
            setConfirmModalKey(key);

            setTimeout(() => {
                setConfirmModalKey(null);
                setOpenDropdownKey(key);
            }, 3000);
        } else {
            setOpenDropdownKey(null);
        }
    };

    const setDropdownRef = (key, element) => {
        dropdownRefs.current[key] = element;
    };
    const RowDropdown = ({ record }) => {
        const isOpen = openDropdownKey === record.id;
        const isConfirming = confirmModalKey === record.id;

        return (
            <div className="relative" ref={(el) => setDropdownRef(record.id, el)}>
                {isOpen && !isConfirming && (
                    <div className="absolute right-0 z-10 mt-1 origin-top-right bg-white rounded-md shadow-lg focus:outline-none">
                        <div className="flex space-x-3 px-2 py-1 rounded-md">
                            <button
                                onClick={() => window.open(record.url, "_blank")}
                                className="cursor-pointer"
                            >
                                <FacebookIcon />
                            </button>
                            <button
                                className=" sync-members  cursor-pointer"
                                data-group={JSON.stringify({
                                    id: record.id,
                                    url: record.url,
                                    type: record.group_type
                                })}
                            >
                                <SyncBlueIcon />
                            </button>
                            <button
                                onClick={() => handleMenuClick(record.id, 'Delete')}
                                className="cursor-pointer"
                            >
                                <DeleteFillRedIcon />
                            </button>
                        </div>
                    </div>
                )}

                {isConfirming && (
                    <div className="absolute right-3 z-10 mt-1 origin-top-right bg-white rounded-md shadow-lg"
                        onClick={async () => {
                            await deleteGroup({ id: record.id });
                            setConfirmModalKey(null);
                            setOpenDropdownKey(null);
                            fetchGroups(storeFilters);
                        }}
                    >
                        <p className="px-4 py-1.5 text-red-500 cursor-pointer">{t("prospecting.Really")}??</p>
                    </div>
                )}
            </div>
        );
    };

    const groupColumns = [
        {
            title: (GroupNameColumn),
            dataIndex: "name",
            render: (text, record) => (
                <div className="flex items-center space-x-2">
                    <img src={record.post_image || GroupImg} alt="Group" className="w-10 h-10 rounded-full object-cover" />
                    <span className="font-semibold max-w-72 overflow-hidden text-ellipsis whitespace-nowrap">{text}</span>
                </div>
            ),
        },
        {
            title: (TypeColumn),
            dataIndex: "group_type",
            render: (text) => (
                <span className="font-semibold max-w-72 overflow-hidden text-ellipsis whitespace-nowrap">
                    {getGroupTypeNames(text)}
                </span>
            ),
        },
        {
            title: t("prospecting.Privacy"), dataIndex: "privacy", render: () => (
                <span className="">
                    🌎
                </span>
            ),
        },
        // { title: "Messages sent", dataIndex: "messagesSent" },
        {
            title: (TotalMemberColumn),
            dataIndex: "total_member", render: (text) => (
                <span>{formatNumber(text)}</span>
            )
        },
        {
            title: t("prospecting.Folder"),
            dataIndex: "grp_folder_ids",
            render: (folderIds) => <span className="">{getFolderNames(folderIds)}</span>,
        },
        {
            title: t("prospecting.Settings"),
            render: (_, record) => (
                <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-md flex space-x-1 items-center cursor-pointer"
                    onClick={() => handleOpenSettings(record.id, record.group_type)}
                >
                    <span>
                        <SettingsIconWhite />
                    </span>
                    <span>
                        {t("prospecting.Settings")}
                    </span>
                </button>
            ),
        },
        {
            title: t("prospecting.Send"),
            render: (_, record) => (
                <button onClick={() => handleOpenConfirmModal(record.id, record.group_type)} className="cursor-pointer mt-1">
                    {
                        record.id?.toString() === primaryGroupId?.toString()
                            ? <SendIconBlue />
                            : <SendIconGray />
                    }
                </button>
            )
        },
        {
            title: t("prospecting.Action"),
            render: (_, record) => (
                <div ref={(el) => setDropdownRef(record.id, el)} className="relative">
                    <Button
                        icon={<MoreOutlined />}
                        className="bg-gray-200 px-3 py-1 rounded-md"
                        onClick={() => toggleDropdown(record.id)}
                    />
                    <RowDropdown record={record} />
                </div>
            ),
        },
    ];

    const buttonsData = [
        { id: 0, folder_name: t("prospecting.All"), selectedGroups: [] },
        { id: 11111111111, folder_name: t("prospecting.Groups"), selectedGroups: [] },
        { id: 22222222222, folder_name: t("prospecting.Posts"), selectedGroups: [] },
        // { id: 1, folder_name: "Archived", selectedGroups: [] },
    ];

    const handleFolderClick = (folderId) => {
        setSelectedFolder(folderId);
        setSearchText("")

        if (folderId === 11111111111 || folderId === 22222222222) {
            updateFilters({
                ...storeFilters,
                social_type: folderId === 11111111111 ? "fb_groups" : "fb_posts",
                id: 0,
                search_grp: "",
                page: 1,
                limit: 25,
            });
        } else if (folderId === 0) {
            updateFilters({
                ...storeFilters,
                social_type: "",
                id: 0,
                search_grp: "",
                page: 1,
                limit: 25,
            });
        } else {
            updateFilters({
                ...storeFilters,
                social_type: "",
                id: folderId,
                search_grp: "",
                page: 1,
                limit: 25,
            });
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            const openKey = openDropdownKey;
            if (openKey && dropdownRefs.current[openKey] &&
                !dropdownRefs.current[openKey].contains(event.target)) {
                setOpenDropdownKey(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openDropdownKey]);

    useEffect(() => {
        const savedGroupId = localStorage.getItem("selectedGroupId");
        if (savedGroupId) {
            setPrimaryGroupId(savedGroupId);
        }
    }, []);

    useEffect(() => {
        fetchGroups(storeFilters);
    }, [storeFilters]);

    useEffect(() => {
        setFolders(prospect_folder);
    }, [setFolders, prospect_folder]);

    useEffect(() => {
        fetchKeywords({ page: 1, limit: 100 });
        fetchMessages({ page: 1, limit: 200 });
        fetchCRMGroups({ type: 'facebook' });
    }, []);

    return (
        <Layout>
            <h2 className="text-xl font-[500] mb-6">{t("prospecting.Easily connect with new prospects")}</h2>
            {/* <div class="nv-content-wrapper"></div> to display account syncing message */}
            <div className="nv-content-wrapper"></div> {/* to display account syncing message */}
            <div className="bg-white p-5 rounded-[16px]">
                <div className="flex items-center justify-between ">
                    <div className="space-x-3 overflow-x-auto max-w-full flex">
                        {
                            buttonsData.map((folder, index) => (
                                <div className="flex items-center" key={index}>
                                    <button
                                        className={`px-4 text-sm py-1.5 rounded cursor-pointer hover:bg-[#D7E5F3] hover:text-[#005199] ${selectedFolder == folder.id ? "bg-[#00519729] text-[#0087FF]" : "bg-[#00519729] text-[#0087FF]"}`}
                                        onClick={() => {
                                            setFolderUpdateId(folder.id)
                                            handleFolderClick(folder.id)
                                        }}
                                    >
                                        <div className="flex space-x-2 items-center">
                                            <span>{folder.folder_name}</span>
                                        </div>
                                    </button>
                                </div>
                            ))
                        }
                        {
                            [...(Array.isArray(folders) ? folders : [])].map((folder, index) => (
                                <div className="flex items-center" key={index}>
                                    <button
                                        className={` px-4 text-sm py-1.5 rounded cursor-pointer hover:bg-[#D7E5F3] hover:text-[#005199] ${selectedFolder == folder.id ? "bg-[#D7E5F3] text-[#005199]" : "bg-[#F2F2F2] text-[#00000080]"}`}
                                        onClick={() => handleFolderClick(folder.id)}
                                    >
                                        <div className="flex space-x-2 items-center">
                                            <span>{folder.folder_name}</span>
                                        </div>
                                    </button>
                                    <span className="ml-1 cursor-pointer" onClick={() => {
                                        // setFolderId(folder.id)
                                        setFolderName(folder.folder_name)
                                        setOpenUpdateFolderModal(true)
                                    }}>
                                        {
                                            selectedFolder == folder.id && folder.id !== 0 && <EditIcon2 />
                                        }
                                    </span>
                                </div>
                            ))
                        }

                        <button className={`px-4 text-sm py-1.5 rounded cursor-pointer bg-[#F2F2F2] text-[#00000080]`} onClick={() => setOpenCreateFolderModal(true)}><span className="text-[#005199]">+</span>{" "}{t("prospecting.Create Folder")}</button>
                    </div>
                    <Button id="Novalya-Multi-group" className="bg-blue-500 !text-white rounded-md !bg-[#0087FF] text-white rounded-[10px] !px-8 !py-3 min-h-[45px]">{t("prospecting.Add new group")}</Button>
                </div>
                <div className="flex items-center justify-between my-5 space-x-4 ">
                    <Input
                        placeholder="Search groups"
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value)
                            updateFilters({
                                ...storeFilters,
                                search_grp: e.target.value
                            });
                        }}
                        className="w-1/3 px-3 py-2 !rounded-[4px] border border-[#CCCDCD] min-h-[44px] ctm-search"
                    />
                    <Dropdown className=""
                        trigger={['click']}
                        overlay={
                            <Menu>
                                {[
                                    { key: 'member', label: t("prospecting.Member") },
                                    { key: 'things in common', label: t("prospecting.Things In Common") },
                                    { key: 'post-like', label: t("prospecting.Post") },
                                ].map((type) => (
                                    <Menu.Item
                                        key={type.key}
                                        onClick={() => {
                                            updateFilters({
                                                ...storeFilters,
                                                group_type: type.key,
                                                page: 1,
                                                limit: 25,
                                            });
                                            setSelectedSortLabel(type.label);
                                        }}
                                    >
                                        {type.label}
                                    </Menu.Item>
                                ))}
                                <Menu.Item
                                    key="clear"
                                    onClick={() => {
                                        updateFilters({
                                            ...storeFilters,
                                            group_type: "",
                                            page: 1,
                                            limit: 25,
                                        });
                                        setSelectedSortLabel(t("prospecting.Sort By"));
                                    }}
                                    style={{ color: 'red' }}
                                >
                                    Clear
                                </Menu.Item>
                            </Menu>
                        }
                    >
                        <Button className="!text-[16px] !rounded-[4px] !p-2.5 min-h-[44px] min-w-[155px] !text-[#808183] !justify-start" 
                            >
                            <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.33333 10.8203H4.66667C5.125 10.8203 5.5 10.4453 5.5 9.98698C5.5 9.52865 5.125 9.15365 4.66667 9.15365H1.33333C0.875 9.15365 0.5 9.52865 0.5 9.98698C0.5 10.4453 0.875 10.8203 1.33333 10.8203ZM0.5 1.65365C0.5 2.11198 0.875 2.48698 1.33333 2.48698H14.6667C15.125 2.48698 15.5 2.11198 15.5 1.65365C15.5 1.19531 15.125 0.820312 14.6667 0.820312H1.33333C0.875 0.820312 0.5 1.19531 0.5 1.65365ZM1.33333 6.65365H9.66667C10.125 6.65365 10.5 6.27865 10.5 5.82031C10.5 5.36198 10.125 4.98698 9.66667 4.98698H1.33333C0.875 4.98698 0.5 5.36198 0.5 5.82031C0.5 6.27865 0.875 6.65365 1.33333 6.65365Z" fill="black"/>
                            </svg>
                            {selectedSortLabel}
                        </Button>
                    </Dropdown>
                </div>
                <Table
                    columns={groupColumns}
                    dataSource={groups}
                    pagination={{
                        current: storeFilters.page,
                        pageSize: storeFilters.limit,
                        total: totalPages * storeFilters.limit,
                        onChange: handlePageChange,
                        showSizeChanger: false,
                    }}
                    rowClassName={(record) =>
                        record.id?.toString() === primaryGroupId?.toString()
                            ? 'group-selected-row'
                            : ''
                    }
                    className="custom-table"
                    loading={loading}
                    current={storeFilters.page}
                    total={totalGrp}
                    pageSize={storeFilters.limit}
                    onChange={handlePageChange}
                    showQuickJumper={false}
                />


                {/* Settings Modal - Open only when modalOpen is true */}
                {modalOpen && (
                    <SettingsModal
                        visible={modalOpen}
                        onClose={handleCloseModal}
                        groupId={primaryGroupId}
                        socialType={socialType}
                        activeKey={activeKey}
                        setActiveKey={setActiveKey}
                        postType={postType}
                        keyWordList={keyWordList}
                        CRMList={CRMList}
                        tempMessageList={tempMessageList}
                    />
                )}

                {confirmModalOpen && (
                    <ConfirmationModal
                        visible={confirmModalOpen}
                        onClose={handleCloseConfirmModal}
                        groupId={primaryGroupId}
                        handleOpenSettingsTab={handleOpenSettingsTab}
                        postType={postType}
                        keyWordList={keyWordList}
                        CRMList={CRMList}
                        tempMessageList={tempMessageList}
                    />
                )}

                {openCreateFolderModal && (
                    <CreateFolderModal
                        visible={openCreateFolderModal}
                        onClose={handleCloseCreateFolderModal}
                        socialType={socialType}
                        prospect_folder={prospect_folder}
                    />
                )}

                {openUpdateFolderModal && (
                    <UpdateFolderModal
                        folderId={folderUpdateId}
                        folderName={folderName}
                        visible={openUpdateFolderModal}
                        onClose={handleCloseUpdateFolderModal}
                        socialType={socialType}
                        prospectFolder={prospect_folder}
                    />
                )}
            </div>
        </Layout>
    );
};

// RowDropdown.propTypes = {
//     record: PropTypes.shape({
//         id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//         url: PropTypes.string.isRequired,
//         group_type: PropTypes.string.isRequired,
//     }).isRequired,
// };

export default FbProspecting;
