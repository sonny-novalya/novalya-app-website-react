import { useState } from "react";
import { Table, Button, Input, Dropdown, Menu } from "antd";
import { SearchOutlined, SettingOutlined, SendOutlined, MoreOutlined } from "@ant-design/icons";
import GroupImg from "../../../../../assets/img/groupImg.png"

const menu = (
    <Menu>
        <Menu.Item key="1">Facebook</Menu.Item>
        <Menu.Item key="2">Cloud</Menu.Item>
        <Menu.Item key="3">Delete</Menu.Item>
    </Menu>
);

const initialGroups = Array(7).fill({
    key: Math.random(),
    groupName: "Longnamegroup Example",
    members: "All Members",
    privacy: "🌎",
    messagesSent: 110,
    folder: "Interested Buyer",
});

const GroupsTable = () => {
    // const [groupsData, setGroupsData] = useState(initialGroups);
    const [searchText, setSearchText] = useState("");

    const filteredData = initialGroups.filter(group =>
        group.groupName.toLowerCase().includes(searchText.toLowerCase())
    );

    const groupColumns = [
        {
            title: "Group's Name",
            dataIndex: "groupName",
            render: (text) => (
                <div className="flex items-center space-x-2">
                    <img src={GroupImg} alt="Group" className="w-10 h-10 rounded-full object-cover" />
                    <span className="font-semibold">{text}</span>
                </div>
            ),
        },
        { title: "Members", dataIndex: "members" },
        { title: "Privacy", dataIndex: "privacy" },
        { title: "Messages sent", dataIndex: "messagesSent" },
        {
            title: "Folder",
            dataIndex: "folder",
            render: (text) => <span className="px-3 py-1 rounded-lg bg-green-200 text-green-800 font-medium">{text}</span>,
        },
        {
            title: "Settings",
            render: () => <Button icon={<SettingOutlined />} className="bg-blue-500 text-white px-3 py-1 rounded-md">Settings</Button>,
        },
        { title: "Send", render: () => <Button icon={<SendOutlined />} className="bg-gray-200 px-3 py-1 rounded-md" /> },
        {
            title: "Action",
            render: () => (
                <Dropdown overlay={menu} trigger={["click"]}>
                    <Button icon={<MoreOutlined />} className="bg-gray-200 px-3 py-1 rounded-md" />
                </Dropdown>
            ),
        },
    ];

    return (
        <div>
            <div className="flex items-center justify-between my-4">
                <div className="space-x-2">
                    <Button className="bg-gray-200 px-4 py-2 rounded-md">All</Button>
                    <Button className="bg-gray-200 px-4 py-2 rounded-md">Archived</Button>
                    <Button className="bg-gray-200 px-4 py-2 rounded-md">+ Create Folder</Button>
                </div>
                <Button className="bg-blue-500 text-white px-4 py-2 rounded-md">Add new group</Button>
            </div>
            <div className="flex items-center justify-between mb-4">
                <Input
                    placeholder="Search groups"
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-1/3 px-3 py-2 rounded-md border border-gray-300"
                />
                <Button className="bg-gray-200 px-4 py-2 rounded-md">Sort by</Button>
            </div>
            <Table columns={groupColumns} dataSource={filteredData} pagination={false} className="custom-table" />
        </div>
    );
};

export default GroupsTable;
