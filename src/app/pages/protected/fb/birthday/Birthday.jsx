import { useState } from "react";
import Layout from "../../Layout";
import Strategy from "./Strategy";
import AddTag from "./AddTag";
import SelectGroup from "./SelectGroup";
import SelectMessageTemplate from "./SelectMessageTemplate";
import WishTypeSelector from "./WishTypeSelector";

const Birthday = () => {
  const [selectedWishType, setSelectedWishType] = useState("Inbox Direct Messages");
  const [selectedTag, setSelectedTag] = useState("Yes");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const groups = ["Group 1", "Group 2", "Group 3"];
  const stages = ["Stage 1", "Stage 2", "Stage 3"];
  const templates = ["Template 1", "Template 2", "Template 3"];

  return (
    <Layout>
      <h2 className="text-xl font-semibold mb-4">Wish your friends birthday automatically</h2>
      <div className="bg-white p-6 rounded-lg shadow-md mx-auto ">
        
        {/* Wish Type Selector */}
        <WishTypeSelector 
          selectedWishType={selectedWishType} 
          setSelectedWishType={setSelectedWishType}
        />

        {/* Select the strategy */}
        <Strategy />

        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Add Tag */}
          <AddTag 
            selectedTag={selectedTag} 
            setSelectedTag={setSelectedTag} 
          />
          {/* Select Group */}
          <SelectGroup
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
            selectedStage={selectedStage}
            setSelectedStage={setSelectedStage}
            groups={groups}
            stages={stages}
          />
        </div>

        {/* Select Message Template */}
        <SelectMessageTemplate 
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          templates={templates}
        />

        {/* Send Birthday Wishes */}
        <div className="flex items-center justify-center">
          <button className="w-fit py-2 mt-5 rounded-lg text-lg bg-green-500 text-white px-40">
            Send Birthday Wishes
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Birthday;
