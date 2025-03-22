import Layout from "../../Layout";
import PostTable from "./PostTable";
import { useState } from "react";
import FollowersTable from "./FollowersTable";
import GroupsTable from "../../fb/prospecting/GroupsTable";

const IgProspecting = () => {
    const [activeTab, setActiveTab] = useState('followers');

    return (
        <Layout>
            <h2 className="text-xl font-semibold mb-4">Easily connect with new prospects</h2>
            <div className="flex w-full space-x-4">
                <button
                    type="button"
                    className={`relative w-1/3 flex items-center justify-center px-4 py-3 rounded-md border cursor-pointer ${activeTab === 'followers'
                            ? "bg-[#0087FF] border-[#CCE7FF] text-white"
                            : "bg-white border-[#0087FF] text-[#0087FF]"
                        }`}
                    onClick={() => setActiveTab('followers')}
                >
                    <span>Instagram Followers</span>
                </button>

                <button
                    type="button"
                    className={`relative w-1/3 flex items-center justify-center px-4 py-3 rounded-md border cursor-pointer ${activeTab === 'posts'
                            ? "bg-[#0087FF] border-[#CCE7FF] text-white"
                            : "bg-white border-[#0087FF] text-[#0087FF]"
                        }`}
                    onClick={() => setActiveTab('posts')}
                >
                    <span>Instagram Posts</span>
                </button>

                <button
                    type="button"
                    className={`relative w-1/3 flex items-center justify-center px-4 py-3 rounded-md border cursor-pointer ${activeTab === 'hashtags'
                            ? "bg-[#0087FF] border-[#CCE7FF] text-white"
                            : "bg-white border-[#0087FF] text-[#0087FF]"
                        }`}
                    onClick={() => setActiveTab('hashtags')}
                >
                    <span>Instagram Hashtags</span>
                </button>
            </div>

            <div className="w-full mt-4">
                {activeTab === 'followers' && <FollowersTable />}
                {activeTab === 'posts' && <PostTable />}
                {activeTab === 'hashtags' && <GroupsTable />}
            </div>
        </Layout>
    );
};

export default IgProspecting;