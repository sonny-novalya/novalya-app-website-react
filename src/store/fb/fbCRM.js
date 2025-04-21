import { create } from "zustand";
import apiCall from '../../services/api';

const usefbCRM = create((set) => ({

    CRMList:[],
    fbCRMLoading:false,
    error:null,
    selectedGrpData:{},
    selectedGrpLoader:false,

  
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
          set({ CRMList: res?.data?.data || [], fbCRMLoading: false});
      } catch (error) {
          set({
              fbCRMLoading: false,
              error: error?.message || 'Something went wrong',
          });
      }
  },
  reorderCRMGroupsFB: async (data) => {
  
      try {
          await apiCall({
              method: 'POST',
              url: '/user/api/reorderGroup',
              data:data
          });

        
       
      } catch (error) {
          set({
              fbCRMLoading: false,
              error: error?.message || 'Something went wrong',
          });
      }
  },
  getGroupById: async (id) => {
    set({
        selectedGrpLoader: true,
     
    });
    try {
      const res =  await apiCall({
            method: 'GET',
            url: `/user/api/group/${id}`,
        });

        set({
            selectedGrpData: res?.data?.data || {},
            selectedGrpLoader: false,
        });
     
    } catch (error) {
        set({
            selectedGrpLoader: false,
            error: error?.message || 'Something went wrong',
        });
    }
},

}));


export default usefbCRM;