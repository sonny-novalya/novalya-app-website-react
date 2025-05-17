import { useEffect, useState } from "react";
import { Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Layout from "../../Layout";
import LeftSectionCrm from "./LeftSectionCrm";
import RightSectionCrm from "./RightSectionCrm";
import AddGroupModal from "./AddGroupModal";
import { t } from "i18next";
import usefbCRM from "../../../../../store/fb/fbCRM";
import EditGroupModal from "./EditGroupModal";
import { CollapsedLeftIcon } from "../../../common/icons/icons";

const initialGroups = [
  { id: "1", name: "TeckTalk" },
  { id: "2", name: "Sobinder1" },
  { id: "3", name: "nmn" },
  { id: "4", name: "18-FEB" },
  { id: "5", name: "test1" },
  { id: "6", name: "shivam" },
  { id: "7", name: "bmbmn" },
  { id: "8", name: "nmnm" },
  { id: "9", name: "popop" },
];

const Crm = () => {
  const [groups, setGroups] = useState(initialGroups);
  const [selectedGroup, setSelectedGroup] = useState({});
  const [search, setSearch] = useState("");
  const [openAddGroupModal, setOpenAddGroupModal] = useState(false);
  const [openEditGroupModal, setOpenEditGroupModal] = useState(false);
  const [isCollapse, setCollapse] = useState(false);


  const onDragEnd = (result) => {
    if (!result.destination) return;
    console.log(result)

    const items = Array.from(groups);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setGroups(items);
  };


  const { fetchCRMGroups, CRMList, fbCRMLoading, error, createCRMGroup, reorderCRMGroups, addGrpLoader, editCRMGroup, selectedGrp } = usefbCRM()

  useEffect(() => {
    fetchCRMGroups({type:'ig'});
  }, []);

  const toggleAddGroupModal = () => {
    setOpenAddGroupModal(!openAddGroupModal);
  };

  const toggleEditGrpPop = () => {
    setOpenEditGroupModal(false)
  }

  return (
    <Layout>
      <h2 className="text-xl font-medium mb-2">{t("crm.Instagram CRM")}</h2>
      <div class="nv-content-wrapper"></div> {/* to display account syncing message */}
      <div className="flex bg-gray-100 shadow-lg rounded-lg">
       <div
          className="w-[300px] bg-[#E6F1FB] p-4 flex pt-[40px] flex-col overflow-hidden relative"
          style={{ width: isCollapse ? "110px" : "" }}
        >
          <button className="absolute right-[5px] top-[5px] z-50 bg-[#167AD3] text-white w-7 h-7 flex items-center justify-center rounded-full shadow-md scale-90 hover:scale-100 transition cursor-pointer">
            <div
              onClick={() => setCollapse(!isCollapse)}
              className={`transition-transform duration-300 ${
                isCollapse ? "rotate-180" : "rotate-0"
              }`}
            >
              <CollapsedLeftIcon />
            </div>
          </button>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{t("crm.Groups")}</h2>
            {!isCollapse && (
              <Button
                icon={<PlusOutlined />}
                type="primary"
                size="small"
                onClick={toggleAddGroupModal}
              >
                {t("crm.Add Group")}
              </Button>
            )}
          </div>
          {!isCollapse && (
            <Input
              placeholder={t("crm.Search...")}
              className="mb-4"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          )}

          {isCollapse && (
            <Button
              icon={<PlusOutlined />}
              type="primary"
              style={{ width: "75px", height: "44px" }}
              onClick={toggleAddGroupModal}
            ></Button>
          )}
          <div
            className="flex-1 overflow-y-auto max-h-[calc(100vh-170px)] min-h-[calc(100vh-170px)]"
            style={{ width: isCollapse ? "75px" : "" }}
          >
            <LeftSectionCrm
              isLoading={fbCRMLoading}
              groups={CRMList}
              search={search}
              selectedGroup={selectedGroup}
              setSelectedGroup={setSelectedGroup}
              onDragEnd={onDragEnd}
              error={error}
              reorderCRMGroups={reorderCRMGroups}
              setOpenEditGroupModal={setOpenEditGroupModal}
              isCollapse={isCollapse}
            />
          </div>
        </div>
        <div className="flex-1">
          <RightSectionCrm selectedGroup={selectedGroup} />
        </div>
      </div>

      {openAddGroupModal && (
        <AddGroupModal
          createGroup={{ isOpen: openAddGroupModal, onClose: toggleAddGroupModal }}
          showColorPicker={{ isOpen: false, toggle: () => { } }}
          createCRMGroup={createCRMGroup}
          fetchCRMGroups={fetchCRMGroups}
          addGrpLoader={addGrpLoader}
          existingGroupNames={CRMList.map(group => group.name.toLowerCase())}
        />
      )}

      {openEditGroupModal && (
        <EditGroupModal
          createGroup={{ isOpen: openEditGroupModal, onClose: toggleEditGrpPop }}
          showColorPicker={{ isOpen: false, toggle: () => { } }}
          editCRMGroup={editCRMGroup}
          fetchCRMGroups={fetchCRMGroups}
          addGrpLoader={addGrpLoader}
          selectedGrp={selectedGrp}
          existingGroupNames={CRMList.map(group => group.name.toLowerCase())}
        />
      )}
    </Layout>
  );
};

export default Crm;
