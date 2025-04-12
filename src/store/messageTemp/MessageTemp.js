import { create } from "zustand";
import apiCall from '../../services/api';

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
   tempLoader:false,
   tempMessageLoader:false,
   messageList: [],
   tempMessageList:[],
   tempList:[],
   totalPages: 1,
   flow:0,



   setStep: (val) => set(() => ({ step:val})), 
   setBackStep: (val) => set(() => ({ backStep:val})), 
   setIsMessage: (val) => set((state) => ({
      isMessage: val,
      step: val ? state.step : 1, // Reset step to 1 if isMessage is false
      MessagePreview:val ? state.MessagePreview : null, 
      selecetdMessage:val ? state.selecetdMessage : null, 
      backStep:val ? state.backStep : null, 
      flow:val ? state.flow : 0,
   })),

   setSelectedPlatform: (val) => set(() => ({ selectedPlatform: val })), 
   setFlow: (val) => set(() => ({ flow: val })), 
   setSelectedVisibilty: (val) => set(() => ({ visibilityType: val })), 
   setPreviewMessage: (val) => set(() => ({ MessagePreview: val })), 
   setSelecetdMessage: (val) => set(() => ({ selecetdMessage: val })), 
   setPagination: (val) => set(() => ({ pagination: val })), 


   fetchMessages: async (pagination,search) => {
    if (pagination.limit === 200) {
        set({ tempMessageLoader: true, error: null });
    }else{
        set({ loading: true, error: null });
    }
      try {
         const paylaod = {
            page: pagination?.page || 1,
            limit:pagination?.limit || 10
         }
          const res = await apiCall({
              method: 'POST',
              url: '/all/messages/api/messages',
              data:{...paylaod,search}
          });
          const total = res?.data?.message?.total || 1

         if (pagination.limit === 200) {
          set({ tempMessageList: res?.data?.message?.messages || [], tempMessageLoader: false});
         }else{
            set({ messageList: res?.data?.message?.messages || [], loading: false, totalPages:total });
         }
      } catch (error) {
          set({
              loading: false,
              tempMessageLoader: false,
              error: error?.message || 'Something went wrong',
          });
      }
  },

  fetchTemps: async () => {
    set({ tempLoader: true, error: null });

   try {
    
       const res = await apiCall({
           method: 'POST',
           url: '/all/messages/api/get-templates-data',
       });

       set({ tempList: res?.data?.message || [],tempLoader:false });
   } catch (error) {
       set({
           loading: false,
           tempLoader:false ,
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

  duplicateMessage:async (data) => {
    try {
        const res = await apiCall({
            method: 'POST',
            url: `/all/messages/api/create-duplicate-message`,
            data:data
        });
 
    return res
    } catch (error) {
        set({
            loading: false,
            error: error?.message || 'Something went wrong',
        });
    }
 },

 setFavourite: async (data) => {
    if (data.type === "template") {
    set({ tempLoader: true});
        
    }else{
    set({  tempMessageLoader: true});

    }

    try {
        const res = await apiCall({
            method: 'POST',
            url: `/all/messages/api/update-favorite`,
            data
        });
 
    return res
    } catch (error) {
        set({
            tempLoader: false,  tempMessageLoader: false,
            error: error?.message || 'Something went wrong',
        });
    }
 },
}));


export default useMessageSteps;
