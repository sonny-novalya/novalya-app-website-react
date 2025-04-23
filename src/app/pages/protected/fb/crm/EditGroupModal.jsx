import { useState } from "react";
import { message, Modal, Spin } from "antd";
import { RgbaColorPicker } from "react-colorful";
import { formatColorToString ,formatStringToColor} from "../../../../../helpers/formatColorToString";
import { t } from "i18next";

const EditGroupModal = ({ createGroup ,createCRMGroup,fetchCRMGroups,addGrpLoader,selectedGrp}) => {
    const [groupName, setGroupName] = useState(selectedGrp?.name || '');
    const [color, setColor] = useState( formatStringToColor(selectedGrp?.custom_color) || { r: 255, g: 255, b: 255, a: 1 });
    const [colorSource, setColorSource] = useState("picker"); 

    console.log(selectedGrp,color)
    
    const colorOptions = [
        { 'r': 242, 'g': 7, 'b': 7, 'a': 1 },
        { 'r': 0, 'g': 135, 'b': 255, 'a': 1 },
        { 'r': 33, 'g': 191, 'b': 124, 'a': 1 },
        { 'r': 151, 'g': 71, 'b': 255, 'a': 1 },
        { 'r': 228, 'g': 137, 'b': 123, 'a': 1 },
        { 'r': 235, 'g': 141, 'b': 6, 'a': 1 },
        { 'r': 255, 'g': 221, 'b': 85, 'a': 1 }
    ]

    const handleColorChangeInternal = (newColor) => {
        setColor(newColor); 
        setColorSource("picker"); 
    };

    const handlePresetColorChange = (newColor) => {
        setColor(newColor);
        setColorSource("preset");
       
    };

    const  handleSubmit =async ()=>{

        if (!groupName.trim()) {
            message.error("Group Name is required")
            return
        }
       
    //   const  payloadRGB = `rgba(${color['r']},${color["g"]},${color["b"]},${color["a"]})`
      const payload= {
        custom_color:formatColorToString(color),
        name:groupName,
        no_stages_group: false,
        id:selectedGrp?.id
    }

    const res = await createCRMGroup(payload)

    if (res.status === 200) {
        message.success("Group has been created")
        fetchCRMGroups()
        createGroup.onClose();

    }
    }

    return (
        <Modal
            open={createGroup.isOpen}
            onCancel={() => {
                createGroup.onClose();
            }}
            footer={null}
            centered
            className="rounded-lg"
        >
            <div className="bg-gray-50 text-center rounded-t-lg">
                <h2 className="text-2xl font-medium text-gray-700">{"Edit Group"}</h2>
            </div>

            <div className="flex flex-col space-y-2">
                <div className="text-xl text-[#000407] font-medium">{t("crm.Name your group")}</div>
                <input
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder={t("crm.Write group name ...")}
                    className="p-3 rounded-lg border border-[#DADADA] focus:outline-none focus:border-[#0087FF] "
                />

                <div className="text-xl text-[#000407] font-medium mt-2">
                    {t("crm.Select the color")}
                </div>

                <div className="flex mb-4 space-x-4">
                    {colorOptions.map((col, index) => (
                        <div
                            key={index}
                            style={{
                                backgroundColor: formatColorToString(col),
                            }}
                            className="h-8 w-8 rounded-sm cursor-pointer"
                            onClick={() => handlePresetColorChange(col)}
                        />
                    ))}
                </div>

                <div className="rounded-lg mt-4 flex space-x-5">
                    <RgbaColorPicker
                        color={color}
                        className="mb-4"
                        onChange={handleColorChangeInternal}
                    />
                    <div>
                        <div className="text-sm font-medium">
                            <h2 className="mb-2">Hex</h2>
                            <span className="rounded-lg border border-gray-300 p-2">{`#${(color.r << 16 | color.g << 8 | color.b).toString(16).padStart(6, '0').toUpperCase()}`}</span>
                        </div>
                        <div
                            style={{
                                backgroundColor: formatColorToString(color),
                            }}
                            className="mt-5 h-10 w-20 rounded-lg"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 mt-2 rounded-b-lg flex justify-end space-x-4">
                <button
                    onClick={() => {
                        createGroup.onClose();
                    }}
                    className="bg-white w-32 text-[#0087FF] border border-[#0087FF] rounded-lg py-2 px-6"
                >
                    {t("crm.Cancel")}
                </button>
                <button
                    onClick={handleSubmit}
                    className="bg-[#21BF7C] w-32 text-white rounded-lg py-2 px-6"
                >
                    {!addGrpLoader? "Edit":<Spin size="small" style={{color:"white"}}/>}
                </button>
            </div>
        </Modal>
    );
};



export default EditGroupModal;
