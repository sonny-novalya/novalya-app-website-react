import PropTypes from "prop-types";
import { Checkbox, Badge, Dropdown, Menu, message } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  DeleteFillRedIcon,
  MoveStageGreenIcon,
  SendBlueIcon,
  SendIcon,
  SyncGreenIcon,
} from "../../../common/icons/icons";
import TopbarRightSection from "./TopBarRightSection";
import SendCampaignModal from "./SendCampaignModal";
import MoveToStageModal from "./MoveToStageModal";
import AddStageModal from "./AddStageModal";
import NoteUserModal from "./NoteUserModal";

import { t } from "i18next";
import usefbCRM from "../../../../../store/fb/fbCRM";

const RightSectionCrm = ({ selectedGroup }) => {
  const {selectedGrpData,moveTaggedUsers,createStage,addGrpLoader}=usefbCRM()

  const [selectedUsersMap, setSelectedUsersMap] = useState({});
  const [openCampaignModal, setOpenCampaignModal] = useState(false);
  const [openMoveToStageModal, setOpenMoveToStageModal] = useState(false);
  const [openAddStageModal, setOpenAddStageModal] = useState(false);
  const [openNoteModal, setOpenNoteModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [sortedStages,setSortedStages]= useState([])
  const [draggedItem, setDraggedItem] = useState(null);

  useEffect(() => {
    
   if(selectedGrpData?.stage?.length ){ 
    let newStages = [...selectedGrpData.stage].sort(
        (a, b) => a.stage_num - b.stage_num
      );
      const fakeLeads = (id)=>{
      const leads =   selectedGrpData?.taggedUsers?.filter((data)=>data?.stage_id === id)
      return leads
      }
      newStages=  newStages?.map((element )=> {
        return {...element,leads:fakeLeads(element.id) }
      });

      setSortedStages(newStages)
    }

  }, [selectedGrpData])
  
  //  const startIndexRef = useRef(null);

  if (!selectedGroup || !selectedGroup.stage) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        {t("crm.Select a group to view details")}
      </div>
    );
  }

  
  const menu = (
    <Menu
      items={[
        { key: "1", label: "Rename Stage" },
        { key: "2", label: "Delete Stage" },
      ]}
    />
  );



  const handleSearch = (value) => {
    console.log("Search value:", value);
  };

  const handleAddStage = () => {
    setOpenAddStageModal(true);
  };



  const handleDrop = async(targetColId) => {
    if (!draggedItem || targetColId === draggedItem?.stageId) return


    const newArr = sortedStages?.map(((data)=>{
        if (data.id === draggedItem?.stageId) {
          console.log({...data,leads:data.leads.filter((card)=>card.id !== draggedItem.lead.id) })
            return {...data,leads:data.leads.filter((card)=>card.id !== draggedItem.lead.id) }
        }else if(data.id === targetColId){
            return {...data,leads:[...data.leads,draggedItem.lead] }

        }else{
            return data
        }
    }))

    setSortedStages(newArr)
    setDraggedItem(null);

    const res =await moveTaggedUsers({id:draggedItem.lead.id,stage_id:targetColId})

    if (res?.status !== 200) {
      message.error("Unable to move tagged user")
    }
  };


  const buttonActions = [
    {
      label: t("crm.Send Campaign"),
      icon: <SendBlueIcon />,
      textColor: "text-blue-600",
      borderColor: "border-blue-100",
      onClick: () => {
        setOpenCampaignModal(true);
      },
    },
    {
      label: t("crm.Move to stage"),
      icon: <MoveStageGreenIcon />,
      textColor: "text-green-600",
      borderColor: "border-green-100",
      onClick: () => {
        setOpenMoveToStageModal(true);
      },
    },
    {
      label: t("crm.Synchronize date"),
      icon: <SyncGreenIcon />,
      textColor: "text-green-600",
      borderColor: "border-green-100",
      onClick: () => {
        console.log("yes");
      },
    },
    {
      label: t("crm.Delete"),
      icon: <DeleteFillRedIcon />,
      textColor: "text-red-600",
      borderColor: "border-red-100",
      onClick: () => {
        console.log("Delete clicked");
      },
    },
  ];

  const SortableItem = ({
    lead,
    selectedUsers,
    stage,
    toggleUserSelection,
  }) => {
   console.log(lead?.profile_pic)

    return (
      <div
        key={lead.id + stage.id}
        className={` border p-3 rounded-md flex gap-2 items-center shadow-sm ${
          selectedUsers.includes(lead.id)
            ? "border-[#0087FF] bg-[#D9EDFF]"
            : "border-white bg-white"
        }`}

        draggable={true}
        onDrag={()=>setDraggedItem({lead,stageId:stage?.id})}
      
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
       onDrop={()=>handleDrop(stageId)}
      >
        {children}
      </div>
    );
  };
  return (
    <div className="flex-1 overflow-x-auto max-w-[calc(100vw-600px)] min-h-full">
      <TopbarRightSection
        companyName={selectedGroup.name}
        leadsCount={selectedGrpData?.taggedUsers?.length || 0}
        onSearch={handleSearch}
        onAddStage={handleAddStage}
      />

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
                  className="min-w-[300px] min-h-[640px] pb-[10px] flex-shrink-0 bg-white rounded-lg shadow-md overflow-y-scroll"

                >
                  <div className="bg-[#0087FF] text-white p-3 rounded-md mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={selectedUsers?.length === stage?.leads?.length && selectedUsers?.length > 0}
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
                          onClick={() => setOpenCampaignModal(true)}
                          className="cursor-pointer"
                        >
                          <SendIcon />
                        </span>
                        <Dropdown overlay={menu} trigger={["click"]}>
                          <MoreOutlined
                            style={{ fontSize: "18px", cursor: "pointer" }}ß
                          />
                        </Dropdown>
                      </div>
                    </div>
                  </div>

                  {/* Leads */}
                  <div className="flex flex-col gap-2 px-2">
                 
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
        {buttonActions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`flex items-center gap-2 border rounded-md px-4 py-2 hover:shadow transition cursor-pointer ${action.textColor} ${action.borderColor}`}
          >
            {action.icon}
            <span className="font-medium">{action.label}</span>
          </button>
        ))}
      </div>

      {openCampaignModal && (
        <SendCampaignModal
          visible={openCampaignModal}
          onCancel={() => setOpenCampaignModal(false)}
          onSend={(data) => {
            console.log("Sending with data:", data);
            setOpenCampaignModal(false);
          }}
        />
      )}
      {openMoveToStageModal && (
        <MoveToStageModal
          visible={openMoveToStageModal}
          onCancel={() => setOpenMoveToStageModal(false)}
          onSend={(data) => {
            console.log("moving with data:", data);
            setOpenMoveToStageModal(false);
          }}
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
