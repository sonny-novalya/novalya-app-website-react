import { useEffect, useState } from "react";
import { Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Layout from "../../Layout";
import { useFbCrmGroupStore } from "../../../../../store/crm-groups/fb-groups";
import LeftSectionCrm from "./LeftSectionCrm";
import RightSectionCrm from "./RightSectionCrm";
import AddGroupModal from "./AddGroupModal";
import { t } from "i18next";

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

  const onDragEnd = (result) => {
    if (!result.destination) return;
    console.log(result)

    const items = Array.from(groups);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setGroups(items);
  };

  const { fbCrmGroups, loading: fetchCrmGroupLoading, error: fetchCrmGroupError, fetchGroups } = useFbCrmGroupStore();

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const toggleAddGroupModal = () => {
    setOpenAddGroupModal(!openAddGroupModal);
  };

  return (
    <Layout>
      <h2 className="text-xl font-medium mb-2">{t("crm.Facebook CRM")}</h2>
      <div class="nv-content-wrapper"></div> {/* to display account syncing message */}
      <div className="flex bg-gray-100 shadow-lg rounded-lg">
        <div className="w-[300px] bg-[#E6F1FB] p-4 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{t("crm.Groups")}</h2>
            <Button
              icon={<PlusOutlined />}
              type="primary"
              size="small"
              onClick={toggleAddGroupModal}
            >
              {t("crm.Add Group")}
            </Button>
          </div>
          <Input
            placeholder={t("crm.Search...")}
            className="mb-4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex-1 overflow-y-auto max-h-[calc(100vh-170px)] min-h-[calc(100vh-170px)]">
            <LeftSectionCrm
              isLoading={fetchCrmGroupLoading}
              groups={fbCrmGroups}
              search={search}
              selectedGroup={selectedGroup}
              setSelectedGroup={setSelectedGroup}
              onDragEnd={onDragEnd}
              error={fetchCrmGroupError}
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
          handleGroupSave={() => { }}
          handleColorChange={() => { }}
        />
      )}
    </Layout>
  );
};

export default Crm;
