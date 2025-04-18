import { create } from "zustand";
import apiCall from '../../services/api';

const useBirthdayStore = create((set) => ({
  
//    setFlow: (val) => set(() => ({ flow: val })), 
   
    birthdayLoader:false,
    error:null,


   fetchBirthdayData: async () => {
    set({ birthdayLoader: true});
      try {
       
          const res = await apiCall({
              method: 'POST',
              url: '/birthday/setting/api/fetch'
          });
        

          set({ birthdayLoader: false});

          return res
       
      } catch (error) {
          set({
              birthdayLoader: false,
              error: error?.message || 'Something went wrong',
          });
      }
  },
  saveBirthdayData: async (data) => {
    set({ birthdayLoader: true});
      try {
       
          const res = await apiCall({
              method: 'POST',
              url: '/birthday/setting/api/create',
              data
          });
        

          set({ birthdayLoader: false});

          return res
       
      } catch (error) {
          set({
              birthdayLoader: false,
              error: error?.message || 'Something went wrong',
          });
      }
  },

}));


export default useBirthdayStore;