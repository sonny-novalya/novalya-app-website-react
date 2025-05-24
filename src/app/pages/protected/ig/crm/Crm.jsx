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
import { SearchOutlined, LikeOutlined, MessageOutlined } from "@ant-design/icons";

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


  const { fetchOnlyGroups, CRMGroupList, fbCRMLoading, error, createCRMGroup, reorderCRMGroups, addGrpLoader, editCRMGroup, selectedGrp } = usefbCRM()

  useEffect(() => {
    fetchOnlyGroups({type:'ig'});
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
      <div className="flex flex-1 bg-white rounded-[8px] overflow-hidden relative gap-5">
          <button
            onClick={() => setCollapse(!isCollapse)}
            className={`absolute ${isCollapse ? "left-[100px]" : "left-[260px]"} top-[30px] shadow-[0_0_4px_2px_rgb(28_117_251_/_30%)] z-50 bg-[#167AD3] text-white w-5 h-5 flex items-center justify-center rounded-full scale-90 hover:scale-100 transition cursor-pointer transition-transform duration-300 ${isCollapse ? "rotate-180" : "rotate-0"}`}
          >
            <CollapsedLeftIcon />
          </button>


       <div
          className="w-[270px] bg-white flex pt-[20px] flex-col overflow-hidden flex-shrink-0 border border-[#DADADA] rounded-[8px]"
          style={{ width: isCollapse ? "110px" : "" }}
        >
          

          {
            isCollapse
              ? <>
                <div className="flex justify-center">
                  <Button
                    icon={<PlusOutlined />}
                    type="primary"
                    style={{ width: "44px", height: "44px", borderRadius: "50%", marginRight: "12px" }}
                    onClick={toggleAddGroupModal}
                  ></Button>
                </div>
              </>
              : <>
                <div className="flex items-center justify-between mb-5 px-4">
                  <h2 className="text-[#000407] opacity-70 text-[18px] font-medium">{t("crm.Groups")}</h2>
                  <Button
                    className="min-h-[32px] bg-[#0087FF] gap-[2px] text-[12px] p-[6px] leading-[1] rounded-[4px] flex"
                    icon={<PlusOutlined />}
                    type="primary"
                    size="small"
                    onClick={toggleAddGroupModal}
                  >
                    {t("crm.Add Group")}
                  </Button>
                </div>
                <div className="px-4 pr-5">
                  <Input
                    placeholder={t("crm.Search...")}
                     prefix={<SearchOutlined />}
                    className="w-1/3 px-3 py-2 !rounded-[4px] border border-[#CCCDCD] min-h-[36px] ctm-search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </>
          }
          <div
            className="flex-1 overflow-y-auto px-4 overflow-auto h-full"
          >
            <LeftSectionCrm className=''
              isLoading={fbCRMLoading}
              groups={CRMGroupList}
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
        <div className="flex-1 w-full overflow-hidden">
          <RightSectionCrm selectedGroup={selectedGroup} />
        </div>
      </div>

      {openAddGroupModal && (
        <AddGroupModal
          createGroup={{ isOpen: openAddGroupModal, onClose: toggleAddGroupModal }}
          showColorPicker={{ isOpen: false, toggle: () => { } }}
          createCRMGroup={createCRMGroup}
          fetchCRMGroups={fetchOnlyGroups}
          addGrpLoader={addGrpLoader}
          existingGroupNames={CRMGroupList.map(group => group.name.toLowerCase())}
        />
      )}

      {openEditGroupModal && (
        <EditGroupModal
          createGroup={{ isOpen: openEditGroupModal, onClose: toggleEditGrpPop }}
          showColorPicker={{ isOpen: false, toggle: () => { } }}
          editCRMGroup={editCRMGroup}
          fetchCRMGroups={fetchOnlyGroups}
          addGrpLoader={addGrpLoader}
          selectedGrp={selectedGrp}
          existingGroupNames={CRMGroupList.map(group => group.name.toLowerCase())}
        />
      )}
    </Layout>
  );
};

export default Crm;
