import { create } from "zustand";
import apiCall from "../../services/api";

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
            const response = await apiCall({
                method: 'GET',
                url: `/groups/api/get-prospect-folders?prospect_folder=${prospect_folder}`,
            });

            if (response.statusText !== "OK") {
                throw new Error("Failed to fetch folders");
            }

            set({ folders: response.data.data });
        } catch (error) {
            console.error("Error fetching folders:", error);
        }
    },
    createFolder: async (folderName, social_type, selectedGroups, prospect_folder) => {
        try {
            const response = await apiCall({
                method: 'POST',
                url: '/groups/api/create-prospect-folder',
                data: {
                    folder_name: folderName,
                    social_type,
                    selectedGroups,
                    prospect_folder,
                },
            });

            if (response.statusText !== "OK") {
                throw new Error("Failed to create folder");
            }

            console.log("Folder created successfully:", response.data);
        } catch (error) {
            console.error("Error creating folder:", error);
        }
    },
    updateFolder: async (folderName, folderId, social_type, selectedGroups) => {
        try {
            const response = await apiCall({
                method: 'PUT',
                url: '/groups/api/update-prospect-folder',
                data: {
                    folder_name: folderName,
                    folder_id: folderId,
                    social_type,
                    selectedGroups,
                },
            });

            if (response.statusText !== "OK") {
                throw new Error("Failed to update folder");
            }

            return response.data;
        } catch (error) {
            console.error("Error updating folder:", error);
        }
    },
    deleteFolder: async (folderId, selectedGroups) => {
        try {
            const response = await apiCall({
                method: 'POST',
                url: '/groups/api/delete-prospect-folder',
                data: {
                    folder_id: folderId,
                    selectedGroups,
                },
            });

            if (response.statusText !== "OK") {
                throw new Error("Failed to delete folder");
            }

            console.log("Delete Response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error deleting folder:", error);
        }
    },


}));

export default useFbProspectingStore;
