import { create } from "zustand";

const useMessageSteps = create((set) => ({
   step: 1,
   isMessage: false,
   selectedPlatform:0,
   visibilityType:'',

   setStep: (val) => set(() => ({ step:val})), 

   setIsMessage: (val) => set((state) => ({
      isMessage: val,
      step: val ? state.step : 1 // Reset step to 1 if isMessage is false
   })),

   setSelectedPlatform: (val) => set(() => ({ selectedPlatform: val })), 

   setSelectedVisibilty: (val) => set(() => ({ visibilityType: val })), 


}));

export default useMessageSteps;
