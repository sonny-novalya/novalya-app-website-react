import PropTypes from "prop-types";
import { message, Modal, Select } from "antd";
import { useState } from "react";
import { t } from "i18next";
const { Option } = Select;

const MoveToStageModal = ({ visible, onCancel ,selectedUsersMap,moveStage,sortedStages,setSortedStages,setSelectedUsersMap}) => {
    const [selectedStage, setSelectedStage] = useState(null);
    const allIds = Object.values(selectedUsersMap).flat();

 
    const  moverTaggedUsers = async ()=>{
     

        if (!selectedStage) {
            message.error("Stage cant be empty")
            return
        }
        const data = {
            stage_id:selectedStage,
            tagged_user_ids:allIds
        }
    const res = await moveStage({ data, type: 'fb'})

    if(res.status === 200){
        message.success("Users has been moved")
        const newArr=[]
      let tempArr =  sortedStages?.map((s)=>{
            s.leads.forEach((l)=>{
                if (allIds.includes(l.id)) {
                    newArr.push(l)
                }
            })
            return {...s,leads:s?.leads?.filter((f)=>!allIds.includes(f.id))}
        })

        tempArr= tempArr.map((data)=>{
            if (data.id === Number(selectedStage)) {
                return {...data,leads:[...data?.leads,...newArr]}
            }else{
                return data
            }
        })
        setSelectedUsersMap({})
        setSortedStages(tempArr)
    
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
                <h2 className="text-xl font-medium ">{t("crm.Move to Stage")}</h2>
            </div>
            <h2 className="text-lg font-medium my-3">{t("crm.Where would you like to move")}{" "}
            {allIds?.length + " "}{t("crm.users?")}</h2>
            <Select
                className="w-full rounded-lg bg-white border border-gray-300 px-4 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={t("crm.Select stage")}
                value={selectedStage || undefined}
                onChange={(value) => setSelectedStage(value)}
                dropdownStyle={{ maxHeight: "200px", overflow: "auto" }}
                style={{ height: "50px" }}
            >
                {sortedStages?.map((stage) => (
                    <Option key={stage.id} value={stage.id} className="h-[50px] flex items-center px-4">
                        {stage.name}
                    </Option>
                ))}
            </Select>
            <div className="bg-gray-50 mt-4 rounded-b-lg flex justify-end space-x-4">
                <button
                    onClick={() => console.log("Cancel")}
                    className="bg-white w-32 text-[#0087FF] border border-[#0087FF] rounded-lg py-2 px-6"
                >
                    {t("crm.Cancel")}
                </button>
                <button
                    onClick={() => moverTaggedUsers()}
                    className="bg-[#21BF7C] w-32 text-white rounded-lg py-2 px-6"
                >
                    {t("crm.Move")}
                </button>
            </div>
        </Modal>
    );
};

MoveToStageModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default MoveToStageModal;
