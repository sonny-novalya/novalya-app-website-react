import { create } from "zustand";
import { BASE_URL } from "../../services/ApiCalls";

const useFbProspectingStore = create((set) => ({
    folders: [], // Array to store folders
    addFolder: (name, selectedGroups) => set((state) => ({
        folders: [...state.folders, { name, selectedGroups, id: Date.now() }]
    })),
    setFolderName: (id, newName) => set((state) => ({
        folders: state.folders.map((folder) =>
            folder.id === id
                ? { ...folder, name: newName }
                : folder
        )
    })),
    setFolders: async (prospect_folder) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${BASE_URL}groups/api/get-prospect-folders?prospect_folder=${prospect_folder}`,
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
            set({ folders: data.data });
        } catch (error) {
            console.error("Error fetching folders:", error);
        }
    },
    createFolder: async (folderName, social_type, selectedGroups, prospect_folder) => {
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
                        selectedGroups: selectedGroups,
                        prospect_folder: prospect_folder
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
    },
    updateFolder: async (folderName, folderId, social_type, selectedGroups) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${BASE_URL}groups/api/update-prospect-folder`,
                {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        folder_name: folderName,
                        folder_id: folderId,
                        social_type,
                        selectedGroups,
                    }),
                }
            );
            if (!response.ok) {
                throw new Error("Failed to update folder");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error updating folder:", error);
        }
    },
    deleteFolder: async (folderId, selectedGroups) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${BASE_URL}groups/api/delete-prospect-folder`,
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        folder_id: folderId,
                        selectedGroups: selectedGroups
                    }),
                }
            );
            if (!response.ok) {
                throw new Error("Failed to delete folder");
            }
            const data = await response.json();
            console.log("Delete Response:", data);
            return data;
        } catch (error) {
            console.error("Error deleting folder:", error);
        }
    }


}));

export default useFbProspectingStore;
