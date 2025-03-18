import { useState } from "react";
import { Checkbox } from "antd";

const groups = [
    { id: 1, name: "Longnamegroup Example", image: "https://plus.unsplash.com/premium_photo-1661715812379-23d652805042?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, name: "Longnamegroup Example", image: "https://plus.unsplash.com/premium_photo-1661715812379-23d652805042?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 3, name: "Longnamegroup Example", image: "https://plus.unsplash.com/premium_photo-1661715812379-23d652805042?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 4, name: "Longnamegroup Example", image: "https://plus.unsplash.com/premium_photo-1661715812379-23d652805042?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 4, name: "Longnamegroup Example", image: "https://plus.unsplash.com/premium_photo-1661715812379-23d652805042?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 4, name: "Longnamegroup Example", image: "https://plus.unsplash.com/premium_photo-1661715812379-23d652805042?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 4, name: "Longnamegroup Example", image: "https://plus.unsplash.com/premium_photo-1661715812379-23d652805042?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 4, name: "Longnamegroup Example", image: "https://plus.unsplash.com/premium_photo-1661715812379-23d652805042?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 4, name: "Longnamegroup Example", image: "https://plus.unsplash.com/premium_photo-1661715812379-23d652805042?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 4, name: "Longnamegroup Example", image: "https://plus.unsplash.com/premium_photo-1661715812379-23d652805042?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 4, name: "Longnamegroup Example", image: "https://plus.unsplash.com/premium_photo-1661715812379-23d652805042?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];

const CreateFolderSelectGroups = () => {
    const [selectedGroups, setSelectedGroups] = useState([]);

    const handleSelect = (id, checked) => {
        setSelectedGroups((prev) =>
            checked ? [...prev, id] : prev.filter((groupId) => groupId !== id)
        );
    };

    return (
        <div className="rounded-lg">
            <div className="max-h-64 overflow-y-auto border border-[#00000014] rounded-md p-2">
                {groups.map((group) => (
                    <div
                        key={group.id}
                        className="flex items-center p-3 bg-[#F6F6F6] rounded-md cursor-pointer"
                        onClick={() => handleSelect(group.id, !selectedGroups.includes(group.id))}
                    >
                        <Checkbox
                            checked={selectedGroups.includes(group.id)}
                            onChange={(e) => handleSelect(group.id, e.target.checked)}
                            className="mr-3"
                            onClick={(e) => e.stopPropagation()} // Prevent event bubbling
                        />
                        <img src={group.image} alt="group" className="w-12 h-12 rounded-md mx-3 object-cover" />
                        <span className="text-gray-700 truncate">{group.name}</span>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-8 space-x-5">
                <button
                    className="border border-[#0087FF] text-[#0087FF] w-1/2 py-2 rounded-md cursor-pointer"
                    onClick={() => setSelectedGroups([])}
                >
                    Cancel
                </button>
                <button
                    className={`border bg-[#0087FF] text-white w-1/2 py-2 rounded-md ${selectedGroups.length === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                        }`}
                    disabled={selectedGroups.length === 0}
                >
                    Create Folder
                </button>
            </div>
        </div>
    );
};


export default CreateFolderSelectGroups;
