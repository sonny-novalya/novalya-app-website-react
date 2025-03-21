import { create } from "zustand";

// const data = [
//     { id: "asd", name: "asd", selectedGroups: [1, 8] },
//     { id: "temp one", name: "temp one", selectedGroups: [2, 9] },
//     { id: "sample name 1", name: "sample name 1", selectedGroups: [3, 10] },
//     { id: "example name 2", name: "example name 2", selectedGroups: [4, 11] },
//     { id: "demo name 3", name: "demo name 3", selectedGroups: [5, 12] },
//     { id: "test name 4", name: "test name 4", selectedGroups: [6, 13] },
//     { id: "dummy name 5", name: "dummy name 5", selectedGroups: [7, 14] },
//     // Add other folders if necessary
// ];

const useFbProspectingStore = create((set) => ({
    folders: [], // Array to store folders
    addFolder: (name, selectedGroups) => set((state) => ({
        folders: [...state.folders, { name, selectedGroups, id: Date.now() }]
    })),
    updateFolder: (id, newName, newSelectedGroups) => set((state) => ({
        folders: state.folders.map((folder) =>
            folder.id === id
                ? { ...folder, name: newName, selectedGroups: newSelectedGroups }
                : folder
        )
    })),
    setFolderName: (id, newName) => set((state) => ({
        folders: state.folders.map((folder) =>
            folder.id === id
                ? { ...folder, name: newName }
                : folder
        )
    }))
}));

export default useFbProspectingStore;
