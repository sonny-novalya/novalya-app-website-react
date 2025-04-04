import { useState, useEffect } from "react";
import { Modal } from "antd";
import { RgbaColorPicker } from "react-colorful";
import PropTypes from "prop-types";
import { formatColorToString } from "../../../../../helpers/formatColorToString";
import { useFbFriendListStore } from "../../../../../store/fb/friend-list";
import { Spin } from "antd";
import { Card } from "antd";

const AssignGroupModal = ({ open, close, usersToAdd }) => {
    const [groupName, setGroupName] = useState('');
    const [color, setColor] = useState({ r: 255, g: 255, b: 255, a: 1 });
    const [colorSource, setColorSource] = useState("picker"); 
    console.log("colorSource", colorSource)
    const { groups, groupsLoading, fetchGroups } = useFbFriendListStore();
    
    useEffect(() => {
        fetchGroups();
    }, []);

    return (
        <Modal
            open={open}
            onCancel={() => close(false)}
            footer={null}
            centered
            className="rounded-lg"
            closable={false}
            width={650}
        >
            <div className="text-center rounded-t-lg">
                <h2 className="text-left text-2xl font-medium text-gray-700">Add to group</h2>
                <h4 className="text-left text-l font-medium text-gray-700" style={{marginTop:"5px"}}>Where would you like to Add {usersToAdd.length} users?</h4>
            </div>

            <div style={{height:"300px", overflowY:"auto", marginTop:"15px"}}>

                {groupsLoading && <div className="text-center mt-10">
                    <Spin tip="Loading..." size="large"/>
                </div>}
                {groups.map((item) => (
                    <div key={item.id} className="fb-group-row">
                        <span className="fb-group-icon" style={{ mb: 2, border:"1px solid", borderColor: item.custom_color, color: item.custom_color }}>
                            {item.name.slice(0, 2)}
                        </span>
                        <span className="fb-group-label" >{item.name}</span>
                    </div>
                ))}
            </div>

            <div className="bg-gray-50 mt-2 rounded-b-lg flex justify-end space-x-4">
                <button onClick={() => close(false)} className="bg-white w-32 text-[#0087FF] border border-[#0087FF] rounded-lg py-2 px-6 cursor-pointer">
                    Cancel
                </button>
                <button className="bg-[#21BF7C] w-32 text-white rounded-lg py-2 px-6 cursor-pointer">
                    Add
                </button>
                <button className="bg-[#21BF7C] w-32 text-white rounded-lg py-2 px-6 cursor-pointer">
                    Remove
                </button>
            </div>
        </Modal>
    );
};

export default AssignGroupModal;
