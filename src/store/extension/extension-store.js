import { create } from 'zustand';
import { detectExtension } from '../../helpers/helper';

export const useExtensionStore = create((set) => ({
    loading: false,
    error: null,
    isExtConnected : false,
    fetchExtInstalledStatus: () => {
        detectExtension((extensionStatus) => {
            set({ isExtConnected: extensionStatus });
        })
    },
}));
