import { create } from "zustand";
import apiCall from '../../services/api';

const useKeyWordStore = create((set) => ({
   flow: 0,
   loading:false,
   error:null,
   keyWordList:[],
   totalPages:1,
   actionLoader:false,
   selectedKeyword:{},
   setFlow: (val) => set(() => ({ flow: val })), 
   setSelectedKeyword: (val) => set(() => ({ selectedKeyword: val })), 

   fetchKeywords: async (pagination,search,sort) => {
   
          set({ loading: true, error: null });
     
        try {
           const paylaod = {
              page: pagination?.page || 1,
              limit:pagination?.limit || 10,
              sort_order:sort?"DESC":"ASC",
              sort_by:"name",
              search
           }
            const res = await apiCall({
                method: 'POST',
                url: '/keywords/api/all',
                data:{...paylaod}
            });
            const total = res?.data?.message?.total || 1
  
         console.log(res?.data)
              set({ keyWordList: res?.data?.data || [], loading: false, totalPages:total  });
    
        } catch (error) {
            set({
                loading: false,
                error: error?.message || 'Something went wrong',
            });
        }
    },
    deleteKeyWords: async (id) =>{
      set({ loading: true, error: null });
     
      try {
         const paylaod = {
         
         }
          const res = await apiCall({
              method: 'GET',
              url: `/keywords/api/delete/${id}`,
              data:{...paylaod}
          });
      return res
  
      } catch (error) {
          set({
              loading: false,
              error: error?.message || 'Something went wrong',
          });
      }
    },
    duplicateKeyWords: async (id) =>{
      set({ loading: true, error: null });
     
      try {
         const paylaod = {
         
         }
          const res = await apiCall({
              method: 'GET',
              url: `/keywords/api/duplicate/${id}`,
              data:{...paylaod}
          });
      return res
  
      } catch (error) {
          set({
              loading: false,
              error: error?.message || 'Something went wrong',
          });
      }
    },
    createKeyWords: async (paylaod) =>{
     set({actionLoader:true})
      try {
        
          const res = await apiCall({
              method: 'POST',
              url: `/keywords/api/create`,
              data:{...paylaod}
          });
          set({ actionLoader: false, error: null });
      return res
  
      } catch (error) {
          set({
              loading: false,
              error: error?.message || 'Something went wrong',
          });
      }
    },
    updateKeyWords: async (paylaod,id) =>{
      set({actionLoader:true})
       try {
         
           const res = await apiCall({
               method: 'POST',
               url: `/keywords/api/${id}`,
               data:{...paylaod}
           });
           set({ actionLoader: false, error: null });
       return res
   
       } catch (error) {
           set({
               loading: false,
               error: error?.message || 'Something went wrong',
           });
       }
     }
  
}));


export default useKeyWordStore;
