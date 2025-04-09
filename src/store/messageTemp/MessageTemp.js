import { create } from "zustand";
import apiCall from '../../services/api';
import { message } from "antd";

const useMessageSteps = create((set) => ({
   step: 1,
   isMessage: false,
   selectedPlatform:0,
   visibilityType:'',
   MessagePreview:null,
   selecetdMessage:null,
   backStep:null,
   loading: false,
   error: null,
   messageList: [],


   setStep: (val) => set(() => ({ step:val})), 
   setBackStep: (val) => set(() => ({ backStep:val})), 
   setIsMessage: (val) => set((state) => ({
      isMessage: val,
      step: val ? state.step : 1, // Reset step to 1 if isMessage is false
      MessagePreview:val ? state.MessagePreview : null, 
      selecetdMessage:val ? state.selecetdMessage : null, 
      backStep:val ? state.backStep : null, 
   })),

   setSelectedPlatform: (val) => set(() => ({ selectedPlatform: val })), 

   setSelectedVisibilty: (val) => set(() => ({ visibilityType: val })), 
   setPreviewMessage: (val) => set(() => ({ MessagePreview: val })), 
   setSelecetdMessage: (val) => set(() => ({ selecetdMessage: val })), 


   fetchMessages: async (payload) => {
      set({ loading: true, error: null });
      try {
         const pagination = {
            page: payload,
            limit:payload.limit
         }
          const res = await apiCall({
              method: 'POST',
              url: '/all/messages/api/messages',
              data:{...pagination}
          });

          set({ messageList: res?.data?.message?.messages || [], loading: false });
      } catch (error) {
          set({
              loading: false,
              error: error?.message || 'Something went wrong',
          });
      }
  },

  deleteMessages: async (id) => {
 
   try {
       const res = await apiCall({
           method: 'DELETE',
           url: `/all/messages/api/delete-messages/${id}?messageId=${id}`
       });

   return res
   } catch (error) {
       set({
           loading: false,
           error: error?.message || 'Something went wrong',
       });
   }
},
}));

export default useMessageSteps;
