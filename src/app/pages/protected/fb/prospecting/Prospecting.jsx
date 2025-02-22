import Layout from "../../Layout";
import GroupsTable from "./GroupsTable";
import PostTable from "./PostTable";
import { useState } from "react";

const Prospecting = () => {
    const [selectedGroup, setSelectedGroup] = useState(true);

    return (
        <Layout>
            <h2 className="text-xl font-semibold mb-4">Easily connect with new prospects</h2>
            <div className="flex w-full space-x-4">
                <button
                    type="button"
                    className={`relative w-1/2 flex items-center justify-center px-4 py-3 rounded-md border cursor-pointer ${selectedGroup ? "bg-[#0087FF] border-[#CCE7FF] text-white" : "bg-white border-[#0087FF] text-[#0087FF]"}`}
                    onClick={() => setSelectedGroup(true)}
                >
                    <span>Facebook Groups</span>
                </button>

                <button
                    type="button"
                    className={`relative w-1/2 flex items-center justify-center px-4 py-3 rounded-md border cursor-pointer ${!selectedGroup ? "bg-[#0087FF] border-[#CCE7FF] text-white" : "bg-white border-[#0087FF] text-[#0087FF]"}`}
                    onClick={() => setSelectedGroup(false)}
                >
                    <span>Facebook Post</span>
                </button>
            </div>

            <div className="w-full mt-4">
                {selectedGroup ? <GroupsTable /> : <PostTable />}
            </div>
        </Layout>
    );
};

export default Prospecting;
