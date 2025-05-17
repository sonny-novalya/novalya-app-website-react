import { useState, useEffect } from "react";
import { Modal } from "antd";
import { RgbaColorPicker } from "react-colorful";
import PropTypes from "prop-types";
import { formatColorToString } from "../../../../../helpers/formatColorToString";
import { useFbFriendListStore } from "../../../../../store/fb/friend-list";
import { Spin } from "antd";
import { Card } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { message } from "antd";

const AssignGroupModal = ({ open, close, selectedUsers, clearSelection, refreshTableData }) => {
    
    const [selected, setSelected] = useState(0);    
    const { groups, groupsLoading, fetchGroups, fbRemoveGroup } = useFbFriendListStore();
    
    useEffect(() => {
        fetchGroups();
    }, []);

    const removeGroup = () => {
        if(selectedUsers.length == 0){
            return;
        } 

        fbRemoveGroup(selectedUsers).then(() => {
            clearSelection(); // Clear selection
            close();
            refreshTableData();
            message.success("Tag removed successfully.");
        })
        .catch((error) => {
            console.log("Error removing tag:", error); // Handle errors properly
            message.error("Something went wrong")
        });
    }

    return (
        <Modal
            open={open}
            onCancel={() => close()}
            footer={null}
            centered
            className="rounded-lg"
            closable={false}
            width={650}
        >
            <div className="text-center rounded-t-lg">
                <h2 className="text-left text-2xl font-medium text-gray-700">Add to group</h2>
                <h4 className="text-left text-l font-medium text-gray-700" style={{marginTop:"5px"}}>Where would you like to Add {selectedUsers.length} users?</h4>
            </div>

            <div style={{height:"300px", overflowY:"auto", marginTop:"15px"}}>

                {groupsLoading && <div className="text-center mt-10">
                    <Spin tip="Loading..." size="large"/>
                </div>}
                {groups.map((item) => (
                    <div 
                        key={item.id} 
                        className="fb-group-row" 
                        onClick={() => setSelected(item.id)} 
                        style={{
                            backgroundColor: selected === item.id ? "#D6E6F4" : "transparent"
                        }}
                    >
                        <span className="fb-group-icon" style={{ mb: 2, border:"1px solid", borderColor: item.custom_color, color: item.custom_color }}>
                            {item.name.slice(0, 2).toUpperCase()}
                        </span>
                        <span className="fb-group-label" >{item.name}</span>

                        {selected === item.id && <CheckOutlined style={{position:"absolute", right:"10px", color: "#0087ff", fontSize:"20px"}} />}
                    </div>
                ))}
            </div>

            <div className="bg-gray-50 mt-2 rounded-b-lg flex justify-end space-x-4">
                <button onClick={() => close()} className="bg-white w-32 text-[#0087FF] border border-[#0087FF] rounded-lg py-2 px-6 cursor-pointer close-fb-group-popup">
                    Cancel
                </button>
                <button className="bg-[#21BF7C] w-32 text-white rounded-lg py-2 px-6 cursor-pointer assign-fb-group" selected-tag={selected} selected-users={JSON.stringify(selectedUsers)}>
                    Add
                </button>
                <button className="bg-[#21BF7C] w-32 text-white rounded-lg py-2 px-6 cursor-pointer" onClick={removeGroup}>
                    Remove
                </button>
            </div>
        </Modal>
    );
};

export default AssignGroupModal;
