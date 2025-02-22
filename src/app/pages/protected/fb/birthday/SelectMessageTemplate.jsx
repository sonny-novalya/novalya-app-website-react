/* eslint-disable react/prop-types */
import { Select } from "antd";

const { Option } = Select;

const SelectMessageTemplate = ({ selectedTemplate, setSelectedTemplate, templates }) => {
    return (
        <div className="border border-[#DADADA] p-4 rounded-lg">
            <p className="font-medium mb-2 text-gray-800">Select Message Template</p>

            <Select
                className="w-full rounded-lg bg-white border border-gray-300 px-4 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Select Template"
                value={selectedTemplate || undefined}
                onChange={(value) => setSelectedTemplate(value)}
                dropdownStyle={{ maxHeight: "200px", overflow: "auto" }}
                style={{ height: "50px" }} 
            >
                {templates?.map((template) => (
                    <Option key={template} value={template} className="h-[50px] flex items-center px-4">
                        {template}
                    </Option>
                ))}
            </Select>
        </div>
    );
};

export default SelectMessageTemplate;
