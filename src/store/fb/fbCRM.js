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
              method: 'POST',
              url: '/user/api/facebook/get-all-groups',
              data:data
          });

          console.log(res)
          set({ CRMList: res?.data?.message || [], fbCRMLoading: false});
      } catch (error) {
          set({
              fbCRMLoading: false,
              error: error?.message || 'Something went wrong',
          });
      }
  },

}));


export default usefbCRM;