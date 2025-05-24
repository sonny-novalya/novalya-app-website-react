import PropTypes from "prop-types";
import { Checkbox, Badge, Dropdown, message, Button } from "antd";
import { useEffect, useRef, useState } from "react";
import { Spin } from "antd";
import {
    DeleteFillRedIcon,
    MoveStageGreenIcon,
    SendBlueIcon,
    SendIcon,
    SyncGreenIcon,
    VerticalDotsIcon,
} from "../../../common/icons/icons";
import TopbarRightSection from "./TopBarRightSection";
import SendCampaignModal from "./SendCampaignModal";
import MoveToStageModal from "./MoveToStageModal";
import AddStageModal from "./AddStageModal";
import NoteUserModal from "./NoteUserModalNew";
import user_default from "../../../../../assets/img/user_img_default.jpg";
import { t } from "i18next";
import usefbCRM from "../../../../../store/fb/fbCRM";
import EditstageModal from "./editStageModal";

const RightSectionCrm = ({ selectedGroup }) => {
    const {
        selectedGrpData,
        moveTaggedUsers,
        createStage,
        addGrpLoader,
        deleteStage,
        setSelectStage,
        moveStage,
        deleteTaggedUser,
        selectedGrpLoader
    } = usefbCRM();

    const [selectedUsersMap, setSelectedUsersMap] = useState({});
    const [openCampaignModal, setOpenCampaignModal] = useState(false);
    const [openMoveToStageModal, setOpenMoveToStageModal] = useState(false);
    const [openAddStageModal, setOpenAddStageModal] = useState(false);
    const [openEditStageModal, setOpenEditStageModal] = useState(false);

    const [openNoteModal, setOpenNoteModal] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);
    const [sortedStages, setSortedStages] = useState([]);
    const [draggedItem, setDraggedItem] = useState(null);
    const [isDel, setIsDel] = useState(false)
    const totalSlectedIds = selectedUsersMap ? Object.values(selectedUsersMap).flat() : null
    const [campaignModalData, setCampaignModalData] = useState({
        userIds: [],
        peopleCount: 0,
    });

    const delTime = useRef();

    const scrollPositionsRef = useRef({});
    const [totalLeadsCount, setTotalLeadsCount] = useState(0);

    useEffect(() => {
        if (selectedGrpData?.stage?.length) {
            let newStages = [...selectedGrpData.stage].sort(
                (a, b) => a.stage_num - b.stage_num
            );

            const fakeLeads = (id) => {
                return selectedGrpData?.taggedUsers?.filter(
                    (data) => data?.stage_id === id
                );
            };

            newStages = newStages.map((element) => {
                return { ...element, leads: fakeLeads(element.id) };
            });

            setSortedStages(newStages);

            const totalCount = newStages.reduce((acc, stage) =>
                acc + (stage.leads?.length || 0), 0);
            setTotalLeadsCount(totalCount);
        } else {
            setSortedStages([]);
            setTotalLeadsCount(0);
        }
    }, [selectedGrpData]);

    const handleUserDelete = async () => {

        if (isDel) {
            const stageId = Object.keys(selectedUsersMap)?.[0]
            const res = await deleteTaggedUser({
                id: totalSlectedIds[0],
                type: 'ig'
            })

            if (res.status === 200) {
                message.success("user has been deleted")
                const newArr = sortedStages?.map((data) => {
                    if (data.id === Number(stageId)) {

                        return {
                            ...data,
                            leads: data?.leads?.filter((card) => card?.id !== totalSlectedIds?.[0]),
                        };
                    }
                    return data;

                });

                setSelectedUsersMap({})
                setSortedStages(newArr)
                setTotalLeadsCount(prevCount => prevCount - 1);
                setIsDel(false)
            }
        } else {
            if (totalSlectedIds.length === 0) {
                message.error("Select atleast one user")
                return
            }
            if (totalSlectedIds.length === 2) {
                message.error("Only one user can be removed at a single time")
                return
            }
            setIsDel(true)
            setTimeout(() => {
                setIsDel(false)
            }, 3000)
        }



    }


    // if (!selectedGroup || !selectedGroup.stage) {
    if (!selectedGroup || !selectedGroup.id) {
        return (
            <div className="flex items-center justify-center h-full text-gray-400">
                {t("crm.Select a group to view details")}
            </div>
        );
    }





    const handleAddStage = () => {
        setOpenAddStageModal(true);
    };

    const handleDrop = async (targetColId) => {
        if (!draggedItem || targetColId === draggedItem?.stageId) return;

        const newArr = sortedStages?.map((data) => {
            if (data.id === draggedItem?.stageId) {
                console.log({
                    ...data,
                    leads: data.leads.filter((card) => card.id !== draggedItem.lead.id),
                });
                return {
                    ...data,
                    leads: data.leads.filter((card) => card.id !== draggedItem.lead.id),
                };
            } else if (data.id === targetColId) {
                return { ...data, leads: [...data.leads, draggedItem.lead] };
            } else {
                return data;
            }
        });

        setSortedStages(newArr);
        setDraggedItem(null);

        const res = await moveTaggedUsers({
            data: {
                id: draggedItem.lead.id,
                stage_id: targetColId,
            },
            type: 'ig'
        });

        if (res?.status !== 200) {
            message.error("Unable to move tagged user");
        }
    };

    const buttonActions = [
        {
            id: 1,
            label: t("crm.Send Campaign"),
            icon: <SendBlueIcon />,
            textColor: "text-blue-600",
            borderColor: "border-blue-100",
            onClick: () => {
                const allUserIds = Object.values(selectedUsersMap).flat();
                const totalLeads = sortedStages.reduce((acc, stage) => acc + (stage?.leads?.length || 0), 0);

                if (totalLeads === 0) {
                    message.warning("No users found");
                    return;
                }

                if (allUserIds.length === 0) {
                    message.warning("Please select at least 1 user");
                    return;
                }

                setCampaignModalData({
                    userIds: allUserIds,
                    peopleCount: allUserIds.length,
                });
                setOpenCampaignModal(true);
            },
        },
        {
            id: 2,
            label: t("crm.Move to stage"),
            icon: <MoveStageGreenIcon />,
            textColor: "text-green-600",
            borderColor: "border-green-100",
            onClick: () => {
                setOpenMoveToStageModal(true);
            },
        },
        {
            id: 3,
            label: "Synchronize data",
            icon: <SyncGreenIcon />,
            textColor: "text-green-600",
            borderColor: "border-green-100",
            onClick: () => {
                console.log("yes");
            },
        },
        {
            id: 4,
            label: !isDel ? t("crm.Delete") : "Really ?",
            icon: <DeleteFillRedIcon />,
            textColor: "text-red-600",
            borderColor: "border-red-100",
            onClick: () => {
                handleUserDelete()
            },
        },
    ];

    const DropdownMenu = ({ item }) => {
        const [isDel, setIsDel] = useState(false)

        const handleDelete = async (id) => {

            const stageToDelete = sortedStages.find((s) => s.id === id);
            
            if (sortedStages.length === 1) {
                message.error("At least one stage must remain. Cannot delete the only stage.");
                return;
            }
            
            if (stageToDelete?.leads?.length > 0) {
                message.error("Please delete all users in this stage before deleting it.");
                return;
            }

            if (isDel) {
                const res = await deleteStage({ id, type: 'ig'})
                if (res.status === 200) {
                    message.success("Staged has been deleted")
                    const newArr = sortedStages?.filter((s) => s.id !== Number(id))
                    setSortedStages(newArr)
                }
                setIsDel(false)
            } else {
                if (sortedStages.length === 1) {
                    message.error("Can not delete this single Stage")
                    return
                }
                setIsDel(true)
                delTime.current = setTimeout(() => {
                    setIsDel(false)
                }, 3000)

            }
        };

        return (
            <div
                className="bg-white p-3 rounded-[6px] shadow-[0px_3px_7px_rgba(0,0,0,0.19)] relative z-99999"
                onClick={(e) => e.stopPropagation()} // Prevent closing on click
            >
                <div
                    onClick={() => {
                        setSelectStage(item)
                        setOpenEditStageModal(true)
                    }}
                    className="flex gap-3 items-center px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
                >
                    <span class="flex items-center justify-center w-[20px] h-[20px]">
                        <svg class="fill-svg" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.2578 16.1724H2.9797C2.65207 16.1737 2.3275 16.1093 2.02524 15.9829C1.72298 15.8565 1.44917 15.6707 1.22005 15.4365C0.989234 15.204 0.806779 14.9281 0.683222 14.6247C0.559665 14.3213 0.497456 13.9964 0.500188 13.6689V4.3987C0.496102 4.07259 0.558538 3.74907 0.683682 3.4479C0.808825 3.14673 0.994051 2.87423 1.22804 2.64705C1.45571 2.41621 1.7278 2.23391 2.02788 2.11115C2.33189 1.98402 2.65818 1.91877 2.98769 1.91919H6.53899C6.69809 1.91919 6.85067 1.98239 6.96317 2.09489C7.07567 2.20739 7.13887 2.35997 7.13887 2.51907C7.13887 2.67817 7.07567 2.83075 6.96317 2.94325C6.85067 3.05575 6.69809 3.11895 6.53899 3.11895H2.98769C2.81566 3.12363 2.6455 3.15604 2.48379 3.21493C2.24811 3.31441 2.04715 3.48143 1.90624 3.69494C1.76533 3.90844 1.69077 4.15888 1.69195 4.4147V13.6849C1.68995 13.8567 1.72215 14.0272 1.78669 14.1865C1.85123 14.3458 1.94681 14.4907 2.06788 14.6127C2.18892 14.7328 2.33248 14.8278 2.49032 14.8923C2.64816 14.9568 2.81718 14.9895 2.98769 14.9886H12.2658C12.4362 14.9886 12.6042 14.9566 12.7617 14.8926C12.9186 14.8296 13.0603 14.7342 13.1777 14.6127C13.2992 14.4953 13.3946 14.3536 13.4576 14.1967C13.5283 14.0383 13.5638 13.8664 13.5616 13.6929V10.1416C13.5616 9.98246 13.6248 9.82988 13.7373 9.71738C13.8498 9.60488 14.0024 9.54168 14.1615 9.54168C14.3206 9.54168 14.4732 9.60488 14.5856 9.71738C14.6981 9.82988 14.7614 9.98246 14.7614 10.1416V13.7168C14.7627 14.0445 14.6983 14.369 14.5719 14.6713C14.4455 14.9736 14.2597 15.2474 14.0255 15.4765C13.7959 15.707 13.5244 15.8916 13.2257 16.0204C12.9161 16.1324 12.5874 16.1844 12.2578 16.1724Z" fill="#808080"></path>
                        <path d="M16.3458 2.94296C16.2643 2.73702 16.1387 2.55139 15.9779 2.39907L14.2582 0.679414C14.1059 0.518601 13.9203 0.393028 13.7143 0.311488C13.4049 0.181091 13.0634 0.146448 12.7341 0.212033C12.4047 0.277617 12.1026 0.440416 11.8667 0.679414L10.499 2.04714V2.08713L4.30822 8.26991C3.99567 8.5846 3.82028 9.01014 3.82031 9.45367V11.1893C3.82242 11.6363 4.0009 12.0643 4.31694 12.3804C4.63299 12.6964 5.06103 12.8749 5.50798 12.877H7.24363C7.46402 12.8773 7.68225 12.8336 7.88552 12.7484C8.08879 12.6633 8.27302 12.5384 8.4274 12.3811L14.6182 6.19032L15.9939 4.81459C16.1555 4.66262 16.2818 4.47706 16.3618 4.2707C16.4534 4.06557 16.5007 3.84346 16.5007 3.61883C16.5007 3.3942 16.4534 3.17209 16.3618 2.96696L16.3458 2.94296ZM15.242 3.7828C15.2161 3.84323 15.178 3.89768 15.1301 3.94277L14.1543 4.91857L11.7547 2.51905L12.7385 1.53524C12.833 1.44385 12.959 1.3923 13.0905 1.39127C13.1538 1.39233 13.2164 1.40592 13.2744 1.43126C13.3363 1.45739 13.3896 1.49472 13.4344 1.54324L15.1621 3.2629C15.2056 3.30988 15.2408 3.36399 15.266 3.42287C15.2779 3.48362 15.2779 3.54608 15.266 3.60683C15.2691 3.66647 15.2609 3.72615 15.242 3.7828Z" fill="#808080"></path>
                        </svg>
                    </span>
                    Rename
                </div>
                <div
                    onClick={() => {
                        handleDelete(item.id)
                    }}
                    className="flex gap-3 items-center px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
                >
                    <span class="flex items-center justify-center w-[20px] h-[20px]">
                        <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 1H10.5L9.5 0H4.5L3.5 1H0V3H14M1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16Z" fill="#808183"></path>
                        <path d="M14 1H10.5L9.5 0H4.5L3.5 1H0V3H14M1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16Z" fill="black" fill-opacity="0.2"></path>
                        </svg>
                    </span>
                    {isDel ? "Really?" : "Delete"}
                </div>
            </div>
        )
    }



    const SortableItem = ({
        lead,
        selectedUsers,
        stage,
        toggleUserSelection,
    }) => {

        return (
            <div className="flex items-start">
                <div
                    key={`${lead.id}-${stage.id}`}
                    className={`border-l-4 border-[#21BF7C] p-3 rounded-md flex items-start gap-2 w-full shadow-[0_0_7px_rgb(0_0_0_/_0.25)] ${selectedUsers.includes(lead.id) ? "" : ""
                        }`}
                    draggable
                    onDrag={() => setDraggedItem({ lead, stageId: stage?.id })}
                >
                    <Checkbox className="mt-1"
                        checked={selectedUsers.includes(lead.id)}
                        onChange={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setTimeout(() => toggleUserSelection(lead.id, e), 0);
                            return false;
                        }}
                    />
                    <div
                        className="flex flex-col cursor-pointer leading-snug text-ellipsis overflow-hidden"
                        onClick={() => {
                            setSelectedLead(lead);
                            setOpenNoteModal(true);
                        }}
                    >
                        <div className="line-clamp-2 flex items-center gap-2 pb-2">
                            <img
                                src={lead?.profile_pic?.startsWith("data:image/") ? lead?.profile_pic : user_default }
                                alt={lead?.insta_name}
                                className="w-8 h-8 rounded-full "
                            />
                            <div className="flex flex-col">
                                <span className="font-medium text-[14px]">{lead.insta_name}</span>
                                <span className="font-medium text-[12px] text-[#878787]">{lead.profession}</span>
                            </div>
                        </div>
                        <span className="text-[10px] line-clamp-2">{lead.user_note}</span>
                    </div>
                </div>
            </div>
          );
    };

    const DroppableStage = ({ stageId, children }) => {
        return (
            <div
                className="flex-shrink-0 bg-white rounded-[6px] border border-[#E5E6E6]"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(stageId)}
            >
                {children}
            </div>
        );
    };
    return (
        <div className="flex-1 overflow-x-auto min-h-full relative flex flex-col overflow-hidden h-full">
            <TopbarRightSection
                companyName={selectedGroup.name}
                leadsCount={totalLeadsCount}
                setSortedStages={setSortedStages}
                onAddStage={handleAddStage}
                selectedGrpData={selectedGrpData}
            />
            {selectedGrpLoader && <div className="absolute z-10 w-[100%] h-full bg-white/50 flex pt-50 justify-center"> <Spin size="large" /> </div>}
            <div className="flex gap-2.5 bg-white overflow-auto flex-grow h-full overflow-x-scroll overflow-y-hidden">
                {sortedStages.map((stage) => {
                    const selectedUsers = selectedUsersMap[stage.id] || [];

                    const handleSelectAll = (stage) => {
                        const stageId = stage?.id;
                        const allLeadIds = stage?.leads?.map((lead) => lead?.id);
                        const selectedIds = selectedUsersMap[stageId] || [];

                        const isAllSelected = selectedIds?.length === allLeadIds?.length;

                        setSelectedUsersMap((prev) => ({
                            ...prev,
                            [stageId]: isAllSelected ? [] : allLeadIds,
                        }));
                    };

                    const toggleUserSelection = (id, e) => {
                        sortedStages.forEach(stage => {
                            const container = document.querySelector(`#stage-container-${stage.id}`);
                            if (container) {
                                scrollPositionsRef.current[stage.id] = container.scrollTop;
                            }
                        });

                        setSelectedUsersMap((prev) => {
                            const current = prev[stage.id] || [];
                            return {
                                ...prev,
                                [stage.id]: current.includes(id)
                                    ? current.filter((uid) => uid !== id)
                                    : [...current, id],
                            };
                        });

                        requestAnimationFrame(() => {
                            sortedStages.forEach(stage => {
                                const container = document.querySelector(`#stage-container-${stage.id}`);
                                if (container && scrollPositionsRef.current[stage.id] !== undefined) {
                                    container.scrollTop = scrollPositionsRef.current[stage.id];
                                }
                            });
                        });

                        if (e) {
                            e.stopPropagation();
                        }
                    };


                    return (
                        <DroppableStage stageId={stage.id} key={stage.id}>
                            <div
                                className="pb-[10px] bg-white rounded-lg w-[270px] h-full flex flex-col"
                            >
                                <div className="text-black p-3 rounded-[5px] mb-2.5 bg-[#0087FF]">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[14px] font-[500] text-white">
                                                    {stage.name}
                                                </span>

                                                <span className="text-[14px] font-[400] text-white">
                                                    ({stage?.leads?.length || 0})
                                                </span>

                                            </div>
                                            <span
                                                onClick={() => handleSelectAll(stage)}
                                                className="cursor-pointer text-white text-xs underline leading-1"
                                            >
                                                {selectedUsers?.length === stage?.leads?.length && selectedUsers?.length > 0
                                                    ? "Unselect All"
                                                    : "Select All"}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span
                                                onClick={() => {
                                                    const stageUsers = selectedUsersMap[stage.id] || [];

                                                    if (stage?.leads?.length === 0) {
                                                        message.warning("No users found");
                                                        return;
                                                    }

                                                    if (stageUsers.length === 0) {
                                                        message.warning("Please select at least 1 user in this stage");
                                                        return;
                                                    }

                                                    setCampaignModalData({
                                                        userIds: stageUsers,
                                                        peopleCount: stageUsers.length,
                                                    });
                                                    setOpenCampaignModal(true);
                                                }}
                                                className="cursor-pointer"
                                            >
                                                <SendIcon />
                                            </span>


                                            <Dropdown
                                                overlay={
                                                    <DropdownMenu
                                                        item={stage}

                                                    />
                                                }
                                                trigger={["click"]}
                                                placement="bottomRight"
                                            >
                                                <Button
                                                    type="text"
                                                    icon={<VerticalDotsIcon color={"white"} />}

                                                    className="!text-[#808183] !h-9 btn-hover"
                                                />
                                            </Dropdown>

                                        </div>
                                    </div>
                                </div>

                                {/* Leads */}
                                <div id={`stage-container-${stage.id}`} className="flex flex-col gap-4 px-3  overflow-y-auto pb-3">
                                    {stage?.leads?.map((lead) => (
                                        <SortableItem
                                            key={lead.id}
                                            lead={lead}
                                            selectedUsers={selectedUsers}
                                            stage={stage}
                                            toggleUserSelection={toggleUserSelection}
                                        />
                                    ))}
                                </div>
                            </div>
                        </DroppableStage>
                    );
                })}
            </div>
            <div className="flex gap-4 px-2.5 py-2 items-center justify-center border border-[rgba(171,171,171,0.42)] w-fit mx-auto rounded-[10px] mt-auto shadow-[0_5px_20px_rgb(228_228_228_/_0.5)]
">
                {buttonActions.map((action, index) => {

                    if (totalSlectedIds?.length > 1 && action.id === 4) return null
                    return <button
                        key={index}
                        onClick={action.onClick}
                        id={action.id === 3 ? "sync-instaname" : undefined}
                        value={action.id === 3 ? selectedGroup.id : undefined}
                        className={`flex items-center gap-2 border rounded-md px-4 py-2 hover:shadow transition cursor-pointer min-h-[48px] text-[14px] font-medium ${action.textColor} ${action.borderColor}`}
                    >
                        {action.icon}
                        <span className="font-medium">{action.label}</span>
                    </button>
                }



                )}
            </div>

            {openCampaignModal && (
                <SendCampaignModal
                    visible={openCampaignModal}
                    onCancel={() => setOpenCampaignModal(false)}
                    userIds={campaignModalData.userIds}
                    peopleCount={campaignModalData.peopleCount}
                    onSend={(data) => {
                        console.log("Sending with data:", data);
                        setOpenCampaignModal(false);
                    }}
                    stages={sortedStages}
                    groupId={selectedGroup.id}
                />
            )}

            {openMoveToStageModal && (
                <MoveToStageModal
                    visible={openMoveToStageModal}
                    onCancel={() => setOpenMoveToStageModal(false)}
                    selectedUsersMap={selectedUsersMap}
                    moveStage={moveStage}
                    sortedStages={sortedStages}
                    setSortedStages={setSortedStages}
                    setSelectedUsersMap={setSelectedUsersMap}

                />
            )}
            {openAddStageModal && (
                <AddStageModal
                    visible={openAddStageModal}
                    onCancel={() => setOpenAddStageModal(false)}
                    onSend={(data) => {
                        console.log("moving with data:", data);
                        setOpenMoveToStageModal(false);
                    }}
                    createStage={createStage}
                    setSortedStages={setSortedStages}
                    selectedGroup={selectedGroup}
                    addGrpLoader={addGrpLoader}
                    existingStageNames={sortedStages.map((s) => s.name.toLowerCase())}
                />
            )}

            {openEditStageModal && (
                <EditstageModal
                    visible={openEditStageModal}
                    onCancel={() => setOpenEditStageModal(false)}
                    setSortedStages={setSortedStages}
                    sortedStages={sortedStages}
                />
            )}

            {openNoteModal && selectedLead && (
                <NoteUserModal
                    visible={openNoteModal}
                    onCancel={() => setOpenNoteModal(false)}
                    lead={selectedLead}
                    selectedGroup={selectedGroup}
                />
            )}
        </div>
    );
};

RightSectionCrm.propTypes = {
    selectedGroup: PropTypes.object,
};

export default RightSectionCrm;
