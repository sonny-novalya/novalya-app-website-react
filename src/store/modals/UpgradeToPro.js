import { create } from 'zustand';

const useUpgradeModalStore = create((set) => ({
    isVisible: false,
    showModal: () => set({ isVisible: true }),
    hideModal: () => set({ isVisible: false }),
}));

export default useUpgradeModalStore;
