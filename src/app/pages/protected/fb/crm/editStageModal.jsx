import { message, Modal, Spin } from "antd";
import { useState } from "react";
import { t } from "i18next";
import usefbCRM from "../../../../../store/fb/fbCRM";

const EditstageModal = ({ visible, onCancel, setSortedStages}) => {
    const {
        selectStage,
        editStage, 
        addGrpLoader
      } = usefbCRM();
    const [stageName, setStageName] = useState(selectStage?.name || "");
console.log(selectStage)
    const handleInputChange = (e) => {
        setStageName(e.target.value);
    };

    const onsubmit =async ()=>{
    if(!stageName?.trim()){
        message.error("Stage Name is Required")
        return
    }
    const data  = {
        name:stageName,
        id:selectStage.id
    }
   const res = editStage(data)
    if (res.status === 200) {
        message.success("Stage has been Updated")
        setSortedStages((prev)=>{
            let newArr= [...prev]
            newArr.map((stage)=>{
                if (stage.id === selectStage.id) {
                    return {...stage,name:stageName}
                }
             return stage
            })
            console.log(newArr)
            return newArr
        })

        onCancel()
    }

    }

    return (
        <Modal
            open={visible}
            onCancel={onCancel}
            footer={null}
            width={600}
            centered
        >
            <div className="bg-gray-50 rounded-t-lg pb-4 ">
                <h2 className="text-xl font-medium ">{"Edit Stage"}</h2>
            </div>

            <h2 className="text-lg font-medium my-2">{t("crm.Stage Name")}</h2>
            <input
                className="w-full rounded-lg bg-white border border-gray-300 px-4 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Add stage"
                value={stageName}
                onChange={handleInputChange}
                style={{ height: "50px" }}
            />
            <p className="text-[#00000065] mt-1">
                {t("crm.Max length is 50 characters")}
            </p>

            <div className="bg-gray-50 mt-4 rounded-b-lg flex justify-end space-x-4">
                <button
                    onClick={() => {
                        console.log("Cancel");
                        onCancel(); // optional: clear state on cancel
                    }}
                    className="bg-white w-32 text-[#0087FF] border border-[#0087FF] rounded-lg py-2 px-6"
                >
                    {t("crm.Cancel")}
                </button>
                <button
                    onClick={() => {
                        onsubmit()
                    }}
                    className="bg-[#21BF7C] w-32 text-white rounded-lg py-2 px-6"
                >
                    { !addGrpLoader?t("crm.Add"):<Spin size="small"/>}
                </button>
            </div>
        </Modal>
    );
};



export default EditstageModal;
