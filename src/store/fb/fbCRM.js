import { create } from "zustand";
import apiCall from '../../services/api';

const usefbCRM = create((set) => ({

    CRMList:[],
    fbCRMLoading:false,
    error:null,
  
//    setFlow: (val) => set(() => ({ flow: val })), 
  


   fetchCRMGroups: async (data) => {
    set({ fbCRMLoading: true});
      try {
          const res = await apiCall({
              method: 'GET',
              url: '/user/api/group',
              data:data
          });

          
          set({ CRMList: res?.data || [], fbCRMLoading: false});
      } catch (error) {
          set({
              fbCRMLoading: false,
              error: error?.message || 'Something went wrong',
          });
      }
  },

}));


export default usefbCRM;