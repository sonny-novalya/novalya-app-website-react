import { create } from "zustand";
import apiCall from '../../services/api';

const usefbCRM = create((set) => ({

    CRMList:[],
    fbCRMLoading:false,
    error:null,
    selectedGrpData:{},
    selectedGrpLoader:false,
    addGrpLoader:false,
    selectStage:{},
    selectedGrp:{},

  
   setSelectStage: (val) => set(() => ({ selectStage: val })), 
   setSelectedGrp: (val) => set(() => ({ selectedGrp: val })), 
  


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
//   /user/api/group/28068
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
editCRMGroup: async (data) => {
    set({addGrpLoader:true})
    try {
      const res =  await apiCall({
            method: 'PATCH',
            url: `/user/api/group/${data.id}`,
            data:{name:data.name,custom_color:data.custom_color}
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
deleteCRMGroup: async (id) => {
    set({addGrpLoader:true})
    try {
      const res =  await apiCall({
            method: 'DELETE',
            url: `/user/api/group/${id}`,
           
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
deleteStage:async (id) => {
    try {
      const res =  await apiCall({
            method: 'GET',
            url: `/stages/api/delete/${id}`
        });
       return res
     
    } catch (error) {
        set({
            error: error?.message || 'Something went wrong',
        });
    }
},
editStage:async (data) => {
    set({addGrpLoader:true})
    try {
      const res =  await apiCall({
            method: 'PUT',
            url: `/stages/api/${data.id}`,
            data:{name:data.name}
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
moveStage:async (data) => {
    set({addGrpLoader:true})
    try {
      const res =  await apiCall({
            method: 'PATCH',
            url: `/user/api/taggedusersmove`,
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
deleteTaggedUser:async (id)=>{
   
    set({addGrpLoader:true})
    try {
      const res =  await apiCall({
            method: 'DELETE',
            url: `/user/api/taggeduser/${id}`,
        });
        set({addGrpLoader:false})
       return res
     
    } catch (error) {
        console.log(error)
        set({
         addGrpLoader:false,
            error: error?.message || 'Something went wrong',
        });
      
    }
}


}))




export default usefbCRM;