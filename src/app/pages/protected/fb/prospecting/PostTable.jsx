import { useState } from "react";
import { Table, Button, Input, Dropdown, Menu } from "antd";
import { SearchOutlined, MoreOutlined } from "@ant-design/icons";

const menu = (
    <Menu>
        <Menu.Item key="1">Facebook</Menu.Item>
        <Menu.Item key="2">Cloud</Menu.Item>
        <Menu.Item key="3">Delete</Menu.Item>
    </Menu>
);

const initialPosts = Array(7).fill({
    key: Math.random(),
    postTitle: "Sample Post Title",
    author: "John Doe",
    datePosted: "2024-02-20",
    comments: 45,
    reactions: 120,
});

const PostsTable = () => {
    // const [postsData, setPostsData] = useState(initialPosts);
    const [searchText, setSearchText] = useState("");

    const filteredData = initialPosts.filter(post =>
        post.postTitle.toLowerCase().includes(searchText.toLowerCase())
    );

    const postColumns = [
        { title: "Post Title", dataIndex: "postTitle" },
        { title: "Author", dataIndex: "author" },
        { title: "Date Posted", dataIndex: "datePosted" },
        { title: "Comments", dataIndex: "comments" },
        { title: "Reactions", dataIndex: "reactions" },
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
                    placeholder="Search posts"
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-1/3 px-3 py-2 rounded-md border border-gray-300"
                />
                <Button className="bg-gray-200 px-4 py-2 rounded-md">Sort by</Button>
            </div>
            <Table columns={postColumns} dataSource={filteredData} pagination={false} className="custom-table" />
        </div>
    );
};

export default PostsTable;
