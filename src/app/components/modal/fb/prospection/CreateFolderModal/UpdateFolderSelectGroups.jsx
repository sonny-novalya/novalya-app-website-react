import { useState } from "react";
import { Checkbox } from "antd";

const groups = [
    { id: 1, name: "Longnamegroup Example", image: "https://plus.unsplash.com/premium_photo-1661715812379-23d652805042", members: 129, privacy: "🌐", messages: 110 },
    { id: 2, name: "Longnamegroup Example", image: "https://plus.unsplash.com/premium_photo-1661715812379-23d652805042", members: 129, privacy: "🌐", messages: 110 },
    { id: 3, name: "Longnamegroup Example", image: "https://plus.unsplash.com/premium_photo-1661715812379-23d652805042", members: 129, privacy: "🌐", messages: 110 },
    { id: 4, name: "Longnamegroup Example", image: "https://plus.unsplash.com/premium_photo-1661715812379-23d652805042", members: 129, privacy: "🌐", messages: 110 },
];
const UpdateFolderSelectGroups = () => {
        const [selectedGroups, setSelectedGroups] = useState([]);

        const handleSelect = (id, checked) => {
            setSelectedGroups((prev) =>
                checked ? [...prev, id] : prev.filter((groupId) => groupId !== id)
            );
        };

        return (
            <div className="rounded-lg">
                <div className="max-h-64 overflow-y-auto border border-[#00000014] rounded-md p-2">
                    <table className="w-full border-collapse">
                        <thead className="bg-[#F6F6F6]">
                            <tr className="text-left font-normal">
                                <th className="p-3 w-10"></th>
                                <th className="p-3 font-medium">Group&apos;s Name</th>
                                <th className="p-3 font-medium">Members</th>
                                <th className="p-3 font-medium">Privacy</th>
                                <th className="p-3 font-medium">Messages Sent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groups.map((group) => (
                                <tr
                                    key={group.id}
                                    className="cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSelect(group.id, !selectedGroups.includes(group.id))}
                                >
                                    <td className="p-3 text-center">
                                        <Checkbox
                                            checked={selectedGroups.includes(group.id)}
                                            onChange={(e) => handleSelect(group.id, e.target.checked)}
                                            onClick={(e) => e.stopPropagation()} // Prevents row click from triggering checkbox
                                        />
                                    </td>
                                    <td className="p-3 flex items-center">
                                        <img src={group.image} alt="group" className="w-10 h-10 rounded-md object-cover mr-3" />
                                        <span className="text-gray-700 truncate">{group.name}</span>
                                    </td>
                                    <td className="p-3">{group.members}</td>
                                    <td className="p-3">{group.privacy}</td>
                                    <td className="p-3">{group.messages}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between mt-8 space-x-5">
                    <button
                        className={`border bg-[#0087FF] text-white w-1/2 py-2 rounded-md ${selectedGroups.length === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                            }`}
                        disabled={selectedGroups.length === 0}
                    >
                        Save
                    </button>
                    <button
                        className="border border-[#0087FF] text-[#0087FF] w-1/2 py-2 rounded-md cursor-pointer"
                        onClick={() => setSelectedGroups([])}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    };

export default UpdateFolderSelectGroups