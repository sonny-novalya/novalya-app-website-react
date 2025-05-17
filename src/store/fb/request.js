import { create } from "zustand";
import apiCall from '../../services/api';

const useRequestStore = create((set) => ({
  
//    setFlow: (val) => set(() => ({ flow: val })), 
   
    requestLoader:false,


   fetchRequestData: async () => {
    set({ requestLoader: true});
      try {
       
          const res = await apiCall({
              method: 'POST',
              url: '/request/message/api/all'
          });
        

          set({ requestLoader: false});

          return res
       
      } catch (error) {
          set({
              requestLoader: false,
              error: error?.message || 'Something went wrong',
          });
      }
  },
  saveRequestData: async (data) => {
    set({ requestLoader: true});
      try {
       
          const res = await apiCall({
              method: 'POST',
              url: '/request/message/api/create',
              data
          });
        

          set({ requestLoader: false});

          return res
       
      } catch (error) {
          set({
              requestLoader: false,
              error: error?.message || 'Something went wrong',
          });
      }
  },

}));


export default useRequestStore;