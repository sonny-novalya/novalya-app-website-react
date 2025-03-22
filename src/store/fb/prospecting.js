import { create } from "zustand";
import { BASE_URL } from "../../services/ApiCalls";

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
    })),
    setFolders: async (socialType) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${BASE_URL}groups/api/get-prospect-folders?social_type=${socialType}`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Failed to fetch folders");
            }
            const data = await response.json();
            // Assuming 'data' contains an array of folders
            set({ folders: data.data });
            console.log("Folders fetched successfully:", data);
        } catch (error) {
            console.error("Error fetching folders:", error);
        }
    },
    createFolder: async (folderName, social_type, selectedGroups) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${BASE_URL}groups/api/create-prospect-folder`,
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        folder_name: folderName,
                        social_type: social_type,
                        selectedGroups: selectedGroups
                    }),
                }
            );
            if (!response.ok) {
                throw new Error("Failed to create folder");
            }
            const data = await response.json();
            console.log("Folder created successfully:", data);
        } catch (error) {
            console.error("Error creating folder:", error);
        }
    }
}));

export default useFbProspectingStore;
