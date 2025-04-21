import { create } from "zustand";
import apiCall from '../../services/api';

const usefbCRM = create((set) => ({

    CRMList:[],
    fbCRMLoading:false,
    error:null,
    selectedGrpData:{},
    selectedGrpLoader:false,
    addGrpLoader:false,

  
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
moveTaggedUsers: async (data) => {
  
    try {
      const res =  await apiCall({
            method: 'PATCH',
            url: `/user/api/taggeduser/${data.id}`,
            data:{stage_id:data.stage_id}
        });
       return res
     
    } catch (error) {
        set({
          
            error: error?.message || 'Something went wrong',
        });
    }
},

createCRMGroup: async (data) => {
    set({addGrpLoader:true})
    try {
      const res =  await apiCall({
            method: 'POST',
            url: `/user/api/group`,
            data:data
        });
        set({addGrpLoader:false})
       return res
     
    } catch (error) {
        set({
         addGrpLoader:false,
            error: error?.message || 'Something went wrong',
        });
    }
},
//  

createStage: async (data) => {
    set({addGrpLoader:true})
    try {
      const res =  await apiCall({
            method: 'POST',
            url: `/stages/api/create`,
            data:data
        });
        set({addGrpLoader:false})
       return res
     
    } catch (error) {
        set({
         addGrpLoader:false,
            error: error?.message || 'Something went wrong',
        });
    }
},


}));


export default usefbCRM;