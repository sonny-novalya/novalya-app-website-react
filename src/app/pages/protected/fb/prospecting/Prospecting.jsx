import { Table, Button, Input, Tabs, Dropdown, Menu } from "antd";
import { SearchOutlined, SettingOutlined, SendOutlined, MoreOutlined } from "@ant-design/icons";
import Layout from "../../Layout";

const { TabPane } = Tabs;

const data = Array(7).fill({
    key: Math.random(),
    groupName: "Longnamegroup Example",
    members: "All Members",
    privacy: "🌎",
    messagesSent: 110,
    folder: "Interested Buyer",
});

const menu = (
    <Menu>
        <Menu.Item key="1">Facebook</Menu.Item>
        <Menu.Item key="2">Cloud</Menu.Item>
        <Menu.Item key="3">Delete</Menu.Item>
    </Menu>
);

const columns = [
    {
        title: "Group's Name",
        dataIndex: "groupName",
        render: (text) => (
            <div className="flex items-center space-x-2">
                <img
                    src="https://via.placeholder.com/40"
                    alt="Group"
                    className="w-8 h-8 rounded-full"
                />
                <span>{text}</span>
            </div>
        ),
    },
    {
        title: "Members",
        dataIndex: "members",
    },
    {
        title: "Privacy",
        dataIndex: "privacy",
    },
    {
        title: "Messages sent",
        dataIndex: "messagesSent",
    },
    {
        title: "Folder",
        dataIndex: "folder",
        render: (text) => (
            <span className="px-3 py-1 rounded bg-green-200 text-green-800">{text}</span>
        ),
    },
    {
        title: "Settings",
        render: () => <Button icon={<SettingOutlined />} className="bg-blue-500 text-white"> Settings</Button>,
    },
    {
        title: "Send",
        render: () => <Button icon={<SendOutlined />} className="bg-gray-200" />,
    },
    {
        title: "Action",
        render: () => (
            <Dropdown overlay={menu} trigger={["click"]}>
                <Button icon={<MoreOutlined />} className="bg-gray-200" />
            </Dropdown>
        ),
    },
];

const Prospecting = () => {
    return (
        <Layout>
            <h2 className="text-xl font-semibold mb-4">Easily connect with new prospects</h2>

            <Tabs defaultActiveKey="1">
                <TabPane tab={<span className="text-blue-600">Facebook Groups</span>} key="1" />
                <TabPane tab="Facebook Posts" key="2" />
            </Tabs>

            <div className="flex items-center justify-between my-4">
                <div className="space-x-2">
                    <Button className="bg-gray-200">All</Button>
                    <Button className="bg-gray-200">Archived</Button>
                    <Button className="bg-gray-200">+ Create Folder</Button>
                </div>
                <Button className="bg-blue-500 text-white">Add new group</Button>
            </div>

            <div className="flex items-center justify-between mb-4">
                <Input placeholder="Search novalya" prefix={<SearchOutlined />} className="w-1/3" />
                <Button className="bg-gray-200">Sort by</Button>
            </div>

            <Table columns={columns} dataSource={data} pagination={true} />
        </Layout>
    );
};

export default Prospecting;