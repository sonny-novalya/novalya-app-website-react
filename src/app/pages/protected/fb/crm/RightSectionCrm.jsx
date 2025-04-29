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
import NoteUserModal from "./NoteUserModal";

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
  const [isDel,setIsDel]=useState(false)
  const totalSlectedIds = selectedUsersMap? Object.values(selectedUsersMap).flat():null

  const [campaignModalData, setCampaignModalData] = useState({
    userIds: [],
    peopleCount: 0,
  });

    const delTime = useRef();

 
  

  useEffect(() => {
    if (selectedGrpData?.stage?.length) {
      let newStages = [...selectedGrpData.stage].sort(
        (a, b) => a.stage_num - b.stage_num
      );
      const fakeLeads = (id) => {
        const leads = selectedGrpData?.taggedUsers?.filter(
          (data) => data?.stage_id === id
        );
        return leads;
      };
      newStages = newStages?.map((element) => {
        return { ...element, leads: fakeLeads(element.id) };
      });


      setSortedStages(newStages);
    }
  }, [selectedGrpData])

  const handleUserDelete = async()=>{

    if(isDel){
      const stageId= Object.keys(selectedUsersMap)?.[0]
      const res =  await deleteTaggedUser({
        id: totalSlectedIds[0],
        type: 'fb'
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
       setIsDel(false)
      }
    }else{
      if (totalSlectedIds.length === 0 ) {
        message.error("Select atleast one user")
        return
      }
      if (totalSlectedIds.length === 2) {
        message.error("Only one user can be removed at a single time")
        return
      }
      setIsDel(true)
      setTimeout(()=>{
        setIsDel(false)
      },3000)
    }



  }


  if (!selectedGroup || !selectedGroup.stage) {
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
      type : "fb"
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
    {id:2,
      label: t("crm.Move to stage"),
      icon: <MoveStageGreenIcon />,
      textColor: "text-green-600",
      borderColor: "border-green-100",
      onClick: () => {
        setOpenMoveToStageModal(true);
      },
    },
    {id:3,
      label: "Synchronize data",
      icon: <SyncGreenIcon />,
      textColor: "text-green-600",
      borderColor: "border-green-100",
      onClick: () => {
        console.log("yes");
      },
    },
    {id:4,
      label:!isDel? t("crm.Delete"):"Really ?",
      icon: <DeleteFillRedIcon />,
      textColor: "text-red-600",
      borderColor: "border-red-100",
      onClick: () => {
        handleUserDelete()
      },
    },
  ];

  const DropdownMenu = ({ item }) => {
    const [isDel,setIsDel]=useState(false)

 
    
    const handleDelete = async (id) => {
      if (isDel) {
       const res =await deleteStage({ id, type: 'fb'})
       if (res.status === 200) {
        message.success("Staged has been deleted")
        const newArr = sortedStages?.filter((s)=>s.id !== Number(id))
        setSortedStages(newArr)
       }
       setIsDel(false)
      } else {
        if (sortedStages.length === 1) {
          message.error("Can not delete this single Stage")
          return
        }
        setIsDel(true)
        delTime.current = setTimeout(()=>{
          setIsDel(false)
        },3000)
  
      }
    };

    return(
     <div
     className="bg-white rounded-md shadow-md p-2"
     onClick={(e) => e.stopPropagation()} // Prevent closing on click
   >
     <div
       onClick={() =>{
        setSelectStage(item)
        setOpenEditStageModal(true)
       }}
       className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
     >
       Rename
     </div>
     <div
       onClick={() => {
         handleDelete(item.id)}}
       className="px-3 py-2 hover:bg-red-100 cursor-pointer rounded"
     >
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
      <div
        key={lead.id + stage.id}
        className={`border p-3 rounded-md flex gap-2 items-center shadow-sm ${
          selectedUsers.includes(lead.id)
            ? "border-[#0087FF] bg-[#D9EDFF]"
            : "border-white bg-white"
        }`}
        draggable={true}
        onDrag={() => setDraggedItem({ lead, stageId: stage?.id })}
      >
        <Checkbox
          checked={selectedUsers.includes(lead.id)}
          onChange={() => toggleUserSelection(lead.id)}
        />
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            setSelectedLead(lead);
            setOpenNoteModal(true);
          }}
        >
          <img
            src={lead?.profile_pic}
            alt={lead?.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="font-medium text-sm">{lead.fb_name}</p>
            <p className="text-xs text-gray-400">{lead.time}</p>
          </div>
        </div>
      </div>
    );
  };

  const DroppableStage = ({ stageId, children }) => {
    return (
      <div
        className="min-w-[300px] flex-shrink-0 bg-white rounded-lg shadow-md"
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(stageId)}
      >
        {children}
      </div>
    );
  };
  return (
    <div  className="flex-1 overflow-x-auto max-w-[calc(100vw-600px)] min-h-full relative">
      <TopbarRightSection
        companyName={selectedGroup.name}
        leadsCount={selectedGrpData?.taggedUsers?.length || 0}
        setSortedStages={setSortedStages}
        onAddStage={handleAddStage}
        selectedGrpData={selectedGrpData}
      />
      {selectedGrpLoader && <div className="absolute z-10 w-[100%] h-full bg-white/50 flex pt-50 justify-center"> <Spin size="large" /> </div>}
      <div className="flex gap-4 p-4 min-w-max">
        {sortedStages.map((stage) => {
          const selectedUsers = selectedUsersMap[stage.id] || [];

          const handleSelectAll = (e) => {
            setSelectedUsersMap((prev) => ({
              ...prev,
              [stage.id]: e.target.checked
                ? stage.leads.map((lead) => lead.id)
                : [],
            }));
          };

          const toggleUserSelection = (id) => {
            setSelectedUsersMap((prev) => {
              const current = prev[stage.id] || [];
              return {
                ...prev,
                [stage.id]: current.includes(id)
                  ? current.filter((uid) => uid !== id)
                  : [...current, id],
              };
            });
          };


          return (
            <DroppableStage stageId={stage.id}>
              <div
                key={stage.id}
                className="min-w-[300px] pb-[10px] flex-shrink-0 bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="bg-[#0087FF] text-white p-3 rounded-md mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={
                          selectedUsers?.length === stage?.leads?.length &&
                          selectedUsers?.length > 0
                        }
                        indeterminate={
                          selectedUsers?.length > 0 &&
                          selectedUsers?.length < stage?.leads?.length
                        }
                        onChange={handleSelectAll}
                      />
                      <span className="text-sm font-semibold">
                        {stage.name}
                      </span>
                      <Badge
                        count={`${stage?.leads?.length || 0} leads`}
                        style={{
                          backgroundColor: "white",
                          color: "#0087FF",
                          fontSize: "10px",
                          padding: "0 6px",
                        }}
                      />
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
                <div className="flex flex-col gap-2 px-2 max-h-[calc(100vh-200px)] overflow-y-auto">
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
      <div className="flex gap-4 p-4 items-center justify-center border border-[#DADADA] w-fit mx-auto rounded-lg mt-auto">
        {buttonActions.map((action, index) => {
        
          if(totalSlectedIds?.length>1 &&  action.id === 4) return null
        return   <button
            key={index}
            onClick={action.onClick}
            id={action.id === 3 ? "sync-fbname" : undefined}
            value={action.id === 3 ? selectedGroup.id : undefined}
            className={`flex items-center gap-2 border rounded-md px-4 py-2 hover:shadow transition cursor-pointer ${action.textColor} ${action.borderColor}`}
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
                          groupId={selectedGroup?.id}
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
          setSelectedUsersMap={ setSelectedUsersMap}

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
        />
      )}
    </div>
  );
};

RightSectionCrm.propTypes = {
  selectedGroup: PropTypes.object,
};

export default RightSectionCrm;
