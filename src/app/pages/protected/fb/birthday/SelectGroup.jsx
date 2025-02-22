/* eslint-disable react/prop-types */
import { Select } from "antd";

const { Option } = Select;

const SelectGroup = ({ selectedGroup, setSelectedGroup, selectedStage, setSelectedStage, groups, stages }) => {
    return (
        <div className="border border-gray-300 p-4 rounded-lg">
            <p className="font-medium mb-2 text-gray-800">Select Group</p>

            {/* Group Select */}
            <div className="flex flex-col gap-4">
                <Select
                    className="w-full rounded-lg bg-white border border-[#DADADA] px-4 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Select Group"
                    value={selectedGroup || undefined}
                    onChange={(value) => setSelectedGroup(value)}
                    dropdownStyle={{ maxHeight: "200px", overflow: "auto" }} 
                    style={{ height: "50px" }} 
                >
                    {groups?.map((group) => (
                        <Option key={group} value={group} className="h-[50px] flex items-center px-4">
                            {group}
                        </Option>
                    ))}
                </Select>

                {/* Stage Select */}
                <Select
                    className="w-full rounded-lg bg-white border border-[#DADADA] px-4 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Select Stage"
                    value={selectedStage || undefined}
                    onChange={(value) => setSelectedStage(value)}
                    dropdownStyle={{ maxHeight: "200px", overflow: "auto" }}
                    style={{ height: "50px" }}
                >
                    {stages.map((stage) => (
                        <Option key={stage} value={stage} className="h-[50px] flex items-center px-4">
                            {stage}
                        </Option>
                    ))}
                </Select>
            </div>
        </div>
    );
};

export default SelectGroup;
