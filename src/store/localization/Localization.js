// src/store/useLocaleStore.js
import { create } from 'zustand';

const storedLocale = localStorage.getItem('selectedLocale') || 'en-US';

export const useLocaleStore = create((set) => ({
    selectedLocale: storedLocale,
    setSelectedLocale: (locale) => {
        localStorage.setItem('selectedLocale', locale);
        set({ selectedLocale: locale });
    },
}));
