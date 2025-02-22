import { Button, Tabs } from "antd";
import Layout from "../../Layout";
import GroupsTable from "./GroupsTable";
import PostsTable from "./PostsTable";

const { TabPane } = Tabs;

const Prospecting = () => {
    return (
        <Layout>
            <h2 className="text-xl font-semibold mb-4">Easily connect with new prospects</h2>

            <Tabs defaultActiveKey="1" className="custom-tabs">
                <TabPane tab={<span className="text-blue-600 font-medium px-6 py-2">Facebook Groups</span>} key="1">
                    <div className="flex items-center justify-between my-4">
                        <div className="space-x-2">
                            <Button className="bg-gray-200 px-4 py-2 rounded-md">All</Button>
                            <Button className="bg-gray-200 px-4 py-2 rounded-md">Archived</Button>
                            <Button className="bg-gray-200 px-4 py-2 rounded-md">+ Create Folder</Button>
                        </div>
                        <Button className="bg-blue-500 text-white px-4 py-2 rounded-md">Add new group</Button>
                    </div>
                    <GroupsTable />
                </TabPane>

                <TabPane tab={<span className="text-gray-600 font-medium px-6 py-2">Facebook Posts</span>} key="2">
                    <div className="flex items-center justify-between my-4">
                        <div className="space-x-2">
                            <Button className="bg-gray-200 px-4 py-2 rounded-md">All</Button>
                            <Button className="bg-gray-200 px-4 py-2 rounded-md">Archived</Button>
                            <Button className="bg-gray-200 px-4 py-2 rounded-md">+ Create Folder</Button>
                        </div>
                        <Button className="bg-blue-500 text-white px-4 py-2 rounded-md">Add new group</Button>
                    </div>
                    <PostsTable />
                </TabPane>
            </Tabs>
        </Layout>
    );
};

export default Prospecting;
