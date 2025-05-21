/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Table, Button, Input, Dropdown, Menu } from "antd";
import { SearchOutlined, LikeOutlined, MessageOutlined } from "@ant-design/icons";
import GroupImg from "../../../../../assets/img/groupImg.png";
import SettingsModal from "../../../../components/modal/fb/prospection/SettingsModal/SettingsModal";
import ConfirmationModal from "../../../../components/modal/fb/prospection/ConfirmationModal";
import CreateFolderModal from "../../../../components/modal/fb/prospection/CreateFolderModal";
import useFbProspectingStore from "../../../../../store/fb/prospecting";
import { useSearchParams } from "react-router-dom";
import useGroupStore from "../../../../../store/group/groupStore";
import { formatNumber } from "../../../../../helpers/formatGroupMembers";
import { EditIcon2, FacebookIcon, SendIconBlue, SendIconGray, SettingsIconWhite, SyncBlueIcon } from "../../../common/icons/icons";
import UpdateFolderModal from "../../../../components/modal/fb/prospection/UpdateFolderModal";
import { t } from "i18next";
import { getGroupTypeNames } from "../../../../../helpers/getGroupTypeNames";
import Layout from "../../Layout";
import { useRef } from "react";
import useMessageSteps from "../../../../../store/messageTemp/MessageTemp";
import useKeyWordStore from "../../../../../store/keyword/keywordStore";
import SettingStore from "../../../../../store/prospection/settings-store";
import { getGroupVolumeTitle } from "../../../../../helpers/getGroupVolumeTitle";


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
    const { groups, fetchGroups, storeFilters, updateFilters, loading, totalPages, totalGrp, deleteGroup, folderUpdateId, setFolderUpdateId ,initialStoreFilters} = useGroupStore();
    const socialType = "fb_groups";
    const prospect_folder = "fb";

    const [activeKey, setActiveKey] = useState(1);
    const [primaryGroupId, setPrimaryGroupId] = useState(null);

    const [openDropdownKey, setOpenDropdownKey] = useState(null);
    const [confirmModalKey, setConfirmModalKey] = useState(null);
    const [postType, setPostType] = useState(null);
    const [selectedSortLabel, setSelectedSortLabel] = useState("Sort By");
    const { keyWordList, fetchKeywords } = useKeyWordStore();
    const { tempMessageList, fetchMessagesNew } = useMessageSteps();

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
                <div className="flex items-center justify-center space-x-2 bg-green-500 px-2 py-1 rounded-md text-white hover:bg-green-600  cursor-pointer ">
                    <span className="font-semibold max-w-72 overflow-hidden text-ellipsis whitespace-nowrap">
                        {folder ? folder.folder_name : "-"}
                    </span>
                </div>
            );
        }

        if (folderIds === null) return <div className="flex items-center justify-center space-x-2 p-2 rounded-lg">
            <span className="font-semibold max-w-72 overflow-hidden text-ellipsis whitespace-nowrap">
                -
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
                -
            </span>
        </div>;
        if (folderNames.length === 1) {
            return (
                <div className="flex items-center justify-center space-x-2 bg-[#BCE7D5] rounded-[20px] px-3 py-1 text-white hover:bg-green-600 cursor-pointer">
                    <span className="font-semibold max-w-72 overflow-hidden text-ellipsis whitespace-nowrap">
                        {folderNames[0]}
                    </span>
                </div>
            );
        }

        return (
            <div className="flex items-center justify-center space-x-2 bg-[#BCE7D5] rounded-[20px] px-3 py-1 text-white hover:bg-green-600 cursor-pointer">
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
        <div className="flex items-center space-x-2 justify-center pr-12">
            <span>Title</span>
            {storeFilters.sort_by === 0 && storeFilters.field === "name" ? (
                <button
                    className="w-3 h-6 border-none cursor-pointer"
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
                    className="w-3 h-6 border-none cursor-pointer"
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
        <div className="flex items-center space-x-2 justify-center">
            <span>{t("prospecting.Type")}</span>
            {storeFilters.sort_by === 0 && storeFilters.field === "type" ? (
                <button
                    className="w-3 h-6 border-none cursor-pointer"
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
                    className="w-3 h-6 border-none cursor-pointer"
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
        <div className="flex items-center space-x-2 justify-center w-32">
            <span>Volume</span>
            {storeFilters.sort_by === 0 && storeFilters.field === "total_member" ? (
                <button
                    className="w-3 h-6 border-none cursor-pointer"
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
                    className="w-3 h-6 border-none cursor-pointer"
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
                        <div className="flex space-x-8 px-5 py-3 rounded-[5px] shadow-[-5px_6px_6px_rgba(0,0,0,0.19)]">
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
                                {/* <DeleteFillRedIcon /> */}
                                <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 1H10.5L9.5 0H4.5L3.5 1H0V3H14M1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16Z" fill="#808183"/>
                                    <path d="M14 1H10.5L9.5 0H4.5L3.5 1H0V3H14M1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16Z" fill="black" fill-opacity="0.2"/>
                                </svg>
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
                    <img src={record.post_image || GroupImg} alt="Group" className="w-16 h-11 rounded-[4px] object-cover" />
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
                <span className="flex justify-center">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.9974 0.167969C5.0174 0.167969 0.164062 5.0213 0.164062 11.0013C0.164062 16.9813 5.0174 21.8346 10.9974 21.8346C16.9774 21.8346 21.8307 16.9813 21.8307 11.0013C21.8307 5.0213 16.9774 0.167969 10.9974 0.167969ZM9.91406 19.5921C5.6349 19.0613 2.33073 15.4213 2.33073 11.0013C2.33073 10.3296 2.4174 9.69047 2.55823 9.06214L7.7474 14.2513V15.3346C7.7474 16.5263 8.7224 17.5013 9.91406 17.5013V19.5921ZM17.3891 16.8405C17.1074 15.963 16.3057 15.3346 15.3307 15.3346H14.2474V12.0846C14.2474 11.4888 13.7599 11.0013 13.1641 11.0013H6.66406V8.83464H8.83073C9.42656 8.83464 9.91406 8.34714 9.91406 7.7513V5.58464H12.0807C13.2724 5.58464 14.2474 4.60964 14.2474 3.41797V2.9738C17.4216 4.26297 19.6641 7.37214 19.6641 11.0013C19.6641 13.2546 18.7974 15.3021 17.3891 16.8405Z" fill="#565656"/>
                    </svg>

                </span>
            ),
        },
        // { title: "Messages sent", dataIndex: "messagesSent" },
        {
            title: (TotalMemberColumn),
            dataIndex: "total_member",
            render: (text, record) => {
                if (text === null || text == 0) return "-"

                const type = record?.group_type?.toLowerCase()

                if (type === 'member' || type === 'things in common' ){
                    return `${formatNumber(text)} ${getGroupVolumeTitle(type)}`
                }

                const likeCount = text ;
                const commentCount = record?.comment_member;

                return (
                    <span className="flex items-center justify-center">
                        {likeCount && (
                            <>
                                {formatNumber(likeCount)} <LikeOutlined style={{ marginRight: 8, marginLeft: 4 }} />
                            </>
                        )}
                        {commentCount && (
                            <div className="flex space-x-2 items-center">
                                <span>|</span>
                                <span>
                                    {formatNumber(commentCount)} <MessageOutlined />
                                </span>
                            </div>
                        )}
                        {!likeCount && !commentCount && '-'}
                    </span>
                );
            }
        },        
        {
            title: t("prospecting.Folder"),
            dataIndex: "grp_folder_ids",
            render: (folderIds) => <span className="">{getFolderNames(folderIds)}</span>,
        },
        {
            title: t("prospecting.Settings"),
            render: (_, record) => (
                <div className="flex justify-center">
                    <button
                        className="ml-2 bg-blue-500 text-white px-4 py-1 rounded-md flex space-x-1 items-center cursor-pointer"
                        onClick={() => handleOpenSettings(record.id, record.group_type)}
                    >
                        <span>
                            <SettingsIconWhite />
                        </span>
                        <span className="!text-white">
                            {t("prospecting.Settings")}
                        </span>
                    </button>
                </div>
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
            title: "More",
            render: (_, record) => (
                <div ref={(el) => setDropdownRef(record.id, el)} className="relative text-center">
                    <Button
                        // icon={<MoreOutlined />}
                        className="!bg-[transparent] px-3 py-1 rounded-md border-0 ctm-dot-btn hover:!bg-white"
                        onClick={() => toggleDropdown(record.id)}>
                        <svg width="4" height="20" viewBox="0 0 4 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 2C4 1.46957 3.78929 0.960859 3.41421 0.585786C3.03914 0.210713 2.53043 -6.42368e-08 2 -8.74228e-08C1.46957 -1.10609e-07 0.960859 0.210713 0.585786 0.585786C0.210713 0.960859 -6.42368e-08 1.46957 -8.74228e-08 2C-1.10609e-07 2.53043 0.210713 3.03914 0.585786 3.41421C0.960859 3.78929 1.46957 4 2 4C2.53043 4 3.03914 3.78929 3.41421 3.41421C3.78929 3.03914 4 2.53043 4 2ZM2 8C2.53043 8 3.03914 8.21071 3.41421 8.58579C3.78929 8.96086 4 9.46957 4 10C4 10.5304 3.78929 11.0391 3.41421 11.4142C3.03914 11.7893 2.53043 12 2 12C1.46957 12 0.960858 11.7893 0.585786 11.4142C0.210713 11.0391 -4.603e-07 10.5304 -4.37114e-07 10C-4.13928e-07 9.46957 0.210713 8.96086 0.585786 8.58579C0.960859 8.21071 1.46957 8 2 8ZM2 16C2.53043 16 3.03914 16.2107 3.41421 16.5858C3.78929 16.9609 4 17.4696 4 18C4 18.5304 3.78929 19.0391 3.41421 19.4142C3.03914 19.7893 2.53043 20 2 20C1.46957 20 0.960858 19.7893 0.585785 19.4142C0.210712 19.0391 -8.09991e-07 18.5304 -7.86805e-07 18C-7.63619e-07 17.4696 0.210713 16.9609 0.585785 16.5858C0.960858 16.2107 1.46957 16 2 16Z" fill="black"/>
                        </svg>
                    </Button>
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
        fetchGroups({...storeFilters,type:"facebook"});
    }, [storeFilters]);

    useEffect(() => {
        setFolders(prospect_folder);
    }, [setFolders, prospect_folder]);

    useEffect(() => {
        fetchKeywords({ page: 1, limit: 100 });
        fetchMessagesNew({ page: 1, limit: 200 }, "", null, "fb_prospecting");
        fetchCRMGroups({ type: 'facebook' });
    }, []);

    return (
        <Layout>
            <h2 className="text-[24px] font-[500] mb-7 pl-7">{t("prospecting.Easily connect with new prospects")}</h2>
            {/* <div class="nv-content-wrapper"></div> to display account syncing message */}
            <div className="nv-content-wrapper"></div> {/* to display account syncing message */}
            <div className="bg-white px-5 py-7 rounded-[16px]">
                <div className="flex items-center justify-between ">
                    <div className="space-x-3 overflow-x-auto max-w-full flex">
                        {
                            buttonsData.map((folder, index) => (
                                <div className="flex items-center" key={index}>
                                    <button
                                        className={`px-4 text-sm py-1.5 rounded cursor-pointer hover:bg-[#D7E5F3] hover:text-[#005199] ${selectedFolder == folder.id ? "bg-[#00519729] text-[#0087FF]" : "bg-[#F2F2F2] text-[#00000080]"}`}
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
                            folders.map((folder, index) => (
                                <div className="flex items-center" key={index}>
                                    <button
                                        className={` px-4 text-sm py-[7px] rounded cursor-pointer hover:bg-[#D7E5F3] hover:text-[#005199] ${selectedFolder == folder.id ? "bg-[#00519729] text-[#0087FF]" : "bg-[#F2F2F2] text-[#00000080]"}`}
                                        onClick={() => handleFolderClick(folder.id)}
                                    >
                                        <div className="flex space-x-2 items-center">
                                            <span>{folder.folder_name}</span>
                                        </div>
                                    </button>
                                    <span className="ml-1 cursor-pointer" onClick={() => {
                                        setFolderUpdateId(folder.id)
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
                    <Button id="Novalya-Multi-group" className="!text-white !bg-[#0087FF]  !rounded-[10px] !px-8 !py-3 min-h-[45px] border !border-transparent">{t("prospecting.Add new group")}</Button>
                </div>
                <div className="flex items-center justify-between mt-5 mb-4 space-x-4 ">
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
                    <Dropdown 
                        trigger={['click']}
                        overlay={
                            <Menu className="pros-dropdown">
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
                        handleOpenSettings={handleOpenSettings}
                    />
                )}

                {openCreateFolderModal && (
                    <CreateFolderModal
                        visible={openCreateFolderModal}
                        onClose={handleCloseCreateFolderModal}
                        socialType={socialType}
                        prospect_folder={prospect_folder}
                        setFolders={setFolders}
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
                        initialStoreFilters={initialStoreFilters}
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
